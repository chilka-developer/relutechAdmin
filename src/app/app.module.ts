import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy , LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { SignInComponent } from './controller/sign-in.component';
import { DashboardComponent } from './controller/dashboard.component';
import { SideBarComponent } from './controller/common/side-bar.component';
import { HeaderComponent } from './controller/common/header.component';
import {HighchartsChartModule} from 'node_modules/highcharts-angular';
import { EquipmentMappingListComponent } from './controller/equipment-mapping-list.component';
import { EquipmentMappingAddComponent } from './controller/equipment-mapping-add.component';
import { FooterComponent } from './controller/common/footer.component';
import { HeadComponent } from './controller/common/head.component';
import { EquipmentMappingEditComponent } from './controller/equipment-mapping-edit.component';
import { EquipmentListComponent } from './controller/equipment-list.component';
import { EquipmentAddComponent } from './controller/equipment-add.component';
import { TestFormComponent } from './test-form/test-form.component';
import { OemListComponent } from './controller/oem-list.component';
import { OemAddComponent } from './controller/oem-add.component';
import { OemEditComponent } from './controller/oem-edit.component';
import { ProductLineListComponent } from './controller/product-line-list.component';
import { ProductLineEditComponent } from './controller/product-line-edit.component';
import { ProductLineAddComponent } from './controller/product-line-add.component';
import { TypeListComponent } from './controller/type-list.component';
import { TypeEditComponent } from './controller/type-edit.component';
import { TypeAddComponent } from './controller/type-add.component';
import { EquipmentEditComponent } from './controller/equipment-edit.component';
import { PermaintainedAddComponent } from './controller/permaintained-add.component';
import { PermaintainedListComponent } from './controller/permaintained-list.component';
import { PermaintainedEditComponent } from './controller/permaintained-edit.component';
import { GlobalSettingsAddComponent } from './controller/global-settings-add.component';
import { GlobalSettingsListComponent } from './controller/global-settings-list.component';
import { GlobalSettingsEditComponent } from './controller/global-settings-edit.component';
import { CountryListComponent } from './controller/country-list.component';
import { CountryEditComponent } from './controller/country-edit.component';
import { CountryAddComponent } from './controller/country-add.component';
import { SalesRepListComponent } from './controller/sales-rep-list.component';
import { SalesRepAddComponent } from './controller/sales-rep-add.component';
import { SalesRepEditComponent } from './controller/sales-rep-edit.component';
import { CompanyListComponent } from './controller/company-list.component';
import { CompanyAddComponent } from './controller/company-add.component';
import { CompanyEditComponent } from './controller/company-edit.component';
import { QuotesListComponent } from './controller/quotes-list.component';
import { QuotesAddComponent } from './controller/quotes-add.component';
import { QuotesEditComponent } from './controller/quotes-edit.component';
import { ChangePasswordComponent } from './controller/change-password.component';
import { QuoteDetailPopupComponent } from './controller/quote-detail-popup.component';


const appRoutes :Routes = [

  { path : 'sign-in' , component : SignInComponent},
  { path : 'dashboard' , component : DashboardComponent},
  { path : 'equipment-mapping-list' , component :EquipmentMappingListComponent },
  { path : 'equipment-mapping-add' , component :EquipmentMappingAddComponent },
  { path : 'equipment-mapping-edit' , component :EquipmentMappingEditComponent },
  { path : 'equipment-list' , component :EquipmentListComponent },
  { path : 'equipment-add' , component :EquipmentAddComponent },
  { path : 'equipment-edit' , component : EquipmentEditComponent},
  { path : 'oem-list' , component :OemListComponent },
  { path : 'oem-edit' , component : OemEditComponent},
  { path : 'oem-add' , component :OemAddComponent },
  { path : 'product-line-list' , component : ProductLineListComponent},
  { path : 'product-line-edit' , component : ProductLineEditComponent},
  { path : 'product-line-add' , component : ProductLineAddComponent},
  { path : 'type-add' , component : TypeAddComponent },
  { path : 'type-edit' , component : TypeEditComponent},
  { path : 'type-list' , component : TypeListComponent},
  { path : 'permaintained-add' , component :PermaintainedAddComponent },
  { path : 'permaintained-list' , component :PermaintainedListComponent },
  { path : 'permaintained-edit' , component :PermaintainedEditComponent},
  { path : 'global-settings-add' , component :GlobalSettingsAddComponent},
  { path : 'global-settings-list' , component :GlobalSettingsListComponent},
  { path : 'global-settings-edit' , component :GlobalSettingsEditComponent},
  { path : 'country-add' , component :CountryAddComponent},
  { path : 'country-list' , component :CountryListComponent},
  { path : 'country-edit' , component :CountryEditComponent},
  { path : 'sales-rep-add' , component :SalesRepAddComponent},
  { path : 'sales-rep-list' , component :SalesRepListComponent},
  { path : 'sales-rep-edit' , component :SalesRepEditComponent},
  { path : 'company-add' , component :CompanyAddComponent},
  { path : 'company-list' , component :CompanyListComponent},
  { path : 'company-edit' , component :CompanyEditComponent},
  { path : 'quote-add' , component :QuotesAddComponent},
  { path : 'quote-list' , component :QuotesListComponent},
  { path : 'quote-edit' , component :QuotesEditComponent},
  { path : 'change-password' , component :ChangePasswordComponent},
 
  
  { path : '' , redirectTo: '/sign-in' , pathMatch: 'full' }
 
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    SideBarComponent,
    HeaderComponent,
    EquipmentMappingListComponent,
    EquipmentMappingAddComponent,
    FooterComponent,
    HeadComponent,
    EquipmentMappingEditComponent,
    EquipmentListComponent,
    EquipmentAddComponent,
    TestFormComponent,
    OemListComponent,
    OemAddComponent,
    OemEditComponent,
    ProductLineListComponent,
    ProductLineEditComponent,
    ProductLineAddComponent,
    TypeListComponent,
    TypeEditComponent,
    TypeAddComponent,
    EquipmentEditComponent,
    PermaintainedAddComponent,
    PermaintainedListComponent,
    PermaintainedEditComponent,
    GlobalSettingsAddComponent,
    GlobalSettingsListComponent,
    GlobalSettingsEditComponent,
    CountryListComponent,
    CountryEditComponent,
    CountryAddComponent,
    SalesRepListComponent,
    SalesRepAddComponent,
    SalesRepEditComponent,
    CompanyListComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    QuotesListComponent,
    QuotesAddComponent,
    QuotesEditComponent,
    ChangePasswordComponent,
    QuoteDetailPopupComponent
   

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide:LocationStrategy , useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
