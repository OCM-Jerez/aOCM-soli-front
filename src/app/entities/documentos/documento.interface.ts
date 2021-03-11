export interface IDocumento {
  id?: any;
  nombreDeDocumento?: string;
  fechaSubida?: Date;
  documentoContentType?: string;
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
    public nombreDeDocumento?: string,
    public fechaSubida?: Date,
    public documentoContentType?: string,
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
