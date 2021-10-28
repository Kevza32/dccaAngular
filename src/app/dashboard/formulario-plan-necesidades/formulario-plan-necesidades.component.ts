import { Component, Input, OnInit } from '@angular/core';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-formulario-plan-necesidades',
  templateUrl: './formulario-plan-necesidades.component.html',
  styleUrls: ['./formulario-plan-necesidades.component.css']
})
export class FormularioPlanNecesidadesComponent implements OnInit {
  @Input() BeanAgreement: any;
  @Input() BeanProcedureAction: any;
  @Input() Ejecucion: Boolean = false;
  @Input() Seguimiento: Boolean = false;
  @Input() Liquidacion: boolean = false;
  @Input() Historial: boolean = false;
  @Input() idBeneficiario: any;
  beanPlanNecesidad: any;
  beanPlanNecesidad2: any;
  beanBeneficiary: any;
  tablaBeneInve: any;
  txtNameRubro: any;
  txtDes: any;
  uniAux: any;
  nameUNitCL: any;
  nameUNitB: string;
  nameUNitRB: string;
  beanBeneficiaryInvestment: any;
  listaAux = [];
  listaDePlanes: any;
  listaDeDocumentos: any;
  listaDeCocumentosB: any = [];
  beanNeedsPlanAttach: any;
  nombreArchivo: any;
  BeanDocument: any;
  listaBeneficiarios: any;
  // idBeneficiario: any;
  cbRubroCap: any;
  txtEmpresa: any;
  listaUnidadesLog: any;
  budgetEncontrados = [];
  txtNombre: string;
  anexoMedia: string;
  anexoMediaContext: string;
  txtDescripcion: string;
  listaAnexos: any;
  txtValorRubro: number;
  listaSubPlanes: any;
  suma: number;
  disponible: number;
  sesion: any;
  beanNeedsPlanAttachInvestment: any;
  constructor(private _service: DicoService,
    private _messagge: MessageService,
    private _fileService: FileService,
    private _service2: Dicco2Service,
    private pipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.initBean();
    // this.listarBeneficiario();
    this.initBeanNeedsPlanAttach();
    this.initBeanNeedsPlanInvestmentAttach();
    this.initBean2();
    this.listaAux[0] = "Dinero";
    this.listaAux[1] = "Especie";
    this.listaAux[2] = "Bien";
    this.listaAux[3] = "Servicio";
    this.listarUnidadesLogisticas();
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    this.Seguimiento || this.Liquidacion ? this.listarBeneficiarioByAgreement() : this.Historial ? this.obtenerListaArticulosPporBeneficiary2() : this.listarBeneficiario();

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
      BudgetID: '',
      Justification: '',
      MeasurementUnit: '',
      MinQuantity: '',
      Observations: '',
      RealQuantity: '',
    }
  }
  initBean2() {
    this.beanPlanNecesidad2 = {
      IDInvestmentPlan: null,
      IDNeedsPlan: null,
      Type: null,
      ItemType: '',
      IDLnFunctionalID: '',
      TotalValue: '',
      IDLogisticUnit: '',
      IDReceivingUnit: '',
      Address: '',
      IDBeneficiaryInvestment: '',
      BudgetID: '',
      Justification: '',
      MeasurementUnit: '',
      MinQuantity: '',
      Observations: '',
      RealQuantity: '',
    }
  }

  initBeanNeedsPlanAttach() {
    this.beanNeedsPlanAttach = {
      IDNeedsPlanAttached: null,
      IDNeedsPlan: '',
      IDNeedsPlanDocument: '',
      IsValid: '',
      Media: '',
      MediaContext: '',
      Name: '',
      Observations: ''
    }
  }
  initBeanNeedsPlanInvestmentAttach() {
    this.beanNeedsPlanAttachInvestment = {
      IDInvestmentPlanAttached: null,
      IDInvestmentPlan: '',
      IDNeedsPlanDocument: '',
      IsValid: '',
      Media: '',
      MediaContext: '',
      Name: '',
      Observations: ''
    }
  }
  obtnenerBeneficiario() {
    this.listaDePlanes = [];
    this.listaSubPlanes = null;
    console.log(this.idBeneficiario);

    this.beanPlanNecesidad.Type = null ? null : null;
    this.cbRubroCap = null;
    this.beanBeneficiaryInvestment = null;
    this._service.getBeneficiary(this.BeanAgreement.IDAgreement, this.BeanProcedureAction.IDLnFunctionalID, this.idBeneficiario.IDLnUnidadMilitar).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.beanBeneficiary = resp.DataBeanProperties.ObjectValue;
          console.log(this.beanBeneficiary);

          this.obtenerListaArticulosPporBeneficiary()
        } else {
          this._messagge.showError("No se pudo obtner el beneficiario", "");
        }
      }
    );
  }
  listarBeneficiario() {
    this._service.getBeneficiaryCatalogByAgreement(this.BeanAgreement.IDAgreement, this.BeanProcedureAction.IDLnFunctionalID).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaBeneficiarios = resp.DataBeanProperties.ObjectValue;
        } else {
          this._messagge.showError("No se pudo obtener la lista de beneficiarios", "");
        }
      }
    );
  }


  obtenerListaArticulosPporBeneficiary() {
    this._service.getBeneficiaryInvestmentCatalogByBeneficiary(this.beanBeneficiary.DataBeanProperties.IDBeneficiary).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.tablaBeneInve = resp.DataBeanProperties.ObjectValue
        } else {
          this._messagge.showError("No se pudo cargar la lista articulos", "");
        }
      }
    );
  }
  obtenerListaArticulosPporBeneficiary2() {
    this.listaDePlanes = [];
    this.listaSubPlanes = null;
    console.log(this.idBeneficiario);

    this._service.getBeneficiaryInvestmentCatalogByBeneficiary(this.idBeneficiario.IDBeneficiary).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.tablaBeneInve = resp.DataBeanProperties.ObjectValue
        } else {
          this._messagge.showError("No se pudo cargar la lista articulos", "");
        }
      }
    );
  }
  abrirTabla(bean) {
    this.listaSubPlanes = null;
    this.beanPlanNecesidad.Type = null;
    this.beanPlanNecesidad.IDLnFunctionalID = this.idBeneficiario.IDLnUnidadMilitar;
    this.beanBeneficiaryInvestment = bean;
    // this.listarPlanes();
  }
  llenarForm(bean) {
    this.initBean();
    this.initBeanNeedsPlanAttach();
    this.beanPlanNecesidad = bean;
    this.txtEmpresa = this.beanPlanNecesidad.SupplierName;
    console.log(this.beanPlanNecesidad);
    this.initBean2();
    this.beanPlanNecesidad2.IDNeedsPlan = this.beanPlanNecesidad.IDNeedsPlan
    this.beanPlanNecesidad2.BudgetCode = this.beanPlanNecesidad.BudgetCode;
    this.beanPlanNecesidad2.BudgetIDName = this.beanPlanNecesidad.BudgetIDName;
    this.beanPlanNecesidad2.BudgetID = this.beanPlanNecesidad.BudgetID;
    this.listarSubPlanes(this.beanPlanNecesidad.IDNeedsPlan);

  }
  abrirListaDocs(bean) {
    this.initBean();
    this.beanPlanNecesidad = bean;
    this._service.getNeedsPlanDocumentByIDNeedsPlan(bean.IDNeedsPlan).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeDocumentos = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaDeDocumentos);
        } else {
          this._messagge.showError("No se pudo listar los documentos", "");
        }
      }
    );
  }
  abrirListaDocsIn(bean) {
    // this.initBean();
    // this.beanPlanNecesidad2 = bean;
    console.log(bean);

    this._service.getNeedsPlanDocumentByIDNeedsPlan(bean.IDNeedsPlan).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeDocumentos = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaDeDocumentos);

        } else {
          this._messagge.showError("No se pudo listar los documentos", "");
        }
      }
    );
  }
  documentosLleandosAttach(id) {
    this._service.getNeedsPlanAttachedsCatalog(id).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeCocumentosB = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaDeCocumentosB);

        } else {
          this._messagge.showError("No se pudieron listar los documentos", "");
        }
      }
    );
  }
  documentosLleandosAttachInves(id) {
    this._service.getInvestmentPlanAttachedsCatalog(id).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaDeCocumentosB = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaDeCocumentosB);
        } else {
          this._messagge.showError("No se pudieron listar los documentos", "");
        }
      }
    );
  }
  getUrl(MediaContext, Media) {
    let url = this._fileService.getUrlFiles(MediaContext, Media);
    return url;
  }
  public cargarFile(files: FileList) {

    this._fileService.postFile(files[0]).subscribe(

      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.beanNeedsPlanAttach.MediaContext = archivo.MediaContext;
          this.beanNeedsPlanAttach.Media = archivo.Media;
          this.beanNeedsPlanAttach.IDNeedsPlan = this.beanPlanNecesidad.IDNeedsPlan;
          // this.beanNeedsPlanAttach.IDNeedsPlan = this.beanPlanNecesidad.IDNeedsPlan;
          this.nombreArchivo = archivo.Media;
          // this.actualizarAttech();
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
  actualizarAttech() {
    console.log(this.beanNeedsPlanAttach);

    this._service.updateNeedsPlanAttached(this.beanNeedsPlanAttach).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentosLleandosAttach(this.beanPlanNecesidad.IDNeedsPlan);
          document.getElementById('btnCloseCM').click();
          this._messagge.showSuccess("Se cargo el archivo", "");
          this.beanNeedsPlanAttach.MediaContext = "";
          this.beanNeedsPlanAttach.Media = "";
          this.beanNeedsPlanAttach.IDNeedsPlan = "";
          this.beanNeedsPlanAttach.Observations = "";
          this.beanNeedsPlanAttach.IDNeedsPlanDocument = "";
          this.nombreArchivo = "";
          console.log(this.beanNeedsPlanAttachInvestment);

        } else {
          this._messagge.showError("No se pudo cargar el archivo", "");
        }
      }
    );
  }
  public cargarFileInvestment(files: FileList) {

    this._fileService.postFile(files[0]).subscribe(

      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.beanNeedsPlanAttachInvestment.MediaContext = archivo.MediaContext;
          this.beanNeedsPlanAttachInvestment.Media = archivo.Media;
          this.beanNeedsPlanAttachInvestment.IDInvestmentPlan = this.beanPlanNecesidad2.IDInvestmentPlan;
          // this.beanNeedsPlanAttach.IDNeedsPlan = this.beanPlanNecesidad.IDNeedsPlan;
          this.nombreArchivo = archivo.Media;
          // this.actualizarAttech();
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
  actualizarAttechInvestment() {
    console.log(this.beanNeedsPlanAttachInvestment);

    this._service.updateInvestmentPlanAttached(this.beanNeedsPlanAttachInvestment).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentosLleandosAttachInves(this.beanPlanNecesidad2.IDInvestmentPlan);
          document.getElementById('btnCloseCM').click();
          this._messagge.showSuccess("Se cargo el archivo", "");
          this.beanNeedsPlanAttachInvestment.MediaContext = "";
          this.beanNeedsPlanAttachInvestment.Media = "";
          this.beanNeedsPlanAttachInvestment.IDNeedsPlan = "";
          this.beanNeedsPlanAttachInvestment.Observations = "";
          this.beanNeedsPlanAttachInvestment.IDNeedsPlanDocument = "";
          this.nombreArchivo = "";

        } else {
          this._messagge.showError("No se pudo cargar el archivo", "");
        }
      }
    );
  }

  listarPlanes() {
    this.listaDePlanes = [];
    this.listaSubPlanes = null;
    this._service.getNeedsPlanCatalogByBeneficiaryInvestmentByType(this.beanBeneficiaryInvestment.IDBeneficiaryInvestment, this.beanPlanNecesidad.Type).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDePlanes = resp.DataBeanProperties.ObjectValue;
            console.log(this.listaDePlanes);

          } else {
            this._messagge.showWarning("No tiene plan de necesidades", "");
            this.listaDePlanes = [];
          }
        } else {
          this._messagge.showError("No se pudo listar los planes", "");
        }
      }
    );
  }
  getInvestment(id) {
    this.beanPlanNecesidad.BudgetID = id;
  }
  getNameInvestment(name) {
    this.txtNameRubro = name
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
      this.nameUNitCL = name;
    } else if (this.uniAux == 2) {
      this.nameUNitB = name;
    } else if (this.uniAux == 3) {
      this.nameUNitRB = name;
    }
  }
  aprobarDocumento() {
    if (this.txtDes == null || this.txtDes == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      console.log("aprobo");
      this._service.responseProcedureAction(this.BeanProcedureAction.IDAction, this.txtDes).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this._messagge.showSuccess("Se aprobó el documento", "");
            this.txtDes = null;
            document.getElementById("btnCerrarAprobacion").click();
            document.getElementById("btnCerrarModalG").click();
          } else {
            let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
            this._messagge.showError("No se puede agregar debido a: " + error, "");
          }
        }
      );
    }
  }
  rechazarDocumento() {
    if (this.txtDes == null || this.txtDes == '') {
      return this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      console.log("Rechazo");
      this._service.declineResponseProcedureAction(this.BeanProcedureAction.IDAction, this.txtDes).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this._messagge.showSuccess("Se rechazo el documento", "");
            this.txtDes = null;
            document.getElementById("btnCerrarModalG").click();
            document.getElementById("btnCerrarAprobacion").click();
          } else {
            this._messagge.showError("No se pudo rechazar el documento", "");
          }
        }
      );
    }
  }

  updateUSAmount2(event) {
    this.beanPlanNecesidad.TotalValue = event.target.value;
  }
  abrirModalRubro() {
    document.getElementById('btnModalInvestment').click();
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

  validarPlan() {

    if (this.beanPlanNecesidad.Type == null) {
      return this._messagge.showError("Por favor llene el campo Modalidad", "");
    }
    else if (this.beanPlanNecesidad.TotalValue == '') {
      return this._messagge.showError("Por favor llene el campo Valor total", "");
    }
    else if (this.beanPlanNecesidad.ItemType == '') {
      return this._messagge.showError("Por favor llene el campo Bien / Servicio", "");
    }
    else if (this.beanPlanNecesidad.IDLogisticUnit == '') {
      return this._messagge.showError("Por favor llene el campo Unidad centralizadora logistica", "");
    }
    else if (this.beanPlanNecesidad.IDLnFunctionalID == '') {
      return this._messagge.showError("Por favor llene el campo Unidad beneficiada", "");
    }
    else if (this.beanPlanNecesidad.IDReceivingUnit == '') {
      return this._messagge.showError("Por favor llene el campo Unidad receptor de bienes", "");
    }
    else if (this.beanPlanNecesidad.BudgetID == '') {
      return this._messagge.showError("Por favor llene el campoCodigo rubro presupuestal", "");
    }
    else if (this.beanPlanNecesidad.Address == '') {
      return this._messagge.showError("Por favor llene el campo Lugar de entrega (Dirección exacta)", "");
    }
    else if (this.beanPlanNecesidad.Justification == '') {
      return this._messagge.showError("Por favor llenar el campo Justificación", "");
    }
    else if (this.beanPlanNecesidad.MeasurementUnit == '') {
      return this._messagge.showError("Por favor llenar el campo MeasurementUnit", "");
    }
    else if (this.beanPlanNecesidad.MinQuantity == '') {
      return this._messagge.showError("Por favor llenar el campo MinQuantity", "");
    }
    else if (this.beanPlanNecesidad.Observations == '') {
      return this._messagge.showError("Por favor llenar el campo Observations", "");
    }
    else if (this.beanPlanNecesidad.RealQuantity == '') {
      return this._messagge.showError("Por favor llenar el campo RealQuantity", "");
    }
    else {
      this.agregar();
    }
  }
  agregar() {
    this.beanPlanNecesidad.IDBeneficiaryInvestment = this.beanBeneficiaryInvestment.IDBeneficiaryInvestment;

    console.log(this.beanPlanNecesidad);
    this._service.updateNeedsPlan(this.beanPlanNecesidad).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se añadió los campos", "");
          this.listarPlanes();
          this.initBean();
          this.nameUNitCL = "";
          this.nameUNitB = "";
          this.nameUNitRB = "";
          this.txtNameRubro = "";
          document.getElementById('btnCerrarQuintoModal').click();
        } else {
          this._messagge.showError("No se pudo añadir el plan", "");
        }
      }
    );
  }
  abrirEliminarDocumeto(beanDocumento) {
    this.BeanDocument = beanDocumento;
    console.log(this.BeanDocument);
  }
  confirmEliminar() {
    this._service.deleteNeedsPlanAttached(this.BeanDocument).subscribe(
      (resp: any) => {
        this.documentosLleandosAttach(this.beanPlanNecesidad.IDNeedsPlan);
        this._messagge.showInfo("Se elimino el registro", "");
        document.getElementById('btnCerrarElim').click();
      }
    );
  }
  confirmEliminarInvest() {
    this._service.deleteInvestmentPlanAttached(this.BeanDocument).subscribe(
      (resp: any) => {
        this.documentosLleandosAttachInves(this.beanPlanNecesidad2.IDInvestmentPlan);
        this._messagge.showInfo("Se elimino el registro", "");
        // document.getElementById('btnCerrarElim').click();
      }
    );
  }
  listarUnidadesLogisticas() {
    this._service2.getListLogistic().subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listaUnidadesLog = resp.DataBeanProperties.ObjectValue;
        } else {
          this._messagge.showWarning("No hay unidades logisticas", "");
        }
      } else {
        this._messagge.showError("No se pudieron listar las unidades logisticas", "");
      }
    });
  }
  obtenerBudget() {
    document.getElementById('btnModalRubroP').click();
  }
  getBudget(bean) {
    console.log(bean);
    this.beanPlanNecesidad2.BudgetID = bean.IDLn;
    // this.beanPlanNecesidad.BudgetIDName = bean.Name;
    this.beanPlanNecesidad2.BudgetCode = bean.BudgetCode;
    this.beanPlanNecesidad2.BudgetIDName = bean.Name;

  }
  generarxls() {
    this._service2.createBeneficiaryReport(this.beanBeneficiary.DataBeanProperties.IDBeneficiary).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        console.log(resp.DataBeanProperties.ObjectValue);
        let reporte = resp.DataBeanProperties.ObjectValue;
        window.open(reporte[0].DataBeanProperties.URLLink, "_blank");
      } else {
        this._messagge.showError("No se pudo generar el reporte", "");
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
  anadirAnexo() {
    console.log(this.BeanProcedureAction.IDAction, this.txtNombre, this.anexoMedia, this.anexoMediaContext, this.txtDescripcion);
    this._service.addAttachmentToProcedureAction(this.BeanProcedureAction.IDAction, this.txtNombre, this.anexoMedia, this.anexoMediaContext, this.txtDescripcion).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se guardo el anexo", "");
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
    this._service.getAttachedDocumentCatalog(this.BeanProcedureAction.IDAction).subscribe((resp: any) => {
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
  validarSub() {
    if (this.beanPlanNecesidad2.TotalValue == '') {
      return this._messagge.showError("Por favor llene el campo Valor del rubro", "");
    }
    else if (this.beanPlanNecesidad2.Justification == '') {
      return this._messagge.showError("Por favor llenar el campo Descripción de la Necesidad", "");
    }

    else if (this.beanPlanNecesidad2.MeasurementUnit == '') {
      return this._messagge.showError("Por favor llenar el campo Unidad de Medida", "");
    }
    else if (this.beanPlanNecesidad2.MinQuantity == '') {
      return this._messagge.showError("Por favor llenar el campo Cantidad Minima", "");
    }
    else if (this.beanPlanNecesidad2.RealQuantity == '') {
      return this._messagge.showError("Por favor llenar el campo Cantidad Real", "");
    }
    else if (this.beanPlanNecesidad2.Observations == '') {
      return this._messagge.showError("Por favor llenar el campo Observaciones", "");
    }
    else {
      this.guardarSub();
    }
  }

  validarNeedsPlan() {
    this._service.isValidInvestmentPlan(this.beanPlanNecesidad2.IDNeedsPlan).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        // this._messagge.showSuccess("Se valido el plan", "");

      } else {
        let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
        this._messagge.showError("No se puede agregar debido a: " + error, "");

      }
    })
  }

  guardarSub() {
    console.log("a guardar", this.beanPlanNecesidad2);
    this._service.updateInvestmentPlan(this.beanPlanNecesidad2).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se guardo", "");
          this.listarSubPlanes(this.beanPlanNecesidad2.IDNeedsPlan);
          // this.beanPlanNecesidad2 = resp.DataBeanProperties.ObjectValue.DataBeanProperties;
          this.beanPlanNecesidad2.TotalValue = '';
          this.beanPlanNecesidad2.Justification = '';
          this.beanPlanNecesidad2.MeasurementUnit = '';
          this.beanPlanNecesidad2.MinQuantity = '';
          this.beanPlanNecesidad2.RealQuantity = '';
          this.beanPlanNecesidad2.Observations = '';
          this.beanPlanNecesidad2.IDInvestmentPlan = null;
          this.validarNeedsPlan();
          this.listarSubPlanes(this.beanPlanNecesidad.IDNeedsPlan);
          document.getElementById('btnCerrarQuintoModal').click();
        } else {
          this._messagge.showError("No se pudo guardar", "");
        }
      }
    );
  }
  listarSubPlanes(idNeedsPlan) {
    this._service.getInvestmentPlanCatalog(idNeedsPlan).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listaSubPlanes = resp.DataBeanProperties.ObjectValue;
          this.suma = 0;
          this.listaSubPlanes.forEach(element => {
            console.log(element.DataBeanProperties.TotalValue);
            this.suma += element.DataBeanProperties.TotalValue;
          });
          this.disponible = this.beanPlanNecesidad.TotalValue - this.suma;
          console.log(this.disponible);

        } else {
          this.beanPlanNecesidad.Type == 0 ? this.disponible = this.cbRubroCap.AgreementMoneyValue : this.disponible = this.cbRubroCap.AgreementSpeciesValue;
          this.listaSubPlanes = [];
          this._messagge.showWarning("Aun no hay datos", "");
        }
      } else {
        this._messagge.showError("No se pudo listar los datos de este plan de inversiones", "");
        this.listaSubPlanes = [];

      }
    })
  }
  eliminarSubPlan(id) {
    this._service.deleteInvestmentPlan(id).subscribe((resp: any) => {
      if (resp.DataBeanProperties) {
        this._messagge.showInfo("Se elimino el registro", "");
        this.listarSubPlanes(this.beanPlanNecesidad.IDNeedsPlan);
      } else {
        this._messagge.showError("No se pudo eliminar el registro", "");
      }
    })
  }
  formatearPlata(value) {
    return this.pipe.transform(value, 'COP ', true, '3.0');
  }

  aprobarPlanSeguimiento() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateNeedsPlanForTracing(this.beanPlanNecesidad.IDNeedsPlan, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarPlanes();
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se aprobo el plan de inverisones", "");
          this.cambiarEstado(2, this.beanPlanNecesidad.IDNeedsPlan)
          // document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones", "");
        }
      });
    }
  }
  rechazarPlanSeguimiento() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateNeedsPlanForTracing(this.beanPlanNecesidad.IDNeedsPlan, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarPlanes();
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se rechazo el plan de inverisones", "");
          document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede rechazar el plan de inversiones", "");
        }
      });
    }
  }
  aprobarPlanInvestement() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateInvestmentPlanForTracing(this.beanPlanNecesidad2.IDInvestmentPlan, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.txtDescripcion = "";
          this.listarSubPlanes(this.beanPlanNecesidad.IDNeedsPlan);
          this.cambiarEstadoRubro(2, this.beanPlanNecesidad2.IDInvestmentPlan);
          this._messagge.showSuccess("Se aprobo el plan de inverisones por rubro", "");
          document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones por rubro", "");
        }
      });
    }
  }
  rechazarPlanInvestment() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateInvestmentPlanForTracing(this.beanPlanNecesidad2.IDInvestmentPlan, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.txtDescripcion = "";
          this.listarSubPlanes(this.beanPlanNecesidad.IDNeedsPlan);
          this._messagge.showSuccess("Se rechazo el plan de inverisones por rubro", "");
          document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede rechazar el plan de inversiones por rubro", "");
        }
      });
    }
  }
  cambiarEstado(tipo, id) {
    let aprroved: boolean;
    tipo == 1 ? aprroved = true : aprroved = false;
    this._service.markNeedsPlanForCompliance(id, aprroved, "", this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listarPlanes();
      } else {
        this._messagge.showError("No se pudo hacer la accion", "");
      }
    });
  }
  cambiarEstadoRubro(tipo, id) {
    let aprroved: boolean;
    tipo == 1 ? aprroved = true : aprroved = false;
    this._service.markInvestmentPlanForCompliance(id, aprroved, "", this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listarSubPlanes(this.beanPlanNecesidad2.IDNeedsPlan);
      } else {
        this._messagge.showError("No se pudo hacer la accion", "");
      }
    });
  }
  aprPEjecucion() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.markNeedsPlanForManageable(this.beanPlanNecesidad.IDNeedsPlan, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarPlanes();
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se aprobo el plan de inverisones por rubro", "");
          document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones por rubro", "");
        }
      });
    }
  }
  recPEjecucion() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.markNeedsPlanForManageable(this.beanPlanNecesidad.IDNeedsPlan, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarPlanes();
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se aprobo el plan de inverisones por rubro", "");
          document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones por rubro", "");
        }
      });
    }
  }
  aprInEjecucion() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.markInvestmentPlanForManageable(this.beanPlanNecesidad2.IDInvestmentPlan, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.txtDescripcion = "";
          this.listarSubPlanes(this.beanPlanNecesidad2.IDNeedsPlan);
          this._messagge.showSuccess("Se aprobo el plan de inverisones por rubro Ejecucion", "");
          // document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones por rubro Ejecucion", "");
        }
      });
    }
  }
  recInjecucion() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.markInvestmentPlanForManageable(this.beanPlanNecesidad2.IDInvestmentPlan, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.txtDescripcion = "";
          this.listarSubPlanes(this.beanPlanNecesidad2.IDNeedsPlan);
          this._messagge.showSuccess("Se aprobo el plan de inverisones por rubro", "");
          // document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones por rubro", "");
        }
      });
    }
  }
  listarBeneficiarioByAgreement() {
    this._service2.getListBeneficiary(this.BeanAgreement.IDAgreement).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listaBeneficiarios = resp.DataBeanProperties.ObjectValue;
        } else {
          this._messagge.showWarning("Este convenio aun no tiene beneficiarios", "");
        }
      } else {
        this._messagge.showError("No se pudieron listar los beneficiarios", "");
      }
    })
  }
  aproPLiqui() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateNeedsPlanForEnding(this.beanPlanNecesidad.IDNeedsPlan, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarPlanes();
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se aprobo el plan de inverisones", "");
          // document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones", "");
        }
      });
    }
  }
  rechaPLiqui() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateNeedsPlanForEnding(this.beanPlanNecesidad.IDNeedsPlan, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listarPlanes();
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se rechazo el plan de inverisones", "");
          document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede rechazar el plan de inversiones", "");
        }
      });
    }
  }

  aproILiqui() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateInvestmentPlanForEnding(this.beanPlanNecesidad2.IDInvestmentPlan, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.txtDescripcion = "";
          this.listarSubPlanes(this.beanPlanNecesidad2.IDNeedsPlan);
          this._messagge.showSuccess("Se aprobo el plan de inverisones por rubro Ejecucion", "");
          // document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones por rubro Ejecucion", "");
        }
      });
    }
  }
  rechaILiqui() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.validateInvestmentPlanForEnding(this.beanPlanNecesidad2.IDInvestmentPlan, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.txtDescripcion = "";
          this.listarSubPlanes(this.beanPlanNecesidad2.IDNeedsPlan);
          this._messagge.showSuccess("Se aprobo el plan de inverisones por rubro", "");
          // document.getElementById('btnCerrar').click();
        } else {
          this._messagge.showError("No se puede aprobar el plan de inversiones por rubro", "");
        }
      });
    }
  }

  preAproAtachedSeguimiento() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.markNeedsPlanAttachedForCompliance(this.BeanDocument.IDNeedsPlanAttached, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentosLleandosAttach(this.BeanDocument.IDNeedsPlan);
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se pre Aprobo el Documento", "");
        } else {
          this._messagge.showError("No se puede pre Aprobar el plan de inversiones", "");
        }
      });
    }
  }
  preRechAtachedSeguimiento() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.markNeedsPlanAttachedForCompliance(this.BeanDocument.IDNeedsPlanAttached, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentosLleandosAttach(this.BeanDocument.IDNeedsPlan);
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se rechazo el documento ", "");
        } else {
          this._messagge.showError("No se puede rechazar el documento", "");
        }
      });
    }
  }
  preAproAtachedInvSeguimiento() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.markInvestmentPlanAttachedForCompliance(this.BeanDocument.IDInvestmentPlanAttached, true, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentosLleandosAttachInves(this.BeanDocument.IDInvestmentPlan);
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se pre Aprobo el Documento", "");
        } else {
          this._messagge.showError("No se puede pre Aprobar el plan de inversiones", "");
        }
      });
    }
  }
  preRechAtachedInvSeguimiento() {
    if (this.txtDescripcion == null || this.txtDescripcion == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
    } else {
      this._service.markInvestmentPlanAttachedForCompliance(this.BeanDocument.IDInvestmentPlanAttached, false, this.txtDescripcion, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.documentosLleandosAttachInves(this.BeanDocument.IDInvestmentPlan);
          this.txtDescripcion = "";
          this._messagge.showSuccess("Se rechazo el documento ", "");
        } else {
          this._messagge.showError("No se puede rechazar el documento", "");
        }
      });
    }
  }
}