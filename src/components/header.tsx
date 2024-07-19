import { HeaderProfile } from "./header-profile";
import { Logo } from "./logo";

export function Header() {
  return (
    <header className="w-full h-20 flex justify-between px-8 py-4 border border-solid boder-zinc-300">
      <Logo />
      <HeaderProfile />
    </header>
  );
}
