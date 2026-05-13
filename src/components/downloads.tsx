import { ReleaseButtons } from "./release-buttons";

export function Downloads() {
  return (
    <section id="download" className="relative py-32 bg-[#181818] text-[#f8f5ef]">
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-[#8a857c] mb-5">
          Get AirPoint
        </div>
        <h2 className="serif text-6xl sm:text-8xl text-balance leading-[0.95] mb-6">
          Free.
          <br />
          <span className="serif-italic text-[#9ad4e3]">For everyone.</span>
        </h2>
        <p className="text-[#c8c2b6] text-lg sm:text-xl text-balance mb-14 max-w-xl mx-auto leading-relaxed">
          Apache 2.0 licensed. No account, no tracking, no payment.
          Accessibility shouldn&apos;t cost anything.
        </p>

        <ReleaseButtons />

        <p className="mt-10 text-xs text-[#8a857c] font-mono">
          Requires a webcam · macOS 12+ or Windows 10+
        </p>
      </div>
    </section>
  );
}
