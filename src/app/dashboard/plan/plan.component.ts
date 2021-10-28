import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  optionDocument: any;
  optionAnio: any;
  listAccount: any[];
  nombreCompleto: string;
  opcionAgreement: any;
  selectorAgreement: string;

  // Selector
  listAgreement = [];
  listBeneficiary = [];
  listInvestment: any[];
  listTable: any[];

  opcionBeneficiary: any;
  selectorBeneficiary: string;
  opcionInvestment: any;
  selectorInvestment: string;

  // Validation
  viewButton = false;
  viewTable = false;
  pageActual: number = 1;

  //Plan Inversiones
  tablaBeneInve: any;
  beanBeneficiaryInvestment: any;
  listaDePlanes: any;
  listaAux = [];
  beanPlanNecesidad: any;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  listaDeDocumentos: any;
  listaDeCocumentosB: any;
  beanNeedsPlanAttach: { IDNeedsPlanAttached: any; IDNeedsPlan: string; IDBudgetExecution: number; IDNeedsPlanDocument: string; IsValid: string; Media: string; MediaContext: string; Since: string; Name: string; };
  nombreArchivo: any;
  BeanDocument: any;
  uniAux: number;
  nameUNitCL: string;
  nameUNitB: string;
  nameUNitRB: string;
  txtNameRubro: any;
  vista: boolean = false;
  beanExec: any;
  txtCuenta: string;
  listaDePresupuestos: any[];
  fecha = new Date();
  listAnios = [];
  anio: number;
  nameUser: string;
  idUser: number;
  spinner: boolean;
  fechaIni: any;
  fechaFin: any;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl'
  };
  listaBeneficiarios: any;
  txtEmpresa: any;
  listaUnidadesLog: any;
  sesion: any;
  txtDescripcion: string;
  beanAgreement: any;
  beanBeanficiary: any;
  constructor(private planService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService,
    private _service: DicoService,
    private _fileService: FileService,
    private _service2: Dicco2Service,
    private _pipeDate: DatePipe
  ) { }

  ngOnInit(): void {
    this.listaAux[0] = "Dinero";
    this.listaAux[1] = "Especie";
    this.listaAux[2] = "Bien";
    this.listaAux[3] = "Servicio";
    this.initBeanNeedsPlanAttach();
    this.anio = this.fecha.getFullYear();
    this.initAnios();
    this.listarUnidadesLogisticas();
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    // console.log(this.sesion.DataBeanProperties.IDAccount);

  }
  initAnios() {
    console.log("llamo");

    for (let index = 2015; index < this.anio + 5; index++) {
      this.listAnios.push(index);
    }
    console.log(this.listAnios);

  }
  initBean() {
    this.beanPlanNecesidad = {
      IDNeedsPlan: null,
      Type: null,
      ItemType: '',
      IDLnFunctionalID: '',
      TotalValue: '',
      IDLogisticUnit: '',
      IDReceivingUnit: '',
      Address: '',
      IDBeneficiaryInvestment: '',
      BudgetID: ''
    }
  }

  initBeanExec() {
    this.beanExec = {
      IDBudgetExecution: null,
      IDNeedsPlan: this.beanPlanNecesidad.IDNeedsPlan,
      ExecutionValue: 0,
      ExecutionDate: '',
      IDAccount: null,
      Observations: ''
    }
  }
  searchDocument() {
    this.planService.searchDocument(this.optionDocument).subscribe((resp: any) => {
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

  getAccount(account) {
    console.log(account);
    this.nameUser = account.Name1 + ' ' + account.Surname1;
    this.idUser = account.IDAccount;
    this.viewButton = true;
  }

  searchAnio() {
    this.fechaIni ? this.fechaIni = this.fechaIni + ' 00:00:00' : this.fechaIni = null;
    this.fechaFin ? this.fechaFin = this.fechaFin + ' 00:00:00' : this.fechaFin = null;

    this.planService.searchAgreement(this.idUser, this.fechaIni, this.fechaFin).subscribe((resp: any) => {
      console.log(resp);
      this.listAgreement = resp.DataBeanProperties.ObjectValue;
      console.log("Lista agre", this.listAgreement);

      if (this.listAgreement.length === 0) {
        this.message.showError('No se han encontrado datos.', 'Datos');
      } else {
        this.message.showSuccess('Datos Cargados.', 'Información');
      }
    });
  }

  capturarAgreement() {
    this.vista = false;
    this.beanBeneficiaryInvestment = null;
    console.log(this.opcionAgreement.IDAgreement);
    this.planService.getListBeneficiary(this.opcionAgreement.IDAgreement).subscribe((resp: any) => {
      console.log(resp);
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listBeneficiary = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showWarning("Este convenio aun no tiene beneficiarios", "");
        }
      } else {
        this.message.showError("No se pudieron listar los beneficiarios", "");

      }
    });
    this.planService.getListInvestment(this.opcionAgreement.IDAgreement).subscribe((resp: any) => {
      console.log(resp);
      this.listInvestment = resp.DataBeanProperties.ObjectValue;
    });

    this._service.getAgreement(this.opcionAgreement.IDAgreement).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        resp.DataBeanProperties.ObjectValue ? this.beanAgreement = resp.DataBeanProperties.ObjectValue.DataBeanProperties : '';

      }
    });

  }

  capturarInvestment() {
    this.planService.getListPlan(this.opcionInvestment, this.opcionBeneficiary).subscribe((resp: any) => {
      console.log(resp);
      this.listTable = resp.DataBeanProperties.ObjectValue;
      if (this.listTable.length === 0) {
        this.message.showWarning('No se han encontrado datos.', 'Datos');
      } else {
        this.message.showSuccess('Los datos han sido cargados.', 'Datos');
        this.viewTable = true;
      }
    });
  }
  /* public getListPlan(investment, beneficiary) { */
  obtenerListaArticulosPporBeneficiary() {
    this.spinner = true;
    this.vista = false;
    this._service.getBeneficiaryInvestmentCatalogByBeneficiary(this.opcionBeneficiary).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.spinner = false;

          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.tablaBeneInve = resp.DataBeanProperties.ObjectValue;
            console.log("tabla", this.tablaBeneInve);
            this.viewTable = true;
          } else {
            this.message.showWarning("No hay datos cargados", "");
            this.tablaBeneInve = [];
            this.viewTable = false;
            this.beanBeneficiaryInvestment = null;

          }

        } else {
          this.message.showError("No se pudo cargar la lista articulos", "");
        }
      }
    );
  }
  obtenerBeneficiario() {
    this._service.getBeneficiaryByID(this.opcionBeneficiary).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.beanBeanficiary = resp.DataBeanProperties.ObjectValue.DataBeanProperties;
      }
    })
  }

  abrirTabla(bean, template: TemplateRef<any>) {
    this.beanBeneficiaryInvestment = bean;
    console.log("beanInvestment", this.beanBeneficiaryInvestment);
    this.listarPlanes();
    this.modalRef2 = this.modalService.show(template, this.config);
  }
  listarPlanes() {
    this._service.getNeedsPlanCatalogByBeneficiaryInvestment(this.beanBeneficiaryInvestment.IDBeneficiaryInvestment).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDePlanes = resp.DataBeanProperties.ObjectValue;
            console.log(this.listaDePlanes);
            this.vista = true;
          } else {
            this.message.showWarning("No tiene plan de necesidades", "");
            this.listaDePlanes = [];
            this.vista = true;

          }
        } else {
          this.message.showError("No se pudo listar los planes", "");
        }
      }
    );
  }

  abrirEditar(template: TemplateRef<any>, bean) {
    this.beanPlanNecesidad = bean;
    this.txtEmpresa = this.beanPlanNecesidad.SupplierName;
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });

  }
  validarPlan() {

    if (this.beanPlanNecesidad.Type == null) {
      return this.message.showError("Por favor llene el campo Modalidad", "");
    }
    else if (this.beanPlanNecesidad.TotalValue == '') {
      return this.message.showError("Por favor llene el campo Valor total", "");
    }
    else if (this.beanPlanNecesidad.ItemType == '') {
      return this.message.showError("Por favor llene el campo Bien / Servicio", "");
    }
    else if (this.beanPlanNecesidad.IDLogisticUnit == '') {
      return this.message.showError("Por favor llene el campo Unidad centralizadora logistica", "");
    }
    else if (this.beanPlanNecesidad.IDLnFunctionalID == '') {
      return this.message.showError("Por favor llene el campo Unidad beneficiada", "");
    }
    else if (this.beanPlanNecesidad.IDReceivingUnit == '') {
      return this.message.showError("Por favor llene el campo Unidad receptor de bienes", "");
    }
    else if (this.beanPlanNecesidad.BudgetID == '') {
      return this.message.showError("Por favor llene el campoCodigo rubro presupuestal", "");
    }
    else if (this.beanPlanNecesidad.Address == '') {
      return this.message.showError("Por favor llene el campo Lugar de entrega (Dirección exacta)", "");
    }
    else if (this.beanPlanNecesidad.Justification == '') {
      return this.message.showError("Por favor llenar el campo Justificación", "");
    }
    else if (this.beanPlanNecesidad.MeasurementUnit == '') {
      return this.message.showError("Por favor llenar el campo MeasurementUnit", "");
    }
    else if (this.beanPlanNecesidad.MinQuantity == '') {
      return this.message.showError("Por favor llenar el campo MinQuantity", "");
    }
    else if (this.beanPlanNecesidad.Observations == '') {
      return this.message.showError("Por favor llenar el campo Observations", "");
    }
    else if (this.beanPlanNecesidad.RealQuantity == '') {
      return this.message.showError("Por favor llenar el campo RealQuantity", "");
    }
    else {
      this.agregar();
    }
  }
  agregar() {
    this.beanPlanNecesidad.IDBeneficiaryInvestment = this.beanBeneficiaryInvestment.IDBeneficiaryInvestment;
    console.log(this.beanBeneficiaryInvestment);
    console.log(this.beanPlanNecesidad);


    this._service.updateNeedsPlan(this.beanPlanNecesidad).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.message.showSuccess("Se añadió los campos", "");
          this.listarPlanes();
          this.modalRef.hide();
        } else {
          this.message.showError("No se pudo añadir el plan", "");
        }
      }
    );
  }
  abrirListaDocs(bean) {
    this.beanExec = bean;
    console.log("plan de necesidad", this.beanPlanNecesidad);

    this._service.getNeedsPlanDocumentsCatalog(this.beanPlanNecesidad.ItemType).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeDocumentos = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showError("No se pudo listar los documentos", "");
        }
      }
    );
  }
  documentosLleandosAttach() {
    this._service.getNeedsPlanAttachedsCatalog(this.beanExec.IDNeedsPlan).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeCocumentosB = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showError("No se pudieron listar los documentos", "");
        }
      }
    );
  }
  initBeanNeedsPlanAttach() {
    this.beanNeedsPlanAttach = {
      IDNeedsPlanAttached: null,
      IDNeedsPlan: '',
      IDBudgetExecution: null,
      IDNeedsPlanDocument: '',
      IsValid: '',
      Media: '',
      MediaContext: '',
      Since: '',
      Name: ''
    }
  }
  public cargarFile(files: FileList) {

    this._fileService.postFile(files[0]).subscribe(

      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.beanNeedsPlanAttach.MediaContext = archivo.MediaContext;
          this.beanNeedsPlanAttach.Media = archivo.Media;
          this.beanNeedsPlanAttach.IDBudgetExecution = this.beanExec.IDBudgetExecution;
          this.nombreArchivo = archivo.Media;
          this.actualizarAttech();
        }
        else {
          this.message.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
        }
      },
      error => {
        this.message.showWarning(JSON.stringify(error), "Archivo");
        console.log(<any>error);
      }

    );

  }
  actualizarAttech() {
    console.log(this.beanNeedsPlanAttach);

    this._service.updateNeedsPlanAttached(this.beanNeedsPlanAttach).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentosLleandosAttach();
          document.getElementById('btnCloseCM').click();
          this.message.showSuccess("Se cargo el archivo", "");
        } else {
          this.message.showError("No se pudo cargar el archivo", "");
        }
      }
    );
  }
  getUrl(MediaContext, Media) {
    let url = this._fileService.getUrlFiles(MediaContext, Media);
    return url;
  }
  abrirEliminarDocumeto(beanDocumento) {
    this.BeanDocument = beanDocumento;
    console.log(this.BeanDocument);
  }
  confirmEliminar() {
    this._service.deleteNeedsPlanAttached(this.BeanDocument).subscribe(
      (resp: any) => {
        this.documentosLleandosAttach();
        this.message.showInfo("Se elimino el registro", "");
        document.getElementById('btnCerrarElim').click();
      }
    );
  }
  abrirFormularioPlanN(template: TemplateRef<any>) {
    this.initBean();
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });

  }

  abirModalUnidadCL() {
    this.uniAux = 1
    document.getElementById('btnModalUnidad').click();
  }
  abirModalUnidadB() {
    this.uniAux = 2
    document.getElementById('btnModalUnidad').click();
  }
  abirModalUnidadRB() {
    this.uniAux = 3
    document.getElementById('btnModalUnidad').click();
  }
  abrirModalRubro() {
    document.getElementById('btnModalInvestment').click();
  }
  getUnit(id: number) {
    console.log(id);
    if (this.uniAux == 1) {
      this.beanPlanNecesidad.IDLogisticUnit = id;
    } else if (this.uniAux == 2) {
      this.beanPlanNecesidad.IDLnFunctionalID = id;
    } else if (this.uniAux == 3) {
      this.beanPlanNecesidad.IDReceivingUnit = id;
    }
  }
  getNameUnit(name: string) {
    if (this.uniAux == 1) {
      this.beanPlanNecesidad.LogisticIDName = name;
    } else if (this.uniAux == 2) {
      this.beanPlanNecesidad.FunctionalIDName = name;
    } else if (this.uniAux == 3) {
      this.beanPlanNecesidad.ReceivingIDName = name;
    }
  }
  getInvestment(id) {
    this.beanPlanNecesidad.BudgetID = id;
  }
  getNameInvestment(name) {
    this.beanPlanNecesidad.BudgetIDName = name
  }

  abrirPresupuesto(bean) {
    this.beanPlanNecesidad = bean
    this.initBeanExec();
    this.listarBudgets();
  }
  tipoSeleccion() {
    document.getElementById('btnModalSearch').click();
  }
  getAccountBoos(beanAccount) {
    this.txtCuenta = `${beanAccount.Name1} ${beanAccount.Name2} ${beanAccount.Surname1} ${beanAccount.Surname2}`;
    this.beanExec.IDAccount = beanAccount.IDAccount;
  }
  guardarBudgetExec() {
    this.beanExec.ExecutionDate = this.beanExec.ExecutionDate + ' 00:00:00';
    this._service.updateBudgetExecution(this.beanExec).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarBudgets();
          this.initBeanExec();
          this.message.showSuccess("Se creo el registro", "");

        } else {
          this.message.showError("No se pudo guardar el registro", "");
        }

      }
    );

  }
  listarBudgets() {
    this._service.getBudgetExecutionsCatalog(this.beanPlanNecesidad.IDNeedsPlan).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDePresupuestos = resp.DataBeanProperties.ObjectValue
          } else {
            this.message.showWarning("No tiene presupuestos aun", "");
            this.listaDePresupuestos = [];
          }
        } else {
          this.message.showError("No se pudo listar los presupuestos", "");
        }
      }
    );
  }
  eliminarExec(bean) {
    this._service.deleteBudgetExecution(bean.IDNeedsPlan).subscribe(
      (resp: any) => {
        this.message.showInfo("Se elimino el registro", "");
        this.listarBudgets();
      }
    );
  }
  listarUnidadesLogisticas() {
    this._service2.getListLogistic().subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listaUnidadesLog = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showWarning("No hay unidades logisticas", "");
        }
      } else {
        this.message.showError("No se pudieron listar las unidades logisticas", "");
      }
    });
  }
  generarxls() {
    this._service2.createBeneficiaryReport(this.opcionBeneficiary).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        console.log(resp.DataBeanProperties.ObjectValue);
        let reporte = resp.DataBeanProperties.ObjectValue;
        window.open(reporte[0].DataBeanProperties.URLLink, "_blank");
      } else {
        this.message.showError("No se pudo generar el reporte", "");
      }
    }
    );
  }
  abrirAprovacion(template: TemplateRef<any>, bean) {
    this.beanPlanNecesidad = bean;
    this.modalRef3 = this.modalService.show(template, { class: 'modal-xl' });
  }



  aprobarPlan() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this.message.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateNeedsPlanForTracing(this.beanPlanNecesidad.IDNeedsPlan, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarPlanes();
          this.message.showSuccess("Se aprobo el plan de inverisones", "");
          this.modalRef3.hide();
        } else {
          this.message.showError("No se puede aprobar el plan de inversiones", "");
        }
      });
    }
  }
  rechazarPlan() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this.message.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateNeedsPlanForTracing(this.beanPlanNecesidad.IDNeedsPlan, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarPlanes();
          this.message.showSuccess("Se rechazo el plan de inverisones", "");
          this.modalRef3.hide();

        } else {
          this.message.showError("No se puede rechazar el plan de inversiones", "");
        }
      });
    }
  }

  abrirAgreement(template: TemplateRef<any>) {


    this._service.getAgreement(this.opcionAgreement.IDAgreement).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {

        this.beanAgreement = resp.DataBeanProperties.ObjectValue.DataBeanProperties;
        this.beanAgreement.SubscriptionDate = this._pipeDate.transform(this.beanAgreement.SubscriptionDate, 'yyyy-MM-dd');
        this.beanAgreement.FinishDate = this._pipeDate.transform(this.beanAgreement.FinishDate, 'yyyy-MM-dd');
        console.log(this.beanAgreement);

        this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
      } else {
        this.message.showError("no se puede editar", "");
      }
    });
  }
  editar() {
    if (this.beanAgreement.SubscriptionDate) {
      this.beanAgreement.SubscriptionDate = this.beanAgreement.SubscriptionDate + ' 00:00:00';
    } else {
      this.beanAgreement.SubscriptionDate = null;
    }

    if (this.beanAgreement.FinishDate) {
      this.beanAgreement.FinishDate = this.beanAgreement.FinishDate + ' 00:00:00';
    } else {
      this.beanAgreement.FinishDate = null;
    }

    console.log(this.beanAgreement);
    this._service.updateAgreement(this.beanAgreement).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.message.showSuccess("Se edito correctamente", "");
          // this.aprobar();
        } else {
          this.message.showError("No se pudo guardar", "");
        }
      });
  }



}
