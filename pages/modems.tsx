import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getModems } from "../utils/api";
import { MdUsb, MdUsbOff } from "react-icons/md";
import Spinner from "../components/Spinner";
import ErrorAlert from "../components/ErrorAlert";

type Modem = {
  imei: number;
  index: string;
  operator_code: number;
  operator_name: string;
};

const Modems: NextPage = () => {
  const router = useRouter();

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

      <section className="container max-w-full prose">
        <h1>Modems</h1>
        {!modems.length && (
          <div className="mx-auto prose text-center border rounded-md py-8">
            <MdUsbOff className="inline" size={56} />
            <p>No available modems</p>
            <button className="btn btn-primary" onClick={() => refetch()}>
              refresh
            </button>
          </div>
        )}

        {modems.map((modem: Modem, idx: number) => (
          <div
            key={idx}
            className="flex items-center w-full p-2 mb-4 border rounded-md shadow md:flex-row md:px-4 bg-base-100"
          >
            <div className="space-x-4 contents md:space-x-8 ">
              <MdUsb size={24} />
              <p className="font-semibold ">
                {modem.operator_name} | {modem.operator_code}
              </p>
              <p className="hidden md:block">{modem.imei}</p>
            </div>
            <button
              className="ml-auto btn btn-sm md:btn-md btn-primary"
              onClick={() => router.push(`/messaging/${modem.index}`)}
            >
              messaging
            </button>
          </div>
        ))}
      </section>
    </Fragment>
  );
};

export default Modems;
