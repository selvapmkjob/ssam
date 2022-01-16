/********************************************************************************************************************************
Apex class         : <USIOB_GlobalAssignment>
Description        : <Controller which updates the "USI Outbound Global Assignments/USI_Outbound_Global_Assignments__c" Object.>
Type               :  Controller
Test Class         : <USIOB_GlobalAssignmentTest>

*Version         Developer                   Date          Code Coverage              Case/Req #                           Description     
* ----------------------------------------------------------------------------------------------------------------------------------------------------------------            
* 01             Siva Kumar M                 05/01/2022          0%                          --                            USIOB/USI Outbound Global Assignments
******************************************************************************************************************************************************************/
public without sharing class USIOB_GlobalAssignment {
    // Constructor
    public USIOB_GlobalAssignment() {
        
    }
    
    @AuraEnabled(cacheable=true)
    public static contact getAssigneeDetails(String strContactId) {
        IF(String.isBlank(strContactId))
            return  null;
        
        System.debug('Assingee contact Id ' + strContactId);
        Contact assigneeContact;
        try {
           assigneeContact = [select Id,Name, OLD_User__r.isActive,firstname,lastname,Email,WCT_JOB_LEVEL_TEXT__C,WCT_SALARY__C,WCT_SUB_SECONDARY_INDUSTRY__C,WCT_Home_Country__c,WCT_Home_State__c,WCT_OFFICE_CITY_PERSONNEL_SUBAREA__C,WCT_Region__c,WCT_Gender__c,WCT_Person_Id__c,WCT_Job_Title__c,
                                     WCT_Cost_Center__c,WCT_Personnel_Number1__c,WCT_Most_Recent_Rehire__c, WCT_Original_Hire_Date__c, WCT_Function__c,WCT_Entity__c,WCT_Service_Area__c,WCT_Service_Line__c,WCT_Primary_Industry__c 
                                from Contact 
                               where WCT_Type__c = 'Employee'
                                 and OLD_User__r.isActive = true
                                 and id = :strContactId ];
            System.debug('assigneeContact ' + assigneeContact.Name);
        } catch (Exception e) {
            throw new AuraHandledException('BA form failed'  + e.getMessage());
        }
        return assigneeContact;
    }    
   // get Assignee Details based on recordId
   @AuraEnabled(cacheable=true) 
   public static USIOB_Global_Assignments__c getGlobalOutboundAssigneeDetails(String recordId) {
        if(String.isBlank(recordId))
           return null;
        
        return [SELECT Id, First_Name__c, Last_Name__c,USI_Personnel_No__c,Deloitte_Email_Address__c, 
                Job_Title__c, Business__c, Business_Area__c, Business_Line__c, USI_Entity_Name__c,Assignee_Date_of_Hire__c ,
            
                Estimated_Start_Date__c,Estimated_End_Date__c,Assignment_Type__c,MF_Office__c,City_State__c,USI_City__c,
                MF_Region__c,MF_Entity_Name__c,MF_Approving_PPMD__c,MF_GM_EE__c,USI_Approving_Leader__c,
                USI_Talent_Business_Advisor__c, 
               USI_Talent_Business_Advisor__r.Name,
               USI_Approving_PPMD__c,
               USI_Approving_PPMD__r.Name,
                Assignee_Country_of_Citizenship__c,Home_Country_City_State__c,Assignee_Birth_Country__c,Assignee_Date_of_Birth__c,
                Gender__c,Assignee_Marital_Status__c,Personal_Email_Address__c,Assignee_Contact_Number__c,Address__c,
                Assignee_Comment__c,
                Temporary_Save__c
               
                


           From USIOB_Global_Assignments__c 
          WHERE Id = :recordId
        ];
    }

    @AuraEnabled(cacheable=true)
    public static USIOB_Assignments_Temporary__c getGloabalOutboundAssigneePersonalEditableFields(String recordId){
        if(String.isBlank(recordId))
           return null;
        
        return [SELECT Id,            
                Estimated_Start_Date__c,Estimated_End_Date__c,Assignment_Type__c,MF_Office__c,City_State__c,USI_City__c,
                MF_Region__c,MF_Entity_Name__c,MF_Approving_PPMD__c,MF_GM_EE__c,USI_Approving_Leader__c,
                USI_Talent_Business_Advisor__c,USI_Talent_Business_Advisor__r.Name,USI_Approving_PPMD__c,
                USI_Approving_PPMD__r.Name,Assignee_Country_of_Citizenship__c,Home_Country_City_State__c,Assignee_Birth_Country__c,
               Assignee_Date_of_Birth__c,
                Gender__c,Assignee_Marital_Status__c,Personal_Email_Address__c,Assignee_Contact_Number__c,Address__c,
                Assignee_Comment__c
                From USIOB_Assignments_Temporary__c 
          WHERE Id = :recordId
        ];
    }

    @AuraEnabled(cacheable=true) 
   public static List<USIOB_Dependent_Details__c> getGlobalOutboundAssigneeDependantDetails(String recordId) {
        if(String.isBlank(recordId))
           return null;
        
        return [SELECT Id, Child_Annual_Tuition_Amt__c,Child_Birth_Country__c,Child_Country_of_Citizenship__c,Child_Date_of_Birth__c,
         Child_Education_Provider__c,Child_Name__c,USIOB_Assignments_Temporary__r.Spouse_Full_Name__c,
         USIOB_Assignments_Temporary__r.Spouse_Country_of_Citizenship__c,
         USIOB_Assignments_Temporary__r.Spouse_Date_of_Birth__c,
         USIOB_Assignments_Temporary__r.Spouse_Birth_Country__c,
         USIOB_Assignments_Temporary__r.Spouse_currently_employed__c,
         USIOB_Assignments_Temporary__r.Spouse_to_seek_employment_in_host__c
        // USIOB_Assignments_Temporary__r.Temporary_Save__c
           From USIOB_Dependent_Details__c 
          WHERE USIOB_Assignments_Temporary__c = :recordId
        ];
        //Assignment_Start_Date__c
        //MF_Approving_PPMD__c
        //USI_Approving_PPMD__c	
        //USI_Outbound_Global_Assignments__c
        //USI_Talent_Business_Advisor__c

    }
    @AuraEnabled(cacheable=true) 
   public static USIOB_Assignments_Temporary__c getGlobalOutboundAssigneeEmergencyDetail(String recordId) {
            if(String.isBlank(recordId))
            return null;
 
            return [SELECT Id, Emergency_Contact_Full_Name__c,Emergency_Contact_Relationship__c,
            Emergency_Cell_Number__c,Emergency_Telephone_Number__c,Emergency_Contact_Zip_Code__c,
            Host_Emergency_Cell_Number__c,Host_Emergency_Contact_Full_Name__c,Host_Emergency_Contact_Relationship__c,
            Host_Emergency_Contact_Zip_Code__c,Host_Emergency_Telephone_Number__c
                    //Temporary_Save__c
                       From USIOB_Assignments_Temporary__c 
            WHERE Id = :recordId ];
        
    }
    @AuraEnabled(cacheable=true) 
    public static USIOB_Assignments_Temporary__c getGlobalOutboundAssigneePayrollDetail(String recordId) {
             if(String.isBlank(recordId))
             return null;
  
             return [SELECT Id, Payroll_Type__c,USI_RC_Code__c,India_Tax_Filing_Status__c,Tax_Services_TEQ_on_assignment__c,
             Base_Salary_per_Current_Monthly__c,Total_Gross_Compensation_Emp__c,Partner_of_Units__c,Per_Unit_Value__c,
             Partner_Guaranteed_Payment__c, Salary_Type__c, MF_RC_Code__c, Tax_Services_pre_assignment__c,
             WBS_for_GES_to_charge_for_services__c,Current_Monthly_Date__c,More_Contribution_per_year_Ptrs_only__c,
             Director_Deferred_Compensation__c, Director_Profit_Sharing__c
                     
                        From USIOB_Assignments_Temporary__c 
             WHERE Id = :recordId ];
             
     }
    @AuraEnabled
    public static void updateGlobalAssignment(USIOB_Assignments_Temporary__c tempGlobalAssignment, Id sourceId) {
        try{
            upsert tempGlobalAssignment;
            USIOB_Global_Assignments__c uiobGlobalAssignment = new USIOB_Global_Assignments__c();
            uiobGlobalAssignment.Id = sourceId;
            uiobGlobalAssignment.Temporary_Save__c = tempGlobalAssignment.Id;
            update uiobGlobalAssignment;
        }
        catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        } 
    }

    @AuraEnabled
    public static void updateDepDetails(USIOB_Dependent_Details__c dep) {
        try{
            insert dep;
        }
        catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        } 
    }

    @AuraEnabled
    public static void deleteChild(String depId) {
        try{
            USIOB_Dependent_Details__c dep = new USIOB_Dependent_Details__c(Id = depId);
            delete dep;
        }
        catch(Exception e) {
            throw new AuraHandledException(e.getMessage());
        } 
    }
}