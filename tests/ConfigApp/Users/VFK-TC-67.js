var loginPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectLogin'); 
var userPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectUsers'); 

describe('VFK-TC-67', function(){
    /*
    #2180-2 Create an ADMIN role as ADMIN 
    */
   browser. waitForAngularEnabled(false);

     it('admin role creation as admin', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        userPage.createAdmin();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
        browser.driver.navigate().refresh();
        browser.sleep(2000);
    });
});
