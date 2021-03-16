import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FooterComponent }  from './layouts/footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { EntitiesModule }   from './entities/entities.module';
import { UserModule }       from './entities/users/user.module';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthInterceptor } from './interceptor/auth.interceptor';

// Cambiar el locale de la app
import  localeEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common'
registerLocaleData( localeEs )

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent, // Hay que declararlo aqui, de lo contrario da error.
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    // LayoutsModule, // Da error en Footer y NavBar
    EntitiesModule,
    UserModule,
    FontAwesomeModule,
    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' }),
		//NgxWebstorageModule.forRoot({ prefix: 'custom', separator: '.', caseSensitive:true })
		// The forRoot method allows to configure the prefix, the separator and the caseSensitive option used by the library
		// Default values:
		// prefix: "ngx-webstorage"
		// separator: "|"
		// caseSensitive: false
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
     provide: LOCALE_ID,
     useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
