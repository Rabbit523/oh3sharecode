export interface LoginModelState {
    username?: string; password?: string;
}
export interface LoginState extends LoginModelState {
    submitted: boolean; CheckStr: string;
    systemtitle?: string; interfaceCode: string; appVersion?: string; tokenOk: boolean;checkToken:number;
}
export let initialLoginState: LoginState = {
    username: '', password: '',
    submitted: false, CheckStr: "",
    systemtitle: '', interfaceCode: '', appVersion: '', tokenOk: false,checkToken:-1
};
