import { getStore } from '@netlify/blobs';

// Guarda e serve as fotos enviadas pelo painel /admin usando Netlify Blobs.
// POST /api/upload  -> { password, data (base64), type, ext }  => { url }
// GET  /api/image/<id>  -> devolve a imagem

export default async (req) => {
  const store = getStore('matlaks-images');
  const url = new URL(req.url);

  if (req.method === 'GET') {
    const id = url.pathname.split('/').pop();
    if (!id) return new Response('Not found', { status: 404 });
    const result = await store.getWithMetadata(id, { type: 'arrayBuffer' });
    if (!result || !result.data) return new Response('Not found', { status: 404 });
    return new Response(result.data, {
      headers: {
        'Content-Type': (result.metadata && result.metadata.type) || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  if (req.method === 'POST') {
    let body;
    try {
      body = await req.json();
    } catch {
      return new Response('Bad request', { status: 400 });
    }
    const password = process.env.ADMIN_PASSWORD || 'matla2026';
    if (!body || body.password !== password) {
      return new Response('Unauthorized', { status: 401 });
    }
    if (!body.data || typeof body.data !== 'string') {
      return new Response('Bad request', { status: 400 });
    }
    const ext = /^[a-z0-9]{2,5}$/i.test(body.ext || '') ? body.ext.toLowerCase() : 'jpg';
    const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const bytes = Uint8Array.from(atob(body.data), (c) => c.charCodeAt(0));
    await store.set(id, bytes, {
      metadata: { type: body.type || 'image/jpeg' },
    });
    return Response.json({ url: `/api/image/${id}` });
  }

  return new Response('Method not allowed', { status: 405 });
};

export const config = {
  path: ['/api/upload', '/api/image/*'],
};
