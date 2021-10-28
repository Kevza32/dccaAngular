import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DicoService } from 'src/app/providers/dico.service';
import { MessageService } from 'src/app/providers/message.service';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { FileService } from 'src/app/providers/file.service';

@Component({
  selector: 'app-formulario-plan-necesidad',
  templateUrl: './formulario-plan-necesidad.component.html',
  styleUrls: ['./formulario-plan-necesidad.component.css']
})
export class FormularioPlanNecesidadComponent implements OnInit {
  @Input() BeanAgreement: any;
  @Input() BeanProcedureAction: any;
  @Input() Historial = false;
  @Input() beanBeneficiary: any;
  tablaBeneInve: any;
  beanBeneficiaryInvestment: any;
  listaDePlanes: any;
  IDFuncionalIDLn: number;
  uniAux: any;
  nameUNitCL: any;
  nameUNitB: string;
  nameUNitRB: string;
  beanPlanNecesidad: any;
  txtNameRubro: any;
  txtDes: any;
  listaAux = [];
  idBeneficiario: any;
  beanPlanNecesidadesq: any;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };
  listaBeneficiarios: any;
  cbRubroCap: any;
  listaUnidadesLog: any;
  txtEmpresa: string;
  sesion: any;
  anexoMediaContext: any;
  anexoMedia: any;
  nombreArchivo: any;
  txtNombre: any;
  txtDescripcion: any;
  listaAnexos: any;
  constructor(private _service: DicoService,
    private _modalService: BsModalService,
    private _messagge: MessageService,
    private _service2: Dicco2Service,
    private file: FileService) { }

  ngOnInit(): void {
    console.log("this.BeanAgreement", this.BeanAgreement);
    console.log("this.BeanProcedureAction", this.BeanProcedureAction);
    this.initBean();
    this.listaAux[0] = "Dinero";
    this.listaAux[1] = "Especie";
    this.listaAux[2] = "Bien";
    this.listaAux[3] = "Servicio";
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    console.log();
    this.idBeneficiario = this.beanBeneficiary;

  }
  initBean() {
    this.beanPlanNecesidad = {
      IDNeedsPlan: null,
      Type: null,
      ItemType: '',
      IDLnFunctionalID: '',
      TotalValue: '',
      IDLogisticUnit: '',
      // IDReceivingUnit: '',
      IDAccountSupplier: '',
      Address: '',
      IDBeneficiaryInvestment: '',
      BudgetID: ''
    }
  }
  ngAfterViewInit(): void {
    // this.obtnenerBeneficiario();
    this.beanBeneficiary == null ?
      this.listarBeneficiario() :
      this.obtenerListaArticulosPporBeneficiary();

  }
  listarBeneficiario() {
    console.log(this.BeanProcedureAction);
    console.log(this.BeanAgreement)
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
  obtnenerBeneficiario() {

    this.beanPlanNecesidad.Type = null;
    this.cbRubroCap = null;
    this.beanBeneficiaryInvestment = null;
    this._service.getBeneficiary(this.BeanAgreement.IDAgreement, this.BeanProcedureAction.IDLnFunctionalID, this.idBeneficiario.IDLnUnidadMilitar).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.beanBeneficiary = resp.DataBeanProperties.ObjectValue.DataBeanProperties;
          console.log(this.beanBeneficiary);

          this.obtenerListaArticulosPporBeneficiary()
        } else {
          this._messagge.showError("No se pudo obtener el beneficiario", "");
        }
      }
    );
  }
  obtenerListaArticulosPporBeneficiary() {
    this._service.getBeneficiaryInvestmentCatalogByBeneficiary(this.beanBeneficiary.IDBeneficiary).subscribe(
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
    this.beanPlanNecesidad.Type = null;
    this.beanPlanNecesidad.IDLnFunctionalID = this.idBeneficiario.IDLnUnidadMilitar;
    this.beanBeneficiaryInvestment = bean;
    // this.listarPlanes();
  }
  listarPlanes() {
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
  updateUSAmount2(event) {
    this.beanPlanNecesidad.TotalValue = event.target.value;
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

  abrirModalRubro() {
    document.getElementById('btnModalInvestment').click();
  }
  getInvestment(id) {
    this.beanPlanNecesidad.BudgetID = id;
  }
  getNameInvestment(name) {
    this.txtNameRubro = name
  }
  getCode(code) {
    this.beanPlanNecesidad.BudgetCode = code;
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
    // else if (this.beanPlanNecesidad.IDLogisticUnit == '') {
    //   return this._messagge.showError("Por favor llene el campo Unidad centralizadora logistica", "");
    // }
    else if (this.beanPlanNecesidad.IDLnFunctionalID == '') {
      return this._messagge.showError("Por favor llene el campo Unidad beneficiada", "");
    }
    // else if (this.beanPlanNecesidad.IDReceivingUnit == '') {
    //   return this._messagge.showError("Por favor llene el campo Unidad receptor de bienes", "");
    // }
    else if (this.beanPlanNecesidad.BudgetID == '') {
      return this._messagge.showError("Por favor llene el campo Codigo rubro presupuestal", "");
    }
    else if (this.beanPlanNecesidad.Address == '') {
      return this._messagge.showError("Por favor llene el campo Lugar de entrega (Dirección exacta)", "");
    } else {
      this.agregar();
    }

  }

  agregar() {


    this.beanPlanNecesidad.IDBeneficiaryInvestment = this.beanBeneficiaryInvestment.IDBeneficiaryInvestment;
    console.log(this.beanPlanNecesidad);
    this._service.updateNeedsPlan(this.beanPlanNecesidad).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._service.validateNeedsPlanSum(this.BeanAgreement.IDAgreement, this.BeanProcedureAction.IDLnFunctionalID).subscribe((resp: any) => {
            console.log(resp);

            if (resp.DataBeanProperties.ObjectValue) {
              this._messagge.showSuccess("Se agregó el plan", "");
              this.listarPlanes();
              this.modalRef.hide();
              this.initBean();
              this.nameUNitCL = "";
              this.nameUNitB = "";
              this.nameUNitRB = "";
              this.txtNameRubro = "";
              this.txtEmpresa = "";
            } else {
              let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
              this._messagge.showError("No se puede agregar debido a: " + error, "");
            }
          }
          );
        } else {
          let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
          this._messagge.showError("No se puede agregar debido a: " + error, "");

        }
      });
  }
  aprobar() {
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
  rechazar() {
    if (this.txtDes == null || this.txtDes == '') {
      this._messagge.showError("Por favor llene el campo Descripcion", "");
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
  abrirEliminarPlan(beanPlan) {
    this.beanPlanNecesidadesq = beanPlan;
    console.log(this.beanPlanNecesidadesq);
  }
  confirmEliminar() {
    this._service.deleteNeedsPlan(this.beanPlanNecesidadesq.IDNeedsPlan).subscribe((resp: any) => {
      this._messagge.showInfo("Se eli9mino el registro", "");
      document.getElementById('btnCerrarElim').click();
      this.listarPlanes();
    });
  }
  // btnCerrarElim


  abrirCrearPlan(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template, { class: 'modal-xl' });
    this.listarUnidadesLogisticas();
    this.beanPlanNecesidad.IDLnFunctionalID = this.idBeneficiario.IDLnUnidadMilitar;
  }
  listarUnidadesLogisticas() {
    this._service2.getListLogistic().subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listaUnidadesLog = resp.DataBeanProperties.ObjectValue;
        } else {
          this._messagge.showWarning("No hay unidades losgisticas", "");
        }
      } else {
        this._messagge.showError("No se pudieron listar las unidades logisticas", "");
      }
    });
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
    this.beanPlanNecesidad.IDAccountSupplier = beanAccount.IDAccount;
  }
  llenarForm(bean, template: TemplateRef<any>) {
    this.listarUnidadesLogisticas();
    this.beanPlanNecesidad = bean;
    this.txtNameRubro = bean.BudgetIDName;
    this.txtEmpresa = bean.SupplierName;
    this.modalRef = this._modalService.show(template, { class: 'modal-xl' });
  }
  cerrarM() {
    this.modalRef.hide();
    this.initBean();
    this.txtNameRubro = "";
    this.txtEmpresa = "";
  }
  abrirAprovacion(bean) {
    this.beanPlanNecesidad = bean;
  }
  abrirAprovacionVer(bean) {
    this.beanPlanNecesidad = bean;
    // this.beanPlanNecesidad.Observations  = this.txtDes;
  }
  aprobarPlan() {
    this._service.validateNeedsPlan(this.beanPlanNecesidad.IDNeedsPlan, true, this.txtDes, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se aprobó el registro", "");
        this.listarPlanes();
        document.getElementById('btnCerrar').click();
        this.txtDes = "";
      } else {
        this._messagge.showError("No se pudo aprobar el registro", "");
      }
    })
  }
  rechazarPlan() {
    this._service.validateNeedsPlan(this.beanPlanNecesidad.IDNeedsPlan, false, this.txtDes, this.sesion.DataBeanProperties.IDAccount).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se Rechazó el registro", "");
        this.listarPlanes();
        document.getElementById('btnCerrar').click();
        this.txtDes = "";
      } else {
        this._messagge.showError("No se pudo rechazar el registro", "");
      }
    })
  }
  getUrl(MediaContext, Media) {
    let url = this.file.getUrlFiles(MediaContext, Media);
    return url;
  }
  cargarAnexo(files: FileList) {
    this.file.postFile(files[0]).subscribe(
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

}
