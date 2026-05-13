import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-[#e3ddd0] py-12 bg-[#f8f5ef]">
      <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 text-sm items-start">
        <div className="flex items-center gap-2.5">
          <Image
            src="/airpoint-icon.png"
            alt=""
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="text-[#6b6862]">AirPoint · Apache 2.0</span>
        </div>

        <div className="text-[#6b6862]">
          <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#9a9489] mb-2">
            Support
          </div>
          <a
            href="mailto:kavinvenkatesanofficial@gmail.com"
            className="hover:text-[#181818] transition-colors"
          >
            kavinvenkatesanofficial@gmail.com
          </a>
        </div>

        <div className="flex sm:justify-end items-center gap-7 text-[#6b6862]">
          <a href="https://github.com/CoderKavin/AirPoint" target="_blank" rel="noopener noreferrer" className="hover:text-[#181818] transition-colors">
            GitHub
          </a>
          <a href="https://github.com/CoderKavin/AirPoint/releases" target="_blank" rel="noopener noreferrer" className="hover:text-[#181818] transition-colors">
            Releases
          </a>
          <a href="https://github.com/CoderKavin/AirPoint/issues" target="_blank" rel="noopener noreferrer" className="hover:text-[#181818] transition-colors">
            Issues
          </a>
        </div>
      </div>
    </footer>
  );
}
