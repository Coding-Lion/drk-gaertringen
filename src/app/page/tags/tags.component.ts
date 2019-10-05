import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  template: `
  <style>
    a {
      display: block;
    }
  </style>
  <a *ngFor="let tag of tags" [routerLink]="'/tags/' + tag.slug">{{tag.name}}</a>`,
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor() { }
  tags = [];
  async ngOnInit() {
    // this.tags = await ghostApi.tags.browse();
    console.log(this.tags);
  }

}
