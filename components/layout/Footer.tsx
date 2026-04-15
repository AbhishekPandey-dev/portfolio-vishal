import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-[#0E0E0E]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full max-w-[1400px] mx-auto">
        <div className="text-lg font-bold text-white font-headline">VISHAL SINGH</div>
        <div className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40">
          © 2024 VISHAL SINGH. BUILT IN THE VOID.
        </div>
        <div className="flex gap-8">
          <Link href="#" className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 hover:text-white transition-colors">
            GITHUB
          </Link>
          <Link href="#" className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 hover:text-white transition-colors">
            LINKEDIN
          </Link>
          <Link href="#" className="font-label uppercase tracking-[0.2em] text-[10px] text-white/40 hover:text-white transition-colors">
            TWITTER
          </Link>
        </div>
      </div>
    </footer>
  );
}
