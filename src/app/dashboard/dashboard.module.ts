import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsModalService, ModalModule, BsModalRef } from "ngx-bootstrap/modal";
import { MessageService } from '../providers/message.service';
import { ToastrModule } from 'ngx-toastr';
import { ColorPickerModule } from 'ngx-color-picker';
import { AccountComponent } from './account/account.component';
import { MenuComponent } from './menu/menu.component';
import { ActiveComponent } from './active/active.component';
import { IconsModule } from '../lib/icons/icons.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { BusinessModelComponent } from './business-model/business-model.component';
import { RegistrarProcesoComponent } from './registrar-proceso/registrar-proceso.component';
import { ProcedimientosComponent } from './procedimientos/procedimientos.component';
import { FilterModeloPipe } from './pipes/filter-modelo.pipe';
import { InputDocumentComponent } from './input-document/input-document.component';
import { FilterDocumentPipe } from './pipes/filter-document.pipe';
import { CollaborationAgreementComponent } from './collaboration-agreement/collaboration-agreement.component';
import { FilterProcedimientosPipe } from './pipes/filter-procedimientos.pipe';
import { PlanComponent } from './plan/plan.component';
import { FileService } from '../providers/file.service';
import { FormularioGenericoComponent } from './formulario-generico/formulario-generico.component'
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { TramitesXVerificarComponent } from './tramites-x-verificar/tramites-x-verificar.component';
import { DocumentosXResponderComponent } from './documentos-x-responder/documentos-x-responder.component';
import { DocumentosFXResponderComponent } from './documentos-f-x-responder/documentos-f-x-responder.component';
import { UnitComponent } from './unit/unit.component';
import { CityComponent } from './city/city.component';
import { CodeComponent } from './code/code.component';
import { InvestmentComponent } from './investment/investment.component'
import { ModalUnitComponent } from './modal-unit/modal-unit.component';
import { FormularioBeneficiariosComponent } from './formulario-beneficiarios/formulario-beneficiarios.component';
import { FormularioPlanInversionComponent } from './formulario-plan-inversion/formulario-plan-inversion.component';
import { FormularioArticuloPComponent } from './formulario-articulo-p/formulario-articulo-p.component';
import { FormularioPlanNecesidadComponent } from './formulario-plan-necesidad/formulario-plan-necesidad.component'
import { ReportComponent } from './report/report.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ModalInvestmentComponent } from './modal-investment/modal-investment.component';
import { ModalSearchComponent } from './modal-search/modal-search.component';
import { ModalCityComponent } from './modal-city/modal-city.component';
import { ModalSearchCityComponent } from './modal-search-city/modal-search-city.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NeedsPlanComponent } from './needs-plan/needs-plan.component';
import { FormularioPlanNecesidadesComponent } from './formulario-plan-necesidades/formulario-plan-necesidades.component';
import { TipoDocumentoSoporteComponent } from './tipo-documento-soporte/tipo-documento-soporte.component';
import { TipoDocumentoModalComponent } from './tipo-documento-modal/tipo-documento-modal.component';
import { SectorComponent } from './sector/sector.component';
import { CapituloApoyoComponent } from './capitulo-apoyo/capitulo-apoyo.component';
import { ArticuloPresupuestalComponent } from './articulo-presupuestal/articulo-presupuestal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SystempropertyComponent } from './systemproperty/systemproperty.component';
import { StatesComponent } from './states/states.component';
import { ModalConsignacionComponent } from './modal-consignacion/modal-consignacion.component';
import { DocumentosRechazadosComponent } from './documentos-rechazados/documentos-rechazados.component';
import { UnidadMilitarComponent } from './unidad-militar/unidad-militar.component';
import { ModalUnitMilitarComponent } from './modal-unit-militar/modal-unit-militar.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { LogisticUnitComponent } from './logistic-unit/logistic-unit.component';
import { ModalRubroPresupuestalFiltradoComponent } from './modal-rubro-presupuestal-filtrado/modal-rubro-presupuestal-filtrado.component';
import { MisConveniosComponent } from './mis-convenios/mis-convenios.component';
import { BusinessStatementComponent } from './business-statement/business-statement.component';
import { MisConveniosSeguimientoComponent } from './mis-convenios-seguimiento/mis-convenios-seguimiento.component';
import { MisConveniosLiquidacionComponent } from './mis-convenios-liquidacion/mis-convenios-liquidacion.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HistoricProcessComponent } from './historic-process/historic-process.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AddUserWorkGroupComponent } from './add-user-work-group/add-user-work-group.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TramitesXAsignarComponent } from './tramites-x-asignar/tramites-x-asignar.component';
export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 0,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.NATURAL
};
@NgModule({
  declarations: [
    AccountComponent,
    MenuComponent,
    ActiveComponent,
    BusinessModelComponent,
    RegistrarProcesoComponent,
    ProcedimientosComponent,
    FilterModeloPipe,
    InputDocumentComponent,
    FilterDocumentPipe,
    CollaborationAgreementComponent,
    FilterProcedimientosPipe,
    PlanComponent,
    FormularioGenericoComponent,
    TramitesXVerificarComponent,
    DocumentosXResponderComponent,
    DocumentosFXResponderComponent,
    UnitComponent,
    CityComponent,
    CodeComponent,
    InvestmentComponent,
    ModalUnitComponent,
    FormularioBeneficiariosComponent,
    FormularioPlanInversionComponent,
    FormularioArticuloPComponent,
    FormularioPlanNecesidadComponent,
    ReportComponent,
    ModalInvestmentComponent,
    ModalSearchComponent,
    ModalCityComponent,
    ModalSearchCityComponent,
    NeedsPlanComponent,
    FormularioPlanNecesidadesComponent,
    TipoDocumentoSoporteComponent,
    TipoDocumentoModalComponent,
    SectorComponent,
    CapituloApoyoComponent,
    ArticuloPresupuestalComponent,
    SystempropertyComponent,
    StatesComponent,
    ModalConsignacionComponent,
    DocumentosRechazadosComponent,
    UnidadMilitarComponent,
    ModalUnitMilitarComponent,
    LogisticUnitComponent,
    ModalRubroPresupuestalFiltradoComponent,
    MisConveniosComponent,
    BusinessStatementComponent,
    MisConveniosSeguimientoComponent,
    MisConveniosLiquidacionComponent,
    HistoricProcessComponent,
    AddUserWorkGroupComponent,
    TramitesXAsignarComponent,


  ],
  exports: [
    AccountComponent,
    MenuComponent,
    ActiveComponent,
    BusinessModelComponent,
    InputDocumentComponent,
    UnitComponent,
    CityComponent,
    CodeComponent,
    InvestmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    ColorPickerModule,
    IconsModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    MatCurrencyFormatModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot()

  ],
  providers: [
    BsModalService,
    BsModalRef,
    MessageService,
    FileService,
    CurrencyPipe,
    DatePipe

  ]
})
export class DashboardModule { }
