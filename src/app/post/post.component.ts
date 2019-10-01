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
import {
  trigger,
  state,
  animate,
  style,
  transition
} from "@angular/animations";
import { css } from './post-content-css';

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
    private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler
  ) {}
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
    const metadata: Component = {
      selector: `runtime-component-sample`,
      template: template,
      styles: css.styles,
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
      declarations: [decoratedCmp]
    })
    class RuntimeComponentModule {}

    let module: ModuleWithComponentFactories<
      any
    > = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
    return module.componentFactories.find(
      f => f.componentType === decoratedCmp
    );
  }
}
