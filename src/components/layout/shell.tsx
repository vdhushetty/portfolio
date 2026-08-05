import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100dvh-var(--grok-banner-h,0px))] flex-col">
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
