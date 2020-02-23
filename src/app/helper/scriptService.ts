import {
    Injectable,
    RendererFactory2,
    ViewEncapsulation,
    Inject
  } from "@angular/core";
  import { DOCUMENT } from "@angular/common";
  
  @Injectable()
  export class ScriptService {
    constructor(
      private rendererFactory: RendererFactory2,
      @Inject(DOCUMENT) private document
    ) {}
  
    /**
     * Inject the State into the bottom of the <head>
     */
    addTag(tag: ScriptDefinition, content: string) {
      try {
        const renderer = this.rendererFactory.createRenderer(this.document, {
          id: "-1",
          encapsulation: ViewEncapsulation.None,
          styles: [],
          data: {}
        });
  
        const script = renderer.createElement("script");
  
        const head = this.document.head;
  
        if (head === null) {
          throw new Error("<head> not found within DOCUMENT.");
        }
  
        Object.keys(tag).forEach((prop: string) => {
          return renderer.setAttribute(script, prop, tag[prop]);
        });
        
        const contentEl = renderer.createText(content);
        renderer.appendChild(script, contentEl);

        
  
        // [TODO]: get them to update the existing one (if it exists) ?
        renderer.appendChild(head, script);
      } catch (e) {
        console.error("Error within scriptService : ", e);
      }
    }
  
    removeTag(attrSelector: string) {
      if (attrSelector) {
        try {
          const renderer = this.rendererFactory.createRenderer(this.document, {
            id: "-1",
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
          });
          const head = this.document.head;
          if (head === null) {
            throw new Error("<head> not found within DOCUMENT.");
          }
          const scriptTags = this.document.querySelectorAll(
            "script[" + attrSelector + "]"
          );
          for (const script of scriptTags) {
            renderer.removeChild(head, script);
          }
        } catch (e) {
          console.log("Error while removing tag " + e.message);
        }
      }
    }

  }
  
  export declare type ScriptDefinition = {

    type?: string;
  } & {
    [prop: string]: string;
  };
  