
export interface IGestion {
  id?: number;
  detalle?: string;
  fecha?: Date;
  observacion?: string;
  privado?: boolean;
  solicitudId?: number;
}
export class Gestion implements IGestion {
  constructor(
    public id?: number,
    public detalle?: string,
    public fecha?: Date,
    public observacion?: string,
    public privado?: boolean,
    public solicitudId?: number
  ) {
    this.privado = this.privado || false;
  }
}
