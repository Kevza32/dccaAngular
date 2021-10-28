import { Component, OnInit, TemplateRef } from '@angular/core';
import { QuickturnService } from '../../providers/quickturn.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from '../../providers/message.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  listAccount: any[];
  public modalRef: BsModalRef;
  titleBS: string;
  titleMS: string;
  idAccount: number;
  opcionDocument: any;
  opcionFirstName: any;
  opcionSecondName: any;
  opcionLastName: any;
  opcionSecondLast: any;
  opcionAddress: any;
  searchOption: any;
  optionFirst: any;
  optionLast: any;
  optionNit: any;
  opcionEmail: any;

  constructor(private accountService: QuickturnService,
              public modalService: BsModalService,
              private message: MessageService) { }

  ngOnInit(): void {
    
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };

   openAccount(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
   }

   cerrar() {
    this.modalService.hide();
   }

   modifyAccount(id, state){
    if (state === 'Crear'){
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Usuario';
    }
    if (state === 'Editar'){
      this.idAccount = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Usuario';
      this.accountService.getIdAccount2(id).subscribe((resp: any) => {
        console.log(resp);
        this.opcionDocument = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Nit;
        this.opcionFirstName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name1;
        this.opcionSecondName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name2; 
        this.opcionLastName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Surname1;
        this.opcionSecondLast = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Surname2;
        this.opcionAddress = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Address;
        this.opcionEmail = resp.DataBeanProperties.ObjectValue.DataBeanProperties.eMail;
      });
    }
   }

   cleanAccount(){
    this.opcionDocument = '';
    this.opcionFirstName = '';
    this.opcionSecondName = '';
    this.opcionLastName = '';
    this.opcionSecondLast = '';
    this.opcionAddress = '';
    this.opcionEmail = '';
  }

  sendAccount(){
    if(this.titleBS === 'Crear'){
      this.accountService.getNitUnique(this.opcionDocument).subscribe((respNit: any) => {
        console.log(respNit);
        if (respNit.DataBeanProperties.hasOwnProperty('ObjectValue')) {
          console.log('Hola');
          this.accountService.postAccount(this.opcionDocument, this.opcionFirstName, this.opcionSecondName,
            this.opcionLastName, this.opcionSecondLast, this.opcionAddress, this.opcionEmail).subscribe((respPost: any) => {
            console.log(respPost);
            this.message.showSuccess('El usuario se ha guardado correctamente', 'Usuario');
            this.optionNit = respPost.DataBeanProperties.ObjectValue.DataBeanProperties.Nit;
            this.searchNit();
            this.cerrar();
          });
          this.message.showError('La cédula esta asignada', 'Cédula');
        } else {
          this.message.showSuccess('La cédula esta asignada', 'Cédula');
        }
      });
    }
    if(this.titleBS === 'Editar'){
      console.log(this.idAccount, this.opcionDocument, this.opcionFirstName, this.opcionSecondName,
        this.opcionLastName, this.opcionSecondLast, this.opcionAddress, this.opcionEmail);
      this.accountService.putAccount(this.idAccount, this.opcionDocument, this.opcionFirstName, this.opcionSecondName,
        this.opcionLastName, this.opcionSecondLast, this.opcionAddress, this.opcionEmail).subscribe((respPut: any) => {
        console.log(respPut);
        this.message.showSuccess('El usuario se ha editado correctamente', 'Usuario');
        this.optionNit = respPut.DataBeanProperties.ObjectValue.DataBeanProperties.Nit;
        this.searchNit();
        this.cerrar();
      });
    }
  }

  searchNit(){
    this.optionLast = '';
    this.optionFirst = '';
    this.accountService.getNitUnique(this.optionNit).subscribe((respNit: any) => {
      console.log(respNit);
      this.listAccount = respNit.DataBeanProperties.ObjectValue;
    });
  }

  searchName(){
    this.optionLast = '';
    this.optionNit = '';
    this.accountService.searchAccount(this.optionFirst, null).subscribe((resp: any) => {
      console.log(resp);
      this.listAccount = resp.DataBeanProperties.ObjectValue;
    });
  }

  searchLast(){
    this.optionFirst = '';
    this.optionNit = '';
    this.accountService.searchAccount(null, this.optionLast).subscribe((resp: any) => {
      console.log(resp);
      this.listAccount = resp.DataBeanProperties.ObjectValue;
    });
  }

  validationOption(data){
    if(data === undefined){
      return null;
    }
    return data;
  }

  deleteAccount(id){
    this.accountService.deleteOfice(id).subscribe((resp: any) => {
      console.log(resp);
      this.message.showSuccess('Se ha eliminado correctamente', 'Cuenta');
    })
  }

}
