import { LightningElement, track, api } from 'lwc';
import usiobStyles from '@salesforce/resourceUrl/usiobStyles';
import { loadStyle } from 'lightning/platformResourceLoader';
import deloitteBrandLogo from '@salesforce/resourceUrl/GlobalMobilityLogo';
import getAssigneeDetails from '@salesforce/apex/USIOB_GlobalAssignment.getAssigneeDetails';

const FORM_TITLE = 'BA INITIATION TITLE';


export default class UsiobBaInitForm extends LightningElement {
    @api loggedInContactId;
    deloitteBrandLogo = deloitteBrandLogo;
    currentFormTitle = FORM_TITLE;
    isLoading = true ;
    isThankYouPage = false;    
    objectApiName  = 'USIOB_Global_Assignments__c';
    isSubmittedDisabled = true;


    @track record = {
        Id                                  : '',
        Assignee_Name__c                    : '',     
        Deloitte_Email_Address__c           : '',
        USI_Job_Title__c                    : '',
        MF_Country__c                       : '',
        USI_GM_EE__c                        : '',
        SSC_Team__c                         : '',
        First_Name__c                       : '',
        Last_Name__c                        : '',
        USI_GM_BA_Name__c                   : '',
        Created_Date__c                     : '',
        Business__c                         : '',        
        Business_Area__c                    : '',
        Business_Line__c                    : '',        
        USI_Personnel_No__c                 : '',
        Assignee_Date_of_Hire__c            : '',
        USI_RC_Code__c                      : '',
        Assignment_Status__c                : 'Record Created'
    };
    
    

    formLoaded() {
        this.isLoading = false;
    }
    handleError(){
        this.isLoading = false;
    }

    renderedCallback() {
        
        console.log('loggedInContactId ' + this.loggedInContactId); 
       
        if (document.querySelector('meta[name="viewport"]') == null) {
            var meta = document.createElement('meta');
            meta.name = "viewport";
            meta.content = "width=device-width, initial-scale=1.0";
            document.getElementsByTagName('head')[0].appendChild(meta);
        }

        Promise.all([
            loadStyle(this, usiobStyles)
        ])
    }

    handleAssigCntInfo(event) {
        this.record.Assignee_Name__c = event.detail.value[0];
        this.getAssigneeContactInfo();
     }

     getAssigneeContactInfo() {
        if(this.record.Assignee_Name__c) {
            getAssigneeDetails({ strContactId: this.record.Assignee_Name__c})
            .then(result => {
                console.log('contact details ' + JSON.stringify(result));
                this.record.Deloitte_Email_Address__c           = result.Email;
                this.record.USI_Job_Title__c                    = result.WCT_Job_Level_Text__c;
                this.record.First_Name__c                       = result.FirstName;
                this.record.Last_Name__c                        = result.LastName;
                this.record.USI_RC_Code__c                      = result.WCT_Cost_Center__c; 
                this.record.Business__c                         = result.WCT_Function__c;
                this.record.Business_Area__c                    = result.WCT_Service_Area__c;
                this.record.Business_Line__c                    = result.WCT_Service_Line__c;
                this.record.USI_Personnel_No__c                 = result.WCT_Personnel_Number1__c;
                this.record.Assignee_Date_of_Hire__c            = (result.WCT_Most_Recent_Rehire__c== null)?result.WCT_Original_Hire_Date__c:result.WCT_Most_Recent_Rehire__c;
                this.record.Created_Date__c                     = new Date().toISOString();

                this.isSubmittedDisabled = false;
            }).catch((error) => {
                console.error('Failed to get contact details ' + JSON.stringify(error));
            });
        }

     }

     handleReset(event) {
        this.record.Assignee_Name__c                    = ''; 
        this.record.Deloitte_Email_Address__c           = '';
        this.record.USI_Job_Title__c                    = '';
        this.record.First_Name__c                       = '';
        this.record.Last_Name__c                        = '';
        this.record.USI_RC_Code__c                      = '';
        this.record.Business__c                         = '';
        this.record.Business_Area__c                    = '';
        this.record.Business_Line__c                    = '';
        this.record.USI_Personnel_No__c                 = '';
        this.record.Assignee_Date_of_Hire__c            = '';
        this.record.Created_Date__c                     = '';
        this.isSubmittedDisabled = true;
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (window.confirm("Are you sure you want to cancel? All entered data will be removed from the form")) { 
            if (inputFields) {
                inputFields.forEach(field => {
                    field.reset();
                });
            }
            
        }
    }

     handleSubmit(event) {
         event.preventDefault();
         let isValid = true;
         this.template.querySelectorAll('.validateMe').forEach(element => {             
             isValid = isValid && element.reportValidity();
         });
         if (isValid) {            
             this.template.querySelector('lightning-record-edit-form').submit();
         }           
     } 

     handleSuccess(event) {
        this.isLoading = false;
        this.isThankYouPage = true;
        this.record.Id  = event.detail.id; 
     }

     navigateToRecordPage() {
        window.open('/lightning/r/USIOB_Global_Assignments__c/'+this.record.Id+'/view','_self');
    }
    
}