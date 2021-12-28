import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {

  message: string = '';
  _remainingTime: number = 0;
  startTime: any;
  _seconds: number = 11;

  @Input()
  get remainingTime(): number {
    return this._remainingTime;
  }

  // remainingTime: number = 0;
  set remainingTime(v: number) {
    v = typeof v === 'undefined' ? 11 : v;
    const vs = Number(v);
    this._remainingTime = vs < 0 ? 11 : vs;
  }


  constructor() {
  }

  ngOnInit(): void {
  }

  functionStart() {
    this.startTime = setInterval(
      () => {
        this._remainingTime--;
        this.isCountDown();
      }, 1000

    )
  }

  functionStop() {
    clearInterval(this.startTime);
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }

  @Output()
  finish = new EventEmitter<boolean>();

  isCountDown(){
    if (this._remainingTime==0){
      this.functionStop();
      this.finish.emit(true);
    }
  }

  functionReset(){
    clearInterval(this.startTime);
    this._remainingTime=this._seconds;
    this.message = `Click start button to start the Countdown`;
  }

}
