var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var instrumentPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectIstruments'); 
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-206', function(){
    /*
    #4884 Verify that it is possible to define reset-command on modbus   
    */
 
     it('should define reset-command on modbus', function(){
        //populating reset command field
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000);
        cloud.login_fbuser();
        browser.sleep(2000);
        toDoPage.clickInstrument();
        browser.sleep(2000);
        instrumentPage.openMappings();
        browser.sleep(2000);
        instrumentPage.openModbusMappings();
        browser.sleep(2000);
        instrumentPage.openMasteringConfig();
        browser.sleep(2000);
        var randomstring = require("randomstring");
        browser.sleep(2000);
        var random = randomstring.generate({length: 3,charset: 'numeric'});
        browser.sleep(2000);
        var reset_command = element(by.css('[name="Mastering Config reset command"]'));
        browser.sleep(2000);
        reset_command.click().clear().sendKeys(random);
        browser.sleep(2000);
        element(by.css('[name="Mastering Config init time"]')).click();
        browser.sleep(2000);
        instrumentPage.save();
        browser.sleep(2000);

        //verifying value is updated
        expect(reset_command.getAttribute('value')).toEqual(random);
        
        //check reset button
        instrumentPage.resetResetCommand();
        expect(reset_command.getAttribute('value')).toEqual(random);

        //check empty reset command field
        instrumentPage.clearResetCommand();
        expect(reset_command.getAttribute('value')).toEqual('');

        //logout
        browser.sleep(2000);
        toDoPage.logout_cloud();
        browser.sleep(2000);
    });
});