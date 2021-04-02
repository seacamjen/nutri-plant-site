import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './service/product.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from "@angular/fire/storage";

import { ProductListComponent } from './product-list/product-list.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NutrientRemovalComponent } from './nutrient-removal/nutrient-removal.component';

// Primeng
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig, FilterService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from "primeng/message";
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthService } from "./service/auth.service";
import { NutriFilesComponent } from './nutri-files/nutri-files.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    NewProductComponent,
    NutrientRemovalComponent,
    LoginComponent,
    DashboardComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    NutriFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    SidebarModule,
    CardModule,
    TableModule,
    DataViewModule,
    HttpClientModule,
    ProgressSpinnerModule,
    ToolbarModule,
    ToastModule,
    MessageModule,
    DialogModule,
    DropdownModule,
    RadioButtonModule,
    ConfirmDialogModule,
    InputNumberModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    RatingModule,
    InputTextareaModule,
    MenubarModule
  ],
  providers: [ConfirmationService, PrimeNGConfig, FilterService, MessageService, ProductService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
