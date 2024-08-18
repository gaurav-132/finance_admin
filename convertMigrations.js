import fs from 'fs';
import path from 'path';

// Directory containing migration files
const migrationDir = './src/data/migrations';

// Function to check if a file is already using ES module syntax
const isESModule = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    return /export\s+(default\s+)?{/.test(content) || /export\s+async\s+function\s+(up|down)/.test(content);
};

// Function to convert CommonJS to ES module syntax
const convertToESM = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const esmContent = content
        .replace(/module\.exports\s*=\s*{/g, 'export default {')
        .replace(/exports\.(up|down)\s*=\s*function/g, 'export async function $1')
        .replace(/function \(knex\) \{/g, '(knex) => {');

    fs.writeFileSync(filePath, esmContent, 'utf-8');
};

// Read files from the migration directory
fs.readdirSync(migrationDir).forEach(file => {
    const filePath = path.join(migrationDir, file);
    if (path.extname(file) === '.js' && !isESModule(filePath)) {
        convertToESM(filePath);
        console.log(`Converted ${file} to ES module syntax.`);
    } else if (path.extname(file) === '.js') {
        console.log(`${file} is already in ES module syntax.`);
    }
});

console.log('Migration files conversion check completed.');
