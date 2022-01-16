import { CardUpsertComponent } from '../../components/card-upsert/card-upsert.component';
import { ICard } from './../../models/card.models';
import { MainService } from './main-page.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class MainPageComponent implements OnInit {
    public cardContent: ICard;
    public cardEditing: ICard;
    public cardIndex = 0;
    public isEdit: boolean;
    public allCard: ICard[] = [];
    private modalRef?: BsModalRef;
    constructor(
        private mainService: MainService,
        private modalService: BsModalService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getAllCard();
    }

    private getAllCard(): void {
        this.mainService.get('card').subscribe((response) => {
            this.allCard = response.cards;
            this.cardContent = this.allCard[this.cardIndex];
        });
    }
    public addNewCard(): void {
        this.openModalUpsert(false);
    }

    public deleteCard(card: ICard): void {
         this.mainService.delete('card', card._id).subscribe((response) => {
            this.toastr.success('Delete success!');
            this.getAllCard();
        });
    }

    public onEditCard(card: ICard): void {
        this.openModalUpsert(true, card);
    }

    private openModalUpsert(isEdit, card?: ICard): void {
        const initialState: any = {
            card: card || {},
            isEdit
        };
        this.modalRef = this.modalService.show(CardUpsertComponent, {initialState});
        this.modalRef.content.submitEvent.subscribe(() => {
            this.getAllCard();
            this.toastr.success(isEdit ? 'Edit success!' : 'Add new card success!');
        });
    }

    public cancel(): void {
        this.cardIndex = this.cardIndex - 1;
        this.cardContent = this.allCard[this.cardIndex];
    }
}
