import { Formik } from "formik";
import { api } from "../../utils/api";
import Loader from "../common/Loader";

const OptionsForm = () => {
  const {
    data: linkPage,
    isLoading,
    refetch: refetchLinkPage,
  } = api.link.getLinkPage.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const updateLinkPageMutation = api.link.updateLinkPageOptions.useMutation({
    onSuccess: () => {
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
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
