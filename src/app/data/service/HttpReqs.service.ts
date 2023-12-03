import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../schema/Product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpReqsService {

  public api = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.api)
      .pipe(map(data => data.map((v: any) => new Product(
        v.id,
        v.name,
        v.description,
        v.logo,
        v.date_release.split('T')[0],
        v.date_revision.split('T')[0],
      ))));
  }

  public sendProduct(data: any) {
    return this.http.post<Product>(this.api, data);
  }

  public editProduct(data: any) {
    return this.http.put<Product>(this.api, data);
  }

  public deleteProduct(id: any) {
    return this.http.delete<Product>(this.api+"?id="+id);
  }
}
