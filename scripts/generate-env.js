const fs = require('fs');
const path = require('path');

// Basic .env parser for local development (no dependencies required)
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach(line => {
      // Ignore comments and empty lines
      if (!line || line.startsWith('#')) return;

      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1].trim();
        let value = (match[2] || '').trim();

        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);

        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
    console.log('📝 Loaded variables from .env file');
  }
}

loadEnv();

// Vercel Environment detection
const VERCEL_ENV = process.env.VERCEL_ENV || 'development';
const isProduction = VERCEL_ENV === 'production';

// Variables to include in the environment files
const githubToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const tokenSource = process.env.GITHUB_TOKEN ? 'GITHUB_TOKEN' : (process.env.GH_TOKEN ? 'GH_TOKEN' : 'none');

function generateEnvFile(targetPath, production) {
  // Use a string representation for logging to avoid exposing the token
  const tokenDisplay = githubToken ? `${githubToken.substring(0, 4)}...${githubToken.substring(githubToken.length - 4)}` : 'undefined';

  const content = `export const environment = {
  production: ${production},
  vercelEnv: '${VERCEL_ENV}',
  githubToken: ${githubToken ? `'${githubToken}'` : 'undefined'}
};
`;
  fs.writeFileSync(targetPath, content);

  console.log(`📄 Generated: ${path.basename(targetPath)}`);
  console.log(`   - Production: ${production}`);
  console.log(`   - Token source: ${tokenSource}`);
  console.log(`   - Token value: ${tokenDisplay}`);
}

// Generate the environment file
const envDir = path.join(__dirname, '..', 'src', 'environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

generateEnvFile(path.join(envDir, 'environment.ts'), isProduction);

console.log(`\n✅ Environment configuration completed!`);
console.log(`🌍 Vercel Context: ${VERCEL_ENV}`);
