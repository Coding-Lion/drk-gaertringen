import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GhostApi, Tag, Post } from 'src/app/helper/ghostApi';
import { AppComponent } from 'src/app/main/app.component';
import { IsSameOrigin } from 'src/app/helper/isSameOrigin';

@Component({
  selector: "app-tag",
  templateUrl: "tag.component.html",
  styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
  constructor(private route: ActivatedRoute, private ghostApi: GhostApi, private isSameOrigin: IsSameOrigin) {}
  posts: Post[] = [];
  tag: Tag;
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
      setTimeout(() => {
        this.posts = posts;
        AppComponent.instance.isLoading = false;
      }, 150)
    });
    this.ghostApi.getTag(tag).subscribe((tag) => {
      this.tag = tag;
    })
  }
}

