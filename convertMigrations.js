import fs from 'fs';
import path from 'path';


const migrationDir = './src/data/migrations';


const convertToESM = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const esmContent = content
        .replace(/module\.exports\s*=\s*{/g, 'export default {')
        .replace(/exports\.(up|down)\s*=\s*function/g, 'export async function $1')
        .replace(/function \(knex\) \{/g, '(knex) => {');

    fs.writeFileSync(filePath, esmContent, 'utf-8');
};


fs.readdirSync(migrationDir).forEach(file => {
    if (path.extname(file) === '.js') {
        convertToESM(path.join(migrationDir, file));
    }
});

console.log('Migration files converted to ES module syntax.');
