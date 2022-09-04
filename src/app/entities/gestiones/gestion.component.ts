import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { GestionService } from './gestion.service';
import { IGestion } from './gestion.interface';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html'
})
export class GestionComponent implements OnInit {
  gestiones: any[] = [];
  // gestiones?: IGestion[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected gestionService: GestionService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) { }


  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.gestionService.findAll().
      subscribe(resp => {
        this.gestiones = resp
      });
    setTimeout(() => console.log(this.gestiones), 50);
  }

  previousState(): void {
    window.history.back();
  }

}

