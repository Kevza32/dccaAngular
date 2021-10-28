import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-modal-unit',
  templateUrl: './modal-unit.component.html',
  styleUrls: ['./modal-unit.component.css']
})
export class ModalUnitComponent implements OnInit {

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
  /* idInputUnit: number; */
  @Output() idInputUnit: EventEmitter<number> = new EventEmitter();
  @Output() nameUnitINput: EventEmitter<string> = new EventEmitter();
  // @Output() idPadre: EventEmitter<number> = new EventEmitter();

  spinner: boolean;

  constructor(private unitService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
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
    this.loadData();
    this.modalRef2 = this.modalService.show(template, this.config);
  }

  cerrar() {
    this.modalRef2.hide();
  }

  saveUnidad() {
    this.idInputUnit.emit(this.idUnitSelection);
    this.nameUnitINput.emit(this.nombre);
    // this.idPadre.emit(this.idLN_1);
    this.message.showSuccess(`Se ha añadido la unidad ${this.nombre}`, 'Unidad');
    this.cerrar();
  }

  loadData() {
    this.spinner = true;
    this.unitService.getTreeUnit().subscribe((respR: any) => {
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
      this.unitService.getIdTreeUnit(id).subscribe((resp: any) => {
        console.log(resp);
        this.nombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.idUnitSelection = resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn;
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
        this.unitService.getIdChildTreeUnit(id).subscribe((respChild: any) => {
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

  searchName() {
    this.unitService.getSearchUnitName(this.optionFirst).subscribe((resp: any) => {
      console.log(resp);
      this.getSelection(resp.DataBeanProperties.ObjectValue.DataBeanProperties.IDLn);
    });
  }

}
