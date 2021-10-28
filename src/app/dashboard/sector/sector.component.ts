import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {

  public modalRef: BsModalRef;
  pageActual: number = 1;
  idDelete: number;
  idSector: number;
  titleBS: string;
  titleMS: string;
  listSector: any[];

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
    this.modelService.getListSector().subscribe((resp: any) => {
    this.spinner = false;
    this.listSector = resp.DataBeanProperties.ObjectValue;
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
        this.modelService.postSector(
          this.opcionNombre, 
          this.opcionDescripcion, 
          ).subscribe((respPost: any) => {
          console.log(respPost);
          this.loadData();
          this.message.showSuccess('El sector se ha guardado correctamente', 'Sector');
          this.cerrar();
        });
      /* } */
    }
    if(this.titleBS === 'Editar'){
      this.modelService.putSector(
        this.idSector, 
        this.opcionNombre, 
        this.opcionDescripcion
        ).subscribe((respPut: any) => {
        console.log(respPut);
        this.loadData();
        this.message.showSuccess('El sector se ha editado correctamente', 'Sector');
        this.cerrar();
      });
    }
  }

  modifyComponente(id, state){
    if (state === 'Crear'){
      this.titleBS = 'Crear';
      this.titleMS = 'Crear Sector';
    }
    if (state === 'Editar'){
      this.idSector = id;
      this.titleBS = 'Editar';
      this.titleMS = 'Editar Sector';
      this.modelService.getIdSector(id).subscribe((resp: any) => {
        console.log(resp);
        this.opcionNombre = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Name;
        this.opcionDescripcion = resp.DataBeanProperties.ObjectValue.DataBeanProperties.Description;
      });
    }
  }

  clearComponente(){
    this.opcionNombre = '';
        this.opcionDescripcion = '';
  }

  deleteComponente(){
    this.modelService.deleteSector(this.idDelete).subscribe((resp: any) => {
      console.log(resp);
      this.loadData();
      this.message.showSuccess('El sector se ha eliminado correctamente', 'Sector');
      this.cerrar();
    });
  }

}
