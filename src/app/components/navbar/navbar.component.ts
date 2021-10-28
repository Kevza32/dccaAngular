import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuickturnService } from 'src/app/providers/quickturn.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  aux;
  token = false
  nameAccount;
  sesion;
  abierto: boolean = false;
  constructor(private router: Router,
    private navbarService: QuickturnService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('usuario'));

    if (localStorage.getItem('usuario') == null) {
      this.router.navigate(['/login']);
    } else {
      this.loadData();
    }

  }

  loadData() {
    this.aux = JSON.parse(localStorage.getItem('usuario'));
    this.aux.DataBeanProperties.Name1 == undefined ? this.aux.DataBeanProperties.Name1="" :this.aux.DataBeanProperties.Name1 = this.aux.DataBeanProperties.Name1;
    this.aux.DataBeanProperties.Surname1 == undefined ? this.aux.DataBeanProperties.Surname1 = "" : this.aux.DataBeanProperties.Surname1 = this.aux.DataBeanProperties.Surname1;
    this.nameAccount = this.aux.DataBeanProperties.Name1 + ' ' + this.aux.DataBeanProperties.Surname1;
  }

  closeSession() {
    console.log('Hola');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  mostrarLateral() {

    if (this.abierto == true) {
      document.getElementById('layoutSidenav_nav').style.transform = "translateX(-15rem)";
      this.abierto = false;
    } else {
      document.getElementById('layoutSidenav_nav').style.transform = "translateX(0)";
      this.abierto = true;
    }
  }
}
