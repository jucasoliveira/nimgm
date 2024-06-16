import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <a
        href="/"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          location.pathname === "/" ? "border-b-2 border-black" : "border-b-0"
        }`}
      >
        Overview
      </a>
      <a
        href="/deliveries"
        className={`text-sm font-medium text-muted-foreground transition-colors hover:text-primary ${
          location.pathname === "/deliveries"
            ? "border-b-2 border-black"
            : "border-b-0"
        }`}
      >
        Deliveries
      </a>
      <a
        href="/sales"
        className={`text-sm font-medium text-muted-foreground transition-colors hover:text-primary  ${
          location.pathname === "/sales"
            ? "border-b-2 border-black"
            : "border-b-0"
        }`}
      >
        Sales
      </a>
      <a
        href="/stock"
        className={`text-sm font-medium text-muted-foreground transition-colors hover:text-primary  ${
          location.pathname === "/stock"
            ? "border-b-2 border-black"
            : "border-b-0"
        }`}
      >
        Stock
      </a>
    </nav>
  );
}
