import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";

import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

const MobileNav = ({ path }: { path: string }) => {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger
          asChild
          className="text-2xl cursor-pointer hover:text-yellow"
        >
          <RxHamburgerMenu />
        </SheetTrigger>

        <SheetContent className=" bg-milky-white  text-xl font-semibold">
          <ul className="h-full font-semibold flex flex-col items-center gap-5 text-gray-700 mt-14">
            {navLinks.map((link) => (
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
