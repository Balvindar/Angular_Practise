import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Output() numberEmit = new EventEmitter<number>();


  interval: any;
  lastValue = 0;

  onStartGame() {
    this.interval = setInterval(() => {
      console.log(this.lastValue + 1);
      this.numberEmit.emit(this.lastValue);
      this.lastValue++;
    },
      1000)

  }

  onPauseGame() {
    clearInterval(this.interval);
  }

}
