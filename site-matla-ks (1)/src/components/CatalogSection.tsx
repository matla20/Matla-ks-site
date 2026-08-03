import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/content/ContentContext";
import { waLink, waProductMessage } from "@/lib/whatsapp";

export function CatalogSection() {
  const { content } = useContent();
  const [activeCategory, setActiveCategory] = useState("todos");

  const waNumber = content.footer.whatsappNumber;
  const CATALOG_ITEMS = content.catalog;
  const CATEGORIES = [{ id: "todos", label: "Todos" }, ...content.categories];

  const filteredItems =
    activeCategory === "todos"
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="catalogo" className="py-24 md:py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="font-serif text-3xl md:text-5xl mb-4">Catálogo</h2>
          <p className="text-white/60 text-lg">
            Descubra produtos únicos feitos especialmente para você ou para quem você ama.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat.id
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/60 border-white/15 hover:text-white hover:border-white/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col bg-[#111111] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
              >
                <div className="relative h-72 md:h-80 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

                  {/* Hover overlay with button */}
                  <div className="absolute inset-0 bg-[#050505]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <a
                      href={waLink(waNumber, waProductMessage(item.title, item.price))}
                      target="_blank"
                      rel="noreferrer"
                      className="translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-3 bg-white text-black font-medium rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 flex items-center gap-2"
                    >
                      Personalizar <ArrowRight size={18} />
                    </a>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-serif text-xl text-white/90">{item.title}</h3>
                    {item.price && (
                      <span className="text-white/80 text-sm font-medium whitespace-nowrap">
                        {item.price}
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  <a
                    href={waLink(waNumber, waProductMessage(item.title, item.price))}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/70 font-medium text-sm flex items-center gap-2 hover:text-white transition-colors uppercase tracking-wider"
                  >
                    Fazer Pedido <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
