// Links do WhatsApp com mensagens pré-prontas.
// O cliente clica e o WhatsApp já abre com a mensagem escrita.

export const DEFAULT_WA_NUMBER = "5577992015868";

export const DEFAULT_WA_MESSAGE =
  "Olá! Vi o site da MATLA KS e quero saber mais sobre os presentes personalizados. 😊";

export function waLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function waProductMessage(title: string, price?: string) {
  return `Olá! Vi o site da MATLA KS e me interessei por: *${title}*${
    price ? ` (${price})` : ""
  }. Pode me passar mais detalhes? 😊`;
}
