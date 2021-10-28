import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { AccountComponent } from './account/account.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from '../guards/auth.guard';
import { ActiveComponent } from './active/active.component';
import { BusinessModelComponent } from './business-model/business-model.component';
import { RegistrarProcesoComponent } from './registrar-proceso/registrar-proceso.component';
import { ProcedimientosComponent } from './procedimientos/procedimientos.component';
import { InputDocumentComponent } from './input-document/input-document.component';
import { CollaborationAgreementComponent } from './collaboration-agreement/collaboration-agreement.component';
import { PlanComponent } from './plan/plan.component';
import { TramitesXVerificarComponent } from './tramites-x-verificar/tramites-x-verificar.component';
import { DocumentosXResponderComponent } from './documentos-x-responder/documentos-x-responder.component';
import { DocumentosFXResponderComponent } from './documentos-f-x-responder/documentos-f-x-responder.component';
import { UnitComponent } from './unit/unit.component';
import { InvestmentComponent } from './investment/investment.component';
import { CodeComponent } from './code/code.component';
import { CityComponent } from './city/city.component';
import { ReportComponent } from './report/report.component';
import { NeedsPlanComponent } from './needs-plan/needs-plan.component';
import { TipoDocumentoSoporteComponent } from './tipo-documento-soporte/tipo-documento-soporte.component';
import { SectorComponent } from './sector/sector.component';
import { CapituloApoyoComponent } from './capitulo-apoyo/capitulo-apoyo.component';
import { ArticuloPresupuestalComponent } from './articulo-presupuestal/articulo-presupuestal.component';
import { SystempropertyComponent } from './systemproperty/systemproperty.component';
import { StatesComponent } from './states/states.component';
import { DocumentosRechazadosComponent } from './documentos-rechazados/documentos-rechazados.component';
import { UnidadMilitarComponent } from './unidad-militar/unidad-militar.component';
import { LogisticUnitComponent } from './logistic-unit/logistic-unit.component';
import { MisConveniosComponent } from './mis-convenios/mis-convenios.component';
import { BusinessStatementComponent } from './business-statement/business-statement.component';
import { MisConveniosSeguimientoComponent } from './mis-convenios-seguimiento/mis-convenios-seguimiento.component';
import { MisConveniosLiquidacionComponent } from './mis-convenios-liquidacion/mis-convenios-liquidacion.component';
import { HistoricProcessComponent } from './historic-process/historic-process.component';
import { AddUserWorkGroupComponent } from './add-user-work-group/add-user-work-group.component';
import { TramitesXAsignarComponent } from './tramites-x-asignar/tramites-x-asignar.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'usuario', component: AccountComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'active', component: ActiveComponent },
      { path: 'modelo-negocios', component: BusinessModelComponent },
      { path: 'input-document', component: InputDocumentComponent },
      { path: 'agreement', component: CollaborationAgreementComponent },
      { path: 'plan', component: PlanComponent },
      { path: 'registrar-proceso', component: RegistrarProcesoComponent },
      { path: 'procedimiento', component: ProcedimientosComponent },
      { path: 'tramites-por-verificar', component: TramitesXVerificarComponent },
      { path: 'documentos-por-responder', component: DocumentosXResponderComponent },
      { path: 'documentos-formulario-por-responder', component: DocumentosFXResponderComponent },
      { path: 'grupo-trabajo', component: UnitComponent },
      { path: 'ciudad', component: CityComponent },
      { path: 'codigo', component: CodeComponent },
      { path: 'presupuesto', component: InvestmentComponent },
      { path: 'reporte', component: ReportComponent },
      { path: 'tipo-doc-soporte-plan-inversion', component: NeedsPlanComponent },
      { path: 'tipo-documento-soportes', component: TipoDocumentoSoporteComponent },
      { path: 'sector', component: SectorComponent },
      { path: 'capitulo', component: CapituloApoyoComponent },
      { path: 'articulo', component: ArticuloPresupuestalComponent },
      { path: 'system', component: SystempropertyComponent },
      { path: 'states', component: StatesComponent },
      { path: 'documentos-rechazados', component: DocumentosRechazadosComponent },
      { path: 'unidad-militar', component: UnidadMilitarComponent },
      { path: 'logistica', component: LogisticUnitComponent },
      { path: 'mis-convenios', component: MisConveniosComponent },
      { path: 'estado-negocio', component: BusinessStatementComponent },
      { path: 'mis-convenios-seguimiento', component: MisConveniosSeguimientoComponent },
      { path: 'mis-convenios-liquidacion', component: MisConveniosLiquidacionComponent },
      { path: 'historial-procesos', component: HistoricProcessComponent },
      { path: 'add-user-work', component: AddUserWorkGroupComponent },
      { path: 'tramites-por-asignar', component: TramitesXAsignarComponent },



    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
