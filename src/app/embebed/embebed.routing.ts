import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmbebedComponent } from './embebed.component';
import { AuthGuard } from '../guards/auth.guard';
import { AccountComponent } from './../dashboard/account/account.component';
import { MenuComponent } from './../dashboard/menu/menu.component';
import { ActiveComponent } from './../dashboard/active/active.component';
import { BusinessModelComponent } from './../dashboard/business-model/business-model.component';
import { RegistrarProcesoComponent } from './../dashboard/registrar-proceso/registrar-proceso.component';
import { ProcedimientosComponent } from './../dashboard/procedimientos/procedimientos.component';
import { InputDocumentComponent } from './../dashboard/input-document/input-document.component';
import { CollaborationAgreementComponent } from './../dashboard/collaboration-agreement/collaboration-agreement.component';
import { PlanComponent } from './../dashboard/plan/plan.component';
import { TramitesXVerificarComponent } from './../dashboard/tramites-x-verificar/tramites-x-verificar.component';
import { DocumentosXResponderComponent } from './../dashboard/documentos-x-responder/documentos-x-responder.component';
import { DocumentosFXResponderComponent } from './../dashboard/documentos-f-x-responder/documentos-f-x-responder.component';
import { UnitComponent } from './../dashboard/unit/unit.component';
import { InvestmentComponent } from './../dashboard/investment/investment.component';
import { CodeComponent } from './../dashboard/code/code.component';
import { CityComponent } from './../dashboard/city/city.component';
import { ReportComponent } from './../dashboard/report/report.component';
import { NeedsPlanComponent } from './../dashboard/needs-plan/needs-plan.component';
import { TipoDocumentoSoporteComponent } from './../dashboard/tipo-documento-soporte/tipo-documento-soporte.component';
import { SectorComponent } from './../dashboard/sector/sector.component';
import { CapituloApoyoComponent } from './../dashboard/capitulo-apoyo/capitulo-apoyo.component';
import { ArticuloPresupuestalComponent } from './../dashboard/articulo-presupuestal/articulo-presupuestal.component';
import { SystempropertyComponent } from './../dashboard/systemproperty/systemproperty.component';
import { StatesComponent } from './../dashboard/states/states.component';
import { DocumentosRechazadosComponent } from './../dashboard/documentos-rechazados/documentos-rechazados.component';
import { UnidadMilitarComponent } from './../dashboard/unidad-militar/unidad-militar.component';
import { LogisticUnitComponent } from './../dashboard/logistic-unit/logistic-unit.component';
import { MisConveniosComponent } from './../dashboard/mis-convenios/mis-convenios.component';
import { BusinessStatementComponent } from './../dashboard/business-statement/business-statement.component';
import { MisConveniosSeguimientoComponent } from './../dashboard/mis-convenios-seguimiento/mis-convenios-seguimiento.component';
import { MisConveniosLiquidacionComponent } from './../dashboard/mis-convenios-liquidacion/mis-convenios-liquidacion.component';
import { HistoricProcessComponent } from './../dashboard/historic-process/historic-process.component';
const routes: Routes = [
    {
        path: 'embebed',
        component: EmbebedComponent,
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
            { path: 'historial-procesos', component: HistoricProcessComponent }

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmbebedRoutingModule { }
