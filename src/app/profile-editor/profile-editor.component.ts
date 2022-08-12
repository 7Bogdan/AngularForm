import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  FormGroupDirective,
  NgForm,
  AbstractControl,
} from '@angular/forms';

import {
  FRAMEWORKS,
  frameworkVersionAngular,
  frameworkVersionReact,
  frameworkVersionVue,
} from '../framework';
import { HOBBY } from '../hobby';
import { EMAILS } from '../emails';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})

export class ProfileEditorComponent {
  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(4)]],
    dateOfBirth: ['', Validators.required],
    framework: ['', Validators.required],
    frameworkVersion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], this.checkValidEmail],
    hobbies: this.fb.array([
      this.fb.group({
        name: ['', Validators.required],
        duration: ['', [Validators.required, Validators.min(1)]],
      }),
    ]),
  });

  constructor(public fb: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 70, 0, 0);
    this.maxDate = new Date(currentYear - 16, 0, 0);

  }

  minDate: Date;
  maxDate: Date;

  FrameworkList = FRAMEWORKS;
  HobbyList = HOBBY;


  frameworkVersions: any[] = ['First choose a framework'];

  showFrameworkVersion(e: any) {
    switch (e.value) {
      case 'Angular':
        this.frameworkVersions = frameworkVersionAngular;
        break;
      case 'React':
        this.frameworkVersions = frameworkVersionReact;
        break;
      case 'Vue':
        this.frameworkVersions = frameworkVersionVue;
        break;
    }
  }

  checkValidEmail(control: AbstractControl) {
  let Emails = EMAILS;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Emails.includes(control.value)){
          resolve({ emailIsTaken: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  };

  addHobby() {
    this.hobbies.push(
      this.fb.group({
        name: [''],
        duration: ['', Validators.min(1)],
      })
    );
    this.HobbyList.push(' ');
  }

  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
