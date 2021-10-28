import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DicoService } from 'src/app/providers/dico.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-formulario-plan-inversion',
  templateUrl: './formulario-plan-inversion.component.html',
  styleUrls: ['./formulario-plan-inversion.component.css']
})
export class FormularioPlanInversionComponent implements OnInit {
  listCapApo: any;
  listaChap = [];
  cbxChapter: any;
  valorEspecies: any;
  valorDinero: any;
  modalRef2: BsModalRef;
  @Input() BeanAgreement: any;
  @Input() BeanProcedureAction: any;
  txtDes: any;
  beanChapter: any;
  config3 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl '
  };
  IDChapterInvestment: any;

  constructor(private _service: DicoService,
    private _modalService: BsModalService,
    private _messagge: MessageService) { }

  ngAfterViewInit(): void {
    this.listarTabla();
  }
  ngOnInit(): void {
    this.obtenerListaChapter();
    console.log(this.BeanAgreement);
    console.log(this.BeanProcedureAction);

  }
  obtenerListaChapter() {
    this._service.getChapterCatalog().subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listCapApo = resp.DataBeanProperties.ObjectValue
        } else {
          this._messagge.showError("no se pude traer lista de capitulo de apoyo", "");
        }
      }
    );
  }
  updateUSAmount(event) {
    this.valorDinero = event.target.value;
  }
  updateUSAmount2(event) {
    this.valorEspecies = event.target.value;
  }
  listarTabla() {
    this._service.getChapterInvestmentByAgreement(this.BeanAgreement.IDAgreement).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaChap = resp.DataBeanProperties.ObjectValue;
            console.log(this.listaChap);

          } else {
            this._messagge.showWarning("No tiene registros aun", "");
          }
        } else {

        }
      }
    );
  }
  validarPlanI() {
    if (this.cbxChapter == null) {
      return this._messagge.showError("Por favor llene este campo Capitulo de apoyo", "");
    }
    // else if (this.valorDinero == null) {
    //   return this._messagge.showError("Por favor llene este campo Valor en dinero", "");
    // }
    // else if (this.valorEspecies == null) {
    //   return this._messagge.showError("Por favor llene este campo Valor en especie", "");
    // }
    else {
      this.guardarChap();
    }
  }
  guardarChap() {
    // console.log(this.BeanAgreement.IDAgreement, this.cbxChapter, this.valorEspecies, this.valorDinero);
    this._service.addChapterInvestmentToAgreement(this.BeanAgreement.IDAgreement, this.cbxChapter, this.valorEspecies, this.valorDinero).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if(!this.IDChapterInvestment){
            this._messagge.showSuccess("Se agregó un plan de inversiones", "");
          }else{
            this._messagge.showSuccess("Se editó el plan de inversiones", "");
          }
          this.listarTabla();
          this.cerrar();
        } else {
          let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
          this._messagge.showError("No se puede agregar debido a: " + error, "");
        }
      }
    );
  }
  total = (num1, num2) => { return num1 + num2 }



  aprobar() {
    if (this.txtDes == null || this.txtDes == undefined || this.txtDes == '') {
      this._messagge.showError("Llene el campo Descripcion", "");
    } else {
      this._service.responseProcedureAction(this.BeanProcedureAction.IDAction, this.txtDes).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this._messagge.showSuccess("Se aprobo el documento", "");
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
    if (this.txtDes == null || this.txtDes == undefined || this.txtDes == '') {
      this._messagge.showError("Llene el campo Descripcion", "");
    } else {

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

  abrirEliminarCap(bean) {
    this.beanChapter = bean;
    console.log(this.beanChapter);

  }

  confirmEliminar() {
    this._service.deleteChapterInvestment(this.beanChapter).subscribe(
      (resp: any) => {
        this._messagge.showInfo("Se elimino el registro", "");
        document.getElementById('btnCerrar').click();
        this.listarTabla();
      }
    );
  }
  openCrear(template: TemplateRef<any>) {
    this.modalRef2 = this._modalService.show(template, this.config3);
  }
  abrirEditar( template: TemplateRef<any>,bean) {
    this.IDChapterInvestment = bean.IDChapterInvestment;
    this.cbxChapter = bean.IDChapter;
    this.valorDinero = bean.AgreementMoneyValue;
    this.valorEspecies = bean.AgreementSpeciesValue;
    this.modalRef2 = this._modalService.show(template, this.config3);
  }
  cerrar() {
    this.modalRef2.hide();
    this.limpiar();
  }

  limpiar() {
    this.IDChapterInvestment = null;
    this.cbxChapter = "";
    this.valorDinero = "";
    this.valorEspecies = "";
  }
}
