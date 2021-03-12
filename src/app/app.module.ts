import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgxWebstorageModule } from 'ngx-webstorage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { FooterComponent }  from './layouts/footer/footer.component';

import { LayoutsModule } from './layouts/layouts.module';
import { EntitiesModule }   from './entities/entities.module';
import { UserModule }       from './entities/users/user.module';
import { SolicitudModule }  from './entities/solicitudes/solicitud.module';
import { DocumentoModule }  from './entities/documentos/documento.module';
import { GestionModule }    from './entities/gestiones/gestion.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AppComponent } from './app.component';

import { PrimeNgModule } from './prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    // NgxWebstorageModule.forRoot(),
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' }),
		//NgxWebstorageModule.forRoot({ prefix: 'custom', separator: '.', caseSensitive:true })
		// The forRoot method allows to configure the prefix, the separator and the caseSensitive option used by the library
		// Default values:
		// prefix: "ngx-webstorage"
		// separator: "|"
		// caseSensitive: false
    FontAwesomeModule,
    LayoutsModule,
    EntitiesModule,
    UserModule,
    // SolicitudModule,
    // DocumentoModule,
    // GestionModule,
    PrimeNgModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
