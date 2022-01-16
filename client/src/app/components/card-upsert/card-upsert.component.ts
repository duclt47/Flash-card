import { ICard } from '../../models/card.models';
import { MainService } from '../../pages/main-page/main-page.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-card-upsert',
    templateUrl: './card-upsert.component.html',
    styleUrls: ['./card-upsert.component.scss']
})
export class CardUpsertComponent implements OnInit {
    @Output() submitEvent = new EventEmitter<any>();
    @Output() cancelEvent = new EventEmitter<any>();

    public card: any = {};
    public isEdit;
    constructor(
        private mainService: MainService,
        private modalService: BsModalService


    ) { }

    ngOnInit(): void {
    }

    public onSubmit(): void {
        if (!this.isEdit) {
            this.submit();
        } else {
            this.edit();
        }
    }

    private edit(): void {
        this.mainService.edit('card', this.card._id, this.card).subscribe((response) => {
            this.card = response.Card;
            this.isEdit = false;
            this.modalService.hide();
            this.submitEvent.emit();
        });
    }

    private submit(): void {
        this.mainService.post('card', this.card).subscribe((response) => {
            this.card = response.Card;
            this.isEdit = false;
            this.modalService.hide();
            this.submitEvent.emit();
        });
    }

    public cancel(): void {
        this.modalService.hide();
    }

}
