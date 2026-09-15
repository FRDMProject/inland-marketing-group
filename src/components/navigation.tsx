"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Logo() {
  return (
    <span className="brand">
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M4 29 15 9h9L13 29H4Zm14 0L29 9h7L25 29h-7Z" fill="currentColor" />
      </svg>
      <span>
        inland <span className="brand-sub">DIGITAL GROUP</span>
      </span>
    </span>
  );
}
export function Navigation() {
  const path = usePathname();
  const paid = path.startsWith("/lp/");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, []);
  const links = paid
    ? [
        ["#approach", "The approach"],
        ["#questions", "Questions"],
      ]
    : [
        ["/web-design", "Web design"],
        ["/services", "What we do"],
        ["/work", "Design lab"],
        ["/about", "The studio"],
      ];
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" aria-label="Inland Digital Group home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav
          className={open ? "nav-links is-open" : "nav-links"}
          id="primary-nav"
          aria-label="Main navigation"
        >
          {links.map(([href, text]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {text}
            </Link>
          ))}
          <Link
            href={paid ? "#start" : "/contact"}
            className="button button-small"
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={16} />
          </Link>
        </nav>
        <button
          ref={toggleRef}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
