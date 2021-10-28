import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-articulo-presupuestal',
  templateUrl: './articulo-presupuestal.component.html',
  styleUrls: ['./articulo-presupuestal.component.css']
})
export class ArticuloPresupuestalComponent implements OnInit {

  public modalRef: BsModalRef;
  pageActual: number = 1;
  idDelete: number;
  idArticulo: number;
  titleBS: string;
  titleMS: string;
  listArticulo: any[];

  opcionNombre: any;
  opcionDescripcion: any;
  spinner: boolean;

  constructor(private modelService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.spinner = true;
    this.modelService.getListArticulo().subscribe((resp: any) => {
      this.spinner = false;
      this.listArticulo = resp.DataBeanProperties.ObjectValue;
    });
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };

  openComponente(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDelete(id, template: TemplateRef<any>) {
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  cerrar() {
    this.modalService.hide();
  }

  sendComponente() {
    if (this.titleBS === 'Crear') {
      /* if(this.getValidate(this.opcionNombre) === null){
        this.message.showError('El campo Nombre es obligatorio', 'Campo');
      } else { */
      this.modelService.postArticulo(
        /* this.opcionNombre,  */
        this.opcionNombre
      ).subscribe((respPost: any) => {
        console.log(respPost);
        this.loadData();
        this.message.showSuccess('El artículo se ha guardado correctamente', 'Artículo');
        this.cerrar();
      });
      /* } */
    }
    if (this.titleBS === 'Editar') {
      this.modelService.putArticulo(
        this.idArticulo,
        /* this.opcionNombre,  */
        this.opcionNombre
      ).subscribe((respPut: any) => {
        console.log(respPut);
        this.loadData();
        this.message.showSuccess('El artículo se ha editado correctamente', 'Artículo');
        this.cerrar();
      });
    }
  }

  modifyComponente(id, state) {
    if (state === 'Crear') {
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Artículo';
    }
    if (state === 'Editar') {
      this.idArticulo = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Artículo';
      this.modelService.getIdArticulo(id).subscribe((resp: any) => {
        console.log(resp);
        this.opcionNombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        /* this.opcionDescripcion = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description; */
      });
    }
  }

  clearComponente() {
    this.opcionNombre = '';
    /* this.opcionDescripcion = ''; */
  }

  deleteComponente() {
    this.modelService.deleteArticuloPre(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('El artículo se ha eliminado correctamente', 'Artículo');
      this.cerrar();
    });
  }

}
