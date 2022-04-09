import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: '../view/dashboard.component.html',
  // styleUrls: ['../../assets/css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customerCount: number;
  quotesCount: number;
  serverCount: number;

  ngOnInit(): void {
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-dashboard");
    //AddDefaultValues = 
    this.quotesCount = 0;
    this.serverCount =0;
    this.customerCount =0;
    this.http.post(CommonService.api_url + '/dashboard' , {oauth_key : CommonService.oauth_key}).subscribe(responseData=>{
      if(responseData["is_successful"]==1){
        let dashboardData = responseData["data"][0];
        this.quotesCount = dashboardData["quotes_count"];
        this.serverCount = dashboardData["server_count"];
        this.customerCount = dashboardData["customer_count"];
        // console.log(this.quotesCount);
      }
    });
  }

  constructor(private router: Router , private http: HttpClient ,private commonService : CommonService) { }

  navigateToEquipmentMapping = function () {
    this.router.navigateByUrl('/equipment-mapping-list');
  }
  navigateToDashboard = function () {
    this.router.navigateByUrl('/dashboard');
  };
  navigateToChangepass = function () {
    this.router.navigateByUrl('/sign-up');
  };
  navigateToCountryList = function () {
    this.router.navigateByUrl('/country-master-list');
  };
  navigateToCustomerList = function () {
    this.router.navigateByUrl('/customer-list');
  };
  navigateToQuotesListEd= function () {
    this.router.navigateByUrl('/quotes-list-ed');
  };

}
