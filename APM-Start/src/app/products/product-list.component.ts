import {Component} from '@angular/core';
import { IProduct } from './product';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ProductService } from './product.service';

@Component ({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string){
        this._listFilter = value;
        // if there is a filter list value then performFilter. If empty then set to entire list of products
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    // Function that is executed when the component is first initialized
    constructor(private _productService: ProductService) {
         this.listFilter = 'rake';
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
              product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
     toggleImage(): void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void {
        this.products = this._productService.getProducts();
        this.filteredProducts = this.products;
    }
}
