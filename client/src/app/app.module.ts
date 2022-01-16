import { MainService } from './pages/main-page/main-page.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardUpsertComponent } from './components/card-upsert/card-upsert.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MainPageComponent,
    CardUpsertComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ToastrModule.forRoot(), // ToastrModule added
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
