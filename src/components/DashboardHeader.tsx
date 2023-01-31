import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import {
  FaCog,
  FaCopy,
  FaExternalLinkSquareAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { ButtonSecondary } from "./common/Buttons";
import LinkPageOptionsDialog from "./dialogs/LinkPageOptionsDialog";

interface IDashboardHeader {
  sessionData: Session | null;
  url: string;
}
const DashboardHeader = ({ sessionData, url }: IDashboardHeader) => {
  const router = useRouter();

  return (
    <header className="flex w-full justify-between border bg-white p-3 px-6 shadow-md">
      <div className="flex items-center gap-2">
        <Image
          src={sessionData?.user.image || ""}
          className="w-6 rounded-full md:w-full"
          alt="user"
          width={30}
          height={30}
        />
        <div className="flex flex-col">
          <span className="text-xs"> Bem vindo, </span>
          <span className="w-40 truncate text-xs font-semibold md:w-full">
            {sessionData?.user.name}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LinkPageOptionsDialog />
        <ButtonSecondary
          className="bg-white"
          onClick={() => {
            router.push(`/${url}`);
          }}
        >
          <FaExternalLinkSquareAlt />
          <span className="hidden md:block">Visitar</span>
        </ButtonSecondary>
        <ButtonSecondary
          className="bg-white"
          onClick={() => {
            signOut({
              callbackUrl: "/",
            });
          }}
        >
          <FaSignOutAlt />
          <span className="hidden md:block">Logout</span>
        </ButtonSecondary>
      </div>
    </header>
  );
};

export default DashboardHeader;
