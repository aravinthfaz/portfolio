import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  KeyRound,
  Loader2,
  LogOut,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { iconNames, type SiteContent } from "./content";
import {
  REPO_NAME,
  REPO_OWNER,
  loadContent,
  saveContent,
  verifyToken,
} from "./github";

const TOKEN_KEY = "portfolio-admin-token";
const siteUrl = () => window.location.href.split("#")[0];

const inputClass =
  "w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/40";

function Field({
  label,
  value,
  onChange,
  multiline,
  rows = 3,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </span>
      {multiline ? (
        <textarea
          className={`${inputClass} resize-y`}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          className={inputClass}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {hint && (
        <span className="block text-xs text-slate-500 mt-1">{hint}</span>
      )}
    </label>
  );
}

function LinesField({
  label,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  rows?: number;
}) {
  return (
    <Field
      label={label}
      value={value.join("\n")}
      onChange={(v) => onChange(v.split("\n"))}
      multiline
      rows={rows}
      hint="One per line"
    />
  );
}

function IconSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-300 mb-1">
        Icon
      </span>
      <select
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {iconNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

function ListEditor<T>({
  items,
  onChange,
  newItem,
  itemLabel,
  render,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  itemLabel: (item: T, index: number) => string;
  render: (item: T, update: (item: T) => void) => ReactNode;
}) {
  const move = (from: number, to: number) => {
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-sky-400 truncate">
              {itemLabel(item, i)}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                title="Move up"
                disabled={i === 0}
                onClick={() => move(i, i - 1)}
                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-700 disabled:opacity-30"
              >
                <ArrowUp size={16} />
              </button>
              <button
                type="button"
                title="Move down"
                disabled={i === items.length - 1}
                onClick={() => move(i, i + 1)}
                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-700 disabled:opacity-30"
              >
                <ArrowDown size={16} />
              </button>
              <button
                type="button"
                title="Delete"
                onClick={() => {
                  if (confirm(`Delete "${itemLabel(item, i)}"?`))
                    onChange(items.filter((_, j) => j !== i));
                }}
                className="p-1.5 rounded-md text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          {render(item, (updated) =>
            onChange(items.map((it, j) => (j === i ? updated : it))),
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-slate-600 text-slate-300 hover:border-sky-500/60 hover:text-sky-400"
      >
        <Plus size={16} /> Add
      </button>
    </div>
  );
}

const cleanLines = (lines: string[]) =>
  lines.map((l) => l.trim()).filter(Boolean);

function cleanContent(c: SiteContent): SiteContent {
  return {
    ...c,
    about: { ...c.about, paragraphs: cleanLines(c.about.paragraphs) },
    experiences: c.experiences.map((e) => ({ ...e, tags: cleanLines(e.tags) })),
    skillCategories: c.skillCategories.map((s) => ({
      ...s,
      items: cleanLines(s.items),
    })),
  };
}

const tabs = [
  "Hero",
  "About",
  "Experience",
  "Education",
  "Skills",
  "Highlights",
  "Contact",
] as const;
type Tab = (typeof tabs)[number];

function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [token, setToken] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const value = token.trim();
      await verifyToken(value);
      (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, value);
      onLogin(value);
    } catch (err) {
      setError(`Login failed (${(err as Error).message})`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
            <KeyRound size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Portfolio Admin</h1>
            <p className="text-sm text-slate-400">Sign in to edit your site</p>
          </div>
        </div>
        <Field
          label="GitHub access token"
          type="password"
          value={token}
          onChange={setToken}
        />
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me on this device
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={busy || !token.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-violet-500 font-semibold disabled:opacity-50"
        >
          {busy && <Loader2 size={16} className="animate-spin" />} Sign in
        </button>
        <details className="text-sm text-slate-400">
          <summary className="cursor-pointer text-slate-300">
            How do I get a token?
          </summary>
          <ol className="list-decimal ml-5 mt-2 space-y-1">
            <li>
              Open{" "}
              <a
                className="text-sky-400 underline"
                href="https://github.com/settings/personal-access-tokens/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub → New fine-grained token
              </a>
              .
            </li>
            <li>
              Repository access: <b>Only select repositories</b> →{" "}
              <b>
                {REPO_OWNER}/{REPO_NAME}
              </b>
              .
            </li>
            <li>
              Permissions → Repository → <b>Contents: Read and write</b>.
            </li>
            <li>Generate, copy the token and paste it above.</li>
          </ol>
        </details>
      </form>
    </div>
  );
}

function Dashboard({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [tab, setTab] = useState<Tab>("Hero");
  const [status, setStatus] = useState<{
    kind: "idle" | "saving" | "ok" | "error";
    text?: string;
  }>({ kind: "idle" });
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    loadContent(token)
      .then((c) => {
        setContent(c);
        setSaved(JSON.stringify(c));
      })
      .catch((err) => setLoadError((err as Error).message));
  }, [token]);

  const dirty = content !== null && JSON.stringify(content) !== saved;

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (loadError)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-950 text-slate-100">
        <p className="text-red-400">Couldn't load content: {loadError}</p>
        <button onClick={onLogout} className="underline text-slate-300">
          Sign out
        </button>
      </div>
    );
  if (!content)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        <Loader2 className="animate-spin mr-2" /> Loading content…
      </div>
    );

  const update = (fn: (draft: SiteContent) => void) =>
    setContent((c) => {
      const draft = structuredClone(c!);
      fn(draft);
      return draft;
    });

  const save = async () => {
    const cleaned = cleanContent(content);
    setStatus({ kind: "saving" });
    try {
      await saveContent(token, cleaned);
      setContent(cleaned);
      setSaved(JSON.stringify(cleaned));
      setStatus({
        kind: "ok",
        text: "Saved. Your live site updates in about 1–2 minutes.",
      });
    } catch (err) {
      setStatus({ kind: "error", text: (err as Error).message });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center gap-3">
          <h1 className="text-lg font-bold mr-auto">Portfolio Admin</h1>
          {status.kind !== "idle" && status.kind !== "saving" && (
            <span
              className={`text-sm ${status.kind === "ok" ? "text-emerald-400" : "text-red-400"}`}
            >
              {status.text}
            </span>
          )}
          {dirty && status.kind !== "saving" && (
            <span className="text-sm text-amber-400">Unsaved changes</span>
          )}
          <a
            href={siteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800"
          >
            <ExternalLink size={16} /> View site
          </a>
          <button
            onClick={save}
            disabled={!dirty || status.kind === "saving"}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-sky-500 to-violet-500 disabled:opacity-40"
          >
            {status.kind === "saving" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save & publish
          </button>
          <button
            onClick={() => {
              if (!dirty || confirm("Discard unsaved changes and sign out?"))
                onLogout();
            }}
            title="Sign out"
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-800"
          >
            <LogOut size={18} />
          </button>
        </div>
        <nav className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap ${tab === t ? "border-sky-400 text-sky-400" : "border-transparent text-slate-400 hover:text-slate-200"}`}
            >
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {tab === "Hero" && (
          <>
            <Field
              label="Name"
              value={content.name}
              onChange={(v) => update((d) => void (d.name = v))}
            />
            <Field
              label="Initials (top-left logo)"
              value={content.initials}
              onChange={(v) => update((d) => void (d.initials = v))}
            />
            <Field
              label="Badge text"
              value={content.availability}
              onChange={(v) => update((d) => void (d.availability = v))}
            />
            <Field
              label="Summary"
              value={content.heroSummary}
              onChange={(v) => update((d) => void (d.heroSummary = v))}
              multiline
              hint="Wrap words in **double asterisks** to highlight them."
            />
            <Field
              label="Browser tab title"
              value={content.siteTitle}
              onChange={(v) => update((d) => void (d.siteTitle = v))}
            />
          </>
        )}

        {tab === "About" && (
          <>
            <Field
              label="Paragraphs"
              value={content.about.paragraphs.join("\n\n")}
              onChange={(v) =>
                update((d) => void (d.about.paragraphs = v.split("\n\n")))
              }
              multiline
              rows={10}
              hint="Leave a blank line between paragraphs. The first paragraph is shown larger. Wrap words in **double asterisks** to highlight them."
            />
            <h2 className="text-lg font-semibold pt-2">Stats</h2>
            <ListEditor
              items={content.about.stats}
              onChange={(v) => update((d) => void (d.about.stats = v))}
              newItem={() => ({ value: "", label: "" })}
              itemLabel={(s, i) => s.label || `Stat ${i + 1}`}
              render={(s, set) => (
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Value"
                    value={s.value}
                    onChange={(v) => set({ ...s, value: v })}
                  />
                  <Field
                    label="Label"
                    value={s.label}
                    onChange={(v) => set({ ...s, label: v })}
                  />
                </div>
              )}
            />
          </>
        )}

        {tab === "Experience" && (
          <ListEditor
            items={content.experiences}
            onChange={(v) => update((d) => void (d.experiences = v))}
            newItem={() => ({
              title: "New role",
              company: "",
              period: "",
              description: "",
              tags: [],
            })}
            itemLabel={(e) => `${e.title}${e.company ? ` · ${e.company}` : ""}`}
            render={(e, set) => (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Job title"
                    value={e.title}
                    onChange={(v) => set({ ...e, title: v })}
                  />
                  <Field
                    label="Period"
                    value={e.period}
                    onChange={(v) => set({ ...e, period: v })}
                  />
                </div>
                <Field
                  label="Company & location"
                  value={e.company}
                  onChange={(v) => set({ ...e, company: v })}
                />
                <Field
                  label="Description"
                  value={e.description}
                  onChange={(v) => set({ ...e, description: v })}
                  multiline
                  rows={6}
                />
                <LinesField
                  label="Tags"
                  value={e.tags}
                  onChange={(v) => set({ ...e, tags: v })}
                />
              </>
            )}
          />
        )}

        {tab === "Education" && (
          <ListEditor
            items={content.education}
            onChange={(v) => update((d) => void (d.education = v))}
            newItem={() => ({
              degree: "New degree",
              school: "",
              period: "",
              description: "",
            })}
            itemLabel={(e) => e.degree}
            render={(e, set) => (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Degree"
                    value={e.degree}
                    onChange={(v) => set({ ...e, degree: v })}
                  />
                  <Field
                    label="Period"
                    value={e.period}
                    onChange={(v) => set({ ...e, period: v })}
                  />
                </div>
                <Field
                  label="School"
                  value={e.school}
                  onChange={(v) => set({ ...e, school: v })}
                />
                <Field
                  label="Description"
                  value={e.description}
                  onChange={(v) => set({ ...e, description: v })}
                  multiline
                />
              </>
            )}
          />
        )}

        {tab === "Skills" && (
          <ListEditor
            items={content.skillCategories}
            onChange={(v) => update((d) => void (d.skillCategories = v))}
            newItem={() => ({
              category: "New category",
              icon: "Code",
              items: [],
            })}
            itemLabel={(s) => s.category}
            render={(s, set) => (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Category name"
                    value={s.category}
                    onChange={(v) => set({ ...s, category: v })}
                  />
                  <IconSelect
                    value={s.icon}
                    onChange={(v) => set({ ...s, icon: v })}
                  />
                </div>
                <LinesField
                  label="Skills"
                  value={s.items}
                  onChange={(v) => set({ ...s, items: v })}
                  rows={8}
                />
              </>
            )}
          />
        )}

        {tab === "Highlights" && (
          <ListEditor
            items={content.highlights}
            onChange={(v) => update((d) => void (d.highlights = v))}
            newItem={() => ({
              title: "New highlight",
              description: "",
              icon: "Award",
            })}
            itemLabel={(h) => h.title}
            render={(h, set) => (
              <>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field
                    label="Title"
                    value={h.title}
                    onChange={(v) => set({ ...h, title: v })}
                  />
                  <IconSelect
                    value={h.icon}
                    onChange={(v) => set({ ...h, icon: v })}
                  />
                </div>
                <Field
                  label="Description"
                  value={h.description}
                  onChange={(v) => set({ ...h, description: v })}
                  multiline
                />
              </>
            )}
          />
        )}

        {tab === "Contact" && (
          <>
            <Field
              label="Intro text"
              value={content.contact.intro}
              onChange={(v) => update((d) => void (d.contact.intro = v))}
              multiline
            />
            <Field
              label="Email (also receives contact-form messages)"
              value={content.contact.email}
              onChange={(v) => update((d) => void (d.contact.email = v))}
            />
            <Field
              label="Phone"
              value={content.contact.phone}
              onChange={(v) => update((d) => void (d.contact.phone = v))}
            />
            <Field
              label="Location"
              value={content.contact.location}
              onChange={(v) => update((d) => void (d.contact.location = v))}
            />
            <Field
              label="LinkedIn URL"
              value={content.contact.linkedin}
              onChange={(v) => update((d) => void (d.contact.linkedin = v))}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY),
  );
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };
  useEffect(() => {
    document.title = "Portfolio Admin";
  }, []);
  return token ? (
    <Dashboard token={token} onLogout={logout} />
  ) : (
    <Login onLogin={setToken} />
  );
}
