import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

// Interfaces
import { ISolicitud } from '../../entities/solicitudes/solicitud.interface';

@Component({
  selector: 'app-stepperAyto',
  templateUrl: './stepperAyto.component.html',
  styleUrls: ['./stepperAyto.component.scss']
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

    // Calculo días trancurridos desde la notificación del CTA al Ayuntamiento.
    if (this.solicitud!.fechaRespuestaAytoCTA) {
      const date = moment(this.solicitud!.fechaRespuestaAytoCTA);
      this.solicitud!.diasRespuestaAytoCTA = date.diff(this.solicitud!.fechaRespuestaCTA, 'days');
      this.respondidaAytoCTA = true
    } else {
      const date = moment();
      this.solicitud!.diasRespuestaAytoCTA = date.diff(this.solicitud!.fechaRespuestaCTA, 'days');
    }
  }

}
