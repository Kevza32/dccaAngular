import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-tramites-x-asignar',
  templateUrl: './tramites-x-asignar.component.html',
  styleUrls: ['./tramites-x-asignar.component.css']
})
export class TramitesXAsignarComponent implements OnInit {
  modalRef: BsModalRef;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };
  sesion: any;
  listaDeTramites: any;
  beanDocumentosaAsignar: any;
  estadoDoc = [];
  spinner: boolean;
  listaCategorias: any[];
  opcionBusinessClass: any;
  listaProcesosNegocio: any;
  cbxBussinessProccess: number;
  listaDeDocumentosAsignar: any[];
  IDFuncionalIDLn: number;
  nombreUni: string = "";
  listaUsuarios: any[];
  cbxestado: any;
  beanAction: any;
  txtNit = "";
  txtNombre = "";
  txtApellido = "";
  id: any;
  constructor(private _service: DicoService,
    private _service2: Dicco2Service,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _fileService: FileService) { }


  ngOnInit(): void {
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    this.estadoDoc[0] = "Pendiente por subir";
    this.estadoDoc[1] = "En verificacion";
    this.estadoDoc[2] = "Devuelto";
    this.estadoDoc[3] = "verificado";
    // this.listarTramitesXAsignar();
    this.loadCategoria();

  }

  listarTramitesXAsignar() {
    this.spinner = true;
    this._service.getProcedureImpForAssign(this.sesion.DataBeanProperties.IDAccount, this.cbxBussinessProccess).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDeTramites = resp.DataBeanProperties.ObjectValue;
            console.log(this.listaDeTramites);
            this.spinner = false;

          } else {
            this._messagge.showWarning("No tiene tramites por asignar", "");
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
  listarProcesosNegocio() {
    console.log('llamo');

    this.listaProcesosNegocio = [];
    this._service2.getListModel(this.opcionBusinessClass).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaProcesosNegocio = resp.DataBeanProperties.ObjectValue;

        } else {
          this._messagge.showError("No se pudo listar los procesos de negocio", "");
        }
      }
    );
  }
  abrirTabla(bean) {
    this.beanDocumentosaAsignar = bean
    console.log(bean);
  }


  abrirModal(template: TemplateRef<any>, id) {
    this.modalRef = this._modalService.show(template, this.config);
    this.txtApellido = '';
    this.txtNombre = '';
    this.txtNit = '';
    this.id = id;

  }
  setBeanAction(bean) {
    this.nombreUni = "";
    this.listaUsuarios = [];
    this.beanAction = bean;
    console.log(bean);

  }
  asignarImp(bean) {
    this._service2.assignProcedureImpToGroupMember(this.beanDocumentosaAsignar.IDProcedureImp, bean.IDAccount, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se añadio " + resp.DataBeanProperties.ObjectValue + " tareas", "");
        this.listarDocumentos();
        this.modalRef.hide();
      } else {
        this._messagge.showError("No se pudo añadir el usuario", "");
      }
    })
  }
  autoAsignarImp() {
    this._service2.assignProcedureImpToGroupMember(this.beanDocumentosaAsignar.IDProcedureImp, this.sesion.DataBeanProperties.IDAccount, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se añadio " + resp.DataBeanProperties.ObjectValue + " tareas", "");
        this.listarDocumentos();
      } else {
        this._messagge.showError("No se pudo añadir el usuario", "");
      }
    })
  }





  asignarAction(bean) {
    this._service2.assignActionResponseToGroupMember(this.beanAction.IDAction, this.sesion.DataBeanProperties.IDAccount, bean.IDAccount).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se añadio " + resp.DataBeanProperties.ObjectValue + " tareas", "");

        this.listarDocumentos();
        this.modalRef.hide();
      } else {
        this._messagge.showError("No se pudo añadir el usuario", "");
      }
    })
  }
  autoAsignarAction() {
    this._service2.assignActionResponseToGroupMember(this.beanAction.IDAction, this.sesion.DataBeanProperties.IDAccount, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se añadio " + resp.DataBeanProperties.ObjectValue + " tareas", "");
        this.listarDocumentos();
      } else {
        this._messagge.showError("No se pudo añadir el usuario", "");
      }
    })
  }
  abrirUnidad() {
    document.getElementById('btnModalUnidad').click();
  }
  getUnit(id: number) {
    console.log(id);
    this.IDFuncionalIDLn = id;
  }
  getNameUnit(name: string) {
    console.log(name);
    this.nombreUni = name;
    this.listarUsuarios2();
  }
  listarUsuarios() {
    this.listaUsuarios = [];
    this._service2.getWorkGroupMember(this.beanAction.IDLnFunctionalID, 0, this.txtNit, this.txtNombre, this.txtApellido).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaUsuarios = resp.DataBeanProperties.ObjectValue
      } else {
        this._messagge.showWarning("el grupo de trabajo no tiene usuarios aún", "");
      }
    })
  }
  listarUsuarios2() {
    this.listaUsuarios = [];
    this._service2.getWorkGroupMemberCatalog(this.IDFuncionalIDLn, 0).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaUsuarios = resp.DataBeanProperties.ObjectValue
      } else {
        this._messagge.showWarning("el grupo de trabajo no tiene usuarios aún", "");
      }
    })

  }

  listarDocumentos() {
    this.listaDeDocumentosAsignar = [];
    this._service2.getProcedureActionForAssign(this.beanDocumentosaAsignar.IDProcedureImp).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {

        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listaDeDocumentosAsignar = resp.DataBeanProperties.ObjectValue;
        } else {
          this._messagge.showWarning('No hay documentos por asignar', "");
          this.listarTramitesXAsignar();
        }
      } else {
        this._messagge.showWarning('no se pudo listar los documentos por asignar', "");

      }
    })
  }
}
