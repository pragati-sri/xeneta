var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectSEM');
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-212', function(){
    /*
    #5319 (BUG) Verify that norwegian characters are working on stage/demo 
    */
 
     it('should check norwegian characters', function(){
        //selecting CDB template
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_corporate();
        browser.sleep(2000);
        toDoPage.openField_admin();
        browser.sleep(2000);
        //appends norwegian character to node name, then reverts changes
        semPage.editSemName();
        //apply for node name as well
        

    });
});