import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/helper/ghostApi';

@Component({
  selector: 'app-post-cards',
  templateUrl: './post-cards.component.html',
  styleUrls: ['./post-cards.component.scss']
})
export class PostCardsComponent implements OnInit {

  @Input() public posts: Post[];
  @Input() public overlap: boolean = false;
  @Input() public showDate: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
