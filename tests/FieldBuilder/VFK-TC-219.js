var toDoPage = require('../PageObjects/FieldBuilder/PageObjectHome'); 
var instrument = require('../PageObjects/FieldBuilder/PageObjectIstruments');

describe('VFK-TC-219', function(){
    /*
    #2647 Verify that it is possible to manage Instrument Profiles  
    */
 
     it('should manage instrument profiles', function(){
        toDoPage.go();
        toDoPage.clickInstrument();
        browser.sleep(2000);
        instrument.openProfiles();
        browser.sleep(2000);
        instrument.createNewProfile();
        browser.sleep(2000);
        toDoPage.clickInstrument();
        instrument.openMappings();
        instrument.createNewMapping();
        

    });
});