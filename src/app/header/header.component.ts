import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  HostListener,
  ViewChild,
  ElementRef,
  HostBinding
} from "@angular/core";
import {
  trigger,
  state,
  transition,
  animate,
  style
} from "@angular/animations";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked = new EventEmitter<any>();
  constructor(private elementRef: ElementRef) {}
  @ViewChild("header", { static: true }) header: ElementRef;
  @ViewChild("logo", { static: true }) logo: ElementRef;


  
  top = true;
  topPercent: number = 0;
  logoMargin: number = 16;
  headerHeight = 100;

  @HostListener("window:scroll", ["$event"]) // for window scroll events
  onScroll(event) {
    if (window.scrollY >= 32) {
      this.top = false;
    }
    if (window.scrollY <= 32) {
      this.top = true;
    }

    if ((100 - scrollY) > 56) {
      this.topPercent = (scrollY / 56);
      this.headerHeight = 100 - scrollY;
    } else {
      this.topPercent = 1;
      this.headerHeight = 56;
      this.logoMargin = 8;
    }

    
    console.log(this.top);
    
    this.elementRef.nativeElement.style.setProperty("--logo-margin", "8");
  }

  ngOnInit() {}

  menuClick() {
    this.menuClicked.emit();
  }
}
