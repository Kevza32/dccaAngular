import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit, OnDestroy {

  // Breadcrumbs
  listAux = [];

  //Selection
  viewData = true;
  nombre;
  listTree: any;
  raiz: any;
  public modalRef: BsModalRef;

  // Delete
  idDelete: number;
  state: string;

  // Crear y Editar
  titleBS: string;
  titleMS: string;
  idCode;
  optionCode: any;
  optionName: any;
  optionDescription: any;
  idCodeEdit: number;
  spinner: boolean;


  constructor(private codeService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    console.log('Hola');
    this.loadData();
  }

  ngOnDestroy() {

  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };

  config2 = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm modal-dialog-centered'
  };

  openCode(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDelete(id, state, template: TemplateRef<any>) {
    this.idDelete = id;
    this.state = state;
    this.modalRef = this.modalService.show(template, this.config2);
  }

  cerrar() {
    this.modalService.hide();
  }

  loadData() {
    this.spinner = true;
    this.codeService.getTreeCode().subscribe((respR: any) => {
      console.log(respR);
      this.raiz = respR.DataBeanProperties.ObjectValue.EnvolvedObject.DataBeanProperties.Name;
      this.listAux.push(this.generarData(0, this.raiz));
      console.log('Raiz', this.listAux);
      this.listTree = respR.DataBeanProperties.ObjectValue.Childs;
      this.spinner = false;

    });
  }

  getSelection(id, state) {
    this.spinner = true;
    console.log('Hola');
    this.idCode = id;
    if (state === 'Editar') {
      if (id > 0) {
        this.codeService.getIdTreeCode(id).subscribe((resp: any) => {
          console.log(resp);
          this.nombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
          if (this.validate(id) === true) {
            this.getData(id);
          }
          if (this.validate(id) === false) {
            this.listAux.push(this.generarData(id, this.nombre));
          }
          this.viewData = false;
          this.codeService.getIdChildTreeCode(id).subscribe((respChild: any) => {
            console.log(respChild);
            this.spinner = false;
            this.listTree = respChild.DataBeanProperties.ObjectValue.Childs;
            this.viewData = true;
          });
        });
      } else {
        this.loadData();
        if (this.validate(id) === true) {
          this.getData(id);
        }
      }
    }
    if (state === 'Eliminar') {
      if (id > 0) {
        this.codeService.getIdChildTreeCode(id).subscribe((respChild: any) => {
          console.log(respChild);
          this.listTree = respChild.DataBeanProperties.ObjectValue.Childs;
          this.viewData = true;
        });
      } else {
        this.loadDataInit();
      }
    }
  }

  loadDataInit() {
    this.codeService.getTreeCode().subscribe((respR: any) => {
      console.log(respR);
      this.listTree = respR.DataBeanProperties.ObjectValue.Childs;
    });
  }

  getData(id) {
    for (let i = 0; i < this.listAux.length; i++) {
      if (id === this.listAux[i].idValor) {
        this.listAux.splice(i, this.listAux.length);
      }
    }
  }

  validate(id): boolean {
    for (let i = 0; i < this.listAux.length; i++) {
      if (id === this.listAux[i].idValor) {
        return true;
      }
    }
    return false;
  }

  generarData(id, valor) {
    const data = {
      idValor: id,
      valorData: valor
    };
    return data;
  }

  public decodeval(val: string) {
    return decodeURIComponent(val);
  }

  sendCode() {
    if (this.titleBS === 'Crear') {
      if (this.idCode === undefined) {
        this.idCode = 0;
      }
      console.log(this.idCode, this.optionCode, this.optionName, this.getValidateInput(this.optionDescription));
      this.codeService.addCode(this.idCode, this.optionCode, this.optionName, this.optionDescription)
        .subscribe((resp: any) => {
          console.log(resp);
          this.getSelection(this.idCode, 'Editar');
          this.message.showSuccess('Se ha agregado correctamente', 'Agregado');
          this.cerrar();
        });
    }
    if (this.titleBS === 'Editar') {
      if (this.idCode === undefined) {
        this.idCode = 0;
      }
      this.codeService.putCode(this.idCodeEdit, this.idCode, this.optionCode, this.optionName, this.getValidateInput(this.optionDescription))
        .subscribe((resp: any) => {
          console.log(resp);
          this.getSelection(this.idCode, 'Editar');
          this.message.showSuccess('Se ha editado correctamente', 'Editar');
          this.cerrar();
        });
    }
  }

  modifyCode(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Código';
    }
    if (state === 'Editar') {
      this.idCodeEdit = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Código';
      this.codeService.getIdTreeCode(id).subscribe((resp: any) => {
        console.log(resp);
        this.optionCode = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Code;
        this.optionName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.optionDescription = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
      });
    }
  }

  clearCode() {
    this.optionCode = '';
    this.optionName = '';
    this.optionDescription = '';
  }

  getValidateInput(data) {
    if (data === '') {
      return null;
    }
    if (data === undefined) {
      return null;
    }
    return data;
  }

  deleteCode() {
    this.codeService.deleteCode(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.getSelection(this.idCode, 'Eliminar');
      this.message.showSuccess('Se ha eliminado correctamente', 'Eliminado');
      this.cerrar();
    });
  }


}
