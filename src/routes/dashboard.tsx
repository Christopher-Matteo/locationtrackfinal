import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MapPin,
  Plus,
  Copy,
  Check,
  Power,
  Trash2,
  LogOut,
  Clock,
  Radio,
  Link2,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { LiveMap, type MapPoint } from "@/components/LiveMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — TrailShare" }] }),
  component: Dashboard,
});

type Session = {
  id: string;
  label: string;
  share_token: string;
  sharer_name: string | null;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
};

type Ping = {
  id: string;
  session_id: string;
  lat: number;
  lon: number;
  accuracy: number | null;
  created_at: string;
};

function Dashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  const sessionsQuery = useQuery({
    queryKey: ["sessions"],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sharing_sessions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Session[];
    },
  });

  const sessions = sessionsQuery.data ?? [];
  const sessionIds = sessions.map((s) => s.id);

  const pingsQuery = useQuery({
    queryKey: ["pings", sessionIds.join(",")],
    enabled: !!user && sessionIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("location_pings")
        .select("*")
        .in("session_id", sessionIds)
        .order("created_at", { ascending: false })
        .limit(400);
      if (error) throw error;
      return data as Ping[];
    },
  });

  // realtime
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("dash-pings")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "location_pings" }, () => {
        qc.invalidateQueries({ queryKey: ["pings"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "sharing_sessions" }, () => {
        qc.invalidateQueries({ queryKey: ["sessions"] });
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, qc]);

  const isExpired = (s: Session) => (s.expires_at ? new Date(s.expires_at).getTime() < Date.now() : false);
  const isLive = (s: Session) => s.is_active && !isExpired(s);

  // latest ping per session
  const latestBySession = useMemo(() => {
    const map = new Map<string, Ping>();
    for (const p of pingsQuery.data ?? []) {
      if (!map.has(p.session_id)) map.set(p.session_id, p);
    }
    return map;
  }, [pingsQuery.data]);

  const points: MapPoint[] = useMemo(() => {
    const arr: MapPoint[] = [];
    for (const s of sessions) {
      if (!isLive(s)) continue;
      const p = latestBySession.get(s.id);
      if (p) {
        arr.push({
          id: p.id,
          lat: p.lat,
          lon: p.lon,
          accuracy: p.accuracy,
          label: `${s.label}${s.sharer_name ? ` · ${s.sharer_name}` : ""}`,
          timestamp: p.created_at,
        });
      }
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, latestBySession]);

  const liveCount = sessions.filter(isLive).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <MapPin className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold">TrailShare</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate({ to: "/" }); }}>
              <LogOut className="mr-1.5 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[380px_1fr]">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold">Sessions</h1>
              <p className="text-sm text-muted-foreground">
                {liveCount} live · {sessions.length} total
              </p>
            </div>
            <NewSessionDialog onCreated={() => sessionsQuery.refetch()} />
          </div>

          {sessions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No sessions yet. Create one and share the link with someone who agrees to share their location.
              </p>
            </div>
          )}

          <div className="space-y-3">
            {sessions.map((s) => (
              <SessionCard
                key={s.id}
                session={s}
                live={isLive(s)}
                expired={isExpired(s)}
                hasPing={latestBySession.has(s.id)}
                lastPing={latestBySession.get(s.id)?.created_at}
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="overflow-hidden rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="h-[60vh] min-h-[420px] w-full">
              <LiveMap points={points} />
            </div>
          </div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Radio className="h-3.5 w-3.5 text-primary" /> Showing the latest position of every live session. Updates in real time.
          </p>
        </section>
      </main>
    </div>
  );
}

function SessionCard({
  session,
  live,
  expired,
  hasPing,
  lastPing,
}: {
  session: Session;
  live: boolean;
  expired: boolean;
  hasPing: boolean;
  lastPing?: string;
}) {
  const qc = useQueryClient();
  const [copied, setCopied] = useState(false);
  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/share/${session.share_token}` : "";

  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Share link copied");
    setTimeout(() => setCopied(false), 1500);
  };

  const toggle = async () => {
    const { error } = await supabase
      .from("sharing_sessions")
      .update({ is_active: !session.is_active })
      .eq("id", session.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["sessions"] });
    toast.success(session.is_active ? "Session paused" : "Session resumed");
  };

  const remove = async () => {
    const { error } = await supabase.from("sharing_sessions").delete().eq("id", session.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["sessions"] });
    toast.success("Session deleted");
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display font-semibold">{session.label}</h3>
            {live ? (
              <Badge className="bg-safe text-safe-foreground hover:bg-safe">Live</Badge>
            ) : expired ? (
              <Badge variant="secondary">Expired</Badge>
            ) : (
              <Badge variant="outline">Paused</Badge>
            )}
          </div>
          {session.sharer_name && (
            <p className="mt-0.5 truncate text-sm text-muted-foreground">Sharing: {session.sharer_name}</p>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        {session.expires_at ? (
          <span>Expires {new Date(session.expires_at).toLocaleString()}</span>
        ) : (
          <span>No expiry</span>
        )}
      </div>
      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" />
        <span>{hasPing ? `Last update ${lastPing ? new Date(lastPing).toLocaleTimeString() : ""}` : "Awaiting first update"}</span>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted px-2.5 py-1.5">
        <Link2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate text-xs text-muted-foreground">{shareUrl}</span>
        <button onClick={copy} className="ml-auto shrink-0 text-primary" aria-label="Copy link">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" onClick={toggle} disabled={expired}>
          <Power className="mr-1.5 h-4 w-4" />
          {session.is_active ? "Pause" : "Resume"}
        </Button>
        <Button variant="ghost" size="sm" onClick={remove} className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function NewSessionDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState("");
  const [duration, setDuration] = useState("60");
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();

  const create = async () => {
    if (!label.trim()) return toast.error("Give the session a label");
    setBusy(true);
    const expires_at =
      duration === "0" ? null : new Date(Date.now() + Number(duration) * 60_000).toISOString();
    const { error } = await supabase.from("sharing_sessions").insert({
      owner_id: user!.id,
      label: label.trim(),
      expires_at,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Session created");
    setLabel("");
    setDuration("60");
    setOpen(false);
    onCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="mr-1.5 h-4 w-4" /> New
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New tracking session</DialogTitle>
          <DialogDescription>
            You’ll get a share link to send to someone who agrees to share their live location.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Weekend hike with Sam"
              maxLength={80}
            />
          </div>
          <div className="space-y-2">
            <Label>Auto-expire after</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="240">4 hours</SelectItem>
                <SelectItem value="1440">24 hours</SelectItem>
                <SelectItem value="0">No expiry</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={create} disabled={busy} className="w-full">
            Create session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}