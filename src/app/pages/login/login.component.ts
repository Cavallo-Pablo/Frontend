import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoguinRequest } from 'src/app/services/auth/loguin-request';
import { LoguinService } from 'src/app/services/auth/loguin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: string = "";
  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoguinService);
  private router = inject(Router);

  constructor() { }
  ngOnInit(): void {

  }
  formulario = this.formBuilder.group({
    email: ['admin@gmail.con', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })
  get email() { return this.formulario.controls.email; }
  get password() { return this.formulario.controls.password; }
  login() {
    if (this.formulario.valid) {
      this.loginService.login(this.formulario.value as LoguinRequest).subscribe({
        next: (resp) => {
          console.log(resp)
        },
        error: (error) => {
          console.log(error)
          this.loginError=error
        },
        complete: () => {
          console.info('Login completo')
          this.router.navigateByUrl('/home')
          this.formulario.reset();
        }
      })

    }
    else {
      this.formulario.markAllAsTouched();
      alert('Error al ingresar los datos');
    }
  }






}
