import React from "react";
import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Metrics, SMS, NewSMS, Modems, Settings } from "./pages";
import { AppProvider } from "./store";
import { Toaster } from "react-hot-toast";
import { Navbar } from "components";

const App = () => {
  return (
    <AppProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <BrowserRouter>
        <Navbar />
        <div className="bx--col-lg-16 main-content">
          <Routes>
            <Route exact path="/" element={<Metrics />} />
            <Route exact path="/sms" element={<SMS />} />
            <Route exact path="/new-sms" element={<NewSMS />} />
            <Route exact path="/modems" element={<Modems />} />
            <Route exact path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
export default App;
