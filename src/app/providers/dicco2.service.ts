import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Dicco2Service {

  private url = environment.END_POINT;
  private headers;
  private options;

  listAux: any[];
  aux: boolean;
  IDClient = '$#HHJGUY9773H5MNKD65389745KJDFGDGG==';
  WSToken = '$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.options = { headers: this.headers };
  }

  //Model
  public postModel(nameModel, description, privateBool, publicBool, businessClass, useDistributionChannel) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.quickbpm.bean.BusinessProcess_updateBusinessProcess_com.quickbpm.bean.BusinessProcess',
      ArgumentList: [
        {
          DataBeanProperties: {
            PrivateBusiness: privateBool,
            Description: description,
            PublicBusiness: publicBool,
            IDBusinessProcess: null,
            Name: nameModel,
            IDBusinessClass: businessClass,
            UseDistributionChannel: useDistributionChannel
          },
          DataBeanName: 'com.quickbpm.bean.BusinessProcess'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putModel(id, nameModel, description, privateBool, publicBool, businessClass, useDistributionChannel) {
    const dataObj = {
      ServiceName: 'BpmService',
      MethodHash: 'com.quickbpm.bean.BusinessProcess_updateBusinessProcess_com.quickbpm.bean.BusinessProcess',
      ArgumentList: [
        {
          DataBeanProperties: {
            PrivateBusiness: privateBool,
            IDBusinessClass: businessClass,
            Description: description,
            PublicBusiness: publicBool,
            IDBusinessProcess: id,
            Name: nameModel,
            UseDistributionChannel: useDistributionChannel

          },
          DataBeanName: 'com.quickbpm.bean.BusinessProcess'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getListModel(id?) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getBusinessProcessCatalog_Number_Boolean_Boolean_Number",
      "ArgumentList": [
        null,
        null,
        null,
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdModel(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.quickbpm.bean.BusinessProcess_getBusinessProcess_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteModel(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'void_deleteBusinessProcess_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  //Documento
  public postDocumento(idBusinness, nameDocument, description, areaFuncional, tiempoValidez, tipoDocumento, formEngine, tiempoDefecto) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.quickbpm.bean.ProcedureDocument_updateProcedureDocument_com.quickbpm.bean.ProcedureDocument',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            IDLnFunctionalID: areaFuncional,
            Name: nameDocument,
            ValidityType: tiempoValidez,
            DocumentType: tipoDocumento,
            IDBusinessProcess: idBusinness,
            FormEngine: formEngine,
            DefeatTime: tiempoDefecto,
            IDDocument: null
          },
          DataBeanName: 'com.quickbpm.bean.ProcedureDocument'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putDocument(idDocument, idBusinness, nameDocument, description, areaFuncional, tiempoValidez, tipoDocumento, formEngine, tiempoDefecto) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.quickbpm.bean.ProcedureDocument_updateProcedureDocument_com.quickbpm.bean.ProcedureDocument',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            IDLnFunctionalID: areaFuncional,
            Name: nameDocument,
            ValidityType: tiempoValidez,
            DocumentType: tipoDocumento,
            IDBusinessProcess: idBusinness,
            FormEngine: formEngine,
            DefeatTime: tiempoDefecto,
            IDDocument: idDocument
          },
          DataBeanName: 'com.quickbpm.bean.ProcedureDocument'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getListDocument(id, type) {
    // const dataObj = {
    //   ServiceName: 'OrangeService',
    //   MethodHash: 'java.util.List_getBusinessProcedureDocumentCatalogByType_Number_Number',
    //   ArgumentList: [
    //     id,
    //     type
    //   ]
    // };
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getDocumentsCatalog_Number",
      "ArgumentList": [
        id
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("Enviando!!!", data);

    return this.http.post(this.url, data, this.options);
  }

  public getIdDocument(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.quickbpm.bean.ProcedureDocument_getProcedureDocument_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);

    return this.http.post(this.url, data, this.options);
  }

  public deleteDocument(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'Integer_deleteProcedureDocument_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Account
  public searchDocument(document) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getAccountByNit_Number_Number',
      ArgumentList: [
        document,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  //Agreement
  public searchAgreement(idAccount, inicio, fin) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getAgreementCatalogByAccount_Number_java.util.Date_java.util.Date",
      "ArgumentList": [
        idAccount,
        inicio,
        fin
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);

    return this.http.post(this.url, data, this.options);
  }

  public getListBeneficiary(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getBeneficiaryCatalogByAgreement_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getListInvestment(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getChapterInvestmentByAgreement_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getListHistoric(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getProcessHistoryByAgreement_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }

  // Plan
  public getListPlan(investment, beneficiary) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getBeneficiaryInvestmentByChapterInvestment_Number_Number',
      ArgumentList: [
        investment,
        beneficiary
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Arbol Unidades
  public getTreeUnit() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.shared.Tree_getTreeForFunctionalID_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdChildTreeUnit(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.shared.Tree_loadFunctionalIDTree_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdTreeUnit(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.functional.FunctionalID_getFunctionalIDByKey_Number_Number',
      ArgumentList: [
        id,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public addUnit(idPadre, code, nameUnit, description, channel, boss, site, email, useChannel) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.functional.FunctionalID_createFunctionalID_com.orange.bean.functional.FunctionalID_com.orange.bean.functional.FunctionalID',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Description: description,
            IDBoss: boss,
            DistributionChannel: channel,
            IDSite: site,
            Name: nameUnit,
            EmailForNotifications: email,
            UseDistributionChannel: useChannel
          },
          DataBeanName: 'com.orange.bean.functional.FunctionalID'
        },
        {
          DataBeanProperties: {
            IDLn: idPadre
          },
          DataBeanName: 'com.orange.bean.functional.FunctionalID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putUnit(idLn, idPadre, code, nameUnit, description, channel, boss, site, email, useChannel) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.orange.bean.functional.FunctionalID_createFunctionalID_com.orange.bean.functional.FunctionalID_com.orange.bean.functional.FunctionalID',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Description: description,
            IDBoss: boss,
            DistributionChannel: channel,
            IDSite: site,
            Name: nameUnit,
            IDLn: idLn,
            EmailForNotifications: email,
            UseDistributionChannel: useChannel

          },
          DataBeanName: 'com.orange.bean.functional.FunctionalID'
        },
        {
          DataBeanProperties: {
            IDLn: idPadre
          },
          DataBeanName: 'com.orange.bean.functional.FunctionalID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public deleteUnit(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.functional.FunctionalID_deleteFunctionalID_com.orange.bean.functional.FunctionalID',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDLn: id
          },
          DataBeanName: 'com.orange.bean.functional.FunctionalID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Arbol Ciudades
  public getTreeCity() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.shared.Tree_getTreeForSiteID_Number',
      ArgumentList: [
        0
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdChildTreeCity(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getSiteIDChilds_Number_Number',
      ArgumentList: [
        id,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdTreeCity(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.site.SiteID_getSiteIDByKey_Number_Number',
      ArgumentList: [
        id,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public addCity(idPadre, code, nameUnit, description) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.site.SiteID_createSiteID_com.orange.bean.site.SiteID_com.orange.bean.site.SiteID',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Description: description,
            Name: nameUnit,
          },
          DataBeanName: 'com.orange.bean.site.SiteID'
        },
        {
          DataBeanProperties: {
            IDLn: idPadre
          },
          DataBeanName: 'com.orange.bean.site.SiteID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putCity(idLn, idPadre, code, nameUnit, description) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.site.SiteID_createSiteID_com.orange.bean.site.SiteID_com.orange.bean.site.SiteID',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Description: description,
            Name: nameUnit,
            IDLn: idLn
          },
          DataBeanName: 'com.orange.bean.site.SiteID'
        },
        {
          DataBeanProperties: {
            IDLn: idPadre
          },
          DataBeanName: 'com.orange.bean.site.SiteID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public deleteCity(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.site.SiteID_deleteSiteID_com.orange.bean.site.SiteID',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDLn: id
          },
          DataBeanName: 'com.orange.bean.site.SiteID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Arbol Codigo
  public getTreeCode() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.shared.Tree_getTreeForUnspscID_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdChildTreeCode(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.shared.Tree_loadUnspscIDTree_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdTreeCode(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.orange.bean.unspsc.UnspscID_getUnspscIDByKey_Number_Number',
      ArgumentList: [
        id,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public addCode(idPadre, code, nameCode, description) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.unspsc.UnspscID_createUnspscID_com.orange.bean.unspsc.UnspscID_Number',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Description: description,
            Name: nameCode,
          },
          DataBeanName: 'com.orange.bean.unspsc.UnspscID'
        },
        idPadre
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putCode(idLn, idPadre, code, nameUnit, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.orange.bean.unspsc.UnspscID_createUnspscID_com.orange.bean.unspsc.UnspscID_Number',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Description: description,
            Name: nameUnit,
            IDLn: idLn
          },
          DataBeanName: 'com.orange.bean.unspsc.UnspscID'
        },
        idPadre
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public deleteCode(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'Number_deleteUnspscID_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Arbol Presupuesto
  public getTreeInvestment() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.shared.Tree_getTreeForBudgetID_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdChildTreeInvestment(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.shared.Tree_loadBudgetIDTree_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdTreeInvestment(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.orange.bean.budget.BudgetID_getBudgetIDByKey_Number_Number',
      ArgumentList: [
        id,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public addInvestment(idPadre, code, nameUnit, description, budgetcode) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.budget.BudgetID_createBudgetID_com.orange.bean.budget.BudgetID_com.orange.bean.budget.BudgetID',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Description: description,
            Name: nameUnit,
            BudgetCode: budgetcode
          },
          DataBeanName: 'com.orange.bean.budget.BudgetID'
        },
        {
          DataBeanProperties: {
            IDLn: idPadre
          },
          DataBeanName: 'com.orange.bean.budget.BudgetID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putInvestment(idLn, idPadre, code, nameUnit, description) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.budget.BudgetID_createBudgetID_com.orange.bean.budget.BudgetID_com.orange.bean.budget.BudgetID',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Description: description,
            Name: nameUnit,
            IDLn: idLn
          },
          DataBeanName: 'com.orange.bean.budget.BudgetID'
        },
        {
          DataBeanProperties: {
            IDLn: idPadre
          },
          DataBeanName: 'com.orange.bean.budget.BudgetID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public deleteInvestment(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.budget.BudgetID_deleteBudgetID_com.orange.bean.budget.BudgetID',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDLn: id
          },
          DataBeanName: 'com.orange.bean.budget.BudgetID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Report
  public getSeletorChapter() {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getChapterCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getSeletorInvestment() {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getBudgetArticleCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getSeletorGraphic() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_geGraphicsType_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getSeletorDirection() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_geOrientationType_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public createReport(json, typeChar, width, height, orintation) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_createReport_com.advantage.shared.Report_Number_Number_Number_Number',
      ArgumentList: [
        /* json */
        {
          "DataBeanProperties": json,
          "DataBeanName": "com.advantage.shared.Report"
        },
        typeChar,
        width,
        height,
        orintation
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);
    return this.http.post(this.url, data, this.options);
  }

  public getReportStructure(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getReportStructure_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }


  public invokeReport(id, report) {
    console.log(id, report);
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_invokeReport_Number_com.advantage.shared.Report',
      ArgumentList: [
        id,
        {
          "DataBeanProperties": report,
          "DataBeanName": "com.advantage.shared.Report"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdAccount(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.AbstractAccount_getAccount_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Search Unit
  public getSearchUnitName(name) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.orange.bean.functional.FunctionalID_getFunctionalIDByName_String',
      ArgumentList: [
        name
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getSearchUnitNameNew(name) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.UnidadMilitar_getUnidadMilitarByName_String',
      ArgumentList: [
        name
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Search City
  public getSearchCityName(name) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.site.SiteID_getSiteIDByName_String',
      ArgumentList: [
        name
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Delete Beneficiary
  public deleteBeneficiary(id) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteBeneficiary_Number",
      "ArgumentList": [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Delete Articulo
  public deleteArticulo(id) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteBeneficiaryInvestment_Number",
      "ArgumentList": [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Document Agreemt
  public postDocumentoAgreement(nameDocument, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.AgreementDocument_updateAgreementDocument_com.cofip.bean.AgreementDocument',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            Name: nameDocument,
            IDAgreementDocument: null
          },
          DataBeanName: 'com.cofip.bean.AgreementDocument'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putDocumentoAgreement(idDocument, nameDocument, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.AgreementDocument_updateAgreementDocument_com.cofip.bean.AgreementDocument',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            Name: nameDocument,
            IDAgreementDocument: idDocument
          },
          DataBeanName: 'com.cofip.bean.AgreementDocument'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getListDocumentAgreement() {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getAgreementDocumentsCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdDocumentAgreement(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.AgreementDocument_getAgreementDocument_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteDocumentAgreement(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'void_deleteAgreementDocument_com.cofip.bean.AgreementDocument',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDAgreementDocument: id
          },
          DataBeanName: 'com.cofip.bean.AgreementDocument'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Document COnvenio
  // POST
  public postAgreementAttached(media, mediaContext, idAgreement, idAgreementDocument, descripcion, iDBusinessState) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.AgreementAttached_updateAgreementAttached_com.cofip.bean.AgreementAttached',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDAgreementAttached: null,
            MediaContext: mediaContext,
            Media: media,
            IDAgreement: idAgreement,
            IDAgreementDocument: idAgreementDocument,
            Description: descripcion,
            IDBusinessState: iDBusinessState
          },
          DataBeanName: 'com.cofip.bean.AgreementAttached'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putAgreementAttached(idAttached, media, mediaContext, idAgreement, idAgreementDocument, descripcion, iDBusinessState) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.AgreementAttached_updateAgreementAttached_com.cofip.bean.AgreementAttached',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDAgreementAttached: idAttached,
            MediaContext: mediaContext,
            Media: media,
            IDAgreement: idAgreement,
            IDAgreementDocument: idAgreementDocument,
            Description: descripcion,
            IDBusinessState: iDBusinessState
          },
          DataBeanName: 'com.cofip.bean.AgreementAttached'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getIdAgreementAttached(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.AgreementAttached_getAgreementAttached_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getListAgreementAttachment(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getAgreementAttachedsCatalog_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteAgreementAttachment(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'Number_deleteAgreementAttached_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // SECTOR
  // POST
  public postSector(nameComponent, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.Sector_updateSector_com.cofip.bean.Sector',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            Name: nameComponent,
            IDSector: null,
          },
          DataBeanName: 'com.cofip.bean.Sector'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putSector(idSector, nameComponent, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.Sector_updateSector_com.cofip.bean.Sector',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            Name: nameComponent,
            IDSector: idSector,
          },
          DataBeanName: 'com.cofip.bean.Sector'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getIdSector(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.Sector_getSector_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getListSector() {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getSectorsCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteSector(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'Number_deleteSector_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Capitulo
  // POST
  public postCapitulo(description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.Chapter_updateChapter_com.cofip.bean.Chapter',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            IDChapter: null,
          },
          DataBeanName: 'com.cofip.bean.Chapter'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putCapitulo(idCapitulo, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.Chapter_updateChapter_com.cofip.bean.Chapter',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            IDChapter: idCapitulo,
          },
          DataBeanName: 'com.cofip.bean.Chapter'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getIdCapitulo(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.Chapter_getChapter_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getListCapitulo() {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getChapterCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteCapitulo(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'Number_deleteChapter_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Articulo
  // POST
  public postArticulo(description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.BudgetArticle_updateBudgetArticle_com.cofip.bean.BudgetArticle',
      ArgumentList: [
        {
          DataBeanProperties: {
            Name: description,
            IDBudgetArticle: null,
          },
          DataBeanName: 'com.cofip.bean.BudgetArticle'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putArticulo(idArticulo, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.BudgetArticle_updateBudgetArticle_com.cofip.bean.BudgetArticle',
      ArgumentList: [
        {
          DataBeanProperties: {
            Name: description,
            IDBudgetArticle: idArticulo,
          },
          DataBeanName: 'com.cofip.bean.BudgetArticle'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getIdArticulo(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.BudgetArticle_getBudgetArticle_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getListArticulo() {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getBudgetArticleCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteArticuloPre(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'Number_deleteBudgetArticle_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // SystemProperty
  // POST
  public postSystem(nameSystem, description, systemvalue, appName) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.SystemProperty_updateSystemProperty_com.advantage.bean.account.SystemProperty',
      ArgumentList: [
        {
          DataBeanProperties: {
            /* Type: 0, */
            Description: description,
            SystemValue: systemvalue,
            IDSystemProperty: null,
            AppName: appName,
            Name: nameSystem
          },
          DataBeanName: 'com.advantage.bean.account.SystemProperty'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putSystem(idSystem, nameSystem, description, systemvalue, appName) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.SystemProperty_updateSystemProperty_com.advantage.bean.account.SystemProperty',
      ArgumentList: [
        {
          DataBeanProperties: {
            /* Type: 0, */
            Description: description,
            SystemValue: systemvalue,
            IDSystemProperty: idSystem,
            AppName: appName,
            Name: nameSystem
          },
          DataBeanName: 'com.advantage.bean.account.SystemProperty'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getIdSystem(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.SystemProperty_getSystemProperty_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getListSystem() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getSystemPropertyList_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteSystem(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'void_deleteSystemProperty_com.advantage.bean.account.SystemProperty',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDSystemProperty: id
          },
          DataBeanName: 'com.advantage.bean.account.SystemProperty'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Arbol Unidades New
  public getTreeUnitNew() {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.advantage.shared.Tree_getTreeForUnidadMilitar_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdChildTreeUnitNew(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.advantage.shared.Tree_loadUnidadMilitarTree_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdTreeUnitNew(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.UnidadMilitar_getUnidadMilitarByKey_Number_Number',
      ArgumentList: [
        id,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public addUnitNew(idPadre, nameUnit, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.UnidadMilitar_createUnidadMilitar_com.cofip.bean.UnidadMilitar_com.cofip.bean.UnidadMilitar',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            Name: nameUnit,
          },
          DataBeanName: 'com.cofip.bean.UnidadMilitar'
        },
        {
          DataBeanProperties: {
            IDLn: idPadre
          },
          DataBeanName: 'com.cofip.bean.UnidadMilitar'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putUnitNew(idLn, idPadre, nameUnit, description, site) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.UnidadMilitar_createUnidadMilitar_com.cofip.bean.UnidadMilitar_com.cofip.bean.UnidadMilitar',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            Name: nameUnit,
            IDLn: idLn
          },
          DataBeanName: 'com.cofip.bean.UnidadMilitar'
        },
        {
          DataBeanProperties: {
            IDLn: idPadre
          },
          DataBeanName: 'com.cofip.bean.UnidadMilitar'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public deleteUnitNew(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.UnidadMilitar_deleteUnidadMilitar_com.cofip.bean.UnidadMilitar',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDLn: id
          },
          DataBeanName: 'com.cofip.bean.UnidadMilitar'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // SystemProperty
  // POST
  public postLogisticUnit(nameSystem, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.LogisticUnit_updateLogisticUnit_com.cofip.bean.LogisticUnit',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            IDLogisticUnit: null,
            Name: nameSystem
          },
          DataBeanName: 'com.cofip.bean.LogisticUnit'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public putLogisticUnit(idLogistic, nameSystem, description) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.LogisticUnit_updateLogisticUnit_com.cofip.bean.LogisticUnit',
      ArgumentList: [
        {
          DataBeanProperties: {
            /* Type: 0, */
            Description: description,
            IDLogisticUnit: idLogistic,
            Name: nameSystem
          },
          DataBeanName: 'com.cofip.bean.LogisticUnit'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getIdLogistic(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.cofip.bean.LogisticUnit_getLogisticUnit_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getListLogistic() {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getLogisticUnitsCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteLogistic(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'Number_deleteLogisticUnit_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }
  getBudgetID(id) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.orange.bean.budget.BudgetID_getBudgetID_com.orange.bean.budget.BudgetID",
      "ArgumentList": [
        {
          "DataBeanProperties": {
            "IDLn": id
          },
          "DataBeanName": "com.orange.bean.budget.BudgetID"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);

    return this.http.post(this.url, data);
  }
  createBeneficiaryReport(idBeneficiary) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_createBeneficiaryReport_Number",
      "ArgumentList": [
        idBeneficiary
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data);
  }

  //Business-Statement
  public postBusinessStatement(bean) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'com.quickbpm.bean.BusinessState_updateBusinessState_com.quickbpm.bean.BusinessState',
      ArgumentList: [
        {
          DataBeanProperties: bean,
          DataBeanName: 'com.quickbpm.bean.BusinessState'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getListBusinessStatement(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'java.util.List_getBusinessStateCatalog_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public deleteBusinessStatement(id) {
    const dataObj = {
      ServiceName: 'CofipService',
      MethodHash: 'Integer_deleteBusinessState_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }
  getBudgetIDLike(code) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getBudgetIDLike_String",
      "ArgumentList": [
        code
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("envaindo...", data);

    return this.http.post(this.url, data, this.options);
  }

  getWorkGroupMemberCatalog(idLn, state) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getWorkGroupMemberCatalog_Number_Number",
      "ArgumentList": [
        idLn,
        state
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("envaindo...", data);

    return this.http.post(this.url, data, this.options);
  }


  getWorkGroupMember(idProcedure,
    state,
    nit,
    nombre,
    apellido) {

    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getWorkGroupMember_Number_Number_Number_String_String",
      "ArgumentList": [
        idProcedure,
        state,
        nit,
        nombre,
        apellido
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("envaindo...", data);
    return this.http.post(this.url, data, this.options);
  }

  getProcedureActionForAssign(idProcedureImp) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getProcedureActionForAssign_Number",
      "ArgumentList": [
        idProcedureImp
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("envaindo...", data);
    return this.http.post(this.url, data, this.options);
  }


  assignActionResponseToGroupMember(idAction: number, idAccount: number, idAccountAllocator: number) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "Number_assignActionResponseToGroupMember_Number_Number_Number",
      "ArgumentList": [
        idAction,
        idAccount,
        idAccountAllocator
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("envaindo...", data);
    return this.http.post(this.url, data, this.options);
  }

  assignProcedureImpToGroupMember(idProcedureImp,
    idAccount,
    idAccountAllocator) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "Number_assignProcedureImpToGroupMember_Number_Number_Number",
      "ArgumentList": [
        idProcedureImp,
        idAccount,
        idAccountAllocator
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("envaindo...", data);
    return this.http.post(this.url, data, this.options);
  }
}
