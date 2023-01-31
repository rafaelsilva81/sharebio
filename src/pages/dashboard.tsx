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

const Dashboard = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const { data: linkPage, isLoading } = api.link.getLinkPage.useQuery();

  useEffect(() => {
    if (status === "unauthenticated" || !sessionData) {
      router.push("/");
    }
  });

  if (isLoading) {
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
          <ButtonPrimary>
            <FaPlus /> Criar novo Link
          </ButtonPrimary>

          {/* Links */}
          {linkPage.links?.map((link, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 bg-indigo-600 p-2"
            >
              <span className="text-white">{link.title}</span>
            </div>
          ))}
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
