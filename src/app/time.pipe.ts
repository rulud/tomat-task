import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.showMinutesAndSeconds(value);
  }

  showMinutesAndSeconds(seconds: number): string {
    const minutesLeft = this.calculateMinutesLeftToDisplay(seconds);
    const secondsLeft = this.calculateSecondsLeftInMinuteToDisplay(seconds);
    const time = this.addAZeroToSingleDigitaMinuteOrSecond(minutesLeft) +
                 ':' +
                 this.addAZeroToSingleDigitaMinuteOrSecond(secondsLeft);
    return time;
  }

  calculateMinutesLeftToDisplay(seconds: number): number {
    if (seconds < 0) {
      return 0;
    }
    return Math.floor(seconds / 60);
  }

  calculateSecondsLeftInMinuteToDisplay(seconds: number): number {
    if (seconds < 0) {
      return 0;
    }

    return seconds - this.calculateMinutesLeftToDisplay(seconds) * 60;
  }

  addAZeroToSingleDigitaMinuteOrSecond(time: number): string {
    let newTime = time.toString();
    if (newTime.length === 1) {
      newTime = '0' + newTime;
    }
    return newTime;
  }

}
