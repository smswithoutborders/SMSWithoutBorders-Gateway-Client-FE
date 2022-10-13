/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getState } from "../utils/api";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

const Navbar = () => {
  const { data: state = {} } = useQuery(["state"], getState);
  return (
    <div className="shadow navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/modems">
                <a>Modems</a>
              </Link>
            </li>
            <li>
              <Link href="/settings">
                <a>Settings</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <div className="avatar">
            <div className="w-6 rounded-full md:w-7">
              <img src="/assets/icons/logo-icon-light.png" alt="logo" />
            </div>
          </div>
          <a className="text-base font-bold normal-case md:text-xl">
            SMSWithoutBorders
          </a>
        </div>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="p-0 menu menu-horizontal">
          <li>
            <Link href="/">
              <a>Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/modems">
              <a>Modems</a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a>Settings</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex mr-2 space-x-2 navbar-end">
        {Object.keys(state).map((item, idx) => (
          <Fragment key={idx}>
            {item === "inbound" ? (
              <div className="flex items-center">
                <BsArrowDown
                  title={state[item]}
                  className={
                    state[item] === "active" ? "text-success" : "text-error"
                  }
                />
                <span className="tracking-widest uppercase">In</span>
              </div>
            ) : (
              <div className="flex items-center">
                <BsArrowUp
                  title={state[item]}
                  className={
                    state[item] === "active" ? "text-success" : "text-error"
                  }
                />
                <span className="tracking-widest uppercase">Out</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
