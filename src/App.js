import React, { Fragment } from "react";
import "./styles/App.scss";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { DashBoard } from "./content";

const App = () => {
  return (
    <Fragment>
      <Toaster position="bottom-right" reverseOrder={false} />
      <BrowserRouter>
        <DashBoard />
      </BrowserRouter>
    </Fragment>
  )
}
export default App;
