import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
  selector: "[app-Dropdown]"
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = false;

  @HostListener("click") dropdownToggle() {
    this.isOpen = !this.isOpen;
  }
}
