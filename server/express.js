//#region import
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

//  modules for server side rendering zzSSR
import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter";
import StaticRouter from "react-router-dom/StaticRouter";

import { SheetsRegistry } from "react-jss/lib/jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "material-ui/styles";
import { indigo, pink } from "material-ui/colors";
//end
//#endregion

//comment out before building for production
import devBundle from "./devBundle";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

//comment out before building for production
devBundle.compile(app);
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

// mount routes

//zzmakesense - since it's zzminiapp zzexpress - so it just mean "parent zzuri is root!" ((ℹ️ zzpp._05._y20.0202-1936 ))
app.use("/", userRoutes);
app.use("/", authRoutes);

//#region SSR
//zzref - "zzstring.zzPattern" -  https://expressjs.com/en/guide/routing.html
app.get("*", (req, res) => {
  const sheetsRegistry = new SheetsRegistry();
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: "#757de8",
        main: "#3f51b5",
        dark: "#002984",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff79b0",
        main: "#ff4081",
        dark: "#c60055",
        contrastText: "#000"
      },
      openTitle: indigo["400"],
      protectedTitle: pink["400"],
      type: "light"
    }
  });
  const generateClassName = createGenerateClassName();
  const context = {};

  // zzSSR here! zz20200112-2248+0100
  //really from zzreact, zzserver part ALREADY zzrender the zzmarkup!
  const markup = ReactDOMServer.renderToString(
    // router from zzserver side? hmm zzQ ((⚪️ zzp._05._y20.0202-2035 )) provides by zzreact-router (not native react itself)
    // zzintrst zzfinally-zzconclude zzBreakthrough-zzunderstood-zzlrn - the zzexpress will give zzreq zzurl to react-router! ((❇️ zzppp._05._y20.0202-2042))
    <StaticRouter location={req.url} context={context}>
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <MainRouter />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  );
  if (context.url) {
    return res.redirect(303, context.url);
  }
  const css = sheetsRegistry.toString();
  res.status(200).send(
    Template({
      markup: markup,
      css: css
    })
  );
});
//#endregion

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

export default app;
