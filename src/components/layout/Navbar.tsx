import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/communities", label: "Our Communities" },
    // { href: "/talent", label: "Talent Discovery" },
    { href: "/about", label: "About" },
    { href: "/admin", label: "Admin", admin: true },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-3" : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-primary/30">
              ICH
            </div>
            <span className="font-display font-bold text-sm tracking-tight sm:text-xl group-hover:text-primary transition-colors">
              Innovation<span className="text-primary"> Community </span>Hub
            </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className={`text-sm font-medium hover:text-primary transition-colors ${
                location === link.href ? "text-primary" : "text-muted-foreground"
              }`}>
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login">
            <a className="text-sm font-medium hover:text-primary transition-colors">Log In</a>
          </Link>
          <Link href="/get-involved">
            <Button className="font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              Get Involved
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-10">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className={`text-lg font-medium ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}>
                    {link.label}
                  </a>
                </Link>
              ))}
              <hr className="border-border" />
              <Link href="/login">
                <a className="text-lg font-medium text-foreground">Log In</a>
              </Link>
              <Link href="/get-involved">
                <Button className="w-full font-bold">Get Involved</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
