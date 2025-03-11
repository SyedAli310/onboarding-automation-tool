import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideHotToastConfig } from '@ngneat/hot-toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { NgxBootstrapModule } from './shared/modules/ngx-bootstrap.module';
import { GoalSettingsConfigComponent } from './goal-settings-config/goal-settings-config.component';
import { ValidationMessagesComponent } from './shared/components/validation-messages/validation-messages.component';
import { HttpClientModule } from '@angular/common/http';
import { SmartOnboardViewComponent } from './smart-onboard-view/smart-onboard-view.component';
import { SowViewComponent } from './sow-view/sow-view.component';
import { MarkdownPipe } from './shared/pipes/markdown.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    GoalSettingsConfigComponent,
    SmartOnboardViewComponent,
    SowViewComponent,
    MarkdownPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxBootstrapModule,
    ValidationMessagesComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideHotToastConfig({
        position: 'bottom-center',
        autoClose: true,
        duration: 3700,
        dismissible: true,
        className: 'keka-toast',
        stacking: 'depth',
        visibleToasts: 1
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
