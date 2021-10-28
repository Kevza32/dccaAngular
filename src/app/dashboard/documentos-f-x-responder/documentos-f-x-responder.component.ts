import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-documentos-f-x-responder',
  templateUrl: './documentos-f-x-responder.component.html',
  styleUrls: ['./documentos-f-x-responder.component.css']
})
export class DocumentosFXResponderComponent implements OnInit {
  sesion: any;
  estadoDoc = [];
  beanProcedureActionIMP: any;
  beanProcedureAction: any;
  nombreArchivo: any;
  listaProcedimientos = [];
  documentosSalida = [];

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };
  documentosS = [];
  beanAgrement: any;

  listaAnexos: any;
  modalRef2: BsModalRef<Object>;
  anexoMediaContext: any;
  anexoMedia: any;
  txtNombre: string;
  txtDescripcion: string;
  txtDescripcionAp: string;
  cumRequisito: any = null;
  constructor(private _service: DicoService,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _fileService: FileService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    this.listarProcedimientosEntrada();
    this.estadoDoc[0] = "Pendiente por subir";
    this.estadoDoc[1] = "En verificacion";
    this.estadoDoc[2] = "Devuelto";
    this.estadoDoc[3] = "verificado";
  }
  listarProcedimientosEntrada() {
    this.spinner.show('spinnerTabla');
    this._service.getProcedureImpForInput(this.sesion.DataBeanProperties.IDAccount).subscribe(
      (resp: any) => {
        this.spinner.hide('spinnerTabla');
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaProcedimientos = resp.DataBeanProperties.ObjectValue
          } else {
            this._messagge.showWarning("No tiene procedimientos de salida", "");
            this.listaProcedimientos = [];
          }


        } else {
          this._messagge.showError("No se pudo listar los procedimientos", "");
        }
      }
    );
  }
  abrirTabla(bean) {
    this.beanProcedureActionIMP = bean;
    console.log(this.beanProcedureActionIMP);
    this.listarDocumentosSalida();
    // this.obtenerAgreement();

  }
  cerrarModal() {
    this.modalRef.hide();
    this.listarDocumentosSalida();
  }
  listarDocumentosSalida() {
    this.documentosS = [];
    this.spinner.show('spinnerTabla2');
    this._service.getProcedureActionByAccount(this.sesion.DataBeanProperties.IDAccount, this.beanProcedureActionIMP.IDProcedureImp, 0).subscribe(
      (resp: any) => {
        this.spinner.hide('spinnerTabla2');

        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.documentosS = resp.DataBeanProperties.ObjectValue;
            console.log("Documentos s", this.documentosS);

          } else {
            this._messagge.showWarning("No tiene documentos", "");
            this.documentosS = [];
            this.listarProcedimientosEntrada();
          }
        } else {
          this._messagge.showError("No se pudo consultar", "");
        }
      }
    );
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
  abrirModal(template: TemplateRef<any>, bean) {
    this.modalRef = this._modalService.show(template, { class: 'modal-xl' });
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);
  }
  abrirAnexo(template: TemplateRef<any>) {
    this.modalRef2 = this._modalService.show(template, this.config);
  }
  abrirSubirArchivo(template: TemplateRef<any>, bean) {
    this.modalRef = this._modalService.show(template, { class: 'modal-lg' });
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);
    this.listarAnexos();
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
          this.nombreArchivo = resp.MediaContext;
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
  getUrl(MediaContext, Media) {
    let url = this._fileService.getUrlFiles(MediaContext, Media);
    return url;
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
  aprobarDoc() {

    this._service.responseProcedureAction(this.beanProcedureAction.IDAction, this.txtDescripcionAp, this.cumRequisito).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se aprobo el documento", "");
          this.txtDescripcionAp = '';
          // this.listarDocumentosXresponder()
          this.listarDocumentosSalida();


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
          this.txtDescripcionAp = '';

          this.listarDocumentosSalida();
          // this.listarDocumentosXresponder()

          this.modalRef.hide();


        } else {
          this._messagge.showError("No se pudo rechazar el documento", "");
        }
      }
    );
  }
}
