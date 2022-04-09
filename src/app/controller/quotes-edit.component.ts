import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import * as Highcharts from "highcharts";
import { DataCenter } from "../model/datacenters.model";
import { CommonService } from "../services/common.service";


@Component({
    selector: 'app-quotes-edit',
    templateUrl: '../view/quotes-edit.component.html',
    styleUrls: ['../../assets/css/quotes-edit.component.css',
        //   '../../assets/css/quote-detail-popup.component.css'
    ]
})
export class QuotesEditComponent implements OnInit {

    quoteDetail: any = [];
    allCountries: any;
    countriesOption: string;
    datacenters: DataCenter[] = [];
    countries: string[] = [];
    dc_orders: string[] = [];
    equipments: any;
    quotes_id: string;
    oemOptionsHtml: string;
    hardwareMaintenanceSavings: any;
    PlbSavings: any;
    CarbonFootprintReduction: any;
    EquipmentWorth: any;
    popup: boolean = false;
    new_quote_popup: boolean = false;
    getClientEmailId: string = "";
    isActive: boolean;
    result_buy_price: string = "";
    migrationMonths: any = "";
    auditDetailArray: any;
    auditDetailData: any;
    auditDetails: any;
    audit_user_id: string;
    errormessage: string = "";
    powerUsageEffectiveness: any;
    energyfromRenewables: any;
    errorMessage: string = "";

    quotesDetails: any;
    resultMaintenanceSavings: any = JSON.parse(localStorage.getItem("quote_final_result"));
    countriesName: any;
    total3: any;
    result_trees_saved: any;
    result_carbon_footprint_reduction: any;
    result_energy_saved: any;
    result_miles_passenger_car: any;
    buyPrice: any;
    diffTotal3: any;
    oemMaintainance: any;
    estimatedMaintainanceSavings: any;
    rlMaintainance: any;
    result_relu_rent: any;
    result_relu_rent_display: any;
    customerPaysRelutech: any;
    equipmentWorth: any;
    quote_name: string;

    cOptions: any;
    updateFromInput: boolean = false;

    ngOnInit(): void {
        this.errormessage == "";
        this.commonService.IsUserLogIn();
        CommonService.ActiveClass("nav-quote");
        this.quotes_id = localStorage.getItem("quote_id");

        let is_refresh = localStorage.getItem("is_refresh");
        if (is_refresh == "1") {
            localStorage.setItem("is_refresh", "0");
            location.reload();
        }


        this.http.post(CommonService.api_url + '/quote-get',
            { quote_id: this.quotes_id, oauth_key: CommonService.oauth_key })
            .subscribe(responceData => {
                this.quoteDetail = responceData["data"]["ArrQuotes"];
                this.migrationMonths = this.quoteDetail.migration_months;
                // this.powerUsageEffectiveness = this.quoteDetail.pue;
                // this.energyfromRenewables = this.quoteDetail.per_energy_usage;
                this.hardwareMaintenanceSavings = this.commonService.formatAmount(this.quoteDetail.result_maintenance_savings);//.replace(/^\d+\.?\d{0,2}$/ , );
                this.PlbSavings = this.commonService.formatAmount(this.quoteDetail.result_plb_savings);
                this.CarbonFootprintReduction = this.commonService.formatAmount(this.quoteDetail.result_carbon_footprint_reduction);
                this.EquipmentWorth = this.commonService.formatAmount(this.quoteDetail.result_equipment_worth);
                this.result_buy_price = this.commonService.formatAmount(this.quoteDetail.result_buy_price);
                this.quote_name = this.quoteDetail.quote_name;

                this.quote_name = this.quoteDetail.quote_name;
                this.buyPrice = this.commonService.formatAmount(this.quoteDetail.result_buy_price);
                this.result_relu_rent = this.quoteDetail.result_relu_rent;
                this.customerPaysRelutech = this.commonService.formatAmount((this.result_relu_rent * this.migrationMonths).toFixed(2).toString());
                this.total3 = (parseInt(this.quoteDetail.result_buy_price) - (this.result_relu_rent * this.migrationMonths));
                this.diffTotal3 = this.commonService.formatAmount(parseFloat(this.total3).toFixed(2));
                this.result_relu_rent_display = this.commonService.formatAmount(this.result_relu_rent);
                this.oemMaintainance = this.commonService.formatAmount(this.quoteDetail.result_oem_maintainance);
                this.rlMaintainance = this.commonService.formatAmount(this.quoteDetail.result_relutech_maintainance);
                this.estimatedMaintainanceSavings = this.commonService.formatAmount(this.quoteDetail.result_estimated_maintainance_savings);
                this.result_trees_saved = this.quoteDetail.result_trees_saved;
                this.result_miles_passenger_car = this.quoteDetail.result_miles_passenger_car;
                this.result_carbon_footprint_reduction = this.quoteDetail.result_carbon_footprint_reduction;
                this.result_energy_saved = this.quoteDetail.result_energy_saved;

                this.equipmentWorth = this.commonService.formatAmount(this.quoteDetail.result_plb_savings);
                this.buyPrice = this.commonService.formatAmount(this.quoteDetail.result_buy_price);

                // console.log(this.quoteDetail.result_hardware_valuation_chart);

                /* Chart starts here */
                this.updateFromInput = true;
                this.cOptions = {

                    chart: {
                        type: 'scatter',
                        width: 550,
                        marginBottom: 50,
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

                        data: JSON.parse(this.quoteDetail.result_hardware_valuation_chart)

                    }]
                };

                Highcharts.setOptions(this.cOptions);

                /* Chart ends here */

                // this.quotesDetails = JSON.parse(localStorage.getItem("quote_detail"));
                // this.resultMaintenanceSavings = JSON.parse(localStorage.getItem("quote_final_result"));
                // this.countriesName = JSON.parse(localStorage.getItem("countries"));
                // this.result_trees_saved=  this.resultMaintenanceSavings["result_trees_saved"];
                // this.result_miles_passenger_car=  this.resultMaintenanceSavings["result_miles_passenger_car"];
                // this.result_carbon_footprint_reduction=  this.resultMaintenanceSavings["result_carbon_footprint_reduction"];
                // this.result_energy_saved=  this.resultMaintenanceSavings["result_energy_saved"];
                // // this.datacenters = this.quotesDetails.datacenters;
                // this.resultMaintenanceSavings = JSON.parse(localStorage.getItem("quote_final_result"));
                // this.hardwareMaintenanceSavings = this.commonService.formatAmount (this.resultMaintenanceSavings.result_maintenance_savings);
                // this.PlbSavings = this.commonService.formatAmount(this.resultMaintenanceSavings.result_plb_savings);
                // this.CarbonFootprintReduction = this.commonService.formatAmount(this.resultMaintenanceSavings.result_carbon_footprint_reduction);
                // this.EquipmentWorth = this.commonService.formatAmount(this.resultMaintenanceSavings.result_buy_price);
                // this.equipmentWorth = this.commonService.formatAmount(this.resultMaintenanceSavings.result_plb_savings);
                // this.buyPrice = this.commonService.formatAmount(this.resultMaintenanceSavings.result_buy_price);
                // this.result_relu_rent = this.resultMaintenanceSavings.result_relu_rent;
                // this.customerPaysRelutech =  this.commonService.formatAmount((this.result_relu_rent * this.quotesDetails.migration_months).toFixed(2).toString());
                // this.total3 = (parseInt(this.resultMaintenanceSavings.result_buy_price) - (this.result_relu_rent * this.quotesDetails.migration_months));
                // this.diffTotal3 =  this.commonService.formatAmount(parseFloat(this.total3).toFixed(2));
                // this.result_relu_rent_display = this.commonService.formatAmount(this.result_relu_rent);
                // this.oemMaintainance = this.commonService.formatAmount(this.resultMaintenanceSavings.result_oem_maintainance);
                // this.rlMaintainance = this.commonService.formatAmount(this.resultMaintenanceSavings.result_relutech_maintainance);
                // this.estimatedMaintainanceSavings = this.commonService.formatAmount(this.resultMaintenanceSavings.result_estimated_maintainance_savings);



                $("#company_id").val(this.quoteDetail.company_name);
                $("#sales_agent_id").val(this.quoteDetail.sales_agent_name);

                localStorage.setItem("quote_detail", JSON.stringify(this.quoteDetail));
                localStorage.setItem("quote_final_result", JSON.stringify(this.quoteDetail));
                this.equipments = this.quoteDetail["datacenters"];
                let dcCounter = 1;
                this.datacenters = [];
                this.dc_orders = [];




                for (let i = 0; i < this.equipments.length; i++) {
                    if (this.dc_orders.indexOf(this.equipments[i]["dc_order"]) == -1) {
                        this.dc_orders.push(this.equipments[i]["dc_order"]);
                        this.countries.push(this.equipments[i]["country_id"]);
                        let tempDC: DataCenter = new DataCenter((dcCounter++).toString());
                        tempDC.country_id = this.equipments[i]["country_id"];
                        tempDC.country_name = this.equipments[i]["country_name"];
                        tempDC.pue = this.equipments[i]["pue"];
                        tempDC.per_energy_usage = this.equipments[i]["per_energy_usage"];
                        tempDC.dc_order = this.equipments[i]["dc_order"];
                        this.datacenters.push(tempDC);
                    }
                }



                setTimeout(() => {
                    var i = 1;
                    var optionHtml = "";
                    this.datacenters.forEach(dc => {
                        optionHtml += "<label class='col-md-3 mt-3'>Data Center " + i + "</label>" +
                            "<select name='country_" + i.toString() + "'class='custom-dropdown dc-country-name form-control col-md-3 mt-3' id='country_" + i.toString() + "'>" + this.countriesOption + "</select>" +
                            "<input name='power_effective_" + i + "'type='number'  id='power_effective_"+ i.toString() + "' class='power-effective form-control col-md-2 mt-3 ml-3 mr-3' min='1' max='3' value='"+ dc.pue +"'>" +
                            "<input name='energy_from_renewables_" + i + "'type='number' id='energy_from_renewables_"+ i.toString() +"' class='col-md-2 mt-3 energy-from-renewables form-control' min='0' max='100' value='" + dc.per_energy_usage + "'>";
                        i++;
                    });
                    $("#datacenter").html(optionHtml);

                }, 1000);

                setTimeout(() => {

                    this.datacenters.forEach(dc => {
                        var eleTableBody = $("#table-body-" + dc.srno);

                        (<HTMLInputElement>document.getElementById("country_" + dc.srno)).value = dc.country_id;
                        // (<HTMLInputElement>document.getElementById("country_" + dc.srno)).disabled = true;

                        $(eleTableBody).find("tr").each(function () {
                            $(this).remove();
                        });

                        var trSrNo = 1;
                        this.equipments.forEach(equipment => {
                            if (equipment["country_id"] == dc.country_id && equipment["dc_order"] == dc.dc_order) {
                                if (eleTableBody !== undefined) {
                                    $(eleTableBody).append("<tr class='table-row-" + (trSrNo++) + "'>" + (new_row_html.replace("##COUNTRY_ID##", dc.country_id.toString()).replace("##OEM_OPTION_HTML##", oem_html)) + "</tr>");
                                }
                            }
                        });
                    });

                }, 1500);

                setTimeout(() => {
                    this.datacenters.forEach(dc => {
                        var eleTableBody = $("#table-body-" + dc.srno);


                        var trSrNo = 1;
                        this.equipments.forEach(equipment => {
                            if (equipment["country_id"] == dc.country_id && equipment["dc_order"] == dc.dc_order) {

                                var eleTr = $(eleTableBody).find("tr.table-row-" + trSrNo.toString());
                                trSrNo++;

                                if (eleTableBody !== undefined && eleTr !== undefined) {

                                    $(eleTr).find("input.hdn-country-id").val(equipment["country_id"]);
                                    $(eleTr).find("input.hdn-pue").val(equipment["pue"]);
                                    $(eleTr).find("input.hdn-per-energy-usage").val(equipment["per_energy_usage"]);

                                    $(eleTr).find("select.drp-oem option[value='" + equipment["oem"] + "']").attr("selected", "selected");

                                    let product_line_html = "";
                                    for (i = 0; i < (equipment["product_line_array"]).length; i++) {
                                        product_line_html += '<option value="' + equipment["product_line_array"][i].id + '">' + equipment["product_line_array"][i].name + '</option>';
                                    }

                                    $(eleTr).find("select.drp-productline").first().html(product_line_html);

                                    let type_html = "";
                                    for (i = 0; i < (equipment["type_array"]).length; i++) {
                                        type_html += '<option value="' + equipment["type_array"][i].id + '">' + equipment["type_array"][i].name + '</option>';
                                    }
                                    $(eleTr).find("select.drp-type").first().html(type_html);

                                    // $(eleTr).find("select.drp-productline").first().find("option:first-child").text(equipment["product_line_name"]);
                                    // $(eleTr).find("select.drp-productline").first().find("option:first-child").val(equipment["product_line"]);

                                    // $(eleTr).find("select.drp-type").first().find("option:first-child").text(equipment["type_name"]);
                                    // $(eleTr).find("select.drp-type").first().find("option:first-child").val(equipment["type"]);

                                    $(eleTr).find("input.year_0_1").val(equipment["year_0_1"]);
                                    $(eleTr).find("input.year_1_2").val(equipment["year_1_2"]);
                                    $(eleTr).find("input.year_2_3").val(equipment["year_2_3"]);
                                    $(eleTr).find("input.year_3_4").val(equipment["year_3_4"]);
                                    $(eleTr).find("input.year_4_5").val(equipment["year_4_5"]);
                                    $(eleTr).find("input.over_5_years").val(equipment["over_5_years"]);

                                    $(eleTr).find("input.over_5_years").change();

                                }
                            }
                        });
                    });


                }, 2000);

                let dcHtml = "";
                for (var i = this.datacenters.length; i < 100; i++) {
                    dcHtml += "<option value='" + i + "'>" + i + "</option>";
                }


                $("#txt_no_of_datacenter").html(dcHtml);
                if (!$("body").hasClass("sidebar-collapse"))
                    $("body").addClass("sidebar-collapse");


            });

        this.http.post(CommonService.api_url + '/get-countries',
            { oauth_key: CommonService.oauth_key })
            .subscribe(responceData => {
                this.allCountries = responceData["data"]["ArrCountries"];

                this.countriesOption = "";
                for (var i = 0; i < this.allCountries.length; i++)
                    this.countriesOption += "<option value='" + this.allCountries[i]["id"] + "'>" + this.allCountries[i]["name"] + "</option>";
            });

        var data = { oauth_key: CommonService.oauth_key };
        $.ajax({
            type: "POST",
            url: CommonService.api_url + "/get-oem",

            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
                var oemData = data["data"]["ArrOEM"];
                this.oemOptionsHtml = "";

                for (var i = 0; i < oemData.length; i++) {
                    this.oemOptionsHtml += "<option value='" + oemData[i]["id"] + "'>" + oemData[i]["name"] + "</option>";
                }
                var oemoptions = this.oemOptionsHtml;
                oem_html = this.oemOptionsHtml;
                $(".drp-oem").each(function () {
                    $(this).html(oemoptions);
                });
            },
            error: function (jqXHR, status) {

            }
        });

        var counterPrevent = 0;
        var new_row_html = "<td><input type='hidden' class='hdn-country-id' value='##COUNTRY_ID##'><input type='hidden' class='hdn-pue' value='##PUE##'><input type='hidden' class='hdn-per-energy-usage' value='##PER_ENERGY_USAGE##'><select class='custom-dropdown drp-oem form-control'>##OEM_OPTION_HTML##</select></td><td><select class='custom-dropdown drp-productline form-control'><option value='1' >Generic</option></select></td><td><select class='custom-dropdown drp-type form-control'><option value='1'>Generic</option></select></td><td><input name='0-1yr0' type='number' min='0' class='form-control year_0_1 equipment_number'></td><td ><input name='1-2yr0' type='number' min='0' class='form-control year_1_2 equipment_number'></td><td ><input name='2-3yr0' type='number' min='0' class='form-control year_2_3 equipment_number'></td><td ><input name='3-4yr0' type='number' min='0' class='form-control year_3_4 equipment_number'></td><td ><input name='4-5yr0' type='number' min='0' class='form-control year_4_5 equipment_number'></td><td><input name='over5yr0' type='number' min='0' class='form-control over_5_years equipment_number'></td><td ><input type='number' readonly='' class='form-control total-servers'></td><td ><input type='button' value='Delete' class='delete-row btn-calculate btn'></td>";
        var oem_html;
        $(document).on("click", "input.add-row", function () {
            if (counterPrevent == 0) {

                var srno = parseInt($(this).attr("id").substring($(this).attr("id").lastIndexOf("-") + 1));
                var tblBodyId = "#table-body-" + srno;

                var lastTrClass = $(tblBodyId + " tr").last().attr("class");
                var country_id = "224";
                var pue = "0";
                var per_energy_usage = "0";
                var lastTrSrNo = 1;
                if (lastTrClass !== undefined && lastTrClass != null) {
                    lastTrSrNo = parseInt(lastTrClass.substring(lastTrClass.lastIndexOf("-") + 1)) + 1;
                    country_id = $(tblBodyId).find("input.hdn-country-id").first().val().toString();
                    pue = $(tblBodyId).find("input.hdn-pue").first().val().toString();
                    per_energy_usage = $(tblBodyId).find("input.hdn-per-energy-usage").first().val().toString();
                }
                else {
                    var selectCountryName = "country_" + srno;
                    country_id = $('select[name="' + selectCountryName + '"]').val().toString();
                    pue = $("#power_effective_" + srno).val().toString();
                    per_energy_usage = $("#energy_from_renewables_" + srno).val().toString();
                }

                var tmepHtml = new_row_html.replace("##COUNTRY_ID##", country_id.toString()).replace("##OEM_OPTION_HTML##", oem_html).replace("##PUE##", pue).replace("##PER_ENERGY_USAGE##", per_energy_usage);

                $(tblBodyId).append("<tr class='table-row-" + lastTrSrNo + "'>" + tmepHtml + "</tr>");

                counterPrevent++;

                setTimeout(() => {
                    counterPrevent = 0;
                }, 1000);
            }
        });

        $(document).on("click", ".delete-row", function () {
            this.errorMessage = "";
            $("#editquote_failed_msg").hide();

            if ($(this).parent().parent().parent().children().length == 1) {
                $("#editquote_failed_msg").show();
                $("#editquote_failed_msg").html("At least one entry is required for each data center");
                window.scrollTo(0, 0);
            }
            else {
                $(this).parent().parent().remove();
            }
        });

        $(document).on("change", "input.equipment_number", function () {
            var total = 0;
            var eleTotal = $(this).parent().parent().find("input.total-servers").first();
            try {
                $(this).parent().parent().find("input.equipment_number").each(function () {
                    if (parseInt($(this).val().toString()) > 0) {
                        total += parseInt($(this).val().toString());
                    }
                    else if ($(this).val().toString() != "") {
                        $(this).val("0");
                    }
                });


            }
            catch (exc) {
                total = 0;
            }

            if (eleTotal != null && eleTotal != undefined) {
                $(eleTotal).val(total);
            }
        });

        $(document).on("change", ".drp-oem", function (a, b) {
            var data = {
                oauth_key: CommonService.oauth_key,
                oem_id: $(this).find(":selected").val()
            };
            var productLineElement = $(this).parent().parent().children().find("select.drp-productline").first();


            $.ajax({
                type: "POST",
                url: CommonService.api_url + "/get-oem-product-line",

                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                success: function (data, status, jqXHR) {
                    var productLineData = data["data"]["ArrOEMProductLine"];
                    var productLineOptions = "";
                    for (var i = 0; i < productLineData.length; i++) {
                        productLineOptions += "<option value='" + productLineData[i]["id"] + "'>" + productLineData[i]["name"] + "</option>";
                    }

                    $(productLineElement).html(productLineOptions);
                    $(productLineElement).trigger("change");

                },
                error: function (jqXHR, status) {

                }
            });
        });

        $(document).on("change", ".drp-productline", function (a, b) {

            var data = {
                oauth_key: CommonService.oauth_key,
                product_line_id: $(this).find(":selected").val(),
                oem_id: $(this).parent().parent().find("select.drp-oem").first().find(":selected").val()
            };
            var typeElement = $(this).parent().parent().children().find("select.drp-type").first();


            $.ajax({
                type: "POST",
                url: CommonService.api_url + "/get-product-line-type",

                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                dataType: "json",
                success: function (data, status, jqXHR) {
                    var typeData = data["data"]["ArrOEMProductLineType"];
                    var typeOptions = "";
                    for (var i = 0; i < typeData.length; i++) {
                        typeOptions += "<option value='" + typeData[i]["id"] + "'>" + typeData[i]["name"] + "</option>";
                    }

                    $(typeElement).html(typeOptions);
                },
                error: function (jqXHR, status) {

                }
            });
        });

        $(document).on("change", "select.dc-country-name", function (a, b) {

            var selectedCountry = $(this).val();

            var srNo = $(this).attr("name").substring($(this).attr("name").lastIndexOf("_") + 1);

            $("#table-body-" + srNo).find("input.hdn-country-id").each(function () {
                $(this).val(selectedCountry);
            });
        });
        $(document).on("change", "input.power-effective", function(a, b){
            var selectedpue = $(this).val();

            var srNo = $(this).attr("name").substring($(this).attr("name").lastIndexOf("_") + 1);

            $("#table-body-" + srNo).find("input.hdn-pue").each(function(){
                $(this).val(selectedpue);
            });
        });
        $(document).on("change", "input.energy-from-renewables", function(a, b){
            var selectedperenergy = $(this).val();

            var srNo = $(this).attr("name").substring($(this).attr("name").lastIndexOf("_") + 1);

            $("#table-body-" + srNo).find("input.hdn-per-energy-usage").each(function(){
                $(this).val(selectedperenergy);
            });
        });
        this.http.post(CommonService.api_url + '/audit-list', { quote_id: this.quotes_id, oauth_key: CommonService.oauth_key }).subscribe(responseData => {
            // console.log(responseData);
            if (responseData["is_successful"] == "1") {
                this.auditDetails = responseData["data"];
                // console.log(typeof(this.auditDetailArray));
                this[0] = [];
                // this.auditDetailArray = auditDetails[0];
                // this.auditDetailData = this.auditDetailArray ; 


            }
            else {

            }
        });
        $(document).on("keypress", ".equipment_number", function (e) {
            if (e.which < 48 || e.which > 57 || $(e.target).val().toString().length > 4)
                return false;
        });
        $("#migration_scheduled").keypress(function (e) {
            if (e.which < 48 || e.which > 57 || $("#migration_scheduled").val().toString().length > 1)
                return false;
        });
        // $("#power_effective").keypress(function (e) {
        //     if ($("#power_effective").val().toString().length > 3)
        //         return false;
        // });
        // $("#energy_from_renewables").keypress(function (e) {
        //     if ($("#energy_from_renewables").val().toString().length > 4)
        //         return false;
        // });
        setTimeout(() => {
            $(".wrapper-loader").hide();
        }, 3000);

        $(".final-result-1").hide();
        $(".final-result-2").hide();
        $(".final-result-3").hide();
        $(".final-result-4").hide();

        $(".final-result-icon-1").click(function () {

            $(".final-result-1").show();
            $(".final-result-2").hide();
            $(".final-result-3").hide();
            $(".final-result-4").hide();

            $(".final-result-icon-1").addClass("selected");
            $(".final-result-icon-2").removeClass("selected");
            $(".final-result-icon-3").removeClass("selected");
            $(".final-result-icon-4").removeClass("selected");

            $("#image1-model-e").attr("src", "assets/image/maintenance-hover.png");
            $("#image2-model-e").attr("src", "assets/image/dollar.png");
            $("#image3-model-e").attr("src", "assets/image/right-cloud.png");

            return false;
        });

        $(".final-result-icon-2").click(function () {
            $(".final-result-1").hide();
            $(".final-result-2").show();
            $(".final-result-3").hide();
            $(".final-result-4").hide();

            $(".final-result-icon-1").removeClass("selected");
            $(".final-result-icon-2").addClass("selected");
            $(".final-result-icon-3").removeClass("selected");
            $(".final-result-icon-4").removeClass("selected");

            $("#image2-model-e").attr("src", "assets/image/dollar-hover.png");
            $("#image1-model-e").attr("src", "assets/image/maintenance.png");
            $("#image3-model-e").attr("src", "assets/image/right-cloud.png");

            return false;
        });

        $(".final-result-icon-3").click(function () {
            $(".final-result-1").hide();
            $(".final-result-2").hide();
            $(".final-result-3").show();
            $(".final-result-4").hide();

            $(".final-result-icon-1").removeClass("selected");
            $(".final-result-icon-2").removeClass("selected");
            $(".final-result-icon-3").addClass("selected");
            $(".final-result-icon-4").removeClass("selected");

            $("#image1-model-e").attr("src", "assets/image/maintenance.png");
            $("#image2-model-e").attr("src", "assets/image/dollar.png");
            $("#image3-model-e").attr("src", "assets/image/right-cloud-hover.png");

            return false;
        });

        $(".final-result-icon-4").click(function () {
            $(".final-result-1").hide();
            $(".final-result-2").hide();
            $(".final-result-3").hide();
            $(".final-result-4").show();

            $(".final-result-icon-1").removeClass("selected");
            $(".final-result-icon-2").removeClass("selected");
            $(".final-result-icon-3").removeClass("selected");
            $(".final-result-icon-4").addClass("selected");

            $("#image1-model-e").attr("src", "assets/image/maintenance.png");
            $("#image2-model-e").attr("src", "assets/image/dollar.png");
            $("#image3-model-e").attr("src", "assets/image/right-cloud.png");

            return false;
        });

    }

    constructor(private router: Router, private http: HttpClient, private commonService: CommonService) { }

    nevigateToDashboard = function () {
        this.router.navigate(['/dashboard']);
    };

    getAllEquipmentDetails = function () {
        let equipmentData: DataCenter[] = [];
        let tempDC: DataCenter;
        try {
            for (var i = 0; i < this.datacenters.length; i++) {
                var eleTableBody = $("#table-body-" + (i + 1));
                var dc_order = (i + 1);

                if (!this.validateEquipmentInput(eleTableBody)) {
                    return null;
                }

                if (eleTableBody != undefined) {
                    $(eleTableBody).find("tr").each(function (a, b) {
                        tempDC = new DataCenter();

                        tempDC.country_id = $(this).find("input.hdn-country-id").val().toString();
                        tempDC.pue = $(this).find("input.hdn-pue").val().toString();
                        tempDC.per_energy_usage = $(this).find("input.hdn-per-energy-usage").val().toString();
                        tempDC.oem = $(this).find("select.drp-oem").first().find(":selected").val().toString();
                        tempDC.product_line = $(this).find("select.drp-productline").first().find(":selected").val().toString();
                        tempDC.type = $(this).find("select.drp-type").first().find(":selected").val().toString();
                        tempDC.dc_order = dc_order;
                        tempDC.oem_name = $(this).find("select.drp-oem").first().find(":selected").text().toString();
                        tempDC.product_line_name = $(this).find("select.drp-productline").first().find(":selected").text().toString();
                        tempDC.type_name = $(this).find("select.drp-type").first().find(":selected").text().toString();

                        tempDC.year_0_1 = $(this).find("input.year_0_1").val().toString();
                        tempDC.year_1_2 = $(this).find("input.year_1_2").val().toString();
                        tempDC.year_2_3 = $(this).find("input.year_2_3").val().toString();
                        tempDC.year_3_4 = $(this).find("input.year_3_4").val().toString();
                        tempDC.year_4_5 = $(this).find("input.year_4_5").val().toString();
                        tempDC.over_5_years = $(this).find("input.over_5_years").val().toString();


                        equipmentData.push(tempDC);
                    });
                }
                else {
                    return null;
                }
            }
        }
        catch (exc) {
            return null;
        }
        return equipmentData;
    }

    fillOEMDropdown = function (http: HttpClient) {
        http.post<any>(CommonService.api_url + '/get-oem',
            { oauth_key: CommonService.oauth_key })
            .subscribe(data => {
                if (data["is_successful"] == "1") {
                    this.oemServers0 = data["data"]["ArrOEM"];

                }
            });
    }


    moveNext = function () {
        this.internalCalculation(true, false);
    };

    calculate = function () {
        this.internalCalculation(false, false);
    };
    newQuotePopupSave = function () {
        this.internalCalculation(true, true);

    }
    goToQuoteList = function () {
        // this.router.navigate(['/quote-list']);
        //localStorage.setItem("is_refresh" , "1");
        this.router.navigate(['/quote-list']);
    }

    internalCalculation = function (is_redirect: boolean, is_save_as_new_quote: boolean) {
        $("#editquote_failed_msg").hide();

        let equipmentDetails = this.getAllEquipmentDetails();

        if (equipmentDetails != null) {
            let quoteDetails = JSON.parse(localStorage.getItem('quote_detail'));

            if (equipmentDetails.length > 0) {

                quoteDetails.datacenters = equipmentDetails;
                quoteDetails.sales_rep_notes = $("#salesrep_remarks").val();
                quoteDetails.additional_notes = $("#additional_remarks").val();
                quoteDetails.oauth_key = CommonService.oauth_key;
                quoteDetails.no_of_server = $("#txt_no_of_datacenter").find(":selected").text();
                quoteDetails.physical_servers = $("#txt_no_of_server").val();
                quoteDetails.status = $("#txt_quotes_status").find(":selected").text();
                quoteDetails.additional_notes = $("#customer_remark").val();
                quoteDetails.sales_rep_notes = $("#sales_agent_remark").val();
                quoteDetails.admin_notes = $("#admin_remark").val();
                quoteDetails.is_active = $('input[id="radio_is_active"]:checked').val();
                let login_user = JSON.parse(localStorage.getItem("login_user_details"));
                quoteDetails.migration_months = this.migrationMonths;
                quoteDetails.pue = this.powerUsageEffectiveness;
                quoteDetails.per_energy_usage = this.energyfromRenewables;
                quoteDetails.quote_name = this.quote_name;
                quoteDetails.audit_user_id = login_user.data.user_id;


                localStorage.setItem("quote_detail", JSON.stringify(quoteDetails));

                try {
                    if (!this.validateForm()) {
                        return;
                    }
                    else {
                        if (is_save_as_new_quote == false) {
                            this.http.post(CommonService.api_url + '/quote-update', quoteDetails)
                                .subscribe(data => {
                                    // console.log(data);
                                    if (data["is_successful"] == "1") {

                                        localStorage.setItem("quote_final_result", JSON.stringify(data["data"]["ArrQuoteData"]));
                                        if (is_redirect) {
                                            //localStorage.setItem("is_refresh","1");

                                            this.router.navigate(['/quote-list']);
                                        }
                                        else {
                                            location.reload();
                                        }
                                    }
                                    else {
                                        $("#editquote_failed_msg").show();
                                        $("#editquote_failed_msg").html("Please make sure that you have entered all the data. Please delete all unnecessary entries");
                                        window.scrollTo(0, 0);

                                    }
                                });
                        }
                        else {

                            if (!this.validNewQuoteName()) {
                                return;
                            }
                            else {
                                quoteDetails.quote_name = $('#new-quote-name').val();
                                this.http.post(CommonService.api_url + '/quote-save', quoteDetails)
                                    .subscribe(data => {
                                        // console.log(data);

                                        if (data["is_successful"] == "1") {
                                            var new_quote_id = data["data"]["ArrQuoteData"]["quote_id"];
                                            localStorage.setItem("quote_id", JSON.stringify(new_quote_id));
                                            location.reload();


                                        }
                                        else {
                                            $("#editquote_failed_msg").show();
                                            $("#editquote_failed_msg").html("Please make sure that you have entered all the data. Please delete all unnecessary entries");
                                            window.scrollTo(0, 0);

                                        }
                                    });
                            }

                        }
                    }
                }
                catch (exec) {
                    $("#editquote_failed_msg").show();
                    $("#editquote_failed_msg").html("Please make sure that you have entered all the data. Please delete all unnecessary entries.");
                    window.scrollTo(0, 0);
                }
            }
            else {
                $("#editquote_failed_msg").show();
                $("#editquote_failed_msg").html("Please enter data in at least one data center");
                window.scrollTo(0, 0);
            }
        }
        else {
            $("#editquote_failed_msg").show();
            $("#editquote_failed_msg").html("Please make sure that you have entered all the data. Please delete all unnecessary entries.");
            window.scrollTo(0, 0);
        }
    }

    validateEquipmentInput = function (eleTableBody) {
        let isValid = true;

        $(eleTableBody).each(function (a, b) {

            if ($(eleTableBody).find("select.drp-oem").first().find(":selected").val() < 0)
                isValid = false;

            if ($(eleTableBody).find("select.drp-productline").first().find(":selected").val() < 0)
                isValid = false;

            if ($(eleTableBody).find("select.drp-type").first().find(":selected").val() < 0)
                isValid = false;
        });

        return isValid;
    }

    addDataCenters = function () {
        $("#editquote_failed_msg").html("");
        $("#editquote_failed_msg").hide();

        var no_of_servers = parseInt($("#txt_no_of_datacenter").find(":selected").val().toString());

        if (no_of_servers > this.datacenters.length) {
            var dataCenterHtml = "";

            for (var i = (this.datacenters.length + 1); i <= no_of_servers; i++) {
                this.pue = '1.67';
                this.per_energy_usage ='12.0';
                dataCenterHtml += "<label class = 'col-md-3 mt-3'>Data Center " + i + "</label>" +
                    "<select name='country_" + i + "'class='custom-dropdown dc-country-name form-control col-md-3 mt-3'>" + this.countriesOption + "</select><br/>" +
                    "<input name='power_effective_" + i + "'type='number'  id='power_effective_"+ i.toString() + "' class='power-effective form-control col-md-2 mt-3 ml-3 mr-3' min='1' max='3' value='"+ this.pue +"'>" +
                    "<input name='energy_from_renewables_" + i + "'type='number' id='energy_from_renewables_"+ i.toString() +"' class='col-md-2 mt-3 energy-from-renewables form-control' min='0' max='100' value='" + this.per_energy_usage + "'>";

                this.datacenters.push(new DataCenter(i));
            }
            $("#datacenter").append(dataCenterHtml);


        }
        else if (no_of_servers < this.datacenters.length) {
            $("#editquote_failed_msg").show();
            $("#editquote_failed_msg").html("Data centers cannot be decreased. If you have updated number of data centers accidently, please refresh page to reset number of data centers.");
        }
    }

    showClientEmailBox = function () {
        $("#email_form").show();
    }

    sendEmailToClient = function () {


        if ($("#txtEmail").val() != "" && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($("#txtEmail").val().toString()))) {
            $("#success_email_msg").show();
            $("#success_email_msg").removeClass("bg-fail").addClass("bg-success")
            $("#success_email_msg").html("Email has been sent successfully");
        }
        else {
            $("#success_email_msg").show();
            $("#success_email_msg").removeClass("bg-success").addClass("bg-fail")
            $("#success_email_msg").html("Please enter valid email");
        }
    }
    validNewQuoteName = function () {
        this.errormessage == "";
        let newQuoteName = $("#new-quote-name").val();
        if (newQuoteName == '' || newQuoteName == null) {
            this.errormessage = "Please enter Quote Name";

        }
        if (this.errormessage !== "") {
            $("#failed_new_quote_name").show();
            // console.log(this.errormessage);
            $("#failed_new_quote_name").html(this.errormessage);
            return false;
        }
        else {

            return true;
        }
    }
    GeneratePdf = function () {
        $("#btnExportPdf").text("Generating...");
        $("#btnExportPdf").attr("disabled");
        $("#btnExportPdf").css("opacity", "0.7");
        this.quotes_id = localStorage.getItem("quote_id");
        this.http.post(CommonService.api_url + '/export-to-pdf', { "oauth_key": CommonService.oauth_key, "quote_id": this.quotes_id })
            .subscribe(data => {

                if (data["is_successful"] == "1") {
                    // console.log(data["data"]["pdf_url"]);
                    window.open(data["data"]["pdf_url"], "_blank");
                    // $("#temp_pdf_url").attr("href", data["data"]["pdf_url"]);
                    // $("#temp_pdf_url").click();
                }
                else {
                    // $("#editquote_failed_msg").show();
                    // $("#editquote_failed_msg").html("Please make sure that you have entered all the data. Please delete all unnecessary entries");
                    // window.scrollTo(0, 0);

                }

                $("#btnExportPdf").text("Export as PDF");
                $("#btnExportPdf").removeAttr("disabled");
                $("#btnExportPdf").css("opacity", "1");
            });
    }

    validateForm = function () {
        this.errorMessage = '';

        /*var power_effective = $(".power-effective").val();
        var energy_from_renewables = $(".energy-from-renewables").val();
        */
        var temp_error_msg = "";
        $('#editquote_failed_msg').hide();
        $('#editquote_failed_msg').html("");

        $(".power-effective").each(function () {
            if ($(this).val() == "") {
                temp_error_msg += "Please enter Power Usage Effectiveness <br/>"
            }

            if ($.isNumeric($(this).val()) == true) {
                if ($(this).val() < 1 || $(this).val() > 3) {
                    temp_error_msg = "Power Usage Effectiveness value should be between 1 and 3<br/>"
                }
            }

            if (temp_error_msg != "") {
                $('#editquote_failed_msg').show();
                $('#editquote_failed_msg').html(temp_error_msg);
                window.scrollTo(0, 0);
                return false;
            }
        });

        if(temp_error_msg != "") {
            return false;
        }

        $(".energy-from-renewables").each(function () {
            if ($(this).val() == "") {
                temp_error_msg += "Please enter % of Energy from Renewables<br/>"
            }

            if ($.isNumeric($(this).val()) == true) {
                if($(this).val() < 0  || $(this).val() > 100){
                    temp_error_msg = "% of Energy from Renewables value should be between 0 and 100<br/>"
                }
            }

            if (temp_error_msg != "") {
                $('#editquote_failed_msg').show();
                $('#editquote_failed_msg').html(temp_error_msg);
                window.scrollTo(0, 0);
                return false;
            }
        });

        if(temp_error_msg != "") {
            return false;
        }

        var migration_scheduled = $('#migration_scheduled').val();
        if (migration_scheduled === '' || migration_scheduled === null) {
            this.errorMessage = "Please enter Length of Migration <br/>";

        }
        /*if (power_effective == "") {
            this.errorMessage += "Please enter Power Usage Effectiveness <br/>"
        }
        if (energy_from_renewables == "" || energy_from_renewables == undefined) {
            this.errorMessage += "Please enter % of Energy from Renewables <br/>"
        }
        if ($.isNumeric(power_effective) == true) {
            if (power_effective < 1 || power_effective > 3) {

                this.errorMessage += "Power Usage Effectiveness value should be between 1 and 3<br/>"
            }
            if (energy_from_renewables < 0 || energy_from_renewables > 100) {

                this.errorMessage += "% of Energy from Renewables value should be between 0 and 100"
            }
        }
        */

        if (this.errorMessage != '') {
            $('#editquote_failed_msg').show();
            $('#editquote_failed_msg').html(this.errorMessage);
            window.scrollTo(0, 0);

            return false;
        }
        else {
            return true;
        }
    }

    new_quote_popup_event = function () {
        if (!this.validateForm()) {
            return;
        }
        else {
            this.new_quote_popup = true;
        }

    }


    highcharts = Highcharts;
}
