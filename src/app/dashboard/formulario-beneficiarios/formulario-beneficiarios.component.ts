import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { MessageService } from 'src/app/providers/message.service';
// import { DocumentosXResponderComponent } from '../documentos-x-responder/documentos-x-responder.component';

@Component({
  selector: 'app-formulario-beneficiarios',
  templateUrl: './formulario-beneficiarios.component.html',
  styleUrls: ['./formulario-beneficiarios.component.css']
})
export class FormularioBeneficiariosComponent implements OnInit {
  areaFuncional: number;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  nameUNit: string;
  @Input() BeanAgreement: any;
  @Input() BeanProcedureAction: any;

  listaBene = [];
  IDFuncionalIDLn: number;
  valorEspecies = "";
  valorDinero = "";
  txtDes: any;
  idDelete: number;
  aux: any;
  IDUnitBeneficiary: any;
  nameUNitBeneficiary: string;
  fuerza: number;
  constructor(private _service: DicoService,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _dicco2: Dicco2Service) { }

  ngAfterViewInit() {
    this.listarTabla();
  }
  ngOnInit(): void {
    console.log(this.BeanAgreement);
  }
  getUnit(id: number) {
    console.log(id);
    this.IDFuncionalIDLn = id;
  }
  getUnitM(id: number) {
    console.log(id);
    this.IDUnitBeneficiary = id;
  }
  getNameUnitM(name: string) {
    console.log(name);
    this.nameUNitBeneficiary = name;
  }
  getNameUnit(name: string) {
    console.log(name);
    this.nameUNit = name;
  }
  getFuerza(fuerza:number){
    this.fuerza = fuerza;
  }
  updateUSAmount(event) {
    this.valorDinero = event.target.value;
  }
  updateUSAmount2(event) {
    this.valorEspecies = event.target.value;
  }
  abirModalUnidad() {
    document.getElementById('btnModalUnidad').click();
  }
  abirModalUnidadMilitar() {
    document.getElementById('btnModalUnidadMilitar').click();

  }


  config2 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm modal-dialog-centered'
  };
  config3 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl '
  };

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef2 = this._modalService.show(template, this.config2);
  }
  openCrear(template: TemplateRef<any>) {
    this.modalRef2 = this._modalService.show(template, this.config3);
  }

  abrirEditar(template: TemplateRef<any>, bean) {
    console.log(bean);
    
    this.IDUnitBeneficiary = bean.IDLnUnidadMilitar;
    this.IDFuncionalIDLn = bean.IDLnFunctionalID;
    this.nameUNit = bean.Name;
    this.nameUNitBeneficiary = bean.Sigla;
    this.fuerza = bean.Fuerza;
    this.valorDinero = bean.AgreementMoneyValue;
    this.valorEspecies = bean.AgreementSpeciesValue;
    this.modalRef2 = this._modalService.show(template, this.config3);
  }

  cerrar() {
    this.modalRef2.hide();
    this.limpiar();
  }

  validarBene() {
    if (this.IDFuncionalIDLn == null) {
      return this._messagge.showError("Por favor llene el campo Unidad", "");
    }
    // else if (this.valorDinero == null) {
    //   return this._messagge.showError("Por favor llene el campo Valor en dinero", "");
    // }
    // else if (this.valorEspecies == null) {
    //   return this._messagge.showError("Por favor llene el campo Valor en especie", "");
    // }
    else {
      this.addBeneficiario();
    }
  }
  addBeneficiario() {
    // console.log("IDAgreemente", this.BeanAgreement.IDAgreement,
    //   "unidad beneficiaria", this.IDUnitBeneficiary,
    //   "Unidad Responsable", this.IDFuncionalIDLn,
    //   "Valor en especies", this.valorEspecies,
    //   "Valor en dinero", this.valorDinero);


    this._service.addBeneficiaryToAgreement(this.BeanAgreement.IDAgreement, this.IDFuncionalIDLn, this.IDUnitBeneficiary,this.fuerza, this.valorEspecies, this.valorDinero).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          console.log(resp);

          this._messagge.showSuccess("Se agrego un beneficiario", "");
          this.listarTabla();
          // this.IDFuncionalIDLn = null;
          // this.valorDinero = null;
          // this.valorEspecies = null;
          // this.nameUNit = null;
          // this.modalRef2.hide();
          this.cerrar();
        } else {
          let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
          this._messagge.showError("No se puede agregar debido a: " + error, "");
        }
      }
    );
  }
  listarTabla() {
    this._service.getBeneficiaryCatalogByAgreementUno(this.BeanAgreement.IDAgreement).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          console.log(resp.DataBeanProperties.ObjectValue);

          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaBene = resp.DataBeanProperties.ObjectValue;
            console.log(this.listaBene);
          } else {
            this._messagge.showWarning("No tiene beneficiarios aun", "");

            this.listaBene = [];
          }
        } else {
          this._messagge.showError("No se pudo consultar la tabla", "");
        }
      }
    );
  }
  total = (num1, num2) => { return num1 + num2 }
  aprobar() {
    if (this.txtDes == '' || this.txtDes == null) {
      return this._messagge.showError("Llene el campo de descripción", "");
    } else {
      this._service.responseProcedureAction(this.BeanProcedureAction.IDAction, this.txtDes).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this._messagge.showSuccess("Se aprobo el documento", "");
            this.txtDes = null;
            document.getElementById("btnCerrarModalG").click();
          } else {
            let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
            this._messagge.showError("No se puede agregar debido a: " + error, "");
          }
        }
      );
    }
  }
  btnEditar(bean) {
    console.log(bean);

  }
  rechazar() {
    if (this.txtDes == '' || this.txtDes == null) {
      return this._messagge.showError("Llene el campo de descripción", "");
    } else {
      this._service.declineResponseProcedureAction(this.BeanProcedureAction.IDAction, this.txtDes).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this._messagge.showSuccess("Se rechazo el documento", "");
            this.txtDes = null;
            document.getElementById("btnCerrarAprobacion").click();
            document.getElementById("btnCerrarModalG").click();
          } else {
            this._messagge.showError("No se pudo rechazar el documento", "");
          }
        }
      );
    }
  }

  deleteBeneficiary() {
    this._dicco2.deleteBeneficiary(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this._messagge.showSuccess('El item ha sido eliminado correctamente', 'Item');
      this.listarTabla();
      this.cerrar();
    });
  }
  limpiar() {
    this.IDUnitBeneficiary = "";
    this.IDFuncionalIDLn = null;
    this.nameUNitBeneficiary = "";
    this.nameUNit = "";
    this.valorDinero = "";
    this.valorEspecies = "";
  }
}
