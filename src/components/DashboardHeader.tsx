import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaCopy, FaExternalLinkSquareAlt, FaSignOutAlt } from "react-icons/fa";
import { ButtonSecondary } from "./common/Buttons";

interface IDashboardHeader {
  sessionData: Session;
  url: string;
}
const DashboardHeader = ({ sessionData, url }: IDashboardHeader) => {
  const router = useRouter();

  return (
    <section className="flex w-full justify-between rounded-md bg-indigo-600 p-3 px-6 text-white">
      <div className="flex items-center gap-3">
        <Image
          src={sessionData.user.image || ""}
          className="rounded-full"
          alt="user"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <span className="text-sm"> Bem vindo, </span>
          <span className="font-semibold">{sessionData.user.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ButtonSecondary
          onClick={() => {
            navigator.clipboard.writeText("http://localhost:3000/" + url);
          }}
        >
          <FaCopy />
          <span>Copiar</span>
        </ButtonSecondary>
        <ButtonSecondary
          onClick={() => {
            router.push(`/${url}`);
          }}
        >
          <FaExternalLinkSquareAlt />
          <span>Visitar</span>
        </ButtonSecondary>
        <ButtonSecondary
          onClick={() => {
            signOut().then(() => {
              router.push("/");
            });
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </ButtonSecondary>
      </div>
    </section>
  );
};

export default DashboardHeader;
