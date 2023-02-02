import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaExternalLinkSquareAlt, FaSignOutAlt } from "react-icons/fa";
import { ButtonSecondary } from "./common/Buttons";
import LinkPageOptionsDialog from "./dialogs/LinkPageOptionsDialog";

interface IDashboardHeader {
  sessionData: Session | null;
  url: string;
}

const DashboardHeader = ({ sessionData, url }: IDashboardHeader) => {
  const router = useRouter();

  return (
    <header className="flex w-full justify-between border bg-white p-3  shadow-md md:px-6">
      <div className="flex min-w-fit items-center gap-2">
        <Image
          src={sessionData?.user.image || ""}
          className="rounded-full"
          alt="user"
          width={30}
          height={30}
        />
        <div className="flex w-full flex-1 flex-col">
          <span className="text-xs"> Bem vindo, </span>
          <span className="w-40 truncate text-xs font-semibold md:w-full">
            @{url}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LinkPageOptionsDialog />
        <Link
          className="flex items-center justify-center gap-1 rounded-sm p-2 text-indigo-600
          transition
          ease-in-out
        hover:bg-neutral-300 active:bg-neutral-300"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaExternalLinkSquareAlt />
          <span className="hidden md:block">Visitar</span>
        </Link>
        <ButtonSecondary
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
