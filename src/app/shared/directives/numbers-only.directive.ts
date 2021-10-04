import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor() { }

  @HostListener('keypress', ['$event'])
  onInput(event: any) {
    console.log(event, 'event')
    const pattern = /[0-9]/; // without ., for integer only
    let inputChar = String.fromCharCode(event.which ? event.which : event.keyCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
      return false;
    }
    return true;
  }
}
