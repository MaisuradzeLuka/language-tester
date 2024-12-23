"use client";

import { useState, useEffect } from "react";
import { SiTicktick } from "react-icons/si";
import { PiSignOut, PiSignIn } from "react-icons/pi";
import Link from "next/link";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { SignIn } from "./SignIn";
import MobileNav from "./MobileNav";
import { auth } from "@/auth";
import { SignOut } from "./SignOut";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const path = usePathname();
  const { data: session, status } = useSession();
  // const [session, setSession] = useState<
  //   import("@auth/core/types").Session | null
  // >(null);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const sessionData = await auth();
  //     setSession(sessionData);
  //   };

  //   fetchSession();
  // }, []);

  return (
    <nav
      className={`top-0 left-0 right-0 py-4 px-6 ${
        path === "/" ? "fixed bg-transparent" : "bg-nav-grey"
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
          {navLinks.map((link) => (
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

        <div className="flex gap-3">
          {session ? <SignOut /> : <SignIn />}
          <MobileNav path={path} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
