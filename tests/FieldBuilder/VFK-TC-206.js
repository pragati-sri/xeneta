var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var instrumentPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectIstruments'); 

describe('VFK-TC-206', function(){
    /*
    #4884 Verify that it is possible to define reset-command on modbus   
    */
 
     it('should define reset-command on modbus', function(){
        //populating reset command field
        toDoPage.go();
        toDoPage.clickInstrument();
        instrumentPage.openMappings();
        instrumentPage.openModbusMappings();
        instrumentPage.openMasteringConfig();
        var randomstring = require("randomstring");
        var random = randomstring.generate({length: 3,charset: 'numeric'});
        var reset_command = element(by.css('[name="Mastering Config reset command"]'));
        reset_command.click().clear().sendKeys(random);
        element(by.css('[name="Mastering Config init time"]')).click();
        instrumentPage.save();

        //verifying value is updated
        expect(reset_command.getAttribute('value')).toEqual(random);
        
        //check reset button
        instrumentPage.resetResetCommand();
        expect(reset_command.getAttribute('value')).toEqual(random);

        //check empty reset command field
        instrumentPage.clearResetCommand();
        expect(reset_command.getAttribute('value')).toEqual('');
    });
});