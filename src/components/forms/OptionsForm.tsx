import { Formik } from "formik";
import { api } from "../../utils/api";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import { DialogClose } from "@radix-ui/react-dialog";

const OptionsForm = () => {
  const {
    data: linkPage,
    isLoading,
    refetch: refetchLinkPage,
  } = api.link.getPersonalLinkPage.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const updateLinkPageMutation = api.link.updateLinkPageOptions.useMutation({
    onSettled: () => {
      toast("Atualizado com sucesso!");
      refetchLinkPage();
    },
  });

  if (isLoading || !linkPage) return <Loader />;

  return (
    <Formik
      initialValues={{
        description: linkPage?.description || "",
        backgroundColor: linkPage?.backgroundColor || "#4338ca",
        backgroundImage: linkPage?.backgroundImage || "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        updateLinkPageMutation.mutate({
          slug: linkPage?.slug,
          ...values,
        });
        setSubmitting(false);
      }}
      validate={(values) => {
        const errors: {
          description?: string;
          backgroundColor?: string;
          backgroundImage?: string;
        } = {};

        if (values.description.length > 240)
          errors.description = "Descrição muito longa (máximo: 240 caracteres)";
        if (
          !values.backgroundImage.endsWith(
            ".png" || ".jpg" || ".jpeg" || ".gif"
          )
        )
          errors.backgroundImage =
            "URL inválida (deve terminar com .png, .jpg, .jpeg ou .gif)";
        if (!values.backgroundImage.includes("https"))
          errors.backgroundImage = "URL inválida (deve começar com https://)";
        if (!values.backgroundImage.includes("."))
          errors.backgroundImage = "URL inválida (deve conter um ponto)";
        if (!values.backgroundImage.includes("/"))
          errors.backgroundImage = "URL inválida (deve conter uma barra)";
        if (values.backgroundImage.includes(" "))
          errors.backgroundImage = "URL inválida (não pode conter espaços)";
        if (!values.backgroundColor.startsWith("#"))
          errors.backgroundColor =
            "Cor hexadecimal inválida (deve começar com #)";
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
          {/* about */}
          <div className="flex flex-col gap-2 rounded-sm bg-indigo-600 p-2">
            <label htmlFor="description" className="text-white">
              Sobre você
            </label>
            <textarea
              id="description"
              className="resize-none rounded-sm border border-gray-300 p-2"
              placeholder="Meu nome é Rafael e eu sou um desenvolvedor web. Gosto de ..."
              defaultValue={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={240}
            />

            <span className="text-xs text-red-500">{errors.description}</span>
          </div>

          {/* bg image */}
          <div className="flex flex-col gap-2 rounded-sm bg-indigo-600 p-2">
            <label htmlFor="backgroundImage" className="text-white">
              Imagem de fundo (url)
            </label>
            <input
              id="backgroundImage"
              className="rounded-sm border border-gray-300 p-2"
              placeholder="https://..."
              defaultValue={values.backgroundImage}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <span className="text-xs text-red-500">
              {errors.backgroundImage}
            </span>
          </div>

          {/* color */}
          <div className="flex flex-col gap-2 rounded-sm bg-indigo-600 p-2">
            <label htmlFor="backgroundColor" className="text-white">
              Cor de fundo
            </label>
            <div className="flex gap-1">
              <input
                id="backgroundColor"
                type="color"
                className="h-12 w-12 rounded-sm p-1"
                value={values.backgroundColor}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                id="backgroundColor"
                className="rounded-sm border border-gray-300 p-2 uppercase"
                value={values.backgroundColor}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="text-xs text-red-500">
                {errors.backgroundColor}
              </span>
            </div>
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
            Salvar
          </button>
        </form>
      )}
    </Formik>
  );
};

export default OptionsForm;
