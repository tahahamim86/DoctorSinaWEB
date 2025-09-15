import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DefaultComponent } from './layouts/default/default.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { MedicalDocsComponent } from './medical-docs/medical-docs.component';
import { RespiratoryDiagnosisComponent } from './respiratory-diagnosis/respiratory-diagnosis.component';
import { BraintumorComponent } from './braintumor/braintumor.component';
import { RetinopathyComponent } from './retinopathy/retinopathy.component';
import { CardiologyDiagnosisComponent } from './cardiology-diagnosis/cardiology-diagnosis.component';
import { MedicalFormComponent } from './medical-form/medical-form.component';
import { AppointementsComponent } from './appointements/appointements.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { ChatWDocComponent } from './chat-w-doc/chat-w-doc.component';
import { PresentationComponent } from './homepage/presentation/presentation.component';
import { AboutComponent } from "./homepage/about/about.component";
import { ServicesComponent } from "./homepage/services/services.component";
import { PrivacyComponent } from "./homepage/privacy/privacy.component";
import { DownloadAppComponent } from "./homepage/download-app/download-app.component";
import { DocDashComponent } from "./homepage/doc-dash/doc-dash.component";
import { PatientDashComponent } from "./homepage/patient-dash/patient-dash.component";
import { FeaturesComponent } from "./homepage/features/features.component";
import { FAQComponent } from "./homepage/f-aq/f-aq.component";
import { TermComponent } from "./homepage/term/term.component";

// Guards
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';

const routes: Routes = [
  // Public Routes
  {
    path: '',
    component: PresentationComponent,
    canActivate: [BeforeLoginService],
  },
  { path: 'about', component: AboutComponent, canActivate: [BeforeLoginService] },
  { path: 'faq', component: FAQComponent, canActivate: [BeforeLoginService] },
  { path: 'terms', component: TermComponent, canActivate: [BeforeLoginService] },
  { path: 'services', component: ServicesComponent, canActivate: [BeforeLoginService] },
  { path: 'privacy', component: PrivacyComponent, canActivate: [BeforeLoginService] },
  { path: 'features', component: FeaturesComponent, canActivate: [BeforeLoginService] },
  { path: 'login', component: LoginComponent, canActivate: [BeforeLoginService] },
  { path: 'register', component: RegisterComponent, canActivate: [BeforeLoginService] },
  { path: 'download', component: DownloadAppComponent, canActivate: [BeforeLoginService] },
  { path: 'doctor-dashbord', component: DocDashComponent },
  { path: 'patient-dashbord', component: PatientDashComponent },

  // Protected Routes (require login)
  {
    path: 'dashboard',
    component: DefaultComponent,
    canActivate: [AfterLoginService],
    canActivateChild: [AfterLoginService], // <-- add this
    children: [
      {path: '', component: DashboardComponent},
      {path: 'apichat', component: MessageComponent},
      {path: 'chat_tech', component: MessageComponent},
      {path: 'respiratory-diagnosis', component: RespiratoryDiagnosisComponent},
      {path: 'retinopathy-diagnosis', component: RetinopathyComponent},
      {path: 'cardiology-diagnosis', component: CardiologyDiagnosisComponent},
      {path: 'brain-diagnosis', component: BraintumorComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'password-reset', component: PasswordresetComponent},
      {path: 'medical-form', component: MedicalFormComponent},
      {path: 'appointement', component: AppointementsComponent},
      {path: 'book-appointment', component: BookAppointmentComponent},
      {path: 'messenger-w-doc', component: ChatWDocComponent},
      {
        path: 'medical-docs',
        children: [
          {path: '', component: MedicalDocsComponent},
          {path: ':folderId', component: MedicalDocsComponent},
        ],
      },
    ],
  },
  // Wildcard (fallback) Route
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
