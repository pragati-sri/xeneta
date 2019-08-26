var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var batch = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectBatchScript');
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-655', function(){
    /*
    #20094 As PROJECT MEMBER I must be able to batch update multiple CDB's with same script. 
    */
   browser. waitForAngularEnabled(false);
   
     it('should update multiple CDBs with the same script', function(){
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_fbuser();
        browser.sleep(2000);
        batch.createNewBatch();
        browser.sleep(2000);
        toDoPage.logout_cloud();
        browser.sleep(2000);
    });
});