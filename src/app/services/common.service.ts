import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  // public static api_url = "https://dev.thcitsolutions.com/relutech-calculator";
  // public static api_url = "https://calc.resourz.net/relutech-calculator/admin-api";
  public static api_url = "https://awscalc.resourz.net/calc-api";
  public static oauth_key = "F1CEC5YC4rrNhTzkP4aNR4Td3XAzCcHAWM4Eh1iDoofbl6xT";
  // public static set_timeout_aws = "F1CEC5YC4rrNhTzkP4aNR4Td3XAzCcHAWM4Eh1iDoofbl6xT";

  constructor(private router : Router) { }
  

  public static ActiveClass = function(menu_name:string){
    $("ul.sidebar-menu li").each(function(){
      $(this).removeClass("active");
    });

    $("li." + menu_name).addClass("active");
  }
  
  IsUserLogIn(){

    var agentDetails = localStorage.getItem("user_details");

    if(agentDetails == undefined || agentDetails == ""){

      this.router.navigateByUrl('/sign-in');
    }
  }
  formatAmount(number:string) {
    return parseFloat(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
