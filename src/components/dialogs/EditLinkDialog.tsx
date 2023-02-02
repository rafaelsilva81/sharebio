import * as Dialog from "@radix-ui/react-dialog";
import { FaEdit } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "@prisma/client";
import EditLinkForm from "../forms/EditLinkForm";

const EditLinkDialog = ({ linkData }: { linkData: Link }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="
        flex items-center gap-1 rounded-sm px-2
        transition ease-in-out 
      hover:bg-neutral-300"
      >
        <FaEdit />
        <span className="hidden md:block">Editar</span>
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
              Editar Link
            </Dialog.Title>

            <Dialog.Close className="text-gray-500 hover:text-red-500">
              <IoMdClose size={24} />
            </Dialog.Close>
          </div>
          <EditLinkForm linkData={linkData} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditLinkDialog;
