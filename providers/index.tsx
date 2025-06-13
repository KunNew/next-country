import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </QueryProvider>
      <Toaster />
    </NuqsAdapter>
  );
}
