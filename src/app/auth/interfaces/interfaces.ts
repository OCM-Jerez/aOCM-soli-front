export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    msg?: string;
}

export interface AuthResponse1 {
   id_token?: string;
}

// export interface Usuario {
//     uid?: string;
//     id?: string;
//     name?: string;
//     firstName?: string;
//     email?: string;
// }

