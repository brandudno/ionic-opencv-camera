import { FormControl, Validators, FormGroup } from "@angular/forms";

export class AuthenticationForm {
    public username: FormControl = new FormControl('', Validators.required);
    public password: FormControl = new FormControl('', Validators.required);

    public formGroup = new FormGroup({
        'username': this.username,
        'password': this.password
    });

    constructor() {}
}