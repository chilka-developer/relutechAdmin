import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-oem-list',
  templateUrl: '../view/oem-list.component.html',
  styleUrls: ['../../assets/css/common-list.component.css']
})

export class OemListComponent implements OnInit {

  datatable: any;

  ngOnInit() {
    this.commonService.IsUserLogIn();
    CommonService.ActiveClass("nav-oem");
    let tblElement: any = $('#empTable');
    this.datatable = tblElement.DataTable({
      'ajax': {
          'url': CommonService.api_url+"/oem-list",
          'type': "POST",
      },
      'columns': [
          { data: 'oem_id'},
          { data: 'oem' },
          { data: 'is_active' }
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
            localStorage.setItem("oem_id" , data["oem_id"]);
            window.location.href ='#/oem-edit';
           
           
          // }
          
      } );
    });
     
  }
 
  constructor(private http: HttpClient , private router:Router , private commonService : CommonService) { };

  navigateToEquipmentMappingAdd = function () {
    this.router.navigateByUrl('/oem-add');
  };

}
