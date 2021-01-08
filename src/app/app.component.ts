import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, ViewChild, OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'resizableDivs';
  top: 0;
  left: 0;
  minWidth1 = 100;
  minWidth2 = 400;
  parentWdt = 0;
  width1 = '';
  width2 = '';
  resizeLeft = 0;
  firstDivDimensions: any;

  @ViewChild('resizeContainer', {static: false}) resizeContainer: ElementRef;
  @ViewChildren('resizableDivs') resizableDivs: QueryList<ElementRef>;
  
  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.parentWdt = this.resizeContainer.nativeElement.getBoundingClientRect().width;
    this.width1 = this.minWidth1 + 'px';
    this.width2 = (this.parentWdt - this.minWidth1) + 'px';
    this.getDimensions();
  }
  
  handlerDragged(evt) {
    // console.log((this.firstDivDimensions.left - evt.pageX));
    // this.left = evt.pageX;
    // this.top = evt.pageY;
    let wdtToSet = ((evt.pageX - this.firstDivDimensions.left > this.minWidth1 ? evt.pageX - this.firstDivDimensions.left : this.minWidth1)); 
    this.width1 = wdtToSet.toString() + 'px';
    this.width2 = (this.parentWdt - wdtToSet > this.minWidth2 ? this.parentWdt - wdtToSet : this.minWidth2).toString() + 'px';
    this.getDimensions();
  }

  getDimensions() {
    setTimeout(() => {
      this.firstDivDimensions = this.resizableDivs.toArray()[0].nativeElement.getBoundingClientRect();
      this.resizeLeft = this.firstDivDimensions.width - 2;
    });
  }
}
