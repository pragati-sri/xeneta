var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud'); 

describe('VFK-TC-NA', function(){
    /*
    Checking login/logout for fieldbuilder deployed on cloud  
    */
 
     it('should login', function(){
        //corporate credentials
        browser.ignoreSynchronization = true; 
        toDoPage.corporate_creds_cloud();
        browser.sleep(2000); 
        cloud.login_corporate();
        browser.sleep(2000);
        //signout
        toDoPage.logout_cloud();
        browser.sleep(2000);
        //fbuser login
        cloud.login_fbuser();
        browser.sleep(2000);
        //signout
        toDoPage.logout_cloud();
        browser.sleep(2000);
        //fbadmin login
        cloud.login_fbadmin();
        browser.sleep(2000);
    });
});