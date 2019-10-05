import { Injectable } from "@angular/core";
import { Location, isPlatformBrowser } from "@angular/common";
import { Platform } from "@angular/cdk/platform";

@Injectable()
export class IsSameOrigin {
  constructor(private platform: Platform) {}

  test(url: string) {
    if (!isPlatformBrowser(this.platform)) {
      if (url.includes("//")) return false;
      else return true;
    }
    const base = window.location.protocol + "//" + window.location.hostname;
    const urlObj = new URL(url, base);
    const isLocal = urlObj.hostname === window.location.hostname;
    if (isLocal) {
      return true;
    }
    return false;
  }
}
