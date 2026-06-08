import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

export type MapPoint = {
  id: string;
  lat: number;
  lon: number;
  accuracy?: number | null;
  label: string;
  timestamp: string;
};

export function LiveMap({ points, follow = true }: { points: MapPoint[]; follow?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const LRef = useRef<any>(null);
  const didFitRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const L = (await import("leaflet")).default;
      if (!mounted || !containerRef.current || mapRef.current) return;
      LRef.current = L;
      const map = L.map(containerRef.current, { zoomControl: true, attributionControl: true }).setView(
        [20, 0],
        2,
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        iconAnchor: [9, 9],
      });
      const marker = L.marker([p.lat, p.lon], { icon: dot }).addTo(layer);
      marker.bindPopup(
        `<strong>${escapeHtml(p.label)}</strong><br/>${new Date(p.timestamp).toLocaleString()}${
          p.accuracy ? `<br/>±${Math.round(p.accuracy)}m` : ""
        }`,
      );
      if (p.accuracy && p.accuracy < 2000) {
        L.circle([p.lat, p.lon], {
          radius: p.accuracy,
          color: "oklch(0.58 0.12 192)",
          weight: 1,
          fillColor: "oklch(0.58 0.12 192)",
          fillOpacity: 0.08,
        }).addTo(layer);
      }
    });

    if (follow) {
      if (points.length === 1) {
        map.setView([points[0].lat, points[0].lon], Math.max(map.getZoom(), 14));
      } else {
        const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon] as [number, number]));
        if (!didFitRef.current) {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
          didFitRef.current = true;
        }
      }
    }
  }

  useEffect(() => {
    renderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return <div ref={containerRef} className="h-full w-full" style={{ minHeight: 320 }} />;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );
}