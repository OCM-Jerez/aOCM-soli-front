export interface IDocumento {
  id?: any;
  nombreDocumento?: string;
  fechaSubida?: Date;
  documentoType?: string;
  observacion?: string;
  ruta?: string;
  privado?: boolean;
  solicitudId?: string;
  createdBy?: string,
  createdDate?: any,
  lastModifiedBy?: string,
  lastModifiedDate?: any
  // solicitud?: [descripcion: string]
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
