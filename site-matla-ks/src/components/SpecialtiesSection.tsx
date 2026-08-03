import React from "react";
import { motion } from "framer-motion";
import { 
  Coffee, 
  Image as ImageIcon, 
  Shirt, 
  Square, 
  Camera, 
  Key
} from "lucide-react";

const CATEGORIES = [
  { icon: Coffee, title: "Canecas Personalizadas" },
  { icon: Square, title: "Azulejos Decorativos" },
  { icon: ImageIcon, title: "Quadros A4" },
  { icon: Camera, title: "Polaroids" },
  { icon: Key, title: "Chaveiros" },
  { icon: Shirt, title: "Camisetas" },
];

export function SpecialtiesSection() {
  return (
    <section id="categorias" className="py-24 md:py-32 bg-[#050505] relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-5xl mb-4">Nossas Especialidades</h2>
          <p className="text-white/60 text-lg">
            Escolha o produto ideal e personalize cada detalhe do seu jeito.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#111111] rounded-2xl p-6 md:p-8 flex flex-col items-center text-center border border-white/5 hover:border-white/20 transition-colors duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="font-medium text-sm md:text-base text-white/90 group-hover:text-white transition-colors">
                  {cat.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
