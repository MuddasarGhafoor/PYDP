"use client";
import { createContext, useContext, useState, useSyncExternalStore, useRef, useEffect, type ReactNode } from "react";
import { CheckCircle2, X } from "lucide-react";
import { getSnapshot, getServerSnapshot, subscribe, updateState, type DemoState } from "@/lib/store";
type AppContext = { state: DemoState; update: (fn: (state: DemoState) => DemoState) => boolean; notify: (message: string) => void };
const Context = createContext<AppContext | null>(null);
export function Providers({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [message, setMessage] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  function notify(text: string) {
    if (timeout.current) clearTimeout(timeout.current);
    setMessage(text); timeout.current = setTimeout(() => setMessage(""), 5000);
  }
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  function update(fn: (state: DemoState) => DemoState) {
    const saved = updateState(fn);
    if (!saved) notify("Browser storage is unavailable. Changes will last only for this session.");
    return saved;
  }
  return <Context.Provider value={{ state, update, notify }}>{children}<div className={`toast ${message ? "visible" : ""}`} role="status" aria-live="polite" aria-atomic="true">{message && <><CheckCircle2 size={19} aria-hidden="true" /><span>{message}</span><button className="icon-button" aria-label="Dismiss notification" onClick={() => setMessage("")}><X size={17} /></button></>}</div></Context.Provider>;
}
export function useApp() { const context = useContext(Context); if (!context) throw new Error("useApp requires Providers"); return context; }
