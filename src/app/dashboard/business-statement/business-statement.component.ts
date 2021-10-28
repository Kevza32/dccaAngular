import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-business-statement',
  templateUrl: './business-statement.component.html',
  styleUrls: ['./business-statement.component.css']
})
export class BusinessStatementComponent implements OnInit {

  public modalRef: BsModalRef;
  pageActual: number = 1;
  idDelete: number;
  titleBS: string;
  titleMS: string;
  listSystem: any[];
  spinner: boolean;

  listBusinessProcess: any[];
  listBusinessState: any[];

  beanEstadoNegocio: any;

  opcionModel: any;

  constructor(private modelService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  initBean() {
    this.beanEstadoNegocio = {
      IDBusinessState: null,
      IDBusinessProcess: null,
      Name: "",
      Description: ""
    }
  }

  listBusiness(){
    this.spinner = true;
    this.modelService.getListBusinessStatement(this.opcionModel).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.spinner = false;
            this.listBusinessState = resp.DataBeanProperties.ObjectValue;
          } else {
            this.spinner = false;
            this.message.showWarning("Aun no tiene registros creados", "");
            this.listBusinessState = [];
          }
        } else {
          this.message.showError("No se pudieron listar los Estados", "");
        }
      }
    );
  }

  loadData() {
    this.modelService.getListModel().subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listBusinessProcess = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showError("No se pudo listar los procesos de negocio", "");
        }
      }
    );
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

  openComponente(template: TemplateRef<any>, data) {
    if (data === 'Crear') {
      this.initBean();
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Estado';
    }
    if (data === 'Editar') {
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Estado';
    }
    this.modalRef = this.modalService.show(template, this.config);
  }

  openEdit(bean){
    console.log(bean);
    this.beanEstadoNegocio = bean;
  }

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, this.config2);
  }

  cerrar() {
    this.modalService.hide();
  }

  sendComponent() {
    this.beanEstadoNegocio.IDBusinessProcess = this.opcionModel;
    console.log("estado", this.beanEstadoNegocio);
    this.modelService.postBusinessStatement(this.beanEstadoNegocio).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (this.beanEstadoNegocio.IDBusinessState == null) {
            this.message.showSuccess("Se guardo el registro", "");
            this.cerrar();
          } else {
            this.message.showSuccess("Se edito el registro", "");
            this.cerrar();
          }
          this.modalRef.hide();
          this.initBean();
          this.listBusiness();
        } else {
          this.message.showError("No se pudo guardar el registro", "");
        }
      }
    );
  }

  deleteComponente() {
    this.modelService.deleteBusinessStatement(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.listBusiness();
      this.message.showSuccess('El estado se ha eliminado correctamente', 'Estado');
      this.cerrar();
    });
  }

}
