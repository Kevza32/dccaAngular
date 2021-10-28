import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';
import { QuickturnService } from 'src/app/providers/quickturn.service';

@Component({
  selector: 'app-collaboration-agreement',
  templateUrl: './collaboration-agreement.component.html',
  styleUrls: ['./collaboration-agreement.component.css']
})
export class CollaborationAgreementComponent implements OnInit {

  // Load
  listAgreement: any[];
  //Modal
  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;
  // Delete
  idDelete: number;
  // Edit
  idDocument: number;
  titleBS: string;
  titleMS: string;
  // Pipe
  filterPost = '';
  pageActual: number = 1;
  pageTable1: number = 1;
  pageTable2: number = 1;
  pageTable3: number = 1;
  // Search
  optionDocument: any;
  optionAnio: number;
  // Account
  listAccount: any[];
  listBeneficiary: any[];
  listInvestment: any[];
  listHistoric: any[];
  nombreCompleto: string;
  viewButton = false;
  beanProcedureAction: any;
  beanAgreement: any;
  beanAgreement2: any;
  idAgreeModal: number;
  fecha = new Date();
  listAnios = [];
  anio: number;
  documentnReportF29: any;

  //consignaciones
  bean_Consigment: any;
  lista_Consigment: any;
  ID_IDAgreement = 0;

  // flie
  nombreArchivo = "";
  ruta = "";
  media: string;
  context: string;
  mostrarDocumento = false;
  nombreArchivo2;

  agreement: number;
  optionFirst: any;
  optionLast: any;
  nameUser: string;
  idUser: number;
  spinner: boolean;
  listaAnexos: any;
  fechaIni: any;
  fechaFin: any;

  constructor(private agreementService: Dicco2Service,
    private quickService: QuickturnService,
    public modalService: BsModalService,
    private message: MessageService,
    private file: FileService,
    private _service: DicoService) { }

  ngOnInit(): void {
    this.initBeanConsigment();
    this.anio = this.fecha.getFullYear();
    this.initAnios()
  }

  initBeanConsigment() {
    this.bean_Consigment = {
      IDConsigment: null,
      CashValue: 0,
      ConsigmentDate: null,
      Observations: '',
      Media: '',
      MediaContext: '',
      IDAgreement: this.ID_IDAgreement
    };
  }

  public cargarFile(files: FileList) {
    this.mostrarDocumento = false;
    this.file.postFile(files[0]).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.context = archivo.Context;
          this.nombreArchivo = archivo.Media;
          this.bean_Consigment.Media = archivo.Media;
          this.bean_Consigment.MediaContext = archivo.MediaContext;
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

  config3 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };

  openAgreement(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openUsers(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config3);
  }

  openDolar(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config3);
  }

  openHistoric(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config3);
  }

  openType(id, template: TemplateRef<any>) {
    this.idAgreeModal = id;
    this.modalRef = this.modalService.show(template, this.config3);
  }

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, this.config2);
  }

  cerrar() {
    this.modalService.hide();
  }

  sendAgreement() {

  }

  modifyAgreement(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Convenio';
    }
    if (state === 'Editar') {
      this.idDocument = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Convenio';
      this.agreementService.getIdDocument(id).subscribe((resp: any) => {
        console.log(resp);
      });
    }
  }

  getAccount(account) {
    console.log(account);
    this.nameUser = account.Name1 + ' ' + account.Surname1;
    this.idUser = account.IDAccount;
    this.viewButton = true;
  }

  searchDocument() {
    this.optionLast = '';
    this.optionFirst = '';
    this.agreementService.searchDocument(this.optionDocument).subscribe((resp: any) => {
      console.log(resp);
      this.listAccount = resp.DataBeanProperties.ObjectValue;
      if (this.listAccount.length === 0) {
        this.message.showError('Verifique que el documento ingresado sea correcto.', 'Documento');
      } else {
        this.nombreCompleto = this.listAccount[0].DataBeanProperties.Name1 + ' ' +
          this.listAccount[0].DataBeanProperties.Name2 + ' ' +
          this.listAccount[0].DataBeanProperties.Surname1 + ' ' +
          this.listAccount[0].DataBeanProperties.Surname2;
        this.message.showSuccess('El documento ha sido encontrado', 'Documento');
        this.viewButton = true;
      }
    });
  }

  searchAnio() {
    this.fechaIni ? this.fechaIni = this.fechaIni + ' 00:00:00' : this.fechaIni = null;
    this.fechaFin ? this.fechaFin = this.fechaFin + ' 00:00:00' : this.fechaFin = null;

    this.spinner = true;
    this.listAgreement = [];
    console.log(this.idUser, this.optionAnio);
    this.agreementService.searchAgreement(this.idUser, this.fechaIni, this.fechaFin).subscribe((resp: any) => {
      console.log(resp);
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listAgreement = resp.DataBeanProperties.ObjectValue;
          for (let index = 0; index < this.listAgreement.length; index++) {
            resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myTotal =
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.AgreementSpeciesValue +
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.AgreementMoneyValue
          }
        } else {
          this.message.showWarning("No hay Convenios de colaboracion con este año", "");
        }
      } else {
        this.message.showError("No se pudo listar los convenios", "");
      }
      this.spinner = false;
      console.log(this.listAgreement);
    });
  }

  cleanDocument() {

  }

  validateSelector() {

  }

  loadUsers(id) {
    this.agreementService.getListBeneficiary(id).subscribe((resp: any) => {
      console.log(resp);
      this.listBeneficiary = resp.DataBeanProperties.ObjectValue;
      for (let index = 0; index < this.listBeneficiary.length; index++) {
        resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myTotal =
          resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.AgreementSpeciesValue +
          resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.AgreementMoneyValue
      }
    });
  }

  loadInvestment(id) {
    this.agreementService.getListInvestment(id).subscribe((resp: any) => {
      console.log(resp);
      this.listInvestment = resp.DataBeanProperties.ObjectValue;
      for (let index = 0; index < this.listInvestment.length; index++) {
        resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myTotal =
          resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.AgreementSpeciesValue +
          resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.AgreementMoneyValue
      }
    });
  }

  loadHistoric(id) {
    this.agreementService.getListHistoric(id).subscribe((resp: any) => {
      console.log(resp);
      this.listHistoric = resp.DataBeanProperties.ObjectValue;
      for (let index = 0; index < this.listHistoric.length; index++) {
        if (resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext !== null) {
          resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myLink =
            this.file.getUrlFiles(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext,
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Media);
        }
      }
    });
  }

  loadDocument(id) {
    this.idAgreeModal = id;
  }

  deleteAgreement() {
    this.agreementService.deleteDocument(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      /* this.loadData(); */
      this.message.showSuccess('El documento se ha eliminado correctamente', 'Documento');
      this.cerrar();
    });
  }
  popularAgreement(bean) {
    this.beanAgreement = bean;
    console.log("beanAgreement", this.beanAgreement);

  }
  abrirModal(template: TemplateRef<any>, bean) {
    this.beanProcedureAction = bean;
    console.log("beanProcedureAction", this.beanProcedureAction);

    if (this.beanProcedureAction.FormURLComponent == 'formulario-convenio') {
      this.obtenerAgreement(template);
    } else {
      this.modalRef = this.modalService.show(template, { class: 'modal-xl p-5' });
    }
  }

  obtenerAgreement(template) {

    if (this.beanAgreement.IDProcedureImp) {
      this._service.getAgreementByProcedureImp(this.beanAgreement.IDProcedureImp).subscribe(
        (resp: any) => {
          console.log(resp);

          if (resp.DataBeanProperties.ObjectValue) {
            this.beanAgreement2 = resp.DataBeanProperties.ObjectValue;
            console.log(this.beanAgreement2);
            this.modalRef = this.modalService.show(template, { class: 'modal-xl p-5' });
          } else {
            this.message.showError("No se pudo obtener Agreement", "")
          }
        }
      );
    }
  }
  initAnios() {
    for (let index = 2015; index < this.anio + 5; index++) {
      this.listAnios.push(index)
    }
  }
  generarF29(ID, template) {
    this._service.createF29Report(ID).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentnReportF29 = resp.DataBeanProperties.ObjectValue;
          console.log(this.documentnReportF29);

        } else {
          this.message.showError("No se pudo generar los archivos", "");
        }
      }
    );

    this.modalRef = this.modalService.show(template, { class: 'modal-xl p-5' });

  }

  consignaciones(ID, template) {
    this.agreement = ID;
    /* this.bean_Consigment.IDAgreement = ID;
    this.ID_IDAgreement = ID; */
    this.modalRef = this.modalService.show(template, { class: 'modal-xl p-5' });
  }
  obtenerFecha(fecha) {
    if (fecha == null) {
      return '00-00-00'
    } else {
      return fecha.slice(0, 10);
    }
  }
  abrirSubirArchivo(template: TemplateRef<any>, bean) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.beanProcedureAction = bean;
    console.log(this.beanProcedureAction);
    this.listarAnexos();
  }
  listarAnexos() {
    this._service.getAttachedDocumentCatalog(this.beanProcedureAction.IDAction).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaAnexos = resp.DataBeanProperties.ObjectValue;
      } else {
        this.message.showError("No se pudieron listar los anexos", "");
      }
    })
  }
  getUrl(MediaContext, Media) {
    let url = this.file.getUrlFiles(MediaContext, Media);
    return url;
  }
}
