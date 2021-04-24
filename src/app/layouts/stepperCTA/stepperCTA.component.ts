import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

// Interfaces
import { ISolicitud } from '../../entities/solicitudes/solicitud.interface';

@Component({
  selector: 'app-stepperCTA',
  templateUrl: './stepperCTA.component.html',
  styleUrls: ['./stepperCTA.component.scss']
})
export class StepperCTAComponent implements OnInit {
  solicitud: ISolicitud | null = null;
  respondidaCTA: boolean = false;
  iniciadaCTA: boolean = false

  constructor(protected activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ solicitud }) => (this.solicitud = solicitud));
    if (this.solicitud!.fechaInicioCTA) {
      this.iniciadaCTA= true
    }

    // Calculo días trancurridos desde la reclamación.
    if (this.solicitud!.fechaRespuestaCTA) {
      const date = moment(this.solicitud!.fechaRespuestaCTA);
      this.solicitud!.diasRespuestaCTA = date.diff(this.solicitud!.fechaReclamacionCTA, 'days');
      this.respondidaCTA = true
    } else {
      const date = moment();
      this.solicitud!.diasRespuestaCTA = date.diff(this.solicitud!.fechaReclamacionCTA, 'days');
    }
  }

}
