var loginPage = require('../PageObjects/ConfigApp/PageObjectLogin'); 
var CDBPage = require('../PageObjects/ConfigApp/PageObjectCDB'); 

describe('VFK-TC-49,50', function(){
    /*
   #1495-4 Test Copy Running to Project Default 
   #1495-5 Test Copy Project Default to Running 
    */
   browser. waitForAngularEnabled(false);

     it('should copy running to Project default', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        CDBPage.copyRunningToDefault();
        browser.sleep(2000);
        CDBPage.copyDeafaultToRunning();
        browser.sleep(2000);
        loginPage.loginAdmin();
        browser.sleep(2000);
        CDBPage.verifyRunningCDB();
        browser.sleep(2000);
        CDBPage.deleteDefaultCDB();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
    });
});