import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }     from './app.component';
import { NavbarComponent }  from './layouts/navbar/navbar.component';
import { FooterComponent }  from './layouts/footer/footer.component';

import { EntitiesModule }   from './entities/entities.module';
import { UserModule }       from './entities/users/user.module';
import { SolicitudModule }  from './entities/solicitudes/solicitud.module';
import { DocumentoModule }  from './entities/documentos/documento.module';
import { GestionModule }    from './entities/gestiones/gestion.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    EntitiesModule,
    UserModule,
    SolicitudModule,
    DocumentoModule,
    GestionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
