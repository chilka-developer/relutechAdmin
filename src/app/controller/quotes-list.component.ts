import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-quotes-list',
  templateUrl: '../view/quotes-list.component.html',
  // styleUrls: ['./quotes-list.component.css']
})
export class QuotesListComponent implements OnInit {

  datatable: any;

  ngOnInit() {
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-quote");
    let tblElement: any = $('#empTable');
    // let is_refresh = localStorage.getItem("is_refresh");
    // if(is_refresh == "1"){
    //   localStorage.setItem("is_refresh" ,"0");
    //   location.reload();
    // }
    this.datatable = tblElement.DataTable({
      'ajax': {
          'url': CommonService.api_url+"/quote-list",
          'type': "POST",
      },
      'columns': [
          { data: 'quote_id'},
          { data: 'sales_agent_name' },
          { data: 'company_name' },
          { data: 'created_datetime' },
          { data: 'status' }
      ],
      'processing': 'true',
      'serverSide': 'true',
      'serverMethod': 'post',
      "iDisplayLength": 10,
      "bPaginate": true,
    //  "dom": 'rtip', // the "r" is for the "processing" message
      "language": {
        "processing": "<span class=''><img src='assets/image/loader.gif' /></span>"
      },
      "order": [[ 0, 'desc' ]]
    });

    $(document).ready(function() {
      var table = $('#empTable').DataTable();
       
      $('#empTable tbody').on('click', 'tr', function () {
          var data = table.row( this ).data();

          // if(data["oem_mapping_id"] == undefined && data["oem_mapping_id"] == ""){
          //   //show error ;
          // }
          // else{
            localStorage.setItem("quote_id" , data["quote_id"]);
            localStorage.setItem("is_refresh" , "1");
            window.location.href ='#/quote-edit';
           
           
          // }
          
      } );
    });
     
  }
 
  constructor(private http: HttpClient , private router:Router , private commonService : CommonService) { };

  navigateToEquipmentMappingAdd = function () {
    this.router.navigateByUrl('/oem-add');
  };


}
