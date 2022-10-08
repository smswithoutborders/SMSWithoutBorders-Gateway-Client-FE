/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const Navbar = () => {
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
              <Link href="/messaging">
                <a>Messaging</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <div className="avatar">
            <div className="rounded-full w-7">
              <img src="/assets/icons/logo-icon-light.png" alt="logo" />
            </div>
          </div>
          <a className="text-xl font-bold normal-case">SMSWithoutBorders</a>
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
            <Link href="/messaging">
              <a>Messaging</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex space-x-2 navbar-end item-center">
        <input
          type="radio"
          aria-label="status indicator"
          className="checked:bg-green-500 radio radio-sm"
          checked
        />
        <label htmlFor="gateway-status" className="hidden md:block">
          online
        </label>
      </div>
    </div>
  );
};

export default Navbar;
