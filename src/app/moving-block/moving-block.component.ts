import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-moving-block',
  templateUrl: './moving-block.component.html',
  styleUrls: ['./moving-block.component.css']
})
export class MovingBlockComponent implements OnInit {
  @Input()
  topOffset: number;

  @Input()
  leftOffset: number;

  @Input()
  movable: boolean;

  @Input()
  index: number;
  
  constructor() { }

  ngOnInit() {
  }
}