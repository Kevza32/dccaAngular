import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-documentos-x-responder',
  templateUrl: './documentos-x-responder.component.html',
  styleUrls: ['./documentos-x-responder.component.css']
})
export class DocumentosXResponderComponent implements OnInit {
  modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };
  config2 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl'
  };
  sesion: any;
  estadoDoc = [];
  listaDeDocuments: any;
  beanProcedureAction: any;
  documentosXresponder: any;
  beanProcedureActionIMP: any;
  txtDescripcionAp: any;
  nombreArchivo: any;
  beanAgrement: any;
  spinner: boolean;
  spinner2: boolean;
  listaAnexos: any;
  modalRef2: BsModalRef<Object>;
  anexoMediaContext: any;
  anexoMedia: any;
  txtDescripcion: any;
  txtNombre: any;
  cumRequisito: any = null;
  constructor(private _service: DicoService,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _fileService: FileService) { }

  ngOnInit(): void {
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    this.listarProcedimientoXresponder();
    this.estadoDoc[0] = "Pendiente por subir";
    this.estadoDoc[1] = "En verificacion";
    this.estadoDoc[2] = "Devuelto";
    this.estadoDoc[3] = "verificado";
  }
  listarProcedimientoXresponder() {
    this.spinner = true;
    this._service.getProcedureImpForResponse(this.sesion.DataBeanProperties.IDAccount).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDeDocuments = resp.DataBeanProperties.ObjectValue
            console.log(this.listaDeDocuments);

          } else {
            this._messagge.showWarning("No tiene documentos por responder", "");
            this.listaDeDocuments = [];
          }
          this.spinner = false;

        } else {
          this._messagge.showError("No se pudieron listar los documentos pendientes", "");
        }
      }
    );
  }
  abrirTabla(bean) {
    this.beanProcedureActionIMP = bean;
    this.listarDocumentosXresponder();
    // this.obtenerAgreement();
  }
  listarDocumentosXresponder() {
    this.spinner2 = true;
    this._service.getProcedureActionForResponse(this.sesion.DataBeanProperties.IDAccount, this.beanProcedureActionIMP.IDProcedureImp).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.documentosXresponder = resp.DataBeanProperties.ObjectValue
            console.log(this.documentosXresponder);
          } else {
            this._messagge.showWarning("No tiene documentos por responder", "");
            this.documentosXresponder = [];
            this.listarProcedimientoXresponder();
          }
          this.spinner2 = false;
        } else {
          this._messagge.showError("No se pudo consultar los documentos por responder", "")
        }
      }
    );
  }
  abrirSubirArchiv(template: TemplateRef<any>, bean) {
    this.modalRef = this._modalService.show(template, { class: 'modal-lg' });
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);
    this.listarAnexos();

  }
  abrirAnexo(template: TemplateRef<any>) {
    this.modalRef2 = this._modalService.show(template, this.config);
  }
  abrirModal(template: TemplateRef<any>, bean) {
    this.modalRef = this._modalService.show(template, this.config2);
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);

  }
  cerrarModal() {
    this.modalRef.hide();
    this.listarDocumentosXresponder();
  }
  public cargarFile(files: FileList) {

    this._fileService.postFile(files[0]).subscribe(

      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.beanProcedureAction.MediaContext = archivo.MediaContext;
          this.beanProcedureAction.Media = archivo.Media;
          this.beanProcedureAction.State = 0;
          this.beanProcedureAction.Observations = null;
          this.nombreArchivo = archivo.Media;
          this.actualizarProcedureAction();
        }
        else {
          this._messagge.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
        }
      },
      error => {
        this._messagge.showWarning(JSON.stringify(error), "Archivo");
        console.log(<any>error);
      }

    );

  }
  cargarAnexo(files: FileList) {
    this._fileService.postFile(files[0]).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.anexoMediaContext = archivo.MediaContext;
          this.anexoMedia = archivo.Media;
          this.nombreArchivo = archivo.Media;
          // this.actualizarProcedureAction();
          // this.modalRef.hide();
        }
        else {
          this._messagge.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
        }
      },
      error => {
        this._messagge.showWarning(JSON.stringify(error), "Archivo");
        console.log(<any>error);
      }
    );
  }


  actualizarProcedureAction() {
    this._service.addFileToProcedureAction(
      this.beanProcedureAction.IDAction,
      this.beanProcedureAction.Media,
      this.beanProcedureAction.MediaContext,
      this.beanProcedureAction.State,
      this.beanProcedureAction.Observations).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this._messagge.showSuccess("El archivo se guardo", "");
          } else {
            this._messagge.showError("El archivo no se guardo", "");
          }
        }
      );
  }
  getUrl(MediaContext, Media) {
    let url = this._fileService.getUrlFiles(MediaContext, Media);
    return url;
  }
  obtenerAgreement() {
    this._service.getAgreementByProcedureImp(this.beanProcedureActionIMP.IDProcedureImp).subscribe(
      (resp: any) => {
        console.log(resp);

        if (resp.DataBeanProperties.ObjectValue) {
          this.beanAgrement = resp.DataBeanProperties.ObjectValue.DataBeanProperties;
          console.log(this.beanAgrement);


        } else {
          this._messagge.showError("No se pudo obtener Agreement", "")
        }
      }
    );
  }
  aprobarDoc() {


    this._service.responseProcedureAction(this.beanProcedureAction.IDAction, this.txtDescripcionAp, this.cumRequisito).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se aprobo el documento", "");
          this.txtDescripcionAp = '';
          this.listarDocumentosXresponder()


          this.modalRef.hide();
        } else {
          this._messagge.showError("no se pudo aprobar", "");
        }
      }
    );
  }
  rechazarDoc() {
    this._service.declineResponseProcedureAction(this.beanProcedureAction.IDAction, this.txtDescripcionAp).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se rechazo el documento", "");
          // this.actualizarProcedureAction();
          this.listarDocumentosXresponder()

          this.modalRef.hide();


        } else {
          this._messagge.showError("No se pudo rechazar el documento", "");
        }
      }
    );
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
  anadirAnexo() {
    console.log(this.beanProcedureAction.IDAction, this.txtNombre, this.anexoMedia, this.anexoMediaContext, this.txtDescripcion);
    this._service.addAttachmentToProcedureAction(this.beanProcedureAction.IDAction, this.txtNombre, this.anexoMedia, this.anexoMediaContext, this.txtDescripcion).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se guardo el anexo", "");
        this.modalRef2.hide();
        this.listarAnexos();
        this.txtNombre = "";
        this.anexoMedia = "";
        this.anexoMediaContext = "";
        this.txtDescripcion = "";
      } else {
        this._messagge.showError("No se pudo guardar el anexo", "");
      }
    })
  }
  eliminarAnexo(id) {
    console.log(id);

    this._service.deleteAttachedDocument(id).subscribe((resp: any) => {
      if (resp) {
        this._messagge.showInfo("Se elimino el anexo", "");
        this.listarAnexos();
      } else {
        this._messagge.showError("No se pudo eliminar el anexo", "");
      }
    })
  }

}
