import mugImg from "@assets/ChatGPT_Image_3_de_ago._de_2026,_13_00_05_1785777958516.png";
import mugHeartImg from "@assets/ChatGPT_Image_3_de_ago._de_2026,_14_27_16_1785778056854.png";
import mugMagicImg from "@assets/Gemini_Generated_Image_6okrdg6okrdg6okr_1785778086586.png";
import mugColorImg from "@assets/ChatGPT_Image_3_de_ago._de_2026,_14_28_48_1785778142272.png";
import tileImg from "@assets/ChatGPT_Image_3_de_ago._de_2026,_14_23_50_1785778211363.png";
import frameImg from "@assets/ChatGPT_Image_3_de_ago._de_2026,_14_06_42_1785778259217.png";
import keychainImg from "@assets/ChatGPT_Image_3_de_ago._de_2026,_14_10_57_1785778285020.png";
import polaroidImg from "@assets/ChatGPT_Image_3_de_ago._de_2026,_14_18_56_1785778303938.png";

import gal1 from "@assets/dc1de83267ba3896f1fa8ca3f92895e5_1785778646889.jpg";
import gal2 from "@assets/50752b3685fc00f9bdab6cd6b403c770_1785779062282.jpg";
import gal3 from "@assets/3c82199c81158c0e6a433533d18f23af_1785779089089.jpg";
import gal4 from "@assets/6115649dbfddd3b1666271e064c4b0e5_1785779124865.jpg";
import gal5 from "@assets/5c3d6e0e903d513d632e8a3c8836934d_1785779611278.jpg";
import gal6 from "@assets/d7654d143e773ffece7db9cc3a6a932c_1785779790629.jpg";
import gal7 from "@assets/7eaebb0ad05965e8d9ae8305f3fcfc24_1785779829239.jpg";
import gal8 from "@assets/824b6ceb9e618149587ffd3b4f9cb03c_1785779967701.jpg";
import gal9 from "@assets/gallery_client_9_1785780119297.jpg";

import dep1 from "@assets/testimonials_blurred/dep1.jpg";
import dep2 from "@assets/testimonials_blurred/dep2.jpg";
import dep3 from "@assets/testimonials_blurred/dep3.jpg";
import dep4 from "@assets/testimonials_blurred/dep4.jpg";
import dep5 from "@assets/testimonials_blurred/dep5.jpg";
import dep6 from "@assets/testimonials_blurred/dep6.jpg";
import dep7 from "@assets/testimonials_blurred/dep7.jpg";

export interface CatalogItem {
  id: string;
  category: string;
  title: string;
  description: string;
  price: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface TestimonialImage {
  id: string;
  src: string;
}

export interface FooterContent {
  description: string;
  instagramHandle: string;
  instagramUrl: string;
  phoneDisplay: string;
  whatsappNumber: string;
  address: string;
  hours: string;
}

export interface CloudinarySettings {
  cloudName: string;
  uploadPreset: string;
}

export interface Category {
  id: string;
  label: string;
}

export interface SiteContent {
  categories: Category[];
  catalog: CatalogItem[];
  gallery: GalleryImage[];
  testimonials: TestimonialImage[];
  footer: FooterContent;
  cloudinary: CloudinarySettings;
}

export const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "canecas", label: "Canecas" },
  { id: "azulejos", label: "Azulejos" },
  { id: "quadros", label: "Quadros" },
  { id: "chaveiros", label: "Chaveiros" },
  { id: "polaroids", label: "Polaroids" },
];

export const DEFAULT_CONTENT: SiteContent = {
  categories: [
    { id: "canecas", label: "Canecas" },
    { id: "azulejos", label: "Azulejos" },
    { id: "quadros", label: "Quadros" },
    { id: "chaveiros", label: "Chaveiros" },
    { id: "polaroids", label: "Polaroids" },
    { id: "camisetas", label: "Camisetas" },
  ],
  catalog: [
    {
      id: "mug-simple",
      category: "canecas",
      title: "Caneca Simples",
      description: "Cerâmica premium com impressão de alta qualidade e durabilidade.",
      price: "",
      image: mugImg,
    },
    {
      id: "mug-heart",
      category: "canecas",
      title: "Caneca Alça Coração",
      description: "Alça em formato de coração, perfeita para presentear quem você ama.",
      price: "",
      image: mugHeartImg,
    },
    {
      id: "mug-magic",
      category: "canecas",
      title: "Caneca Mágica",
      description: "A foto aparece com o calor da bebida. Uma surpresa a cada café.",
      price: "",
      image: mugMagicImg,
    },
    {
      id: "mug-color",
      category: "canecas",
      title: "Caneca Fundo Colorido",
      description: "Interior e alça coloridos para dar um toque especial à sua arte.",
      price: "",
      image: mugColorImg,
    },
    {
      id: "frame-a4",
      category: "quadros",
      title: "Quadro A4",
      description: "Moldura elegante com suas fotos e mensagens, pronta para decorar.",
      price: "",
      image: frameImg,
    },
    {
      id: "tile",
      category: "azulejos",
      title: "Azulejo",
      description: "Azulejo decorativo personalizado com apoio, ideal para presentear.",
      price: "",
      image: tileImg,
    },
    {
      id: "keychain",
      category: "chaveiros",
      title: "Chaveiro",
      description: "Chaveiro personalizado com foto ou calendário, para levar a lembrança sempre junto.",
      price: "",
      image: keychainImg,
    },
    {
      id: "polaroid",
      category: "polaroids",
      title: "Polaroid",
      description: "Suas fotos favoritas reveladas em estilo polaroid, cheias de charme.",
      price: "",
      image: polaroidImg,
    },
  ],
  gallery: [
    { id: "g1", src: gal1, alt: "Chaveiros personalizados de casal" },
    { id: "g2", src: gal2, alt: "Caneca alça coração Amor Infinito" },
    { id: "g3", src: gal3, alt: "Quadro 1 Coríntios com foto de casal" },
    { id: "g4", src: gal4, alt: "Quadro Amor com colagem de fotos" },
    { id: "g5", src: gal5, alt: "Quadro colagem de fotos de casal" },
    { id: "g6", src: gal6, alt: "Produto personalizado MATLA KS" },
    { id: "g7", src: gal7, alt: "Produto personalizado MATLA KS" },
    { id: "g8", src: gal8, alt: "Produto personalizado MATLA KS" },
    { id: "g9", src: gal9, alt: "Kit de canecas personalizadas" },
  ],
  testimonials: [
    { id: "t1", src: dep1 },
    { id: "t2", src: dep2 },
    { id: "t3", src: dep3 },
    { id: "t4", src: dep4 },
    { id: "t5", src: dep5 },
    { id: "t6", src: dep6 },
    { id: "t7", src: dep7 },
  ],
  footer: {
    description:
      "Especialistas em eternizar momentos. Produtos personalizados de alta qualidade para você ou sua empresa, com carinho em cada detalhe.",
    instagramHandle: "@matla_ks",
    instagramUrl:
      "https://www.instagram.com/matla_ks?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
    phoneDisplay: "(77) 99201-5868",
    whatsappNumber: "5577992015868",
    address: "Rua Naomar Alcântara, nº 112\nMaiquinique-BA",
    hours: "Seg a Sex, 8h às 18h\nSáb, 8h às 15h",
  },
  cloudinary: {
    cloudName: "",
    uploadPreset: "",
  },
};
