export interface ISolicitud {
  id?: any;
  descripcion?: string;
  fechaSolicitud?: Date;
  fechaInicio?: Date;
  fechaRespuesta?: Date;
  observacion?: string;
  observacionCTA?: string;
  diasRespuesta?: number;
  diasRespuestaCTA?: number;
  diasRespuestaAytoCTA?: number,
  isAdmitida?: boolean,
  calidadRespuesta?: number,
  isReclamadaCTA?: boolean,
  isAtendidaCTA?: boolean,
  isCerrada?: boolean,
  fechaReclamacionCTA?: Date,
  fechaInicioCTA?: Date,
  fechaRespuestaAytoCTA?: Date,
  fechaRespuestaCTA?: Date,
  year?: number,
  code?: number,
  createdBy? : string,
  createdDate?: any,
  lastModifiedBy?: string,
  lastModifiedDate?: any
}

export class Solicitud implements ISolicitud {
  constructor(
    public id?: any,
    public descripcion?: string,
    public fechaSolicitud?: Date,
    public fechaInicio?: Date,
    public fechaRespuesta?: Date,
    public observacion?: string,
    public observacionCTA?: string,
    public diasRespuesta?: number,
    public diasRespuestaCTA?: number,
    public diasRespuestaAytoCTA?: number,
    public isAdmitida?: boolean,
    public calidadRespuesta?: number,
    public isReclamadaCTA?: boolean,
    public isAtendidaCTA?: boolean,
    public isCerrada?: boolean,
    public fechaReclamacionCTA?: Date,
    public fechaInicioCTA?: Date,
    public fechaRespuestaCTA?: Date,
    public fechaRespuestaAytoCTA?: Date,
    public year?: number,
    public code?: number,
    public createdBy? : string,
    public createdDate?: any,
    public lastModifiedBy?: string,
    public lastModifiedDate?: any
  ) {}
}
