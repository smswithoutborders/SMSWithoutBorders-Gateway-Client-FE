import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../utils/api";
import { FaCogs } from "react-icons/fa";
import Spinner from "../components/Spinner";
import ErrorAlert from "../components/ErrorAlert";

type Setting = {
  imei: number;
  index: string;
  operator_code: number;
  operator_name: string;
};

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

        {Object.keys(settings).map((item: string, idx: number) => (
          <div
            key={idx}
            className="max-w-full p-4 mx-auto mb-4 prose border rounded-lg shadow md:p-8"
          >
            <h2>{item}</h2>
            {Object.keys(settings[item]).map((key: string, idx: number) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <h3 className="mt-0 capitalize">
                    {key.includes("_") ? key.split("_").join(" ") : key}
                  </h3>
                  <p>{settings[item][key]}</p>
                </div>
                <button className="btn btn-ghost">Change</button>
              </div>
            ))}
          </div>
        ))}
      </section>
    </Fragment>
  );
};

export default Settings;
