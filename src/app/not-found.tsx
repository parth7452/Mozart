import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone px-6 text-center text-soot">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">404</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-soot/70">
        That URL is not on the Mozart site. The public pages are the home,
        thesis, and privacy notice. The ops desk is internal.
      </p>
      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/" className="underline underline-offset-4">
          Public site
        </Link>
        <Link href="/desk" className="underline underline-offset-4">
          Ops desk
        </Link>
      </div>
    </div>
  );
}
