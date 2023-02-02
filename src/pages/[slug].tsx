import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../components/common/Loader";
import LinkPage from "../components/LinkPage";
import { api } from "../utils/api";

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;

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
          Página do Sharebio do usuário ${linkPage.user.name || ""}
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
          content={"https://sharebio.vercel.app/" + linkPage.slug}
        />
      </Head>
      <div
        className="min-w-screen flex min-h-screen items-center justify-center"
        style={{
          background: `url(${linkPage.backgroundImage || ""})`,
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
