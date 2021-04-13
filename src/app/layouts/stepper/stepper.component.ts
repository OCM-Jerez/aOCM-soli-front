import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

// Interfaces
import { ISolicitud } from '../../entities/solicitudes/solicitud.interface';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  solicitud: ISolicitud | null = null;

  constructor( protected activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => (this.solicitud = solicitud));
    // Calculo días trancurridos desde la solicitud.
    if (this.solicitud!.fechaRespuesta) {
      const date = moment(this.solicitud!.fechaRespuesta);
      this.solicitud!.diasRespuesta = date.diff(this.solicitud!.fechaSolicitud, 'days');
    } else {
      const date = moment();
      this.solicitud!.diasRespuesta = date.diff(this.solicitud!.fechaSolicitud, 'days');
    }
  }

}
