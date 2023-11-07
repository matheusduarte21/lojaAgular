import { Injectable } from '@angular/core';
import {HttpClient } from  '@angular/common/http'
import { SingUp, login } from '../data-types';
import {BehaviorSubject} from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  urlApi: string = 'http://localhost:3000/seller'
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient,
    private router: Router
  )
  {}

  userSignUp(data: SingUp){
    this.http.post<SingUp>(this.urlApi, data, {observe:'response'})
    .subscribe((result)=>{
      localStorage.setItem('seller', JSON.stringify(result.body)) // para adicionar no LOCALSTORAGE
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['selle-home'])
    })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){ // se existir dentro do localStorage ele irá libera a Guard e enviar para seller-home
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['selle-home'])
    }
  }

  userLogin(data:login){
    console.warn(data)
  }
}
