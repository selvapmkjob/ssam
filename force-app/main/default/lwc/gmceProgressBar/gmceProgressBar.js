import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';
import gmceStyles from '@salesforce/resourceUrl/gmceStyles';
import { loadStyle } from 'lightning/platformResourceLoader';
import deloitteBrandLogo from '@salesforce/resourceUrl/GlobalMobilityLogo';

const BA_FORM_HEADER_TITLE = 'Business Advisor Assignment Initiation Form';
const ASSIGN_FORM_HEADER_TITLE = 'Assignee Form';
const LAUNCH_REPAT_FORM = 'Repatriation Initiation Form';
const SPOUSE_DP_TAS_FORM = 'Spouse/Domestic Partner Transition Assistance Services';
const ASSIGNEE_EXTENSION_FORM = 'Assignee Extension';




export default class ProgressIndicatorComponent extends LightningElement {
    @api stages;
    @api currentStage;
    @api currentForm;
    @api availableActions = [];
     @api recordId;
    @api loggedInContactId; 
    deloitteBrandLogo = deloitteBrandLogo;
    record = null;

    constructor() {
        super();
        //do something

    }

    connectedCallback() {
        console.log(JSON.stringify(this.stages));
        console.log(this.currentStage);
        console.log('gmceProgressBar '+this.currentForm);
    }

    renderedCallback() {
        if (document.querySelector('meta[name="viewport"]') == null) {
            var meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = "width=device-width, initial-scale=1.0";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }



        Promise.all([
            loadStyle(this, gmceStyles)
        ])
    }    

    get currentFormTitle() {
        if (this.currentForm && this.currentForm === 'BA_Initiation') {
            this.isBAInitiation = true;
            return BA_FORM_HEADER_TITLE;
        } else if (this.currentForm && this.currentForm === 'ASSIGNEE_INIT') {
            return ASSIGN_FORM_HEADER_TITLE;
        } else if (this.currentForm && this.currentForm === 'LAUNCH_REPAT') {
            return LAUNCH_REPAT_FORM;
        } else if (this.currentForm && this.currentForm === 'Spouse_DP_TAS') {
            return SPOUSE_DP_TAS_FORM;
        } else if (this.currentForm && this.currentForm === 'ASSIGNEE_EXTENSION') {
            return ASSIGNEE_EXTENSION_FORM;
            //this.eeFormTitle;
            
        }
    }

    get isProgressBarRequired() {
        return (this.currentForm && (this.currentForm == "ASSIGNEE_INIT" ||
            this.currentForm == "BA_Initiation" ||
            this.currentForm == "LAUNCH_REPAT")
        ) ? true : false;
    }


}