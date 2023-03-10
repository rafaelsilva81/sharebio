import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaPaintBrush } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import OptionsForm from "../forms/OptionsForm";

const LinkPageOptionsDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="
        flex items-center justify-center gap-1 rounded-sm p-2 text-indigo-600
        transition ease-in-out 
        hover:bg-neutral-300 active:bg-neutral-300"
      >
        <FaPaintBrush />
        <span className="hidden md:block">Customizar</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-[50%] left-[50%] flex -translate-x-[50%]  -translate-y-[50%] flex-col rounded-sm bg-white p-3">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold">
              Opções da página
            </Dialog.Title>

            <Dialog.Close className="text-gray-500 hover:text-red-500">
              <IoMdClose size={24} />
            </Dialog.Close>
          </div>
          <OptionsForm />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LinkPageOptionsDialog;
