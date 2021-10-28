import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessageService } from 'src/app/providers/message.service';
import { QuickturnService } from 'src/app/providers/quickturn.service';

@Component({
  selector: 'app-add-user-work-group',
  templateUrl: './add-user-work-group.component.html',
  styleUrls: ['./add-user-work-group.component.css']
})
export class AddUserWorkGroupComponent implements OnInit {
  listAccount: any;
  spinner: boolean;
  optionNit: any;
  IDFuncionalIDLn: number;
  nameUNit: string;
  nameUser: string;
  idUser: any;
  cedula: any;
  surname: any;

  constructor(private activeService: QuickturnService,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
  }

  getUnit(id: number) {
    console.log(id);
    this.IDFuncionalIDLn = id;
  }
  getNameUnit(name: string) {
    console.log(name);
    this.nameUNit = name;
  }
  getAccount(account) {
    console.log(account);
    this.nameUser = account.Name1
    this.surname = account.Surname1;
    this.cedula = account.Nit;
    this.idUser = account.IDAccount;
  }

  // btnModalSearch
  abrirUnidad() {
    document.getElementById('btnModalUnidad').click();
  }

  abrirUsuario() {
    document.getElementById('btnModalSearch').click();
  }

  addUserW() {
    this.activeService.addWorkGroupMember(this.IDFuncionalIDLn, this.idUser).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.message.showSuccess(`Se añadio a ${this.nameUser} ${this.surname} al grupo de trabajo ${this.nameUNit}`, "");
      } else {
        this.message.showError("No se pudo añadir", "");
      }
    });
  }
  removeUserW() {
    this.activeService.removeWorkGroupMember(this.IDFuncionalIDLn, this.idUser).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.message.showSuccess(`Se saco del grupo de trabajo ${this.nameUNit} a ${this.nameUser} ${this.surname}`, "");
      } else {
        this.message.showError("No se pudo remover", "");
      }
    });
  }
  limpiarUS() {
    this.nameUser = null
    this.surname = null;
    this.cedula = null;
    this.idUser = null;
  }
  limpiarGrupo() {
    this.nameUNit = null;
    this.IDFuncionalIDLn = null;
  }
}
