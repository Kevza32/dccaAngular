import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuickturnService {

  //private url = 'http://190.146.64.16/quickturn/jsserver';
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

  getIDAccount() {
    try {
      let ls = JSON.parse(localStorage.getItem('usuario'));
      return ls.DataBeanProperties.IDAccount;
    } catch (error) {
      return 0;
    }
  }

  // Este queda
  public deleteOfice(id) {
    const dataObj = {
      ServiceName: 'QuickTurnService',
      MethodHash: 'void_deleteAttentionOffice_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Este queda
  public postAccount(nit, nameAccount, secondName, lastName, secondLast, address, email) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.AbstractAccount_createAbstractAccount_com.advantage.bean.account.AbstractAccount',
      ArgumentList: [
        {
          DataBeanProperties: {
            Nit: nit,
            Name1: nameAccount,
            Name2: secondName,
            Surname1: lastName,
            Surname2: secondLast,
            Address: address,
            eMail: email,
            IDAccount: null
          },
          DataBeanName: 'com.advantage.bean.account.AbstractAccount'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public putAccount(id, nit, nameAccount, secondName, lastName, secondLast, address, email) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.AbstractAccount_updateAbstractAccount_com.advantage.bean.account.AbstractAccount',
      ArgumentList: [
        {
          DataBeanProperties: {
            Nit: nit,
            Name1: nameAccount,
            Surname1: lastName,
            Name2: secondName,
            Surname2: secondLast,
            Address: address,
            eMail: email,
            IDAccount: id
          },
          DataBeanName: 'com.advantage.bean.account.AbstractAccount'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public putAccountActivate(id, role) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.AbstractAccount_updateAbstractAccount_com.advantage.bean.account.AbstractAccount',
      ArgumentList: [
        {
          DataBeanProperties: {
            RoleID: role,
            IDAccount: id,
            Active: true
          },
          DataBeanName: 'com.advantage.bean.account.AbstractAccount'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  public getNit(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getAccountByNit_Number_Number',
      ArgumentList: [
        id,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  public getIdAccount(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.AbstractAccount_getAccount_Number_Class',
      ArgumentList: [
        id,
        'com.advantage.shared.DataBean'
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Este queda
  public searchAccount(firstName, lastName) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getAccount_String_String',
      ArgumentList: [
        firstName,
        lastName
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Este queda
  public getNitUnique(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getAccountByNit_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Este queda
  public getIdAccount2(id) {
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

  // Menu
  // Este queda
  public postMenu(nameMenu, purpose, link) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.application.ApplicationType_updateApplicationType_com.orange.bean.application.ApplicationType',
      ArgumentList: [
        {
          DataBeanProperties: {
            Purpose: purpose,
            Name: nameMenu,
            AppLink: link,
            IDApplicationType: null
          },
          DataBeanName: 'com.orange.bean.application.ApplicationType'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }
  // Este queda
  public putMenu(id, nameMenu, purpose, link) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.application.ApplicationType_updateApplicationType_com.orange.bean.application.ApplicationType',
      ArgumentList: [
        {
          DataBeanProperties: {
            Purpose: purpose,
            Name: nameMenu,
            AppLink: link,
            IDApplicationType: id
          },
          DataBeanName: 'com.orange.bean.application.ApplicationType'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public getListMenu() {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "java.util.List_getApplicationTypeCatalog_Number",
      "ArgumentList": [
        null
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log(data);
    return this.http.post(this.url, data, this.options);
  }
  // Este queda
  public getIdMenu(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.application.ApplicationType_getApplicationType_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);

    return this.http.post(this.url, data, this.options);
  }

  public MenuByApp() {
    const dataObj = {
      "ServiceName": "OrangeService",
      "MethodHash": "com.advantage.shared.Tree_getTreeForApplicationID_Number",
      "ArgumentList": [
        this.getIDAccount()
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);

    return this.http.post(this.url, data, this.options);
  }

  // Este queda
  public deleteModule(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'void_deleteApplicationType_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Menu
  // Este queda
  public postMenuModule(idPadre, code, nombreMenu, type, url) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.application.ApplicationID_createApplicationID_com.orange.bean.application.ApplicationID_Number',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Name: nombreMenu,
            URL: url,
            IDApplicationType: type,
            IDLn: null
          },
          DataBeanName: 'com.orange.bean.application.ApplicationID'
        },
        idPadre
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public putMenuModule(idLn, code, nombreMenu, type, url) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.application.ApplicationID_updateApplicationID_com.orange.bean.application.ApplicationID',
      ArgumentList: [
        {
          DataBeanProperties: {
            Code: code,
            Name: nombreMenu,
            URL: url,
            IDApplicationType: type,
            IDLn: idLn
          },
          DataBeanName: 'com.orange.bean.application.ApplicationID'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public getTreeApplicationId(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getApplicationIDAtLevel_Number_int_String_Number_Number_Number',
      ArgumentList: [
        id,
        0,
        null,
        null,
        null,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log(data);

    return this.http.post(this.url, data, this.options);
  }

  // Este queda
  public getIdMenuAccoutn(id) {
    console.log("Buscando menude ", id);

    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.shared.DataBean_getApplicationIDTree_Integer',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  // Este queda
  public getIdAplicationId(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.orange.bean.application.ApplicationID_getApplicationID_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data, this.options);
  }

  //login
  // Este queda
  public login(auth, user, password) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.account.WorkSession_validateWorkSession_String_String_String_String_String_String',
      ArgumentList: [
        auth,
        user,
        password,
        null,
        null,
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    console.log("login", data);

    return this.http.post(this.url, data, this.options);
  }

  // Este queda
  public deleteMenu(idLn) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'Number_deleteApplicationID_Number',
      ArgumentList: [
        idLn
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Role
  // Este queda
  public postRole(nameRol, state, description) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.securitymanager.Role_updateRole_com.advantage.bean.securitymanager.Role',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            State: state,
            IDRole: null,
            Name: nameRol
          },
          DataBeanName: 'com.advantage.bean.securitymanager.Role'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public putRole(idRol, nameRol, state, description) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.securitymanager.Role_updateRole_com.advantage.bean.securitymanager.Role',
      ArgumentList: [
        {
          DataBeanProperties: {
            Description: description,
            State: state,
            IDRole: idRol,
            Name: nameRol
          },
          DataBeanName: 'com.advantage.bean.securitymanager.Role'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public getListRole() {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'java.util.List_getRoleCatalog_Number',
      ArgumentList: [
        null
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public getIdRole(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.securitymanager.Role_getRole_Number',
      ArgumentList: [
        id
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public getAddRole(idRole, idLn) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.securitymanager.BusinessFunction_addBusinessLogicToRole_Number_Number',
      ArgumentList: [
        idRole,
        idLn
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public getDeleteRole(idRole, idLn) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'com.advantage.bean.securitymanager.BusinessFunction_removeBusinessLogicToRole_Number_Number',
      ArgumentList: [
        idRole,
        idLn
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public deleteRole(idRol) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'void_deleteRole_com.advantage.bean.securitymanager.Role',
      ArgumentList: [
        {
          DataBeanProperties: {
            IDRole: idRol
          },
          DataBeanName: 'com.advantage.bean.securitymanager.Role'
        }
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public getCheckRole(idRole, idLn) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'Boolean_checkBusinessLogicForRole_Number_Number',
      ArgumentList: [
        idRole,
        idLn
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public activateAccount(id, user, account) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'Number_activateUserAccount_Number_String_String',
      ArgumentList: [
        id,
        user,
        account
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }

  // Este queda
  public desactiveAccount(id) {
    const dataObj = {
      ServiceName: 'OrangeService',
      MethodHash: 'Number_desactivateUserAccount_Number',
      ArgumentList: [
        id,
      ]
    };
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }
  getSystemProperty() {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "OrangeService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.advantage.bean.account.SystemProperty_getSystemProperty_Number", "ArgumentList": [
        45
      ]
    }
    const data = JSON.stringify(dataObj);
    return this.http.post(this.url, data);
  }


  addWorkGroupMember(idLN, IDAccount) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.quickbpm.bean.WorkGroupMember_addWorkGroupMember_Number_Number",
      "ArgumentList": [
        idLN,
        IDAccount
      ]
    }

    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data);
  }

  removeWorkGroupMember(idLN, IDAccount) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "com.quickbpm.bean.WorkGroupMember_removeWorkGroupMember_Number_Number",
      "ArgumentList": [
        idLN, IDAccount
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data);
  }
  getWorkGroupMemberCatalog(idLnFunctionalID: number, state: number) {
    const dataObj = {
      "IDClient": "$#HHJGUY9773H5MNKD65389745KJDFGDGG==",
      "ServiceName": "BpmService",
      "WSToken": "$#HHJGUYUHSDFGS546546DFH654SGHUJJFF==",
      "MethodHash": "java.util.List_getWorkGroupMemberCatalog_Number_Number",
      "ArgumentList": [
        idLnFunctionalID,
        state
      ]
    }
    const data = JSON.stringify(dataObj);
    console.log("enviando...", data);
    return this.http.post(this.url, data);
  }
}
