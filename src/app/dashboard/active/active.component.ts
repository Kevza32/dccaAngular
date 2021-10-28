import { Component, OnInit, TemplateRef } from '@angular/core';
import { QuickturnService } from '../../providers/quickturn.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MessageService } from '../../providers/message.service';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  optionNit: any;
  listAccount: any[];
  document: number;
  name: string;
  lastName: string;
  nameComplete: string;
  public modalRef: BsModalRef;
  listRole: any[];
  optionUser: any;
  optionPassword: any;
  optionPassword2: any;
  optionRole: any;
  selectorRole: string;
  idAccount: number;
  idAcDesactive: number;
  spinner: boolean;

  constructor(private activeService: QuickturnService,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  searchNit() {
    this.spinner = true;
    this.activeService.getNitUnique(this.optionNit).subscribe((resp: any) => {
      console.log(resp);
      this.listAccount = resp.DataBeanProperties.ObjectValue;
      this.spinner = false;
    });
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm modal-dialog-centered'
  };

  openUser(id, template: TemplateRef<any>) {
    this.idAccount = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDesactive(id, template: TemplateRef<any>) {
    this.idAcDesactive = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  cerrar() {
    this.modalService.hide();
  }

  sendAccount() {
    if (this.optionPassword === this.optionPassword2) {
      this.message.showSuccess('La cuenta se ha activado', 'Activación Cuenta');
      this.activeService.putAccountActivate(this.idAccount, this.optionRole).subscribe((resp: any) => {
        console.log(resp);
      });
      console.log(this.idAccount, this.optionUser, this.optionPassword, this.optionRole);
      this.activeService.activateAccount(this.idAccount, this.optionUser, this.optionPassword).subscribe((respA: any) => {
        console.log(respA);
      });
      this.cerrar();
      this.optionNit = '';
      this.listAccount.splice(0, this.listAccount.length);
    } else {
      this.message.showError('La validación de la contraseña es inválida', 'Contraseña');
    }
  }

  changeRole() {

  }

  loadData() {
    this.activeService.getListRole().subscribe((respR: any) => {
      console.log(respR);
      this.listRole = respR.DataBeanProperties.ObjectValue;
    });
  }

  sendDesactive() {
    this.activeService.desactiveAccount(this.idAcDesactive).subscribe((resp: any) => {
      console.log(resp);
      this.message.showSuccess('El usuario ha sido desactivado', 'Usuario');
      this.cerrar();
    });
  }

}
