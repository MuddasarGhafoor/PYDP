"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, FileText, Save } from "lucide-react";
import { useApp } from "@/components/providers";
import { Field, Notice, PageIntro } from "@/components/ui";
import { labFields } from "@/lib/content";
import { answer } from "@/lib/store";
const steps = ["Identify", "Evidence", "Options", "Recommend", "Complete brief", "Review readiness"];
const titles = ["Identify the issue", "Evidence & sources", "Compare possible options", "Build the recommendation", "Complete the brief", "Review readiness"];
const checks = ["Problem is specific and clearly explained", "Target group is identified", "Evidence supports the concern", "More than one option has been considered", "Recommendation is practical and justified", "Responsible actor / partners are identified", "Resources, feasibility and timeline are considered", "Expected outcomes can be assessed", "References are included"];
export default function LabPage() {
  const { state, update, notify } = useApp(); const [step, setStep] = useState(0); const router = useRouter();
  function next() { if (step < 5) setStep(step + 1); else if (!answer(state, "topic").trim() || !answer(state, "problem").trim()) { setStep(0); notify("Please add at least a working title and problem description."); } else router.push("/submit"); }
  return <><PageIntro eyebrow="Youth Policy Lab" title="Turn an idea into a clear policy brief." description="Answer the guiding questions, organise your material and prepare a draft for internal PYDP review." number="03" />
    <section className="workspace content-section"><div className="workspace-header"><div><h2>My policy brief workspace</h2><p><Save size={14} />Your answers are saved in this browser on this device.</p></div><span className="tag"><FileText size={13} />Working draft</span></div><div className="workspace-body"><nav className="workspace-steps" aria-label="Policy brief steps">{steps.map((label, index) => <button key={label} className={step === index ? "active" : ""} aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><ArrowRight size={15} /></button>)}</nav><div className="workspace-form"><div className="panel-heading"><span className="eyebrow">Step {step + 1} of 6</span><span className="muted small">Build with purpose</span></div><h2>{titles[step]}</h2>
    {labFields[step].map(([key, label, type, placeholder]) => type === "check" ? <div key={key}><h3>Is your draft ready for internal review?</h3><p>Use this checklist before submitting. It helps identify gaps; it does not guarantee a particular assessment.</p><div className="checklist">{checks.map((text, i) => <label className="check" key={text}><input type="checkbox" checked={!!state.answers[`ready${i}`]} onChange={e => update(current => ({ ...current, answers: { ...current.answers, [`ready${i}`]: e.target.checked } }))} /><span>{text}</span></label>)}</div><p className="checklist-count"><Check size={15} />{checks.filter((_, i) => state.answers[`ready${i}`]).length} of {checks.length} preparation checks complete</p></div> : <Field key={key} label={label} value={answer(state, key)} multiline={type === "textarea"} placeholder={placeholder} onChange={value => update(current => ({ ...current, answers: { ...current.answers, [key]: value } }))} />)}
    {step === 5 && <Notice>When you submit, your draft is received by the PYDP conference demonstration/review process only. It is not submitted to a government department or external institution.</Notice>}
    <div className="workspace-actions"><button className="button secondary" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={17} />Previous</button><button className="button" onClick={next}>{step === 5 ? "Continue to submission" : "Save & continue"}<ArrowRight size={17} /></button></div></div></div></section>
  </>;
}
