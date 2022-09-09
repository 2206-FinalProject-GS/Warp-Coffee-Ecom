import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App } from "./components";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
<div className="bg-xanadu font-body">
      <BrowserRouter>
         <App  />
      </BrowserRouter>
</div>

);
