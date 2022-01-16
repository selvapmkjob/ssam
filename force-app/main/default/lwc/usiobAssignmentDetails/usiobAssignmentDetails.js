import { LightningElement, api, track, wire  } from 'lwc';
import USIOB_GLOBAL_ASSIGNMENT_OBJECT from '@salesforce/schema/USIOB_Global_Assignments__c';
import getGlobalOutboundAssigneeDetails from '@salesforce/apex/USIOB_GlobalAssignment.getGlobalOutboundAssigneeDetails';
import getPicklistFieldValues from '@salesforce/apex/USIB_AssigneeFormController.getPicklistFieldValues';
import { FlowNavigationNextEvent, FlowAttributeChangeEvent, FlowNavigationBackEvent } from 'lightning/flowSupport';


const PICKLISTFIELDS = ['Gender__c','Assignee_Marital_Status__c','MF_Country__c','Assignment_Type__c'];

export default class UsiobAssignmentDetails extends LightningElement {
    @api recordId;
    isLoading = true 
    //This variable hold USIOB record data
    USIOBdata;
    $record;
    isSaveReturn = false;

    fields = ["Name","Email"];
    displayFields = 'Name, Email';

    handleLookup(event){
        console.log( JSON.stringify ( event.detail) )
    }

    //Picklist options array
    Gender__c_Opts = [];
    Assignee_Marital_Status__c_Opts = [];
    MF_Country__c_Opts = []; 
    Assignment_Type__c_Opts = [];
    //get picklist opotion for fields
    @wire(getPicklistFieldValues, { strObjectApiName: 'USIOB_Global_Assignments__c', fieldSet: PICKLISTFIELDS })
    fetchPicklistValues({ error, data }) {
        if (error) {
            alert(JSON.stringify(error));
        } else if (data) {
            console.log('picklist values ', data);
            this.Gender__c_Opts = data.Gender__c;
            this.Assignee_Marital_Status__c_Opts = data.Assignee_Marital_Status__c;
            this.MF_Country__c_Opts = data.MF_Country__c;
            this.Assignment_Type__c_Opts = data.Assignment_Type__c;
        }
    }


    @wire(getGlobalOutboundAssigneeDetails, {recordId: '$recordId'}) 
    wireGOAssigneeDetails(result) {
        this.$record = result;
        const {data, error} = result;
        if(data) {
           
           this.$record.First_Name__c = data.First_Name__c || '';
           this.$record.Last_Name__c = data.Last_Name__c || '';
           this.$record.USI_Personnel_No__c = data.USI_Personnel_No__c || '';
           this.$record.Deloitte_Email_Address__c = data.Deloitte_Email_Address__c || '';
           this.$record.Job_Title__c = data.Job_Title__c || '';
           this.$record.Business__c = data.Business__c || '';
           this.$record.Business_Area__c = data.Business_Area__c || '';
           this.$record.Business_Line__c = data.Business_Line__c || '';
           this.$record.USI_Entity_Name__c = data.USI_Entity_Name__c || '';
           this.$record.Assignee_Date_of_Hire__c = data.Assignee_Date_of_Hire__c  || '';

           this.$record.Estimated_Start_Date__c = data.Estimated_Start_Date__c || '';
           this.$record.Estimated_End_Date__c = data.Estimated_End_Date__c || '';
           this.$record.Assignment_Type__c = data.Assignment_Type__c || '';
           this.$record.MF_Office__c = data.MF_Office__c || '';
           this.$record.City_State__c= data.City_State__c || '';
           this.$record.MF_Region__c= data.MF_Region__c || '';
           this.$record.MF_Country__c= data.MF_Country__c || '';
           this.$record.MF_Entity_Name__c= data.MF_Entity_Name__c || '';
           this.$record.MF_GM_EE__c= data.MF_GM_EE__c || '';
           
           this.$record.USI_Approving_PPMD__c= data.USI_Approving_PPMD__c || '';
           this.$record.USI_Approving_PPMD_Name = data.USI_Approving_PPMD__r?.Name || '';
           this.$record.USI_Talent_Business_Advisor__c = data.USI_Talent_Business_Advisor__c || '';
           this.$record.USI_Talent_Business_Advisor_Name = data.USI_Talent_Business_Advisor__r?.Name || '';

           this.$record.Assignee_Country_of_Citizenship__c= data.Assignee_Country_of_Citizenship__c || '';
           this.$record.Home_Country_City_State__c= data.Home_Country_City_State__c || '';
           this.$record.Assignee_Birth_Country__c= data.Assignee_Birth_Country__c || '';
           this.$record.Assignee_Date_of_Birth__c= data.Assignee_Date_of_Birth__c || '';
           this.$record.Gender__c= data.Gender__c || '';
           this.$record.Assignee_Marital_Status__c= data.Assignee_Marital_Status__c || '';
           this.$record.Personal_Email_Address__c= data.Personal_Email_Address__c || '';
           this.$record.Assignee_Contact_Number__c= data.Assignee_Contact_Number__c || '';
           this.$record.Address__c= data.Address__c || '';
           this.$record.Assignee_Comment__c= data.Assignee_Comment__c || '';

           this.$record.Temporary_Save__c = data.Temporary_Save__c || null;
           console.log(JSON.stringify(this.$record));
        } else {
            console.error(error);
        }
    }
    // get isUSIApprovingPPMDLoaded(){
    //     console.log('tete' + this.$record.USI_Approving_PPMD__c); 
    //     return this.$record.USI_Approving_PPMD__c ? true:false;
    // }
    handleSuccess() {
        // this.isLoading = false;
        // if (this.isSaveReturn) return;

        const nextNavigationEvent = new FlowNavigationNextEvent();
        this.dispatchEvent(nextNavigationEvent);
    }


}