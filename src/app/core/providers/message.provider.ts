import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig } from '@angular/material';
import {TranslateService} from "@ngx-translate/core";
import {forkJoin} from "rxjs/index";

@Injectable()
export class MessageProvider {

    options:any;

    constructor(private snackBar: MatSnackBar, private translate: TranslateService) {
        this.initialize();
    }

    initialize(){
        this.reset();
    }

    reset(){
        this.options = {
            message: '',
            label: '',
            duration: 4500,
            panelClass: []
        };
    }

    show(message, options?: any){
        this.fill(message, options);

        let promises = [];

        // search for translations
        if(this.options.message){
            promises.push(this.translate.get(this.options.message));
        }

        if(this.options.label){
            promises.push(this.translate.get(this.options.label));
        }

        // render after translations search finished
        if(promises.length){
            forkJoin(promises).subscribe( ([message, label]) => {
                this.options.message = message;
                this.options.label = label;
                this.render();
            });
        }
    }

    // fill the data to be rendered
    fill(message, options){
        this.reset();
        this.setMessage(message);


        // if error add panel class error for color
        if(options && options.error){
            this.options.panelClass = ['error-snackbar'];
        }

        if(options){
            if(options.label){
                this.options.label = options.label;
            }
            if(options.duration){
                this.options.duration = options.duration;
            }
            if(options.panelClass){
                this.options.panelClass = options.panelClass;
            }
        }
    }

    // extracts the message from: string, array or object and sets the message data
    setMessage(obj){
        let message = '';

        if(obj.constructor && obj.constructor === Array){

            // if is array extract first element from array
            message = obj[0];

        }else if(typeof obj === 'object'){

            // extract index of first element from object {a: 'value1', b: 'value2'}) = 'value1'
            const objectIndex = Object.keys(obj)[0];
            message = obj[objectIndex][0] || '';

        } else if(typeof obj === 'string'){
            message = obj;
        }

        this.options.message = message;
    }



    render(){
        if(this.options.message){
            const config = new MatSnackBarConfig();
            config.duration = this.options.duration;
            config.panelClass = this.options.panelClass;

            this.snackBar.open(this.options.message, this.options.label, config);
        }
    }
}