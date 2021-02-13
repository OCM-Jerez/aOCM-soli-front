import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import * as moment from 'moment';

// import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
// import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';


import { SolicitudService } from './solicitud.service';
import { ISolicitud } from './solicitud.interface';

// import { SolicitudDeleteDialogComponent } from './solicitud-delete-dialog.component';

@Component({
  selector: 'jhi-solicitud',
  templateUrl: './solicitud.component.html'
})
export class SolicitudComponent implements OnInit, OnDestroy {
  solicitudes?: ISolicitud[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  // itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  diasRespuesta = 0;

  constructor(
    protected solicitudService: SolicitudService,
    protected activatedRoute: ActivatedRoute,
    // protected dataUtils: JhiDataUtils,
    protected router: Router,
    // protected eventManager: JhiEventManager,
    // protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    // const pageToLoad: number = page || this.page;
    // this.solicitudService
    //   .query({
    //     page: pageToLoad - 1,
    //     size: this.itemsPerPage,
    //     sort: this.sort()
    //   })
    //   .subscribe(
    //     (res: HttpResponse<ISolicitud[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
    //     () => this.onError()
    //   );
  }

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(data => {
    //   this.page = data.pagingParams.page;
    //   this.ascending = data.pagingParams.ascending;
    //   this.predicate = data.pagingParams.predicate;
    //   this.ngbPaginationPage = data.pagingParams.page;
    //   this.loadPage();
    // });
    // this.registerChangeInSolicituds();

    this.loadAll();
  }

  ngOnDestroy(): void {
    // if (this.eventSubscriber) {
    //   this.eventManager.destroy(this.eventSubscriber);
    // }
  }

  trackId(index: number, item: ISolicitud): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  // byteSize(base64String: string): string {
  //   return this.dataUtils.byteSize(base64String);
  // }

  // openFile(contentType: string, base64String: string): void {
  //   return this.dataUtils.openFile(contentType, base64String);
  // }

  // registerChangeInSolicituds(): void {
  //   this.eventSubscriber = this.eventManager.subscribe('solicitudListModification', () => this.loadPage());
  // }

  delete(solicitud: ISolicitud): void {
    // const modalRef = this.modalService.open(SolicitudDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.solicitud = solicitud;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ISolicitud[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/solicitudes'], {
      queryParams: {
        page: this.page,
        // size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });

    // Se añade diasRespuesta a cada solicitud. diasRespuesta es un campo calculado en la Interfaz ISolicitud
    // data?.forEach(soli => {
    //   if (typeof soli.fechaRespuesta === 'undefined') {
    //     const date = moment();
    //     soli.diasRespuesta = date.diff(soli.fechaSolicitud, 'days');
    //   } else {
    //     const date = moment(soli.fechaRespuesta);
    //     soli.diasRespuesta = date.diff(soli.fechaSolicitud, 'days');
    //   }
    // });

    this.solicitudes = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  private loadAll(): void {
    this.solicitudService.query().
    subscribe( resp =>{
    console.log(resp);
    this.solicitudes = resp
    console.log(this.solicitudes[1]);
    });
  }

}
