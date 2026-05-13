import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WhoFor } from "@/components/who-for";
import { Calibration } from "@/components/calibration";
import { Gestures } from "@/components/gestures";
import { Technical } from "@/components/technical";
import { Stats } from "@/components/stats";
import { Institutions } from "@/components/institutions";
import { Downloads } from "@/components/downloads";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhoFor />
        <Calibration />
        <Gestures />
        <Technical />
        <Stats />
        <Institutions />
        <Downloads />
      </main>
      <Footer />
    </>
  );
}
