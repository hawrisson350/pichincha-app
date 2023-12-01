import { Component, OnInit } from '@angular/core';
import { HttpReqsService } from 'src/app/data/service/HttpReqs.service';

@Component({
  selector: 'bpi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private httpReqs: HttpReqsService) { }

  ngOnInit(): void {
    this.httpReqs.getProducts().subscribe(res=>{
      console.log(res);
      
    });
  }

}
