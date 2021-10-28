import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-mis-convenios',
  templateUrl: './mis-convenios.component.html',
  styleUrls: ['./mis-convenios.component.css']
})
export class MisConveniosComponent implements OnInit {
  sesion: any;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef4: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl'
  };
  spinner = false;
  nombreArchi: string;
  tablaBeneInve = [];
  beanNeedsPlanAttach: { IDNeedsPlanAttached: any; IDNeedsPlan: string; IDBudgetExecution: number; IDNeedsPlanDocument: string; IsValid: string; Media: string; MediaContext: string; Name: string; };

  listaDeEntidades: any;
  listaDeProcesos: any;
  listaDeEstados: any;
  cbxProceso: any;
  txtIni: any;
  txtFin: any;
  cbxEstado: any;
  IDLn: any;
  cbxGrupoTrabajo: any;
  listaGruposDeTrabajo: any;
  listaProcesosNegocioE: any;
  cbxEstadoProceso: any;
  listaDeAgreement: any;
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
  listaBeneficiarios: any;
  listBeneficiary: any;
  beanBeneficiaryInvestment: any;
  opcionBeneficiary: any;
  listaDePlanes: any;
  vista: boolean;
  beanPlanNecesidad: any;
  txtEmpresa: any;
  beanExec: any;
  listaDeDocumentos = [];
  listaDeCocumentosB: any;
  BeanDocument: any;
  nombreArchivo: string;
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
    // console.log(this.sesion.DataBeanProperties.IDAccount)
    this.obtenerFuncionalId();
    this.obtenerProcesos();
    this.initBeanNeedsPlanAttach();
    this.initBeanAction();
  }
  initBeanAction() {
    this.beanProcedureAction = {
      IDLnFunctionalID: null
    }
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
  openHistoric(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config3);
  }

  openPlan(template: TemplateRef<any>, bean) {
    this.beanProcedureAction.IDLnFunctionalID = this.cbxGrupoTrabajo;
    this.beanAgreement = bean;
    this.listarBeneficiario(template);
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

    this._service.getAgreementByState(this.cbxEstadoProceso, this.cbxGrupoTrabajo, this.txtIni, this.txtFin).subscribe((resp: any) => {
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
  getUrl(MediaContext, Media) {
    let url = this._fileService.getUrlFiles(MediaContext, Media);
    return url;
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
  obtenerFecha(fecha) {
    if (fecha == null) {
      return '00-00-00'
    } else {
      return fecha.slice(0, 10);
    }
  }
  cerrar() {
    this.modalService.hide();
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
  obtenerListaArticulosPporBeneficiary() {
    this.spinner = true;
    this._service.getBeneficiaryInvestmentCatalogByBeneficiary(this.opcionBeneficiary).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.spinner = false;

          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.tablaBeneInve = resp.DataBeanProperties.ObjectValue;
            console.log("tabla", this.tablaBeneInve);
          } else {
            this.message.showWarning("No hay datos cargados", "");
            this.tablaBeneInve = [];
            this.beanBeneficiaryInvestment = null;

          }

        } else {
          this.message.showError("No se pudo cargar la lista articulos", "");
        }
      }
    );
  }
  abrirTabla(bean, template: TemplateRef<any>) {
    this.beanBeneficiaryInvestment = bean;
    console.log("beanInvestment", this.beanBeneficiaryInvestment);
    this.listarPlanes();
    this.modalRef2 = this.modalService.show(template, this.config);
  }
  listarPlanes() {
    this._service.getNeedsPlanCatalogByBeneficiaryInvestment(this.beanBeneficiaryInvestment.IDBeneficiaryInvestment).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDePlanes = resp.DataBeanProperties.ObjectValue;
            console.log(this.listaDePlanes);
            this.vista = true;
          } else {
            this.message.showWarning("No tiene plan de necesidades", "");
            this.listaDePlanes = [];
            this.vista = true;

          }
        } else {
          this.message.showError("No se pudo listar los planes", "");
        }
      }
    );
  }
  abrirEditar(template: TemplateRef<any>, bean) {
    this.beanPlanNecesidad = bean;
    this.txtEmpresa = this.beanPlanNecesidad.SupplierName;
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
  }
  abrirListaDocs(bean, template: TemplateRef<any>) {
    this.modalRef4 = this.modalService.show(template, { class: 'modal-xl' });
    console.log(bean);

    this.beanExec = bean;

    console.log("plan de necesidad", this.beanExec);

    this._service.getNeedsPlanDocumentsCatalog(this.beanExec.ItemType).subscribe(
      (resp: any) => {
        console.log(resp);

        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeDocumentos = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaDeDocumentos);

        } else {
          this.message.showError("No se pudo listar los documentos", "");
        }
      }
    );
  }
  documentosLleandosAttach() {
    this._service.getNeedsPlanAttachedsCatalog(this.beanExec.IDNeedsPlan).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeCocumentosB = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showError("No se pudieron listar los documentos", "");
        }
      }
    );
  }
  confirmEliminar() {
    this._service.deleteNeedsPlanAttached(this.BeanDocument).subscribe(
      (resp: any) => {
        this.documentosLleandosAttach();
        this.message.showInfo("Se elimino el registro", "");
        document.getElementById('btnCerrarElim').click();
      }
    );
  }
  initBeanNeedsPlanAttach() {
    this.beanNeedsPlanAttach = {
      IDNeedsPlanAttached: null,
      IDNeedsPlan: '',
      IDBudgetExecution: null,
      IDNeedsPlanDocument: '',
      IsValid: '',
      Media: '',
      MediaContext: '',
      Name: ''
    }
  }
  // public cargarFile(files: FileList) {

  //   this._fileService.postFile(files[0]).subscribe(

  //     (resp: any) => {
  //       console.log(resp);
  //       if (resp.nombreFile) {
  //         this.beanNeedsPlanAttach.MediaContext = resp.Context;
  //         this.beanNeedsPlanAttach.Media = resp.Media;
  //         this.beanNeedsPlanAttach.IDNeedsPlan = this.beanExec.IDNeedsPlan;
  //         this.nombreArchivo = resp.Media;
  //         this.actualizarAttech();
  //       }
  //       else {
  //         this.message.showWarning("Archivo no pudo ser cargado", "Archivo");
  //         this.nombreArchivo = "";
  //       }
  //     },
  //     error => {
  //       this.message.showWarning(JSON.stringify(error), "Archivo");
  //       console.log(<any>error);
  //     }

  //   );

  // }
  actualizarAttech() {
    console.log(this.beanNeedsPlanAttach);

    this._service.updateNeedsPlanAttached(this.beanNeedsPlanAttach).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentosLleandosAttach();
          document.getElementById('btnCloseCM').click();
          this.message.showSuccess("Se cargo el archivo", "");
        } else {
          this.message.showError("No se pudo cargar el archivo", "");
        }
      }
    );
  }
  abrirEliminarDocumeto(beanDocumento) {
    this.BeanDocument = beanDocumento;
    console.log(this.BeanDocument);
  }
  openType(id, template: TemplateRef<any>) {
    this.idAgreeModal = id;
    this.modalRef = this.modalService.show(template, this.config3);
  }
}
