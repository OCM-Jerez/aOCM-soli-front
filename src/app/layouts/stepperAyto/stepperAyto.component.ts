import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

// Interfaces
import { ISolicitud } from '../../entities/solicitudes/solicitud.interface';

@Component({
  selector: 'app-stepperAyto',
  templateUrl: './stepperAyto.component.html',
  styleUrls: ['./stepperayto.component.scss']
})
export class StepperAytoComponent implements OnInit {
  solicitud: ISolicitud | null = null;
  respondidaAytoCTA: boolean = false;
  iniciadaCTA: boolean = false

  constructor(protected activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => (this.solicitud = solicitud));
    if (this.solicitud!.fechaInicioCTA) {
      this.iniciadaCTA= true
    }

    // Calculo días trancurridos desde la reclamación.
    if (this.solicitud!.fechaRespuestaAytoCTA) {
      const date = moment(this.solicitud!.fechaRespuestaAytoCTA);
      this.solicitud!.diasRespuestaAytoCTA = date.diff(this.solicitud!.fechaRespuestaAytoCTA, 'days');
      this.respondidaAytoCTA = true
    } else {
      const date = moment();
      this.solicitud!.diasRespuestaAytoCTA = date.diff(this.solicitud!.fechaRespuestaCTA, 'days');
    }
  }

}
