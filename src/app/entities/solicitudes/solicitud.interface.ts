export interface ISolicitud {
  id?: any;
  descripcion?: string;
  fechaSolicitud?: Date;
  fechaInicio?: Date;
  fechaRespuesta?: Date;
  observacion?: string;
  diasRespuesta?: number;
  isAdmitida?: boolean,
  calidadRespuesta?: number,
  isReclamadaCTA?: boolean,
  fechaReclamacionCTA?: Date,
  fechaInicioCTA?: Date,
  fechaRespuestaCTA?: Date,
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
    public diasRespuesta?: number,
    public isAdmitida?: boolean,
    public calidadRespuesta?: number,
    public isReclamadaCTA?: boolean,
    public fechaReclamacionCTA?: Date,
    public fechaInicioCTA?: Date,
    public fechaRespuestaCTA?: Date,
    public createdBy? : string,
    public createdDate?: any,
    public lastModifiedBy?: string,
    public lastModifiedDate?: any
  ) {}
}
