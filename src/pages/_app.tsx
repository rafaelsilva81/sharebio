import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { api } from "../utils/api";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        hideProgressBar={true}
        className="z-[9999]"
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
