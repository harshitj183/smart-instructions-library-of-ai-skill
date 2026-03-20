#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI Terminal Colors
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    red: "\x1b[31m"
};

const targetDir = process.cwd();
const sourceDir = path.join(__dirname, '..');

console.log(`${colors.bright}${colors.cyan}Initializing Smart AI Skills Library...${colors.reset}\n`);

// Helper function to copy files and directories recursively
function copySync(src, dest) {
    if (!fs.existsSync(src)) return;
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(file => {
            copySync(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

const targetDirBase = path.join(targetDir, 'smart-instructions');

if (!fs.existsSync(targetDirBase)) {
    fs.mkdirSync(targetDirBase, { recursive: true });
}

const targetRolesDir = path.join(targetDirBase, 'roles');
const targetSkillsDir = path.join(targetDirBase, 'skills');
const targetSkillMd = path.join(targetDirBase, 'SKILL.md');
const gitignorePath = path.join(targetDir, '.gitignore');

try {
    console.log(`${colors.blue}[+] Initializing 'smart-instructions' workspace...${colors.reset}`);
    if (fs.existsSync(path.join(sourceDir, 'SKILL.md'))) {
        fs.copyFileSync(path.join(sourceDir, 'SKILL.md'), targetSkillMd);
    } else {
        console.warn(`${colors.yellow}[!] SKILL.md not found in source.${colors.reset}`);
    }

    console.log(`${colors.blue}[+] Extracting 8 Master Roles...${colors.reset}`);
    copySync(path.join(sourceDir, 'roles'), targetRolesDir);

    console.log(`${colors.blue}[+] Extracting 17 Mega-Skills...${colors.reset}`);
    copySync(path.join(sourceDir, 'skills'), targetSkillsDir);
    
    console.log(`${colors.blue}[+] Securing source control (.gitignore)...${colors.reset}`);
    const ignoreRules = "\n\n# Smart AI Skills Library (Context Only)\nsmart-instructions/\n";
    if (fs.existsSync(gitignorePath)) {
        const currentIgnore = fs.readFileSync(gitignorePath, 'utf8');
        if (!currentIgnore.includes('# Smart AI Skills Library')) {
            fs.appendFileSync(gitignorePath, ignoreRules);
            console.log(`    ${colors.cyan}-> Appended rules to existing .gitignore${colors.reset}`);
        }
    } else {
        fs.writeFileSync(gitignorePath, ignoreRules.trim() + "\n");
        console.log(`    ${colors.cyan}-> Created new .gitignore file${colors.reset}`);
    }

    console.log(`\n${colors.bright}${colors.green}[Success] The 'smart-instructions' folder has been added to your project!${colors.reset}`);
    console.log(`${colors.yellow}Notice for Cursor IDE:${colors.reset} Move 'smart-instructions/SKILL.md' to the root of your project and rename it to '.cursorrules'\n`);
    
} catch (error) {
    console.error(`\n${colors.red}[Error] Failed to construct library structure: ${error.message}${colors.reset}\n`);
}
