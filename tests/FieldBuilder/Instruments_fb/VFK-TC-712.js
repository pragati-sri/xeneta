var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var instrument = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectIstruments');
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-712', function(){
    /*
    #23484 As PROJECT MEMBER I need to create an Instrument definition from a EDS file. 
    */
   browser. waitForAngularEnabled(false);
   
     it('should create an Instrument Definition from an EDS file.', function(){
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_fbuser();
        browser.sleep(2000);
        element(by.css('[placeholder="Filter"]')).sendKeys('pragati');
        browser.sleep(3000);
        element(by.className('fas fa-play')).click();
        browser.sleep(2000);
        instrument.clickInstrument();
        browser.sleep(2000);
        instrument.openDefinitions();
        browser.sleep(2000);    
        element(by.css('[icon="add"]')).click();  
        //instrument.clickAdd();
        browser.sleep(2000);
    });
});