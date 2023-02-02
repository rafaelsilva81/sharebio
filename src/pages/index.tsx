import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  FaLink,
  FaPencilAlt,
  FaPhone,
  FaPlus,
  FaShare,
  FaTree,
  FaUserPlus,
} from "react-icons/fa";
import { ButtonSecondary } from "../components/common/Buttons";
import Loader from "../components/common/Loader";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") return <Loader />;

  if (status === "authenticated") {
    router.push("/dashboard");
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>Sharebio - Compartilhe seus links sociais</title>
      </Head>
      <main className="flex h-screen w-screen flex-col-reverse items-center justify-center gap-2 bg-main_gradient text-white md:justify-between lg:flex-row">
        <div className="flex flex-1 flex-col gap-4 p-14">
          <div className="flex items-baseline gap-1">
            <h1 className="text-5xl font-bold tracking-tighter">Sharebio</h1>
            <FaShare size={48} />
          </div>

          <p className="text-xl tracking-tight">
            Compartilhar seus links sociais nunca foi tão fácil! Você estará
            apenas alguns cliques de deixar sua página mais completa.
          </p>

          <ol className="text-md mt-4 flex flex-col gap-2 text-lg font-semibold tracking-tight md:text-xl">
            <li className="flex items-center gap-1">
              <FaUserPlus size={20} />
              <span>Crie sua conta gratuitamente</span>
            </li>

            <li className="flex items-center gap-1">
              <FaPencilAlt />
              <span>Customize sua página</span>
            </li>

            <li className="flex items-center gap-1">
              <FaPlus />
              <span>Adicione seus links</span>
            </li>

            <li className="flex items-center gap-1">
              <FaLink />
              <span>Compartilhe seu ShareBio!</span>
            </li>
          </ol>

          {/* call to action */}
          <ButtonSecondary
            className="mt-2 bg-neutral-200 font-semibold"
            onClick={() => signIn("auth0", { callbackUrl: "/dashboard" })}
          >
            Vamos lá!
          </ButtonSecondary>
        </div>

        <div
          className="
          flex bg-[url('/home.jpg')] bg-cover
          bg-center 
          lg:min-h-screen
          lg:min-w-[50%] lg:flex-1
          
        "
        />
      </main>

      <Footer />
    </>
  );
};

export default Home;
