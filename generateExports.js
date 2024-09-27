const glob = require('glob');
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

// Path to the src directory and index file
const srcDir = path.join(__dirname, 'src');
const typesDir = path.join(srcDir, 'types');
const indexFilePath = path.join(srcDir, 'index.ts');

// Find all .ts files in src/types and its subdirectories
const typeFiles = glob.sync('types/**/*.ts', { cwd: srcDir });

// Function to extract named exports using TypeScript compiler API
function extractNamedExports(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
    const namedExports = [];

    function visit(node) {
        if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
            node.exportClause.elements.forEach((element) => {
                namedExports.push(element.name.text);
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
            if (node.name) {
                namedExports.push(node.name.text);
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return namedExports;
}

// Generate export statements for each .ts file
const exportLines = typeFiles.flatMap((file) => {
    const fullPath = path.join(srcDir, file);
    const exports = extractNamedExports(fullPath);

    if (exports.length > 0) {
        // Create a relative path from the src directory
        const relativePath = './' + path.relative(srcDir, fullPath).replace(/\\/g, '/').replace('.ts', '');
        return `export { ${exports.join(', ')} } from '${relativePath}';`;
    }
    return [];
});

// Combine all export statements into a single output string
const output = exportLines.join('\n') + '\n';

// Write the generated output to the index.ts file
fs.writeFileSync(indexFilePath, output);

console.log(`Generated ${indexFilePath} with exports for all named types.`);