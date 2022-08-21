import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { DocumentoService } from './documento.service';
import { IDocumento } from './documento.interface';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss']
})
export class DocumentoComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  faEye = faEye;

  documentos: any[] = [];
  // documentos: IDocumento[] | null = null;;
  eventSubscriber?: Subscription;
  totalItems = 0;
  // itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  isCTA = false;

  constructor(
    protected documentoService: DocumentoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.loadAll();
    });
    this.registerChangeInDocumentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      // this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDocumento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }


  openFile(contentType: string, base64String: string): void {
    // return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInDocumentos(): void {
    // this.eventSubscriber = this.eventManager.subscribe('documentoListModification', () => this.loadPage());
  }

  delete(documento: IDocumento): void {
    // const modalRef = this.modalService.open(DocumentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    // modalRef.componentInstance.documento = documento;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IDocumento[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/documento'], {
      queryParams: {
        page: this.page,
        // size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.documentos = data || [];


  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  private loadAll(): void {
    this.documentoService.findAll().
      subscribe(resp => {
        this.documentos = resp
      });
    setTimeout(() => console.log(this.documentos), 50);
  }

  previousState(): void {
    window.history.back();
  }

}
