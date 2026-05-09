"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { SiteLogo } from "@/components/site/site-logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { navLinks } from "@/content/site";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const navActiveClass = "!text-[#10b77f] font-medium";
const navIdleClass = "text-muted-foreground";

export function PageHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const updateFromScroll = () => {
      const hash = window.location.hash;
      const hashId = hash.startsWith("#") ? hash.slice(1) : "";
      if (hashId && ids.includes(hashId)) {
        setActiveHash(`#${hashId}`);
        return;
      }

      let bestId = "";
      let bestScore = 0;
      const anchorLine = 96;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, anchorLine);
        const score = visible > 0 ? visible : 0;
        if (score > bestScore) {
          bestScore = score;
          bestId = el.id;
        }
      }

      if (bestId && bestScore > 0) {
        setActiveHash(`#${bestId}`);
      }
    };

    const observer = new IntersectionObserver(updateFromScroll, {
      root: null,
      rootMargin: "-80px 0px -45% 0px",
      threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1],
    });

    for (const el of elements) observer.observe(el);
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("hashchange", updateFromScroll);
    const t = window.requestAnimationFrame(() => updateFromScroll());

    return () => {
      window.cancelAnimationFrame(t);
      observer.disconnect();
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("hashchange", updateFromScroll);
    };
  }, []);

  async function handleLogout() {
    toast.success("Signed out");
    await logout();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a110f]/90 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between sm:h-16">
        <SiteLogo />

        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-8 text-sm">
            {navLinks.map((item) => {
              const active = activeHash === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "transition-colors hover:text-white",
                    active ? navActiveClass : navIdleClass
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {loading ? (
              <span className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            ) : user ? (
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  className="rounded-lg bg-brand px-4 font-semibold text-zinc-950 hover:bg-brand/90"
                  asChild
                >
                  <Link href="/register">Sign Up</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-white" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      <div className={cn("border-t border-white/10 bg-[#0a110f] lg:hidden", open ? "block" : "hidden")}>
        <Container className="flex flex-col gap-3 py-4">
          {navLinks.map((item) => {
            const active = activeHash === item.href;

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm transition-colors hover:text-white",
                  active ? navActiveClass : navIdleClass
                )}
              >
                {item.label}
              </a>
            );
          })}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-3">
            {loading ? (
              <span className="h-9 w-full animate-pulse rounded-md bg-muted" />
            ) : user ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  className="w-full rounded-lg bg-brand font-semibold text-zinc-950 hover:bg-brand/90"
                  asChild
                >
                  <Link href="/register" onClick={() => setOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="w-full text-white" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
              </>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}