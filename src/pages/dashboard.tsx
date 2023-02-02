import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../components/common/Loader";
import SlugCreationForm from "../components/SlugCreationForm";
import { api } from "../utils/api";
import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer";
import NewLinkDialog from "../components/dialogs/NewLinkDialog";
import PersonalLink from "../components/PersonalLink";
import LinkPage from "../components/LinkPage";
import Head from "next/head";

const Dashboard = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const { data: linkPage, isLoading } = api.link.getPersonalLinkPage.useQuery();

  if (status === "unauthenticated") {
    router.push("/");
    return <Loader />;
  }

  if (isLoading || status === "loading") {
    return <Loader />;
  }

  if (!linkPage?.slug) {
    return <SlugCreationForm />;
  }

  const previewLinkPage = {
    ...linkPage,
    user: {
      name: sessionData?.user.name || "",
      image: sessionData?.user.image || "",
    },
  };

  return (
    <>
      <Head>
        <title>Dashboard - Sharebio</title>
        <meta name="description" content="Dashboard do Sharebio" />
        <meta
          name="keywords"
          content="Dashboard, Sharebio, Links, Redes Sociais"
        />
      </Head>
      <div className="min-w-screen flex min-h-screen flex-col gap-4">
        {/* Dashboard header (profile) */}
        <DashboardHeader sessionData={sessionData} url={linkPage.slug} />

        {/* Main content */}
        <main className="flex flex-1 flex-col justify-between gap-4 p-4 md:flex-row">
          {/* Slug and links */}
          <section className="flex flex-1 flex-col gap-2 rounded-sm">
            <NewLinkDialog />

            {/* Links */}
            {linkPage.links?.map((link, index) => (
              <PersonalLink key={index} linkData={link} />
            ))}
          </section>

          {/* Preview */}
          <section className="hidden flex-1 flex-col items-center justify-center gap-2 md:flex">
            <h1 className="w-full rounded-sm bg-gray-700/70 p-1 text-center text-lg font-bold text-white">
              Pré visualização
            </h1>
            <div className="w-full px-10">
              <div
                className="flex w-full justify-center rounded-sm shadow-sm"
                style={{
                  background: `url(${linkPage.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: linkPage.backgroundColor || "#4338ca",
                }}
              >
                <LinkPage linkPage={previewLinkPage} preview />
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
