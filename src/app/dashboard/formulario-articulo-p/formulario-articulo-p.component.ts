import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';
import { Dicco2Service } from 'src/app/providers/dicco2.service';

@Component({
  selector: 'app-formulario-articulo-p',
  templateUrl: './formulario-articulo-p.component.html',
  styleUrls: ['./formulario-articulo-p.component.css']
})
export class FormularioArticuloPComponent implements OnInit {
  @Input() BeanAgreement: any;
  @Input() BeanProcedureAction: any;
  @Input() idBeneficiario = null;
  @Input() Historial = false;
  idCapApoyo: any;
  idArticulo: any;
  valorDinero = 0;
  valorEspecies = 0;
  listaBeneficiarios: any;
  listaCap: any;
  listArticulos: any;
  listaDeBeneciariosT: any;
  txtDes: any;
  modalRef2: BsModalRef;
  idDelete: number;
  config3 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl '
  };
  constructor(private _service: DicoService,
    private _messagge: MessageService,
    private _fileService: FileService,
    private _modalService: BsModalService,
    private _dicco2: Dicco2Service) { }

  ngOnInit(): void {
    console.log("this.BeanAgreement", this.BeanAgreement);
    console.log("this.BeanProcedureAction", this.BeanProcedureAction);
    this.idBeneficiario == null ? this.listarBeneficiario() : this.listarTabla(); 
    this.listaCapituloApoyo();
    this.articulo();
  }
  updateUSAmount(event) {
    this.valorDinero = event.target.value;
  }
  updateUSAmount2(event) {
    this.valorEspecies = event.target.value;
  }
  config2 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm modal-dialog-centered'
  };

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef2 = this._modalService.show(template, this.config2);
  }

  cerrar() {
    this.modalRef2.hide();
    this.limpiar();
    this.listarTabla();
  }
  listarTabla() {
    this._service.getBeneficiaryInvestmentCatalogByBeneficiary(this.idBeneficiario.IDBeneficiary).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaDeBeneciariosT = resp.DataBeanProperties.ObjectValue;
            console.log(this.listaDeBeneciariosT);
          } else {
            this._messagge.showWarning("Aun no hay beneficiarios añadidos", "");
            this.listaDeBeneciariosT = [];
          }
        } else {
          this._messagge.showError("No se pudo cargar la tabla", "");
        }
      }
    );
  }
  listarBeneficiario() {
    this._service.getBeneficiaryCatalogByAgreementUno(this.BeanAgreement.IDAgreement).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaBeneficiarios = resp.DataBeanProperties.ObjectValue;
        } else {
          this._messagge.showError("No se pudo obtener la lista de beneficiarios", "");
        }
      }
    );
  }
  listaCapituloApoyo() {
    this._service.getChapterInvestmentByAgreement(this.BeanAgreement.IDAgreement).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaCap = resp.DataBeanProperties.ObjectValue;
        } else {
          this._messagge.showError("No se pudieron listar los capitulos", "");
        }
      })
  }
  articulo() {
    this._service.getBudgetArticleCatalog().subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listArticulos = resp.DataBeanProperties.ObjectValue;
        } else {
          this._messagge.showError("No se pudieron cargar los articulos", "");
        }
      }
    );
  }
  validarArticuloP() {
    // console.log("idBeneficiario", this.idBeneficiario);

    if (this.idBeneficiario.IDBeneficiary == null || this.idBeneficiario.IDBeneficiary == undefined) {
      return this._messagge.showError("Por favor llene el campo Beneficiario", "");
    }
    else if (this.idCapApoyo == '' || this.idCapApoyo == null || this.idCapApoyo == undefined) {
      return this._messagge.showError("Por favor llene el campo Capitulo de apoyo", "");
    }
    else if (this.idArticulo == '' || this.idArticulo == null || this.idArticulo == undefined) {
      return this._messagge.showError("Por favor llene el campo Articulo", "");
    }
    // else if (this.valorDinero == '' || this.valorDinero == null || this.valorDinero == undefined) {
    //   return this._messagge.showError("Por favor llene el campo Valor en Dinero", "");
    // }
    // else if (this.valorEspecies == '' || this.valorEspecies == null || this.valorEspecies == undefined) {
    //   return this._messagge.showError("Por favor llene el campo Valor en especie", "");
    // }
    else {
      this.agregarData();
    }
  }
  agregarData() {
    this._service.addBeneficiaryInvestment(this.idBeneficiario.IDBeneficiary, this.idCapApoyo, this.idArticulo, this.valorEspecies, this.valorDinero).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se agrego correctamente", "");
          this.cerrar();
          this.listarTabla();
        } else {
          let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
          this._messagge.showError("No se puede agregar debido a: " + error, "");
          // this._messagge.showError("No se pudo agregar", "");
        }
      }
    );
  }
  aprobar() {
    if (this.txtDes == null || this.txtDes == '') {
      this._messagge.showError("Por favor llene el campo Descripción", "");

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
    if (this.txtDes == null || this.txtDes == '') {
      this._messagge.showError("Por favor llene el campo Descripción", "");

    } else {
      this._service.declineResponseProcedureAction(this.BeanProcedureAction.IDAction, this.txtDes).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this._messagge.showSuccess("Se rechazo el documento", "");
            this.txtDes = null;
            document.getElementById("btnCerrarModalG").click();
            // document.getElementById("btnCerrarAprobacion").click();
          } else {
            this._messagge.showError("No se pudo rechazar el documento", "");
          }
        }
      );
    }
  }
  total = (num1, num2) => { return num1 + num2 }

  deleteArticulo() {
    this._dicco2.deleteArticulo(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this._messagge.showSuccess('El item ha sido eliminado correctamente', 'Item');
      this.listarTabla();
      this.cerrar();
    });
  }
  openCrear(template: TemplateRef<any>) {
    this.idBeneficiario ?
      this.modalRef2 = this._modalService.show(template, this.config3) :
      this._messagge.showWarning("Por favor seleccione un beneficiario antes de crear", "");
  }
  abrirEditar(template: TemplateRef<any>, bean) {
    this.modalRef2 = this._modalService.show(template, this.config3);
    this.idCapApoyo = bean.IDChapterInvestment;
    this.idArticulo = bean.IDBudgetArticle;
    this.valorEspecies = bean.AgreementSpeciesValue;
    this.valorEspecies == null ? this.valorEspecies = 0 : this.valorEspecies = this.valorEspecies;
    this.valorDinero = bean.AgreementMoneyValue;
    this.valorDinero == null ? this.valorDinero = 0 : this.valorDinero = this.valorDinero;
    console.log(bean);

  }
  limpiar() {
    this.idCapApoyo = '';
    this.idArticulo = '';
    this.valorEspecies = 0;
    this.valorDinero = 0;
  }
  tomarNombre(event) {
    console.log(event);

  }
}
