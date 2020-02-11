import { Component, OnInit, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent {

  @Input() errors: ValidationErrors;
  constructor() {

  console.log(this.errors);
   }

}
