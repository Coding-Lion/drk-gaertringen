import "zone.js/node";

import { ngExpressEngine } from "@nguniversal/express-engine";
import * as express from "express";
import { join } from "path";
import fetch from "node-fetch";

import { AppServerModule } from "./src/main.server";
import { APP_BASE_HREF } from "@angular/common";
import { existsSync } from "fs";
import mcache from 'memory-cache';

const calendarUrl =
  "https://files.drk-gaertringen.de/remote.php/dav/public-calendars/tA3YfEPtzcN3qYte?export";

let calendarData = "";

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), "dist/drk-angular/browser");
  const indexHtml = existsSync(join(distFolder, "index.original.html"))
    ? "index.original.html"
    : "index";

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    "html",
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set("view engine", "html");
  server.set("views", distFolder);

  const cache = (duration) => {
    return (req,res, next) => {
      const key = '__express__' + req.originalUrl || req.url;
      const cachedBody = mcache.get(key);
      if (cachedBody) {
        res.send(cachedBody);
        return;
      } else {
        res.sendResponse = res.send;
        res.send = (body) => {
          mcache.put(key, body, duration * 1000);
          res.sendResponse(body);
        }
        next();
      }
    }
  }

  server.get(
    "*.*",
    express.static(distFolder, {
      maxAge: "1y",
    })
  );

  // All regular routes use the Universal engine
  server.get("*", cache(60), (req, res) => {
    res.set('Strict-Transport-Security','max-age=31536000');
    res.set('Content-Security-Policy','default-src');
    res.set('X-Frame-Options','SAMEORIGIN');
    res.set('X-XSS-Protection','0');
    res.set('X-Content-Type-Options','nosniff');
    res.render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl },
        { provide: "calendarData", useValue: calendarData },
      ],
    });
  });

  return server;
}

async function run() {
  const port = process.env.PORT || 4000;

  const response = await fetch(calendarUrl);
  calendarData = await response.text();

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  setInterval(async ()=> {
    const response = await fetch(calendarUrl);
    calendarData = await response.text();
  },1000*60*10)
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || "";
if (moduleFilename === __filename || moduleFilename.includes("iisnode")) {
  run();
}

export * from "./src/main.server";
