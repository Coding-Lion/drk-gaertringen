import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { GhostApi, Post } from "src/app/helper/ghostApi";
import { AppComponent } from "src/app/main/app.component";
import { Platform } from "@angular/cdk/platform";
import { isPlatformBrowser } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  @ViewChild("slider", { static: false })
  slider: ElementRef<HTMLDivElement>;

  constructor(@Inject(PLATFORM_ID) private  platformId: Object, private route: ActivatedRoute) {}
  feturedPosts: Post[];
  hvo: Post[];
  angebote: Post[];
  aktivWerden: Post[];
  private intervallId;

  private currentResizeTimeout;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (this.currentResizeTimeout != undefined)
      clearTimeout(this.currentResizeTimeout);
    this.currentResizeTimeout = setTimeout(() => {
      this.scrollRight();
    }, 100);
  }

  ngOnInit() {
    this.route.data.subscribe((data: { data: { featured: Post[], news: Post[], hvo: Post[], angebote: Post[], aktivWerden: Post[] }}) => {
      this.feturedPosts = data.data.featured;
      this.angebote = data.data.angebote;
      this.hvo = data.data.hvo;
      this.aktivWerden = data.data.aktivWerden;
    })
    if (isPlatformBrowser(this.platformId)) {
      if (this.intervallId != undefined) clearInterval(this.intervallId);
      this.intervallId = setInterval(() => {
        this.scrollRight();
      }, 10000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervallId);
  }

  scrollRight() {
    const scrollLeft = this.slider.nativeElement.scrollLeft;
    const outerWidth = this.slider.nativeElement.clientWidth;
    const numChilds = this.slider.nativeElement.childElementCount;

    this.slider.nativeElement.scrollLeft =
      (scrollLeft + outerWidth) % (outerWidth * numChilds);
  }
  scrollLeft() {
    const scrollLeft = this.slider.nativeElement.scrollLeft;
    const outerWidth = this.slider.nativeElement.clientWidth;
    const numChilds = this.slider.nativeElement.childElementCount;
    this.slider.nativeElement.scrollLeft =
      (scrollLeft - outerWidth + outerWidth * numChilds) %
      (outerWidth * numChilds);
  }
}
