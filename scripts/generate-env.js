const fs = require('fs');
const path = require('path');

// Determinar si es producción por variable de entorno de Vercel
const isProduction = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

// Obtener token de variables de entorno (solo disponible en build time de Vercel)
const githubToken = process.env.GITHUB_TOKEN || '';

// Contenido del archivo de entorno
const environmentContent = `export const environment = {
  production: ${isProduction},
  githubToken: ${githubToken ? `'${githubToken}'` : 'undefined'}
};

`;

// Escribir el archivo
const envPath = path.join(__dirname, '..', 'src', 'environments', 'environment.ts');
fs.writeFileSync(envPath, environmentContent.trim());

console.log(`✅ Environment file generated for ${isProduction ? 'production' : 'development'}`);
console.log(`🔑 GitHub Token: ${githubToken ? 'Configured' : 'Not configured (undefined)'}`);
console.log(`🌍 VERCEL_ENV: ${process.env.VERCEL_ENV || 'undefined'}`);  
