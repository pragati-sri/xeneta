var path = require("path");
'use strict';
module.exports = {  
    batch: {  
        fbuserField: element(by.cssContainingText('.ng-binding', 'Automation_fbuser')), 
        batchTab: element(by.linkText('Batch')),
        firstSem: element(by.cssContainingText('.sorting_1', 'AASEMB')),
        secondSem: element(by.cssContainingText('.sorting_1', 'ASEM_B')),
        description: element(by.id('description')),
        uploadFile: element(by.css('[name="fileInput"]')),
    },  

    buttons: {  
        save_button: element(by.css('[ng-click="saveMap()"]')),
        reset_button: element(by.css('[ng-click="resetMap()"]')),
        ok_button: element(by.id('confirmOkBtn')),
        submit_button: element(by.cssContainingText('.ng-scope', 'Submit')),
        edit_button: element(by.css('[fms-icon="edit"]')),
        add_button: element.all(by.css('[fms-icon="add"]')).get(1),
        cancel_button: element(by.css('[type="reset"]')),
        delete_button: element.all(by.css('[fms-icon="delete"]')).last(),
    },  
 

    //button functions
    save: function(item) {
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.save_button.click();
    },
    clickSubmit: function(item) {  
        var button_ele = this.buttons;
        button_ele.submit_button.click();
    },
    clickReset: function(item) {  
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.reset_button.click();
    },
    clickOk: function(item) {  
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.ok_button.click();
    },
    clickEdit: function(item) {  
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.edit_button.click();
    },
    clickAdd: function(item) {  
        var button_ele = this.buttons;
        button_ele.add_button.click();
    },
    clickCancel: function(item) {  
        var button_ele = this.buttons;
        button_ele.cancel_button.click();
    },
    clickDelete: function(item) {  
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.delete_button.click();
    },

    createNewBatch: function(item) {  
        var batch_ele = this.batch;   
        batch_ele.fbuserField.click();
        browser.sleep(2000);
        batch_ele.batchTab.click();
        browser.sleep(2000);
        this.clickAdd();
        browser.sleep(2000);
        //remove this cancel click after bug is fixed.
        this.clickCancel();
        browser.sleep(2000);
        this.clickAdd();
        batch_ele.firstSem.click();
        //select first two sems
        var actionSequence = browser.actions().keyDown(protractor.Key.CONTROL);
        actionSequence = actionSequence.mouseMove(batch_ele.secondSem).click().perform();
        //actionSequence.perform();
        browser.sleep(2000);
        batch_ele.description.click();
        batch_ele.description.sendKeys('batch');
        browser.sleep(2000);
        /*var fileToUpload = 'C:/Verification/practice protractor_21feb/files/createModifyActionBatch.txt',
        absolutePath = path.resolve(__dirname, fileToUpload);
        element(by.css('[class="form-control"]')).sendKeys(absolutePath);  
        browser.sleep(2000);
        this.clickSubmit();*/
    }, 
};