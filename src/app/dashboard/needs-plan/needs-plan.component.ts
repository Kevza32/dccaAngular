import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DicoService } from 'src/app/providers/dico.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';

@Component({
  selector: 'app-needs-plan',
  templateUrl: './needs-plan.component.html',
  styleUrls: ['./needs-plan.component.css']
})
export class NeedsPlanComponent implements OnInit {
  beanNeedsPlanD: any;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg modal-dialog-centered'
  };
  tipo: number;
  required: boolean;
  listaPN: any = [];
  beanDocument: any;
  listEstado: any;
  selectorEstado: string;
  estado: any;
  spinner: boolean;
  constructor(private _service: DicoService,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _fileService: FileService) { }

  ngOnInit(): void {
    this.initEstado();
  }
  listarPlanNecesidades() {
    this.spinner = true;
    this._service.getNeedsPlanDocumentsCatalog(this.tipo).subscribe(
      (resp: any) => {
        this.spinner = false;
        if (resp.DataBeanProperties.ObjectValue) {
          if (resp.DataBeanProperties.ObjectValue.length > 0) {
            this.listaPN = resp.DataBeanProperties.ObjectValue;
            for (let index = 0; index < this.listaPN.length; index++) {
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myRequi =
                this.getValidate(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Required);
            }
            console.log(this.listaPN);

          } else {
            this._messagge.showWarning("No tiene registros", "");
            this.listaPN = [];
          }
        } else {
          this._messagge.showError("No se pudo consultar", "");
          this.listaPN = [];
        }
      }
    );
  }

  getValidate(data) {
    switch (data) {
      case true:
        return 'Requerido'
      case false:
        return 'No Requerido'
      default:
        break;
    }
  }

  initBeanNeedsPland() {
    this.beanNeedsPlanD = {
      IDNeedsPlanDocument: null,
      Name: '',
      Description: '',
      Required: '',
      Type: this.tipo
    }
  }
  initEstado() {
    this.listEstado = [];
    this.listEstado.push({ id: true, valor: 'Requerido' });
    this.listEstado.push({ id: false, valor: 'No Requerido' });
  }
  abirCrear(template: TemplateRef<any>) {
    this.initBeanNeedsPland();
    this.modalRef = this._modalService.show(template, this.config);
  }
  abrirModalE(bean, template: TemplateRef<any>) {
    this.beanNeedsPlanD = bean;
    console.log(this.beanNeedsPlanD);

    this.modalRef = this._modalService.show(template, this.config);
  }
  abrirModalEli(template: TemplateRef<any>, bean) {
    this.initBeanNeedsPland();
    this.beanNeedsPlanD.IDNeedsPlanDocument = bean.IDNeedsPlanDocument
    this.modalRef = this._modalService.show(template, { class: 'modal-sm' });
  }
  validar() {
    if (this.beanNeedsPlanD.Name == '') {
      this._messagge.showError("Por favor llene el campo de Nombre", "");
    }
    else if (this.beanNeedsPlanD.Type == null) {
      this._messagge.showError("Por favor llene el campo de tipo", "");
    } else {
      this.guardarNeedsPlanD();
    }
  }
  guardarNeedsPlanD() {
    this._service.updateNeedsPlanDocument(this.beanNeedsPlanD).subscribe(
      (resp: any) => {
        console.log(resp);
        if (resp.DataBeanProperties.ObjectValue) {
          if (this.beanNeedsPlanD.IDNeedsPlanDocument == null) {
            this._messagge.showSuccess("Se guardo correctamente", "");
          }
          else {
            this._messagge.showSuccess("Se editó correctamente", "");
          }
          this.modalRef.hide();
          this.initBeanNeedsPland();
          this.listarPlanNecesidades();

        } else {
          if (this.beanNeedsPlanD.IDNeedsPlanDocument == null) {
            this._messagge.showError("No se pudo guardar", "");
          }
          else {
            this._messagge.showError("No se pudo editar ", "");
          }
        }
      }
    );
  }
  abrirModalElim(beanDocument) {
    this.beanDocument = beanDocument;
  }
  confirmEliminar() {
    this._service.deleteNeedsPlanDocument(this.beanDocument).subscribe(
      (resp: any) => {
        this._messagge.showInfo("Se elimino el registro", "");
        document.getElementById('btnCerrarElim').click();
        this.listarPlanNecesidades();
      }
    );
  }

}
