const fs = require('fs');
const path = require('path');

// Конфигурация файлов для экспорта
const config = {
    includePatterns: [
        'src/**/*',
        'package.json',
        'tsconfig.json',
        'webpack.*'
    ],
    excludePatterns: [
        'node_modules/**',
        'dist/**',
        '.git/**'
    ]
};

function getAllFiles(dir, patterns, excludes) {
    const files = [];

    function traverse(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            // Проверяем исключения
            if (excludes.some(pattern =>
                new RegExp(pattern.replace(/\*/g, '.*')).test(fullPath))) {
                continue;
            }

            if (entry.isDirectory()) {
                traverse(fullPath);
            } else {
                // Проверяем, соответствует ли файл паттернам включения
                if (patterns.some(pattern =>
                    new RegExp(pattern.replace(/\*/g, '.*')).test(fullPath))) {
                    files.push(fullPath);
                }
            }
        }
    }

    traverse(dir);
    return files;
}

function getDirectoryStructure(dir, excludes) {
    const structure = {};
    
    function traverse(currentDir, currentStructure) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            const relativePath = path.relative(dir, fullPath);
            
            // Проверяем исключения
            if (excludes.some(pattern => 
                new RegExp(pattern.replace(/\*/g, '.*')).test(fullPath))) {
                continue;
            }
            
            if (entry.isDirectory()) {
                currentStructure[entry.name] = {};
                traverse(fullPath, currentStructure[entry.name]);
            } else {
                currentStructure[entry.name] = null;
            }
        }
    }
    
    traverse(dir, structure);
    return structure;
}

function createProjectContents() {
    const projectRoot = process.cwd();
    const files = getAllFiles(projectRoot, config.includePatterns, config.excludePatterns);
    
    const contents = {
        directoryStructure: getDirectoryStructure(projectRoot, config.excludePatterns),
        files: {}
    };
    
    for (const file of files) {
        try {
            const relativePath = path.relative(projectRoot, file);
            const content = fs.readFileSync(file, 'utf-8');
            contents.files[relativePath] = content;
        } catch (error) {
            console.error(`Ошибка при чтении файла ${file}:`, error.message);
        }
    }
    
    const output = JSON.stringify(contents, null, 4);
    fs.writeFileSync('project_contents.txt', output);
    console.log('Файл project_contents.txt успешно создан');
}

createProjectContents();
