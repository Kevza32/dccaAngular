import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-unidad-militar',
  templateUrl: './unidad-militar.component.html',
  styleUrls: ['./unidad-militar.component.css']
})
export class UnidadMilitarComponent implements OnInit {

  // Breadcrumbs
  listAux = [];
  listAux2 = [];

  //Selection
  idUnit;
  idUnit2;
  viewData = true;
  nombre;
  nombre2;
  listTree: any;
  listTree2: any;
  raiz: any;
  raiz2: any;
  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;
  public modalRef3: BsModalRef;
  idDelete: number;
  state: string;

  // Modal
  titleBS: string;
  titleMS: string;
  optionCode: any;
  optionName: any;
  optionDescription: any;
  optionChanel: any;
  optionBoss: any;
  optionSite: any;

  // Search Tercero
  optionDocument: any;
  listAccount: any[];
  nombreCompleto: any;
  nit: any;
  viewInfo = false;
  viewData2 = false;
  nameSave2: string;
  idUnitEdit: number;

  // Search
  nameChanel: string;
  nameBoss: string;
  nameCity: string;
  spinner: boolean;
  spinner2: boolean;


  constructor(private unitService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy() {

  }

  loadData() {
    this.spinner = true;
    this.unitService.getTreeUnitNew().subscribe((respR: any) => {
      console.log(respR);
      this.raiz = respR.DataBeanProperties.ObjectValue.EnvolvedObject.DataBeanProperties.Name;
      this.listAux.push(this.generarData(0, this.raiz));
      console.log('Raiz', this.listAux);
      this.listTree = respR.DataBeanProperties.ObjectValue.Childs;
      this.spinner = false;
    });
  }

  getSelection(id, state) {
    this.spinner = true;
    this.idUnit = id;
    if (state === 'Editar') {
      if (id > 0) {
        this.unitService.getIdTreeUnitNew(id).subscribe((resp: any) => {
          console.log(resp);
          this.nombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
          if (this.validate(id) === true) {
            this.getData(id);
          }
          if (this.validate(id) === false) {
            this.listAux.push(this.generarData(id, this.nombre));
          }
          this.viewData = false;
          this.unitService.getIdChildTreeUnitNew(id).subscribe((respChild: any) => {
            console.log(respChild);
            this.listTree = respChild.DataBeanProperties.ObjectValue.Childs;
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
        this.unitService.getIdChildTreeUnitNew(id).subscribe((respChild: any) => {
          console.log(respChild);
          this.listTree = respChild.DataBeanProperties.ObjectValue.Childs;
          this.viewData = true;
        });
      } else {
        this.loadDataInit();
      }
    }
  }

  loadDataInit() {
    this.unitService.getTreeUnitNew().subscribe((respR: any) => {
      console.log(respR);
      this.listTree = respR.DataBeanProperties.ObjectValue.Childs;
    });
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

  config3 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };

  openUnidad(template: TemplateRef<any>) {
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

  sendUnidad() {
    if (this.titleBS === 'Crear') {
      if (this.idUnit === undefined) {
        this.idUnit = 0;
      }
      this.unitService.addUnitNew(this.idUnit, this.optionName, this.getValidateInput(this.optionDescription)).subscribe((resp: any) => {
          console.log(resp);
          this.getSelection(this.idUnit, 'Editar');
          this.message.showSuccess('Se ha agregado correctamente', 'Agregado');
          this.cerrar();
        });
    }
    if (this.titleBS === 'Editar') {
      if (this.idUnit === undefined) {
        this.idUnit = 0;
      }
      this.unitService.putUnitNew(this.idUnitEdit, this.idUnit, this.optionCode, this.optionName, this.optionDescription).subscribe((resp: any) => {
          console.log(resp);
          this.getSelection(this.idUnit, 'Editar');
          this.message.showSuccess('Se ha editado correctamente', 'Editar');
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

  modifyUnidad(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Unidad';
    }
    if (state === 'Editar') {
      this.idUnitEdit = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Unidad';
      this.unitService.getIdTreeUnitNew(id).subscribe((resp: any) => {
        console.log(resp);
        this.optionCode = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Code;
        this.optionName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.optionDescription = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
        this.optionChanel = resp.DataBeanProperties.ObjectValue.DataBeanProperties.DistributionChannel;
        console.log(this.optionChanel);
        this.optionBoss = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDBoss;
        console.log(this.optionBoss);
        this.optionSite = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDSite;
        this.nameChanel = resp.DataBeanProperties.ObjectValue.DataBeanProperties.DistributionChannelName;
        this.nameBoss = resp.DataBeanProperties.ObjectValue.DataBeanProperties.BossName;
        this.nameCity = resp.DataBeanProperties.ObjectValue.DataBeanProperties.SiteName;
      });
    }
  }

  cleanUnit() {
    this.optionCode = '';
    this.optionName = '';
    this.optionDescription = '';
    this.optionChanel = '';
    this.optionBoss = '';
    this.optionSite = '';
    this.nameBoss = '';
    this.nameChanel = '';
    this.nit = '';
    this.optionChanel = '';
    this.nombreCompleto = '';
  }

  clearSearch() {
    this.optionDocument = '';
    this.nit = '';
    this.nombreCompleto = '';
    this.viewInfo = false;
  }

  searchDocument() {
    this.unitService.searchDocument(this.optionDocument).subscribe((resp: any) => {
      console.log(resp);
      this.viewInfo = true;
      this.listAccount = resp.DataBeanProperties.ObjectValue;
      this.nombreCompleto = this.listAccount[0].DataBeanProperties.Name1 + ' ' +
        this.listAccount[0].DataBeanProperties.Name2 + ' ' +
        this.listAccount[0].DataBeanProperties.Surname1 + ' ' +
        this.listAccount[0].DataBeanProperties.Surname2;
      this.optionBoss = this.listAccount[0].DataBeanProperties.IDAccount;
      this.nit = this.listAccount[0].DataBeanProperties.Nit;
    });
  }

  searchDocument2() {
    this.unitService.searchDocument(this.optionDocument).subscribe((resp: any) => {
      console.log(resp);
      this.viewInfo = true;
      this.listAccount = resp.DataBeanProperties.ObjectValue;
      this.nombreCompleto = this.listAccount[0].DataBeanProperties.Name1 + ' ' +
        this.listAccount[0].DataBeanProperties.Name2 + ' ' +
        this.listAccount[0].DataBeanProperties.Surname1 + ' ' +
        this.listAccount[0].DataBeanProperties.Surname2;
      this.optionChanel = this.listAccount[0].DataBeanProperties.IDAccount;
      this.nit = this.listAccount[0].DataBeanProperties.Nit;
    });
  }

  save() {
    this.modalRef2.hide();
  }

  saveCiudad() {
    this.modalRef3.hide();
  }

  deleteUnit() {
    this.unitService.deleteUnitNew(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.getSelection(this.idUnit, 'Eliminar');
      this.message.showSuccess('Se ha eliminado correctamente', 'Eliminado');
      this.cerrar();
    });
  }

  clearSite() {
    this.listAux2.splice(0, this.listAux2.length);
  }

}
