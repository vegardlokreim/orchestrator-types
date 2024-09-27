const glob = require('glob');
const fs = require('fs');
const path = require('path');

// Path to the types directory
const typesDir = path.join(__dirname, 'src/types');
const indexFilePath = path.join(__dirname, 'src/index.ts');

// Find all .ts files in src/types (adjust pattern to match only certain files like types.ts)
const typeFiles = glob.sync('src/types/**/*.ts');

// Generate export statements for each types.ts file
const exportLines = typeFiles.map((file) => {
    // Remove 'src/' and ensure paths start with './types'
    const relativePath = '.' + file.replace('src', '').replace('.ts', '').replace(/\\/g, '/');
    return `export * from '${relativePath}';`;
});

// Combine all export statements into a single output string
const output = [...exportLines].join('\n') + '\n';

// Write the generated output to the index.ts file
fs.writeFileSync(indexFilePath, output);

console.log(`Generated ${indexFilePath} with exports for types.ts files.`);
