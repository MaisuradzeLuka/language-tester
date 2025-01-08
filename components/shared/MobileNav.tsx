import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { useTranslations } from "next-intl";

import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import LangSelector from "./LangSelector";
import { SignOut } from "./SignOut";

const MobileNav = ({ path }: { path: string }) => {
  const t = useTranslations("Navbar.navlinks");

  const newNavLinks = navLinks.map((link) => ({
    ...link,
    name: t(`${link.id}`),
  }));

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger
          asChild
          className="text-2xl cursor-pointer hover:text-yellow"
        >
          <RxHamburgerMenu />
        </SheetTrigger>

        <SheetContent className="flex flex-col justify-between bg-milky-white  text-xl font-semibold">
          <ul className=" font-semibold flex flex-col items-center gap-5 text-gray-700 mt-14">
            {newNavLinks.map((link) => (
              <li
                key={link.id}
                className={`inline hover:text-yellow ${
                  path === link.path ? "text-yellow" : ""
                }`}
              >
                <SheetClose asChild>
                  <Link href={link.path}>{link.name}</Link>
                </SheetClose>
              </li>
            ))}
          </ul>

          <div className="flex-between">
            <LangSelector />

            <SignOut>
              <span className=" border border-red-500 bg-red-500 text-white text-sm font-normal rounded-sm px-3 py-2 hover:bg-white hover:text-black transition">
                Sign Out
              </span>
            </SignOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
