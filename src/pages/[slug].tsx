import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Loader from "../components/common/Loader";
import SelectedIcon from "../components/common/SelectedIcon";
import LinkPage from "../components/LinkPage";
import { api } from "../utils/api";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;

  const addClickMutation = api.link.addClick.useMutation();

  const {
    data: linkPage,
    isLoading,
    isFetching,
  } = api.link.getLinkPage.useQuery(
    { slug: slug as string },
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || isFetching || !linkPage || !slug) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{linkPage.slug + "- Sharebio"}</title>
        <meta
          name="description"
          content={
            linkPage.description ||
            `
          Página do Sharebio do usuário ${linkPage.user.name}
        `
          }
        />
        <meta
          name="keywords"
          content="Sharebio, linktree, linkpage, mylinks, socialtree, sharebio"
        />
        <meta property="og:title" content={linkPage.slug + "- Sharebio"} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_BASE_URL + "/" + linkPage.slug}
        />
      </Head>
      <div
        className="min-w-screen flex min-h-screen items-center justify-center"
        style={{
          background: `url(${linkPage.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: linkPage.backgroundColor || "#4338ca",
        }}
      >
        <LinkPage linkPage={linkPage} />
      </div>
    </>
  );
};

export default Page;
