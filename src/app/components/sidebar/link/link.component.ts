import { Component, Input, OnInit } from '@angular/core';
import { QuickturnService } from '../../../providers/quickturn.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  aux;
  @Input() typeApplication: any;
  listMenu: any[];

  constructor(public linkService: QuickturnService) { }

  ngOnInit(): void {
/*     this.linkService.listAux;
    console.log(this.linkService.listAux);
    console.log(this.linkService.listAux === undefined);
    this.aux = JSON.parse(localStorage.getItem('usuario'));
    console.log(this.aux.DataBeanProperties.IDAccount); */
    /* if(this.linkService.listAux === undefined || this.linkService.listAux.length === 0){
      this.linkService.getIdMenuAccoutn(this.aux.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        console.log(resp);
        this.linkService.listAux = resp.DataBeanProperties.ObjectValue.DataBeanProperties.ChildRootList;
        console.log(this.linkService.listAux);
      });
    } */
    this.getMenu();
  }

  getMenu() {
    this.linkService.getTreeApplicationId(this.typeApplication).subscribe((resp: any) => {
      /* console.log(resp); */
      this.listMenu = resp.DataBeanProperties.ObjectValue;
      // Lista Auxiliar
    });
  }
}
