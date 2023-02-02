import { Link } from "@prisma/client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ButtonPrimary, ButtonSecondary } from "../common/Buttons";
import { api } from "../../utils/api";
import { toast } from "react-toastify";

const RemoveLinkDialog = ({ linkData }: { linkData: Link }) => {
  const { refetch: refetchLinks } = api.link.getPersonalLinkPage.useQuery();

  const deleteLinkMutation = api.link.deleteLink.useMutation({
    onSuccess: () => {
      toast("Removido com sucesso");
      refetchLinks().catch((err) => console.log(err));
    },
    onError: (err) => {
      toast("Erro ao remover");
      console.log(err);
    },
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="
        flex items-center gap-1 rounded-sm px-2
        transition ease-in-out 
      hover:bg-neutral-300"
      >
        <FaTrash size={10} />
        <span>Remover</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="items fixed top-[50%] left-[50%] flex  -translate-x-[50%] -translate-y-[50%] flex-col rounded-sm bg-white p-4 md:w-[500px]">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold">
              Remover link
            </Dialog.Title>

            <Dialog.Close className="text-gray-500 hover:text-red-500">
              <IoMdClose size={24} />
            </Dialog.Close>
          </div>

          <p className="text-black">
            Tem certeza que deseja remover o link{" "}
            <span className="font-semibold text-indigo-600">
              {linkData.title}
            </span>
            ?
          </p>
          <span className="text-sm text-gray-500">
            Esta ação não pode ser desfeita.
          </span>

          <div className="mt-4 flex flex-row gap-2">
            <Dialog.Close asChild>
              <ButtonPrimary
                onClick={() => {
                  deleteLinkMutation.mutate({
                    id: linkData.id,
                  });
                }}
              >
                <FaTrash />
                <span>Remover</span>
              </ButtonPrimary>
            </Dialog.Close>

            <Dialog.Close asChild>
              <ButtonSecondary className="hover:bg-red-500/50">
                <IoMdClose size={20} />
                <span>Cancelar</span>
              </ButtonSecondary>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default RemoveLinkDialog;
