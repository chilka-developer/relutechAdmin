import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as $ from 'jquery';
import * as Highcharts from "highcharts";
import { CommonService } from "../services/common.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'quote-detail-popup',
  templateUrl: '../view/quote-detail-popup.component.html',
  styleUrls: ['../../assets/css/quote-detail-popup.component.css']
})
export class QuoteDetailPopupComponent implements OnInit {

  popup:boolean = false;
  quotesDetails : any ;
  resultMaintenanceSavings: any = JSON.parse(localStorage.getItem("quote_final_result"));
  countriesName : any;
  total2 : any;
  total3 : any;
  carbonFootprint:any;
  datacenters : any;
  result_trees_saved : any;
  result_carbon_footprint_reduction : any;
  result_energy_saved : any;
  result_miles_passenger_car : any;
  hardwareMaintenanceSavings :any;
  PlbSavings : any;
  CarbonFootprintReduction:any;
  EquipmentWorth : any;
  reluPaysEquipment: any;
  buyPrice: any;
  rentTotal2: any;
  diffTotal3: any
  oemMaintainance: any;
  estimatedMaintainanceSavings: any;
  rlMaintainance:any;
  todayDate: number = Date.now();
  quote_id: '';
  quoteFinalResult: any;
  agentDetails : any;
  result_relu_rent : any;
  result_relu_rent_display : any;
  customerPaysRelutech : any;
  getClientEmailId: string = '' ;
  equipmentWorth : any;
  
   nevigateToFinalResult=function(){
       this.router.navigateByUrl('/final-result');  
   }
   onSendEmail(){

     let client_name = this.getClientEmailId;
     this.quoteFinalResult =JSON.parse(localStorage.getItem("quote_final_result"));
     let quote_id =  this.quoteFinalResult.quote_id;
     this.agentDetails = JSON.parse(localStorage.getItem("agent_details"));
     let agent_id  = this.agentDetails.user_id;

   }
  
   ngOnInit():void{
     
     this.quotesDetails = JSON.parse(localStorage.getItem("quote_detail"));
     this.resultMaintenanceSavings = JSON.parse(localStorage.getItem("quote_final_result"));
     this.countriesName = JSON.parse(localStorage.getItem("countries"));
     // this.total2 = parseInt(((this.resultMaintenanceSavings.result_relu_pays_equipment))) - parseInt(((this.resultMaintenanceSavings.result_equipment_worth)));

     // this.total3 =this.resultMaintenanceSavings.result_relu_pays_equipment-  parseInt(this.total2 );
    
     this.resultMaintenanceSavings = JSON.parse(localStorage.getItem("quote_final_result"));
     this.quotesDetails = JSON.parse(localStorage.getItem("quote_detail"));
    
     this.result_trees_saved=  this.resultMaintenanceSavings["result_trees_saved"];
     this.result_miles_passenger_car=  this.resultMaintenanceSavings["result_miles_passenger_car"];
     this.result_carbon_footprint_reduction=  this.resultMaintenanceSavings["result_carbon_footprint_reduction"];
     this.result_energy_saved=  this.resultMaintenanceSavings["result_energy_saved"];

     this.datacenters = this.quotesDetails.datacenters;
     this.resultMaintenanceSavings = JSON.parse(localStorage.getItem("quote_final_result"));
     this.hardwareMaintenanceSavings = this.commonService.formatAmount (this.resultMaintenanceSavings.result_maintenance_savings);
     this.PlbSavings = this.commonService.formatAmount(this.resultMaintenanceSavings.result_plb_savings);
     this.CarbonFootprintReduction = this.commonService.formatAmount(this.resultMaintenanceSavings.result_carbon_footprint_reduction);
     this.EquipmentWorth = this.commonService.formatAmount(this.resultMaintenanceSavings.result_buy_price);
     this.equipmentWorth = this.commonService.formatAmount(this.resultMaintenanceSavings.result_plb_savings);
     // this.reluPaysEquipment = this.commonService.formatAmount(this.resultMaintenanceSavings.result_relu_pays_equipment);
     this.buyPrice = this.commonService.formatAmount(this.resultMaintenanceSavings.result_buy_price);
     this.result_relu_rent = this.resultMaintenanceSavings.result_relu_rent;
     this.customerPaysRelutech =  this.commonService.formatAmount((this.result_relu_rent * this.quotesDetails.migration_months).toFixed(2).toString());

     
     this.total3 = (parseInt(this.resultMaintenanceSavings.result_buy_price) - (this.result_relu_rent * this.quotesDetails.migration_months));
     this.diffTotal3 =  this.commonService.formatAmount(parseFloat(this.total3).toFixed(2));
     this.result_relu_rent_display = this.commonService.formatAmount(this.result_relu_rent);

     this.oemMaintainance = this.commonService.formatAmount(this.resultMaintenanceSavings.result_oem_maintainance);
     this.rlMaintainance = this.commonService.formatAmount(this.resultMaintenanceSavings.result_relutech_maintainance);
     this.estimatedMaintainanceSavings = this.commonService.formatAmount(this.resultMaintenanceSavings.result_estimated_maintainance_savings);
    
   // console.log(this.resultMaintenanceSavings);
       $(".final-result-1").hide();
       $(".final-result-2").hide();
       $(".final-result-3").hide();
       $(".final-result-4").hide();
       
   $(".final-result-icon-1").click(function(){
      
       $(".final-result-1").show();
       $(".final-result-2").hide();
       $(".final-result-3").hide();
       $(".final-result-4").hide();
       
       $(".final-result-icon-1").addClass("selected");
       $(".final-result-icon-2").removeClass("selected");
       $(".final-result-icon-3").removeClass("selected");
       $(".final-result-icon-4").removeClass("selected");
       
       $("#image1-model").attr("src", "assets/image/maintenance-hover.png");
       $("#image2-model").attr("src", "assets/image/dollar.png");
       $("#image3-model").attr("src", "assets/image/right-cloud.png");
       
       return false;
   });
   
   $(".final-result-icon-2").click(function(){
       $(".final-result-1").hide();
       $(".final-result-2").show();
       $(".final-result-3").hide();
       $(".final-result-4").hide();
       
       $(".final-result-icon-1").removeClass("selected");
       $(".final-result-icon-2").addClass("selected");
       $(".final-result-icon-3").removeClass("selected");
       $(".final-result-icon-4").removeClass("selected");
       
       $("#image2-model").attr("src", "assets/image/dollar-hover.png");
       $("#image1-model").attr("src", "assets/image/maintenance.png");
       $("#image3-model").attr("src", "assets/image/right-cloud.png");

       return false;
   });
   
   $(".final-result-icon-3").click(function(){
       $(".final-result-1").hide();
       $(".final-result-2").hide();
       $(".final-result-3").show();
       $(".final-result-4").hide();
       
       $(".final-result-icon-1").removeClass("selected");
       $(".final-result-icon-2").removeClass("selected");
       $(".final-result-icon-3").addClass("selected");
       $(".final-result-icon-4").removeClass("selected");
       
       $("#image1-model").attr("src", "assets/image/maintenance.png");
       $("#image2-model").attr("src", "assets/image/dollar.png");
       $("#image3-model").attr("src", "assets/image/right-cloud-hover.png");
       
       return false;
   });
   
   $(".final-result-icon-4").click(function(){
       $(".final-result-1").hide();
       $(".final-result-2").hide();
       $(".final-result-3").hide();
       $(".final-result-4").show();
       
       $(".final-result-icon-1").removeClass("selected");
       $(".final-result-icon-2").removeClass("selected");
       $(".final-result-icon-3").removeClass("selected");
       $(".final-result-icon-4").addClass("selected");
       
       $("#image1-model").attr("src", "assets/image/maintenance.png");
       $("#image2-model").attr("src", "assets/image/dollar.png");
       $("#image3-model").attr("src", "assets/image/right-cloud.png");

       return false;
   });
   $("#save").click(function(){
       $("#success_msg").css({"display":"block"});
   });
   
     $("#email_form").hide();
     $("#send_email").click(function() {
         $("#email_form").show();
     });
     $("#send").click(function() {
         $("#success_email_msg").show();
     });
     
     $("#row-container").show();
  }

   constructor(private router : Router ,private commonService :CommonService ,private http: HttpClient){}
   
 
  highcharts = Highcharts;
  chartOptions = {

     chart: {
        type: 'scatter',
        marginBottom: 50,
        width: 550,
        display: "block"
     },
     title: {
        text: 'Hardware Valuation Over The Migration Timeline'
     },
     credits: {
        enabled: false
     },
     subtitle: {
     },
     xAxis: {
        title: {
           text: 'Migration Timeline (Months)'
        },
        gridLineWidth: 1,
        minPadding: 0.2,
        maxPadding: 0.2,
        minRange: 20,
        min: 0,
        tickInterval: 6
     },
     yAxis: {

        title: {
           text: 'Hardware Valuation'
        },
        minPadding: 0.2,
        maxPadding: 0.2,
        maxZoom: 60,
        plotLines: [{
           value: 1,
           width: 0,
           color: '#808080'
        }]
     },
     plotOptions: {
        series: {
           lineWidth: 1,
           point: {
              events: {
                 
              }
           }
        }
     },
     legend: {
        enabled: false
     },
     exporting: {
        enabled: false
     },
     series: [{
        
        data: JSON.parse(this.resultMaintenanceSavings.result_hardware_valuation_chart)
       
     }]
  };
   
}
