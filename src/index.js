
import React, {Suspense, lazy} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const App = lazy(()=>import('./App'))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<p>... LOADING! ...</p>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);