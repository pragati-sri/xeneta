var loginPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectLogin'); 
var nodePage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectNode'); 

describe('VFK-TC-235', function(){
    /*
    #534-2 Verify Node Selection 
    */
   browser.waitForAngularEnabled(false);

     it('should select a SEM6 node', function(){
         //Add a new Vectus node
        loginPage.vectusSelect();
        browser.sleep(2000);
        nodePage.AddNewVectus();
        browser.sleep(2000);
        loginPage.vectusSelect();
        browser.sleep(2000);
        nodePage.DeleteVectus();
        browser.sleep(2000);
        //loginPage.vectusLogout();
    });
});