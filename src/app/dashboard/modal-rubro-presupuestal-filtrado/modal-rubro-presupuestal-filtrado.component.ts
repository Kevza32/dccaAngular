import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-modal-rubro-presupuestal-filtrado',
  templateUrl: './modal-rubro-presupuestal-filtrado.component.html',
  styleUrls: ['./modal-rubro-presupuestal-filtrado.component.css']
})
export class ModalRubroPresupuestalFiltradoComponent implements OnInit {


  public modalRef2: BsModalRef;
  listAux = [];
  listTree: any[];
  raiz;
  idUnit;
  viewData = true;
  nombre;
  idUnitSelection;
  idLN_1;
  optionFirst: any;
  @Input() idInputBudgetID: number;
  // @Output() idInputUnit: EventEmitter<number> = new EventEmitter();
  // @Output() nameUnitINput: EventEmitter<number> = new EventEmitter();
  // @Output() idPadre: EventEmitter<number> = new EventEmitter();
  @Output() BeanBudget: EventEmitter <any> = new EventEmitter();

  spinner: boolean;
  budgetEncontrados: any[];
  beanSelect: any;

  constructor(private unitService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    console.log("entro");
    // this.obtenerBudget();
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered p-10'
  };

  openUnidad(template: TemplateRef<any>) {
    this.listAux.splice(0, this.listAux.length);
    /* this.nombre = ''; */
    /* this.idUnitSelection = 0; */
    /*  this.nameUnitINput.emit(this.nombre);
     this.idInputUnit.emit(this.idUnitSelection); */
    /* this.listTree.splice(0, this.listTree.length); */
    // this.loadData();
    this.obtenerBudget();
    this.modalRef2 = this.modalService.show(template, this.config);
  }

  cerrar() {
    this.modalRef2.hide();
  }

  saveUnidad() {
    this.BeanBudget.emit(this.beanSelect);
    // this.nameUnitINput.emit(this.nombre);
    // this.idPadre.emit(this.idLN_1);
    this.message.showSuccess(`Se ha añadido la unidad ${this.nombre}`, 'Unidad');
    this.cerrar();
  }

  loadData() {
    this.spinner = true;
    this.unitService.getTreeInvestment().subscribe((respR: any) => {
      console.log(respR);
      this.raiz = respR.DataBeanProperties.ObjectValue.EnvolvedObject.DataBeanProperties.Name;
      this.listAux.push(this.generarData(0, this.raiz));
      console.log('Raiz', this.listAux);
      this.listTree = respR.DataBeanProperties.ObjectValue.Childs;
      this.spinner = false;

    });
  }

  getSelection(id) {
    this.spinner = true;

    this.idUnit = id;
    if (id > 0) {
      this.unitService.getIdTreeInvestment(id).subscribe((resp: any) => {
        console.log(resp);
        this.nombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.idUnitSelection = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn;
        this.beanSelect = resp.DataBeanProperties.ObjectValue.DataBeanProperties;
        // this.idLN_1 = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn_1;
        // console.log(this.idLN_1);

        /* this.nameUnitINput.emit(this.nombre);
        this.idInputUnit.emit(this.idUnitSelection); */
        if (this.validate(id) === true) {
          this.getData(id);
        }
        if (this.validate(id) === false) {
          this.listAux.push(this.generarData(id, this.nombre));
        }
        this.viewData = false;
        this.unitService.getIdChildTreeInvestment(id).subscribe((respChild: any) => {
          console.log(respChild);
          this.listTree = respChild.DataBeanProperties.ObjectValue.Childs;
          this.spinner = false;
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

  getIdUnit(id) {

  }

  // searchName() {
  //   this.unitService.getSearchUnitName(this.optionFirst).subscribe((resp: any) => {
  //     console.log(resp);
  //   });
  // }
  obtenerBudget() {
    console.log(this.idInputBudgetID);
    this.getSelection(this.idInputBudgetID);

    // this.budgetEncontrados=[];
    // this.unitService.getBudgetID(this.idInputBudgetID).subscribe((resp: any) => {
    //   console.log(resp);

    //   if(resp.DataBeanProperties.ObjectValue){
    //     this.budgetEncontrados.push( resp.DataBeanProperties.ObjectValue);
    //     console.log(this.budgetEncontrados);

    //   }else{
    //     this.message.showError("No se pudo lista los subitems rubro presupuestal","");
    //   }
    // });
  }

}
