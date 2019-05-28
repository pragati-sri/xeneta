var path = require("path");
'use strict';
module.exports = {  
    instrument: {  
        instrument_tab: element(by.linkText('Instruments')), 
        upload_link: element(by.linkText('Upload new Instrument Profile')), 
    }, 
    
    instrument_profile: {  
        details: element.all(by.css('[style="padding-left: 10px"]')).last(),
        name: element.all(by.css('[style="padding-left: 10px"]')).last(),
        error: element(by.linkText('Instrument Profile upload failed for invalid_profile.xml')),
        remove_error: element(by.className('glyphicon glyphicon-remove pull-right ng-scope')),
    },

    dialog_box: {  
        filename: element(by.css('[name="filename"]')), 
        id: element(by.css('[name="id"]')), 
        description: element(by.css('[name="description"]')),
        select_file: element(by.className('glyphicon glyphicon-folder-open')),
        //select_file: element(by.css('[name="fileInput"]')),
    },  

    buttons: {  
        upload_button: element(by.buttonText('Upload')), 
        delete_profile_test: element.all(by.css('[fms-icon="delete"]')).last(),
        ok_button: element(by.id('confirmOkBtn')),
    },  

    uploadInstrumentProfile: function() {  
        var instrument = this.instrument;
        var dialog_ele = this.dialog_box;
        var button_ele = this.buttons;
        var profile_ele = this.instrument_profile;
        instrument.instrument_tab.click()
        browser.sleep(2000);
        instrument.upload_link.click();
        browser.sleep(2000);
        dialog_ele.filename.sendKeys('Profile_test.xml');
        browser.sleep(2000);
        dialog_ele.id.sendKeys('test');
        browser.sleep(2000);
        dialog_ele.description.sendKeys('used for automated testing');
        browser.sleep(2000);
        //upload file from windows file selector
        var fileToUpload = 'C:/Verification/practice protractor_21feb/files/Profile123.xml',
        absolutePath = path.resolve(__dirname, fileToUpload);
        element(by.css('input[type="file"]')).sendKeys(absolutePath);  
        browser.sleep(2000);
        button_ele.upload_button.click();
        browser.sleep(10000);  

        //validations
        expect(profile_ele.details.getText()).toContain('ID:test Description:used for automated testing Size:1287 Status:STABLE');

        //teardown file upload
        button_ele.delete_profile_test.click();
        browser.sleep(2000);
        button_ele.ok_button.click();
        browser.sleep(2000);
    },  

    uploadInvalidInstrumentProfile: function() {  
        var instrument = this.instrument;
        var dialog_ele = this.dialog_box;
        var button_ele = this.buttons;
        var profile_ele = this.instrument_profile;
        instrument.instrument_tab.click()
        browser.sleep(2000);
        instrument.upload_link.click();
        browser.sleep(2000);
        dialog_ele.filename.sendKeys('Profile_test.xml');
        browser.sleep(2000);
        dialog_ele.id.sendKeys('test');
        browser.sleep(2000);
        dialog_ele.description.sendKeys('used for automated testing');
        browser.sleep(2000);
        //upload invalid profile from windows file selector
        var fileToUpload = 'C:/Verification/practice protractor_21feb/files/invalid_profile.xml',
        absolutePath = path.resolve(__dirname, fileToUpload);
        element(by.css('input[type="file"]')).sendKeys(absolutePath);  
        browser.sleep(2000);
        button_ele.upload_button.click();
        browser.sleep(10000); 

        //verify error message
        expect(profile_ele.error.isPresent()).toBe(true);
        profile_ele.remove_error.click(); 

    }, 
};