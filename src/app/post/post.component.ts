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
  ElementRef,
} from "@angular/core";
import { ActivatedRoute, RouterModule, Router } from "@angular/router";
import { ghostApi } from "../app.module";
import {
  trigger,
  state,
  animate,
  style,
  transition
} from "@angular/animations";
import { css } from "./post-content-css";


@Component({
  selector: "app-post",
  templateUrl: "post.component.html",
  styleUrls: ["./post.component.scss"],

  animations: [
    trigger("reloading", [
      // ...
      state(
        "visible",
        style({
          opacity: 1
        })
      ),
      state(
        "hidden",
        style({
          opacity: 0.2
        })
      ),
      transition("visible => hidden", [animate("0.15s")]),
      transition("hidden => visible", [animate("0.15s")])
    ])
  ]
})
export class PostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private element: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
  ) {}
  private componentRef: ComponentRef<{}>;

  posts = { html: "" };
  postHtml;
  isLoading = true;

  @ViewChild("container", { read: ViewContainerRef, static: false })
  container: ViewContainerRef;


  @HostListener("click", ["$event"])
  public onClick(event) {
    event.preventDefault();
    console.log(event.target.tagName)
    if (event.target.tagName === "A") {
      const target = event.target;
      console.log(event.target.hostname)
      console.log(window.location.hostname)
      // const currentURL = new URL(window.location.href);
      // const newURL = new URL(target);
      
      const isLocal = target.hostname === window.location.hostname;
      if (isLocal) {
        this.router.navigate([target.getAttribute("href")]);
      }
    } else {
      return;
    }
  }

  async ngOnInit() {
    this.initialiseState(this.route.snapshot.params.id);
    this.route.params.subscribe(params => {
      const id = this.route.snapshot.params.id;
      this.initialiseState(id); // reset and set based on new parameter this time
    });
  }

  async initialiseState(id) {
    this.isLoading = true;
    this.posts = await ghostApi.posts.read({ slug: id });
    this.postHtml = "<style>" + css + "</style>" + this.posts.html;
    
    this.isLoading = false;

    // setTimeout(async () => {
    // }, 150);
  }
}
