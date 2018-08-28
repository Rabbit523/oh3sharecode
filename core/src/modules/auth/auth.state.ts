export interface AuthState { 
    Login_timeOut: boolean; 
    token: string; 
}
export let initialAuthState: AuthState = { Login_timeOut: true, token: "" };
