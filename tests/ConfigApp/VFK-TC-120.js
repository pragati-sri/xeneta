var loginPage = require('../PageObjects/ConfigApp/PageObjectLogin'); 
var nodePage = require('../PageObjects/ConfigApp/PageObjectNode'); 

describe('VFK-TC-120', function(){
    //browser.ignoreSynchronization = true;
    browser. waitForAngularEnabled(false);
    /*
    #1975-1 Add instance without initial values 
    */
 
     it('add instance', function(){
        loginPage.vectusLogin();
        browser.sleep(5000);
        nodePage.navigateNotificationSubscriber();
        browser.sleep(2000);
        nodePage.checkNewNotifSubsInstance();
        browser.sleep(3000); 
        loginPage.vectusLogout();
    });
});