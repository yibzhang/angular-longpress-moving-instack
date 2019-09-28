import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[long-press]'
})
export class LongPress {
  private longPressTimeout: any;
  private movable = false; 

  @Output()
  onLongPress = new EventEmitter<boolean>();

  @Output()
  onActiveMove = new EventEmitter();

  @HostListener('touchstart', ['$event'])
  @HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    this.longPressTimeout = setTimeout(()=>{
      this.movable = !this.movable;
      this.onLongPress.emit(this.movable);
    }, 500);
  }

  @HostListener('touchend')
  @HostListener('mouseup')
  @HostListener('mouseleave')
  longPressInterupt(){
    clearTimeout(this.longPressTimeout);
  }
}
