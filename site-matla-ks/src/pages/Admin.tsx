import React, { useState } from "react";
import {
  Lock,
  Save,
  Plus,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";
import { useContent } from "@/content/ContentContext";
import {
  SiteContent,
  CatalogItem,
  CATEGORIES,
} from "@/content/defaultContent";

/* ---------- helpers ---------- */

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

async function uploadToCloudinary(
  file: File,
  cloudName: string,
  uploadPreset: string
): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form }
  );
  if (!res.ok) {
    throw new Error(
      "Falha no upload. Confira o nome da nuvem e o preset no Cloudinary."
    );
  }
  const data = await res.json();
  return data.secure_url as string;
}

/* ---------- small UI pieces ---------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors";

function ImagePicker({
  value,
  onChange,
  cloudinary,
}: {
  value: string;
  onChange: (url: string) => void;
  cloudinary: { cloudName: string; uploadPreset: string };
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canUpload = cloudinary.cloudName && cloudinary.uploadPreset;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadToCloudinary(
        file,
        cloudinary.cloudName,
        cloudinary.uploadPreset
      );
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex gap-3 items-start">
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#0a0a0a] border border-white/10 flex-shrink-0">
        {value && (
          <img src={value} alt="" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <input
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Cole aqui o link (URL) da foto"
        />
        <div className="flex items-center gap-2">
          <label
            className={`inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
              canUpload
                ? "border-white/20 text-white/80 hover:bg-white/10"
                : "border-white/10 text-white/30 cursor-not-allowed"
            }`}
          >
            {uploading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )}
            {uploading ? "Enviando..." : "Enviar foto (Cloudinary)"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={!canUpload || uploading}
              onChange={handleFile}
            />
          </label>
          {!canUpload && (
            <span className="text-[11px] text-white/40">
              Configure o Cloudinary na aba "Configurações" para enviar fotos
              direto do celular/computador.
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
}

/* ---------- main page ---------- */

const TABS = [
  { id: "catalogo", label: "Catálogo" },
  { id: "galeria", label: "Galeria de Clientes" },
  { id: "depoimentos", label: "O que dizem sobre nós" },
  { id: "rodape", label: "Rodapé" },
  { id: "config", label: "Configurações" },
] as const;

export default function Admin() {
  const { content, save, verifyPassword, reset, remoteAvailable } = useContent();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("catalogo");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<
    { kind: "ok" | "local" | "err"; text: string } | null
  >(null);

  const data = draft ?? content;

  const update = (patch: Partial<SiteContent>) =>
    setDraft({ ...data, ...patch });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    const ok = await verifyPassword(password);
    setLoggingIn(false);
    if (ok) {
      setAuthed(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg(null);
    try {
      const where = await save(data, password);
      setSaveMsg(
        where === "remote"
          ? { kind: "ok", text: "Alterações salvas! O site já está atualizado para todos." }
          : {
              kind: "local",
              text:
                "Salvo apenas neste navegador (modo de teste). No site publicado na Netlify, as alterações valem para todos os visitantes.",
            }
      );
      setDraft(null);
    } catch {
      setSaveMsg({ kind: "err", text: "Senha incorreta ou erro ao salvar." });
    } finally {
      setSaving(false);
    }
  };

  /* ----- login screen ----- */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-[#111111] border border-white/10 rounded-2xl p-8"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Lock size={20} />
          </div>
          <h1 className="font-serif text-2xl text-center mb-2">Área do Dono</h1>
          <p className="text-white/50 text-sm text-center mb-6">
            Digite a senha para editar o site da MATLA KS.
          </p>
          <input
            type="password"
            className={inputCls}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {loginError && (
            <p className="text-red-400 text-sm mt-2">Senha incorreta.</p>
          )}
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full mt-5 bg-white text-black font-medium rounded-lg py-2.5 hover:bg-white/90 transition-colors disabled:opacity-60"
          >
            {loggingIn ? "Verificando..." : "Entrar"}
          </button>
          <Link
            href="/"
            className="block text-center text-white/40 text-sm mt-4 hover:text-white"
          >
            ← Voltar para o site
          </Link>
        </form>
      </div>
    );
  }

  /* ----- editors ----- */

  const catalogEditor = (
    <div className="space-y-6">
      {data.catalog.map((item, i) => (
        <div
          key={item.id}
          className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">Produto {i + 1}</span>
            <button
              onClick={() =>
                update({ catalog: data.catalog.filter((c) => c.id !== item.id) })
              }
              className="text-white/40 hover:text-red-400 transition-colors"
              title="Excluir produto"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <ImagePicker
            value={item.image}
            cloudinary={data.cloudinary}
            onChange={(url) =>
              update({
                catalog: data.catalog.map((c) =>
                  c.id === item.id ? { ...c, image: url } : c
                ),
              })
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Nome do produto">
              <input
                className={inputCls}
                value={item.title}
                onChange={(e) =>
                  update({
                    catalog: data.catalog.map((c) =>
                      c.id === item.id ? { ...c, title: e.target.value } : c
                    ),
                  })
                }
              />
            </Field>
            <Field label="Preço (ex.: R$ 35,00)">
              <input
                className={inputCls}
                value={item.price}
                placeholder="Deixe vazio para não mostrar"
                onChange={(e) =>
                  update({
                    catalog: data.catalog.map((c) =>
                      c.id === item.id ? { ...c, price: e.target.value } : c
                    ),
                  })
                }
              />
            </Field>
            <Field label="Categoria">
              <select
                className={inputCls}
                value={item.category}
                onChange={(e) =>
                  update({
                    catalog: data.catalog.map((c) =>
                      c.id === item.id ? { ...c, category: e.target.value } : c
                    ),
                  })
                }
              >
                {CATEGORIES.filter((c) => c.id !== "todos").map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Descrição">
            <textarea
              className={`${inputCls} min-h-[70px]`}
              value={item.description}
              onChange={(e) =>
                update({
                  catalog: data.catalog.map((c) =>
                    c.id === item.id
                      ? { ...c, description: e.target.value }
                      : c
                  ),
                })
              }
            />
          </Field>
        </div>
      ))}
      <button
        onClick={() =>
          update({
            catalog: [
              ...data.catalog,
              {
                id: uid(),
                category: "canecas",
                title: "Novo produto",
                description: "",
                price: "",
                image: "",
              } as CatalogItem,
            ],
          })
        }
        className="flex items-center gap-2 text-sm text-white/70 border border-dashed border-white/20 rounded-xl px-5 py-3 hover:text-white hover:border-white/40 transition-colors"
      >
        <Plus size={16} /> Adicionar produto
      </button>
    </div>
  );

  const galleryEditor = (
    <div className="space-y-6">
      {data.gallery.map((img, i) => (
        <div
          key={img.id}
          className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">Foto {i + 1}</span>
            <button
              onClick={() =>
                update({ gallery: data.gallery.filter((g) => g.id !== img.id) })
              }
              className="text-white/40 hover:text-red-400 transition-colors"
              title="Excluir foto"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <ImagePicker
            value={img.src}
            cloudinary={data.cloudinary}
            onChange={(url) =>
              update({
                gallery: data.gallery.map((g) =>
                  g.id === img.id ? { ...g, src: url } : g
                ),
              })
            }
          />
        </div>
      ))}
      <button
        onClick={() =>
          update({ gallery: [...data.gallery, { id: uid(), src: "", alt: "Foto de cliente MATLA KS" }] })
        }
        className="flex items-center gap-2 text-sm text-white/70 border border-dashed border-white/20 rounded-xl px-5 py-3 hover:text-white hover:border-white/40 transition-colors"
      >
        <Plus size={16} /> Adicionar foto
      </button>
    </div>
  );

  const testimonialsEditor = (
    <div className="space-y-6">
      <p className="text-white/50 text-sm">
        Prints de conversas do WhatsApp com elogios dos clientes. Dica: borre
        nomes, números e rostos antes de enviar.
      </p>
      {data.testimonials.map((t, i) => (
        <div
          key={t.id}
          className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-white/40 text-xs">Print {i + 1}</span>
            <button
              onClick={() =>
                update({
                  testimonials: data.testimonials.filter((x) => x.id !== t.id),
                })
              }
              className="text-white/40 hover:text-red-400 transition-colors"
              title="Excluir print"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <ImagePicker
            value={t.src}
            cloudinary={data.cloudinary}
            onChange={(url) =>
              update({
                testimonials: data.testimonials.map((x) =>
                  x.id === t.id ? { ...x, src: url } : x
                ),
              })
            }
          />
        </div>
      ))}
      <button
        onClick={() =>
          update({ testimonials: [...data.testimonials, { id: uid(), src: "" }] })
        }
        className="flex items-center gap-2 text-sm text-white/70 border border-dashed border-white/20 rounded-xl px-5 py-3 hover:text-white hover:border-white/40 transition-colors"
      >
        <Plus size={16} /> Adicionar print
      </button>
    </div>
  );

  const footerEditor = (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-4 max-w-2xl">
      <Field label="Texto de apresentação">
        <textarea
          className={`${inputCls} min-h-[80px]`}
          value={data.footer.description}
          onChange={(e) =>
            update({ footer: { ...data.footer, description: e.target.value } })
          }
        />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Instagram (@usuario)">
          <input
            className={inputCls}
            value={data.footer.instagramHandle}
            onChange={(e) =>
              update({
                footer: { ...data.footer, instagramHandle: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Link do Instagram">
          <input
            className={inputCls}
            value={data.footer.instagramUrl}
            onChange={(e) =>
              update({ footer: { ...data.footer, instagramUrl: e.target.value } })
            }
          />
        </Field>
        <Field label="Telefone (como aparece no site)">
          <input
            className={inputCls}
            value={data.footer.phoneDisplay}
            onChange={(e) =>
              update({ footer: { ...data.footer, phoneDisplay: e.target.value } })
            }
          />
        </Field>
        <Field label="Número do WhatsApp (só números, ex.: 5577992015868)">
          <input
            className={inputCls}
            value={data.footer.whatsappNumber}
            onChange={(e) =>
              update({
                footer: {
                  ...data.footer,
                  whatsappNumber: e.target.value.replace(/\D/g, ""),
                },
              })
            }
          />
        </Field>
      </div>
      <Field label="Endereço">
        <textarea
          className={`${inputCls} min-h-[60px]`}
          value={data.footer.address}
          onChange={(e) =>
            update({ footer: { ...data.footer, address: e.target.value } })
          }
        />
      </Field>
      <Field label="Horário de atendimento">
        <textarea
          className={`${inputCls} min-h-[60px]`}
          value={data.footer.hours}
          onChange={(e) =>
            update({ footer: { ...data.footer, hours: e.target.value } })
          }
        />
      </Field>
    </div>
  );

  const configEditor = (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 space-y-4 max-w-2xl">
      <h3 className="text-white/90 font-medium">Cloudinary (upload de fotos)</h3>
      <p className="text-white/50 text-sm">
        Preencha estes dois campos uma única vez (veja o passo a passo no
        arquivo LEIA-ME). Depois disso, o botão "Enviar foto" funciona em todas
        as seções.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Cloud name (nome da nuvem)">
          <input
            className={inputCls}
            value={data.cloudinary.cloudName}
            placeholder="ex.: dabc123xy"
            onChange={(e) =>
              update({
                cloudinary: { ...data.cloudinary, cloudName: e.target.value.trim() },
              })
            }
          />
        </Field>
        <Field label="Upload preset (não assinado)">
          <input
            className={inputCls}
            value={data.cloudinary.uploadPreset}
            placeholder="ex.: matlaks"
            onChange={(e) =>
              update({
                cloudinary: {
                  ...data.cloudinary,
                  uploadPreset: e.target.value.trim(),
                },
              })
            }
          />
        </Field>
      </div>
      <div className="border-t border-white/10 pt-4">
        <button
          onClick={() => {
            if (
              window.confirm(
                "Isso desfaz todas as alterações feitas neste navegador e volta ao conteúdo original. Continuar?"
              )
            ) {
              reset();
              setDraft(null);
            }
          }}
          className="text-sm text-red-400/80 hover:text-red-400 transition-colors"
        >
          Restaurar conteúdo original
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* top bar */}
      <div className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/50 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-serif text-xl">
              Painel MATLA KS
            </h1>
            {!remoteAvailable && (
              <span className="hidden md:inline text-[11px] text-amber-400/80 border border-amber-400/30 rounded-full px-3 py-1">
                Modo de teste — na Netlify as alterações valem para todos
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-white text-black font-medium rounded-full px-5 py-2.5 text-sm hover:bg-white/90 transition-colors disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Salvar alterações
          </button>
        </div>
        {saveMsg && (
          <div
            className={`container mx-auto px-6 pb-3 flex items-center gap-2 text-sm ${
              saveMsg.kind === "err"
                ? "text-red-400"
                : saveMsg.kind === "local"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            {saveMsg.kind === "err" ? (
              <AlertTriangle size={15} />
            ) : (
              <CheckCircle2 size={15} />
            )}
            {saveMsg.text}
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                tab === t.id
                  ? "bg-white text-black border-white"
                  : "text-white/60 border-white/15 hover:text-white hover:border-white/40"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "catalogo" && catalogEditor}
        {tab === "galeria" && galleryEditor}
        {tab === "depoimentos" && testimonialsEditor}
        {tab === "rodape" && footerEditor}
        {tab === "config" && configEditor}
      </div>
    </div>
  );
}
