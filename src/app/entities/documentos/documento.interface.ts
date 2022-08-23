export interface IDocumento {
  id?: any;
  nombreDocumento?: string;
  fechaSubida?: Date;
  documentoType?: string;
  observacion?: string;
  ruta?: string;
  privado?: boolean;
  solicitudId?: string;
  createdBy?: string;
  createdDate?: any;
  lastModifiedBy?: string;
  lastModifiedDate?: any;
  solicitud?: Solicitud;
}

export class Documento implements IDocumento {
  constructor(
    public id?: any,
    public nombreDocumento?: string,
    public fechaSubida?: Date,
    public documentoType?: string,
    public observacion?: string,
    public ruta?: string,
    public privado?: boolean,
    public solicitudId?: string,
    public createdBy?: string,
    public createdDate?: any,
    public lastModifiedBy?: string,
    public lastModifiedDate?: any,
  ) {
    // TODO! ¿Para qué sirve esta linea?
    this.privado = this.privado || false;
  }
}

export interface Solicitud {
  id: string;
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  descripcion: string;
  fechaSolicitud: Date;
  fechaInicio: null;
  fechaRespuesta: null;
  fechaReclamacionCTA: null;
  fechaInicioCTA: null;
  fechaRespuestaCTA: null;
  fechaRespuestaAytoCTA: null;
  observacion: null;
  observacionCTA: null;
  isAdmitida: null;
  isReclamadaCTA: null;
  isAtendidaCTA: null;
  isCerrada: null;
  calidadRespuesta: null;
  year: number;
  code: null;
}


// Ejemplo resp
// https://app.quicktype.io/
// {
//   "id": "333f975c-6c39-4614-b67e-de20866bc5e6",
//   "createdBy": null,
//   "createdDate": null,
//   "lastModifiedBy": null,
//   "lastModifiedDate": null,
//   "nombreDocumento": "Formulario solicitud",
//   "fechaSubida": "2022-08-21",
//   "documentoType": "solicitud",
//   "observacion": null,
//   "ruta": "https://drive.google.com/file/d/1WvkLJ4fAmoOF-grlomk_P4zAUthExCJ_/view?usp=sharing",
//   "privado": false,
//   "solicitud": {
//       "id": "a97f7f00-8db1-41f0-a18f-10b02e570cdc",
//       "createdBy": "amdammin",
//       "createdDate": "2022-08-21T00:00:00.000Z",
//       "lastModifiedBy": "amdammin",
//       "lastModifiedDate": "2022-08-21T00:00:00.000Z",
//       "descripcion": "Adjudicación en calle Real Escuela",
//       "fechaSolicitud": "2022-08-21",
//       "fechaInicio": null,
//       "fechaRespuesta": null,
//       "fechaReclamacionCTA": null,
//       "fechaInicioCTA": null,
//       "fechaRespuestaCTA": null,
//       "fechaRespuestaAytoCTA": null,
//       "observacion": null,
//       "observacionCTA": null,
//       "isAdmitida": null,
//       "isReclamadaCTA": null,
//       "isAtendidaCTA": null,
//       "isCerrada": null,
//       "calidadRespuesta": null,
//       "year": 2022,
//       "code": null
//   }
// }