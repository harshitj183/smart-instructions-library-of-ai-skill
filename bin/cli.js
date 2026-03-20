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

console.log(`${colors.bright}${colors.cyan}🚀 Initializing Smart AI Skills Library...${colors.reset}\n`);

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

const targetRolesDir = path.join(targetDir, 'roles');
const targetSkillsDir = path.join(targetDir, 'skills');
const targetSkillMd = path.join(targetDir, 'SKILL.md');

try {
    console.log(`${colors.blue}📦 Copying Master Rules (SKILL.md)...${colors.reset}`);
    if (fs.existsSync(path.join(sourceDir, 'SKILL.md'))) {
        fs.copyFileSync(path.join(sourceDir, 'SKILL.md'), targetSkillMd);
    } else {
        console.warn(`${colors.yellow}⚠️ SKILL.md not found in source.${colors.reset}`);
    }

    console.log(`${colors.blue}📦 Extracting 8 Master Roles...${colors.reset}`);
    copySync(path.join(sourceDir, 'roles'), targetRolesDir);

    console.log(`${colors.blue}📦 Extracting 17 Mega-Skills...${colors.reset}`);
    copySync(path.join(sourceDir, 'skills'), targetSkillsDir);

    console.log(`\n${colors.bright}${colors.green}✅ Success! Smart AI Skills installed in your workspace.${colors.reset}`);
    console.log(`${colors.yellow}💡 Pro-Tip for Cursor IDE:${colors.reset} File Explorer -> Rename 'SKILL.md' to '.cursorrules'\n`);
    
} catch (error) {
    console.error(`\n${colors.red}❌ Failed to construct library structure: ${error.message}${colors.reset}\n`);
}
