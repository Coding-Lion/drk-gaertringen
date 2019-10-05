import { Component, OnInit, ViewChild, ElementRef, HostListener } from "@angular/core";
import { GhostApi, Post } from "src/app/helper/ghostApi";
import { AppComponent } from "src/app/main/app.component";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  @ViewChild("slider", { static: false })
  slider: ElementRef<HTMLDivElement>;

  constructor(private ghostApi: GhostApi) {}
  feturedPosts: Post[];
  private intervallId;

  private currentResizeTimeout;
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (this.currentResizeTimeout != undefined) clearTimeout(this.currentResizeTimeout);
    this.currentResizeTimeout = setTimeout(() => {
      this.scrollRight()
    }, 100)
  }

  ngOnInit() {
    AppComponent.instance.isLoading = true;
    this.ghostApi.getFilteredPages("featured:true").subscribe(posts => {
      setTimeout(() => {
        this.feturedPosts = posts;
        AppComponent.instance.isLoading = false;

        if (this.intervallId != undefined) clearInterval(this.intervallId);
        this.intervallId = setInterval(() => {
          this.scrollRight();
        }, 10000);
      }, 150);
    });
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
