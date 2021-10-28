import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  // Breadcrumbs
  listAux = [];

  //Selection
  viewData = true;
  nombre;
  listTree: any;
  raiz: any;
  idInvestment;
  public modalRef: BsModalRef;
  titleBS: string;
  titleMS: string;
  optionCode: any;
  optionName: any;
  optionDescription: any;

  // Delete
  idDelete: number;
  state: string;
  idInvestmentEdit: number;
  spinner: boolean;
  budgetCode: any;
  codeInvestment: any;

  constructor(private investmentService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
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

  openInvestment(template: TemplateRef<any>) {
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
    this.investmentService.getTreeInvestment().subscribe((respR: any) => {
      console.log(respR);
      this.raiz = respR.DataBeanProperties.ObjectValue.EnvolvedObject.DataBeanProperties.Name;
      this.listAux.push(this.generarData(0, this.raiz));
      console.log('Raiz', this.listAux);
      this.spinner = false;
      this.listTree = respR.DataBeanProperties.ObjectValue.Childs;
      /* this.investmentService.getIdChildTreeInvestment(0).subscribe((resp: any) => {
        console.log(resp);
        this.listTree = resp.DataBeanProperties.ObjectValue;
        this.viewData = true;
      }); */
    });
  }

  getSelection(id, state) {
    this.spinner = true;
    this.idInvestment = id;
    if (state === 'Editar') {
      if (id > 0) {
        this.investmentService.getIdTreeInvestment(id).subscribe((resp: any) => {
          console.log(resp);
          this.nombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
          if (this.validate(id) === true) {
            this.getData(id);
          }
          if (this.validate(id) === false) {
            this.listAux.push(this.generarData(id, this.nombre));
          }
          this.viewData = false;
          this.investmentService.getIdChildTreeInvestment(id).subscribe((respChild: any) => {
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
        this.investmentService.getIdChildTreeInvestment(id).subscribe((respChild: any) => {
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
    this.investmentService.getTreeInvestment().subscribe((respR: any) => {
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

  sendInvestment() {
    if (this.titleBS === 'Crear') {
      if (this.idInvestment === undefined) {
        this.idInvestment = 0;
      }
      console.log(this.idInvestment, this.optionCode, this.optionName, this.getValidateInput(this.optionDescription), `${this.budgetCode}-${this.optionCode}`);
      this.investmentService.addInvestment(this.idInvestment, this.optionCode, this.optionName, this.optionDescription, `${this.budgetCode}-${this.optionCode}`)
        .subscribe((resp: any) => {
          console.log(resp);
          this.getSelection(this.idInvestment, 'Editar');
          this.message.showSuccess('Se ha agregado correctamente', 'Agregado');
          this.cerrar();
        });
    }
    if (this.titleBS === 'Editar') {
      if (this.idInvestment === undefined) {
        this.idInvestment = 0;
      }
      this.investmentService.putInvestment(this.idInvestmentEdit, this.idInvestment, this.optionCode, this.optionName, this.getValidateInput(this.optionDescription))
        .subscribe((resp: any) => {
          console.log(resp);
          this.getSelection(this.idInvestment, 'Editar');
          this.message.showSuccess('Se ha editado correctamente', 'Editar');
          this.cerrar();
        });
    }
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

  modifyInvestment(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Presupuesto';
    }
    if (state === 'Editar') {
      this.idInvestmentEdit = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Presupuesto';
      this.investmentService.getIdTreeInvestment(id).subscribe((resp: any) => {
        console.log(resp);
        this.optionCode = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Code;
        this.optionName = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.optionDescription = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
      });
    }
  }

  clearInvestment() {
    this.optionCode = '';
    this.optionName = '';
    this.optionDescription = '';
  }

  deleteInvestment() {
    this.investmentService.deleteInvestment(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.getSelection(this.idInvestment, 'Eliminar');
      this.message.showSuccess('Se ha eliminado correctamente', 'Eliminado');
      this.cerrar();
    });
  }
  obtenerCode(codigo) {
    this.budgetCode = codigo;
  }
  searchInvestement() {
    this.investmentService.getBudgetIDLike(this.codeInvestment).subscribe(
      (resp: any) => {
        if(resp.DataBeanProperties.ObjectValue){
          console.log(resp.DataBeanProperties.ObjectValue);
          // this.getSelection(resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn,"Editar");
          this.listTree = resp.DataBeanProperties.ObjectValue;
        }else{
          this.message.showError("No se pudo listar", "");
        }
      }
    );
  }
}
