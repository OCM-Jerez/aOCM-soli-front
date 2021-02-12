// Copiada de OCM-soli-front
export interface IUser {
  id?: any;
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  login: string;
  firstName: string;
  lastName: string;
  email?: string;
  activated: boolean;
  langKey: string;
  password: string;
  ImageUrl? : string;
  ActivationKey?: string;
  ResetKey?: string;
  // resetDate: Date;
  authorities?: string[];
}




// Ejemplo para usar en Swagger.
// {
//   "id": "66ed8031-d40e-4f30-8ae4-8bf5c2ca87ff",
//   "login": "test5",
//   "firstName": "test5",
//   "lastName": "test5",
//   "email": "myuser@localhost",
//   "activated": "true",
//   "langKey": "en",
//   "authorities": [
//     "ROLE_USER"
//   ],
//   "password": "test5",
//   "lastModifiedDate": "2021-02-12T15:06:34.705Z",
//   "createdBy": null,
//   "createdDate": null,
//   "lastModifiedBy": null,
//   "imageUrl": null,
//   "activationKey": null,
//   "resetKey": null,
//   "resetDate": null
// }


// Model de Swagger.
// User{
//   id*	string
//   example: 66ed8031-d40e-4f30-8ae4-8bf5c2ca87ff
//   Entity id

//   login*	string
//   uniqueItems: true
//   example: myuser
//   User login

//   firstName*	string
//   example: MyUser
//   User first name

//   lastName*	string
//   example: MyUser
//   User last name

//   email*	string
//   example: myuser@localhost
//   User email

//   activated*	boolean
//   example: true
//   User activation

//   langKey*	string
//   example: en
//   User language

//   authorities*	[...]
//   password*	string
//   example: myuser
//   User password

//   }
