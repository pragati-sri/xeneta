var loginPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectLogin'); 
var userPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectUsers'); 

describe('VFK-TC-70', function(){
    /*
    #21005 As USER I must be able to set WatchdogGroup from user custom view
    */
   browser. waitForAngularEnabled(false);

     it('should set watchdog group from user custom view', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        //userPage.addWatchdogGroup();
        //browser.sleep(2000);
        userPage.createUserWithWatchdogGroup();
        browser.sleep(2000);
        userPage.deleteUserWithWatchdogGroup();
        browser.sleep();
        //userPage.deleteWatchdogGroup();
    });
});