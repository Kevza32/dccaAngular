import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-logistic-unit',
  templateUrl: './logistic-unit.component.html',
  styleUrls: ['./logistic-unit.component.css']
})
export class LogisticUnitComponent implements OnInit {

  public modalRef: BsModalRef;
  pageActual: number = 1;
  idDelete: number;
  idSystem: number;
  titleBS: string;
  titleMS: string;
  listSystem: any[];

  opcionNombre: any;
  opcionDescripcion: any;
  SystemValue: any;
  AppName: any;
  spinner: boolean;

  constructor(private modelService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner = true;
    this.modelService.getListLogistic().subscribe((resp: any) => {
      console.log(resp);
      this.listSystem = resp.DataBeanProperties.ObjectValue;
      this.spinner = false;

    });
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

  openComponente(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, this.config2);
  }

  cerrar() {
    this.modalService.hide();
  }

  sendComponente() {
    if (this.titleBS === 'Crear') {
      this.modelService.postLogisticUnit(
        this.opcionNombre,
        this.opcionDescripcion
      ).subscribe((respPost: any) => {
        console.log(respPost);
        this.loadData();
        this.message.showSuccess('La unidad logística se ha guardado correctamente', 'Unidad Logística');
        this.cerrar();
      });
    }
    if (this.titleBS === 'Editar') {
      this.modelService.putLogisticUnit(
        this.idSystem,
        this.opcionNombre,
        this.opcionDescripcion
      ).subscribe((respPut: any) => {
        console.log(respPut);
        this.loadData();
        this.message.showSuccess('La unidad logística se ha editado correctamente', 'Unidad Logística');
        this.cerrar();
      });
    }
  }

  modifyComponente(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Unidad Logística';
    }
    if (state === 'Editar') {
      this.idSystem = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Unidad Logística';
      this.modelService.getIdLogistic(id).subscribe((resp: any) => {
        console.log(resp);
        this.opcionNombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.opcionDescripcion = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
        this.SystemValue = resp.DataBeanProperties.ObjectValue.DataBeanProperties.SystemValue;
        this.AppName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.AppName;
      });
    }
  }

  clearComponente() {
    this.opcionNombre = '';
    this.opcionDescripcion = '';
  }

  deleteComponente() {
    this.modelService.deleteLogistic(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('La unidad logística se ha eliminado correctamente', 'Unidad Logística');
      this.cerrar();
    });
  }

}
