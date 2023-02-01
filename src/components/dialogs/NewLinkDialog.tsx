import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ButtonSecondary } from "../common/Buttons";
import { FaCog, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import OptionsForm from "../forms/OptionsForm";
import NewLinkForm from "../forms/NewLinkForm";

const NewLinkDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="
        flex items-center justify-center gap-1 rounded-sm bg-indigo-600 p-2 text-neutral-200
        transition
        ease-in-out
        hover:bg-indigo-700 active:bg-indigo-800"
      >
        <FaPlus />
        <span className="hidden md:block">Criar novo Link</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content
          className="fixed top-[50%] left-[50%] flex -translate-x-[50%]  -translate-y-[50%] flex-col rounded-sm bg-neutral-100 p-3
        md:w-[500px]
        "
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold">
              Novo Link
            </Dialog.Title>

            <Dialog.Close className="text-gray-500 hover:text-red-500">
              <IoMdClose size={24} />
            </Dialog.Close>
          </div>
          <NewLinkForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NewLinkDialog;
