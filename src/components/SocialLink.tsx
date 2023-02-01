import { Link } from "@prisma/client";
import React from "react";
import { FaEdit, FaHandPointer, FaTrash } from "react-icons/fa";
import SelectedIcon from "./common/SelectedIcon";
import RemoveLinkDialog from "./dialogs/RemoveLinkDialog";

const SocialLink = ({ linkData }: { linkData: Link }) => {
  return (
    <div className="flex flex-col gap-2 rounded-sm border border-gray-300 p-2 text-indigo-600 shadow-md">
      <span className="flex items-center gap-1 px-2 py-1 text-lg font-semibold">
        <SelectedIcon name={linkData.icon || ""} />
        {linkData.title}
      </span>
      <div className="flex flex-row gap-2 text-sm">
        <button
          className="flex items-center gap-1 rounded-sm px-2
          transition ease-in-out 
        hover:bg-neutral-300"
        >
          <FaHandPointer size={10} />
          <span>{linkData.clicks} cliques </span>
        </button>

        <button
          className="flex items-center gap-1 rounded-sm px-2
          transition ease-in-out 
        hover:bg-neutral-300"
        >
          <FaEdit size={10} />
          <span>Editar</span>
        </button>

        <RemoveLinkDialog linkData={linkData} />
      </div>
    </div>
  );
};

export default SocialLink;
