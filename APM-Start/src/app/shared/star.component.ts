import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'pm-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})
// tslint:disable-next-line:one-line
export class StarComponent implements OnChanges{
    @Input() rating: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();


    ngOnChanges(): void {
        this.starWidth = this.rating * 86 / 5;
    }
    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rating} was clicked`); // ES 2015 back ticks to define a template string
    }
}
