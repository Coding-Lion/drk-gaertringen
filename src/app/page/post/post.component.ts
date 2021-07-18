import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Compiler,
  ComponentFactoryResolver,
  HostListener,
  Directive,
  ElementRef
} from "@angular/core";
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Post, Settings } from "src/app/helper/ghostApi";
import { MetaHelper } from 'src/app/helper/metaHelper';


@Component({
  selector: "app-post",
  templateUrl: "post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  showSchedule: boolean = false;
  beforeSchedule: string = "";
  scheduleCategory: string = "";
  scheduleFallback: string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaHelper: MetaHelper,
  ) {}

  post: Post = {} as Post;

  @ViewChild("container", { read: ViewContainerRef, static: false })
  container: ViewContainerRef;

  @HostListener("click", ["$event"])
  public onClick(event) {
    if (event.target.tagName === "A") {
      const target = event.target;
      const isLocal = target.hostname === window.location.hostname;
      if (isLocal) {
        event.preventDefault();
        this.router.navigate([target.getAttribute("href")]);
      }
    } else {
      return;
    }
  }

  ngOnInit() {
    this.route.data.subscribe((data: { data: { page: Post, settings: Settings }}) => {
      this.post = data.data.page;
      this.titleService.setTitle(data.data.page.meta_title || data.data.page.title + " | DRK Gärtringen");
      this.metaHelper.updatePageMeta(data.data.page, data.data.settings);
      if (this.post.codeinjection_head) {
        try {
          const data = JSON.parse(this.post.codeinjection_head);
          this.showSchedule = data.showSchedule;
          this.beforeSchedule = data.beforeSchedule;
          this.scheduleCategory = data.scheduleCategory;
          this.scheduleFallback = data.scheduleFallback;
        } catch (error) {
          console.log(error);
          this.showSchedule = false;
          this.beforeSchedule = '';
        }
      } else {
        this.showSchedule = false;
        this.beforeSchedule = '';
      }
    });
  }
}
