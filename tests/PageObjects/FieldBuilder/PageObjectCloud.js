'use strict';
module.exports = {  
    elements: {  
        clickField: element(by.buttonText('Sign in with Azure')),  
        corporate_email: element(by.id('i0116')),
        next: element(by.id('idSIButton9')),
        corporate_user: element(by.cssContainingText('.ng-binding', '326952')),
        username: element(by.id('username')),
        password: element(by.id('password')),
        signIn: element(by.buttonText('Sign In')),
        fbuser: element(by.cssContainingText('.ng-binding', 'fbuser')),
        fbadmin: element(by.cssContainingText('.ng-binding', 'fbadmin')),
    },  
      
    login_corporate: function() {  
        var ele = this.elements;
        ele.clickField.click();
        ele.corporate_email.sendKeys('pragati.srivastava@akersolutions.com');
        ele.next.click();
        browser.sleep(6000);
        expect(ele.corporate_user.isPresent()).toBeTruthy();
        browser.sleep(4000);
    },  


    login_fbuser: function() {  
        var ele = this.elements;
        ele.username.sendKeys('fbuser');
        ele.password.sendKeys('OS1G[\'c9HTg?=@[j)O:[');
        ele.signIn.click();
        browser.driver.navigate().refresh();
        browser.sleep(4000);
        expect(ele.fbuser.isPresent()).toBeTruthy();
        browser.sleep(4000);
    },  

    login_fbadmin: function() {  
        var ele = this.elements;
        ele.username.sendKeys('fbadmin');
        ele.password.sendKeys('uy2rvOVs`wHR~A2hj%5M');
        ele.signIn.click();
        browser.driver.navigate().refresh();
        browser.sleep(4000);
        expect(ele.fbadmin.isPresent()).toBeTruthy();
        browser.sleep(4000);
    },  
};



