import {List_Product_Image} from "./List_Product_Image";

export class List_Product{
    id : string; //guid
    name : string;
    stock : number;
    price : number;
    createdDate : Date;
    updatedDate : Date;
    productImageFiles? : List_Product_Image[];
    imagePath : string;
}
