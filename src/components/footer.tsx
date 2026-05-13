import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-[#d8e0ec] py-12 bg-[#eef3fa]">
      <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 text-sm items-start">
        <div className="flex items-center gap-2.5">
          <Image
            src="/airpoint-icon.png"
            alt=""
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="text-[#5a6580]">AirPoint</span>
        </div>

        <div className="text-[#5a6580]">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#7a8499] mb-2">
            Support
          </div>
          <a
            href="mailto:kavinvenkatesanofficial@gmail.com"
            className="hover:text-[#0c1b3a] transition-colors"
          >
            kavinvenkatesanofficial@gmail.com
          </a>
        </div>

        <div className="flex sm:justify-end items-center gap-7 text-[#5a6580]">
          <a href="https://github.com/CoderKavin/AirPoint" target="_blank" rel="noopener noreferrer" className="hover:text-[#0c1b3a] transition-colors">
            GitHub
          </a>
          <a href="https://github.com/CoderKavin/AirPoint/releases" target="_blank" rel="noopener noreferrer" className="hover:text-[#0c1b3a] transition-colors">
            Releases
          </a>
          <a href="https://github.com/CoderKavin/AirPoint/issues" target="_blank" rel="noopener noreferrer" className="hover:text-[#0c1b3a] transition-colors">
            Issues
          </a>
        </div>
      </div>
    </footer>
  );
}
