import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BodySchema = z.object({
  token: z.string().min(10).max(64).regex(/^[a-f0-9]+$/),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  accuracy: z.number().min(0).max(100000).optional(),
  sharerName: z.string().trim().min(1).max(80).optional(),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const Route = createFileRoute("/api/public/ping")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ error: "Invalid JSON" }, 400);
        }
        const parsed = BodySchema.safeParse(raw);
        if (!parsed.success) return json({ error: "Invalid payload" }, 400);
        const { token, lat, lon, accuracy, sharerName } = parsed.data;

        const { data: session, error: sErr } = await supabaseAdmin
          .from("sharing_sessions")
          .select("id, is_active, expires_at")
          .eq("share_token", token)
          .maybeSingle();

        if (sErr) return json({ error: "Lookup failed" }, 500);
        if (!session) return json({ error: "not_found" }, 404);

        const expired = session.expires_at ? new Date(session.expires_at).getTime() < Date.now() : false;
        if (!session.is_active || expired) return json({ error: "inactive" }, 403);

        const { error: iErr } = await supabaseAdmin.from("location_pings").insert({
          session_id: session.id,
          lat,
          lon,
          accuracy: accuracy ?? null,
        });
        if (iErr) return json({ error: "Insert failed" }, 500);

        if (sharerName) {
          await supabaseAdmin
            .from("sharing_sessions")
            .update({ sharer_name: sharerName })
            .eq("id", session.id);
        }

        return json({ ok: true });
      },
    },
  },
});