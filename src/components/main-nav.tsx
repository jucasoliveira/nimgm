import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <a
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </a>
      <a
        href="/deliveries"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Deliveries
      </a>
      <a
        href="/sales"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Sales
      </a>
      <a
        href="/stock"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Stock
      </a>
    </nav>
  );
}
