
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
}

function addScripts() {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

//use requestIdleCallback to schedule work.
if ('requestIdleCallback' in window) {
  //@ts-ignore
  window.requestIdleCallback(addScripts);
} else {
  addScripts();
}

// document.addEventListener("DOMContentLoaded", () => {

// });
