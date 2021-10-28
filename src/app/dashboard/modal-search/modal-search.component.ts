import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { MessageService } from 'src/app/providers/message.service';
import { QuickturnService } from 'src/app/providers/quickturn.service';

@Component({
  selector: 'app-modal-search',
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.css']
})
export class ModalSearchComponent implements OnInit {

  public modalRef2: BsModalRef;
  optionNit: any;
  optionFirst: any;
  optionLast: any;
  listAccount: any[];
  beanAccount: any;
  @Output() account: EventEmitter<any> = new EventEmitter();

  constructor(private searchService: QuickturnService,
    public modalService: BsModalService,
    private message: MessageService, private _service: DicoService) { }

  ngOnInit(): void {
    this.initBeanAccount();
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
      IDAccount: ''
    }
  }
  initBeanAccountC() {
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

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };

  openSearch(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, this.config);
    console.log("abrio");

  }

  cerrar() {
    this.modalRef2.hide();
    this.optionNit = '';
    this.optionFirst = '';
    this.optionLast = '';
    this.listAccount = null;
  }

  searchNit() {
    this.optionLast = '';
    this.optionFirst = '';
    this.searchService.getNitUnique(this.optionNit).subscribe((respNit: any) => {
      console.log(respNit);
      if (respNit.DataBeanProperties.ObjectValue) {
        if (respNit.DataBeanProperties.ObjectValue.length > 0) {
          this.listAccount = respNit.DataBeanProperties.ObjectValue;
        } else {
          this.message.showWarning("No se encontraron resultados", "");
          this.listAccount = null;
        }
      } else {
        this.message.showError("No se pudo consultar la información", "");
        this.listAccount = null;
      }
    });
  }

  searchName() {
    this.optionLast = '';
    this.optionNit = '';
    this.searchService.searchAccount(this.optionFirst, null).subscribe((resp: any) => {
      console.log(resp);
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listAccount = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showWarning("No se encontraron resultados", "");
          this.listAccount = null;
        }
      } else {
        this.message.showError("No se pudo consultar la información", "");
        this.listAccount = null;
      }
    });
  }

  searchLast() {
    this.optionFirst = '';
    this.optionNit = '';
    this.searchService.searchAccount(null, this.optionLast).subscribe((resp: any) => {
      console.log(resp);
      if (resp.DataBeanProperties.ObjectValue) {
        if (resp.DataBeanProperties.ObjectValue.length > 0) {
          this.listAccount = resp.DataBeanProperties.ObjectValue;
        } else {
          this.message.showWarning("No se encontraron resultados", "");
          this.listAccount = null;
        }
      } else {
        this.message.showError("No se pudo consultar la información", "");
        this.listAccount = null;
      }
    });
  }

  getAccount(item: any) {
    this.beanAccount.Nit = item.DataBeanProperties.Nit;
    this.beanAccount.Name1 = item.DataBeanProperties.Name1;
    this.beanAccount.Name2 = item.DataBeanProperties.Name2;
    this.beanAccount.Surname1 = item.DataBeanProperties.Surname1;
    this.beanAccount.Surname2 = item.DataBeanProperties.Surname2;
    this.beanAccount.Address = item.DataBeanProperties.Address;
    this.beanAccount.Tel = item.DataBeanProperties.Tel;
    this.beanAccount.eMail = item.DataBeanProperties.eMail;
    this.beanAccount.IDAccount = item.DataBeanProperties.IDAccount;
    console.log(this.beanAccount);
    this.account.emit(this.beanAccount);
    this.cerrar();
  }
  abirCrear(){
    this.initBeanAccountC();
  }


  crearUsuario() {
    this._service.createAccount(this.beanAccount).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.message.showSuccess("Se creo el usuario", "");
          this.initBeanAccountC();
          document.getElementById("btnCerrarNewUser").click();
        } else {
          this.message.showError("No se pudo crear el usuario", "");
        }
      }
    );
  }

}
