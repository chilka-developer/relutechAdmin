import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: '../../view/common/side-bar.component.html',
  // styleUrls: ['../../assets/css/side-bar.component.css']
})
export class SideBarComponent implements OnInit {
 
  ngOnInit(): void {
    
    
  }
  navigateToQuoteList= function(){
    this.router.navigateByUrl('/quote-list');
  }
  navigateToTypeList = function(){
    this.router.navigateByUrl('/type-list');
  }
  navigateToSalesRepList = function(){
    this.router.navigateByUrl('/sales-rep-list');
  }
  navigateToCompanyList = function(){
    this.router.navigateByUrl('/company-list');
  }
  navigateToCountryList = function(){
    this.router.navigateByUrl('/country-list');
  }
  navigateToProductLineList = function () {
    this.router.navigateByUrl('/product-line-list');
  };
  navigateToDashboard = function () {
    this.router.navigateByUrl('/dashboard');
  };
  navigateToPermaintainedList = function(){
    this.router.navigateByUrl('/permaintained-list');
  }
  navigateToOem = function () {
    this.router.navigateByUrl('/oem-list');
  };
  navigateToGlobalSettingsList= function () {
    this.router.navigateByUrl('/global-settings-list');
  };
  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/equipment-mapping-list');
  };
  navigateToEquipmentList = function () {
    this.router.navigateByUrl('/equipment-list');
  };
  navigateToSignIn = function (){
    this.router.navigateByUrl('/sign-in');
    localStorage.clear();
  }
  
  constructor(private router : Router) { }

  onSubmit(){

  }

}




