import React from "react";
import { api } from "../utils/api";
import clsx from "clsx";

const SlugCreationForm = () => {
  const [slug, setSlug] = React.useState("");

  const {
    data: slugExists,
    refetch,
    isLoading,
    isFetching,
  } = api.slug.checkSlug.useQuery({ slug }, { enabled: slug !== "" });

  const createSlugMutation = api.slug.createSlug.useMutation({
    onSettled: () => {
      console.log("slug created");
    },
    onError: (err) => {
      alert(err);
    },
  });

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-main_gradient p-8">
      <form className="flex flex-col gap-1 rounded-md bg-neutral-100 p-8">
        <h1 className="text-xl font-semibold">Calma aí!</h1>

        <span className="text-gray-800">
          Você ainda não escolheu seu link personalizado!
        </span>

        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className=" font-semibold text-gray-400">urldosite.com/</span>
          <input
            className={clsx("rounded-md border-2 border-gray-300 p-2", {
              "border-red-400": slugExists,
            })}
            type="text"
            onChange={(e) => {
              setSlug(e.target.value);
              refetch();
            }}
            placeholder="seulink"
          />
        </div>

        {slugExists && (
          <span className="text-end text-sm text-red-500">
            Esse link já está sendo usado!
          </span>
        )}

        <button
          className="mt-2 rounded-md bg-indigo-500 p-2 text-neutral-100"
          onClick={(e) => {
            e.preventDefault();
            createSlugMutation.mutateAsync({ slug });
            window.location.reload();
          }}
        >
          Criar
        </button>
      </form>
    </main>
  );
};

export default SlugCreationForm;
