var loginPage = require('../PageObjects/ConfigApp/PageObjectLogin'); 
var userPage = require('../PageObjects/ConfigApp/PageObjectUsers'); 

describe('VFK-TC-70', function(){
    /*
    #2180-5 Create MONITOR role as ADMIN
    */
   browser. waitForAngularEnabled(false);

     it('should create MONITOR', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        userPage.createMonitor();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
        loginPage.vectusLoginMonitor();
        browser.sleep(2000);
        userPage.monitorCreatesUser();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
        loginPage.loginAdmin();
        browser.sleep(2000);
        userPage.deleteMonitor();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
    });
});