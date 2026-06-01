"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "Packages", id: "packages" },
  { label: "PrintPing", id: "printping" },
  { label: "Training", id: "training" },
  { label: "Contact", id: "contact" },
];

type NavbarProps = {
  onNavigate: (id: string) => void;
  onQuote: () => void;
};

export default function Navbar({ onNavigate, onQuote }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        isScrolled
          ? "bg-surface/90 backdrop-blur border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleNav("hero")}
          className="flex items-center gap-3 text-left"
        >
          <span className="text-xl font-semibold font-display tracking-tight">
            edfleet3d
          </span>
        </button>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="transition text-muted hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={onQuote}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Get a Quote
          </button>
        </div>
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-full border border-border px-3 py-2 text-sm"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>
      <div
        className={`md:hidden transition-all ${
          isOpen
            ? "max-h-[400px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto flex flex-col gap-4 px-4 pb-6 pt-2 sm:px-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className="text-left text-lg text-muted transition hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onQuote}
            className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Get a Quote
          </button>
        </div>
      </div>
    </header>
  );
}
