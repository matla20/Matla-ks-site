import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ctaBg from "../../attached_assets/generated_images/cta_bg.png";

const WHATSAPP_LINK = "https://wa.me/5577992015868";

export function CTASection() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaBg}
          alt="Premium background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#050505]/75 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
            Seu presente único <br />
            <span className="text-white/70 italic">começa aqui.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Transforme suas fotos, ideias e momentos especiais em produtos personalizados feitos para emocionar e surpreender.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 text-white/60 text-sm md:text-base font-medium">
            <div className="flex items-center gap-2">
              <span className="text-white">✓</span> Atendimento personalizado
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">✓</span> Qualidade premium
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white">✓</span> Entrega para todo o Brasil
            </div>
          </div>

          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-semibold text-lg rounded-full hover:scale-[1.02] transition-transform duration-300"
            >
              Fazer Meu Pedido <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
