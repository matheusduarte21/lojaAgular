import { EventEmitter, Injectable } from '@angular/core';
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
  isLoginError = new EventEmitter<boolean>(false)

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
        this.router.navigate(['seller-home'])
      })
    }

    reloadSeller(){
      if(localStorage.getItem('seller')){ // se existir dentro do localStorage ele irá libera a Guard e enviar para seller-home
        this.isSellerLoggedIn.next(true)
        this.router.navigate(['seller-home'])
      }
    }

    userLogin(data: login) {
      this.http.get(`${this.urlApi}?email=${data.email}&password=${data.password}`, { observe: 'response' })
        .subscribe((result: any) => {
          if(result && result.body && result.body.length === 1){
            this.isLoginError.emit(false)
            this.isSellerLoggedIn.next(true)
            localStorage.setItem('seller', JSON.stringify(result.body));
            this.router.navigate(['seller-home']);
          }else {
            console.warn("não foi possivel acessar o sistema")
            this.isLoginError.emit(true)
          }

        });
    }

}
