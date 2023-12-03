import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Product } from 'src/app/data/schema/Product';
import { AlertService } from 'src/app/data/service/Alert.service';
import { HttpReqsService } from 'src/app/data/service/HttpReqs.service';

@Component({
  selector: 'bpi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: Product[] = [];
  dataInTable: Product[] = [];
  pageSizeList: number[] = [5, 10, 20];
  pageSelected: number = 5;
  searchCriteriaSelected: string = "";
  searchDataSelected: string = "";


  constructor(
    private alertService: AlertService,
    private router: Router,
    private httpReqs: HttpReqsService,
    private datePipe: DatePipe) {
    this.httpReqs.getProducts().subscribe(res => {
      this.dataSource = res;
      this.reseatPaginate();
    });
  }

  ngOnInit(): void {

  }

  seachItem(): void {
    this.dataInTable = [];
    let searchDataSelected: any = this.searchDataSelected;
    if (this.searchCriteriaSelected === "$date_release" ||
      this.searchCriteriaSelected === "$date_revision") {
      searchDataSelected = this.datePipe.transform(searchDataSelected, 'yyyy-MM-dd');
    }
    this.dataSource.map(item => {
      if (item.matches({ [this.searchCriteriaSelected]: searchDataSelected })) {
        this.dataInTable.push(item);
      }
    });
  }

  reseatPaginate() {
    this.dataInTable = this.dataSource.slice(0, this.pageSelected);
    this.searchCriteriaSelected = "";
    this.searchDataSelected = "";
  }


  changePageSize($event: any) {
    this.pageSelected = parseInt($event);
    this.dataInTable = this.dataSource.slice(0, this.pageSelected);
  }

  deleteItem(item: Product) {
    this.alertService.setAlert("Desea eliminar el item ["+ item.$name +"]");
    this.alertService.btnSelected.pipe(first()).subscribe(
      res => {
        if (res === 'acept') {
          this.httpReqs.deleteProduct(item.$id).subscribe({
            error: (next: any) => {
              this.alertService.setAlert("Eliminación Exitosa");
              this.reseatPaginate();
            }
          });
        }
      }
    );
  }

  get typeInput(): string {
    if (this.searchCriteriaSelected === "$date_release" ||
      this.searchCriteriaSelected === "$date_revision") {
      return "date";
    }
    return "text";
  }
}
