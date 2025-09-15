import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DefaultModule } from './layouts/default/default.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { PresentationComponent } from './homepage/presentation/presentation.component';
import { NavbarComponent } from './homepage/navbar/navbar.component';
import { FooterpageComponent } from './homepage/footerpage/footerpage.component';
import { AboutComponent } from './homepage/about/about.component';
import { ServicesComponent } from './homepage/services/services.component';
import { PrivacyComponent } from './homepage/privacy/privacy.component';
import { DownloadAppComponent } from './homepage/download-app/download-app.component';
import { DocDashComponent } from './homepage/doc-dash/doc-dash.component';
import { PatientDashComponent } from './homepage/patient-dash/patient-dash.component';
import { FeaturesComponent } from './homepage/features/features.component';
import { FAQComponent } from './homepage/f-aq/f-aq.component';
import { TermComponent } from './homepage/term/term.component';
import { BubblechatComponent } from './bubblechat/bubblechat.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PresentationComponent,
    NavbarComponent,
    FooterpageComponent,
    AboutComponent,
    ServicesComponent,
    PrivacyComponent,
    DownloadAppComponent,
    DocDashComponent,
    PatientDashComponent,
    FeaturesComponent,
    FAQComponent,
    TermComponent,
    BubblechatComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    DefaultModule,
    BrowserAnimationsModule,
    StreamChatModule,
    StreamAutocompleteTextareaModule,
    BrowserAnimationsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
