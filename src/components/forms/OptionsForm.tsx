import { Formik } from "formik";

const OptionsForm = () => {
  return (
    <Formik
      initialValues={{
        description: "",
        backgroundColor: "#4338ca",
        backgroundImage: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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
