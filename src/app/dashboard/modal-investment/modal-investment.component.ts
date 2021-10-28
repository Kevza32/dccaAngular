import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-modal-investment',
  templateUrl: './modal-investment.component.html',
  styleUrls: ['./modal-investment.component.css']
})
export class ModalInvestmentComponent implements OnInit {

  public modalRef2: BsModalRef;
  listAux = [];
  listTree: any[];
  raiz;
  idUnit;
  viewData = true;
  nombre;
  idUnitSelection;
  codeInvestment: any;

  /* idInputUnit: number; */
  @Output() idInputUnit: EventEmitter<number> = new EventEmitter();
  @Output() nameUnitINput: EventEmitter<number> = new EventEmitter();
  @Output() code: EventEmitter<string> = new EventEmitter();
  codigo: any;

  constructor(private unitService: Dicco2Service,
              public modalService: BsModalService,
              private message: MessageService) { }

  ngOnInit(): void {
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl p-10 modal-dialog-centered'
  };
  
  openUnidad(template: TemplateRef<any>){
    this.listAux.splice(0, this.listAux.length);
    /* this.nombre = '';
    this.idUnitSelection = 0;
    this.nameUnitINput.emit(this.nombre);
    this.idInputUnit.emit(this.idUnitSelection); */
    /* this.listTree.splice(0, this.listTree.length); */
    this.loadData();
    this.modalRef2 = this.modalService.show(template, this.config);
  }
  
  cerrar() {
    this.modalRef2.hide();
  }

  saveUnidad(){
    this.nameUnitINput.emit(this.nombre);
    this.idInputUnit.emit(this.idUnitSelection);
    this.code.emit(this.codigo);
    this.message.showSuccess(`Se ha añadido el presupuesto ${this.nombre}`, 'Presupuesto');
    this.cerrar();
  }

  loadData(){
    this.unitService.getTreeInvestment().subscribe((respR: any) => {
      console.log(respR);
      this.raiz = respR.DataBeanProperties.ObjectValue.EnvolvedObject.DataBeanProperties.Name;
      this.listAux.push(this.generarData(0, this.raiz));
      console.log('Raiz', this.listAux);
      this.listTree = respR.DataBeanProperties.ObjectValue.Childs;
    });
  }

  getSelection(id){
    this.idUnit = id;
      if(id > 0){
        this.unitService.getIdTreeInvestment(id).subscribe((resp: any) => {
          console.log(resp);
          this.nombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
          this.idUnitSelection = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn;
          this.codigo = resp.DataBeanProperties.ObjectValue.DataBeanProperties.BudgetCode;
          /* this.nameUnitINput.emit(this.nombre);
          this.idInputUnit.emit(this.idUnitSelection); */
          if(this.validate(id) === true){
            this.getData(id);
          }
          if(this.validate(id) === false){
            this.listAux.push(this.generarData(id, this.nombre));
          }
          this.viewData = false;
          this.unitService.getIdChildTreeInvestment(id).subscribe((respChild: any) => {
              console.log(respChild);
              this.listTree = respChild.DataBeanProperties.ObjectValue.Childs;
              this.viewData = true;
            });
        });
      }else{
        this.loadData();
        if(this.validate(id) === true){
          this.getData(id);
        }
      }
  }

  getData(id){
    for(let i = 0; i < this.listAux.length; i++) {
      if(id === this.listAux[i].idValor){
        this.listAux.splice(i, this.listAux.length);
      }
    }
  }

  validate(id): boolean{
    for(let i = 0; i < this.listAux.length; i++) {
      if(id === this.listAux[i].idValor){
        return true;
      }
    }
    return false;
  }

  generarData(id, valor){
    const data = {
      idValor: id,
      valorData: valor
    };
    return data;
  }

  public decodeval(val: string) {
    return decodeURIComponent(val);
  }
  
  getIdUnit(id){
    
  }
  searchInvestement() {
    this.unitService.getBudgetIDLike(this.codeInvestment).subscribe(
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
