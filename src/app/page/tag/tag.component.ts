import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GhostApi, Tag, Post } from 'src/app/helper/ghostApi';
import { AppComponent } from 'src/app/main/app.component';
import { IsSameOrigin } from 'src/app/helper/isSameOrigin';
import { isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: "app-tag",
  templateUrl: "tag.component.html",
  styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
  constructor(private route: ActivatedRoute, private ghostApi: GhostApi, private isSameOrigin: IsSameOrigin, private platform: Platform) {}
  posts: Post[] = [];
  tag: Tag = {} as any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      const tag = this.route.snapshot.params.tag;
      this.initialiseState(tag);
    });
  }

  async initialiseState(tag) {
    //@ts-ignore
    AppComponent.instance.isLoading = true;
    this.ghostApi.getFilteredPages("tag:" + tag).subscribe((posts) => {
      let timeout = 150;
      if (!isPlatformBrowser(this.platform)) timeout = 0;
      setTimeout(() => {
        this.posts = posts;
        AppComponent.instance.isLoading = false;
      }, timeout)
    });
    this.ghostApi.getTag(tag).subscribe((tag) => {
      this.tag = tag;
    })
  }
}

