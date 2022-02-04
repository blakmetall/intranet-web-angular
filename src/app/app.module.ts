import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';

// angular material modules
import {
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule, MatTooltipModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

// other modules
import {BidiModule} from '@angular/cdk/bidi';
import {AgmCoreModule} from '@agm/core';
import {DatePipe} from "@angular/common";

// translation
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// loading bar
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';

// scrollball
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

// theme core files
import {
    MenuComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent,
    OptionsComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
} from './core';

// app routes
import {AppRoutes} from './app.routing';

// app components
import {AppComponent} from './app.component';
import {RedirectComponent} from "./protected/redirect/redirect.component";

// app guards
import {AuthGuard} from "./core/guards/auth.guard";
import {GuestGuard} from "./core/guards/guest.guard";
import {PermissionGuard} from "./core/guards/permission.guard";

// app services
import {AddressService} from "./core/services/address.service";
import {BrandsiteSectionService} from "./core/services/brandsite-section.service";
import {CompanyService} from "./core/services/company.service";
import {CountryService} from "./core/services/country.service";
import {EventCategoryService} from "./core/services/event.category.service";
import {EventService} from "./core/services/event.service";
import {FolderService} from "./core/services/folder.service";
import {FileService} from "./core/services/file.service";
import {HotelBrandsiteSectionService} from "./core/services/hotel.brandsite.section.service";
import {HotelService} from "./core/services/hotel.service";
import {PermissionService} from "./core/services/permission.service";
import {PermissionsGroupService} from "./core/services/permissions.group.service";
import {SessionService} from "./core/services/session.service";
import {StateService} from "./core/services/state.service";
import {TaskService} from "./core/services/task.service";
import {UserRolService} from "./core/services/user.rol.service";
import {UserService} from "./core/services/user.service";
import {QualityAssuranceVisitService} from "./core/services/quality/assurance-visit.service";
import {QualityExtensionRequestService} from "./core/services/quality/extension-request.service";
import {QualityExensionRequestService} from "./core/services/quality/exension-request.service";
import {SettingService} from "./core/services/setting.service";

// app providers
import {AppProvider} from "./core/providers/app.provider";
import {AuthProvider} from "./core/providers/auth.provider";
import {BrandsiteSectionProvider} from "./core/providers/brandsite-section.provider";
import {MessageProvider} from "./core/providers/message.provider";
import {RedirectProvider} from "./core/providers/redirect.provider";
import {EventsProvider} from "./core/providers/events.provider";

// app extras
import {DialogConfirmComponent} from "./core/components/dialog-confirm/dialog.confirm";
import {RequestsInterceptor} from "./core/interceptors/requests.interceptor";
import {DateProvider} from "./core/providers/date.provider";
import {FileViewerProvider} from "./core/providers/file-viewer.provider";
import {FileViewerComponent} from "./core/components/file-viewer/file-viewer.component";
import {MomentModule} from "angular2-moment";
import {MomentTimezoneModule} from "angular-moment-timezone";
import {MahgazineEditionService} from "./core/services/mahgazine-edition.service";
import {MahgazineSectionService} from "./core/services/mahgazine-section.service";
import {MahgazineArticleService} from "./core/services/mahgazine-article.service";
import {NotificationService} from "./core/services/notification.service";
import {NotificationProvider} from "./core/providers/notification.provider";
import {ChatModule} from "./protected/chat/chat.module";
import {ChatService} from "./core/services/chat.service";
import {ChatProvider} from "./core/providers/chat.provider";


// APP_CONFIGURATIONS ----------------------------------------------------
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
};
// END APP_CONFIGURATIONS


@NgModule({
    imports: [
        // brower modules
        BrowserModule,
        BrowserAnimationsModule,

        // router module with app main rputes
        RouterModule.forRoot(AppRoutes),

        // angular forms module
        FormsModule,
        ReactiveFormsModule,

        // http web modules
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        LoadingBarRouterModule,

        // material design modules
        MatSidenavModule,
        MatCardModule,
        MatMenuModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTabsModule,
        MatListModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatDialogModule,
        MatInputModule,

        // flex module
        FlexLayoutModule,

        MomentModule,
        MomentTimezoneModule,

        // core theme modules
        BidiModule,
        AgmCoreModule.forRoot({apiKey: 'YOURAPIKEY'}),
        PerfectScrollbarModule,
    ],
    providers: [
        // app
        AppProvider,

        // guards
        AuthGuard,
        GuestGuard,
        PermissionGuard,

        // providers
        AuthProvider,
        BrandsiteSectionProvider,
        MessageProvider,
        RedirectProvider,
        EventsProvider,
        DateProvider,
        FileViewerProvider,
        NotificationProvider,
        ChatProvider,

        // services
        AddressService,
        BrandsiteSectionService,
        CompanyService,
        CountryService,
        EventCategoryService,
        EventService,
        FolderService,
        FileService,
        HotelBrandsiteSectionService,
        HotelService,
        PermissionService,
        PermissionsGroupService,
        SessionService,
        StateService,
        TaskService,
        UserRolService,
        UserService,
        QualityAssuranceVisitService,
        QualityExensionRequestService,
        QualityExtensionRequestService,
        SettingService,
        MahgazineEditionService,
        MahgazineSectionService,
        MahgazineArticleService,
        NotificationService,
        ChatService,


        // pipes
        DatePipe,

        // scrollball provider
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },

        // http interceptor provider
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestsInterceptor,
            multi: true
        },
    ],
    declarations: [
        // main component
        AppComponent,

        // app layout components
        HeaderComponent,
        SidebarComponent,
        NotificationComponent,
        OptionsComponent,
        MenuComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,

        // app layout directives
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,

        // app entry components
        DialogConfirmComponent,
        FileViewerComponent,

        // redirect component
        RedirectComponent
    ],
    entryComponents: [
        DialogConfirmComponent,
        FileViewerComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
