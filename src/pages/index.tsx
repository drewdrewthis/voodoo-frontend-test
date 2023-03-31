import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import MonetizationDashboard from "../components/MonetizationDashboard";
import cx from "classnames";

const inter = Inter({ subsets: ["latin"] });

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
      <main className={cx(styles.main, "h-screen flex flex-col")}>
        <MonetizationDashboard />
        {/* <div className="container mx-auto"></div>
        <div className={styles.description}></div>
        <div className={styles.center}></div>
        <div className={styles.grid}> </div> */}
      </main>
    </>
  );
}
