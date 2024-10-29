const glob = require('glob');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Path to the src directory and index file
const srcDir = path.join(__dirname, 'src');
const indexFilePath = path.join(srcDir, 'index.ts');

// Find all .ts and .tsx files in src/types, src/functions, src/consts, and their subdirectories
const files = glob.sync('{types,functions,consts}/**/*.{ts,tsx}', { cwd: srcDir });

// Function to extract exports from TypeScript files
function extractExports(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

    const types = [];
    const functions = [];
    const consts = [];
    const duplicatedConsts = [];

    function visit(node) {
        if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
            node.exportClause.elements.forEach((element) => {
                // Re-exports are collected in consts by default
                consts.push(element.name.text);
            });
        } else if (
            (ts.isVariableStatement(node) ||
                ts.isFunctionDeclaration(node) ||
                ts.isClassDeclaration(node) ||
                ts.isInterfaceDeclaration(node) ||
                ts.isTypeAliasDeclaration(node) ||
                ts.isEnumDeclaration(node)) &&
            node.modifiers?.some(mod => mod.kind === ts.SyntaxKind.ExportKeyword)
        ) {
            if (ts.isVariableStatement(node)) {
                node.declarationList.declarations.forEach(declaration => {
                    if (declaration.name && ts.isIdentifier(declaration.name)) {
                        const name = declaration.name.text;
                        const isConst = node.declarationList.flags & ts.NodeFlags.Const;

                        if (isConst) {
                            if (declaration.initializer && ts.isAsExpression(declaration.initializer)) {
                                const asType = declaration.initializer.type;
                                if (asType.kind === ts.SyntaxKind.ConstKeyword) {
                                    // It's 'as const' - collect in duplicatedConsts
                                    duplicatedConsts.push({
                                        name: name,
                                        initializer: declaration.initializer.expression.getText()
                                    });
                                } else {
                                    // Not 'as const' - collect in consts
                                    consts.push(name);
                                }
                            } else {
                                // Not 'as const' - collect in consts
                                consts.push(name);
                            }
                        } else {
                            // Not a const variable, collect in consts
                            consts.push(name);
                        }
                    }
                });
            } else if (ts.isFunctionDeclaration(node)) {
                if (node.name) {
                    functions.push(node.name.text);
                }
            } else if (
                ts.isInterfaceDeclaration(node) ||
                ts.isTypeAliasDeclaration(node) ||
                ts.isEnumDeclaration(node) ||
                ts.isClassDeclaration(node)
            ) {
                if (node.name) {
                    types.push(node.name.text);
                }
            }
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return { types, functions, consts, duplicatedConsts };
}

// Initialize arrays to store export statements
const typeExportLines = [];
const functionExportLines = [];
const constExportLines = [];
const duplicatedConstDeclarations = [];

// Process each file and categorize exports
files.forEach((file) => {
    const fullPath = path.join(srcDir, file);
    const { types, functions, consts, duplicatedConsts } = extractExports(fullPath);

    if (types.length > 0) {
        const relativePath = './' + path.relative(srcDir, fullPath).replace(/\\/g, '/').replace(/\.(ts|tsx)$/, '');
        typeExportLines.push(`export { ${types.join(', ')} } from '${relativePath}';`);
    }

    if (functions.length > 0) {
        const relativePath = './' + path.relative(srcDir, fullPath).replace(/\\/g, '/').replace(/\.(ts|tsx)$/, '');
        functionExportLines.push(`export { ${functions.join(', ')} } from '${relativePath}';`);
    }

    if (consts.length > 0) {
        const relativePath = './' + path.relative(srcDir, fullPath).replace(/\\/g, '/').replace(/\.(ts|tsx)$/, '');
        constExportLines.push(`export { ${consts.join(', ')} } from '${relativePath}';`);
    }

    duplicatedConsts.forEach(({ name, initializer }) => {
        duplicatedConstDeclarations.push(`export ${name} = ${initializer};`);
    });
});

// Combine all export statements into the final output
const outputLines = [];

// Add types section
if (typeExportLines.length > 0) {
    outputLines.push('// types');
    outputLines.push(...typeExportLines);
    outputLines.push('');
    outputLines.push('');
}

// Add functions section
if (functionExportLines.length > 0) {
    outputLines.push('// functions');
    outputLines.push(...functionExportLines);
    outputLines.push('');
    outputLines.push('');
}

// Add consts section
if (constExportLines.length > 0) {
    outputLines.push('// consts');
    outputLines.push(...constExportLines);
    outputLines.push('');
    outputLines.push('');
}

// Add duplicated consts section
if (duplicatedConstDeclarations.length > 0) {
    outputLines.push('// duplicated consts');
    outputLines.push(...duplicatedConstDeclarations);
}

const output = outputLines.join('\n') + '\n';

// Write the generated output to the index.ts file
fs.writeFileSync(indexFilePath, output);

console.log(`Generated ${indexFilePath} with organized exports.`);
