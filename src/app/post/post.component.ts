import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Compiler,
  ComponentFactory,
  NgModule,
  ModuleWithComponentFactories,
  ComponentFactoryResolver
} from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ghostApi } from "../app.module";
import { CommonModule } from "@angular/common";
import { trigger, state, animate, style, transition } from '@angular/animations';

@Component({
  selector: "app-post",
  templateUrl: "post.component.html",
  styleUrls: ["./post.component.css"],

  animations: [
    trigger("reloading", [
      // ...
      state(
        "visible",
        style({
          opacity: 1,
        })
      ),
      state(
        "hidden",
        style({
          opacity: 0.2,
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
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
  ) { }
  private componentRef: ComponentRef<{}>;

  posts = { html: "" };
  postHtml;
  isLoading = true;

  @ViewChild("container", { read: ViewContainerRef, static: false })
  container: ViewContainerRef;

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const id = this.route.snapshot.params.id;
      this.initialiseState(id); // reset and set based on new parameter this time
    });
  }

  async initialiseState(id) {
    this.isLoading = true;

    setTimeout(async () => {
      this.posts = await ghostApi.posts.read({ slug: id });
      this.postHtml = this.posts.html
        .replace(/href="[\w.\/\\\?\&\%\:\-]+/g, i => {
          if (i.includes("https://")) {
          } else {
            i = i.replace(/href/g, "routerLink");
            // i = i.substr(0, i.length - 1)
          }
          return i;
        })
        .replace(/<\w*code\w*>/g, "<code ng-non-bindable>")
        .replace(/{/g, "{{ '{' }}");

      this.compileTemplate(this.postHtml);
      // this.compileTemplate(`<div class="test">TEST</div>`);
      this.isLoading = false;
    }, 150);
  }

  compileTemplate(template) {
    let metadata: Component = {
      selector: `runtime-component-sample`,
      template: template,
      styles: [`/* 7.6. Koenig Styles
      /* ---------------------------------------------------------- */
      .post-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 920px;
      }
      
      .post-template .post-content > p:first-child {
          font-size: 1.25em;
          line-height: 1.5em;
      }
      
      .kg-image {
          max-width: 100%;
      }
      
      /* Preventing full-width image overlap with post image.  */
      .post-full-image + .kg-content *:first-child .kg-image {
          width: 100%;
      }
      
      .kg-width-wide .kg-image {
          max-width: 1040px;
      }
      
      .kg-width-full .kg-image {
          max-width: 100vw;
      }
      
      figure {
          margin: 1.5em 0 3em;
      }
      
      figure img {
          margin: 0;
      }
      
      figcaption {
          margin: 1.0em 0 0;
          font-size: 80%;
          line-height: 1.6em;
          text-align: center;
      }
      
      .kg-width-full figcaption {
          padding: 0 1.5em;
      }
      
      .kg-embed-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
      }
      
      .kg-embed-card .fluid-width-video-wrapper {
          margin: 0;
      }
      
      
      @media (max-width: 1040px) {
          .kg-width-full .kg-image {
              width: 100vw;
          }
      }
      
      .kg-gallery-container {
          display: flex;
          flex-direction: column;
          max-width: 1040px;
          width: 100vw;
      }
      
      .kg-gallery-row {
          display: flex;
          flex-direction: row;
          justify-content: center;
      }
      
      .kg-gallery-image img {
          display: block;
          margin: 0;
          width: 100%;
          height: 100%;
      }
      
      .kg-gallery-row:not(:first-of-type) {
          margin: 0.75em 0 0 0;
      }
      
      .kg-gallery-image:not(:first-of-type) {
          margin: 0 0 0 0.75em;
      }
      
      .kg-gallery-card + .kg-image-card.kg-width-wide,
      .kg-gallery-card + .kg-gallery-card,
      .kg-image-card.kg-width-wide + .kg-gallery-card,
      .kg-image-card.kg-width-wide + .kg-image-card.kg-width-wide {
          margin: -2.25em 0 3em;
      }
      
      /* keep existing <pre> styles for code cards with captions */
      .kg-code-card {
          min-width: 100%;
      }
      
      .kg-code-card pre {
          margin: 0;
      }
      
      .kg-bookmark-card {
          background: var(--white);
          width: 100%;
      }
      
      .kg-card + .kg-bookmark-card {
          margin-top: 0;
      }
      
      .kg-bookmark-container {
          display: flex;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color: var(--darkgrey);
          text-decoration: none;
          min-height: 148px;
          box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.09);
          border-radius: 3px;
      }
      
      .kg-bookmark-content {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          align-items: flex-start;
          justify-content: start;
          padding: 20px;
      }
      
      .kg-bookmark-title {
          font-size: 1.6rem;
          line-height: 1.5em;
          font-weight: 600;
          color: color(var(--midgrey) l(-30%));
      }
      
      .kg-bookmark-container:hover .kg-bookmark-title {
          color: var(--blue);
      }
      
      .kg-bookmark-description {
          display: -webkit-box;
          font-size: 1.5rem;
          line-height: 1.5em;
          color: color(var(--midgrey) l(-10%));
          font-weight: 400;
          margin-top: 12px;
          max-height: 48px;
          overflow-y: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
      }
      
      .kg-bookmark-thumbnail {
          position: relative;
          min-width: 33%;
          max-height: 100%;
      }
      
      .kg-bookmark-thumbnail img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0 3px 3px 0;
      }
      
      .kg-bookmark-metadata {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 400;
          color: color(var(--midgrey) l(-10%));
          margin-top: 14px;
          flex-wrap: wrap;
      }
      
      .kg-bookmark-icon {
          width: 22px;
          height: 22px;
          margin-right: 8px;
      }
      
      .kg-bookmark-author {
          line-height: 1.5em;
      }
      
      .kg-bookmark-author:after {
          content: "•";
          margin: 0 6px;
      }
      
      .kg-bookmark-publisher {
          overflow: hidden;
          line-height: 1.5em;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 240px;
      }


      
      @media (max-width: 500px) {
          .kg-bookmark-container {
              flex-direction: column;
          }
      
          .kg-bookmark-thumbnail {
              order: 1;
              width: 100%;
              min-height: 160px;
          }
      
          .kg-bookmark-thumbnail img {
              border-radius: 3px 3px 0 0;
          }
      
          .kg-bookmark-content {
              order: 2
          }
      }`]
    };

    let factory = this.createComponentFactorySync(
      this.compiler,
      metadata,
      null
    );

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.componentRef = this.container.createComponent(factory);
  }

  private createComponentFactorySync(
    compiler: Compiler,
    metadata: Component,
    componentClass: any
  ): ComponentFactory<any> {
    const cmpClass =
      componentClass ||
      class RuntimeComponent {
        name: string = "Denys";
      };
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({
      imports: [CommonModule, RouterModule],
      declarations: [decoratedCmp],
    })
    class RuntimeComponentModule { }

    let module: ModuleWithComponentFactories<
      any
    > = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(
      f => f.componentType === decoratedCmp
    );
  }
}
