var loginPage = require('../PageObjects/ConfigApp/PageObjectLogin'); 
var userPage = require('../PageObjects/ConfigApp/PageObjectUsers'); 

describe('VFK-TC-69', function(){
    /*
    #2180-3 Create ENGINEER user as ADMIN 
    */
   browser. waitForAngularEnabled(false);

     it('admin role creation as engineer', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        userPage.createEngineer();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
        loginPage.vectusLoginEngineer();
        browser.sleep(2000);
        userPage.engineerCreatesUser();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
        loginPage.loginAdmin();
        browser.sleep(2000);
        userPage.deleteEngineer();
        browser.sleep(2000);
        loginPage.vectusLogout();
        browser.sleep(2000);
    });
});