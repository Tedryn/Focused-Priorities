import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="flex justify-center gap-8">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-montserrat text-sm font-medium tracking-wide text-muted transition-colors duration-200 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border" />

        {/* Copyright + Tagline */}
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
          <p className="font-montserrat text-sm tracking-wide text-muted">
            &copy; {new Date().getFullYear()} Jeffrey Andersen. All rights reserved.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-montserrat text-sm tracking-wide text-muted transition-colors duration-200 hover:text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
