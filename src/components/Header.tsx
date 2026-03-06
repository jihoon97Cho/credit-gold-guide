import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <button onClick={() => scrollTo("#home")} className="flex items-center gap-2">
          <img src={logo} alt={COMPANY.name} className="h-10 w-auto" />
          <span className="hidden text-lg font-bold text-foreground sm:inline">{COMPANY.name}</span>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button onClick={() => scrollTo("#pricing")} className="rounded-full">
            Get Started
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="block w-full py-3 text-left text-foreground">
              {l.label}
            </button>
          ))}
          <Button onClick={() => scrollTo("#pricing")} className="mt-2 w-full rounded-full">
            Get Started
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
