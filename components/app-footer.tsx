export default function AppFooter() {
  return (
    <footer className="flex flex-row w-full items-center justify-center py-2 lg:py-4 border-t">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://pheakminute.xyz"
          target="_blank"
          className="underline text-primary font-semibold"
        >
         Pheak Minute
        </a>
        . All rights reserved.
      </p>
    </footer>
  );
}
