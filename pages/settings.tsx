import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../utils/api";
import { FaCogs } from "react-icons/fa";
import Spinner from "../components/Spinner";
import ErrorAlert from "../components/ErrorAlert";
import SettingsList from "../components/SettingsList";

const Settings: NextPage = () => {
  const router = useRouter();

  const {
    data: settings = {},
    isLoading,
    isError,
    refetch,
    remove,
  } = useQuery(["settings"], getSettings);

  // refresh
  function handleRefresh() {
    remove();
    refetch();
  }

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorAlert callBack={refetch} />;

  return (
    <Fragment>
      <Head>
        <title>Settings</title>
      </Head>

      <section className="container max-w-full prose">
        <h1>Settings</h1>
        {!Object.keys(settings).length && (
          <div className="py-8 mx-auto prose text-center border rounded-md">
            <FaCogs className="inline" size={56} />
            <p>No available settings</p>
            <button className="btn btn-primary" onClick={() => handleRefresh()}>
              refresh
            </button>
          </div>
        )}

        <SettingsList settings={settings} />
      </section>
    </Fragment>
  );
};

export default Settings;
