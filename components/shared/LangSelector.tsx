"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const LangSelector = () => {
  const pathName = usePathname();
  const path = pathName.slice(1, 3);

  const router = useRouter();

  const [position, setPosition] = useState(path);

  const handleChange = (value: string) => {
    setPosition(value);
    console.log(value);

    const newPathName = "/" + value + pathName.slice(3);

    router.push(newPathName);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-black hover:bg-black hover:text-white md:border-white md:hover:bg-white md:hover:text-black bg-transparent"
        >
          {path.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) => handleChange(value)}
        >
          <DropdownMenuRadioItem value="en">EN</DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="ge">GE</DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="ru">RU</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSelector;
