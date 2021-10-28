import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';
import { QuickturnService } from 'src/app/providers/quickturn.service';

@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css']
})
export class ProcedimientosComponent implements OnInit {

  cbxBussinessProccess: any;
  listaProcesosNegocio: any;
  listaDeProcedimientos: any;
  filterPost = '';
  pageActual: number = 1;
  tipoDoc = [];
  public modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };
  beanProcedimiento: any;
  listaDocumentos: any;
  mensaje: string;
  beanDocument: any;
  opcionBusinessClass = null;

  nameUNit: string;

  listaEstados = [];
  listaEstadosProcesos = [];
  spinner: boolean;
  uncheckableRadioModel: string;
  listaCategorias: any[];
  constructor(private _service: DicoService,
    private _service2: Dicco2Service,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _fileService: FileService) { }

  ngOnInit(): void {
    this.loadCategoria();
    this.tipoDoc[2] = "Archivo";
    this.tipoDoc[3] = "Formulario";
  }

  initBean() {
    this.beanProcedimiento = {
      IDProcedure: null,
      Name: '',
      Description: '',
      ProcedureRow: null,
      IDLnFunctionalID: 0,
      IDBusinessProcess: '',
      IDProcedureState: '',
      IDBusinessState: '',
      IsConditional: null,
      TrueIDLnPath: null,
      FalseIDLnPath: null

    }
  }
  initBeanDocument() {
    this.beanDocument = {
      IDDocument: null,
      Name: '',
      Description: '',
      ValidityType: 0,
      DefeatTime: 0,
      DocumentType: null,
      IDLnFunctionalID: null,
      FormURLComponent: '',
      FormEngine: '',
      Type: 0,
      IDProcedure: 0,

    }
  }


  getUnit(id: number) {
    console.log(id);
    this.beanDocument.IDLnFunctionalID = id;
    this.beanProcedimiento.IDLnFunctionalID = id;
    /* this.areaFuncional = id; */
  }

  loadCategoria() {
    this.listaCategorias = [];
    this._service.getBusinessClassCatalogNull().subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaCategorias = resp.DataBeanProperties.ObjectValue;
        console.log(this.listaCategorias);
      } else {
        this._messagge.showError('No se pudo listar las categorias', "");
      }

    })
  }

  getNameUnit(name: string) {
    console.log(name);
    this.nameUNit = name;
  }

  abirCrear(template: TemplateRef<any>) {
    this.initBean();
    this.beanProcedimiento.IDBusinessProcess = this.cbxBussinessProccess;
    this.modalRef = this._modalService.show(template, this.config);
  }
  abrirEdit(template: TemplateRef<any>, bean) {
    this.initBean();
    this.beanProcedimiento = bean;
    this.beanProcedimiento.IsConditional ? this.beanProcedimiento.IsConditional = bean.IsConditional.toString() : this.beanProcedimiento.IsConditional = 'false';
    console.log(bean);
    console.log(this.beanProcedimiento);
    this.nameUNit = bean.FunctionalIDName;
    this.modalRef = this._modalService.show(template, this.config);
  }
  abrirEliminar(template: TemplateRef<any>, bean) {
    this.initBean();
    this.beanProcedimiento.IDProcedure = bean.IDProcedure;
    this.modalRef = this._modalService.show(template, { class: 'modal-sm' });
  }
  abirEditarDocumento(bean) {
    this.beanDocument = bean;



    this.nameUNit = bean.FunctionalIDName;
  }

  buscarUni() {
    document.getElementById('btnModalUnidad').click();
  }

  listarProcesosNegocio() {
    this._service2.getListModel(this.opcionBusinessClass).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaProcesosNegocio = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaProcesosNegocio);

        } else {
          this._messagge.showError("No se pudo listar los procesos de negocio", "");
        }
      }
    );
  }
  listarProcedimientos() {
    this.spinner = true;
    this.listaDeProcedimientos = [];
    this._service.getProcedimiento(this.cbxBussinessProccess).subscribe(
      (resp: any) => {
        console.log(resp);
        this.spinner = false;
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDeProcedimientos = resp.DataBeanProperties.ObjectValue;
          } else {
            this._messagge.showWarning("No hay procedimientos", "");
          }

        } else {
          this._messagge.showError("No se pudo listar la lista de procedimientos", "");
        }
      }
    );
    this._service.getProcedureStateCatalog(this.cbxBussinessProccess).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaEstados = resp.DataBeanProperties.ObjectValue;
        } else {
          this.listaEstados = [];
          this._messagge.showError("No se pudo consultar los estados del procedimiento", "");
        }
      }
    );
    /* Selectr Estados de Proceso */
    this._service2.getListBusinessStatement(this.cbxBussinessProccess).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaEstadosProcesos = resp.DataBeanProperties.ObjectValue;
        } else {
          this.listaEstadosProcesos = [];
          this._messagge.showError("No se pudo consultar los estados de procesos del procedimiento", "");
        }
      }
    );
  }

  validar() {
    console.log(this.beanProcedimiento);
    if (this.beanProcedimiento.Name == '') {
      return this._messagge.showError("Por favor llene el campo Nombre", "");
    }
    else if (this.beanProcedimiento.ProcedureRow == null || this.beanProcedimiento.ProcedureRow == undefined) {
      return this._messagge.showError("Por favor llene el campo fila ", "");
    }

    else {
      this.guardarPro();
    }
  }

  guardarPro() {
    console.log(this.beanProcedimiento);

    if (this.beanProcedimiento.IsConditional == null || this.beanProcedimiento.IsConditional == undefined || this.beanProcedimiento.IsConditional == 'false') {
      this.beanProcedimiento.IsConditional == null || this.beanProcedimiento.IsConditional == undefined ? this.beanProcedimiento.IsConditional = 'false' : '';

      this.beanProcedimiento.TrueIDLnPath = this.beanProcedimiento.TrueIDLnPath = '';
      this.beanProcedimiento.FalseIDLnPath = this.beanProcedimiento.FalseIDLnPath = '';

    }

    this._service.createProcedimiento(this.beanProcedimiento).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        if (this.beanProcedimiento.IDProcedure == null) {
          this._messagge.showSuccess("Se creó el procedimiento", "");
        } else {
          this._messagge.showSuccess("Se editó el procedimiento", "");
        }
        this.initBean();
        this.listarProcedimientos();
        this.modalRef.hide();
      } else {
        if (this.beanProcedimiento.IDProcedure == null) {
          this._messagge.showError("No se puede crear el procedimiento", "");
        } else {
          this._messagge.showError("No se puede editar el procedimiento", "");
        }
      }
    });
    console.log(this.beanProcedimiento);
  }

  eliminarPro() {
    this._service.deleteProcedimiento(this.beanProcedimiento.IDProcedure).subscribe(
      (resp: any) => {
        if (resp) {
          this._messagge.showInfo("Se elimino", "");
          this.listarProcedimientos();
          this.modalRef.hide();
        } else {
          this._messagge.showError("No se pudo eliminar", "");
        }
      }
    );
  }

  abrirModalAF() {
    document.getElementById('btnModalUnidad').click();
  }

  document(funcion, bean) {
    this.beanProcedimiento = bean;
    this.initBeanDocument();
    this.beanDocument.IDLnFunctionalID = bean.IDLnFunctionalID;
    this.beanDocument.Type = funcion;
    this.beanDocument.IDProcedure = bean.IDProcedure;
    funcion == 0 ? this.mensaje = "Acciones de Areas de Atención" : this.mensaje = "Requisitos a Usuario del Trámite";
    this._service.procedureDocument(bean.IDProcedure, funcion).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDocumentos = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaDocumentos);
        }
        else {
          this._messagge.showError("No se pudo consultar los documentos", "");
        }
      }
    );
  }

  validarDocumento() {
    if (this.beanDocument.Name == '') {
      return this._messagge.showError("Por favor llene el campo Nombre", "");
    }

    else if (this.beanDocument.DocumentType == null || this.beanDocument.DocumentType == undefined) {
      return this._messagge.showError("Por favor llene el campo Tipo de documento", "");
    }
    else if (this.beanDocument.IDLnFunctionalID == null || this.beanDocument.IDLnFunctionalID == undefined) {
      return this._messagge.showError("Por favor llene el campo Area funcional", "");
    } else {
      this.guardarDocumento();
    }
  }
  guardarDocumento() {
    this._service.createDocument(this.beanDocument).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (this.beanDocument.IDDocument == null) {
            this._messagge.showSuccess("Se creó el documento", "");
          } else {
            this._messagge.showSuccess("Se editó el documento", "");
          }
          document.getElementById('btnCerrarDoc').click();
          this.document(this.beanDocument.Type, this.beanProcedimiento);
        } else {
          if (this.beanDocument.IDDocument == null) {
            this._messagge.showError("No se creo el documento", "");
          }
          else {
            this._messagge.showError("No se edito el documento", "");
          }
        }
      }
    );
  }
  eliminarDocumento() {
    this._service.deleteDocument(this.beanDocument).subscribe(
      (resp: any) => {
        if (resp) {
          this._messagge.showInfo("Se elimino el documento", "");
          this.document(this.beanDocument.Type, this.beanProcedimiento);
          document.getElementById('btnCerrarDocEl').click();
        } else {
          this._messagge.showError("No se puede eliminar el documento", "");
        }
      }
    );
  }

  clear() {
    this.nameUNit = '';
  }

  getUrl(MediaContext, Media) {
    let url;
    if (MediaContext != null && Media != null) {
      url = this._fileService.getUrlFiles(MediaContext, Media);
    } else {
      url = "";
    }
    return url;
  }
}
