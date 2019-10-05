import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  HostListener,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { Settings, GhostApi } from "src/app/helper/ghostApi";
import { IsSameOrigin } from 'src/app/helper/isSameOrigin';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<any>();
  @Output() closeMenuClicked = new EventEmitter<any>();
  constructor(private renderer: Renderer2, private ghostApi: GhostApi, public isSameOrigin: IsSameOrigin) {}
  @ViewChild("header", { static: true }) header: ElementRef;
  @ViewChild("logo", { static: true }) logo: ElementRef;

  top = true;
  settings: Settings = { navigation: [] } as any;
  topPercent: number = 0;
  logoMargin: number = 16;
  headerHeight = 100;

  @HostListener("window:scroll", ["$event"]) // for window scroll events
  onScroll(event) {
    if (window.scrollY >= 44) {
      this.top = false;
    }
    if (window.scrollY <= 44) {
      this.top = true;
    }

    if (100 - scrollY >= 56) {
      this.topPercent = scrollY / 44;
      this.renderer.setAttribute(
        this.header.nativeElement,
        "style",
        "--header-height: " +
          (100 - scrollY) +
          "px;--logo-margin: " +
          (16 - 8 * this.topPercent) +
          "px"
      );
    } else {
      this.topPercent = 1;
      this.renderer.setAttribute(
        this.header.nativeElement,
        "style",
        "--header-height: 56px;--logo-margin: 8px"
      );
    }
  }

  ngOnInit() {
    this.renderer.setAttribute(
      this.header.nativeElement,
      "style",
      "--header-height: " +
        (100 - scrollY) +
        "px;--logo-margin: " +
        (16 - 8 * this.topPercent) +
        "px"
    );
    this.ghostApi
      .getSettings()
      .subscribe(settings => (this.settings = settings));
  }

  menuClick() {
    this.menuClicked.emit();
  }
  closeMenu() {
    this.closeMenuClicked.emit();
  }
}
