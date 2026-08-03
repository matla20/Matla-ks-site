import { getStore } from '@netlify/blobs';

// Senha do painel: se o dono já trocou a senha pelo painel, ela fica salva
// (como hash) no Netlify Blobs e tem prioridade. Caso contrário vale a
// variável de ambiente ADMIN_PASSWORD ou a senha padrão.

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function checkPassword(password) {
  if (typeof password !== 'string' || !password) return false;
  const store = getStore('matlaks-content');
  const storedHash = await store.get('password-hash');
  if (storedHash) {
    return (await sha256(password)) === storedHash;
  }
  return password === (process.env.ADMIN_PASSWORD || 'matla2026');
}

export async function setPassword(newPassword) {
  const store = getStore('matlaks-content');
  await store.set('password-hash', await sha256(newPassword));
}
