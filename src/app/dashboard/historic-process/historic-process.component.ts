import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales, defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import { DicoService } from 'src/app/providers/dico.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';
@Component({
  selector: 'app-historic-process',
  templateUrl: './historic-process.component.html',
  styleUrls: ['./historic-process.component.css']
})
export class HistoricProcessComponent implements OnInit {
  @ViewChild('contenedor2') contenedor2: ElementRef;

  locales = listLocales();
  locale = 'ES'
  listaHistorico: any[];
  desde: any;
  hasta: any;
  estados: any;
  listaEstados: any;
  pageActual: number = 1;
  pageActual2: number = 2;
  pageActual3: number = 1;

  listaProcesosNegocio: any;
  procesos: any;
  scrollContainer: any;
  historialEtapas: any = [];
  public modalRef: BsModalRef;
  public modalRef2: BsModalRef;

  historialEtapas2: any = [];
  historialEtapas3: any;
  aConsultar: number;
  txtEmpresa: string;
  IDAccount: any;
  bean: any;
  listActivities: any[];

  constructor(private localeService: BsLocaleService, private _dccaService: DicoService,
    private spinner: NgxSpinnerService,
    private _pipeDate: DatePipe,
    private _messagge: MessageService,
    private _modalService: BsModalService,
    private _fileService: FileService) {
    this.setDatepickerLanguage();
  }
  ngOnInit(): void {
    this.spinner.show('spinnerPrincipal');
    this.listarEstados();
    this.listarProcesosNegocio();
  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }
  hideSpinner(name: string) {
    this.spinner.hide(name);

  }
  obtenerSesion = () => {
    let ls = JSON.parse(localStorage.getItem('usuario'));
    return ls.DataBeanProperties.IDAccount
  }

  listarHistorico() {
    this.IDAccount == undefined || this.IDAccount == undefined ? this.IDAccount = null : '';
    this.showSpinner('spinnerTabla');
    this.listaHistorico = [];
    this._dccaService.getProcedureImpByAccount(this.procesos, this.IDAccount, this._pipeDate.transform(this.desde, 'yyyy-MM-dd hh:mm:ss'), this._pipeDate.transform(this.hasta, 'yyyy-MM-dd hh:mm:ss'), this.estados).subscribe((resp: any) => {
      console.log(resp);

      if (resp.DataBeanProperties.ObjectValue) {
        this.listaHistorico = resp.DataBeanProperties.ObjectValue;
        console.log(this.listaHistorico);

        this.hideSpinner('spinnerTabla');
      }
    })
  }
  listarProcesosNegocio() {
    this.listaProcesosNegocio = [];
    this._dccaService.getListModel().subscribe(
      (resp: any) => {
        if (resp.DataBeanProperties.ObjectValue) {
          this.listaProcesosNegocio = resp.DataBeanProperties.ObjectValue;
          console.log(this.listaProcesosNegocio);

        } else {
          this._messagge.showError("No se pudo listar los procesos de negocio", "");
        }
      }
    );
  }
  listarEstados() {
    this.listaEstados = [];
    this._dccaService.getSateListForBusinessProcess().subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.listaEstados = resp.DataBeanProperties.ObjectValue;
        this.spinner.hide('spinnerPrincipal');

      }
    })
  }

  hacerScroll() {
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;

    console.log(position);
    console.log(height);
  }
  setDatepickerLanguage() {
    defineLocale('es', esLocale);
    this.localeService.use('es');
  }
  abrirHistorico(bean, template: TemplateRef<any>) {
    this.historialEtapas3 = [];
    this.bean = bean;
    this.spinner.show('spinnerLinea');
    this._dccaService.getHistoricoProcedure(bean.IDProcedureImp).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.spinner.hide('spinnerLinea');

        this.historialEtapas3 = resp.DataBeanProperties.ObjectValue;
        console.log(this.historialEtapas3);
        this.modalRef = this._modalService.show(template, { class: 'modal-xl' });
      } else {
        this._messagge.showError('No se puede listar el historial', "");
      }
    })
  }
  listActividades(bean, template: TemplateRef<any>) {
    this.listActivities = [];
    this.spinner.show('spinnerLinea2');
    this._dccaService.getPendingProcedureActionForProcedureImp(bean.IDProcedureImp).subscribe((resp: any) => {
      this.spinner.hide('spinnerLinea2');
      if (resp.DataBeanProperties.ObjectValue) {
        this.listActivities = resp.DataBeanProperties.ObjectValue;
        this.modalRef2 = this._modalService.show(template, { class: 'modal-xl' });
      } else {
        this._messagge.showError("No se pudieron listar las actividades", "");
      }
    })
  }
  abrirEtapas(bean, template: TemplateRef<any>) {
    this.historialEtapas2 = [];
    this.spinner.show('spinnerLinea');
    this._dccaService.getEtapasProcedure(bean.IDProcedureImp).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.spinner.hide('spinnerLinea');

        this.historialEtapas2 = resp.DataBeanProperties.ObjectValue;
        console.log(this.historialEtapas2);
        this.modalRef = this._modalService.show(template, { class: 'modal-xl' });
      } else {
        this._messagge.showError('No se puede listar las etapas', "");
      }
    })
  }
  getAccountBoos(beanAccount) {
    if (beanAccount.Name1 == undefined) {
      beanAccount.Name1 = "";
    } if (beanAccount.Name2 == undefined) {
      beanAccount.Name2 = ""
    } if (beanAccount.Surname1 == undefined) {
      beanAccount.Surname1 = "";
    } if (beanAccount.Surname2 == undefined) {
      beanAccount.Surname2 = "";
    }

    this.txtEmpresa = `${beanAccount.Name1} ${beanAccount.Name2} ${beanAccount.Surname1} ${beanAccount.Surname2}`;
    this.IDAccount = beanAccount.IDAccount;
  }

  getUrl(MediaContext, Media) {
    let url;
    if (MediaContext != null && Media != null) {
      url = this._fileService.getUrlFiles(MediaContext, Media);
    } else {
      url = "";
    }
    return url;
  }

  tipoSeleccion() {
    document.getElementById('btnModalSearch').click();
  }

  definirEtapaActual(bean) {
    this._dccaService.setActualStage(bean.IDStage).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.historialEtapas2 = [];
        this.spinner.show('spinnerTabla');

        this._dccaService.getEtapasProcedure(bean.IDProcedureImp).subscribe((resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this.spinner.hide('spinnerTabla');
            this.historialEtapas2 = resp.DataBeanProperties.ObjectValue;
          } else {
            this._messagge.showError("No se pudo listar el historico", "")
          }
        })
      } else {
        this._messagge.showError("No se pudo hacer la accion", "");
      }
    })
  }


  requisitoRespuesta(bean) {
    this._dccaService.setInPendingForInputState(bean.IDAction).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this.historialEtapas3 = [];
        this.spinner.show('spinnerLinea');

        this._dccaService.getHistoricoProcedure(this.bean.IDProcedureImp).subscribe((resp: any) => {
          if (resp.DataBeanProperties.ObjectValue) {
            this.spinner.hide('spinnerLinea');
            this.historialEtapas3 = resp.DataBeanProperties.ObjectValue;
          } else {
            this._messagge.showError("No se pudo listar el historico", "")
          }
        })
      } else {
        this._messagge.showError("No se pudo hacer la accion", "");
      }
    })
  }
  getNextStage(bean) {
    this._dccaService.getNextStage(bean.IDProcedureImp).subscribe((resp: any) => {
      if (resp.DataBeanProperties.ObjectValue) {
        this._messagge.showSuccess("Se completo la acción", "");
      } else {
        this._messagge.showError("No se pudo completar la acción", "");
      }

    })
  }
}