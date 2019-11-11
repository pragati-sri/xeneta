'use strict';
module.exports = {  
    login: {  
        fms_sem6_25: element(by.cssContainingText('.ng-binding', 'fms-sem6-25')),  
        username: element(by.id('username')),
        password: element(by.id('password')),
        fms_sem6_01: element(), 
    },  

    logout: {
        logout_button: element(by.css('[fms-icon="logout"]')),
    },

    vectusLogin: function() {  
        browser.get('https://fms.no.enterdir.com/vectus-configapp/static#/network/nodes');  
        //browser.waitForAngular();  
        var login = this.login;  
        browser.sleep(2000);
        login.fms_sem6_25.click();
        browser.sleep(2000);
        login.username.click().sendKeys('admin');
        browser.sleep(2000);
        login.password.sendKeys('Admin12345').sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
    },  

    vectusSelect: function() {  
        browser.get('https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/static#/network/nodes');  
        //browser.waitForAngular();  
        browser.sleep(2000);
    },  

    vectusLogout: function() {   
        var logout = this.logout;  
        logout.logout_button.click();
    },  

    invalidLogin: function() {  
        browser.get('https://fms.no.enterdir.com/vectus-configapp/static#/network/nodes');  
        //browser.waitForAngular();  
        var login = this.login;  
        browser.sleep(2000);
        login.fms_sem6_25.click();
        browser.sleep(2000);
        login.username.click().sendKeys('pragati');
        browser.sleep(2000);
        login.password.sendKeys('pragati123').sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
    },  

    vectusLoginOperator: function() {    
        var login = this.login;  
        login.username.click().sendKeys('AAOPERAT');
        browser.sleep(2000);
        login.password.sendKeys('OPERATOR1234').sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
    },

    loginAdmin: function() {    
        var login = this.login;  
        login.username.click().sendKeys('admin');
        browser.sleep(2000);
        login.password.sendKeys('Admin12345').sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
    },

    vectusLoginEngineer: function() {    
        var login = this.login;  
        login.username.click().sendKeys('AAENGINE');
        browser.sleep(2000);
        login.password.sendKeys('ENGINEER1234').sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
    },

    vectusLoginNewPassword: function() {    
        var login = this.login;  
        login.username.clear().sendKeys('AAMONITO');
        browser.sleep(2000);
        login.password.clear().sendKeys('NEWPASS1234').sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
    },

    vectusLoginMonitor: function() {    
        var login = this.login;  
        login.username.click().sendKeys('AAMONITO');
        browser.sleep(2000);
        login.password.sendKeys('MONITOR1234').sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
    },
};