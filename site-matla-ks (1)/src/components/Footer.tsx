import React from "react";
import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import { useContent } from "@/content/ContentContext";
import { waLink, DEFAULT_WA_MESSAGE } from "@/lib/whatsapp";

export function Footer() {
  const { content } = useContent();
  const f = content.footer;
  const whatsappLink = waLink(f.whatsappNumber, DEFAULT_WA_MESSAGE);

  const multiline = (text: string) =>
    text.split("\n").map((line, i, arr) => (
      <React.Fragment key={i}>
        {line}
        {i < arr.length - 1 && <br />}
      </React.Fragment>
    ));

  return (
    <footer id="contato" className="bg-[#050505] pt-24 pb-8 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="md:col-span-12 lg:col-span-5">
            <h3 className="font-serif text-3xl mb-6">MATLA KS</h3>
            <p className="text-white/60 leading-relaxed font-light max-w-md">
              {f.description}
            </p>
          </div>

          {/* Links Col */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="font-medium mb-6 text-white/90">Navegação</h4>
            <ul className="space-y-4">
              <li><a href="#inicio" className="text-white/50 hover:text-white transition-colors">Início</a></li>
              <li><a href="#categorias" className="text-white/50 hover:text-white transition-colors">Categorias</a></li>
              <li><a href="#catalogo" className="text-white/50 hover:text-white transition-colors">Catálogo</a></li>
              <li><a href="#faq" className="text-white/50 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contato" className="text-white/50 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-8 lg:col-span-5">
            <h4 className="font-medium mb-6 text-white/90">Fale Conosco</h4>
            <ul className="space-y-5">
              <li>
                <a href={f.instagramUrl} target="_blank" rel="noreferrer" className="flex items-start gap-4 text-white/60 hover:text-white transition-colors group">
                  <Instagram size={20} className="mt-0.5 text-white/40 group-hover:text-white transition-colors" />
                  <span>{f.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-start gap-4 text-white/60 hover:text-white transition-colors group">
                  <Phone size={20} className="mt-0.5 text-white/40 group-hover:text-white transition-colors" />
                  <span>{f.phoneDisplay}</span>
                </a>
              </li>
              <li className="flex items-start gap-4 text-white/60">
                <MapPin size={20} className="mt-0.5 text-white/40 flex-shrink-0" />
                <span>{multiline(f.address)}</span>
              </li>
              <li className="flex items-start gap-4 text-white/60">
                <Clock size={20} className="mt-0.5 text-white/40 flex-shrink-0" />
                <span>{multiline(f.hours)}</span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} MATLA KS. Todos os direitos reservados.
          </p>
          <div className="text-white/40 text-sm">
            Feito com <span className="text-white">♥</span> no Brasil
          </div>
        </div>
      </div>
    </footer>
  );
}
