import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl,  FormArray} from '@angular/forms';

function passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  if (!passwordRegex.test(control.value)) {
    return { invalidPassword: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      password: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', Validators.required],
      addresses: this.fb.array([]),

    });
  }



  addAddress() {
    const addressGroup = this.fb.group({
      address: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9 ]+/)]],
      street: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9 ]+/)]],
      country: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]],
      city: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]],
    });

    this.addresses.push(addressGroup);
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  get addresses() {
    return this.registerForm.get('addresses') as FormArray;
  }


  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Form is valid. Ready for registration.');
      console.log('Form data:', this.registerForm.value);
    } else {
      console.log('Form is invalid. Please fix the errors.');
    }
  }
}
