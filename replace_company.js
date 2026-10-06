const fs = require('fs');
const path = require('path');

const directoryPath = 'e:\\trenchless-website-master';
const ignoreDirs = ['.git', 'node_modules', '.next', 'dist', 'build', '.gemini'];

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (!ignoreDirs.includes(f)) {
                walkDir(dirPath, callback);
            }
        } else {
            // Only process text/code files
            if (f.match(/\.(tsx|ts|js|jsx|json|md|html|css|scss|mjs)$/)) {
                callback(dirPath);
            }
        }
    });
}

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Logos - replace exact filenames
    content = content.replace(/TERRADRILL & ENERGY PRIVATE LIMITED-logo\.png/gi, 'terradrill-logo.png');
    content = content.replace(/TERRADRILL & ENERGY PRIVATE LIMITED-logo\.png/gi, 'terradrill-logo.png');
    
    // Netlify links - replacing the domain part
    content = content.replace(/Trayanainfra\.netlify\.app/gi, 'terradrill.netlify.app');
    content = content.replace(/TERRADRILL & ENERGY PRIVATE LIMITED-infratech\.netlify\.app/gi, 'terradrill.netlify.app');
    content = content.replace(/TERRADRILL & ENERGY PRIVATE LIMITED-infrastructure\.netlify\.app/gi, 'terradrill.netlify.app'); // just in case

    // Replace old names with the new official company name
    // Using exact phrases first, case insensitive
    const replacements = [
        { regex: /TERRADRILL & ENERGY PRIVATE LIMITED/gi, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' },
        { regex: /TERRADRILL & ENERGY PRIVATE LIMITED/gi, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' },
        { regex: /TERRADRILL & ENERGY PRIVATE LIMITED/gi, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' },
        { regex: /\bTrayana\b/g, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' }, 
        { regex: /\bTRAYANA\b/g, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' }, 
        { regex: /\btrayana\b/g, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' }, 
        { regex: /TERRADRILL & ENERGY PRIVATE LIMITED/gi, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' },
        { regex: /TERRADRILL & ENERGY PRIVATE LIMITED/gi, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' },
        { regex: /\bMaya\b/g, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' },
        { regex: /\bMAYA\b/g, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' },
        { regex: /\bmaya\b/g, replace: 'TERRADRILL & ENERGY PRIVATE LIMITED' }
    ];

    for (let r of replacements) {
        content = content.replace(r.regex, r.replace);
    }
    
    // Footers
    content = content.replace(/©\s*2026\s*TERRADRILL & ENERGY PRIVATE LIMITED\.\s*All Rights Reserved\./gi, '© 2026 TERRADRILL & ENERGY PRIVATE LIMITED. All rights reserved.');
    content = content.replace(/&copy;\s*2026\s*TERRADRILL & ENERGY PRIVATE LIMITED\.\s*All Rights Reserved\./gi, '&copy; 2026 TERRADRILL & ENERGY PRIVATE LIMITED. All rights reserved.');

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

walkDir(directoryPath, replaceInFile);
console.log("Replacement complete.");
