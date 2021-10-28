import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-tipo-documento-soporte',
  templateUrl: './tipo-documento-soporte.component.html',
  styleUrls: ['./tipo-documento-soporte.component.css']
})
export class TipoDocumentoSoporteComponent implements OnInit {

  public modalRef: BsModalRef;
  idDelete: number;
  listDocument: any[];
  listAttachment: any[];
  pageActual: number = 1;

  // Modal
  titleBS: string;
  titleMS: string;
  idDocument: number;
  opcionName: any;
  opcionDescripcion: any;
  spinner: boolean;

  constructor(private documentService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner = true;
    this.documentService.getListDocumentAgreement().subscribe((resp: any) => {
      console.log(resp);
      this.spinner = false;

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
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, this.config2);
  }

  cerrar() {
    this.modalService.hide();
  }

  sendDocument() {
    if (this.titleBS === 'Crear') {
      this.documentService.postDocumentoAgreement(
        this.getValidateInput(this.opcionName),
        this.getValidateInput(this.opcionDescripcion)
      ).subscribe((respPost: any) => {
        console.log(respPost);
        this.loadData();
        this.message.showSuccess('El tipo documento se ha guardado correctamente', 'Tipo Documento');
        this.cerrar();
      });
    }
    if (this.titleBS === 'Editar') {
      this.documentService.putDocumentoAgreement(
        this.idDocument,
        this.getValidateInput(this.opcionName),
        this.getValidateInput(this.opcionDescripcion)
      ).subscribe((respPut: any) => {
        console.log(respPut);
        this.loadData();
        this.message.showSuccess('El tipo documento se ha editado correctamente', 'Tipo Documento');
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
      this.titleMS = 'Crear Tipo Documento';
    }
    if (state === 'Editar') {
      this.idDocument = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Tipo Documento';
      this.documentService.getIdDocumentAgreement(id).subscribe((resp: any) => {
        console.log(resp);
        this.opcionName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.opcionDescripcion = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
      });
    }
  }

  cleanDocument() {
    this.opcionName = '';
    this.opcionDescripcion = '';
  }

  deleteDocument() {
    this.documentService.deleteDocumentAgreement(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('El tipo documento se ha eliminado correctamente', 'Tipo Documento');
      this.cerrar();
    });
  }

}
