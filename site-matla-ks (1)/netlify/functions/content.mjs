import { getStore } from '@netlify/blobs';

// Guarda o conteúdo editável do site (catálogo, galeria, depoimentos, rodapé)
// no Netlify Blobs, para que as alterações feitas no painel /admin
// apareçam para todos os visitantes.
export default async (req) => {
  const store = getStore('matlaks-content');

  if (req.method === 'GET') {
    const content = await store.get('content', { type: 'json' });
    return Response.json(
      { content: content ?? null },
      { headers: { 'Cache-Control': 'no-store' } },
    );
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
    // Apenas verificação de senha (login), sem salvar
    if (body.verify) {
      return Response.json({ ok: true });
    }
    await store.setJSON('content', body.content ?? null);
    return Response.json({ ok: true });
  }

  return new Response('Method not allowed', { status: 405 });
};

export const config = {
  path: '/api/content',
};
