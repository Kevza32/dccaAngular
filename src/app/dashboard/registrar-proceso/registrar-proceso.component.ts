import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-registrar-proceso',
  templateUrl: './registrar-proceso.component.html',
  styleUrls: ['./registrar-proceso.component.css']
})
export class RegistrarProcesoComponent implements OnInit {
  cbxBussinessProccess: number;
  txtDescripcionProccess: string;
  modalRef: BsModalRef;
  txtNombre: string;
  txtDescripcion: string;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };
  estadoDoc = [];
  listaProcesosNegocio: any;
  sesion: any;
  vistaT: boolean;
  listaDeDocumentos: any;
  ruta: any;
  nombreArchivo: any;
  beanProcedureAction: any;
  IDAction: any;
  IDProcedureImp: any;
  IDStage: any;
  IDAccount: any;
  beanDocumentosaLlenar: any;
  esImagen: number;
  llamadoArchivo: any;
  isValid: boolean = true;
  isRadicado: any = false;
  spinner2: boolean;
  anexoMediaContext: any;
  anexoMedia: any;
  modalRef2: BsModalRef<Object>;
  listaAnexos: any[];
  txtEmpresa: string;
  constructor(private _service: DicoService,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _fileService: FileService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.listarProcesosNegocio();
    console.log(this.sesion);
    this.estadoDoc[0] = "Pendiente por subir";
    this.estadoDoc[1] = "En verificacion";
    this.estadoDoc[2] = "Devuelto";
    this.estadoDoc[3] = "verificado";
  }
  listarProcesosNegocio() {
    this._service.getListModel().subscribe(
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
  validarCreateBussinesP() {
    if (this.cbxBussinessProccess == null || this.cbxBussinessProccess == undefined) {
      this._messagge.showError("Por favor seleccione un proceso disponible", "");
    }
    else if (this.IDAccount == '' || this.IDAccount == null || this.IDAccount == undefined) {
      this._messagge.showError("Por favor seleccione un tercero", "");
    }
    else if (this.txtDescripcionProccess == '' || this.txtDescripcionProccess == null || this.txtDescripcionProccess == undefined) {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this.crearProcess();
    }
  }
  crearProcess() {
    this.spinner.show('spinnerPrincipal');
    this._service.createBusinessProcess(this.cbxBussinessProccess, this.IDAccount, this.txtDescripcionProccess).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se creo correctamente", "");
        console.log(resp.DataBeanProperties.ObjectValue);
        // this.IDAccount = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDAccount;
        this.IDProcedureImp = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDProcedureImp;
        this.vistaT = true;
        this.spinner.hide('spinnerPrincipal');
        this.listarDocumentosSalida();
        // this.listaDeDocumentos = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Documents;
      } else {
        this._messagge.showError("No se pudo crear", "");
        this.vistaT = false;
      }
    });
  }
  listarDocumentosSalida() {
    this.listaDeDocumentos = [];
    this.spinner.show('spinnerTabla2');
    this._service.getProcedureActionByAccount(this.IDAccount, this.IDProcedureImp, 0).subscribe(
      (resp: any) => {
        this.spinner.hide('spinnerTabla2');

        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDeDocumentos = resp.DataBeanProperties.ObjectValue;
            console.log("Documentos s", this.listaDeDocumentos);

          } else {
            this._messagge.showWarning("No tiene documentos", "");
            this.listaDeDocumentos = [];
          }
        } else {
          this._messagge.showError("No se pudo consultar", "");
        }
      }
    );
  }
  abrirSubirArchivo(template: TemplateRef<any>, bean, llamado) {
    this.modalRef = this._modalService.show(template, { class: 'modal-lg' });
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);
    this.llamadoArchivo = llamado;
    this.listarAnexos();
  }

  abrirModal(template: TemplateRef<any>, bean) {
    this.modalRef = this._modalService.show(template, this.config);
    this.beanProcedureAction = bean;

  }
  abrirAnexo(template: TemplateRef<any>) {
    this.modalRef2 = this._modalService.show(template, this.config);
  }

  public cargarFile(files: FileList) {
    this._fileService.postFile(files[0]).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.beanProcedureAction.MediaContext = archivo.MediaContext;
          this.beanProcedureAction.Media = archivo.Media;
          this.beanProcedureAction.State = 1;
          this.beanProcedureAction.Observations = null;
          this.nombreArchivo = archivo.Media;
          this.ruta = archivo.URL;
          this.actualizarProcedureAction();
          this.modalRef.hide();
        }
        else {
          this._messagge.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
          this.ruta = "";
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
          this.ruta = archivo.URL;
          // this.actualizarProcedureAction();
          // this.modalRef.hide();
        }
        else {
          this._messagge.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
          this.ruta = "";
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
      this.beanProcedureAction.Observations).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("El archivo se guardo", "");
          this.validarDocumentos();
          // if (this.llamadoArchivo == 0) {
          //   /* llamado desde la primera tabla"*/

          // } else if (this.llamadoArchivo == 1) {
          //   /* llamado desde la segunda tabla de documentos*/
          //   this.obtenerProcedimientoAcccion(true);
          // }
        } else {
          this._messagge.showError("El archivo no se guardo", "");
        }
      })
  }
  obtenerProcedimientoAcccion(resultadoFrom) {
    // console.log("llamo a la funcion", resultadoFrom);

    if (resultadoFrom == true) {
      this.spinner2 = true;
      this._service.getProcedureActionByAccount(this.beanProcedureAction.IDAccount, this.beanProcedureAction.IDProcedureImp, 0).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            console.log("respuesta bean", resp.DataBeanProperties.ObjectValue);
            this.vistaT = false;
            this.spinner2 = false;

            this.beanDocumentosaLlenar = resp.DataBeanProperties.ObjectValue;

          } else {
            this._messagge.showError("No se pudo obtener los documentos a diligenciar", "");
          }
        }
      );
    }
  }

  getUrl(MediaContext, Media) {
    this.esImagen = 0;
    let url = this._fileService.getUrlFiles(MediaContext, Media);
    if (url.includes("png") || url.includes("jpg") || url.includes("jpeg") || url.includes("PNG") || url.includes("JPG") || url.includes("JPEG")) {
      this.esImagen = 1;
    }
    return url;
  }


  validarDocumentos() {
    this._service.isValidStage(this.IDAccount, this.beanProcedureAction.IDStage).subscribe(
      (resp: any) => {
        console.log("respuesta", resp);

        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Documentos Validados", "");
          this.isValid = false;
          console.log("respuesta bean", resp.DataBeanProperties.ObjectValue);

        } else {
          // this._messagge.showError("No se pudieron validar los documentos", "");
          this.isValid = true;
        }
      }
    );
  }
  radicar() {
    this._service.submitInputDocuments(this.IDAccount, this.beanProcedureAction.IDStage).subscribe(
      (resp: any) => {
        console.log("respuesta R", resp);

        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se radicaron los documentos", "");
          console.log("respuesta R bean", resp.DataBeanProperties.ObjectValue);
          this.isRadicado = resp.DataBeanProperties.ObjectValue
        } else {
          this._messagge.showError("No se pudo radicar", "");
          this.isRadicado = false;
        }
      }
    );
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
    this._service.deleteAttachedDocument(id).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showInfo("Se elimino el anexo", "");
        this.listarAnexos();
      } else {
        this._messagge.showError("No se pudieron listar los anexos", "");
      }
    })
  }

  tipoSeleccion() {
    document.getElementById('btnModalSearch').click();
  }
  getAccountBoos(beanAccount) {
    if (beanAccount.Name1 == undefined) {
      beanAccount.Name1 = "";
    } if (beanAccount.Name2 == undefined) {
      beanAccount.Name2 = ""
    } if (beanAccount.Surname1 == undefined) {
      beanAccount.Surname1 = "";
    } if (beanAccount.Surname2 == undefined) {
      beanAccount.Surname2 = "";
    }

    this.txtEmpresa = `${beanAccount.Name1} ${beanAccount.Name2} ${beanAccount.Surname1} ${beanAccount.Surname2}`;
    this.IDAccount = beanAccount.IDAccount;
  }
}

