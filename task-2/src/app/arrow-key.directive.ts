import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[ctrlKeys]',
})
export class ArrowKeysDirective  {
  @Output() ctrlV = new EventEmitter();
  @Output() ctrlC = new EventEmitter();

  @HostListener('keydown.control.v') onCtrlV() {
    this.ctrlV.emit();
  }

  @HostListener('keydown.control.c') onCtrlC() {
    this.ctrlC.emit();
  }
}