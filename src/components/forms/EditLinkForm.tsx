import { Link } from "@prisma/client";
import { Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import { api } from "../../utils/api";
import Loader from "../common/Loader";
import IconPicker from "../IconPicker";

const EditLinkForm = ({ linkData }: { linkData: Link }) => {
  const {
    data: linkPage,
    isLoading,
    refetch: refetchLinkPage,
  } = api.link.getPersonalLinkPage.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const updateLinkMutation = api.link.updateLink.useMutation({
    onSuccess: () => {
      toast.success("Link atualizado com sucesso!");
      refetchLinkPage().catch((err) => console.log(err));
    },
    onError: () => {
      toast.error("Erro ao atualizar link!");
    },
  });

  if (isLoading || !linkPage) return <Loader />;

  return (
    <Formik
      onSubmit={(values) => {
        updateLinkMutation.mutate({
          id: linkData.id,
          ...values,
        });
      }}
      initialValues={{
        title: linkData.title || "",
        url: linkData.url || "",
        icon: linkData.icon || "FaLink",
      }}
      validate={(values) => {
        const errors: {
          title?: string;
          url?: string;
          icon?: string;
        } = {};
        if (values.title.length > 20)
          errors.title = "Título muito longo (máximo: 30 caracteres)";
        if (
          !values.url.includes("https") ||
          !values.url.includes("http") ||
          !values.url.includes("mailto")
        )
          errors.url = "URL inválida (deve começar com https, http ou mailto)";
        if (!values.url.includes("."))
          errors.url = "URL inválida (deve conter um ponto)";
        if (!values.url.includes("/"))
          errors.url = "URL inválida (deve conter uma barra)";
        if (values.url.includes(" "))
          errors.url = "URL inválida (não pode conter espaços)";
        return errors;
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              className="rounded-sm border border-gray-300 p-2"
              placeholder="Meu instagram/twitter/spotify/etc..."
              defaultValue={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <span className="text-xs text-red-500">{errors.title}</span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="url">URL</label>
            <input
              id="url"
              className="rounded-sm border border-gray-300 p-2"
              placeholder="https://..."
              defaultValue={values.url}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <span className="text-xs text-red-500">{errors.url}</span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="icon">Ícone</label>
            <input
              id="icon"
              type="hidden"
              value={values.icon}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <IconPicker
              icon={values.icon}
              setIcon={(icon) => {
                handleChange({ target: { id: "icon", value: icon } });
              }}
            />

            <span className="text-xs text-red-500">{errors.icon}</span>
          </div>

          <button
            className={`
              mt-1 flex items-center justify-center gap-1 rounded-sm bg-indigo-600 p-2 text-neutral-200
              transition ease-in-out
              hover:bg-indigo-700 active:bg-indigo-800
              disabled:cursor-not-allowed disabled:opacity-60
              `}
            type="submit"
            disabled={isSubmitting}
          >
            Criar link
          </button>
        </form>
      )}
    </Formik>
  );
};

export default EditLinkForm;
