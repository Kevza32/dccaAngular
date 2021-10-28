import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-input-document',
  templateUrl: './input-document.component.html',
  styleUrls: ['./input-document.component.css']
})
export class InputDocumentComponent implements OnInit {

  public modalRef: BsModalRef;
  listModel: any[];
  opcionModel: any;
  selectorModelo: string;
  idDelete: number;
  titleBS: string;
  titleMS: string;
  idDocument: number;
  filterPost = '';
  pageActual: number = 1;
  listDocument: any[];
  selectorType: any;
  opcionType: any;
  areaFuncional: any;
  formEngine: any;
  tiempoValidez: any;
  tiempoDefecto: any;
  opcionDescripcion: any;
  opcionName: any;
  listType = ['Documento/Anexo', 'Forma'];

  // Modal Unit
  nameUNit: string;
  spinner: boolean;

  constructor(private documentService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  getUnit(id: number) {
    console.log(id);
    this.areaFuncional = id;
  }

  getNameUnit(name: string) {
    console.log(name);
    this.nameUNit = name;
  }

  loadData() {
    /* this.documentService.getListModel().subscribe((resp: any) => {
      this.listModel = resp.DataBeanProperties.ObjectValue;
    }); */
    this.documentService.getListSector().subscribe((resp: any) => {
      console.log(resp);
      this.listModel = resp.DataBeanProperties.ObjectValue;
    });
  }

  capturarModel() {
    this.listDocument = [];
    this.spinner = true;
    console.log(this.opcionModel);
    this.documentService.getListDocument(this.opcionModel, 0).subscribe((resp: any) => {
      console.log(resp);
      this.spinner = false;
      this.listDocument = resp.DataBeanProperties.ObjectValue;
      for (let index = 0; index < this.listDocument.length; index++) {
        resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myType =
          /* console.log(this.listType[]); */
          /* console.log(this.reversValidateType()); */
          this.listType[this.reversValidateType(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.DocumentType)];
      }
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
      console.log(
        this.opcionModel,
        this.getValidateInput(this.opcionName),
        this.getValidateInput(this.opcionDescripcion),
        this.getValidateInput(this.areaFuncional),
        this.getValidateInput(this.tiempoValidez),
        this.validateType(this.opcionType),
        this.getValidateInput(this.formEngine),
        this.getValidateInput(this.tiempoDefecto)
      );
      this.documentService.postDocumento(
        this.opcionModel,
        this.getValidateInput(this.opcionName),
        this.getValidateInput(this.opcionDescripcion),
        this.getValidateInput(this.areaFuncional),
        this.getValidateInput(this.tiempoValidez),
        this.validateType(this.opcionType),
        this.getValidateInput(this.formEngine),
        this.getValidateInput(this.tiempoDefecto)
      ).subscribe((respPost: any) => {
        console.log(respPost);
        this.capturarModel()
        this.message.showSuccess('El documento se ha guardado correctamente', 'Documento');
        this.cerrar();
      });
    }
    if (this.titleBS === 'Editar') {
      this.documentService.putDocument(
        this.idDocument,
        this.opcionModel,
        this.getValidateInput(this.opcionName),
        this.getValidateInput(this.opcionDescripcion),
        this.getValidateInput(this.areaFuncional),
        this.getValidateInput(this.tiempoValidez),
        this.validateType(this.opcionType),
        this.getValidateInput(this.formEngine),
        this.getValidateInput(this.tiempoDefecto)
      ).subscribe((respPut: any) => {
        console.log(respPut);
        this.capturarModel()
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

  validateType(data) {
    /* listType = ['Documento/Anexo', 'Forma']; */
    switch (data) {
      case 'Documento/Anexo':
        return 2;
      case 'Forma':
        return 3;
      case undefined:
        return null;
      default:
        break;
    }
  }

  reversValidateType(data) {
    /* listType = ['Documento/Anexo', 'Forma']; */
    switch (data) {
      case 2:
        return 0;
      case 3:
        return 1;
      case undefined:
        return null;
      default:
        break;
    }
  }

  modifyDocument(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Documento';
    }
    if (state === 'Editar') {
      this.nameUNit = '';
      this.idDocument = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Documento';
      this.documentService.getIdDocument(id).subscribe((resp: any) => {
        console.log(resp);
        this.opcionName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.opcionDescripcion = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
        this.areaFuncional = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLnFunctionalID;
        this.tiempoValidez = resp.DataBeanProperties.ObjectValue.DataBeanProperties.ValidityType;
        this.opcionType = this.listType[this.reversValidateType(resp.DataBeanProperties.ObjectValue.DataBeanProperties.DocumentType)];
        this.selectorType = this.listType[this.reversValidateType(resp.DataBeanProperties.ObjectValue.DataBeanProperties.DocumentType)];
        this.formEngine = resp.DataBeanProperties.ObjectValue.DataBeanProperties.FormatFile;
        this.tiempoDefecto = resp.DataBeanProperties.ObjectValue.DataBeanProperties.DefeatTime;
        this.documentService.getIdTreeUnit(this.areaFuncional).subscribe((respUnit: any) => {
          console.log(respUnit);
          if (respUnit.DataBeanProperties.hasOwnProperty('ObjectValue')) {
            this.nameUNit = respUnit.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
          }
        });
      });
    }
  }

  capturarType() {

  }

  cleanDocument() {
    this.opcionName = '';
    this.opcionDescripcion = '';
    this.areaFuncional = '';
    this.tiempoValidez = '';
    this.opcionType = '';
    this.formEngine = '';
    this.tiempoDefecto = '';
    this.nameUNit = '';
  }

  validateSelector() {
    if (this.getValidateInput(this.opcionModel) === null) {
      this.modalService.hide();
      this.message.showError('Debe seleccionar un Modelo de Proceso de Negocios', 'Error');
    }
  }

  deleteDocument() {
    this.documentService.deleteDocument(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('El documento se ha eliminado correctamente', 'Documento');
      this.cerrar();
    });
  }

}
