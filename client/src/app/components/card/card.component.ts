import { ICard } from './../../models/card.models';
import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Output() deleteEvent = new EventEmitter<string>();
    @Output() editEvent = new EventEmitter<ICard>();
    @Input() cardContent;
    constructor(
    ) { }

    ngOnInit(): void {
    }

    public delete(): void {
        this.deleteEvent.emit();
    }

    public edit(): void {
        this.editEvent.emit();
    }

}
