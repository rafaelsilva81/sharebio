import { Link, LinkPage } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { api } from "../utils/api";
import SelectedIcon from "./common/SelectedIcon";

const LinkPage = ({
  linkPage,
  preview = false,
}: {
  linkPage: LinkPage & {
    user: {
      image: string | null;
      name: string | null;
    };
    links: Link[];
  };
  preview?: boolean;
}) => {
  const addClickMutation = api.link.addClick.useMutation();

  return (
    <main className="flex min-h-screen max-w-sm flex-col gap-8 bg-gray-800/70 p-8 md:w-[500px] md:max-w-md">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={linkPage.user.image || ""}
          width={80}
          height={80}
          alt="user"
          className="rounded-full"
        />
        <h1 className="text-xl font-bold text-white">@{linkPage.slug}</h1>
        <p className="text-sm text-gray-300">{linkPage.description}</p>
      </div>

      <div className="flex flex-col gap-1">
        {linkPage.links?.map((link, index) => (
          <a
            key={index}
            href={link.url}
            onClick={() => {
              addClickMutation.mutate({
                linkId: link.id,
              });
            }}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-md 
          bg-gray-800/50 p-2 text-white 
          hover:bg-gray-800/90 
          active:bg-gray-900
            md:text-lg"
          >
            <SelectedIcon name={link.icon || ""} />
            <span className="">{link.title}</span>
          </a>
        ))}
      </div>
    </main>
  );
};

export default LinkPage;
