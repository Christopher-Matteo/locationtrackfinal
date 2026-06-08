import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-CcDArRCU.mjs";
import { u as useAuth } from "./router-BLFvlFQu.mjs";
import { B as Button, c as cn } from "./button-DjOZMqFS.mjs";
import { L as Label, I as Input } from "./label-BJaHSwYl.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, b as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { S as Select$1, a as SelectValue$1, b as SelectTrigger$1, c as SelectIcon, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectItem$1, h as SelectItemIndicator, i as SelectItemText, j as SelectScrollUpButton$1, k as SelectScrollDownButton$1, l as SelectLabel$1, m as SelectSeparator$1 } from "../_libs/radix-ui__react-select.mjs";
import { M as MapPin, L as LogOut, R as Radio, P as Plus, C as Clock, a as Link2, b as Check, c as Copy, d as Power, T as Trash2, X, e as ChevronDown, f as ChevronUp } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
function LiveMap({ points, follow = true }) {
  const containerRef = reactExports.useRef(null);
  const mapRef = reactExports.useRef(null);
  const layerRef = reactExports.useRef(null);
  const LRef = reactExports.useRef(null);
  const didFitRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    let mounted = true;
    (async () => {
      const L = (await import("../_libs/leaflet.mjs").then(function(n) {
        return n.l;
      })).default;
      if (!mounted || !containerRef.current || mapRef.current) return;
      LRef.current = L;
      const map = L.map(containerRef.current, { zoomControl: true, attributionControl: true }).setView(
        [20, 0],
        2
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      renderMarkers();
    })();
    return () => {
      mounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);
  function renderMarkers() {
    const L = LRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;
    layer.clearLayers();
    if (points.length === 0) return;
    points.forEach((p) => {
      const dot = L.divIcon({
        className: "",
        html: `<div style="position:relative;width:18px;height:18px;">
          <span style="position:absolute;inset:0;border-radius:9999px;background:oklch(0.58 0.12 192 / 0.3);animation:ping-pulse 1.8s ease-out infinite;"></span>
          <span style="position:absolute;inset:4px;border-radius:9999px;background:oklch(0.58 0.12 192);border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4);"></span>
        </div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });
      const marker = L.marker([p.lat, p.lon], { icon: dot }).addTo(layer);
      marker.bindPopup(
        `<strong>${escapeHtml(p.label)}</strong><br/>${new Date(p.timestamp).toLocaleString()}${p.accuracy ? `<br/>±${Math.round(p.accuracy)}m` : ""}`
      );
      if (p.accuracy && p.accuracy < 2e3) {
        L.circle([p.lat, p.lon], {
          radius: p.accuracy,
          color: "oklch(0.58 0.12 192)",
          weight: 1,
          fillColor: "oklch(0.58 0.12 192)",
          fillOpacity: 0.08
        }).addTo(layer);
      }
    });
    if (follow) {
      if (points.length === 1) {
        map.setView([points[0].lat, points[0].lon], Math.max(map.getZoom(), 14));
      } else {
        const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon]));
        if (!didFitRef.current) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
          didFitRef.current = true;
        }
      }
    }
  }
  reactExports.useEffect(() => {
    renderMarkers();
  }, [points]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: containerRef, className: "h-full w-full", style: { minHeight: 320 } });
}
function escapeHtml(s) {
  return s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function Dashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const {
    user,
    loading,
    signOut
  } = useAuth();
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/auth"
    });
  }, [user, loading, navigate]);
  const sessionsQuery = useQuery({
    queryKey: ["sessions"],
    enabled: !!user,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("sharing_sessions").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  const sessions = sessionsQuery.data ?? [];
  const sessionIds = sessions.map((s) => s.id);
  const pingsQuery = useQuery({
    queryKey: ["pings", sessionIds.join(",")],
    enabled: !!user && sessionIds.length > 0,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("location_pings").select("*").in("session_id", sessionIds).order("created_at", {
        ascending: false
      }).limit(400);
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    if (!user) return;
    const channel = supabase.channel("dash-pings").on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "location_pings"
    }, () => {
      qc.invalidateQueries({
        queryKey: ["pings"]
      });
    }).on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "sharing_sessions"
    }, () => {
      qc.invalidateQueries({
        queryKey: ["sessions"]
      });
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, qc]);
  const isExpired = (s) => s.expires_at ? new Date(s.expires_at).getTime() < Date.now() : false;
  const isLive = (s) => s.is_active && !isExpired(s);
  const latestBySession = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const p of pingsQuery.data ?? []) {
      if (!map.has(p.session_id)) map.set(p.session_id, p);
    }
    return map;
  }, [pingsQuery.data]);
  const points = reactExports.useMemo(() => {
    const arr = [];
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
          timestamp: p.created_at
        });
      }
    }
    return arr;
  }, [sessions, latestBySession]);
  const liveCount = sessions.filter(isLive).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold", children: "TrailShare" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-sm text-muted-foreground sm:inline", children: user?.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: async () => {
          await signOut();
          navigate({
            to: "/"
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-1.5 h-4 w-4" }),
          " Sign out"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[380px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold", children: "Sessions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              liveCount,
              " live · ",
              sessions.length,
              " total"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NewSessionDialog, { onCreated: () => sessionsQuery.refetch() })
        ] }),
        sessions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-dashed border-border p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No sessions yet. Create one and share the link with someone who agrees to share their location." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: sessions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SessionCard, { session: s, live: isLive(s), expired: isExpired(s), hasPing: latestBySession.has(s.id), lastPing: latestBySession.get(s.id)?.created_at }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border", style: {
          boxShadow: "var(--shadow-card)"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60vh] min-h-[420px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LiveMap, { points }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3.5 w-3.5 text-primary" }),
          " Showing the latest position of every live session. Updates in real time."
        ] })
      ] })
    ] })
  ] });
}
function SessionCard({
  session,
  live,
  expired,
  hasPing,
  lastPing
}) {
  const qc = useQueryClient();
  const [copied, setCopied] = reactExports.useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/share/${session.share_token}` : "";
  const copy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Share link copied");
    setTimeout(() => setCopied(false), 1500);
  };
  const toggle = async () => {
    const {
      error
    } = await supabase.from("sharing_sessions").update({
      is_active: !session.is_active
    }).eq("id", session.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({
      queryKey: ["sessions"]
    });
    toast.success(session.is_active ? "Session paused" : "Session resumed");
  };
  const remove = async () => {
    const {
      error
    } = await supabase.from("sharing_sessions").delete().eq("id", session.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({
      queryKey: ["sessions"]
    });
    toast.success("Session deleted");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4", style: {
    boxShadow: "var(--shadow-card)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display font-semibold", children: session.label }),
        live ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-safe text-safe-foreground hover:bg-safe", children: "Live" }) : expired ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Expired" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "Paused" })
      ] }),
      session.sharer_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 truncate text-sm text-muted-foreground", children: [
        "Sharing: ",
        session.sharer_name
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
      session.expires_at ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Expires ",
        new Date(session.expires_at).toLocaleString()
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No expiry" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: hasPing ? `Last update ${lastPing ? new Date(lastPing).toLocaleTimeString() : ""}` : "Awaiting first update" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-lg bg-muted px-2.5 py-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs text-muted-foreground", children: shareUrl }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copy, className: "ml-auto shrink-0 text-primary", "aria-label": "Copy link", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", className: "flex-1", onClick: toggle, disabled: expired, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "mr-1.5 h-4 w-4" }),
        session.is_active ? "Pause" : "Resume"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: remove, className: "text-destructive hover:text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function NewSessionDialog({
  onCreated
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [label, setLabel] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState("60");
  const [busy, setBusy] = reactExports.useState(false);
  const {
    user
  } = useAuth();
  const create = async () => {
    if (!label.trim()) return toast.error("Give the session a label");
    setBusy(true);
    const expires_at = duration === "0" ? null : new Date(Date.now() + Number(duration) * 6e4).toISOString();
    const {
      error
    } = await supabase.from("sharing_sessions").insert({
      owner_id: user.id,
      label: label.trim(),
      expires_at
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Session created");
    setLabel("");
    setDuration("60");
    setOpen(false);
    onCreated();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
      " New"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "New tracking session" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "You’ll get a share link to send to someone who agrees to share their live location." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "label", children: "Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "label", value: label, onChange: (e) => setLabel(e.target.value), placeholder: "e.g. Weekend hike with Sam", maxLength: 80 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Auto-expire after" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: duration, onValueChange: setDuration, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30", children: "30 minutes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "60", children: "1 hour" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "240", children: "4 hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "1440", children: "24 hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "0", children: "No expiry" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: create, disabled: busy, className: "w-full", children: "Create session" }) })
    ] })
  ] });
}
export {
  Dashboard as component
};
