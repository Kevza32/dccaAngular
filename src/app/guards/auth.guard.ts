import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuickturnService } from '../providers/quickturn.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  aux: boolean;

  constructor(private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      this.aux = JSON.parse(localStorage.getItem('token'));
    console.log(this.aux);
    if(this.aux === true){
      return true;
    }else{
      this.router.navigateByUrl('/login');
    }
  }
  
}
