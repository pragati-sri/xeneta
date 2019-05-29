var loginPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectLogin'); 
var nodePage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectNode'); 

describe('VFK-TC-121', function(){
    /*
    #1975-2 Add instance with defined initial values 
    */
   //browser.ignoreSynchronization = true;
   browser. waitForAngularEnabled(false);
 
     it('add instance', function(){
        loginPage.vectusLogin();
        browser.sleep(5000);
        nodePage.AddNewStaticArp();
        browser.sleep(2000);
        nodePage.TeardownNewStaticArp();
        browser.sleep(2000); 
        loginPage.vectusLogout();
        browser.sleep(2000);
    });
});