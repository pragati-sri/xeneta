var loginPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectLogin'); 
var nodePage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/ConfigApp/PageObjectNode'); 

describe('VFK-TC-81', function(){
    /*
    #534-1 Verify ASIM browsing  
    */
   browser.waitForAngularEnabled(false);

     it('should browse ASIM', function(){
        loginPage.vectusLogin();
        browser.sleep(2000);
        //root node checks
        nodePage.RootAttributesPresent();
        browser.sleep(2000);
        nodePage.RootChildAggregations();
        browser.sleep(2000);
       /* nodePage.RootCheckParentLink();
        browser.sleep(2000);
        nodePage.CheckVectusList();
        //child node checks
        nodePage.NavigateManagementProtocols();
        nodePage.NavigateScmp();
        nodePage.GoToParent();
        nodePage.GoToParent();
        nodePage.RootAttributesPresent();
        nodePage.RootChildAggregations();
        nodePage.EmptyStringAttribute();*/
        loginPage.vectusLogout();
    });
});