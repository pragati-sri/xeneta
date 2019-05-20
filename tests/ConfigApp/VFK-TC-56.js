var loginPage = require('../PageObjects/ConfigApp/PageObjectLogin'); 
var CDBPage = require('../PageObjects/ConfigApp/PageObjectCDB'); 

describe('VFK-TC-56', function(){
    /*
   #1495-9 Test clear of Restore CDB 
    */
   browser. waitForAngularEnabled(false);

     it('should clear Restore CDB', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        CDBPage.uploadRestoreCDB();
        browser.sleep(2000);
        CDBPage.deleteRestoreCDB();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
    });
});