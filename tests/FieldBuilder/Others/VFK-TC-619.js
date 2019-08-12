var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var instrumentPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectIstruments');
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');

describe('VFK-TC-619', function(){
    /*
    #17955 As USER I must be able to change instrument names 
    */

     it('should edit instrument names', function(){
         //checking definition names
         browser.ignoreSynchronization = true;
         toDoPage.go_cloud_pragatis_project();
         browser.sleep(2000); 
         cloud.login_fbuser();
         browser.sleep(2000);
        toDoPage.clickInstrument();
        instrumentPage.changeDefinitionName();
        browser.sleep(2000);
        def_name = element(by.model('model[\'name\']'));
        def_name.clear();
        //generate a random name
        var randomstring = require("randomstring");     
        var random = 'a'+randomstring.generate(5);
        def_name.sendKeys(random);
        browser.sleep(2000);
        instrumentPage.clickSubmit();
        browser.sleep(3000);
        //verify update
        var edited_name = element(by.css('[class="ng-binding ng-scope"]')).getText();
        expect(edited_name).toEqual(random);
        browser.sleep(2000);

        //checking profile 
        toDoPage.clickInstrument();
        browser.sleep(2000);
        instrumentPage.changeProfileName();
        browser.sleep(2000);
        def_name = element(by.model('model[\'name\']'));
        browser.sleep(2000);
        def_name.clear();
        var randomstring = require("randomstring");
        var random = 'a'+randomstring.generate(5);
        browser.sleep(2000);
        def_name.sendKeys(random);
        browser.sleep(2000);
        instrumentPage.clickSubmit();
        browser.driver.navigate().refresh();
        browser.sleep(3000);
        //verify update
        expect(element(by.tagName('strong')).getText()).toBe(random+' [SAND]');

        //checking mappings 
        toDoPage.clickInstrument();
        browser.sleep(2000);
        instrumentPage.changeMappingName();
        browser.sleep(2000);
        def_id = element(by.model('model[\'vectusId\']'));
        def_id.clear();
        var randomstring = require("randomstring");
        var random = 'a'+randomstring.generate(5);
        browser.sleep(1000);
        def_id.sendKeys(random);
        browser.sleep(2000);
        instrumentPage.save();
        //browser.driver.navigate().refresh();
        browser.sleep(2000);
        element(by.className('glyphicon glyphicon-home')).click();
        browser.sleep(2000);
        toDoPage.clickInstrument();
        browser.sleep(2000);
        element(by.linkText('Mappings')).click();
        browser.sleep(2000);
        //verify update
        expect(element(by.tagName('strong')).getText()).toContain(random);
        browser.sleep(2000);
        toDoPage.logout_cloud();
        browser.sleep(2000);
    });
});
