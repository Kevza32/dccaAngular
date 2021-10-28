import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DicoService {

  private url = environment.END_POINT;
  private headers;
  private options;

  listAux: any[];
  aux: boolean;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.options = { headers: this.headers };
  }
  public getListModel() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getBusinessProcessCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }
  createBusinessProcess(idBusinessProcess: number, accountID: number, descripcion: string) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "com.quickbpm.bean.ProcedureImp_createBusinessProcessAndNextStage_Number_Number_String",
      "ArgumentList": [
        idBusinessProcess,
        accountID,
        descripcion
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);

    return this.http.post(this.url, data, this.options);
  }
  public getProcedimiento(IDBusinessProcess) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureList_Number_String_Number_Number",
      "ArgumentList": [
        IDBusinessProcess,
        null,
        null,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("Enviando!!", data);
    return this.http.post(this.url, data, this.options);
  }

  createProcedimiento(bean) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "com.quickbpm.bean.Procedure_updateProcedure_com.quickbpm.bean.Procedure",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.quickbpm.bean.Procedure"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }
  deleteProcedimiento(id) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "Integer_deleteProcedure_Number",
      "ArgumentList": [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);

    return this.http.post(this.url, data, this.options);
  }

  procedureDocument(id, type) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureDocumentCatalogByType_Number_Number",
      "ArgumentList": [
        id,
        type
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);

    return this.http.post(this.url, data, this.options)
  }
  createDocument(bean) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "com.quickbpm.bean.ProcedureDocument_updateProcedureDocument_com.quickbpm.bean.ProcedureDocument",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.quickbpm.bean.ProcedureDocument"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);

    return this.http.post(this.url, data, this.options);
  }
  deleteDocument(bean) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "Integer_deleteProcedureDocument_Number",
      "ArgumentList":
        [
          bean.IDDocument
        ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }
  addFileToProcedureAction(idAction, media, mediaContext, state, observations) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "com.quickbpm.bean.ProcedureAction_addFileToProcedureAction_Number_String_String_Number_String",
      "ArgumentList": [
        idAction,
        media,
        mediaContext,
        state,
        observations
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);

    return this.http.post(this.url, data, this.options);
  }

  updateBeanProcedureAction(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.quickbpm.bean.ProcedureAction_updateProcedureAction_com.quickbpm.bean.ProcedureAction",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.quickbpm.bean.ProcedureAction"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);

    return this.http.post(this.url, data, this.options);
  }

  getAccountByNit(nit) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getAccountByNit_Number",
      "ArgumentList": [
        nit
      ]
    };

    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);

    return this.http.post(this.url, data, this.options);
  }
  getAccountByID(id) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "com.advantage.bean.account.AbstractAccount_getAccount_Number",
      "ArgumentList": [
        id
      ]
    };

    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);

    return this.http.post(this.url, data, this.options);
  }


  updateAgreement(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.Agreement_updateAgreement_com.cofip.bean.Agreement",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.Agreement"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);

    return this.http.post(this.url, data, this.options);
  }
  submitBpm(idProcedureAction) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "boolean_submitBpmForm_Number",
      "ArgumentList": [
        idProcedureAction
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);

    return this.http.post(this.url, data, this.options);
  }
  getProcedureActionByAccount(idAccount, idStage, type) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureActionByAccount_Number_Number_Number",
      "ArgumentList": [
        idAccount,
        idStage,
        type
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);

    return this.http.post(this.url, data, this.options);
  }
  getProcedureImpRejectedForInput(idAccount: number) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureImpRejectedForInput_Number",
      "ArgumentList": [
        idAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);

  }
  getProcedureActionRejected(idAccount, idProcedureImp) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureActionRejected_Number_Number",
      "ArgumentList": [
        idAccount,
        idProcedureImp
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  isValidStage(idAccount: number, idStage: number) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "Boolean_isValidStage_Number_Number",
      "ArgumentList": [
        idAccount,
        idStage
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  submitInputDocuments(idAccount: number, idStage: number) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "boolean_submitInputDocuments_Number_Number",
      "ArgumentList": [
        idAccount,
        idStage
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  getProcedureImpForVerify(idSesion) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureImpForVerify_Number",
      "ArgumentList": [
        idSesion
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  getProcedureActionForVerify(idAccount, idProcedureImp) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureActionForVerify_Number_Number",
      "ArgumentList": [
        idAccount,
        idProcedureImp
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  verifyProcedureAction(idProcedureAction, description) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "boolean_verifyProcedureAction_Number_String",
      "ArgumentList": [
        idProcedureAction,
        description
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  declineProcedureAction(idProcedureAction, description) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "boolean_declineProcedureAction_Number_String",
      "ArgumentList": [
        idProcedureAction,
        description
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getProcedureImpForResponse(idAccount) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureImpForResponse_Number",
      "ArgumentList": [
        idAccount
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getProcedureActionForResponse(idAccount, idProcedureImp) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureActionForResponse_Number_Number",
      "ArgumentList": [
        idAccount,
        idProcedureImp
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  public createAccount(bean) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "com.advantage.bean.account.AbstractAccount_createAbstractAccount_com.advantage.bean.account.AbstractAccount",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.advantage.bean.account.AbstractAccount"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getProcedureImpForInput(idAccount) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getProcedureImpForInput_Number",
      "ArgumentList": [
        idAccount
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getAgreementByProcedureImp(idProcedureImp) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.Agreement_getAgreementByProcedureImp_Number",
      "ArgumentList": [
        idProcedureImp
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getAgreement(IDAgreement: number) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.cofip.bean.Agreement_getAgreement_Number",
      "ArgumentList": [
        IDAgreement
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  getBeneficiaryCatalogByAgreement(IDAgreement, idFunctionalID) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getBeneficiaryCatalogByAgreement_Number_Number",
      "ArgumentList": [
        IDAgreement,
        idFunctionalID
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getBeneficiaryCatalogByAgreementUno(IDAgreement) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getBeneficiaryCatalogByAgreement_Number",
      "ArgumentList": [
        IDAgreement
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getBeneficiaryByID(ID) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.cofip.bean.Beneficiary_getBeneficiary_Number",
      "ArgumentList": [
        ID
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);

  }


  addBeneficiaryToAgreement(IDAgreement, IDFunctionalIDLn, IDLNUnidadMilitar, Fuerza, speciesValue, cashValue) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.Beneficiary_addBeneficiaryToAgreement_Number_Number_Number_Number_Number_Number",
      "ArgumentList": [
        IDAgreement,
        IDFunctionalIDLn,
        IDLNUnidadMilitar,
        Fuerza,
        speciesValue,
        cashValue
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  getUnidadMilitarByFilter(sigla) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.cofip.bean.siath.UnidadMilitar_getUnidadMilitarByFilter_Number_String",
      "ArgumentList": [
        3,
        sigla
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  validateNeedsPlan(idNeedsPlan, isApproved, observations, idApprovedAccount) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.NeedsPlan_validateNeedsPlan_Number_Boolean_String_Number",
      "ArgumentList": [
        idNeedsPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getChapterCatalog() {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getChapterCatalog_Number",
      "ArgumentList": [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getChapterInvestmentByAgreement(IDAgreement) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getChapterInvestmentByAgreement_Number",
      "ArgumentList": [
        IDAgreement
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  addChapterInvestmentToAgreement(IDAgreement, ChaperList, speciesValue, cashValue) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.ChapterInvestment_addChapterInvestmentToAgreement_Number_Number_Number_Number",
      "ArgumentList": [
        IDAgreement,
        ChaperList,
        speciesValue,
        cashValue
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  //Eliminar cahpterInvestment
  deleteChapterInvestment(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteChapterInvestment_Number",
      "ArgumentList": [
        bean.IDChapterInvestment
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  responseProcedureAction(idProcedureAction, description, responseValue?) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "boolean_responseProcedureAction_Number_String_Boolean",
      "ArgumentList": [
        idProcedureAction,
        description,
        responseValue
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  declineResponseProcedureAction(idProcedureAction, description) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "boolean_declineResponseProcedureAction_Number_String",
      "ArgumentList": [
        idProcedureAction,
        description
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getBudgetArticleCatalog() {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getBudgetArticleCatalog_Number",
      "ArgumentList": [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  addBeneficiaryInvestment(Beneficiary, ChapterInvestment, BudgetArticle, speciesValue, cashValue) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.BeneficiaryInvestment_addBeneficiaryInvestment_Number_Number_Number_Number_Number",
      "ArgumentList": [
        Beneficiary,
        ChapterInvestment,
        BudgetArticle,
        speciesValue,
        cashValue
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getBeneficiaryInvestmentCatalogByBeneficiary(IDBeneficiary) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getBeneficiaryInvestmentCatalogByBeneficiary_Number",
      "ArgumentList": [
        IDBeneficiary
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  deleteBeneficiaryInvestment(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "void_deleteBeneficiaryInvestment_com.cofip.bean.BeneficiaryInvestment",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.BeneficiaryInvestment"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);

  }
  getBeneficiary(idAgreement, idLnFunctionalID, idLnUnidadMilitar) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.Beneficiary_getBeneficiary_Number_Number_Number",
      "ArgumentList": [
        idAgreement,
        idLnFunctionalID,
        idLnUnidadMilitar
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getNeedsPlanCatalogByBeneficiaryInvestment(idBeneficiaryInvestment) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getNeedsPlanCatalogByBeneficiaryInvestment_Number",
      "ArgumentList": [
        idBeneficiaryInvestment
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getNeedsPlanCatalogByBeneficiaryInvestmentByType(idBeneficiaryInvestment, type) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getNeedsPlanCatalogByBeneficiaryInvestment_Number_Number",
      "ArgumentList": [
        idBeneficiaryInvestment,
        type
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  updateNeedsPlan(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.NeedsPlan_updateNeedsPlan_com.cofip.bean.NeedsPlan",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.NeedsPlan"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  validateNeedsPlanSum(idAgreement, idFunctionalID) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "boolean_validateNeedsPlanSum_Number_Number",
      "ArgumentList": [
        idAgreement,
        idFunctionalID
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  deleteNeedsPlan(id) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteNeedsPlan_Number",
      "ArgumentList": [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);

  }
  //

  updateNeedsPlanDocument(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.NeedsPlanDocument_updateNeedsPlanDocument_com.cofip.bean.NeedsPlanDocument",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.NeedsPlanDocument"
        }
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  getNeedsPlanDocumentsCatalog(type) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getNeedsPlanDocumentsCatalog_Number",
      "ArgumentList": [
        type
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  deleteNeedsPlanDocument(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteNeedsPlanDocument_Number",
      "ArgumentList": [
        bean.IDNeedsPlanDocument
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }


  getNeedsPlanAttachedsCatalog(idBudgetExecution) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getNeedsPlanAttachedsCatalog_Number",
      "ArgumentList": [
        idBudgetExecution
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  updateNeedsPlanAttached(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.NeedsPlanAttached_updateNeedsPlanAttached_com.cofip.bean.NeedsPlanAttached",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.NeedsPlanAttached"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  deleteNeedsPlanAttached(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteNeedsPlanAttached_Number",
      "ArgumentList": [
        bean.IDNeedsPlanAttached
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  createF29Report(ID) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_createF29Report_com.advantage.shared.Report",
      "ArgumentList": [
        {
          "DataBeanProperties": {
            "IDAgreement": ID
          },
          "DataBeanName": "com.advantage.shared.Report"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  //Estados
  getProcedureStateCatalog(ID) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getProcedureStateCatalog_Number",
      "ArgumentList": [
        ID
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }


  //Crear o actualizar estado
  updateProcedureState(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.quickbpm.bean.ProcedureState_updateProcedureState_com.quickbpm.bean.ProcedureState",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.quickbpm.bean.ProcedureState"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  deleteProcedureState(Id) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Integer_deleteProcedureState_Number",
      "ArgumentList": [
        Id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);

  }

  //consignaciones
  deleteConsigment(Id) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteConsigment_Number",
      "ArgumentList": [
        Id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);

  }
  getConsigmentCatalog(idAgreement) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getConsigmentCatalog_Number",
      "ArgumentList": [
        idAgreement
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);

  }
  updateConsigment(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.Consigment_updateConsigment_com.cofip.bean.Consigment",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.Consigment"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);

  }
  updateBudgetExecution(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.BudgetExecution_updateBudgetExecution_com.cofip.bean.BudgetExecution",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.BudgetExecution"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  deleteBudgetExecution(id) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteBudgetExecution_Number",
      "ArgumentList": [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getBudgetExecutionsCatalog(id) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getBudgetExecutionsCatalog_Number",
      "ArgumentList": [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  reprocessProcedureAction(idAction, media, mediaContext, state) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "boolean_reprocessProcedureAction_Number_String_String_String",
      "ArgumentList": [
        idAction,
        media,
        mediaContext,
        state
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }



  addAttachmentToProcedureAction(idAction, name, media, mediaContext, description) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "OrangeService", "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.quickbpm.bean.AttachedDocument_addAttachmentToProcedureAction_Number_String_String_String_String",
      "ArgumentList": [
        idAction,
        name,
        media,
        mediaContext,
        description
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getAttachedDocumentCatalog(idAction) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "OrangeService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getAttachedDocumentCatalog_Number",
      "ArgumentList": [
        idAction
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  deleteAttachedDocument(idAr) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "Integer_deleteAttachedDocument_Number",
      "ArgumentList": [
        idAr
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  validateNeedsPlanForTracing(id,
    aprobacion,
    textoAprobacion,
    idCuenta) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.NeedsPlan_validateNeedsPlanForTracing_Number_Boolean_String_Number",
      "ArgumentList": [
        id,
        aprobacion,
        textoAprobacion,
        idCuenta
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getFunctionalIDByBoss(idBoss) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getFunctionalIDByBoss_Number",
      "ArgumentList": [
        idBoss
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getBusinessStateByFunctionalArea(idLnFunctionalArea) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getBusinessStateByFunctionalArea_Number",
      "ArgumentList": [
        idLnFunctionalArea
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getAgreementByState(idBusinessState,
    idLnFunctionalArea,
    from,
    upto) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getAgreementByState_Number_Number_java.util.Date_java.util.Date",
      "ArgumentList": [
        idBusinessState,
        idLnFunctionalArea,
        from,
        upto
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...11111", data);
    return this.http.post(this.url, data, this.options);
  }
  getBusinessProcessCatalog() {

    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getBusinessProcessCatalog_Number",
      "ArgumentList": [
        null
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...11111", data);
    return this.http.post(this.url, data, this.options);
  }

  getBusinessStateCatalog(idBusinessProcess) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getBusinessStateCatalog_Number",
      "ArgumentList": [
        idBusinessProcess
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }
  getBusinessStateByFunctionalIDForExecution(idBusinessProcess, idLn) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "java.util.List_getBusinessStateByFunctionalIDForExecution_Number_Number",
      "ArgumentList": [
        idBusinessProcess,
        idLn
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }

  getInvestmentPlanCatalog(idNeedsPlan) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getInvestmentPlanCatalog_Number",
      "ArgumentList": [
        idNeedsPlan
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }
  isValidInvestmentPlan(IDNeedsPlan) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "boolean_isValidInvestmentPlan_Number",
      "ArgumentList": [
        IDNeedsPlan
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }
  updateInvestmentPlan(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.InvestmentPlan_updateInvestmentPlan_com.cofip.bean.InvestmentPlan",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.InvestmentPlan"
        }

      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }
  deleteInvestmentPlan(id) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteInvestmentPlan_Number",
      "ArgumentList": [
        id
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }
  getNeedsPlanDocumentByIDNeedsPlan(idNeedsPlan) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getNeedsPlanDocumentByIDNeedsPlan_Number",
      "ArgumentList": [
        idNeedsPlan
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }

  markNeedsPlanForCompliance(idNeedsPlan, isApproved, observations, idApprovedAccount) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.cofip.bean.NeedsPlan_markNeedsPlanForCompliance_Number_Boolean_String_Number",
      "ArgumentList": [
        idNeedsPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }
  markInvestmentPlanForCompliance(idInvestmentPlan, isApproved, observations, idApprovedAccount) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.cofip.bean.InvestmentPlan_markInvestmentPlanForCompliance_Number_Boolean_String_Number",
      "ArgumentList": [
        idInvestmentPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }


  validateInvestmentPlanForTracing(idInvestmentPlan, isApproved, observations, idApprovedAccount) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.cofip.bean.InvestmentPlan_validateInvestmentPlanForTracing_Number_Boolean_String_Number",
      "ArgumentList": [
        idInvestmentPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }
  getInvestmentPlanAttachedsCatalog(idInvestmentPlan) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getInvestmentPlanAttachedsCatalog_Number",
      "ArgumentList": [
        idInvestmentPlan
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando", data);
    return this.http.post(this.url, data, this.options);
  }
  updateInvestmentPlanAttached(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.InvestmentPlanAttached_updateInvestmentPlanAttached_com.cofip.bean.InvestmentPlanAttached",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.cofip.bean.InvestmentPlanAttached"
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  deleteInvestmentPlanAttached(bean) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "Number_deleteInvestmentPlanAttached_Number",
      "ArgumentList": [
        bean.IDInvestmentPlanAttached
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  markNeedsPlanForManageable(idNeedsPlan,
    isApproved,
    observations,
    idApprovedAccount) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.NeedsPlan_markNeedsPlanForManageable_Number_Boolean_String_Number",
      "ArgumentList": [
        idNeedsPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  markInvestmentPlanForManageable(idInvestmentPlan,
    isApproved,
    observations,
    idApprovedAccount) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.InvestmentPlan_markInvestmentPlanForManageable_Number_Boolean_String_Number",
      "ArgumentList": [
        idInvestmentPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  getAgreementByStateForObserver(idBusinessState,
    idLnFunctionalArea,
    from,
    upto) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "CofipService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getAgreementByStateForObserver_Number_Number_java.util.Date_java.util.Date",
      "ArgumentList": [
        idBusinessState,
        idLnFunctionalArea,
        from,
        upto
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  validateNeedsPlanForEnding(idNeedsPlan,
    isApproved,
    observations,
    idApprovedAccount) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.NeedsPlan_validateNeedsPlanForEnding_Number_Boolean_String_Number",
      "ArgumentList": [
        idNeedsPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  validateInvestmentPlanForEnding(idInvestmentPlan,
    isApproved,
    observations,
    idApprovedAccount) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.InvestmentPlan_validateInvestmentPlanForEnding_Number_Boolean_String_Number",
      "ArgumentList": [
        idInvestmentPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  markNeedsPlanAttachedForCompliance(idNeedsPlan,
    isApproved,
    observations,
    idApprovedAccount) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.NeedsPlanAttached_markNeedsPlanAttachedForCompliance_Number_Boolean_String_Number",
      "ArgumentList": [
        idNeedsPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  markInvestmentPlanAttachedForCompliance(idInvestmentPlan,
    isApproved,
    observations,
    idApprovedAccount) {
    const dataObj = {
      "ServiceName": "CofipService",
      "MethodHash": "com.cofip.bean.InvestmentPlanAttached_markInvestmentPlanAttachedForCompliance_Number_Boolean_String_Number",
      "ArgumentList": [
        idInvestmentPlan,
        isApproved,
        observations,
        idApprovedAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  updateSystemProperty(bean) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "com.advantage.bean.account.SystemProperty_updateSystemProperty_com.advantage.bean.account.SystemProperty",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.advantage.bean.account.SystemProperty"
        }
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  deleteSystemProperty(bean) {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "void_deleteSystemProperty_com.advantage.bean.account.SystemProperty",
      "ArgumentList": [
        {
          "DataBeanProperties": bean,
          "DataBeanName": "com.advantage.bean.account.SystemProperty"
        }
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }
  getProcedureImpByAccount(Proceso, IDAccount,
    DataFrom,
    DataUpto,
    state) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService", "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getProcedureImpByAccount_Number_Number_java.util.Date_java.util.Date_Number",
      "ArgumentList": [
        Proceso,
        IDAccount,
        DataFrom,
        DataUpto,
        state
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  getSateListForBusinessProcess() {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getSateListForBusinessProcess_String",
      "ArgumentList": [
        null
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }


  getHistoricoProcedure(id) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getProcedureActionByProcedureImp_Number",
      "ArgumentList": [
        id
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data, this.options);
  }

  getEtapasProcedure(id) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "OrangeService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getStageCatalog_Number",
      "ArgumentList": [
        id
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando... etapa", data);
    return this.http.post(this.url, data, this.options);
  }

  setActualStage(id) {
    const dataObj = {

      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.quickbpm.bean.Stage_setActualStage_Number",
      "ArgumentList": [
        id
      ]
    }

    const data = JSON.stringify(dataObj);
    console.log("enviando... etapa", data);
    return this.http.post(this.url, data, this.options);

  }




  setInPendingForInputState(id) {
    const dataObj = {

      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.quickbpm.bean.ProcedureAction_setInPendingForInputState_Number",
      "ArgumentList": [
        id
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando... etapa", data);
    return this.http.post(this.url, data, this.options);
  }



  getNextStage(idprocedureimp) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "OrangeService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.quickbpm.bean.Stage_getNextStage_Number",
      "ArgumentList": [
        idprocedureimp
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando... etapa", data);
    return this.http.post(this.url, data, this.options);
  }

  getPendingProcedureActionForProcedureImp(id) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getPendingProcedureActionForProcedureImp_Number",
      "ArgumentList": [
        id
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando... etapa", data);
    return this.http.post(this.url, data, this.options);
  }



  getBusinessClassCatalogNull() {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getBusinessClassCatalog_Number",
      "ArgumentList": [
        null
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando... etapa", data);
    return this.http.post(this.url, data, this.options);
  }

  getProcedureImpForAssign(idAccount: number, idBusinessProcess: number) {
    const dataObj = {

      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getProcedureImpForAssign_Number_Number",
      "ArgumentList": [
        idAccount,
        idBusinessProcess
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando... etapa", data);
    return this.http.post(this.url, data, this.options);
  }
}
// {
//   "Type": 0,
//   "Description": "text",
//   "SystemValue": "text",
//   "IDSystemProperty": 0,
//   "Since": "2021-05-24 17:59:26",
//   "AppName": "text",
//   "Name": "text"
// }

