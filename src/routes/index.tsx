import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, MapPin, Clock, Eye, Hand, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrailShare — Consent-First Live Location Sharing" },
      {
        name: "description",
        content:
          "Share your live location transparently and watch it on a real-time map. Consent-first, time-limited, and fully under your control.",
      },
      { property: "og:title", content: "TrailShare — Consent-First Live Location Sharing" },
      {
        property: "og:description",
        content: "Share your live location transparently and watch it on a real-time map.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Hand,
    title: "Explicit opt-in",
    body: "The share page plainly states what it does. Nothing is collected until the person taps “Start sharing.” No disguises, ever.",
  },
  {
    icon: Eye,
    title: "Always visible",
    body: "Anyone sharing sees a persistent banner and a one-tap stop button. They always know it’s on.",
  },
  {
    icon: Clock,
    title: "Time-limited",
    body: "Every session has an expiry. When time runs out, sharing stops automatically — no lingering access.",
  },
  {
    icon: Radio,
    title: "Real-time map",
    body: "Watch live positions update on an interactive map the moment they come in.",
  },
];

function Index() {
  const { session } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <MapPin className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">TrailShare</span>
        </div>
        <nav className="flex items-center gap-2">
          {session ? (
            <Button asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Get started</Link>
              </Button>
            </>
          )}
        </nav>
      </header>

      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24 text-primary-foreground">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Consent-first by design
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Live location sharing people can actually trust.
            </h1>
            <p className="mt-6 text-lg text-white/80">
              Create a session, send a clear share link, and watch live positions on a real-time
              map. Everyone sharing knows exactly when it’s on — and can stop anytime.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to={session ? "/dashboard" : "/auth"}>
                  {session ? "Open dashboard" : "Start a session"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight">Built around consent</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          The honest version of location sharing — for family trips, group meetups, and authorized
          testing. Use only with permission and within the law.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TrailShare</span>
          <span>Always get permission before sharing someone’s location.</span>
        </div>
      </footer>
    </div>
  );
}
