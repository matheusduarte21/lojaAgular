import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { Router } from '@angular/router';
import { SingUp } from 'src/app/data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  showLogin: boolean = false;

  constructor(
    private seller: SellerService
  ){}

  ngOnInit(): void{
    this.seller.reloadSeller()
  }

  signUp(data: SingUp): void {
    this.seller.userSignUp(data)
  }

  login(data: SingUp): void {
    this.seller.userLogin(data)
   console.warn(data)

  }

  openLogin(){
    this.showLogin = true
  }

  openSignUp(){
    this.showLogin = false
  }

}
