import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Dicco2Service } from 'src/app/providers/dicco2.service';
import { FileService } from 'src/app/providers/file.service';
import { MessageService } from 'src/app/providers/message.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  formChapter = new FormControl();
  formAgreement = new FormControl();
  formArticle = new FormControl();
  formAport = new FormControl();
  /* optionChapter: any; */
  chapter: any[];
  agreement: any[];
  public investment: any[];
  optionDocument: any;
  listAccount: any[];
  nombreCompleto: string;
  optionUnit: any;
  optionFilter: any;
  optionConsolidation: any;
  /* optionAgreement: any; */
  optionInvestment: any;
  optionRubro: any;
  optionInitDate: any;
  optionFinishDate: any;
  optionWidth: any;
  optionHeight: any;
  optionGraphic: any;
  optionDicrection: any;
  optionAnios: any;
  optionAport: any;
  listAnios = [];
  

  // Selector
  selectorAport: string;
  selectorFitler: string;
  selectorGraphic: string;
  selectorDicrection: string;
  selectorInvestment: string;
  selectorConsolidation: string;
  listAportes: any[];
  listGraphic: any[];
  listDicrection: any[];
  nameRubro: string;
  nameUni: string;
  nameUniMenor: string;
  nameUniTact: string;
  idAccount: number;
  listUnitHigher = [];
  listUnitNameHigher = [];
  listUnitLess = [];
  listUnitNameLess = [];
  listUnitTac = [];
  listUnitNameTac = [];
  listUnitInvestment = [];
  listUnitNameInvestment = [];
  listTemporal: any[];
  idReport = 0;
  listCompany = [];
  listEstado = [];
  listCapitulo = [];
  listArticuloPresupuestal = [];
  listTipoAPorte = [];
  listGraph = [];
  listOrientation = [];
  listAgreement = [];
  viewBotonHigher = false;
  viewBotonLess = false;
  viewBotonTac = false;
  viewBotonRubro = false;

  // Report
  listReport: any[];
  listAuxCapitulo = [];
  listAuxAgreement = [];
  listAuxArticle = [];
  listAuxAport = [];

  public modalRef: BsModalRef;
  nameUser: string;
  idUser: number;

  constructor(private reportService: Dicco2Service,
              public modalService: BsModalService,
              private message: MessageService,
              private _files: FileService,
              private change: ChangeDetectorRef,
              private spinerService: NgxSpinnerService) { }

  ngOnInit(): void {
    /* this.selectorFitler = 'Seleccionar Estado del Convenio'; */
    this.loadData();
  }

  loadData(){
    this.reportService.getSeletorChapter().subscribe((resp: any) => {
      console.log(resp);
      this.chapter = resp.DataBeanProperties.ObjectValue;
    });

    this.reportService.getSeletorInvestment().subscribe((respInv: any) => {
      console.log(respInv);
      this.investment = respInv.DataBeanProperties.ObjectValue;
    });

    this.reportService.getReportStructure(this.idReport).subscribe((respList: any) => {
      console.log(respList);
      this.listTemporal = respList.DataBeanProperties.ObjectValue;
      console.log(this.listTemporal);
      this.listDicrection = this.listTemporal[11].DataBeanProperties.Options;
      this.agreement = this.listTemporal[1].DataBeanProperties.Options;
      this.listAportes = this.listTemporal[9].DataBeanProperties.Options;
      this.listGraphic = this.listTemporal[10].DataBeanProperties.Options;
      this.optionHeight = this.listTemporal[13].DataBeanProperties.DefaultValue.DataBeanProperties.Property;
      this.optionWidth = this.listTemporal[12].DataBeanProperties.DefaultValue.DataBeanProperties.Property;
      this.optionDicrection = this.listTemporal[11].DataBeanProperties.DefaultValue.DataBeanProperties.Property;
      this.optionGraphic = this.listTemporal[10].DataBeanProperties.DefaultValue.DataBeanProperties.Property;
    });
  }

  getAccount(account){
    console.log(account);
    this.nameUser = account.Name1 + ' ' + account.Surname1;
    this.idUser = account.IDAccount;
    this.idAccount = account.IDAccount;
  }

  abirModalUnidad() {
    document.getElementById('btnModalUnidad').click();
  }

  abirModalInvestment() {
    document.getElementById('btnModalInvestment').click();
  }

  getIdHigher(id: number) {
    console.log(id);
    this.listUnitHigher.push(id);
  }

  getNameHigher(name: string) {
    this.listUnitNameHigher.push(name);
  }

  deleteHigher(){
    this.listUnitNameHigher.pop();
    this.listUnitHigher.pop();
  }

  getUnit2(id: number) {
    console.log(id);
    this.listUnitLess.push(id);
  }
  getNameUnit2(name: string) {
    console.log(name);
    this.listUnitNameLess.push(name);
  }

  deleteLess(){
    this.listUnitNameLess.pop();
    this.listUnitLess.pop();
  }

  getUnit3(id: number) {
    console.log(id);
    this.listUnitTac.push(id);
  }
  getNameUnit3(name: string) {
    console.log(name);
    this.listUnitNameTac.push(name);
  }

  deleteTac(){
    this.listUnitNameTac.pop();
    this.listUnitTac.pop();
  }

  getInvestment(id: number) {
    console.log(id);
    this.listUnitInvestment.push(id);
  }

  getNameInvestment(name: string) {
    console.log(name);
    this.listUnitNameInvestment.push(name);
  }

  deleteInvestment(){
    this.listUnitNameInvestment.pop();
    this.listUnitInvestment.pop();
  }

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-xl modal-dialog-centered'
  };

  openReport(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, this.config);
  }

  cerrar() {
    this.listCompany.splice(0, this.listCompany.length);
    this.listGraph.splice(0, this.listGraph.length);
    this.listOrientation.splice(0, this.listOrientation.length);
    this.listAnios.splice(0, this.listAnios.length);
    this.listAuxCapitulo.splice(0, this.listAuxCapitulo.length);
    this.listAuxAgreement.splice(0, this.listAuxAgreement.length);
    this.listAuxArticle.splice(0, this.listAuxArticle.length);
    this.listAuxAport.splice(0, this.listAuxAport.length);
    this.modalService.hide();
  }

  searchDocument(){
    this.reportService.searchDocument(this.optionDocument).subscribe((resp: any) => {
      console.log(resp);
      this.listAccount = resp.DataBeanProperties.ObjectValue;
      if (this.listAccount.length === 0){
        this.message.showError('Verifique que el documento ingresado sea correcto.', 'Documento');
      }else{
        this.listAccount = resp.DataBeanProperties.ObjectValue;
        this.nombreCompleto = this.listAccount[0].DataBeanProperties.Name1 + ' ' +
        this.listAccount[0].DataBeanProperties.Name2 + ' ' +
        this.listAccount[0].DataBeanProperties.Surname1 + ' ' +
        this.listAccount[0].DataBeanProperties.Surname2;
        this.idAccount = this.listAccount[0].DataBeanProperties.IDAccount;
        this.message.showSuccess('El documento ha sido encontrado', 'Documento');
      }
    });
  }

  captionFilter(){
    console.log(this.optionFilter);
  }

  changeEvent(id, data){
    console.log(data);
    let aux = {
      idValor: id,
      dataValor: data
    }
    const auxList = this.listCapitulo.findIndex(i => i.idValor === id);
    console.log(auxList);
    if(auxList !== -1){
      this.listCapitulo.splice(auxList, 1);
    }
    if(auxList === -1){
      this.listCapitulo.push(aux);
    }
  }

  changeEventAgre(id, data){
    console.log(data);
    let aux = {
      idValor: id,
      dataValor: data
    }
    const auxList = this.listAgreement.findIndex(i => i.idValor === id);
    console.log(auxList);
    if(auxList !== -1){
      this.listAgreement.splice(auxList, 1);
    }
    if(auxList === -1){
      this.listAgreement.push(aux);
    }
  }

  changeEventArticle(id, data){
    console.log(data);
    let aux = {
      idValor: id,
      dataValor: data
    }
    const auxList = this.listArticuloPresupuestal.findIndex(i => i.idValor === id);
    console.log(auxList);
    if(auxList !== -1){
      this.listArticuloPresupuestal.splice(auxList, 1);
    }
    if(auxList === -1){
      this.listArticuloPresupuestal.push(aux);
    }
  }

  changeEventAport(id, data){
    console.log(data);
    let aux = {
      idValor: id,
      dataValor: data
    }
    const auxList = this.listTipoAPorte.findIndex(i => i.idValor === id);
    console.log(auxList);
    if(auxList !== -1){
      this.listTipoAPorte.splice(auxList, 1);
    }
    if(auxList === -1){
      this.listTipoAPorte.push(aux);
    }
  }

  deleteChapter(item){
    console.log(item);
    const aux = this.formChapter.value.findIndex(i => i === item);
    console.log(aux);
    if(aux !== -1){
      let newList = JSON.parse(JSON.stringify(this.formChapter.value)); 
      newList.splice(aux, 1);
      this.formChapter.setValue(newList);
      console.log(this.listCapitulo);
      const auxList2 = this.listCapitulo.findIndex(i => i.idValor === item);
      console.log(auxList2);
      if(auxList2 !== -1){
        this.listCapitulo.splice(auxList2, 1);
      }
    }
  }

  deleteAgreement(item){
    console.log(item);
    const aux = this.formAgreement.value.findIndex(i => i === item);
    console.log(aux);
    if(aux !== -1){
      let newList = JSON.parse(JSON.stringify(this.formAgreement.value)); 
      newList.splice(aux, 1);
      this.formAgreement.setValue(newList);
      console.log(this.listAgreement);
      const auxList2 = this.listAgreement.findIndex(i => i.idValor === item);
      console.log(auxList2);
      if(auxList2 !== -1){
        this.listAgreement.splice(auxList2, 1);
      }
    }
  }

  deleteArticle(item){
    console.log(item);
    const aux = this.formArticle.value.findIndex(i => i === item);
    console.log(aux);
    if(aux !== -1){
      let newList = JSON.parse(JSON.stringify(this.formArticle.value)); 
      newList.splice(aux, 1);
      this.formArticle.setValue(newList);
      const auxList2 = this.listArticuloPresupuestal.findIndex(i => i.idValor === item);
      console.log(auxList2);
      if(auxList2 !== -1){
        this.listArticuloPresupuestal.splice(auxList2, 1);
      }
    }
  }

  deleteAport(item){
    console.log(item);
    const aux = this.formAport.value.findIndex(i => i === item);
    console.log(aux);
    if(aux !== -1){
      let newList = JSON.parse(JSON.stringify(this.formAport.value)); 
      newList.splice(aux, 1);
      this.formAport.setValue(newList);
      const auxList2 = this.listTipoAPorte.findIndex(i => i.idValor === item);
      console.log(auxList2);
      if(auxList2 !== -1){
        this.listTipoAPorte.splice(auxList2, 1);
      }
    }
  }

  sendReport(){
    this.spinerService.show();
    if(this.getValidateInput(this.idAccount) !== null){
      this.listCompany.push(this.idAccount);
    }
    if(this.getValidateInput(this.listCapitulo) !== null){
      for(let i = 0; i < this.listCapitulo.length; i++){
        this.listAuxCapitulo.push(this.listCapitulo[i].idValor);
        console.log(this.listAuxCapitulo);
      }
    } else {
      this.listCapitulo  = this.getValidateList(this.listCapitulo);
    }
    if(this.getValidateInput(this.listAgreement) !== null){
      for(let i = 0; i < this.listAgreement.length; i++){
        this.listAuxAgreement.push(this.listAgreement[i].idValor);
        console.log(this.listAuxAgreement);
      }
    } else {
      this.listAgreement  = this.getValidateList(this.listAgreement);
    }

    if(this.getValidateInput(this.listArticuloPresupuestal) !== null){
      for(let i = 0; i < this.listArticuloPresupuestal.length; i++){
        this.listAuxArticle.push(this.listArticuloPresupuestal[i].idValor);
        console.log(this.listAuxArticle);
      }
    } else {
      this.listArticuloPresupuestal  = this.getValidateList(this.listArticuloPresupuestal);
    }
    if(this.getValidateInput(this.listTipoAPorte) !== null){
      for(let i = 0; i < this.listTipoAPorte.length; i++){
        this.listAuxAport.push(this.listTipoAPorte[i].idValor);
        console.log(this.listAuxAport);
      }
    } else {
      this.listTipoAPorte  = this.getValidateList(this.listTipoAPorte);
    }
    if(this.getValidateInput(this.optionGraphic) !== null){
      this.listGraph.push(this.optionGraphic);
    }
    if(this.getValidateInput(this.optionDicrection) !== null){
      this.listOrientation.push(this.optionDicrection);
    }
    
    if(this.getValidateInput(this.optionInitDate) !== null && this.getValidateInput(this.optionFinishDate) !== null){
      this.listAnios.push(this.getFecha(this.optionInitDate));
      this.listAnios.push(this.getFecha(this.optionFinishDate));
    }
    console.log(this.formChapter);
    
    let json = {
      IDEmpresa: this.listCompany,
      Estado: this.listAuxAgreement,
      IDUnidadMayor: this.listUnitHigher,
      IDUnidadMenor: this.listUnitLess,
      IDUnidadTactica: this.listUnitTac,
      IDCapituloApoyo: this.listAuxCapitulo,
      IDArticuloPresupuestal: this.listAuxArticle,
      IDRubroPresupuestal: this.listUnitInvestment,
      Fechas: this.listAnios,
      TipoAporte: this.listAuxAport,
      GraphicType: this.listGraph, 
      Width:this.optionWidth, 
      Height: this.optionHeight, 
      OrientationType: this.listOrientation
    };
    console.log(json);
    this.reportService.invokeReport(this.idReport, json).subscribe((resp: any) => {
      console.log(resp);
      if(resp.DataBeanProperties.ObjectValue){
        this.spinerService.hide();
        this.message.showSuccess('Se ha generado el reporte', 'Reporte');
        this.listReport = resp.DataBeanProperties.ObjectValue;
        for (let index = 0; index < this.listReport.length; index++) {
          if(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Type === 'IMAGE'){
            resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myImage =
            this._files.getUrlFiles(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext,
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Media);
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.viewData = true;
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.viewData2 = false;
          }
          if(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Type === 'ZIP'){
            resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.myLink =
            this._files.getUrlFiles(resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.MediaContext,
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.Media);
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.viewData = false;
              resp.DataBeanProperties.ObjectValue[index].DataBeanProperties.viewData2 = true;
          }
        }
      } else {
        this.spinerService.hide();
        this.message.showSuccess('No se ha generado el reporte', 'Reporte');
      }
      
    });
  }

  getFecha(dataDia): string{
    if (dataDia !== ''){
      return dataDia + ' ' + '00:00:00';
    }
    return null;
  }

  getValidateInput(data){
    if (data === ''){
      return null;
    }
    if(data === undefined ){
      return null;
    }
    return data;
  }

  getValidateList(data){
    let aux = [];
    if (data === ''){
      return aux;
    }
    if(data === undefined ){
      return aux;
    }
    return data;
  }

}
