"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Compass, Menu, Moon, Sun, X, UserRound } from "lucide-react";
const navigation = [["/", "Home"], ["/opportunities", "Opportunities"], ["/learning", "Learning Hub"], ["/lab", "Policy Lab"], ["/mentors", "Mentor Connect"], ["/portfolio", "My Portfolio"]];
export function SiteHeader() {
  const pathname = usePathname(); const [open, setOpen] = useState(false); const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(event: KeyboardEvent) { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } }
    if (open) document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  function toggleTheme() {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("pydp_theme", theme); } catch { /* Theme remains usable without storage. */ }
  }
  return <header className="site-header"><div className="nav-inner"><Link className="brand" href="/" aria-label="PYDP home" onClick={() => setOpen(false)}><span className="brand-symbol"><Compass strokeWidth={1.6} /></span><span>PYDP</span></Link><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([href, label]) => <Link key={href} href={href} className={pathname === href || (href === "/lab" && pathname === "/submit") ? "active" : ""} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav><div className="nav-tools"><button className="icon-button theme-toggle" onClick={toggleTheme}><Moon className="light-icon" size={20} /><Sun className="dark-icon" size={20} /><span className="sr-only light-icon">Switch to dark theme</span><span className="sr-only dark-icon">Switch to light theme</span></button><Link className="student-space" href="/portfolio" onClick={() => setOpen(false)}><UserRound size={17} /><span>Student space</span></Link><button ref={menuButton} className="icon-button menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div><nav id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation" inert={!open}>{navigation.map(([href, label], index) => <Link key={href} href={href} className={pathname === href ? "active" : ""} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}><span><small>0{index + 1}</small>{label}</span><ArrowUpRight size={18} /></Link>)}</nav></header>;
}
export function SiteFooter() { return <footer className="site-footer"><div className="footer-main"><Link href="/" className="brand"><Compass size={25} /><span>PYDP</span></Link><p>Pakistan Youth Diplomacy &amp; Policy Pathways</p><span>Learn. Develop. Contribute.</span></div><div className="footer-bottom"><span>Conference prototype</span><span>Sample content and simulated review</span></div></footer>; }
