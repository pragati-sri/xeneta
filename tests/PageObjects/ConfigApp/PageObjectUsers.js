'use strict';
module.exports = {  
    login: {    
        session_error: element(by.linkText('Session error')),
        server_exception: element(by.linkText('Server exception')),
        //server_exception_text: element(by.className('ng-binding')).getText(),
    },  

    userManagement: {    
        users_tab: element(by.linkText('Users')),
        //admin2: element(by.css('[ng-if="tdType()===\'basic\'"]')).getText(),
    },

    dialogBox: {    
        user_name: element(by.id('username')),
        password: element(by.id('password')),
        role: element(by.css('[name="role"]')),
        change_password: element(by.id('changePassword')),
    },

    buttons: {  
        add_button: element(by.css('[fms-icon="add"]')),
        cancel_button: element(by.buttonText('Cancel')),
        submit_button: element(by.buttonText('Submit')),
        navigate_to: element.all(by.css('[fms-icon="goto"]')).last(),
        delete_button: element(by.css('[fms-icon="delete"]')),
        ok_button: element(by.id('confirmOkBtn')),
        edit_button: element(by.css('[fms-icon="edit"]')),
        save_button: element(by.buttonText('Save')),
    },

    clickAddButton: function(){
        var button_ele = this.buttons;
        button_ele.add_button.click();
    },

    clickCancelButton: function(){
        var button_ele = this.buttons;
        button_ele.cancel_button.click();
    },

    clickSubmitButton: function(){
        var button_ele = this.buttons;
        button_ele.submit_button.click();
    },

    clickDeleteButton: function(){
        var button_ele = this.buttons;
        button_ele.delete_button.click();
    },


    clickNavigateTo: function(){
        var button_ele = this.buttons;
        button_ele.navigate_to.click();
    },

    clickOkButton: function(){
        var button_ele = this.buttons;
        button_ele.ok_button.click();
    },

    clickEditButton: function(){
        var button_ele = this.buttons;
        button_ele.edit_button.click();
    },

    clickSaveButton: function(){
        var button_ele = this.buttons;
        button_ele.save_button.click();
    },

    verifyError401: function() {  
        var login = this.login; 
        login.session_error.click(); 
        browser.sleep(2000);
        var error_401 = element(by.css('[class="text-muted ng-binding"]')).getText();
        expect(error_401).toContain('HTTP status: 401');
    },  

    createAdmin: function() {  
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        var buttons_ele = this.buttons;
        this.clickAddButton();
        browser.sleep(2000);
        var dialogBox_ele = this.dialogBox;
        dialogBox_ele.user_name.click().sendKeys('ADMIN2');
        dialogBox_ele.password.click().sendKeys('Administrator');
        dialogBox_ele.role.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        this.clickSubmitButton();
        //verify user creation
        browser.sleep(2000);
        var admin2= element(by.css('[ng-if="tdType()===\'basic\'"]')).getText();
        browser.sleep(2000);
        expect(admin2).toBe('ADMIN2');
        //delete admin2 user
        this.clickDeleteButton();
        this.clickOkButton();
        //verify deletion
        browser.sleep(2000);
        var admin3 = element(by.cssContainingText('ng-binding.ng-scope', 'ADMIN2'));
        expect(admin3.isPresent()).toBe(false);
        },

    createOperator: function() {  
    var user_ele = this.userManagement;
    user_ele.users_tab.click(); 
    browser.sleep(2000);
    this.clickAddButton();
    browser.sleep(2000);
    var dialogBox_ele = this.dialogBox;
    dialogBox_ele.user_name.click().sendKeys('AAOPERAT');
    dialogBox_ele.password.click().sendKeys('OPERATOR1234');
    dialogBox_ele.role.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
    this.clickSubmitButton();
    //verify user creation
    browser.sleep(2000);
    var operator= element(by.css('[ng-if="tdType()===\'basic\'"]')).getText();
    browser.sleep(2000);
    expect(operator.getText()).toBe('AAOPERAT');
    },

    //Operator tries to create a new user
    operatorCreatesUser: function() {
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        this.clickAddButton();
        browser.sleep(2000);
        var dialogBox_ele = this.dialogBox;
        dialogBox_ele.user_name.click().sendKeys('TEST');
        dialogBox_ele.password.click().sendKeys('TESTING1234');
        dialogBox_ele.role.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        this.clickSubmitButton();
        //verify error message
        var login = this.login;
        browser.sleep(2000);
        login.server_exception.click();
        browser.sleep(2000);
        var server_exception_text = element(by.css('[class="text-muted ng-binding"]')).getText();
        expect(server_exception_text).toContain('HTTP status: 500');
        browser.sleep(2000);
        this.clickCancelButton();
        browser.sleep(2000);
    },

    deleteOperator: function() {
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        this.clickDeleteButton();
        this.clickOkButton();
        //verify deletion
        browser.sleep(2000);
        var operator1 = element(by.cssContainingText('ng-binding.ng-scope', 'AAOPERAT'));
        expect(operator1.isPresent()).toBe(false);
    }, 

    createEngineer: function() {  
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        this.clickAddButton();
        browser.sleep(2000);
        var dialogBox_ele = this.dialogBox;
        dialogBox_ele.user_name.click().sendKeys('AAENGINE');
        dialogBox_ele.password.click().sendKeys('ENGINEER1234');
        dialogBox_ele.role.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        this.clickSubmitButton();
        //verify user creation
        browser.sleep(2000);
        var operator= element(by.css('[ng-if="tdType()===\'basic\'"]')).getText();
        browser.sleep(2000);
        expect(operator.getText()).toBe('AAENGINE');
        },

    //Engineer tries to create a new user
    engineerCreatesUser: function() {
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        this.clickAddButton();
        browser.sleep(2000);
        var dialogBox_ele = this.dialogBox;
        dialogBox_ele.user_name.click().sendKeys('TEST');
        browser.sleep(2000);
        dialogBox_ele.password.click().sendKeys('TESTING1234');
        browser.sleep(2000);
        dialogBox_ele.role.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
        this.clickSubmitButton();
        //verify error message
        var login = this.login;
        browser.sleep(2000);
        login.server_exception.click();
        browser.sleep(2000);
        var server_exception_text = element(by.css('[class="text-muted ng-binding"]')).getText();
        expect(server_exception_text).toContain('HTTP status: 500');
        browser.sleep(2000);
        this.clickCancelButton();
        browser.sleep(2000);
    },

    deleteEngineer: function() {
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        this.clickDeleteButton();
        this.clickOkButton();
        //verify deletion
        browser.sleep(2000);
        var operator1 = element(by.cssContainingText('ng-binding.ng-scope', 'AAENGINE'));
        expect(operator1.isPresent()).toBe(false);
    },

    createMonitor: function() {  
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        this.clickAddButton();
        browser.sleep(2000);
        var dialogBox_ele = this.dialogBox;
        dialogBox_ele.user_name.click().sendKeys('AAMONITO');
        browser.sleep(2000);
        dialogBox_ele.password.click().sendKeys('MONITOR1234');
        browser.sleep(2000);
        dialogBox_ele.role.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
        this.clickSubmitButton();
        //verify user creation
        browser.sleep(2000);
        var operator= element(by.css('[ng-if="tdType()===\'basic\'"]')).getText();
        browser.sleep(2000);
        expect(operator.getText()).toBe('AAMONITO');
        },

    //monitor tries to create a new user
    monitorCreatesUser: function() {
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        this.clickAddButton();
        browser.sleep(2000);
        var dialogBox_ele = this.dialogBox;
        dialogBox_ele.user_name.click().sendKeys('TEST');
        browser.sleep(2000);
        dialogBox_ele.password.click().sendKeys('TESTING1234');
        browser.sleep(2000);
        dialogBox_ele.role.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
        this.clickSubmitButton();
        //verify error message
        var login = this.login;
        browser.sleep(2000);
        login.server_exception.click();
        browser.sleep(2000);
        var server_exception_text = element(by.css('[class="text-muted ng-binding"]')).getText();
        expect(server_exception_text).toContain('HTTP status: 500');
        browser.sleep(2000);
        this.clickCancelButton();
        browser.sleep(2000);
    },

    deleteMonitor: function() {
        var user_ele = this.userManagement;
        user_ele.users_tab.click(); 
        browser.sleep(2000);
        this.clickDeleteButton();
        browser.sleep(2000);
        this.clickOkButton();
        //verify deletion
        browser.sleep(2000);
        var operator1 = element(by.cssContainingText('ng-binding.ng-scope', 'AAMONITO'));
        expect(operator1.isPresent()).toBe(false);
    },

    editMonitorAsAdmin: function() {
        var dialog_ele = this.dialogBox
        this.clickEditButton();
        browser.sleep(2000);
        //change Password
        dialog_ele.change_password.click();
        browser.sleep(2000);
        dialog_ele.password.click().sendKeys('NEWPASS1234');
        browser.sleep(2000);
        //change Role
        dialog_ele.role.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
        this.clickSaveButton();
        browser.sleep(2000);
        //verify role update
        var operator1 = element.all(by.css('[ng-class="getTdClass(propDef, instance)"]')).get(1);
        expect(operator1.getText()).toContain('ENGINEER'); 
    },
            
};