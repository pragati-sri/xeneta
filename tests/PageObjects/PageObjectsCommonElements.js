var path = require("path");
'use strict';
module.exports = {  
    buttons: {  
        save_button: element(by.css('[ng-click="saveMap()"]')),
        reset_button: element(by.css('[ng-click="resetMap()"]')),
        ok_button: element(by.id('confirmOkBtn')),
        submit_button: element(by.buttonText('Submit')),
        edit_button: element(by.css('[fms-icon="edit"]')),
        add_button: element(by.css('[fms-icon="add"]')),
        cancel_button: element(by.css('[type="reset"]')),
        delete_button: element.all(by.css('[fms-icon="delete"]')),
    },    

    dialogueBoxElements:{
        id: element(by.id('vectusId')),
        description: element(by.css('[name="fileUploadForm-description"]')).parentElementArrayFinder,
        definition: element(by.css('[name="definitionId"]')),
        profile: element.all(by.cssContainingText('option', 'zzprofile1')),
        protocol: element.all(by.cssContainingText('option', 'Siis Level 2')),
        name: element(by.css('[name="fileUploadForm-name"]')).parentElementArrayFinder,
        type: element(by.css('[name="instrumentType"]')),
        select_file: element(by.className('glyphicon glyphicon-folder-open')).parentElementArrayFinder,

    },
      
    clicksave: function(item) {
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
    clickDelete_first: function(item) {  
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.delete_button.get(first).click();
    },
    clickDelete_last: function(item) {  
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.delete_button.get(last).click();
    },

    insertName: function(name) {  
        var dialogueBox_ele = this.dialogueBoxElements;
        dialogueBox_ele.name.sendKeys(name);
    },
    insertDescription: function(description) {  
        var dialogueBox_ele = this.dialogueBoxElements;
        dialogueBox_ele.description.sendKeys(description);
    },
    insertFile: function(file_to_upload) {  
        var dialogueBox_ele = this.dialogueBoxElements;
        absolutePath = path.resolve(__dirname, file_to_upload);
        element(by.css('input[type="file"]')).sendKeys(absolutePath);
    },

};