import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Tag, Post } from 'src/app/helper/ghostApi';
import { Title } from '@angular/platform-browser';
import { MetaHelper } from 'src/app/helper/metaHelper';

@Component({
  selector: "app-tag",
  templateUrl: "tag.component.html",
  styleUrls: ["./tag.component.scss"]
})
export class TagComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private titleService: Title,
    private metaHelper: MetaHelper,
  ) { }
  posts: Post[] = [];
  tag: Tag = {} as any;
  ngOnInit() {
    this.route.data.subscribe((data: { posts: Post[], tag: Tag }) => {
      this.posts = data.posts;
      this.tag = data.tag;
      this.titleService.setTitle(data.tag.meta_title || data.tag.name + " | DRK Gärtringen");
      this.metaHelper.updateTagMeta(data.tag)


    });
  }
}

