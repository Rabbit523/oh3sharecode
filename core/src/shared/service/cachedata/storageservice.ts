import { Injectable, ModuleWithProviders } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { StaticCache } from '../../staticcache';
import { OneHeartUser } from '../../models/webapi/oneheartuser/userdata';
import { PersonalizationJson } from '../../models/webapi/oneheartuser/userdata';
import { SystemInfo } from '../../models/webapi/system/systeminfo';
import { AuthService } from '../webapi/auth.service';
import { DepartmentEmployeeService } from '../webapi/departmentemployee.service';
import { ContactorState } from '../../models/webapi/contactor/contactorperson';
import { ContactorCacheHelper } from '../../models/helper/contactorcachehelper';
import { JsonDictionary } from '../../models/common/jsondictionary';
import { WebapiState } from '../../../modules/apistate';

@Injectable()
export class StorageService {
  constructor(public storage: LocalStorageService) { }
  _Storage_Rating: JsonDictionary<number> = {};
  _Storage_Setting: JsonDictionary<boolean> = {};
  _Storageconfig="Storageconfig";
  _StorageSetting = "StorageSetting";
  _StorageRating = "Rating";  
  _StorageHAS_LOGGED_IN = 'hasLoggedIn';
  _StorageHAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  _StorageconfigUserToken = "user_Token";
  _StoragedepartmentEmployeeCache = "Cache_DepartmentEmployee";
  _StoragecontactorCache = "Cache_Contactor";

  PlatformAndStorageReadyInitUserData(interfacecode: string, appVersion: string, android: boolean, ios: boolean, isweb: boolean) {

    this._Storage_Rating = this.storage.get<JsonDictionary<number>>(this._StorageRating)||{};
    this._Storage_Setting = this.storage.get<JsonDictionary<boolean>>(this._StorageSetting)||{};
    StaticCache.authservicetoken = this.storage.get<string>(this._StorageconfigUserToken) || "";
    StaticCache.Webapiusers = this.storage.get<ContactorState>(this._StoragecontactorCache) || new ContactorState();
    StaticCache.Config = this.storage.get<WebapiState>(this._Storageconfig) ||<WebapiState> {};
    StaticCache.Config.appVersion = appVersion;
    StaticCache.Config.platformIsAndroid = android;
    StaticCache.Config.platformIsIos = ios;
    StaticCache.Config.platformIsMobileWeb = isweb;    
    StaticCache.setDepartmentEmployeeData(this.storage.get<any>(this._StoragedepartmentEmployeeCache));
    this.saveinterfaceCode(interfacecode);
  }
  // no storage
  _favorites: string[] = [];
  hasFavorite(sessionName: string) {
    return (this._favorites.indexOf(sessionName) > -1);
  };
  addFavorite(sessionName: string) {
    this._favorites.push(sessionName);
  };
  removeFavorite(sessionName: string) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };
  SetSetting(set:JsonDictionary<boolean>) {
    this._Storage_Setting = set;
    this.storage.set(this._StorageSetting, set);
  }
  SetRating(us: number, rat: number) {
    this._Storage_Rating = Object.assign({}, this._Storage_Rating, { [us.toString()]: rat });
    this.storage.set(this._StorageRating, this._Storage_Rating);
  }
  GetRating(us: number) {
    try { return this._Storage_Rating[us.toString()]; } catch (e) { return 0; }
  }

  //-------------------save object------------------------------------------
  clear() {
    this.storage.clearAll();
  }

  
  //login effects
  saveOneHeartUser(userSys: OneHeartUser) {    
    if (userSys.id) {
      StaticCache.Config.username = userSys.id;
    }
    this.saveinterfaceCode(userSys.interfacecode);
  };
  //login effects
  saveSysteminfo(systeminfo: SystemInfo) {
    StaticCache.Config.baseurl = systeminfo.webapiaddress;
    StaticCache.Config.systemtitle = systeminfo.systemtitle;
    this.storage.set(this._Storageconfig, StaticCache.Config);
  };
  
  //login effects
  loginSavePersonalizationJson(personalinfo: PersonalizationJson) {    
    StaticCache.Config.PersonalizationJson = personalinfo;
    var value =personalinfo.ClaimData.UserId;
    if (value) {
      StaticCache.Config.UserId = value;
    }
    this.storage.set(this._Storageconfig, StaticCache.Config);
  }

  //login effects
  loginSucessSaveUserPassword(username: string, password: string) {
    this.setUserLOGGEDIN(!true);
    if (username) {
      StaticCache.Config.username = username;
    }
    if (password) {
      StaticCache.Config.password = password;      
    }
    this.storage.set(this._Storageconfig, StaticCache.Config);
  };

  saveinterfaceCode(interfacecode: string) {
    StaticCache.Config.interfacecode = interfacecode;
    this.storage.set(this._Storageconfig, StaticCache.Config);
  }

  saveListViewId(value: number) {
    if (value > -1) {
      StaticCache.Config.ListViewId = value;
      this.storage.set(this._Storageconfig, StaticCache.Config);
    }
  };
  saveDetailViewId(value: number) {
    if (value > -1) {
      StaticCache.Config.DetailViewId = value;
      this.storage.set(this._Storageconfig, StaticCache.Config);
    }
  };




  setContactorCache(data: ContactorState): any {
    StaticCache.Webapiusers = data;
    this.storage.set(this._StoragecontactorCache, data);
  }

  setDepartmentEmployeeCache(data: any): any {
    StaticCache.setDepartmentEmployeeData(data);
    this.storage.set(this._StoragedepartmentEmployeeCache, data);
  }
  setUserToken(token: string) {
    StaticCache.authservicetoken = token;
    this.storage.set(this._StorageconfigUserToken, token);
  }

  logout(): boolean {
    StaticCache.authservicetoken = "";
    return this.storage.set(this._StorageconfigUserToken, "");
  };

  setUserLOGGEDIN(authTimeout: boolean) {
    this.storage.set(this._StorageHAS_LOGGED_IN, !authTimeout);
  };
  getUserLOGGEDIN():boolean{
    return this.storage.get<boolean>(this._StorageHAS_LOGGED_IN);
  }
  checkHasSeenTutorial() {
    return this.storage.get<boolean>(this._StorageHAS_SEEN_TUTORIAL);
  };
  setHasSeenTutorial() {
    this.storage.set(this._StorageHAS_SEEN_TUTORIAL, true);
  }
}

export function StorageServiceFactory(LocalStorageService: LocalStorageService) {
  return new StorageService(LocalStorageService);
};
