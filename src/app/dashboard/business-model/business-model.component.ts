import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DicoService } from 'src/app/providers/dico.service';
import { MessageService } from 'src/app/providers/message.service';
import { Dicco2Service } from '../../providers/dicco2.service';

@Component({
  selector: 'app-business-model',
  templateUrl: './business-model.component.html',
  styleUrls: ['./business-model.component.css']
})
export class BusinessModelComponent implements OnInit {

  public modalRef: BsModalRef;

  listModel: any[];
  //ModifyModelo
  idModelo: number;
  // Modal
  titleBS: string;
  titleMS: string;
  opcionNombre: any;
  opcionDescripcion: any;
  opcionPrivate: any;
  opcionPublico: any;
  opcionBusinessClass = null;
  // Delete
  idDelete: number;
  // Pipe
  filterPost = '';
  pageActual: number = 1;
  spinner: boolean;
  listaCategorias: any[];
  UseDistributionChannel: any;


  constructor(private modelService: Dicco2Service,
    private _modelService: DicoService,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadCategoria();
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm modal-dialog-centered'
  };

  openModelo(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  cerrar() {
    this.modalService.hide();
  }

  loadData() {
    this.spinner = true;
    this.modelService.getListModel(this.opcionBusinessClass).subscribe((resp: any) => {
      this.spinner = false;
      this.listModel = resp.DataBeanProperties.ObjectValue;
    });
  }
  loadCategoria() {
    this.listaCategorias = [];
    this._modelService.getBusinessClassCatalogNull().subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaCategorias = resp.DataBeanProperties.ObjectValue;
        console.log(this.listaCategorias);
      } else {
        this.message.showError('No se pudo listar las categorias', "");
      }

    })
  }
  sendModelo() {
    if (this.titleBS === 'Crear') {
      if (this.getValidate(this.opcionNombre) === null) {
        this.message.showError('El campo Nombre es obligatorio', 'Campo');
      } else {
        this.modelService.postModel(this.opcionNombre, this.opcionDescripcion,
          this.validateCheck(this.opcionPrivate), this.validateCheck(this.opcionPublico), this.opcionBusinessClass, this.UseDistributionChannel).subscribe((respPost: any) => {
            console.log(respPost);
            this.loadData();
            this.message.showSuccess('El modelo se ha guardado correctamente', 'Modelo de Proceso');
            this.cerrar();
          });
      }
    }
    if (this.titleBS === 'Editar') {
      this.modelService.putModel(this.idModelo, this.opcionNombre, this.opcionDescripcion, this.validateCheck(this.opcionPrivate), this.validateCheck(this.opcionPublico), this.opcionBusinessClass, this.UseDistributionChannel).subscribe((respPut: any) => {
        console.log(respPut);
        this.loadData();
        this.message.showSuccess('El modelo se ha editado correctamente', 'Modelo de Proceso');
        this.cerrar();
      });
    }
  }

  getValidate(data) {
    if (data === '') {
      return null;
    }
    if (data === undefined) {
      return null;
    }
    return data;
  }

  validateCheck(data) {
    if (data === undefined) {
      return false
    }
    return data;
  }

  modifyModelo(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Modelo';
    }
    if (state === 'Editar') {
      this.idModelo = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Modelo';
      this.modelService.getIdModel(id).subscribe((resp: any) => {
        console.log(resp);
        this.opcionNombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.opcionDescripcion = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
        this.opcionPrivate = resp.DataBeanProperties.ObjectValue.DataBeanProperties.PrivateBusiness;
        this.opcionPublico = resp.DataBeanProperties.ObjectValue.DataBeanProperties.PublicBusiness;
      });
    }
  }

  clearModelo() {
    this.opcionNombre = '';
    this.opcionDescripcion = '';
    this.opcionPrivate = false;
    this.opcionPublico = false;
  }

  deleteModelo() {
    this.modelService.deleteModel(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('El modelo se ha eliminado correctamente', 'Modelo');
      this.cerrar();
    });
  }
  check() {
    this.opcionPrivate = true ? this.opcionPublico = false : this.opcionPrivate = true;
  }
}
