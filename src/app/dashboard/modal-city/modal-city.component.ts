import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-modal-city',
  templateUrl: './modal-city.component.html',
  styleUrls: ['./modal-city.component.css']
})
export class ModalCityComponent implements OnInit {

  public modalRef3: BsModalRef;
  listAux = [];
  viewData = true;
  listTree: any;
  raiz: any;
  idCity;
  nombre;
  beanCity: any;
  @Output() city: EventEmitter<any> = new EventEmitter();
  optionFirst: any;

  constructor(private cityService: Dicco2Service,
              public modalService: BsModalService,
              private message: MessageService) { }

  ngOnInit(): void {
    this.initBeanCity();
  }

  initBeanCity() {
    this.beanCity = {
      Description: '',
      IDLn: '',
      IDLn_1: '',
      LnLevel: '',
      Name: '',
      Since: '',
      State: ''
    }
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };
  
  openCity(template: TemplateRef<any>){
    this.listAux.splice(0, this.listAux.length);
    this.loadData();
    this.modalRef3 = this.modalService.show(template, this.config);
  }
  
  cerrar() {
    this.modalRef3.hide();
  }

  loadData(){
    this.cityService.getTreeCity().subscribe((respR: any) => {
      console.log(respR);
      this.raiz = respR.DataBeanProperties.ObjectValue.EnvolvedObject.DataBeanProperties.Name;
      this.listAux.push(this.generarData(0, this.raiz));
      console.log('Raiz', this.listAux);
      this.cityService.getIdChildTreeCity(0).subscribe((resp: any) => {
        console.log(resp);
        this.listTree = resp.DataBeanProperties.ObjectValue;
        this.viewData = true;
      });
    });
  }

  getSelection(id){
    this.idCity = id;
      if(id > 0){
        this.cityService.getIdTreeCity(id).subscribe((resp: any) => {
          console.log(resp);
          this.nombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
          this.beanCity.Description = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
          this.beanCity.IDLn = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn;
          this.beanCity.IDLn_1 = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn_1;
          this.beanCity.LnLevel = resp.DataBeanProperties.ObjectValue.DataBeanProperties.LnLevel;
          this.beanCity.Name = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
          this.beanCity.Since = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Since;
          this.beanCity.State = resp.DataBeanProperties.ObjectValue.DataBeanProperties.State;
          /* this.idUnitSelection = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn; */
          /* this.nameUnitINput.emit(this.nombre);
          this.idInputUnit.emit(this.idUnitSelection); */
          if(this.validate(id) === true){
            this.getData(id);
          }
          if(this.validate(id) === false){
            this.listAux.push(this.generarData(id, this.nombre));
          }
          this.viewData = false;
          this.cityService.getIdChildTreeCity(id).subscribe((respChild: any) => {
              console.log(respChild);
              this.listTree = respChild.DataBeanProperties.ObjectValue;
              this.viewData = true;
            });
        });
      }else{
        this.loadData();
        if(this.validate(id) === true){
          this.getData(id);
        }
      }
  }

  getData(id){
    for(let i = 0; i < this.listAux.length; i++) {
      if(id === this.listAux[i].idValor){
        this.listAux.splice(i, this.listAux.length);
      }
    }
  }

  validate(id): boolean{
    for(let i = 0; i < this.listAux.length; i++) {
      if(id === this.listAux[i].idValor){
        return true;
      }
    }
    return false;
  }

  generarData(id, valor){
    const data = {
      idValor: id,
      valorData: valor
    };
    return data;
  }

  public decodeval(val: string) {
    return decodeURIComponent(val);
  }

  saveCity(){
    console.log(this.beanCity);
    this.city.emit(this.beanCity);
    this.cerrar();
  }

  searchName(){
    this.cityService.getSearchCityName(this.optionFirst).subscribe((resp: any) => {
      console.log(resp);
      this.getSelection(resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn);
    });
  }

}
