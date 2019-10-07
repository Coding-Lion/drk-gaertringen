import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/helper/ghostApi';

@Component({
  selector: 'app-post-cards',
  templateUrl: './post-cards.component.html',
  styleUrls: ['./post-cards.component.scss']
})
export class PostCardsComponent implements OnInit {

  @Input() protected posts: Post[];
  @Input() protected overlap: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
