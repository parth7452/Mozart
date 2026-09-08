import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        That URL is not on the Mozart site. Public pages are the home, terms request, partners,
        and privacy notice.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Public site</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/quote">Request terms</Link>
        </Button>
      </div>
    </div>
  );
}
