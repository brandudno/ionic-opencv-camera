import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.page.html',
  styleUrls: ['./ui.page.scss'],
})
export class UiPage implements OnInit {

  public uiFormGroup: FormGroup;
  public input: FormControl = new FormControl('', [Validators.required]);
  public select: FormControl = new FormControl('', [Validators.required]);
  public textArea: FormControl = new FormControl('', [Validators.required]);
  public radio: FormControl = new FormControl('', [Validators.required]);
  public startDate: FormControl = new FormControl('', [Validators.required]);
  public formSubmitted: boolean;
  public subdomain: String;
  public token: String;

  constructor(
  ) { }

  ngOnInit() {
    this.uiFormGroup = new FormGroup({
      'input': this.input,
      'select': this.select,
      'textArea': this.textArea,
      'radio': this.radio,
      'startDate': this.startDate
    });
  }

  public submitForm(): void {
    this.uiFormGroup.markAllAsTouched();
    
    if(this.uiFormGroup.invalid) return;
  }

}
