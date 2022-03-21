import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/Users';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any={}
  // currentUser$ : Observable<User>;

  
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    // this.currentUser$=this.accountService.currentUser$;
  }
  login(){
    console.log(this.model);
    this.accountService.login(this.model).subscribe(Response=>{
     
      console.log(Response);


    }, error=>{
      console.log(error);
    })
  }
  logout(){
    this.accountService.logout();

    
  }

}
