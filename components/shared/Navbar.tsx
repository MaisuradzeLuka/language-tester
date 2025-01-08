"use client";

import { SiTicktick } from "react-icons/si";
import { Link } from "@/i18n/routing";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { SignIn } from "./SignIn";
import MobileNav from "./MobileNav";
import { SignOut } from "./SignOut";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import LangSelector from "./LangSelector";

const Navbar = () => {
  const path = usePathname();
  const { data: session } = useSession();

  const t = useTranslations("Navbar.navlinks");

  const newNavLinks = navLinks.map((link) => ({
    ...link,
    name: t(`${link.id}`),
  }));

  return (
    <nav
      className={`top-0 left-0 right-0 py-4 px-6 ${
        ["/en", "/ge", "/ru"].includes(path)
          ? "fixed bg-transparent"
          : "bg-nav-grey"
      } text-white z-20 font-mono`}
    >
      <div className="flex justify-between items-center">
        <Link href="/">
          <h1 className="flex items-center gap-2 text-white text-xl sm:text-2xl">
            <span className="text-yellow">
              <SiTicktick />
            </span>
            Language Tester
          </h1>
        </Link>

        <ul className="hidden md:flex gap-8 font-semibold">
          {newNavLinks.map((link) => (
            <li
              key={link.id}
              className={`inline hover:text-yellow ${
                path === link.path ? "text-yellow" : ""
              }`}
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LangSelector />
          </div>

          {session ? (
            <SignOut>
              <Image
                width={36}
                height={36}
                alt="profile image"
                src={session.user?.image || ""}
                className="rounded-full"
              />
            </SignOut>
          ) : (
            <SignIn />
          )}
          <MobileNav path={path} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
