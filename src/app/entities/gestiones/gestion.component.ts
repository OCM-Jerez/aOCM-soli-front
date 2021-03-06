import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { GestionService } from './gestion.service';
import { IGestion } from './gestion.interface';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html'
})
export class GestionComponent implements OnInit {
  faPlus = faPlus;
  faEye = faEye;

  gestiones?: IGestion[];
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
  ) {}


  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.gestionService.query().
    subscribe( resp =>{
    this.gestiones = resp
    });
  }
}
