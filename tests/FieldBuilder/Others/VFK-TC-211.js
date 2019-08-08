var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectSEM');
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-211', function(){
    /*
    #5026 Verify that it is possible to select a CDB Template for a SEM6 node   
    */
 
     it('should replace CDB', function(){
        //selecting CDB template
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_fbadmin();
        browser.sleep(2000);
        toDoPage.openField_admin();
        browser.sleep(2000);
        semPage.editCdbTemplate();
        browser.sleep(2000);
        //replacing CDB template and checking updated cdb details
        semPage.replaceCdbTemplate();
        browser.sleep(2000);
        toDoPage.logout_cloud();
        browser.sleep(2000);

    });
});