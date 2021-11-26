import React from "react";
import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Metrics, SMS, NewSMS, Modems, Settings, NotFound } from "./pages";
import { AppProvider } from "./store";
import { Toaster } from "react-hot-toast";
import { Navbar } from "components";

const App = () => {
  return (
    <AppProvider>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000
        }}
      />
      <BrowserRouter>
        <Navbar />
        <div className="bx--col-lg-16 main-content">
          <Routes>
            <Route exact path="/" element={<Metrics />} />
            <Route exact path="/logs/:index" element={<SMS />} />
            <Route exact path="/send/:index" element={<NewSMS />} />
            <Route exact path="/modems" element={<Modems />} />
            <Route exact path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
export default App;
