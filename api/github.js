// API Route para Vercel - Proxy seguro a GitHub API
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
    const path = req.url.replace('/api/github', '') || '/user/repos';
    const githubUrl = `https://api.github.com${path}`;
    
    // Agregar parámetros por defecto si no existen
    const url = new URL(githubUrl);
    if (!url.searchParams.has('type')) {
      url.searchParams.set('type', 'all');
    }
    if (!url.searchParams.has('sort')) {
      url.searchParams.set('sort', 'updated');
    }
    if (!url.searchParams.has('per_page')) {
      url.searchParams.set('per_page', '100');
    }

    console.log(`Proxying request to: ${url.toString()}`);

    // Hacer request a GitHub API con el token
    const response = await fetch(url.toString(), {
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
