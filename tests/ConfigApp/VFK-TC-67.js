var loginPage = require('../PageObjects/ConfigApp/PageObjectLogin'); 
var userPage = require('../PageObjects/ConfigApp/PageObjectUsers'); 

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
    });
});
