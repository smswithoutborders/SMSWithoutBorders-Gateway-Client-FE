import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { getState } from "../utils/api";
import Spinner from "../components/Spinner";
import ErrorAlert from "../components/ErrorAlert";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

const Home: NextPage = () => {
  const {
    data: state = {},
    isLoading,
    isError,
    refetch,
  } = useQuery(["state"], getState);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorAlert callBack={refetch} />;
  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="container grid grid-cols-12 gap-5 mx-auto">
        {Object.keys(state).map((item, idx) => (
          <div
            key={idx}
            className="h-48 border shadow-md card bg-base-100 col-span-full md:col-span-4"
          >
            <div className="card-body">
              <h2 className="flex items-center capitalize card-title">
                {item === "inbound" ? <BsArrowDown /> : <BsArrowUp />}
                <span>{item}</span>
              </h2>
              <span
                className={`my-4 text-2xl font-bold text-center uppercase ${
                  state[item] === "active" ? "text-success" : "text-error"
                }`}
              >
                {state[item]}
              </span>
            </div>
          </div>
        ))}
      </section>
    </Fragment>
  );
};

export default Home;
