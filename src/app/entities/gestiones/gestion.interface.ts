
export interface IGestion {
  id?: number;
  detalle?: string;
  fecha?: Date;
  observacion?: string;
  privado?: boolean;
  solicitudId?: string,
  createdBy?: string,
  createdDate?: any,
  lastModifiedBy?: string,
  lastModifiedDate?: any,
  solicitud?: Solicitud
}
export class Gestion implements IGestion {
  constructor(
    public id?: number,
    public detalle?: string,
    public fecha?: Date,
    public observacion?: string,
    public privado?: boolean,
    public solicitudId?: string,
    public createdBy?: string,
    public createdDate?: any,
    public lastModifiedBy?: string,
    public lastModifiedDate?: any
  ) {
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
  fechaInicio: Date;
  fechaRespuesta: Date;
  fechaReclamacionCTA: null;
  fechaInicioCTA: null;
  fechaRespuestaCTA: null;
  fechaRespuestaAytoCTA: null;
  observacion: string;
  observacionCTA: null;
  isAdmitida: boolean;
  isReclamadaCTA: null;
  isAtendidaCTA: null;
  isCerrada: boolean;
  calidadRespuesta: number;
  year: number;
  code: number;
}
