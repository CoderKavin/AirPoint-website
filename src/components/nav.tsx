"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#eef3fa]/85 border-b border-[#d8e0ec]"
    >
      <div className="max-w-[1240px] mx-auto px-6 h-14 flex items-center justify-between text-sm">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/airpoint-icon.png"
            alt=""
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          <span className="font-medium tracking-tight text-[#0c1b3a]">AirPoint</span>
        </Link>

        <div className="flex items-center gap-7">
          <a href="#how-it-works" className="text-[#3a4566] hover:text-[#0c1b3a] transition-colors hidden sm:inline">
            How it works
          </a>
          <a href="#features" className="text-[#3a4566] hover:text-[#0c1b3a] transition-colors hidden sm:inline">
            Features
          </a>
          <a
            href="https://github.com/CoderKavin/AirPoint"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3a4566] hover:text-[#0c1b3a] transition-colors"
          >
            GitHub
          </a>
          <a
            href="#download"
            className="px-4 py-1.5 rounded-full bg-[#0c1b3a] text-[#eef3fa] hover:bg-[#2c5cb8] transition-colors"
          >
            Download
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
