import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const QuerySchema = z.object({
  token: z.string().min(10).max(64).regex(/^[a-f0-9]+$/),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const Route = createFileRoute("/api/public/session-info")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const parsed = QuerySchema.safeParse({ token: url.searchParams.get("token") });
        if (!parsed.success) return json({ error: "Invalid token" }, 400);

        const { data, error } = await supabaseAdmin
          .from("sharing_sessions")
          .select("label, sharer_name, is_active, expires_at")
          .eq("share_token", parsed.data.token)
          .maybeSingle();

        if (error) return json({ error: "Lookup failed" }, 500);
        if (!data) return json({ error: "not_found" }, 404);

        const expired = data.expires_at ? new Date(data.expires_at).getTime() < Date.now() : false;
        return json({
          label: data.label,
          sharerName: data.sharer_name,
          active: data.is_active && !expired,
          expired,
        });
      },
    },
  },
});