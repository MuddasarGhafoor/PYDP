"use client";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ChevronUp, Info, type LucideIcon } from "lucide-react";
import * as Select from "@radix-ui/react-select";
import { useId, type ReactNode } from "react";
export function ActionLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`button ${secondary ? "secondary" : ""}`}>{children}<ArrowRight size={17} aria-hidden="true" /></Link>;
}
export function PageIntro({ eyebrow, title, description, number }: { eyebrow: string; title: string; description: string; number: string }) {
  return <header className="page-intro"><div><p className="eyebrow"><span className="line" />{eyebrow}</p><h1>{title}</h1><p className="intro-copy">{description}</p></div><span className="page-number" aria-hidden="true">{number}</span></header>;
}
export function SectionHeading({ title, description, children }: { title: string; description?: string; children?: ReactNode }) {
  return <div className="section-heading"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{children}</div>;
}
export function Notice({ children }: { children: ReactNode }) { return <div className="notice"><Info size={18} aria-hidden="true" /><div>{children}</div></div>; }
export function IconBox({ icon: Icon, tone = "teal" }: { icon: LucideIcon; tone?: string }) { return <div className={`icon-box ${tone}`}><Icon size={25} strokeWidth={1.6} aria-hidden="true" /></div>; }
export function Progress({ count }: { count: number }) {
  return <div className="progress-wrap"><div className="progress-label"><span>{count} of 5 lessons completed</span><strong>{count * 20}%</strong></div><div className="progress" role="progressbar" aria-label="Learning progress" aria-valuemin={0} aria-valuemax={5} aria-valuenow={count}><span style={{ width: `${count * 20}%` }} /></div></div>;
}
export function Field({ label, value, onChange, placeholder, multiline = false, required = false, type = "text", name }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; multiline?: boolean; required?: boolean; type?: string; name?: string }) {
  const id = useId(); const props = { id, name, value, placeholder, required, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value) };
  return <div className="field"><label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>{multiline ? <textarea {...props} rows={5} /> : <input {...props} type={type} />}</div>;
}
export function CustomSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  const id = useId();
  return <div className="field"><label htmlFor={id}>{label}</label><Select.Root value={value} onValueChange={onChange}><Select.Trigger id={id} className="select-trigger"><Select.Value /><Select.Icon><ChevronDown size={17} /></Select.Icon></Select.Trigger><Select.Portal><Select.Content className="select-content" position="popper" sideOffset={5} collisionPadding={16}><Select.ScrollUpButton className="select-scroll"><ChevronUp size={16} /></Select.ScrollUpButton><Select.Viewport>{options.map(option => <Select.Item key={option} value={option} className="select-item"><Select.ItemText>{option}</Select.ItemText><Select.ItemIndicator><Check size={16} /></Select.ItemIndicator></Select.Item>)}</Select.Viewport><Select.ScrollDownButton className="select-scroll"><ChevronDown size={16} /></Select.ScrollDownButton></Select.Content></Select.Portal></Select.Root></div>;
}
