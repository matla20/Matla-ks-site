import React, { useRef } from "react";
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import heroDesktop from "@assets/ChatGPT_Image_3_de_ago._de_2026,_11_26_16_1785767287003.png";
import heroMobile from "@assets/ChatGPT_Image_3_de_ago._de_2026,_11_45_21_1785768343345.png";

const WHATSAPP_LINK = "https://wa.me/5577992015868";

export function HeroSection() {
  // Mouse parallax for the desktop image (depth effect)
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 15 });
  const imgTranslateX = useTransform(springX, [-0.5, 0.5], ["-16px", "16px"]);
  const imgTranslateY = useTransform(springY, [-0.5, 0.5], ["-16px", "16px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = imageWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="inicio" className="relative w-full md:h-[100dvh] flex items-center overflow-hidden">
      {/* ===== Mobile layout: image on top, text below ===== */}
      <div className="md:hidden w-full flex flex-col min-h-[100dvh]">
        {/* Image area */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-[54dvh] mt-[72px] overflow-hidden"
        >
          <img
            src={heroMobile}
            alt="Produtos Personalizados MATLA KS"
            className="w-full h-full object-cover object-top"
          />
          {/* Soft fade to background at the bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#050505] to-transparent" />
        </motion.div>

        {/* Text area */}
        <div className="flex-1 flex flex-col justify-start px-6 pt-2 pb-12">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1
              variants={itemVariants}
              className="font-serif text-4xl leading-[1.15] mb-4 tracking-tight text-white"
            >
              O presente perfeito não se encontra. <span className="text-white/60 italic">Se cria.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base text-white/70 font-light leading-relaxed mb-8"
            >
              Transformamos suas ideias, fotos e mensagens em produtos personalizados únicos, 
              feitos para emocionar, surpreender e eternizar momentos especiais.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium rounded-full active:scale-95 transition-all duration-300"
              >
                Fazer Meu Pedido
              </a>
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full active:bg-white/10 transition-all duration-300"
              >
                Ver Catálogo
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== Desktop layout: full background image ===== */}
      <div
        className="hidden md:block absolute inset-0 z-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={imageWrapRef}
      >
        <motion.img
          src={heroDesktop}
          alt="Produtos Personalizados MATLA KS"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ x: imgTranslateX, y: imgTranslateY }}
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Gradient for text legibility — stronger on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-[#050505]/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/80 to-transparent" />
      </div>

      <div className="hidden md:flex container mx-auto px-6 md:px-12 relative z-10 h-full pointer-events-none">
        <div className="w-full md:w-1/2 flex flex-col justify-center pt-20 pointer-events-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.h1
              variants={itemVariants}
              className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 tracking-tight text-white"
            >
              O presente perfeito não se encontra. <span className="text-white/60 italic">Se cria.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-10"
            >
              Transformamos suas ideias, fotos e mensagens em produtos personalizados únicos, 
              feitos para emocionar, surpreender e eternizar momentos especiais.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 hover:scale-105 transition-all duration-300"
              >
                Fazer Meu Pedido
              </a>
              <a
                href="#catalogo"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Ver Catálogo
              </a>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
