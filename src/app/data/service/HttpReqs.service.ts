import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpReqsService {

  public api = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";

  constructor(private http: HttpClient) { }

  public getProducts() {
    return this.http.get<any>(this.api);
  }

  public sendProduct(data:any) {
    return this.http.post<any>(this.api,data);
  }
}
