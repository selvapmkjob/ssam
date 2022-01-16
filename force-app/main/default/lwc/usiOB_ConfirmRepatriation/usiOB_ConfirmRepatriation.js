import { api,track, LightningElement } from 'lwc';
import deloitteBrandLogo from '@salesforce/resourceUrl/GlobalMobilityLogo';
import usiobStyles from '@salesforce/resourceUrl/usiobStyles';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class usiOB_ConfirmRepatriation extends LightningElement {
    deloitteBrandLogo = deloitteBrandLogo;

    @api recordId;
    @api AssignmentEndDate;
    @api  RepatriationChageResult;
    @api areThankTabVisible;
    @api isThankYouPage;
    @api requiredRequestedEndDate=false;
    @track Buttonstatus= true;
    @track bShowModal=false;
    @track disableForm=true;
    @track showLoader=true;
    @track ShowRequestedEndDate= true;
    @track selectedOption;
    @track popMessage;

    
    renderedCallback() {
        
       
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
    formLoaded() {
        this.showLoader = false;
    }
    handleError(){
        this.showLoader = false;
    }
    changeHandler(event) {
        const field =this.template.querySelector('.AssigneeRepatriationOnEndDate')?.value;
       
        if (field === 'NO') {
           
            this.RepatriationChageResult='NO';
            this.ShowRequestedEndDate = true;
            this.requiredRequestedEndDate=true;
            this.Buttonstatus = true;
            this.template.querySelector('.ShowRequestedEndDatelabel')?.classList.remove('slds-hide');
           
            }  if (field === 'YES') {
                this.RepatriationChageResult='YES';
                this.Buttonstatus = false;
                this.ShowRequestedEndDate = false;
                this.requiredRequestedEndDate=false;
                this.template.querySelector('.ShowRequestedEndDatelabel')?.classList.add('slds-hide');
               
                }if (field === '') {
                    this.RepatriationChageResult='';
                    this.Buttonstatus = true;
                    this.ShowRequestedEndDate = false;
                    this.template.querySelector('.RequestedEndDate').value='';
                    this.template.querySelector('.ShowRequestedEndDatelabel')?.classList.add('slds-hide');
                 
                    } 
                   

        }

    setDateValue(event){
       this.confirmdate=event.target.value;
       console.log(event.target.value);
    }
    RequestedEndDateChange(event){
        const field = event.target.value;
        if(field===null){
            this.bShowModal=false;
        }else{
          
            if(field < this.AssignmentEndDate){
                this.popMessage='USI Global Mobility Team will initiate an Early Repatriation process';
            }else{
                this.popMessage='USI Global Mobility Team will initiate an Extension process';
            }
            this.bShowModal=true;
        }
        

    } handleWebformDetails(event){
        
        let isValid = true;
        this.template.querySelectorAll('.validateMe').forEach(element => {             
            isValid = isValid && element.reportValidity();
        });
        if(!this.template.querySelector('.RequestedEndDate').value && this.RepatriationChageResult== 'NO'){
            isValid=false;
        }
        if(this.RepatriationChageResult== 'YES'){
            isValid = true;
        }
         
        if (isValid) {
          
                  
               if(this.RepatriationChageResult=='YES'||this.RepatriationChageResult=='NO') {
               

                this.template.querySelector('.RepatriationConfirmedDate').value = new Date().toISOString();
               
            }
            
          let result= this.template.querySelector('lightning-record-edit-form').submit();
            this.areThankTabVisible=true;           
        } else{
            console.log('Validation error');
        }

    }
    handleReset(){
        if (window.confirm("Are you sure you want to cancel? All entered data will be removed from the form")) { 
            this.template.querySelector('.RequestedEndDate').value='';
            this.template.querySelector('.slds-select').value='';
            this.template.querySelector('.ShowRequestedEndDatelabel')?.classList.add('slds-hide');
        }
    }
    PopupSubmit(event){
        this.bShowModal=false;
        this.Buttonstatus=false;
    }closeModal(){
        this.bShowModal=false;
    }cancelModal(){
        this.template.querySelector('.RequestedEndDate').value='';
        this.bShowModal=false;
    }
}