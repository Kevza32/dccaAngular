import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-tramites-x-verificar',
  templateUrl: './tramites-x-verificar.component.html',
  styleUrls: ['./tramites-x-verificar.component.css']
})
export class TramitesXVerificarComponent implements OnInit {
  modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };
  sesion: any;
  listaDeTramites: any;
  beanDocumentosaVericar: any;
  estadoDoc = [];
  beanProcedureAction: any;
  IDDocumento: number;
  txtDesc: any;
  beanAgrement: any;
  beanProcedureActionIMP: any;
  fecha = new Date();
  anio: number;
  listAnios = [];
  txtEmpresa: any;
  txtRepresentanteLE: any;
  txtPersonaCon: any;
  auxAccount: any;
  spinner: boolean;
  spinner2: boolean;
  listaAnexos: any;
  constructor(private _service: DicoService,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _fileService: FileService) { }

  ngOnInit(): void {
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    this.listarTramitesXVerificar();
    this.estadoDoc[0] = "Pendiente por subir";
    this.estadoDoc[1] = "En verificacion";
    this.estadoDoc[2] = "Devuelto";
    this.estadoDoc[3] = "verificado";
    this.anio = this.fecha.getFullYear();
    this.initAnios();
  }
  initAnios() {
    for (let index = 2015; index < this.anio + 5; index++) {
      this.listAnios.push(index)
    }
  }
  cerrarModal() {
    this.modalRef.hide();
    this.listarTramitesXVerificar();
  }

  listarTramitesXVerificar() {
    this.spinner = true;
    this._service.getProcedureImpForVerify(this.sesion.DataBeanProperties.IDAccount).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDeTramites = resp.DataBeanProperties.ObjectValue;
            console.log(this.listaDeTramites);
            this.spinner = false;

          } else {
            this._messagge.showWarning("No tiene tramites por verificar", "");
            this.listaDeTramites = [];
            this.spinner = false;

          }
        } else {
          this._messagge.showError("No se pudo consultar los tramites pendientes", "");
          this.spinner = false;

        }
      }
    );
  }
  abrirTabla(bean) {
    this.beanProcedureAction = bean;
    this.listarDocumentosXAprobar();
  }
  abrirModal(template: TemplateRef<any>, bean) {
    this.beanProcedureActionIMP = bean;
    console.log(this.beanProcedureActionIMP);

    this.obtenerAgreement(template);
  }
  listarDocumentosXAprobar() {
    this.spinner2 = true;

    this._service.getProcedureActionForVerify(this.sesion.DataBeanProperties.IDAccount, this.beanProcedureAction.IDProcedureImp).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.beanDocumentosaVericar = resp.DataBeanProperties.ObjectValue;
            console.log(this.beanDocumentosaVericar);

          } else {
            this._messagge.showWarning("No tiene documentos por verificar", "");
            this.beanDocumentosaVericar = [];
            this.listarTramitesXVerificar();

          }
          this.spinner2 = false;

        } else {
          this._messagge.showError("No se pudo consultar los documentos por verificar", "");
          this.beanDocumentosaVericar = [];
        }
      }
    );
  }
  aprobarDocumento(bean) {
    this._service.verifyProcedureAction(bean.IDAction, "Aprobado!!").subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarDocumentosXAprobar();
          this._messagge.showSuccess("Se aprobo el documento", "");
        } else {
          this._messagge.showError("No se pudo aprobar el documento", "");
        }
      }
    );
  }
  abrirRechazar(bean, template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
    this.IDDocumento = bean.IDAction;
  }
  rechazarDocumento() {
    this._service.declineProcedureAction(this.IDDocumento, this.txtDesc).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showInfo("Se rechazó el documento", "");
          this.listarDocumentosXAprobar();
          this.txtDesc = '';
          this.modalRef.hide();
        } else {
          this._messagge.showError("No se pudo rechazar el documento", "");
        }
      }
    );
  }

  getUrl(MediaContext, Media) {
    let url = this._fileService.getUrlFiles(MediaContext, Media);
    return url;
  }
  obtenerAgreement(template) {
    if (this.beanProcedureAction.IDProcedureImp) {
      this._service.getAgreementByProcedureImp(this.beanProcedureAction.IDProcedureImp).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this.beanAgrement = resp.DataBeanProperties.ObjectValue;
            console.log(this.beanAgrement);
            this.modalRef = this._modalService.show(template, this.config);

          } else {
            this._messagge.showError("No se pudo obtener Agreement", "")
          }
        }
      );
    }
  }
  // obtenerEmpleado(id) {
  //   this._service.getAccountByNit(id).subscribe(
  //     (resp: any) => {
  //       if (resp.DataBeanProperties.ObjectValue) {
  //         return `${resp.DataBeanProperties.ObjectValue.Name1} ${resp.DataBeanProperties.ObjectValue.Name2} ${resp.DataBeanProperties.ObjectValue.Surname1} ${resp.DataBeanProperties.ObjectValue.Surname2} `
  //       } else {
  //         return "no tiene nombre";
  //       }
  //     }
  //   );
  // }
  abrirSubirArchivo(template: TemplateRef<any>, bean) {
    this.modalRef = this._modalService.show(template, { class: 'modal-lg' });
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);
    this.listarAnexos();
  }
  obtenerFecha(fecha) {
    if (fecha == null) {
      return '00-00-00'
    } else {
      return fecha.slice(0, 10);
    }
  }
  listarAnexos() {
    this._service.getAttachedDocumentCatalog(this.beanProcedureAction.IDAction).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaAnexos = resp.DataBeanProperties.ObjectValue;
      } else {
        this._messagge.showError("No se pudieron listar los anexos", "");
      }
    })
  }
}
