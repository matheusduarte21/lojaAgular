import { Component, OnInit } from '@angular/core';
import { SellerService } from 'src/app/services/seller.service';
import { Router } from '@angular/router';
import { SingUp, login } from 'src/app/data-types';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  showLogin: boolean = false;
  authError: string = ''

  constructor(
    private seller: SellerService
  ){}

  ngOnInit(): void{
    this.seller.reloadSeller()
  }

  signUp(data: SingUp): void {
    this.seller.userSignUp(data)
  }

  login(data: login): void {
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((error)=>{
      if(error){
        this.authError = "EMAIL OU SENHA NÃO CORREPONSE"
      }
    })
  }

  openLogin(){
    this.showLogin = true
  }

  openSignUp(){
    this.showLogin = false
  }

}
