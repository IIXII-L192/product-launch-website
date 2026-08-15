/**
 * Film-grain + vignette overlay that sits above the whole page.
 * Gives the site its cinematic, slightly analog texture.
 */
export function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      
      <div
        className="absolute inset-[-100%] opacity-[0.05] mix-blend-screen animate-grain"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
