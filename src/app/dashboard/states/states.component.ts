import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';
import { DicoService } from 'src/app/providers/dico.service';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  public modalRef: BsModalRef;
  opcionModel: number;
  listaDeEstados: any;
  beanEstado: any;
  listaProcesosNegocio: any;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl'
  };
  spinner: boolean;

  constructor(private documentService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService,
    private _diccoService: DicoService) { }

  ngOnInit(): void {
    this.listarProcesosNegocio();
  }

  initBean() {
    this.beanEstado = {
      Type: null,
      Description: "",
      IDDocument: null,
      IDBusinessProcess: null,
      IDProcedureState: null,
      Name: ""
    }
  }

  listarProcesosNegocio() {
    this._diccoService.getListModel().subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaProcesosNegocio = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaProcesosNegocio);

        } else {
          this.message.showError("No se pudo listar los procesos de negocio", "");
        }
      }
    );
  }


  listarEstadosxSector() {
    this.spinner = true;
    this._diccoService.getProcedureStateCatalog(this.opcionModel).subscribe(
      (resp: any) => {
        this.spinner = false;
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDeEstados = resp.DataBeanProperties.ObjectValue;
          } else {
            this.message.showWarning("Aun no tiene registros creados", "");
            this.listaDeEstados = [];
          }
        } else {
          this.message.showError("No se pudieron listar los Estados", "");
        }
      }
    );
  }

  openModalCrear(template: TemplateRef<any>) {
    this.initBean();
    this.modalRef = this.modalService.show(template, this.config);
  }
  openModalEditar(template: TemplateRef<any>, bean) {
    this.beanEstado = bean;
    this.modalRef = this.modalService.show(template, this.config);
  }
  openModalEliminar(template: TemplateRef<any>, bean) {
    this.beanEstado = bean;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  guardarEstado() {
    this.beanEstado.IDBusinessProcess = this.opcionModel;
    console.log("estado", this.beanEstado);

    this._diccoService.updateProcedureState(this.beanEstado).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (this.beanEstado.IDProcedureState == null) {
            this.message.showSuccess("Se guardo el registro", "");
          } else {
            this.message.showSuccess("Se edito el registro", "");
          }
          this.modalRef.hide();
          this.initBean();
          this.listarEstadosxSector();
        } else {
          this.message.showError("No se pudo guardar el registro", "");
        }
      }
    );
  }
  EliminarEstado() {
    this._diccoService.deleteProcedureState(this.beanEstado.IDProcedureState).subscribe(
      (resp: any) => {
        this.message.showInfo("Se elimino el registro", "");
        this.modalRef.hide();
        this.initBean();
        this.listarEstadosxSector();
      }
    );
  }
}

