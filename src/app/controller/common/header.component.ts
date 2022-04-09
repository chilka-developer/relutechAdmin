import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: '../../view/common/header.component.html',
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {

    $("#lnk_toggle_admin_profile").click(function(){
      $("#admin_profile_top").slideToggle(300);
    });

    $("#hamburger-sidebar-toggle").click(function(){
      if($( window ).width() < 768) {
        $("body").toggleClass("sidebar-open");
      }
      else {
        $("body").toggleClass("sidebar-collapse");
      }
      
    });
  }
  
  constructor(private  router :Router) { }

  navigateToChangePass = function(){
    $("#admin_profile_top").hide();
    this.router.navigateByUrl('/change-password');
    
  }
  navigateToSignIn = function(){
    this.router.navigateByUrl('/sign-in');
    localStorage.clear();

  }
}
