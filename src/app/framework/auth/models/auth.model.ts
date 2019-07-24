export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    firstName: string;
    lastName: string;
}

export interface CurrentUser {
    id: string;
    name: string;
}
export interface AuthResponse {
    idToken: string;
    expiresIn: number;
    currentUser: CurrentUser; 
}
