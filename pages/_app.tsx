import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { GlobalState } from "../store/GlobalState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalState>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalState>
  );
}

export default MyApp;
