import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-3 font-serif text-4xl font-normal tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        That URL is not on the Mozart site. Public pages are the home, terms request, partners,
        and privacy notice.
      </p>
      <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
        <Button asChild className="h-11 w-full sm:w-auto">
          <Link href="/">Public site</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 w-full sm:w-auto">
          <Link href="/quote">Request terms</Link>
        </Button>
      </div>
    </div>
  );
}
