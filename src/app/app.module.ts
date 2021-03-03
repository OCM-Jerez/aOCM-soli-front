import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { FooterComponent }  from './layouts/footer/footer.component';

import { EntitiesModule }   from './entities/entities.module';
import { UserModule }       from './entities/users/user.module';
import { SolicitudModule }  from './entities/solicitudes/solicitud.module';
import { DocumentoModule }  from './entities/documentos/documento.module';
import { GestionModule }    from './entities/gestiones/gestion.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
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
    EntitiesModule,
    UserModule,
    SolicitudModule,
    DocumentoModule,
    GestionModule
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
