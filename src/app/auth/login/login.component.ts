import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuickturnService } from '../../providers/quickturn.service';
import { MessageService } from '../../providers/message.service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  optionUser: any;
  optionPassword: any;
  public usuario: any;
  token = true;
  idAccount = 15964;
  formularioLogin: FormGroup;

  constructor(private router: Router,
    private loginService: QuickturnService,
    private message: MessageService,
    private fb: FormBuilder) {
    this.iniciarLogin();

  }

  ngOnInit(): void {
  }
  iniciarLogin() {
    this.formularioLogin = this.fb.group({
      optionUser: ['', [Validators.email, Validators.required]],
      optionPassword: ['', [Validators.required]]
    })
  }

  login() {
    console.log("la esta llamando");

    this.loginService.login('local', this.formularioLogin.get('optionUser').value, this.formularioLogin.get('optionPassword').value).subscribe((resp: any) => {
      console.log(resp);
      if (resp.DataBeanProperties.hasOwnProperty('ObjectValue')) {
        if (resp.DataBeanProperties.ObjectValue.DataBeanProperties.Account) {
          this.usuario = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Account;
          localStorage.setItem('usuario', JSON.stringify(this.usuario));
          localStorage.setItem('token', JSON.stringify(this.token));
          this.message.showSuccess('Usuario y contraseña válidos', 'Inicio de sesión');
          this.router.navigate(['/dashboard']);
        } else {
          this.message.showError('Usuario o contraseña inválido', 'Inicio de sesión');
        }
      } else {
        this.message.showError('Usuario o contraseña inválido', 'Inicio de sesión');
      }
    });
  }
  navegar(link) {
    this.router.navigate([link]);
  }

}
