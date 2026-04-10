# @harshitj183/ai-skills

The ultimate professional instruction library for advanced AI agents (Cursor, Claude Code, Copilot, Antigravity).

This library provides a hardened set of **18 Mega-Skills** and **8 Expert Roles** designed to transform any standard LLM into a high-fidelity system architect, security auditor, or product manager.

## 🚀 Key Features
- **18 Mega-Skills**: Curated workflows for Infrastructure, DevOps, Orchestration, and Lifecycle management.
- **8 Specialized Roles**: Deep personas for Frontend, Backend, Security, PM, and More.
- **Dynamic Retrieval**: Logic for fetch-and-verify expansion (SHA-256 enforcement).
- **History Tracking**: Built-in mandatory logging for local project context maintenance.

## 📦 Installation
```bash
npm install @harshitj183/ai-skills
```

## 🛠️ Usage
```javascript
const { getSkills, getTrustPolicies, version } = require('@harshitj183/ai-skills');

console.log(`Smart AI Skills Library v${version}`);

// Get all registry-optimized skill endpoints
const skills = getSkills();
console.log(skills.Backend);

// Check security policies
const policies = getTrustPolicies();
if (policies.require_hash) {
  console.log("Integrity enforcement: ACTIVE");
}
```

## 📖 Core Skills
- **Orchestration**: Parallel Agent Dispatcher, Plan Architect, Executor.
- **Security**: Security Auditor Persona with Mandatory Guardrails.
- **DevOps**: GitHub Automation, Supabase Architecture, Stripe Integration.

## 🛡️ License
MIT

---
⚡ Smart AI Skills Library | Active
