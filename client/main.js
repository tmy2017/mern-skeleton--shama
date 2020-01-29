import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
//zzSSR - zzhydrate put in zzmain.js? hmm zzintrst
hydrate(<App />, document.getElementById("root"));
