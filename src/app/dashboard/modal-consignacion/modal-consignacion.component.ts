import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-modal-consignacion',
  templateUrl: './modal-consignacion.component.html',
  styleUrls: ['./modal-consignacion.component.css']
})
export class ModalConsignacionComponent implements OnInit {

  @Input() idAgreement: number;
  @Input() BeanProcedureAction: any;

  pageTable3: number = 1;
  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;

  //consignaciones
  bean_Consigment: any;
  lista_Consigment: any;
  ID_IDAgreement = 0;

  // flie
  nombreArchivo = "";
  ruta = "";
  media: string;
  context: string;
  mostrarDocumento = false;
  nombreArchivo2;
  txtDes: any;

  constructor(private agreementService: Dicco2Service,
    public modalService: BsModalService,
    private message: MessageService,
    private file: FileService,
    private _service: DicoService) { }

  ngOnInit(): void {
    console.log(this.idAgreement);
    this.consignaciones(this.idAgreement);
  }

  initBeanConsigment() {
    this.bean_Consigment = {
      IDConsigment: null,
      CashValue: 0,
      ConsigmentDate: null,
      Observations: '',
      Media: '',
      MediaContext: '',
      IDAgreement: this.ID_IDAgreement
    };
  }

  consignaciones(ID) {

    /* this.bean_Consigment.IDAgreement = ID; */
    this.ID_IDAgreement = ID;
    this.getConsigmentCatalog(ID);
  }
  setConsignaciones(bean, template, tipo) {

    this.bean_Consigment = bean;
    console.log(this.bean_Consigment);
    this.ID_IDAgreement = this.bean_Consigment.IDAgreement;
    this.mostrarDocumento = true;
    this.nombreArchivo2 = this.bean_Consigment.Media;
    this.bean_Consigment.ConsigmentDate = this.bean_Consigment.ConsigmentDate.slice(0, 10);
    if (tipo == 2)//editar
    {

      this.deleteConsigment(this.bean_Consigment.IDConsigment);
    }

    this.modalRef2 = this.modalService.show(template, { class: 'modal-xl p-5' });
  }

  openModal(template) {
    this.initBeanConsigment();
    this.mostrarDocumento = false;
    this.modalRef2 = this.modalService.show(template, { class: 'modal-xl p-5' });
  }

  cerrarCOnsignacion() {
    this.modalRef2.hide();
  }


  getConsigmentCatalog(ID) {
    this._service.getConsigmentCatalog(ID).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.lista_Consigment = resp.DataBeanProperties.ObjectValue;
          for (let index = 0; index < this.lista_Consigment.length; index++) {
            resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myLink =
              this.file.getUrlFiles(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext,
                resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Media);
          }
        }
      }
    );
  }

  cerrar() {
    this.modalService.hide();
  }

  updateConsigment() {
    this.bean_Consigment.ConsigmentDate = this.bean_Consigment.ConsigmentDate + " 00:00:00";

    this._service.updateConsigment(this.bean_Consigment).subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.getConsigmentCatalog(this.ID_IDAgreement);
          this.initBeanConsigment();
          this.mostrarDocumento = false;
          this.ruta = "";
          this.modalRef2.hide();
        }
        else {
          this.message.showInfo("No se pudo agregar la consignación", "");
        }
      }
    );
  }
  deleteConsigment(ID) {
    this._service.deleteConsigment(ID).subscribe(
      (resp: any) => {
        console.log("Borrando consignacion ", resp);

        // if(resp.DataBeanProperties.ObjectValue)
        {
          this.getConsigmentCatalog(this.ID_IDAgreement);
          this.initBeanConsigment();
        }
      }
    );
  }
  public cargarFile(files: FileList) {
    this.mostrarDocumento = false;
    this.file.postFile(files[0]).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          let archivo = resp.DataBeanProperties.ObjectValue.DataBeanProperties;

          this.context = archivo.Context;
          this.nombreArchivo = archivo.Media;
          this.bean_Consigment.Media = archivo.Media;
          this.bean_Consigment.MediaContext = archivo.MediaContext;
          this.ruta = archivo.URL;
          this.message.showSuccess("Archivo almacenado", "Archivo");
        }
        else {
          this.message.showWarning("Archivo no pudo ser cargado", "Archivo");
          this.nombreArchivo = "";
          this.ruta = "";
        }
      },
      error => {
        this.message.showWarning(JSON.stringify(error), "Archivo");
        console.log(<any>error);
      }

    );
  }
  aprobar() {
    if (this.txtDes == null || this.txtDes == undefined || this.txtDes == '') {
      this.message.showError("Llene el campo Descripcion", "");
    } else {
      this._service.responseProcedureAction(this.BeanProcedureAction.IDAction, this.txtDes).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this.message.showSuccess("Se aprobo el documento", "");
            this.txtDes = null;
            document.getElementById("btnCerrarAprobacion").click();
            document.getElementById("btnCerrarModalG").click();

          } else {
            this.message.showError("No se pudo aprobar el documento", "");
          }
        }
      );
    }
  }
  rechazar() {
    if (this.txtDes == null || this.txtDes == undefined || this.txtDes == '') {
      this.message.showError("Llene el campo Descripcion", "");
    } else {

      this._service.declineResponseProcedureAction(this.BeanProcedureAction.IDAction, this.txtDes).subscribe(
        (resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this.message.showSuccess("Se rechazo el documento", "");
            this.txtDes = null;
            document.getElementById("btnCerrarModalG").click();
            document.getElementById("btnCerrarAprobacion").click();
          } else {
            this.message.showError("No se pudo rechazar el documento", "");
          }
        }
      );


    }
  }

}
