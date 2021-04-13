export interface IDocumento {
  id?: any;
  nombreDocumento?: string;
  fechaSubida?: Date;
  documentoType?: string;
  documento?: any;
  observacion?: string;
  ruta?: string;
  privado?: boolean;
  solicitudDescripcion?: string;
  solicitudId?: string;
  solicitud?: string;
  gestionDetalle?: string;
  gestionId?: number;
}

export class Documento implements IDocumento {
  constructor(
    public id?: any,
    public nombreDocumento?: string,
    public fechaSubida?: Date,
    public documentoType?: string,
    public documento?: any,
    public observacion?: string,
    public ruta?: string,
    public privado?: boolean,
    public solicitudDescripcion?: string,
    public solicitudId?: string,
    public solicitud?: string,
    public gestionDetalle?: string,
    public gestionId?: number
  ) {
    this.privado = this.privado || false;
  }
}
