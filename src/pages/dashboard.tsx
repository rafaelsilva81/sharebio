import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { ButtonSecondary } from "../components/common/Buttons";
import Loader from "../components/common/Loader";
import SlugCreationForm from "../components/SlugCreationForm";
import { api } from "../utils/api";
import { FaCopy, FaExternalLinkSquareAlt, FaSignOutAlt } from "react-icons/fa";
import DashboardHeader from "../components/DashboardHeader";

const Dashboard = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const { data: slug, isLoading } = api.slug.getSlug.useQuery();

  /* TODO: Loading screen */
  if (status === "loading" || isLoading) return <Loader />;

  if (status === "unauthenticated" || !sessionData) {
    router.push("/");
    return <></>;
  }

  if (!slug) {
    return <SlugCreationForm />;
  }

  return (
    <div className="min-w-screen flex min-h-screen flex-col gap-4 p-8">
      {/* Dashboard header (profile) */}
      <DashboardHeader sessionData={sessionData} url={slug.url} />

      {/* Main content */}
      <main className="flex flex-1 justify-between gap-4">
        {/* Slug and links */}
        <section className="flex flex-1 flex-col gap-2">
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full items-center justify-center rounded-md bg-indigo-600 p-4 font-semibold text-white">
              Seus Links
            </div>
          </div>
        </section>

        {/* Preview */}
        <section className="flex flex-1 flex-col gap-2">
          <h1> TODO: Preview </h1>
        </section>
      </main>
    </div>
  );
};

/* const SelectedIcon = ({ name }: { name: string }) => {
  const Icon = Icons[name as keyof typeof Icons] || Icons.FaLink;
  return <Icon />;
}; */

export default Dashboard;
