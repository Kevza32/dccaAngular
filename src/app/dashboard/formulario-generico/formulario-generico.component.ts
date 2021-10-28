import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DicoService } from 'src/app/providers/dico.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-formulario-generico',
  templateUrl: './formulario-generico.component.html',
  styleUrls: ['./formulario-generico.component.css']
})
export class FormularioGenericoComponent implements OnInit {
  @Input() IdAction: number;
  @Input() IdProcedureImp: number;
  @Input() IdStage: number;
  @Input() BeanAgreement: any;

  @Output() resultadoForm = new EventEmitter<string>();
  txtNit: any;
  cuenta: any;
  aConsultar: any;
  txtPersonaCon: string;
  txtEmpresa: string;
  txtRepresentanteLE: string;
  beanAgreement: any;
  sesion: any;
  respuesta: any;
  fecha = new Date();
  anio: number;
  listAnios = [];
  vistaBtnNewUser: boolean = false;
  beanAccount: any;
  constructor(private _service: DicoService,
    private _messagge: MessageService) { }

  ngOnInit(): void {
    this.sesion = JSON.parse(localStorage.getItem('usuario'));
    this.initBeanAgreement();
    this.initBeanAccount();
    this.anio = this.fecha.getFullYear();
    this.initAnios();
    console.log(this.IdAction,
      this.IdProcedureImp,
      this.IdStage);
    if (this.BeanAgreement) {
      this.beanAgreement = this.BeanAgreement;
      console.log(this.beanAgreement);
      this.txtEmpresa = this.beanAgreement.AccountName;
      this.txtRepresentanteLE = this.beanAgreement.ResponsibleName;
      this.txtPersonaCon = this.beanAgreement.ContactName;
      this.beanAgreement.SubscriptionDate = this.beanAgreement.SubscriptionDate.slice(0, 10);
    }
  }
  initAnios() {
    for (let index = 2015; index < this.anio + 5; index++) {
      this.listAnios.push(index)
    }
  }
  initBeanAgreement() {
    this.beanAgreement = {
      IDAgreement: null,
      IDSector: '',
      IDAccount: '',
      IDResponsible: '',
      IDContact: '',
      EntityName: '',
      Consecutive: '',
      ValidityYear: '',
      SubscriptionDate: '',
      FinishDate: '',
      AgreementSpeciesValue: '',
      AgreementMoneyValue: '',
      IDStage: this.IdStage,
      IDAction: this.IdAction,
      IDProcedureImp: this.IdProcedureImp
    }
  }
  initBeanAccount() {
    this.beanAccount = {
      Nit: '',
      Name1: '',
      Name2: '',
      Surname1: '',
      Surname2: '',
      Address: '',
      Tel: '',
      eMail: '',
      IDAccount: null
    }
  }
  validar() {
    if (this.beanAgreement.IDSector == '') {
      this._messagge.showError("Por favor llene el campo Sector", "");
    }
    else if (this.beanAgreement.IDAccount == '') {
      this._messagge.showError("Por favor llene el campo Empresa", "");
    }
    else if (this.beanAgreement.IDResponsible == '') {
      this._messagge.showError("Por favor llene el campo Representante Legal", "");
    }
    else if (this.beanAgreement.IDContact == '') {
      this._messagge.showError("Por favor llene el campo Persona contacto", "");
    }
    // else if (this.beanAgreement.Consecutive == '') {
    //   this._messagge.showError("Por favor llene el campo Número de convenio ministerio", "");
    // }
    // else if (this.beanAgreement.SubscriptionDate == '') {
    //   this._messagge.showError("Por favor llene el campo Fecha de suscripción", "");
    // }
    // else if (this.beanAgreement.FinishDate == '') {
    //   this._messagge.showError("Por favor llene el campo Fecha de finalización suscripción", "");
    // }
    // else if (this.beanAgreement.AgreementSpeciesValue == '') {
    //   this._messagge.showError("Por favor llene el campo Valor aporte especie", "");
    // }
    // else if (this.beanAgreement.AgreementMoneyValue == '') {
    //   this._messagge.showError("Por favor llene el campo Valor aporte dinero", "");
    // }
    else {
      this.guardar();
    }
  }
  guardar() {
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
          console.log(resp.DataBeanProperties.ObjectValue);
          this.enviarBpm(resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDAction);
          this._messagge.showSuccess("Se guardo correctamente", "");
        } else {
          this._messagge.showError("No se pudo guardar", "");
        }
      });
  }
  buscarEmpre() {
    this._service.getAccountByNit(this.txtNit).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        console.log(resp.DataBeanProperties.ObjectValue);

        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.cuenta = resp.DataBeanProperties.ObjectValue[0];
          this.vistaBtnNewUser = false;
        } else {
          this._messagge.showWarning("no se encontraron resultados", "");
          this.vistaBtnNewUser = true;

        }
      } else {
        this._messagge.showError("No se pudo consultar el Nit/cédula", "");
      }
    })
  }
  tipoSeleccion(numero) {
    this.aConsultar = numero
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
    if (this.aConsultar == 1) {
      console.log(beanAccount);
      this.txtEmpresa = `${beanAccount.Name1} ${beanAccount.Name2} ${beanAccount.Surname1} ${beanAccount.Surname2}`;
      this.beanAgreement.IDAccount = beanAccount.IDAccount;
      this.beanAgreement.EntityName = `${beanAccount.Name1} ${beanAccount.Name2} ${beanAccount.Surname1} ${beanAccount.Surname2}`;
      //empresa
    } else if (this.aConsultar == 2) {
      console.log(beanAccount);
      this.txtRepresentanteLE = `${beanAccount.Name1} ${beanAccount.Name2} ${beanAccount.Surname1} ${beanAccount.Surname2}`;
      this.beanAgreement.IDResponsible = beanAccount.IDAccount;
      // representanteL
    } else if (this.aConsultar == 3) {
      this.txtPersonaCon = `${beanAccount.Name1} ${beanAccount.Name2} ${beanAccount.Surname1} ${beanAccount.Surname2}`;
      this.beanAgreement.IDContact = beanAccount.IDAccount;
      console.log(beanAccount);
      // Persona contacto
    }
  }

  // seleccionar() {
  //   if (this.cuenta != null) {
  //     if (this.aConsultar == 1) {
  //       this.txtEmpresa = `${this.cuenta.DataBeanProperties.Name1} ${this.cuenta.DataBeanProperties.Name2} ${this.cuenta.DataBeanProperties.Surname1} ${this.cuenta.DataBeanProperties.Surname2}`;
  //       this.beanAgreement.IDAccount = this.cuenta.DataBeanProperties.IDAccount;
  //       console.log("empresa");
  //     } else if (this.aConsultar == 2) {
  //       this.txtRepresentanteLE = `${this.cuenta.DataBeanProperties.Name1} ${this.cuenta.DataBeanProperties.Name2} ${this.cuenta.DataBeanProperties.Surname1} ${this.cuenta.DataBeanProperties.Surname2}`
  //       this.beanAgreement.IDResponsible = this.cuenta.DataBeanProperties.IDAccount;
  //       console.log("representante L");
  //     } else if (this.aConsultar == 3) {
  //       this.txtPersonaCon = `${this.cuenta.DataBeanProperties.Name1} ${this.cuenta.DataBeanProperties.Name2} ${this.cuenta.DataBeanProperties.Surname1} ${this.cuenta.DataBeanProperties.Surname2}`
  //       this.beanAgreement.IDContact = this.cuenta.DataBeanProperties.IDAccount;
  //       console.log("persona contacto");
  //     }
  //     this.txtNit = '';
  //     this.cuenta = null;
  //     document.getElementById('cerrarM').click();
  //   } else {
  //     document.getElementById('cerrarM').click();
  //     this.txtNit = '';
  //     this.cuenta = null;
  //   }
  // }

  enviarBpm(idAction) {
    this._service.submitBpm(idAction).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se envio", "");
          console.log(resp.DataBeanProperties.ObjectValue);
          this.respuesta = resp.DataBeanProperties.ObjectValue;
          document.getElementById('btnCerrarP').click();
        } else {
          this._messagge.showError("no se pudo enviar", "");
        }
      }
    );
  }
  updateUSAmount(event) {
    this.beanAgreement.AgreementSpeciesValue = event.target.value;
  }
  updateUSAmount2(event) {
    this.beanAgreement.AgreementMoneyValue = event.target.value;
  }
  ngOnDestroy(): void {
    this.resultadoForm.emit(this.respuesta);
  }

  // crearUsuario() {
  //   this._service.createAccount(this.beanAccount).subscribe(
  //     (resp: any) => {
  //       if (resp.DataBeanProperties.ObjectValue) {
  //         this._messagge.showSuccess("Se creo el usuario", "");
  //         document.getElementById("btnCerrarNewUser").click();
  //       } else {
  //         this._messagge.showError("No se pudo crear el usuario", "");
  //       }
  //     }
  //   );
  // }

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
          this._messagge.showSuccess("Se edito correctamente", "");
          this.aprobar();
        } else {
          this._messagge.showError("No se pudo guardar", "");
        }
      });
  }


  aprobar() {

    this._service.responseProcedureAction(this.IdAction, "Ok").subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this._messagge.showSuccess("Se aprobo el documento", "");
          // document.getElementById("btnCerrarAprobacion").click();
          document.getElementById("btnCerrarModalG").click();
        } else {
          let error = resp.DataBeanProperties.ErrorMessage.replace(/<[^>]*>?/g, '');
          this._messagge.showError("No se puede agregar debido a: " + error, "");
        }
      }
    );
  }
}
