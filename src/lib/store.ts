import { feedbackExamples } from "./content";
export type ReviewStatus = keyof typeof feedbackExamples;
export type Student = { name: string; institution: string; discipline: string; year: string; email: string };
export type DemoState = {
  answers: Record<string, string | boolean>; lessonAnswers: Record<string, string>; completed: number[]; submitted: boolean;
  status?: ReviewStatus; reference?: string; submissionDate?: string; student?: Student; contributionType?: string; submissionSummary?: string;
  feedback?: string; actions?: string[]; revision?: boolean; revisionNote?: string; revisions?: { note: string; date: string }[];
  mentorRequest?: { topic: string; message: string }; discussion?: { title: string; note: string };
};
const initial: DemoState = { answers: {}, lessonAnswers: {}, completed: [], submitted: false };
let cached: DemoState = initial;
let loaded = false;
const listeners = new Set<() => void>();
function read(): DemoState {
  try {
    const raw = JSON.parse(localStorage.getItem("pydp_demo") || "null");
    if (!raw || typeof raw !== "object") return initial;
    const answers = Object.fromEntries(Object.entries(raw.answers || {}).filter(([, v]) => typeof v === "string" || typeof v === "boolean"));
    const lessonAnswers = Object.fromEntries(Object.entries(raw.lessonAnswers || {}).filter(([, v]) => typeof v === "string"));
    return { ...initial, ...raw, answers, lessonAnswers,
      completed: Array.isArray(raw.completed) ? [...new Set<number>(raw.completed.filter((n: unknown) => typeof n === "number" && Number.isInteger(n) && n >= 0 && n < 5))] : [],
      status: raw.status in feedbackExamples ? raw.status : undefined,
      actions: Array.isArray(raw.actions) ? raw.actions.filter((a: unknown) => typeof a === "string") : [],
      revisions: Array.isArray(raw.revisions) ? raw.revisions.filter((r: { note?: unknown; date?: unknown }) => r && typeof r.note === "string" && typeof r.date === "string") : [],
    } as DemoState;
  } catch { return initial; }
}
export function getSnapshot() { if (!loaded) { cached = read(); loaded = true; } return cached; }
export function getServerSnapshot() { return initial; }
export function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => { if (event.key === "pydp_demo" || event.key === null) { cached = read(); listeners.forEach(fn => fn()); } };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", onStorage); };
}
export function updateState(updater: (current: DemoState) => DemoState) {
  cached = updater(getSnapshot());
  let saved = true;
  try { localStorage.setItem("pydp_demo", JSON.stringify(cached)); } catch { saved = false; }
  listeners.forEach(fn => fn());
  return saved;
}
export function answer(state: DemoState, key: string) { return typeof state.answers[key] === "string" ? state.answers[key] as string : ""; }
