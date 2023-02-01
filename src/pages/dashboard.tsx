import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ButtonPrimary, ButtonSecondary } from "../components/common/Buttons";
import Loader from "../components/common/Loader";
import SlugCreationForm from "../components/SlugCreationForm";
import { api } from "../utils/api";
import {
  FaCopy,
  FaExternalLinkSquareAlt,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer";
import NewLinkDialog from "../components/dialogs/NewLinkDialog";
import SocialLink from "../components/SocialLink";

const Dashboard = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const { data: linkPage, isLoading } = api.link.getLinkPage.useQuery();

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

  return (
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
            <SocialLink key={index} linkData={link} />
          ))}
        </section>

        {/* Preview */}
        <section className="flex flex-1 flex-col gap-2">
          <h1> TODO: Preview </h1>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
