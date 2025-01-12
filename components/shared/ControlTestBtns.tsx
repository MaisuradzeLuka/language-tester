"use client";

import { deleteTest } from "@/lib/actions";
import { client } from "@/sanity/lib/client";
import { TEST_BY_ID_QUERY } from "@/sanity/lib/queries";
import { redirect, usePathname, useRouter } from "next/navigation";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const ControlTestBtns = ({ testId }: { testId: string }) => {
  const path = usePathname();

  const router = useRouter();

  const handleEdit = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const locale = path.slice(0, 3);

    sessionStorage.setItem("testId", JSON.stringify(testId));

    redirect(locale + "/addQuestion");
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    await deleteTest(testId);

    setTimeout(() => {
      router.refresh();
    }, 300);
  };

  return (
    <div className="flex justify-end items-center gap-3 mt-4 mb-2">
      <button
        onClick={handleEdit}
        className="text-lg text-yellow hover:scale-110 transition duration-300"
      >
        <FiEdit />
      </button>

      <button
        onClick={handleDelete}
        className="text-xl text-red-500 hover:scale-110 transition duration-300"
      >
        <MdOutlineDelete />
      </button>
    </div>
  );
};

export default ControlTestBtns;
