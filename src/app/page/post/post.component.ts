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
import {
  trigger,
  state,
  animate,
  style,
  transition
} from "@angular/animations";
import { css } from "./post-content-css";
import { makeStateKey, TransferState } from "@angular/platform-browser";
import { GhostApi, Post } from "src/app/helper/ghostApi";
import { AppComponent } from 'src/app/main/app.component';

const PAGE_KEY = makeStateKey("page");

@Component({
  selector: "app-post",
  templateUrl: "post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ghostApi: GhostApi
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
    this.route.params.subscribe(params => {
      const slug = this.route.snapshot.params.id;
      this.loadPage(slug); // reset and set based on new parameter this time
    });
  }

  loadPage(slug) {
    AppComponent.instance.isLoading = true;
    setTimeout(() => {
      this.ghostApi.getPage(slug).subscribe((post: any) => {
        this.post = post;
        AppComponent.instance.isLoading = false;
      });
    }, 150);
  }

  injectStyle(html) {
    return "<style>" + css.styles[0] + "</style>" + html;
  }
}
