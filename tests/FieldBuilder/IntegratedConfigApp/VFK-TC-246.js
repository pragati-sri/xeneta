var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectSEM');
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-246', function(){
    /*
    #5738 Verify that CDB or SW replace functionality is not possible when configapp is open.  
    */
   //browser. waitForAngularEnabled(true);

     it('fb elements should be unclickable when configapp is opened', function(){
        //var SEM_A = element(by.id('5bd9aff5e22e8203adf73612_anchor'));
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_fbadmin();
        browser.sleep(2000);
        toDoPage.openField_admin();
        browser.sleep(2000);
        semPage.clickSem_A();
        browser.sleep(2000);
        semPage.clickEditCdb();
        browser.sleep(2000);
        toDoPage.logout_cloud();
        browser.sleep(2000);

    });
});