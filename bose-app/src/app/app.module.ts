import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SafePipe } from './services/safe.pipe';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-modules';
import { NgxSpinnerModule } from "ngx-spinner";
import { VideoDialobBoxComponent } from './components/video-dialob-box/video-dialob-box.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoDialobBoxComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [SafePipe],
  bootstrap: [AppComponent],
  entryComponents: [VideoDialobBoxComponent],
})
export class AppModule { }
