import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { Post, Settings } from "src/app/helper/ghostApi";
import { isPlatformBrowser } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { MetaHelper } from 'src/app/helper/metaHelper';
import { WelcomeResolveServiceData } from "./welcomeResolveService";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent implements OnInit {
  @ViewChild("slider", { static: false })
  slider: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title,
    private route: ActivatedRoute,
    private metaHelper: MetaHelper
  ) {}
  feturedPosts: Post[];
  hvo: Post[] = [];
  angebote: Post[] = [];
  aktivWerden: Post[] = [];
  news: Post[] = [];
  welcome: Post[] = [];
  
  blutspende: Post;
  ehKurs: Post;
  sandienst: Post;
  
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
    this.route.data.subscribe(
      (data: {
        data: WelcomeResolveServiceData;
      }) => {
        this.feturedPosts = data.data.featured;

        this.angebote = this.pushThree(data.data.angebote);
        this.hvo = this.pushThree(data.data.hvo);
        this.aktivWerden = this.pushThree(data.data.aktivWerden);
        this.news = data.data.news.slice(0,4);

        this.welcome = data.data.welcome;
        for (const post of data.data.welcome) {
          switch (post.slug) {
            case "rotkreuzkurs-erste-hilfe":
              this.ehKurs = post;
              break;
            case "blutspende":
              this.blutspende = post;
              break;
            case "sanitatsdienste":
              this.sandienst = post;
              break;
          }
        }

        this.titleService.setTitle(
          data.data.settings.meta_title || data.data.settings.title
        );
        this.metaHelper.updateMainMeta(data.data.settings)
      }
    );
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

  private pushThree(source: any[]): any[] {
    const desination = [];
    let i = 0;
    for (const obj of source) {
      if (i >= 3) return desination;
      desination.push(obj);
      i++;
    }
    return source.slice(0,3);
  }

  scrollRight() {
    const scrollLeft = this.slider.nativeElement.scrollLeft;
    const outerWidth = this.slider.nativeElement.clientWidth;
    const numChilds = this.slider.nativeElement.childElementCount;

    this.slider.nativeElement.scrollLeft =
      (scrollLeft + outerWidth * 1.1) % (outerWidth * numChilds);
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
