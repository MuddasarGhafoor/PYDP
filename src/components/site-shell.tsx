"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Compass, Menu, Moon, Sun, X, UserRound } from "lucide-react";

const navigation = [
  ["/", "Home"],
  ["/opportunities", "Opportunities"],
  ["/learning", "Learning Hub"],
  ["/lab", "Policy Lab"],
  ["/mentors", "Mentor Connect"],
  ["/portfolio", "My Portfolio"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open || !drawer.current) return;
    const dialog = drawer.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    // Closing at the desktop breakpoint also releases the modal focus trap.
    const desktop = window.matchMedia("(min-width: 981px)");
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onResize);
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onResize);
      menuButton.current?.focus({ preventScroll: true });
    };
  }, [open]);

  function toggleTheme() {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("pydp_theme", theme); } catch { /* Theme remains usable without storage. */ }
  }

  const active = (href: string) => pathname === href || (href === "/lab" && pathname === "/submit");

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="brand" href="/" scroll={false} aria-label="PYDP home">
          <span className="brand-symbol"><Compass strokeWidth={1.6} /></span><span>PYDP</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(([href, label]) => (
            <Link key={href} href={href} scroll={false} className={active(href) ? "active" : ""} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <div className="nav-tools">
          <button className="icon-button theme-toggle" onClick={toggleTheme}>
            <Moon className="light-icon" size={20} /><Sun className="dark-icon" size={20} />
            <span className="sr-only light-icon">Switch to dark theme</span><span className="sr-only dark-icon">Switch to light theme</span>
          </button>
          <Link className="student-space" href="/portfolio" scroll={false}><UserRound size={17} /><span>Student space</span></Link>
          <button ref={menuButton} className="icon-button menu-toggle" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </div>
      <dialog ref={drawer} id="mobile-nav" className="mobile-drawer" aria-label="Mobile navigation" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
        <div className="drawer-header">
          <Link className="brand" href="/" scroll={false} onClick={() => setOpen(false)}><Compass size={28} /><span>PYDP</span></Link>
          <button className="icon-button" aria-label="Close navigation" onClick={() => setOpen(false)} autoFocus><X /></button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation links">
          {navigation.map(([href, label], index) => (
            <Link key={href} href={href} scroll={false} className={active(href) ? "active" : ""} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
              <span><small>0{index + 1}</small>{label}</span><ArrowUpRight size={21} />
            </Link>
          ))}
        </nav>
        <div className="drawer-footer"><p>Pakistan Youth Diplomacy &amp; Policy Pathways</p><span>Learn. Develop. Contribute.</span></div>
      </dialog>
    </header>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-main"><Link href="/" className="brand"><Compass size={25} /><span>PYDP</span></Link><p>Pakistan Youth Diplomacy &amp; Policy Pathways</p><span>Learn. Develop. Contribute.</span></div><div className="footer-bottom"><span>Conference prototype</span><span>Sample content and simulated review</span></div></footer>;
}
