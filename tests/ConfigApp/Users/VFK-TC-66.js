var loginPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectLogin'); 
var userPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectUsers'); 

describe('VFK-TC-66', function(){
    /*
    #2180-1 Login with wrong user/password 
    */
     it('verify authentication error', function(){
        loginPage.invalidLogin();
        browser.sleep(2000);
        userPage.verifyError401();
        browser.sleep(2000);
        browser.driver.navigate().refresh();
        browser.sleep(2000);
    });
});