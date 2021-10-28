import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-documentos-rechazados',
  templateUrl: './documentos-rechazados.component.html',
  styleUrls: ['./documentos-rechazados.component.css']
})

export class DocumentosRechazadosComponent implements OnInit {
  listaDocumentosRechazados: any;
  sesion: any;
  spinner: boolean;
  beanProcedureActionIMP: any;
  documentosRechazadosLista: any;
  estadoDoc = [];
  modalRef: BsModalRef;
  beanProcedureAction: any;
  beanAgrement: any;
  listAnios = [];
  fecha = new Date();
  anio: number;
  observaciones: any;
  beanAction: any;
  nombreArchivo: any;
  listaAnexos: any;
  txtNombre: any;
  anexoMediaContext: any;
  anexoMedia: any;
  modalRef2: any;
  txtDescripcion: string;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };

  constructor(private _service: DicoService, private _message: MessageService, private _modalService: BsModalService, private _fileService: FileService) { }

  ngOnInit(): void {
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    this.estadoDoc[0] = "Pendiente por subir";
    this.estadoDoc[1] = "En verificacion";
    this.estadoDoc[2] = "Devuelto";
    this.estadoDoc[3] = "verificado";
    this.anio = this.fecha.getFullYear();
    this.initAnios();

    this.documentosRechazados();

  }

  documentosRechazados() {
    this.spinner = true;
    this._service.getProcedureImpRejectedForInput(this.sesion.DataBeanProperties.IDAccount).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDocumentosRechazados = resp.DataBeanProperties.ObjectValue;
          } else {
            this._message.showWarning("No tiene documentos rechazados", "");
            this.listaDocumentosRechazados = [];
          }
          this.spinner = false;
        } else {
          this._message.showError("No se pudo listar los documentos rechazados", "");

        }
      }, erro => console.error(erro)
    )
  }
  abrirTabla(bean) {
    this.beanProcedureActionIMP = bean;
    console.log(this.beanProcedureActionIMP);
    this.listarDocumentos();
  }
  listarDocumentos() {
    this._service.getProcedureActionRejected(this.sesion.DataBeanProperties.IDAccount, this.beanProcedureActionIMP.IDProcedureImp).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.documentosRechazadosLista = resp.DataBeanProperties.ObjectValue;
            console.log(this.documentosRechazadosLista);
          } else {
            this._message.showWarning("No tiene documentos", "");
            this.documentosRechazadosLista = [];
            this.documentosRechazados();
          }

        } else {
          this._message.showError("No se pudo listar los documentos", "");

        }
      }, err => console.error(err)
    );
  }
  abrirModal(template: TemplateRef<any>, bean) {
    // this.modalRef = this._modalService.show(template, { class: 'modal-xl' });
    this.beanProcedureAction = bean;
    this.obtenerAgreement(template)
    console.log(this.beanProcedureAction);
  }
  obtenerAgreement(template) {
    console.log("entro", this.beanProcedureActionIMP.IDProcedureImp);

    if (this.beanProcedureActionIMP.IDProcedureImp) {
      this._service.getAgreementByProcedureImp(this.beanProcedureActionIMP.IDProcedureImp).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this.beanAgrement = resp.DataBeanProperties.ObjectValue;
            console.log(this.beanAgrement);
            this.modalRef = this._modalService.show(template, { class: 'modal-xl' });

          } else {
            this._message.showError("No se pudo obtener Agreement", "")
          }
        }
      );
    }
  }
  cerrarModal() {
    this.modalRef.hide();
  }
  obtenerFecha(fecha) {
    if (fecha == null) {
      return '00-00-00'
    } else {
      return fecha.slice(0, 10);
    }
  }
  initAnios() {
    for (let index = 2015; index < this.anio + 5; index++) {
      this.listAnios.push(index)
    }
  }
  abrirReenviar(bean, template) {
    this.beanProcedureAction = bean;
    this.beanProcedureAction.Media = null;
    this.beanProcedureAction.MediaContext = null;
    this.modalRef = this._modalService.show(template, { class: 'modal-lg' });
    this.listarAnexos();
  }
  reenviar() {
    // console.log(bean);
    this._service.reprocessProcedureAction(this.beanProcedureAction.IDAction, this.beanProcedureAction.Media, this.beanProcedureAction.MediaContext, this.observaciones).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._message.showSuccess("Se reenvio el documento", "");
        this.modalRef.hide();
        this.listarDocumentos();
        // this.documentosRechazados();
      } else {
        this._message.showError("No se pudo reenviar el documento", "");

      }
    }
    )
  }
  abrirSubirArchivo(template: TemplateRef<any>, bean) {
    this.modalRef = this._modalService.show(template, { class: 'modal-sm' });
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);

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
        }
        else {
          this._message.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
        }
      },
      error => {
        this._message.showWarning(JSON.stringify(error), "Archivo");
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
        this._message.showError("No se pudieron listar los anexos", "");
      }
    })
  }
  abrirAnexo(template: TemplateRef<any>) {
    this.modalRef2 = this._modalService.show(template, this.config);
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
          this._message.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
        }
      },
      error => {
        this._message.showWarning(JSON.stringify(error), "Archivo");
        console.log(<any>error);
      }
    );
  }
  eliminarAnexo(id) {
    console.log(id);

    this._service.deleteAttachedDocument(id).subscribe((resp: any) => {
      if (resp) {
        this._message.showInfo("Se elimino el anexo", "");
        this.listarAnexos();
      } else {
        this._message.showError("No se pudo eliminar el anexo", "");
      }
    })
  }
  anadirAnexo() {
    console.log(this.beanProcedureAction.IDAction, this.txtNombre, this.anexoMedia, this.anexoMediaContext, this.txtDescripcion);
    this._service.addAttachmentToProcedureAction(this.beanProcedureAction.IDAction, this.txtNombre, this.anexoMedia, this.anexoMediaContext, this.txtDescripcion).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._message.showSuccess("Se guardo el anexo", "");
        this.modalRef2.hide();
        this.listarAnexos();
        this.txtNombre = "";
        this.anexoMedia = "";
        this.anexoMediaContext = "";
        this.txtDescripcion = "";
      } else {
        this._message.showError("No se pudo guardar el anexo", "");
      }
    })
  }
}

