"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Clock } from "./Clock";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#certs", label: "Certifications" },
  { href: "/#patents", label: "Patents" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    document.body.classList.remove("mopen");
  }, [pathname]);

  const toggleMenu = () => document.body.classList.toggle("mopen");
  const closeMenu = () => document.body.classList.remove("mopen");

  return (
    <>
      <header className="top">
        <div className="wrap">
          <Link
            href="/"
            className="brand"
            onClick={closeMenu}
            aria-label="Shlok Goenka — home"
          >
            <span className="mk" aria-hidden="true" />
            Shlok <span className="last">Goenka</span>
          </Link>
          <nav className="nav">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="top-r">
            <span className="clk">
              <Clock />
            </span>
            <ThemeToggle />
            <button
              className="burger"
              onClick={toggleMenu}
              aria-label="Menu"
              type="button"
            >
              <i></i>
              <i></i>
              <i></i>
            </button>
          </div>
        </div>
      </header>
      <nav className="mmenu">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={closeMenu}>
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
