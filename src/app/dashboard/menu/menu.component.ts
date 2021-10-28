import { Component, OnInit, TemplateRef } from '@angular/core';
import { QuickturnService } from '../../providers/quickturn.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from '../../providers/message.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public modalRef: BsModalRef;
  titleBS: string;
  titleMS: string;
  titleBS2: string;
  titleMS2: string;
  titleBS3: string;
  titleMS3: string;
  idMenu: number;
  idMenu2: number;
  optionName: any;
  optionPurpose: any;
  optionLink: any;
  listModule: any[];

  // Menu
  opcionModule: any;
  selectorModule: string;
  optionCode: any;
  optionNameMenu: any;
  optionUrl: any;

  lista_tree: any[];
  idParent: any;

  // Role
  optionNameRol: any;
  optionDesRol: any;
  optionState: any;
  listRole: any[];
  idRol: number;
  listMenuAux: any[];
  opcionModMenu: any;
  selectorModMenu: string;
  idRoleValidate: number;
  aux;
  idDeleteModule: number;
  idDeleteMenu: number;
  idDeleteRol: number;
  spinner: boolean;

  constructor(private menuService: QuickturnService,
              public modalService: BsModalService,
              private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadDataRole();
    this.selectorModule = 'Seleccione una opción'
  }

  loadData(){
    this.spinner = true;
    console.log('Hola');
    this.menuService.getListMenu().subscribe((resp: any) => {
    this.spinner = false;
    this.listModule = resp.DataBeanProperties.ObjectValue;
    });
  }

  loadDataRole(){
    this.menuService.getListRole().subscribe((respR: any) => {
      console.log(respR);
      this.listRole = respR.DataBeanProperties.ObjectValue;
    });
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm modal-dialog-centered'
  };

  config2 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };

   openModule(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
   }

   openMenu(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
   }

   openRol(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
   }

   openAssign(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config2);
   }

   openDeleteModule(id, template: TemplateRef<any>){
    this.idDeleteModule = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDeleteMenu(id, template: TemplateRef<any>){
    this.idDeleteMenu = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDeleteRol(id, template: TemplateRef<any>){
    this.idDeleteRol = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

   cerrar() {
    this.modalService.hide();
   }

   modifyModule(id, state){
    if (state === 'Crear'){
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Módulo';
    }
    if (state === 'Editar'){
      this.idMenu = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Módulo';
      this.menuService.getIdMenu(id).subscribe((resp: any) => {
        console.log(resp);
        this.optionName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.optionPurpose = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Purpose;
        this.optionLink = resp.DataBeanProperties.ObjectValue.DataBeanProperties.AppLink;
      });
    }
   }

   cleanModule(){
    this.optionName = '';
    this.optionPurpose = '';
    this.optionLink = '';
  }

  sendModule(){
    if(this.titleBS === 'Crear'){
      this.menuService.postMenu(this.optionName, this.optionPurpose, this.optionLink).subscribe((resp: any) => {
        console.log(resp);
        this.loadData();
          this.message.showSuccess('El módulo se ha guardado correctamente', 'Módulo');
          this.cerrar();
      });
    }
    if(this.titleBS === 'Editar'){
      this.menuService.putMenu(this.idMenu, this.optionName, this.optionPurpose, this.optionLink).subscribe((resp: any) => {
        console.log(resp);
        this.loadData();
          this.message.showSuccess('El módulo se ha editado correctamente', 'Módulo');
          this.cerrar();
      });
    }
  }

  deleteModule(){
    this.menuService.deleteModule(this.idDeleteModule).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('El módulo se ha eliminado correctamente', 'Módulo');
      this.cerrar();
    });
  }


  // Menu
  modifyMenu(id, state){
    if (state === 'Crear'){
      this.titleBS2 = 'Crear';
      this.titleMS2 = 'Crear Menú';
    }
    if (state === 'Editar'){
      this.idMenu2 = id;
      this.titleBS2 = 'Editar';
      this.titleMS2 = 'Editar Menú';
      this.menuService.getIdAplicationId(id).subscribe((resp: any) => {
        console.log(resp);
        this.optionCode = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Code;
        this.optionNameMenu = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.optionUrl = resp.DataBeanProperties.ObjectValue.DataBeanProperties.URL;
      });
    }
   }

   cleanMenu(){
    this.optionName = '';
    this.optionPurpose = '';
    this.optionLink = '';
  }

  cleanMenu2(){
    this.optionCode = '';
    this.optionNameMenu = '';
    this.optionUrl = '';
  }

  sendMenu(){
    if(this.titleBS2 === 'Crear'){
      this.menuService.postMenuModule(this.idParent, this.optionCode, this.optionNameMenu, this.opcionModule, this.optionUrl).subscribe((resp: any) => {
        console.log(resp);
        this.message.showSuccess('El menú se ha guardado correctamente', 'Menú');
        this.getTreeForApplicationID();
        this.cerrar();
      });
    }
    if(this.titleBS2 === 'Editar'){
      this.menuService.putMenuModule(this.idMenu2, this.optionCode, this.optionNameMenu, this.opcionModule, this.optionUrl).subscribe((resp: any) => {
        console.log(resp);
        this.getTreeForApplicationID();
        this.message.showSuccess('El menú se ha editado correctamente', 'Menú');
        this.cerrar();
      });
    }
  }

  // Menu
  getTreeForApplicationID(){
    this.menuService.getTreeApplicationId(this.opcionModule).subscribe((resp: any) => {
      console.log(resp);
      this.lista_tree = resp.DataBeanProperties.ObjectValue;
      // Lista Auxiliar
      console.log(this.lista_tree);
    });
  }


  newChild(id){
    this.idParent = id;
  }

  public decodeval(val: string) {
    return decodeURIComponent(val);
  }

  deleteMenu(){
    this.menuService.deleteMenu(this.idDeleteMenu).subscribe((resp: any) => {
      console.log(resp);
      this.getTreeForApplicationID();
      this.cerrar();
    });
  }

  // Rol
  sendRol(){
    console.log('Hola');
    if(this.titleBS3 === 'Crear'){
      this.menuService.postRole(this.optionNameRol, this.optionState, this.optionDesRol).subscribe((resp: any) => {
        console.log(resp);
        this.message.showSuccess('El rol se ha guardado correctamente', 'Rol');
        this.loadDataRole();
        this.cerrar();
      });
    }
    if(this.titleBS3 === 'Editar'){
      this.menuService.putRole(this.idRol, this.optionNameRol, this.optionState, this.optionDesRol).subscribe((resp: any) => {
        console.log(resp);
        this.message.showSuccess('El rol se ha editado correctamente', 'Rol');
        this.loadDataRole();
        this.cerrar();
      });
    }
  }

  modifyRol(id, state){
    console.log(id, state);
    if (state === 'Crear'){
      this.titleBS3 = 'Crear';
      this.titleMS3 = 'Crear Rol';
    }
    if (state === 'Editar'){
      this.idRol = id;
      this.titleBS3 = 'Editar';
      this.titleMS3 = 'Editar Rol';
      this.menuService.getIdRole(id).subscribe((resp: any) => {
        console.log(resp);
        this.optionNameRol = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.optionDesRol = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
        this.optionState = resp.DataBeanProperties.ObjectValue.DataBeanProperties.State;
      });
    }
   }

   cleanRol(){
    this.optionNameRol = '';
    this.optionDesRol = '';
    this.optionState = '';
  }

  deleteRol(){
    this.menuService.deleteRole(this.idDeleteRol).subscribe((resp: any) => {
      console.log(resp);
      this.loadDataRole();
      this.cerrar();
    });
  }

  changeMenu(){
    this.loadDataMenu();
  }

  loadDataMenu(){
    this.menuService.getTreeApplicationId(this.opcionModMenu).subscribe((resp: any) => {
      console.log(resp);
      this.listMenuAux = resp.DataBeanProperties.ObjectValue;
      for (let index = 0; index < this.listMenuAux.length; index++) {
        this.menuService.getCheckRole(this.idRoleValidate, 
          resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.IDLn).subscribe((respC: any) => {
            console.log(respC);
            resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myState = 
            this.validateState(respC.DataBeanProperties.ObjectValue);
            resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myIcon = 
            this.validateStateIcon(respC.DataBeanProperties.ObjectValue);
            resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myIcon2 = 
            this.validateStateIcon2(respC.DataBeanProperties.ObjectValue);
        });
      }
    });
  }

  validateRol(id){
    this.idRoleValidate = id;
    this.opcionModMenu = '';
    console.log(this.listMenuAux);
    if(this.listMenuAux !== undefined){
      this.listMenuAux.splice(0, this.listMenuAux.length);
    }
  }

  validateState(data){
    if(data === true){
      return 'Activo'
    }else{
      return 'Inactivo'
    }
  }

  validateStateIcon(data){
    console.log(data);
    let viewIcon;
    if(data === true){
      viewIcon = false;
    }else{
      viewIcon = true;
    }
    return viewIcon;
  }

  validateStateIcon2(data){
    let viewIcon2;
    if(data === false){
      viewIcon2 = false;
    }else{
      viewIcon2 = true;
    }
    return viewIcon2;
  }

  addRole(id){
    this.menuService.getAddRole(this.idRoleValidate, id).subscribe((resp: any) => {
      this.loadDataMenu();
    });
  }

  removeRole(id){
    this.menuService.getDeleteRole(this.idRoleValidate, id).subscribe((resp: any) => {
      this.loadDataMenu();
    });
  }

}
