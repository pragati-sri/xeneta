var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectSEM');
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-203', function(){
    /*
    #5007 Verify that a warning is displayed for duplicate IP addresses for SEM6 nodes  
    */
 
     it('should display warning', function(){
        //selecting CDB template
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_fbadmin();
        browser.sleep(2000);
        toDoPage.openField_admin();
        browser.sleep(2000);
        semPage.editCdbTemplate();
        browser.sleep(1000);
        //check warning exists
        var warn = element(by.css('[popover="CDB IP address is not unique"]'));
        expect(warn.isPresent()).toBe(true);
        browser.sleep(2000);
        //remove warning for next test run
        semPage.warningTeardown();
        browser.sleep(2000);
        //logout
        toDoPage.logout_cloud();
        browser.sleep(2000);
    });
});