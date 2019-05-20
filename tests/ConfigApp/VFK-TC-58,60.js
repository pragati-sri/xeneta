var loginPage = require('../PageObjects/ConfigApp/PageObjectLogin'); 
var CDBPage = require('../PageObjects/ConfigApp/PageObjectCDB'); 

describe('VFK-TC-58,60', function(){
    /*
    #1495-11 Test Upload of Standby CDB
    #1495-13 Test Clear of Standby CDB
    */
   browser. waitForAngularEnabled(false);

     it('should clear Standby CDB', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        CDBPage.uploadStandbyCDB();
        browser.sleep(2000);
        CDBPage.deleteStandbyCDB();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
    });
});