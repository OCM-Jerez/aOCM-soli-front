export interface ISolicitud {
  id?: any;
  descripcion?: string;
  fechaSolicitud?: Date;
  fechaRespuesta?: Date;
  observacion?: string;
  diasRespuesta?: number;
}

export class Solicitud implements ISolicitud {
  constructor(
    public id?: any,
    public descripcion?: string,
    public fechaSolicitud?: Date,
    public fechaRespuesta?: Date,
    public observacion?: string,
    public diasRespuesta?: number
  ) {}
}
