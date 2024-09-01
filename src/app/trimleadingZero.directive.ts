import { Directive, HostListener, ElementRef } from '@angular/core';
@Directive({
    selector: '[trimLeadingZero]'
})
export class TrimLeadingZeroDirective {


    // The Constructor is a default method of the class that is executed when the class is
    // instantiated and ensures proper initialisation of fields in the class and its subclasses
    // constructor for this component
    constructor(private elRef: ElementRef) {
    }

    @HostListener('keypress', ['$event']) onkeypress(event: KeyboardEvent) {

        const eventCode = event.key;
        const newIndex = this.elRef.nativeElement.selectionStart;
        const newVal = this.predictedNewVal(this.elRef.nativeElement.value, newIndex, event);

        if (eventCode === "0" && newVal && newVal.length >= 1 && newVal.charAt(0) === '0') {
            event.preventDefault();
        }
    }


    predictedNewVal(value: string, index: number, event: KeyboardEvent): string {
        let predictedNewValue = null;
        if (index !== 0) {
            predictedNewValue = (value ? value.slice(0, index) : value) + (event.key)
                + (value ? value.slice(index) : value);
        } else {
            predictedNewValue = (event.key) + value;
        }

        return predictedNewValue;
    }

}
