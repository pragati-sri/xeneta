var toDoPage = require('../PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('../PageObjects/FieldBuilder/PageObjectSEM');

describe('VFK-TC-203', function(){
    /*
    #5007 Verify that a warning is displayed for duplicate IP addresses for SEM6 nodes  
    */
 
     it('should display warning', function(){
        //selecting CDB template
        toDoPage.go();
        browser.sleep(2000);
        toDoPage.openField();
        browser.sleep(2000);
        semPage.editCdbTemplate();
        browser.sleep(1000);
        //check warning exists
        var warn = element(by.css('[popover="CDB IP address is not unique"]'));
        expect(warn.isPresent()).toBe(true);
        browser.sleep(2000);
        //remove warning for next test run
        semPage.warningTeardown();
        browser.sleep(2000);
    });
});