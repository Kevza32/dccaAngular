import { Component, OnInit } from '@angular/core';
import { QuickturnService } from '../../providers/quickturn.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  listModule: any;
  aux;
  listMenu: any[];
  listaDeSubModulos: any;
  bandeja = false;
  propiedadM: number;

  constructor(private sidebarService: QuickturnService) { }

  ngOnInit(): void {
    this.getSystemProperty();
    this.loadData();
  }

  // loadData(){
  //   this.listModule = [];
  //   this.sidebarService.getListMenu().subscribe((resp: any) => {
  //     console.log(resp);
  //     this.listModule = resp.DataBeanProperties.ObjectValue;
  //     for (let index = 0; index < this.listModule.length; index++) {
  //       this.listModule[index].DataBeanProperties.submenu =  this.getMenu(index);  
  //     }
  //     /* this.listModule.forEach(element => {
  //       console.log(element.DataBeanProperties.IDApplicationType);
  //       element.DataBeanProperties.submenu =  this.getMenu(element);
  //     }); */
  //   });
  //   console.log(this.listModule);
  // }

  // getMenu(item) {


  //   let aux = this.listModule[item];
  //   this.sidebarService.getTreeApplicationId(aux.DataBeanProperties.IDApplicationType).subscribe((respM: any) => {
  //     console.log(respM);
  //     /* item.DataBeanProperties.submenu = respM.DataBeanProperties.ObjectValue; */
  //     this.listModule[item].submenu = respM.DataBeanProperties.ObjectValue;
  //   });
  // }

  loadData() {
    this.listModule = [];
    this.sidebarService.getListMenu().subscribe((resp: any) => {
      console.log(resp);
      this.listModule = resp.DataBeanProperties.ObjectValue;
      this.listarSubModulos();
    });
  }
  getSystemProperty() {
    this.sidebarService.getSystemProperty().subscribe((resp: any) => {

      if (resp.DataBeanProperties.ObjectValue) {
        this.propiedadM = resp.DataBeanProperties.ObjectValue.DataBeanProperties.SystemValue;
      } else {
        this.propiedadM = 0;
      }
    })
  }

  listarSubModulos() {
    let listaSub = [];
    this.sidebarService.MenuByApp().subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeSubModulos = resp.DataBeanProperties.ObjectValue.Childs;

          // this.listaDeSubModulos.EnvolvedObject.DataBeanProperties.map(element => element.IDApplicationType == 27 ? this.bandeja = true : '');


          this.listModule.forEach(elementM => {
            elementM.DataBeanProperties.submenu = [];
            this.listaDeSubModulos.forEach(elementS => {
              elementM.DataBeanProperties.IDApplicationType == elementS.EnvolvedObject.DataBeanProperties.IDApplicationType ? elementM.DataBeanProperties.submenu.push(elementS.EnvolvedObject.DataBeanProperties) : "";
            });
            elementM.DataBeanProperties.submenu.length > 0 ? elementM.DataBeanProperties.vista = true : elementM.DataBeanProperties.vista = false;

            // console.log(elementM.DataBeanProperties.vista, elementM.DataBeanProperties.IDApplicationType);

            elementM.DataBeanProperties.vista == false && elementM.DataBeanProperties.IDApplicationType == 27 ? this.bandeja = true : '';
          });
        }
      }
    )
  }
}
