var loginPage = require('../PageObjects/ConfigApp/PageObjectLogin'); 
var userPage = require('../PageObjects/ConfigApp/PageObjectUsers'); 

describe('VFK-TC-68', function(){
    /*
    #2180-3 Create OPERATOR user as ADMIN 
    */
   browser. waitForAngularEnabled(false);

     it('admin role creation as operator', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        userPage.createOperator();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
        loginPage.vectusLoginOperator();
        userPage.operatorCreatesUser();
        loginPage.vectusLogout();
        browser.sleep(2000);
        loginPage.loginAdmin();
        userPage.deleteOperator();
        loginPage.vectusLogout();
    });
});