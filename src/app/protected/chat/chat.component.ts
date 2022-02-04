import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {ChatService} from "../../core/services/chat.service";
import {DateProvider} from "../../core/providers/date.provider";
import {AuthProvider} from "../../core/providers/auth.provider";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective} from "ngx-perfect-scrollbar";
import {isUndefined} from "util";
import {ChatProvider} from "../../core/providers/chat.provider";

import * as Ps from 'perfect-scrollbar';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{

    // sidebar control
    sidePanelOpened = true;

    // form controls
    form: FormGroup;

    // chat controls
    unfiltered_users = [];
    users = [];
    selected_user: any;
    messages: any[] = [];
    scroll_timeout = null;
    top_scrolled = false;
    scrolled_down = false;

    messagesInterval = null;

    // chat scroll directive
    public config: PerfectScrollbarConfigInterface = {};
    @ViewChild(PerfectScrollbarDirective) directiveRef: PerfectScrollbarDirective;

    @Output() psYReachStart: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private fb: FormBuilder,
        private chatProvider: ChatProvider,
        private chatService: ChatService,
        private userService: UserService,
        public dateProvider: DateProvider,
        public auth: AuthProvider,
    ) {
        this.form = this.fb.group({
            message: [''],
            filterUnread: [''],
            filterSearch: ['']
        });

        this.form.get('filterUnread').valueChanges.subscribe( () => {
            this.filterUsers();
        });
        this.form.get('filterSearch').valueChanges.subscribe( () => {
            this.filterUsers();
        });
    }

    ngOnInit(){
        this.loadUsers();

        this.messagesInterval = setInterval( () => {
            if(this.selected_user){
                this.loadMessages(this.selected_user, false);
            }
        }, 2500);
    }

    ngOnDestroy(){
        clearInterval( this.messagesInterval );
    }

    scrollTopReached(){
        if(this.messages.length && this.scrolled_down){
            this.top_scrolled = true;
            this.loadMessages(this.selected_user);
        }
    }

    loadUsers(){
        let req = {
            activeSort: 'name',
            sortDirection: 'asc',
            withProfile: 1,
            withUnreadChatMessages: 1,
            withHotel: 1,
            withCompany: 1
        };

        this.userService.all(req).subscribe( (users) => {
            if(users.length){
                let tmp_users = [];
                for(let user of users){
                    if(user.id != this.auth.user.id){
                        tmp_users.push(user);
                    }
                }
                this.users = tmp_users;
                this.unfiltered_users = tmp_users;

                if(this.users.length && !this.selected_user){
                    this.selected_user = this.users[0];
                    this.top_scrolled = false;
                    this.scrolled_down = false;
                    this.loadMessages(this.selected_user, true);
                }
                this.filterUsers();
            }
        });
    }

    isOver(): boolean {
        return window.matchMedia(`(max-width: 300px)`).matches;
    }

    selectUser(user): void {
        this.selected_user = user;
        this.top_scrolled = false;
        this.scrolled_down = false;
        this.messages = [];
        this.loadMessages(user, true);
    }

    loadMessages(user, scroll?){
        this.chatService.get(user.id, this.top_scrolled).subscribe( (messages) => {
            this.messages = messages;
            
            if(scroll && !isUndefined(this.directiveRef)){
                clearTimeout(this.scroll_timeout);
                this.scroll_timeout = setTimeout( () => {
                    this.directiveRef.scrollToBottom();
                    this.scrolled_down = true;
                }, 350);
            }

            this.chatProvider.updateUnread();
            this.loadUsers();
        });
    }

    send(){
        if(this.selected_user && this.form.valid){
            let msg = this.form.get('message').value;
            this.form.get('message').patchValue('');
            this.chatService.send(this.selected_user.id, msg).subscribe( () => {
                this.loadMessages(this.selected_user, true);
            });
        }
    }

    filterUsers(){
        let filtered_users = [];
        let filterSearch = this.form.get('filterSearch').value.toLowerCase();
        let filterUnread = this.form.get('filterUnread').value;

        // search by name or company/hotel
        for(let user of this.unfiltered_users){
            if(user.profile.full_name.toLowerCase().indexOf(filterSearch) !== -1){
                filtered_users.push(user);
            }else if(user.profile.hotel && user.profile.hotel.name.toLowerCase().indexOf(filterSearch) !== -1){
                filtered_users.push(user);
            }else if(user.profile.company && user.profile.company.name.toLowerCase().indexOf(filterSearch) !== -1){
                filtered_users.push(user);
            }
        }

        // first filter completed
        this.users = filtered_users;

        // second filter (based on unread messages by users)
        if(filterUnread) {
            filtered_users = [];

            for(let user of this.users){
                if(user.unread_chat_messages_count){
                    filtered_users.push(user);
                }
            }

            this.users = filtered_users;
        }
    }

}
