import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GhostApi, Tag, Post } from 'src/app/helper/ghostApi';
import { AppComponent } from 'src/app/main/app.component';
import { IsSameOrigin } from 'src/app/helper/isSameOrigin';
import { isPlatformBrowser } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Title } from '@angular/platform-browser';

@Component({
  selector: "app-tag",
  templateUrl: "tag.component.html",
  styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private titleService: Title,
  ) { }
  posts: Post[] = [];
  tag: Tag = {} as any;
  ngOnInit() {
    this.route.data.subscribe((data: { posts: Post[], tag: Tag }) => {
      this.posts = data.posts;
      this.tag = data.tag;
      this.titleService.setTitle(data.tag.meta_title);
      console.log(this.posts)


    });
  }
}

