var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var instrument = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectIstruments');
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-219', function(){
    /*
    #2647 Verify that it is possible to manage Instrument Profiles  
    */
   browser. waitForAngularEnabled(false);
   
     it('should manage instrument profiles', function(){
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_corporate();
        browser.sleep(2000);
        toDoPage.clickInstrument();
        browser.sleep(2000);
        instrument.openProfiles();
        browser.sleep(2000);
        instrument.createNewProfile();
        browser.sleep(2000);
        toDoPage.clickInstrument();
        browser.sleep(2000);
        instrument.openMappings();
        browser.sleep(2000);
        instrument.createNewMapping();
        browser.sleep(2000);
        instrument.deleteMapping();
        browser.sleep(2000);
        toDoPage.clickInstrument();
        browser.sleep(2000);
        instrument.openProfiles();
        browser.sleep(2000);
        instrument.deleteProfile();
    });
});