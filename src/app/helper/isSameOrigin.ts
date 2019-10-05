import { Injectable } from "@angular/core";

@Injectable()
export class IsSameOrigin {

  constructor() {

  }

  test(url) {
    const base = window.location.protocol + "//" + window.location.hostname
    const urlObj = new URL(url, base);
    const isLocal = urlObj.hostname === window.location.hostname;
    if (isLocal) {
      return true;
    }
    return false;
  }

  
}

