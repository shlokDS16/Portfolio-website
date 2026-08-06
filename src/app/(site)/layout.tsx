import { Motion } from "@/components/site/Motion";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { LightboxProvider } from "@/components/site/Lightbox";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LightboxProvider>
      <Motion />
      <SmoothScroll />
      <Nav />
      <main>{children}</main>
      <Footer />
    </LightboxProvider>
  );
}
