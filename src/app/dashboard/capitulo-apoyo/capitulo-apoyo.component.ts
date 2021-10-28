import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-capitulo-apoyo',
  templateUrl: './capitulo-apoyo.component.html',
  styleUrls: ['./capitulo-apoyo.component.css']
})
export class CapituloApoyoComponent implements OnInit {

  public modalRef: BsModalRef;
  pageActual: number = 1;
  idDelete: number;
  idCapitulo: number;
  titleBS: string;
  titleMS: string;
  listCapitulo: any[];

  opcionNombre: any;
  opcionDescripcion: any;
  spinner: boolean;

  constructor(private modelService: Dicco2Service,
              public modalService: BsModalService,
              private message: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.spinner = true;
    this.modelService.getListCapitulo().subscribe((resp: any) => {
    this.spinner = false;
    this.listCapitulo = resp.DataBeanProperties.ObjectValue;
    });
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm modal-dialog-centered'
  };

  openComponente(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
  }

  openDelete(id, template: TemplateRef<any>){
    this.idDelete = id;
    this.modalRef = this.modalService.show(template, this.config);
  }

  cerrar() {
    this.modalService.hide();
  }

  sendComponente() {
    if(this.titleBS === 'Crear'){
      /* if(this.getValidate(this.opcionNombre) === null){
        this.message.showError('El campo Nombre es obligatorio', 'Campo');
      } else { */
        this.modelService.postCapitulo(
          /* this.opcionNombre,  */
          this.opcionDescripcion, 
          ).subscribe((respPost: any) => {
          console.log(respPost);
          this.loadData();
          this.message.showSuccess('El capítulo se ha guardado correctamente', 'Capítulo');
          this.cerrar();
        });
      /* } */
    }
    if(this.titleBS === 'Editar'){
      this.modelService.putCapitulo(
        this.idCapitulo, 
        /* this.opcionNombre,  */
        this.opcionDescripcion
        ).subscribe((respPut: any) => {
        console.log(respPut);
        this.loadData();
        this.message.showSuccess('El capítulo se ha editado correctamente', 'Capítulo');
        this.cerrar();
      });
    }
  }

  modifyComponente(id, state){
    if (state === 'Crear'){
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Capítulo';
    }
    if (state === 'Editar'){
      this.idCapitulo = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Capítulo';
      this.modelService.getIdCapitulo(id).subscribe((resp: any) => {
        console.log(resp);
        /* this.opcionNombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name; */
        this.opcionDescripcion = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
      });
    }
  }

  clearComponente(){
    /* this.opcionNombre = ''; */
        this.opcionDescripcion = '';
  }

  deleteComponente(){
    console.log('Hola');
    this.modelService.deleteCapitulo(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('El capítulo se ha eliminado correctamente', 'Capítulo');
      this.cerrar();
    });
  }

}
