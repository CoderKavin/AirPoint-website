"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Asset = { name: string; size: number; url: string };
type Release = { tag: string; assets: Asset[] };

const REPO_API = "https://api.github.com/repos/CoderKavin/AirPoint/releases/latest";

function formatBytes(b: number) {
  if (!b) return "...";
  const mb = b / (1024 * 1024);
  return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(b / 1024).toFixed(0)} KB`;
}

export function ReleaseButtons() {
  const [release, setRelease] = useState<Release | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(REPO_API)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data) {
          setLoaded(true);
          return;
        }
        setRelease({
          tag: data.tag_name ?? "v1.0.1",
          assets: (data.assets ?? []).map((a: { name: string; size: number; browser_download_url: string }) => ({
            name: a.name,
            size: a.size,
            url: a.browser_download_url,
          })),
        });
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const mac = release?.assets.find((a) => a.name.toLowerCase().endsWith(".dmg"));
  const win = release?.assets.find((a) => a.name.toLowerCase().includes("windows") || a.name.toLowerCase().endsWith(".zip"));

  const macUrl = mac?.url ?? "https://github.com/CoderKavin/AirPoint/releases/latest";
  const winUrl = win?.url ?? "https://github.com/CoderKavin/AirPoint/releases/latest";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto"
    >
      <DownloadCard
        platform="macOS"
        sub={mac ? `${release?.tag} · ${formatBytes(mac.size)}` : loaded ? "Latest release" : "Loading..."}
        href={macUrl}
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M17.6 13.8c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.3 1-4.1 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.5 2.7-1.9 3.3-.5 8.3 1.4 11 .9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.2.9 3.6.9 1.5 0 2.5-1.3 3.4-2.7 1.1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-2.9-4.5zm-2.7-8.3c.7-.9 1.2-2.1 1.1-3.4-1.1.1-2.4.7-3.2 1.6-.7.8-1.3 2.1-1.1 3.3 1.3.1 2.6-.6 3.2-1.5z" />
          </svg>
        }
      />
      <DownloadCard
        platform="Windows"
        sub={win ? `${release?.tag} · ${formatBytes(win.size)}` : loaded ? "Latest release" : "Loading..."}
        href={winUrl}
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M2 4.2L10.4 3v8.7H2zM11.4 2.9L22 1.5v10.2H11.4zM2 12.7h8.4v8.6L2 19.8zM11.4 12.7H22v10L11.4 21.1z" />
          </svg>
        }
      />
    </motion.div>
  );
}

function DownloadCard({
  platform,
  sub,
  href,
  icon,
}: {
  platform: string;
  sub: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 p-5 rounded-xl border border-[#2a2a2a] bg-[#1f1f1f] hover:bg-[#262626] hover:border-[#3f3f3f] transition-colors text-left"
    >
      <div className="shrink-0 w-11 h-11 rounded-lg bg-[#0a0a0a] flex items-center justify-center text-[#eef3fa]">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[#eef3fa]">Download for {platform}</div>
        <div className="text-xs text-[#8a857c] font-mono mt-0.5 truncate">{sub}</div>
      </div>
      <div className="text-[#8a857c] group-hover:text-[#eef3fa] group-hover:translate-x-0.5 transition-all">
        ↓
      </div>
    </a>
  );
}
