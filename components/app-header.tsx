
import { Logo } from "@/components/logo";
import { ModeToggle } from "./mode-toggle";

export default function AppHeader() {
  return (
    <header className="flex justify-between items-center p-4">
      <Logo />
      <div className="space-x-2">
        <ModeToggle />
      </div>
    </header>
  );
}
