import {Injectable} from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}

export interface ChildrenItems {
    state: string;
    name: string;
    type?: string;
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    children?: ChildrenItems[];
}

const MENU = {
    public: [
        {
            state: '/',
            name: 'DASHBOARD',
            type: 'link',
            icon: 'explore',
            requires_access: false
        },
        {
            state: 'calendar',
            name: 'CALENDAR',
            type: 'link',
            icon: 'event',
            requires_access: true,
            access_url: '/calendar'
        },
        {
            state: 'tasks',
            name: 'TASKS',
            type: 'link',
            icon: 'view_week',
            requires_access: true,
            access_url: '/tasks'
        },
        {
            state: 'directory',
            name: 'DIRECTORY',
            type: 'link',
            icon: 'contact_mail',
            requires_access: true,
            access_url: '/directory'
        },
        {
            state: 'quality',
            name: 'QUALITY',
            type: 'sub',
            icon: 'check_box',
            requires_access: true,
            access_url: '/quality',
            children: [
                {
                    state: 'files',
                    name: 'FILES',
                },
                {
                    state: 'assurance-visits',
                    name: 'ASSURANCE_VISITS',
                },
                {
                    state: 'extension-requests',
                    name: 'EXTENSION_REQUESTS'
                },
                {
                    state: 'exension-requests',
                    name: 'EXENSION_REQUESTS'
                },
            ],

        },
        /*{
            state: 'my-files',
            name: 'MY_FILES',
            type: 'link',
            icon: 'folder_shared'
        }*/
    ],
    admin: [
        {
            state: 'users',
            name: 'USERS',
            type: 'link',
            icon: 'group',
            requires_access: true,
            access_url: '/admin/users',
        },
        {
            state: 'hotels',
            name: 'HOTELS',
            type: 'link',
            icon: 'domain',
            requires_access: true,
            access_url: '/admin/hotels',
        },
        {
            state: 'companies',
            name: 'EXTERNAL_COMPANIES',
            type: 'link',
            icon: 'domain',
            requires_access: true,
            access_url: '/admin/companies',
        },
        {
            state: 'mahgazine',
            name: 'MAHGAZINE',
            type: 'link',
            icon: 'view_compact',
            requires_access: true,
            access_url: '/admin/mahgazine',
        },
        {
            state: 'brandsite',
            name: 'BRANDSITE',
            type: 'sub',
            icon: 'cloud_circle',
            requires_access: true,
            access_url: '/admin/brandsite',
            children: [
                {
                    state: 'contents',
                    name: 'CONTENTS',
                },
                {
                    state: 'sections',
                    name: 'SECTIONS',
                },
            ]
        },
        {
            state: 'quality',
            name: 'QUALITY',
            type: 'sub',
            icon: 'check_box',
            requires_access: true,
            access_url: '/admin/quality',
            children: [
                {
                    state: 'files',
                    name: 'FILES'
                },
                {
                    state: 'assurance-visits',
                    name: 'ASSURANCE_VISITS'
                },
                {
                    state: 'extension-requests',
                    name: 'EXTENSION_REQUESTS'
                },
                {
                    state: 'exension-requests',
                    name: 'EXENSION_REQUESTS'
                },
            ]
        },
        {
            state: 'permissions-groups',
            name: 'PERMISSIONS',
            type: 'link',
            icon: 'vpn_key',
            requires_access: true,
            access_url: '/admin/permissions-groups',
        },
        /*{
            state: 'settings',
            name: 'SETTINGS',
            type: 'link',
            icon: 'settings'
        },*/
    ],
};

@Injectable()
export class MenuService {
    get(){
        return MENU;
    }
}
