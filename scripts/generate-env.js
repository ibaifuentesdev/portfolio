const fs = require('fs');
const path = require('path');

// Basic .env parser for local development (no dependencies required)
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, '');
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
const githubToken = process.env.GITHUB_TOKEN;

function generateEnvFile(targetPath, production) {
  const content = `export const environment = {
  production: ${production},
  vercelEnv: '${VERCEL_ENV}',
  githubToken: ${githubToken ? `'${githubToken}'` : 'undefined'}
};
`;
  fs.writeFileSync(targetPath, content);
}

// Generate the environment file
const envDir = path.join(__dirname, '..', 'src', 'environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

generateEnvFile(path.join(envDir, 'environment.ts'), isProduction);

console.log(`✅ Environment file generated!`);
console.log(`🌍 VERCEL_ENV: ${VERCEL_ENV}`);
console.log(`🧪 Is Production (build-time): ${isProduction}`);
console.log(`🔑 GitHub Token: ${githubToken ? 'Configured' : 'Not configured (using proxy or unauthenticated)'}`);
