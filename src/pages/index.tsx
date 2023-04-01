import Head from "next/head";
import styles from "@/styles/Home.module.css";
import MonetizationDashboard from "../components/MonetizationDashboard";
import cx from "classnames";

export default function Home() {
  return (
    <>
      <Head>
        <title>Voodoo: Monetization Dashboard</title>
        <meta
          name="description"
          content="Web dashboard as part of the front-end web developer test"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={cx(styles.main, "h-screen flex flex-col md:p-20 p-10")}>
        <MonetizationDashboard />
      </main>
    </>
  );
}
