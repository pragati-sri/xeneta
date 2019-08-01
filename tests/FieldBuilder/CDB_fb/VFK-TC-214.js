var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud'); 
var semPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectSEM');

describe('VFK-TC-214', function(){
    /*
    #2642 Verify that it is possible to save a node configuration as template 
    */
 
     it('should save CDB as template', function(){
        //selecting CDB template
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_corporate();
        browser.sleep(2000);
        toDoPage.openField();
        browser.sleep(2000);
        //setCdbasTemplate saves template,checks new template, deletes template
        semPage.setCdbasTemplate(); 

    });
});