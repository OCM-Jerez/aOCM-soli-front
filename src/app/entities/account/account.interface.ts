export interface IAccount {
   activated?: boolean,
   authorities?: string[],
   email: string,
   firstName: string,
   langKey?: string,
   lastName: string,
   login: string,
   imageUrl?: string,
   id?: string,
   password: string
}
