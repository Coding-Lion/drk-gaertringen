import { Component, OnInit } from "@angular/core";
import { ghostApi } from "../app.module";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-tag",
  templateUrl: "tag.component.html",
  styleUrls: ["./tag.component.css"]
})
export class TagComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  posts = [];
  ngOnInit() {
    this.route.params.subscribe(params => {
      const tag = this.route.snapshot.params.tag;
      this.initialiseState(tag); // reset and set based on new parameter this time
    });
  }

  async initialiseState(tag) {
    //@ts-ignore
    window.ghostApi = ghostApi;
    console.log(tag);
    this.posts = await ghostApi.posts.browse({ filter: "tag:"+tag });
  }
}
