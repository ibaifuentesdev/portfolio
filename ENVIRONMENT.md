# Gestión de Variables de Entorno

Este proyecto utiliza un script de pre-construcción para manejar las variables de entorno de forma segura, especialmente para su despliegue en Vercel.

## Cómo funciona

El script `scripts/generate-env.js` se ejecuta antes de cada build (`npm run build`). Este script:
1. Lee las variables de entorno de la máquina (o del dashboard de Vercel).
2. Genera los archivos `src/environments/environment.ts` y `src/environments/environment.prod.ts`.
3. Estos archivos **no se suben a Git** (están en `.gitignore`).

## Variables Disponibles

| Variable | Descripción |
|----------|-------------|
| `GITHUB_TOKEN` | Token de acceso personal de GitHub para evitar límites de API. |
| `VERCEL_ENV` | (Automática en Vercel) Indica si es `production`, `preview` o `development`. |

## Configuración en Vercel

Para que el proyecto funcione correctamente en Vercel:
1. Ve a tu proyecto en el Dashboard de Vercel.
2. Navega a **Settings** > **Environment Variables**.
3. Añade `GITHUB_TOKEN` con tu token de GitHub.
4. Asegúrate de que el token tenga permisos de lectura para repositorios.

## Desarrollo Local

Para desarrollo local, puedes crear un archivo `.env` en la raíz del proyecto:

```env
GITHUB_TOKEN=tu_token_aqui
```

El script `generate-env.js` detectará este archivo automáticamente y configurará el entorno local.

---

> [!IMPORTANT]
> Nunca subas el archivo `.env` o los archivos en `src/environments/` al repositorio de Git para mantener tus credenciales seguras.
