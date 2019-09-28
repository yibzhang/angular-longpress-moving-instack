import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-main-block',
  templateUrl: './main-block.component.html',
  styleUrls: ['./main-block.component.css']
})
export class MainBlockComponent implements OnInit {
  @Input()
  movingBlockNum : number;

  private indexArr: number[]   = [];
  private movable: boolean[]   = [];
  private topOffset: number[]  = [];
  private leftOffset: number[] = [];


  constructor() {
  }

  ngOnInit() {
    var arr = Array.from(Array(this.movingBlockNum).keys());
    this.indexArr = arr;
    this.movable = arr.map(_ => false);
    this.topOffset = arr.map(_ => 5);
    this.leftOffset = arr.map(i => 5 + 45*i);
  }

  onLongPress(event: any, idx: number){
    for(var i = 0; i < this.movingBlockNum; i++){
      if(i != idx)
        this.movable[i] = false;
      else
        this.movable[i] = !this.movable[i];
    }
  }

  roundValue(num: number){
    return (num-5) <= 0? 5 : Math.floor((num-5)/45)*45 + 5;
  }

  unMovableBoxLeftOffset(movableBoxDirection: string,
                         leftOffsetStart: number,
                         leftOffsetEnd: number,  
                         unMovableBoxleftOffset: number){
    if(movableBoxDirection == 'right'){
      return (unMovableBoxleftOffset <= leftOffsetEnd && 
              unMovableBoxleftOffset >  leftOffsetStart) ? 
      unMovableBoxleftOffset - 45 : unMovableBoxleftOffset;
    }
    if(movableBoxDirection == 'left'){
      return (unMovableBoxleftOffset >= leftOffsetEnd && 
              unMovableBoxleftOffset <  leftOffsetStart) ? 
      unMovableBoxleftOffset + 45 : unMovableBoxleftOffset;
    }
  }

  @HostListener('mousemove', ['$event'])
  mouseMove(event){
    var movableIndex = this.movable.findIndex((e) => {return e==true;});
    var movingDirection: string;

    if(movableIndex > -1){
      var mouseX = this.roundValue(event.clientX)
      var leftOffsetStart = 0;
      var leftOffsetEnd   = 0;
      if(this.leftOffset[movableIndex] != mouseX){
        // Move movable box
        movingDirection = this.leftOffset[movableIndex] > mouseX ? 'left':'right';
        leftOffsetStart = this.leftOffset[movableIndex];
        leftOffsetEnd   = mouseX;
        this.leftOffset[movableIndex] = mouseX;
        console.log(movingDirection);
        // Move other boxes
        this.leftOffset.forEach((offset, index)=>{
          if(index != movableIndex){
            this.leftOffset[index] = this.unMovableBoxLeftOffset(
              movingDirection, 
              leftOffsetStart, 
              leftOffsetEnd,
              this.leftOffset[index]);
          }
        });
      }
    }

    /*if(this.movable){
      if(this.topOffset != this.roundValue(event.clientY)){
        this.topOffset = this.roundValue(event.clientY);
      }

      if(this.leftOffset != this.roundValue(event.clientX)){
        this.leftOffset = this.roundValue(event.clientX);
      }

      console.log(`x:${this.topOffset}, y:${this.leftOffset}`);
    }*/
  }
}