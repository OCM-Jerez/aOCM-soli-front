
export interface IGestion {
  id?: number;
  detalle?: string;
  fecha?: Date;
  observacion?: string;
  documentoContentType?: string;
  documento?: any;
  nombreDeDocumento?: string;
  privado?: boolean;
  solicitudDescripcion?: string;
  solicitud?: string;
  solicitudId?: number;
}

export class Gestion implements IGestion {
  constructor(
    public id?: number,
    public detalle?: string,
    public fecha?: Date,
    public observacion?: string,
    public documentoContentType?: string,
    public documento?: any,
    public nombreDeDocumento?: string,
    public privado?: boolean,
    public solicitudDescripcion?: string,
    public solicitud?: string,
    public solicitudId?: number
  ) {
    this.privado = this.privado || false;
  }
}
