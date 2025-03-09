import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {from, map, skip, take} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  constructor() {
    // from([1, 2, 3, 4, 5, 6, 7])
    //   .pipe(
    //     map(value => value * 2),
    //     take(2),
    //     skip(1)
    //   )
    //
    //
    //   .subscribe(value => {console.log(value)});
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.valid) {
      //@ts-ignore
      this.authService.login(this.form.value)
        .subscribe(res => {
          this.router.navigate([''])
        })
    }
  }

}
