import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// === CONFIG ===
const SRC_DIR = './src';
const SNAPSHOT_FILE = 'PROJECT_SNAPSHOT.md';
const MAX_DEPTH = 3; // wie tief Ordnerstruktur aufgelöst wird

// === Hilfsfunktionen ===
function listFiles(dir, depth = MAX_DEPTH) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory() && depth > 0) {
      results.push(`${file}/`);
      results = results.concat(listFiles(fullPath, depth - 1).map(f => `  ${f}`));
    } else {
      results.push(file);
    }
  });
  return results;
}

function extractTODOs(dir) {
  let todos = [];
  if (!fs.existsSync(dir)) return todos;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) todos = todos.concat(extractTODOs(fullPath));
    else {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/\/\/ TODO: (.+)/g);
      if (matches) todos.push(...matches);
    }
  });
  return todos;
}

// === Projektinfos ===
const pkgPath = './package.json';
const pkg = fs.existsSync(pkgPath) ? JSON.parse(fs.readFileSync(pkgPath, 'utf8')) : {};
const projectName = pkg.name || 'Unknown Project';
const version = pkg.version || '0.0.0';
const dependencies = pkg.dependencies ? Object.keys(pkg.dependencies) : [];
const devDependencies = pkg.devDependencies ? Object.keys(pkg.devDependencies) : [];

// === Ordnerstruktur + TODOs ===
const structure = listFiles(SRC_DIR).join('\n') || '(src/ Ordner fehlt)';
const todos = extractTODOs(SRC_DIR).join('\n') || 'Keine TODOs gefunden';

// === Optional: Test Coverage ===
let testCoverage = 'Keine Test-Infos gefunden';
try {
  const output = execSync('npx jest --coverage --coverageReporters=text-summary', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
  const summary = output.match(/All files\s+\|\s+.*\n.*\n.*\n/);
  if (summary) testCoverage = summary[0];
} catch (e) {
  testCoverage = 'Jest nicht installiert oder Tests konnten nicht ausgeführt werden';
}

// === Snapshot zusammenstellen ===
const snapshot = `
# Projekt Snapshot

## Projektname
${projectName} (v${version})

## Ordnerstruktur (${SRC_DIR})
${structure}

## Bekannte TODOs
${todos}

## Abhängigkeiten
- Dependencies: ${dependencies.join(', ') || 'Keine'}
- DevDependencies: ${devDependencies.join(', ') || 'Keine'}

## Test Coverage
${testCoverage}
`;

// === Datei schreiben ===
fs.writeFileSync(SNAPSHOT_FILE, snapshot);
console.log(`✅ Projekt-Snapshot erstellt: ${SNAPSHOT_FILE}`);
