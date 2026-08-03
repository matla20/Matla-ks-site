import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

const FAQS = [
  {
    id: "item-1",
    question: "Como faço meu pedido?",
    answer: "É bem simples! Entre em contato pelo nosso WhatsApp, escolha o produto desejado, envie suas fotos e personalizações, e nós cuidamos de tudo para você.",
  },
  {
    id: "item-2",
    question: "Qual o prazo de produção?",
    answer: "O prazo varia de 3 a 7 dias úteis dependendo do produto. Produtos com maior complexidade ou kits completos podem levar até 10 dias úteis.",
  },
  {
    id: "item-3",
    question: "Vocês entregam para todo Brasil?",
    answer: "Sim! Realizamos entregas para todo o Brasil via Correios ou transportadora, conforme a região.",
  },
  {
    id: "item-4",
    question: "Posso personalizar qualquer produto?",
    answer: "Sim! Trabalhamos com diversas opções de personalização. Basta nos enviar suas fotos, frases e ideias, e nós transformamos em um produto único.",
  },
  {
    id: "item-5",
    question: "Como envio minhas fotos?",
    answer: "Após confirmar seu pedido pelo WhatsApp, você pode enviar as fotos diretamente pelo chat em alta resolução.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl mb-4">Perguntas Frequentes</h2>
          <p className="text-white/60 text-lg">
            Tudo o que você precisa saber antes de fazer seu pedido.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion.Root type="single" collapsible className="w-full space-y-4">
            {FAQS.map((faq) => (
              <Accordion.Item
                key={faq.id}
                value={faq.id}
                className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden data-[state=open]:border-white/20 transition-colors"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center justify-between p-6 md:p-8 text-left group">
                    <span className="font-medium text-white/90 text-lg group-hover:text-white transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className="text-white/50 group-hover:text-white transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180 group-data-[state=open]:text-white"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_300ms_ease-out] data-[state=open]:animate-[accordion-down_300ms_ease-out]">
                  <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-white/60 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
