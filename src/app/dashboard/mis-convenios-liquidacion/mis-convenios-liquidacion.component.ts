import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';


@Component({
  selector: 'app-mis-convenios-liquidacion',
  templateUrl: './mis-convenios-liquidacion.component.html',
  styleUrls: ['./mis-convenios-liquidacion.component.css']
})
export class MisConveniosLiquidacionComponent implements OnInit {
  sesion: any;
  listaGruposDeTrabajo = [];
  cbxGrupoTrabajo: any;
  cbxProceso: any;
  listaDeEstados: any;
  listaProcesosNegocioE: any;
  spinner: boolean;
  listaDeProcesos: any;
  cbxEstadoProceso: any;
  txtIni: any;
  txtFin: any;
  listaDeAgreement = [];
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef4: BsModalRef;
  config3 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };
  listHistoric: any;
  beanAgreement: any;
  beanProcedureAction: any;
  listaAnexos: any;
  beanAgreement2: any;
  listBeneficiary: any;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl'
  };
  idAgreeModal: any;
  constructor(
    private planService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService,
    private _service: DicoService,
    private _fileService: FileService,
    private _service2: Dicco2Service
  ) { }

  ngOnInit(): void {
    this.sesion = JSON.parse(localStorage.getItem('usuario'));

    this.obtenerFuncionalId();
    this.obtenerProcesos();
    this.initBeanAction();

  }
  initBeanAction() {
    this.beanProcedureAction = {
      IDLnFunctionalID: null
    }
  }
  obtenerFuncionalId() {
    this._service.getFunctionalIDByBoss(this.sesion.DataBeanProperties.IDAccount).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          console.log(resp.DataBeanProperties.ObjectValue);
          this.listaGruposDeTrabajo = resp.DataBeanProperties.ObjectValue;
        } else {
          this.listaGruposDeTrabajo = [];
        }
      }
    );
  }
  getEstadosPorProceso() {
    this._service.getBusinessStateCatalog(this.cbxProceso).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeEstados = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaDeEstados);
        } else {

        }
      })
  }

  obtenerProcesos() {
    this.spinner = true;
    this._service.getBusinessProcessCatalog().subscribe((resp: any) => {
      this.spinner = false;
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaDeProcesos = resp.DataBeanProperties.ObjectValue;
        console.log(this.listaDeProcesos);
      } else {
        this.listaDeProcesos = [];
        this.message.showError("No se pudo traer la lista de procesos", "");
      }
    })
  }
  obtenerProcesosNegocioEstado() {
    this._service.getBusinessStateByFunctionalIDForExecution(this.cbxProceso, this.cbxGrupoTrabajo).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaProcesosNegocioE = resp.DataBeanProperties.ObjectValue;
        console.log(this.listaProcesosNegocioE);

      } else {
        this.message.showError("No se pudo listar los estados del proceso", "");
      }

    });
  }

  obtenerAgreement() {
    this.spinner = true;
    this.txtIni ? this.txtIni = this.txtIni + ' 00:00:00' : this.txtIni = null;
    this.txtFin ? this.txtFin = this.txtFin + ' 00:00:00' : this.txtFin = null;
    this._service.getAgreementByStateForObserver(this.cbxEstadoProceso, this.cbxGrupoTrabajo, this.txtIni, this.txtFin).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaDeAgreement = resp.DataBeanProperties.ObjectValue;
        console.log(this.listaDeAgreement);
        this.spinner = false;
      } else {
        this.message.showError("No se pudo listar los procedimientos", "");
        this.spinner = false;

      }

    });
  }
  openHistoric(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config3);
  }
  loadHistoric(id) {
    this._service2.getListHistoric(id).subscribe((resp: any) => {
      console.log(resp);
      this.listHistoric = resp.DataBeanProperties.ObjectValue;
      for (let index = 0; index < this.listHistoric.length; index++) {
        if (resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext !== null) {
          resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myLink =
            this._fileService.getUrlFiles(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext,
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Media);
        }
      }
    });
  }
  popularAgreement(bean) {
    this.beanAgreement = bean;
    console.log("beanAgreement", this.beanAgreement);

  }
  abrirSubirArchivo(template: TemplateRef<any>, bean) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);
    this.listarAnexos();
  }
  listarAnexos() {
    this._service.getAttachedDocumentCatalog(this.beanProcedureAction.IDAction).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaAnexos = resp.DataBeanProperties.ObjectValue;
      } else {
        this.message.showError("No se pudieron listar los anexos", "");
      }
    })
  }
  abrirModal(template: TemplateRef<any>, bean) {
    this.beanProcedureAction = bean;
    console.log("beanProcedureAction", this.beanProcedureAction);
    if (this.beanProcedureAction.FormURLComponent == 'formulario-convenio') {
      this.obtenerAgreement2(template);
    } else {
      this.modalRef = this.modalService.show(template, { class: 'modal-xl p-5' });
    }
  }
  obtenerAgreement2(template) {
    if (this.beanAgreement.IDProcedureImp) {
      this._service.getAgreementByProcedureImp(this.beanAgreement.IDProcedureImp).subscribe(
        (resp: any) => {
          console.log(resp);

          if (resp.DataBeanProperties.ObjectValue) {
            this.beanAgreement2 = resp.DataBeanProperties.ObjectValue;
            console.log(this.beanAgreement2);
            this.modalRef = this.modalService.show(template, { class: 'modal-xl p-5' });
          } else {
            this.message.showError("No se pudo obtener Agreement", "")
          }
        }
      );
    }
  }
  cerrar() {
    this.modalService.hide();
  }
  openPlan(template: TemplateRef<any>, bean) {
    this.beanProcedureAction.IDLnFunctionalID = this.cbxGrupoTrabajo;
    this.beanAgreement = bean;
    this.listarBeneficiario(template);
  }
  listarBeneficiario(template) {
    this.planService.getListBeneficiary(this.beanAgreement.IDAgreement).subscribe((resp: any) => {
      console.log(resp);
      if (resp.DataBeanProperties.ObjectValue) {
        this.modalRef = this.modalService.show(template, this.config);
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listBeneficiary = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showWarning("Este convenio aun no tiene beneficiarios", "");
        }
      } else {
        this.message.showError("No se pudieron listar los beneficiarios", "");

      }
    });
  }
  openType(id, template: TemplateRef<any>) {
    this.idAgreeModal = id;
    this.modalRef = this.modalService.show(template, this.config3);
  }
}
