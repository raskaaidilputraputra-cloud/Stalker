import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Basic JSON middleware
app.use(express.json());

// Simple In-Memory Rate Limiting
interface RateLimitInfo {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitInfo>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60; // 60 requests per minute per IP

function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const info = rateLimitMap.get(ip);

  if (!info || now > info.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  if (info.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      status: false,
      message: 'Terlalu banyak permintaan. Silakan tunggu beberapa saat lagi.',
    });
  }

  info.count += 1;
  next();
}

// Common headers for upstream requests
const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchWithTimeout(url: string, timeoutMs = 12000): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': BROWSER_USER_AGENT,
        Accept: 'application/json, text/plain, */*',
      },
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return { ok: res.ok, status: res.status, data };
    } else {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        return { ok: res.ok, status: res.status, data: json };
      } catch {
        return {
          ok: res.ok,
          status: res.status,
          data: {
            status: false,
            message: `Respons server tidak valid (HTTP ${res.status}).`,
          },
        };
      }
    }
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Permintaan ke API eksternal waktu habis (timeout). Coba lagi beberapa saat lagi.');
    }
    throw err;
  }
}

// 1. WhatsApp Channel Stalker Proxy
// Target: https://api.nexadev.my.id/api/channel/?url=
app.get('/api/stalk/whatsapp', rateLimiter, async (req: Request, res: Response) => {
  try {
    const rawUrl = typeof req.query.url === 'string' ? req.query.url.trim() : '';
    if (!rawUrl) {
      return res.status(400).json({
        status: false,
        message: 'Link saluran WhatsApp wajib diisi.',
      });
    }

    if (rawUrl.length > 500) {
      return res.status(400).json({
        status: false,
        message: 'Tautan terlalu panjang (maksimal 500 karakter).',
      });
    }

    // Validate URL and ensure it points to whatsapp.com
    let parsed: URL;
    try {
      const urlToParse = rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
        ? rawUrl
        : `https://${rawUrl}`;
      parsed = new URL(urlToParse);
    } catch {
      return res.status(400).json({
        status: false,
        message: 'Format tautan WhatsApp tidak valid.',
      });
    }

    const hostname = parsed.hostname.toLowerCase();
    const validDomains = ['whatsapp.com', 'www.whatsapp.com'];
    if (!validDomains.includes(hostname)) {
      return res.status(400).json({
        status: false,
        message: 'Link harus berasal dari domain resmi whatsapp.com.',
      });
    }

    if (!parsed.pathname.includes('/channel/')) {
      return res.status(400).json({
        status: false,
        message: 'Tautan harus berupa tautan saluran WhatsApp (mengandung /channel/).',
      });
    }

    const apiUrl = `https://api.nexadev.my.id/api/channel/?url=${encodeURIComponent(parsed.toString())}`;
    const result = await fetchWithTimeout(apiUrl);

    return res.status(result.status || 200).json(result.data);
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message || 'Terjadi kesalahan saat menghubungi API WhatsApp Channel.',
    });
  }
});

// 2. TikTok Stalker Proxy
// Target: https://api.nexadev.my.id/api/tiktokstalker?username=
app.get('/api/stalk/tiktok', rateLimiter, async (req: Request, res: Response) => {
  try {
    const rawUsername = typeof req.query.username === 'string' ? req.query.username.trim() : '';
    const cleanUsername = rawUsername.replace(/^@+/, '').trim();

    if (!cleanUsername) {
      return res.status(400).json({
        status: false,
        message: 'Username TikTok wajib diisi.',
      });
    }

    if (cleanUsername.length > 60) {
      return res.status(400).json({
        status: false,
        message: 'Username terlalu panjang (maksimal 60 karakter).',
      });
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
      return res.status(400).json({
        status: false,
        message: 'Username TikTok hanya boleh memuat huruf, angka, titik, dan garis bawah.',
      });
    }

    const apiUrl = `https://api.nexadev.my.id/api/tiktokstalker?username=${encodeURIComponent(cleanUsername)}`;
    const result = await fetchWithTimeout(apiUrl);

    return res.status(result.status || 200).json(result.data);
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message || 'Terjadi kesalahan saat menghubungi API TikTok Stalker.',
    });
  }
});

// 3. Instagram Stalker Proxy
// Target: https://api.nexadev.my.id/api/instagramstalker?username=
app.get('/api/stalk/instagram', rateLimiter, async (req: Request, res: Response) => {
  try {
    const rawUsername = typeof req.query.username === 'string' ? req.query.username.trim() : '';
    const cleanUsername = rawUsername.replace(/^@+/, '').trim();

    if (!cleanUsername) {
      return res.status(400).json({
        status: false,
        message: 'Username Instagram wajib diisi.',
      });
    }

    if (cleanUsername.length > 60) {
      return res.status(400).json({
        status: false,
        message: 'Username terlalu panjang (maksimal 60 karakter).',
      });
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
      return res.status(400).json({
        status: false,
        message: 'Username Instagram hanya boleh memuat huruf, angka, titik, dan garis bawah.',
      });
    }

    const apiUrl = `https://api.nexadev.my.id/api/instagramstalker?username=${encodeURIComponent(cleanUsername)}`;
    const result = await fetchWithTimeout(apiUrl);

    return res.status(result.status || 200).json(result.data);
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message || 'Terjadi kesalahan saat menghubungi API Instagram Stalker.',
    });
  }
});

// 4. Twitter/X Stalker Proxy
// Target: https://api.nexadev.my.id/api/stalkertwiter?username=
app.get('/api/stalk/twitter', rateLimiter, async (req: Request, res: Response) => {
  try {
    const rawUsername = typeof req.query.username === 'string' ? req.query.username.trim() : '';
    const cleanUsername = rawUsername.replace(/^@+/, '').trim();

    if (!cleanUsername) {
      return res.status(400).json({
        status: false,
        message: 'Username Twitter/X wajib diisi.',
      });
    }

    if (cleanUsername.length > 60) {
      return res.status(400).json({
        status: false,
        message: 'Username terlalu panjang (maksimal 60 karakter).',
      });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      return res.status(400).json({
        status: false,
        message: 'Username Twitter/X hanya boleh memuat huruf, angka, dan garis bawah (_).',
      });
    }

    // Explicitly keeping the provided endpoint name "stalkertwiter"
    const apiUrl = `https://api.nexadev.my.id/api/stalkertwiter?username=${encodeURIComponent(cleanUsername)}`;
    const result = await fetchWithTimeout(apiUrl);

    return res.status(result.status || 200).json(result.data);
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      message: err.message || 'Terjadi kesalahan saat menghubungi API Twitter/X Stalker.',
    });
  }
});

// Safe Image Proxy for CDN images (TikTok CDN / WhatsApp CDN often block direct web referrers)
app.get('/api/proxy-image', async (req: Request, res: Response) => {
  try {
    const imageUrl = typeof req.query.url === 'string' ? req.query.url.trim() : '';
    if (!imageUrl) {
      return res.status(400).send('Image URL required');
    }

    // SSRF and protocol check
    const parsed = new URL(imageUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return res.status(400).send('Invalid protocol');
    }

    const hostname = parsed.hostname.toLowerCase();
    // Block localhost, private IPs
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.16.') ||
      hostname.endsWith('.local')
    ) {
      return res.status(403).send('Restricted host');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const imgRes = await fetch(imageUrl, {
      headers: {
        'User-Agent': BROWSER_USER_AGENT,
        Referer: '',
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!imgRes.ok) {
      return res.status(imgRes.status).send('Failed to fetch image');
    }

    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 1 day

    const arrayBuffer = await imgRes.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err: any) {
    return res.status(500).send('Image proxy error');
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RzzStalker server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
