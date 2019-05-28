var loginPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectLogin'); 
var instrumentPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectInstrument'); 

describe('VFK-TC-38', function(){
    /*
    #2847-1 Verify that it is possible to upload instrument files to a SEM6 node
    */
   browser. waitForAngularEnabled(false);

     it('should upload instrument profile', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        instrumentPage.uploadInstrumentProfile();
        browser.sleep(2000);
        browser.driver.navigate().refresh();
        browser.sleep(4000);
        instrumentPage.uploadInvalidInstrumentProfile();
        browser.sleep(2000);
        loginPage.vectusLogout();
    });
});