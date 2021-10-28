import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-tipo-documento-modal',
  templateUrl: './tipo-documento-modal.component.html',
  styleUrls: ['./tipo-documento-modal.component.css']
})
export class TipoDocumentoModalComponent implements OnInit {

  @Input() idAgreement: number;
  opcionEtapa: any;
  Descripcion: string;
  public modalRef2: BsModalRef;
  idDelete: number;
  listDocument: any[];
  listAttachment: any[];
  pageActual: number = 1;

  // Modal
  titleBS: string;
  titleMS: string;
  idDocument: number;
  opcionType: any;
  opcionName: any;
  opcionDescripcion: any;
  selectorType: string;

  // FIle
  nombreArchivo = "";
  ruta = "";
  media: string;
  context: string;
  mostrarDocumento = false;
  nombreArchivo2;
  viewBoton = false;
  listaEtapas: any;

  constructor(private documentService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService,
    private _files: FileService) { }

  ngOnInit(): void {
    console.log(this.idAgreement);
    this.loadData();
    this.laodSelelctor();
    this.loadEtapas();
  }

  public cargarFile(files: FileList) {
    this.mostrarDocumento = false;
    this._files.postFile(files[0]).subscribe(
      (resp: any) => {

        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.context = archivo.MediaContext;
          this.nombreArchivo = archivo.Media;
          this.ruta = archivo.URL;
          this.message.showSuccess("Archivo almacenado", "Archivo");
        }
        else {
          this.message.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
          this.ruta = "";
        }
      },
      error => {
        this.message.showWarning(JSON.stringify(error), "Archivo");
        console.log(<any>error);
      }

    );
  }

  validateType() {
    this.viewBoton = true;
  }

  loadData() {
    console.log(this.idAgreement);
    this.documentService.getListAgreementAttachment(this.idAgreement).subscribe((resp: any) => {
      console.log(resp);
      this.listAttachment = resp.DataBeanProperties.ObjectValue;
      for (let index = 0; index < this.listAttachment.length; index++) {
        if (resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext !== null) {
          resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myLink =
            this._files.getUrlFiles(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext,
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Media);
        }
      }
    });
  }

  laodSelelctor() {
    this.documentService.getListDocumentAgreement().subscribe((resp: any) => {
      console.log(resp);
      this.listDocument = resp.DataBeanProperties.ObjectValue;
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

  openDocument(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, this.config);
  }

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef2 = this.modalService.show(template, this.config2);
  }

  cerrar() {
    this.modalRef2.hide();
  }

  sendDocument() {
    if (this.titleBS === 'Crear') {
      this.documentService.postAgreementAttached(
        this.nombreArchivo,
        this.context,
        this.idAgreement,
        this.opcionType,
        this.Descripcion,
        this.opcionEtapa
      ).subscribe((respPost: any) => {
        console.log(respPost);
        this.loadData();
        this.message.showSuccess('El documento se ha guardado correctamente', 'Documento');
        this.cerrar();
      });
    }
    if (this.titleBS === 'Editar') {
      this.documentService.putAgreementAttached(
        this.idDocument,
        this.nombreArchivo,
        this.context,
        this.idAgreement,
        this.opcionType,
        this.Descripcion,
        this.opcionEtapa
      ).subscribe((respPut: any) => {
        console.log(respPut);
        this.loadData();
        this.message.showSuccess('El documento se ha editado correctamente', 'Documento');
        this.cerrar();
      });
    }
  }

  getValidateInput(data) {
    if (data === '') {
      return null;
    }
    if (data === undefined) {
      return null;
    }
    return data;
  }

  modifyDocument(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Documento';
    }
    if (state === 'Editar') {
      this.idDocument = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Documento';
      this.documentService.getIdAgreementAttached(id).subscribe((resp: any) => {
        console.log(resp);
        this.ruta = '';
        this.nombreArchivo = '';
        this.nombreArchivo2 = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Media;
        this.nombreArchivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Media;
        this.context = resp.DataBeanProperties.ObjectValue.DataBeanProperties.MediaContext;
        this.mostrarDocumento = true;
      });
    }
  }

  cleanDocument() {
    this.opcionName = '';
    this.opcionDescripcion = '';
    this.nombreArchivo = '';
    this.nombreArchivo2 = '';
    this.context = '';
  }

  deleteDocument() {
    this.documentService.deleteAgreementAttachment(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('El documento se ha eliminado correctamente', 'Documento');
      this.cerrar();
    });
  }
  loadEtapas = (): void => {
    this.documentService.getListBusinessStatement(1).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaEtapas = resp.DataBeanProperties.ObjectValue
      }
    })
  }
}
