import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getModems } from "../utils/api";
import { MdUsb } from "react-icons/md";
import Spinner from "../components/Spinner";
import ErrorAlert from "../components/ErrorAlert";

type Modem = {
  imei: number;
  index: string;
  operator_code: number;
  operator_name: string;
};

const Modems: NextPage = () => {
  const {
    data: modems = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(["modems"], getModems);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorAlert callBack={refetch} />;
  return (
    <Fragment>
      <Head>
        <title>Modems</title>
      </Head>

      <main className="container max-w-full prose">
        <h1>Modems</h1>
        {modems.map((modem: Modem, idx: number) => (
          <div
            key={idx}
            className="flex flex-row items-center w-full px-2 mb-8 space-x-4 font-semibold border shadow-sm md:space-x-8 md:px-4 card bg-base-100"
          >
            <MdUsb size={24} />
            <p>{modem.operator_name}</p>
            <p>{modem.imei}</p>
            <p>{modem.operator_code}</p>
          </div>
        ))}
      </main>
    </Fragment>
  );
};

export default Modems;
