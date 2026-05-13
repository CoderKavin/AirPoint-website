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
          tag: data.tag_name ?? "v1.0.2",
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
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
    >
      <DownloadCard
        platform="macOS"
        version={mac ? release?.tag : loaded ? "Latest" : "..."}
        size={mac ? formatBytes(mac.size) : ""}
        href={macUrl}
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M17.6 13.8c0-2.7 2.2-4 2.3-4-1.3-1.8-3.2-2.1-3.9-2.1-1.7-.2-3.3 1-4.1 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.5 2.7-1.9 3.3-.5 8.3 1.4 11 .9 1.3 2 2.8 3.5 2.7 1.4-.1 1.9-.9 3.6-.9 1.7 0 2.2.9 3.6.9 1.5 0 2.5-1.3 3.4-2.7 1.1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-2.9-4.5zm-2.7-8.3c.7-.9 1.2-2.1 1.1-3.4-1.1.1-2.4.7-3.2 1.6-.7.8-1.3 2.1-1.1 3.3 1.3.1 2.6-.6 3.2-1.5z" />
          </svg>
        }
      />
      <DownloadCard
        platform="Windows"
        version={win ? release?.tag : loaded ? "Latest" : "..."}
        size={win ? formatBytes(win.size) : ""}
        href={winUrl}
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path d="M2 4.2L10.4 3v8.7H2zM11.4 2.9L22 1.5v10.2H11.4zM2 12.7h8.4v8.6L2 19.8zM11.4 12.7H22v10L11.4 21.1z" />
          </svg>
        }
      />
    </motion.div>
  );
}

function DownloadCard({
  platform,
  version,
  size,
  href,
  icon,
}: {
  platform: string;
  version?: string;
  size?: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:border-white/25 transition-colors"
    >
      {/* Top sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute -inset-px rounded-2xl"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(154,212,227,0.18) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative px-6 py-6 flex items-center gap-5 text-left">
        {/* Icon plate */}
        <div className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-b from-white/[0.10] to-white/[0.04] border border-white/10 flex items-center justify-center text-[#eef3fa] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {icon}
        </div>

        {/* Text block */}
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8a9bbd] mb-1">
            Download for
          </div>
          <div className="text-2xl font-semibold tracking-tight text-[#f4f7fc] leading-tight">
            {platform}
          </div>
          {(version || size) && (
            <div className="mt-1 text-xs font-mono text-[#7a8499] tracking-wide">
              {version}
              {version && size ? " · " : ""}
              {size}
            </div>
          )}
        </div>

        {/* Arrow */}
        <div className="shrink-0 w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-[#c8d2e8] group-hover:bg-white/10 group-hover:border-white/25 group-hover:translate-y-0.5 transition-all">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 2 L7 11 M3 7 L7 11 L11 7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
