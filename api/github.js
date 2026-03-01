// API Route para Vercel - Proxy seguro a GitHub API
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Solo permitir método GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obtener token de variables de entorno de Vercel
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    // Construir URL de GitHub API
    const githubUrl = `https://api.github.com${req.url.replace('/api/github', '')}`;
    
    console.log(`Proxying request to: ${githubUrl}`);

    // Hacer request a GitHub API con el token
    const response = await fetch(githubUrl, {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App'
      }
    });

    const data = await response.json();

    // Retornar respuesta con mismo status y datos
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('GitHub API proxy error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch from GitHub API',
      details: error.message 
    });
  }
}
