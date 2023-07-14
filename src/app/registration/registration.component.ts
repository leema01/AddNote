import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
   RegForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.RegForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required,Validators.pattern(passwordRegex)]],
      confirmPassword: ['', [Validators.required,Validators.pattern(passwordRegex)]],
      streetAddress: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^\\d{10}$")]],
      zip:['',[Validators.required]]
    }, { validator: [this.passwordMatchValidator, this.ageValidator,this.zipValidator]});
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    }
  }


  onSubmit() {
    if (this.RegForm.valid) {
      console.log(this.RegForm.value);
      // Call API or other action to add user with this.RegForm.value
      this.snackBar.open('Form submitted Successfully!', 'Dismiss', {
        duration: 3000
      });
    }
   
  }
  ageValidator(formkadata:FormGroup){
    const umar=formkadata.get('age')?.value
    if(umar<16){
      formkadata.get('age')?.setErrors({agekamhy:true})
    }
  }

   zipValidator(formkadata: FormGroup):void {
    const adde_ka_zip = formkadata.get('zip')?.value;
    if (adde_ka_zip === '5' ||adde_ka_zip.length <= 5 ) {
        return formkadata.get('zip')?.setErrors({ zip_galat_hy: true });
    }
  }}
