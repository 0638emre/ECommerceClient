import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/Create_Product';
import { List_Product } from 'src/app/contracts/List_Product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  //bu servis ile ürün kaydını backende yollayıp VALIDATION lara göre eğer olumsuz ise hangi hataları verdiğini backendden dönen hata datalarını döndürüyoruz.
  //ardından onu callback yaparak ilgili servisin hatalarını ekranda alertfy ile direkt backend errormesajlarını ekrana basıyoruz.
  create(product:Create_Product, successCallBack?: () => void, errorCallBack? : (errorMessage:string) => void ) {
     this.httpClientService.post({
      controller:"products"
     }, product).subscribe(result=> {
      successCallBack();
     },(errorRepsonse:HttpErrorResponse)=>{
      const _error : Array<{key: string, value: Array<string>}> = errorRepsonse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message+= `${_v}<br>`
        });
      });
      errorCallBack(message);
     });
    }

  //bu servis ile ürün listesini backend apimizden çekeceğiz
  async read(successCallBack?: () => void, errorCallBack?: (errorMessage:string) => void): Promise<List_Product[]> {
    const promiseData : Promise<List_Product[]> = this.httpClientService.get<List_Product[]>({
      controller:"products"
    }).toPromise()

    //gelen resp başarılı ise then hatalı ise catch çalışacak. Buradaki d gelen data ile ilgili. atyrıntılı bakılabilir.
    promiseData.then(d => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  } 
}
