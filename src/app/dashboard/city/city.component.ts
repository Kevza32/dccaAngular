import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit, OnDestroy {

  // Breadcrumbs
  listAux = [];

  //Selection
  idCity;
  viewData = true;
  nombre;
  listTree: any;
  raiz: any;
  idDelete: number;
  state: string;
  public modalRef: BsModalRef;
  optionCode: any;
  optionName: any;
  optionDescription: any;
  titleBS: string;
  titleMS: string;
  idCityEdit: number;
  spinner: boolean;

  constructor(private cityService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {

  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };

  config2 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm modal-dialog-centered'
  };

  openCity(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDelete(id, state, template: TemplateRef<any>) {
    this.idDelete = id;
    this.state = state;
    this.modalRef = this.modalService.show(template, this.config2);
  }

  cerrar() {
    this.modalService.hide();
  }

  loadData() {
    this.spinner = true;
    this.cityService.getTreeCity().subscribe((respR: any) => {
      console.log(respR);
      this.raiz = respR.DataBeanProperties.ObjectValue.EnvolvedObject.DataBeanProperties.Name;
      this.listAux.push(this.generarData(0, this.raiz));
      console.log('Raiz', this.listAux);
      this.cityService.getIdChildTreeCity(0).subscribe((resp: any) => {
        console.log(resp);
        this.listTree = resp.DataBeanProperties.ObjectValue;
        this.viewData = true;
        this.spinner = false;

      });
    });
  }

  getSelection(id, state) {
    this.spinner = true;
    this.idCity = id;
    if (state === 'Editar') {
      if (id > 0) {
        this.cityService.getIdTreeCity(id).subscribe((resp: any) => {
          console.log(resp);
          this.nombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
          if (this.validate(id) === true) {
            this.getData(id);
          }
          if (this.validate(id) === false) {
            this.listAux.push(this.generarData(id, this.nombre));
          }
          this.viewData = false;
          this.cityService.getIdChildTreeCity(id).subscribe((respChild: any) => {
            console.log(respChild);
            this.listTree = respChild.DataBeanProperties.ObjectValue;
            this.viewData = true;
            this.spinner = false;
          });
        });
      } else {
        this.loadData();
        if (this.validate(id) === true) {
          this.getData(id);
        }
      }
    }
    if (state === 'Eliminar') {
      if (id > 0) {
        this.cityService.getIdChildTreeCity(id).subscribe((respChild: any) => {
          console.log(respChild);
          this.listTree = respChild.DataBeanProperties.ObjectValue;
          this.viewData = true;
        });
      } else {
        this.cityService.getIdChildTreeCity(0).subscribe((resp: any) => {
          console.log(resp);
          this.listTree = resp.DataBeanProperties.ObjectValue;
        });
      }
    }
  }

  getData(id) {
    for (let i = 0; i < this.listAux.length; i++) {
      if (id === this.listAux[i].idValor) {
        this.listAux.splice(i, this.listAux.length);
      }
    }
  }

  validate(id): boolean {
    for (let i = 0; i < this.listAux.length; i++) {
      if (id === this.listAux[i].idValor) {
        return true;
      }
    }
    return false;
  }

  generarData(id, valor) {
    const data = {
      idValor: id,
      valorData: valor
    };
    return data;
  }

  public decodeval(val: string) {
    return decodeURIComponent(val);
  }

  sendCity() {
    if (this.titleBS === 'Crear') {
      if (this.idCity === undefined) {
        this.idCity = 0;
      }
      this.cityService.addCity(this.idCity, this.optionCode, this.optionName, this.getValidateInput(this.optionDescription)).subscribe((resp: any) => {
        console.log(resp);
        this.getSelection(this.idCity, 'Editar');
        this.message.showSuccess('Se ha agregado correctamente', 'Agregado');
        this.cerrar();
      });
    }
    if (this.titleBS === 'Editar') {
      if (this.idCity === undefined) {
        this.idCity = 0;
      }
      this.cityService.putCity(this.idCityEdit, this.idCity, this.optionCode, this.optionName, this.getValidateInput(this.optionDescription)).subscribe((resp: any) => {
        console.log(resp);
        this.getSelection(this.idCity, 'Editar');
        this.message.showSuccess('Se ha editado correctamente', 'Editado');
        this.cerrar();
      });
    }
  }

  getValidateInput(data) {
    if (data === '') {
      return null;
    }
    if (data === undefined) {
      return null;
    }
    return data;
  }

  modifyCity(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Organigrama';
    }
    if (state === 'Editar') {
      this.idCityEdit = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Organigrama';
      this.cityService.getIdTreeCity(id).subscribe((resp: any) => {
        console.log(resp);
        this.optionCode = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Code;
        this.optionName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.optionDescription = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
      });
    }
  }

  clearCity() {
    this.optionCode = '';
    this.optionName = '';
    this.optionDescription = '';
  }

  deleteCity() {
    this.cityService.deleteCity(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.getSelection(this.idCity, 'Eliminar');
      this.message.showSuccess('Se ha eliminado correctamente', 'Eliminado');
      this.cerrar();
    });
  }



}
