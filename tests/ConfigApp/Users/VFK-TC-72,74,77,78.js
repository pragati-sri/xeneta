var loginPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectLogin'); 
var userPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectUsers'); 
var cdbPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectCDB');

describe('VFK-TC-72,74,77,78', function(){
    /*
    #2180-7 Change the role of a user as ADMIN 
    #2180-6 Change the password of a user as ADMIN
    #2180-8 Login with new password
    #2180-9 Login with old password
    */
   browser. waitForAngularEnabled(false);

     it('should change the role of a user as ADMIN', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        userPage.createMonitor();
        browser.sleep(2000);
        userPage.editMonitorAsAdmin();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
        //login with old password
        loginPage.vectusLoginMonitor();
        browser.sleep(2000);
        //check login error 
        var session_error= element(by.linkText('Session error'));
        expect(session_error.isPresent()).toBe(true);
        browser.sleep(2000);
        //login with new password
        loginPage.vectusLoginNewPassword();
        browser.sleep(2000);
        loginPage.vectusLogout();
        //delete Monitor user
        loginPage.vectusLogin();
        browser.sleep(2000);
        userPage.deleteMonitor();
        browser.sleep(2000);
        cdbPage.commitCDB();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
        
    });
});