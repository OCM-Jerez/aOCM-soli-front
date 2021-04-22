
export interface IGestion {
  id?: number;
  detalle?: string;
  fecha?: Date;
  observacion?: string;
  privado?: boolean;
  solicitudId?: number;
  createdBy? : string,
  createdDate?: any,
  lastModifiedBy?: string,
  lastModifiedDate?: any
}
export class Gestion implements IGestion {
  constructor(
    public id?: number,
    public detalle?: string,
    public fecha?: Date,
    public observacion?: string,
    public privado?: boolean,
    public solicitudId?: number,
    public createdBy? : string,
    public createdDate?: any,
    public lastModifiedBy?: string,
    public lastModifiedDate?: any
  ) {
    this.privado = this.privado || false;
  }
}
