import { Fragment } from "react";

import Navbar from "./Navbar";

const Layout = ({ children }: any) => {
  return (
    <Fragment>
      <Navbar />
      <main className="px-4 py-10">{children}</main>
    </Fragment>
  );
};

export default Layout;
