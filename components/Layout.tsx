import { Fragment } from "react";
import Footer from "./Footer";

import Navbar from "./Navbar";

const Layout = ({ children }: any) => {
  return (
    <Fragment>
      <Navbar />
      <main className="px-4 py-10 md:px-16 min-h-screen">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
