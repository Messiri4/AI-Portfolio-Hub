import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#skills" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Terminal size={18} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              MIRACLE<span className="text-primary">.AI</span>
            </span>
          </div>
        </Link>
        
        <div className="hidden md:flex md:gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary font-mono",
                location === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Mobile menu could go here, omitting for brevity in this specific generation to focus on technical content */}
      </div>
    </nav>
  );
}
