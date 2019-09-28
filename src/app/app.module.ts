import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LongPress } from './long-press';
import { MovingBlockComponent } from './moving-block/moving-block.component';
import { MainBlockComponent } from './main-block/main-block.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, MovingBlockComponent, LongPress, MainBlockComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
