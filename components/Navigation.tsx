"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav aria-label="Main navigation" className="w-full bg-background">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-cormorant text-2xl font-semibold tracking-wide text-foreground transition-colors duration-200 hover:text-accent"
        >
           Jef
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-montserrat text-sm font-medium tracking-wide transition-all duration-200 ${
                isActive(item.href)
                  ? "text-accent underline decoration-accent decoration-[1px]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-[2px] w-6 bg-foreground transition-all duration-200 ${
              mobileOpen ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-foreground transition-all duration-200 ${
              mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Slide-Down Panel */}
      <div
        className={`overflow-hidden transition-all duration-200 md:hidden ${
          mobileOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-border px-6 pb-5 pt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`font-montserrat text-sm font-medium tracking-wide py-2 transition-colors duration-200 ${
                isActive(item.href)
                  ? "text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
