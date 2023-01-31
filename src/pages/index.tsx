import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaPencilAlt, FaShare, FaTree, FaUserPlus } from "react-icons/fa";
import { ButtonSecondary } from "../components/common/Buttons";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData) {
      router.push("/dashboard");
    }
  }, [sessionData]);

  return (
    <>
      <main className="flex h-screen w-screen items-center justify-between gap-2 bg-main_gradient p-12 text-white">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex items-baseline gap-1">
            <h1 className="text-5xl font-bold tracking-tighter">SocialTree</h1>
            <FaTree size={48} />
          </div>

          <p className="text-xl tracking-tight">
            Compartilhar seus links sociais nunca foi tão fácil! Você estará
            apenas alguns cliques de deixar sua página mais completa.
          </p>

          <ol className="mt-4 flex flex-col gap-1 text-xl font-semibold tracking-tight">
            <li className="flex items-center gap-1">
              <FaUserPlus />
              <span>Crie sua conta gratuitamente</span>
            </li>

            <li className="flex items-center gap-1">
              <FaPencilAlt />
              <span>Customize sua página e adicione seus links</span>
            </li>

            <li className="flex items-center gap-1">
              <FaShare />
              <span>Compartilhe seu SocialTree com quem quiser!</span>
            </li>
          </ol>

          {/* call to action */}
          <ButtonSecondary
            className="mt-2 font-semibold"
            onClick={() => signIn("auth0", { callbackUrl: "/dashboard" })}
          >
            Vamos lá!
          </ButtonSecondary>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h1> TODO </h1>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;

/* const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData ? () => void signOut() : () => void signIn("auth0")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}; */
