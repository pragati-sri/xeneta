'use strict';
module.exports = {  
    instrumentButtons:{
        save_button: element(by.css('[ng-click="saveMap()"]')),
        reset_button: element(by.css('[ng-click="resetMap()"]')),
        ok_button: element(by.id('confirmOkBtn')),
        submit_button: element(by.id('submit')),
        edit_button: element(by.css('[fms-icon="edit"]')),
        add_button: element(by.css('[fms-icon="add"]')),
    },
    mappingElements:{
        mappings: element(by.linkText('Mappings')),
        modbus_mapping: element(by.tagName('em')),
        general: element(by.linkText('General')),
        mapping_mastering_config: element(by.linkText('Mastering Config')),
        reset_command: element(by.css('[name="Mastering Config reset command"]')),
    },
    definitionElements:{
        definitions: element(by.linkText('Definitions')),
    },
    profileElements:{
        profile: element(by.linkText('Profiles')),
        profile1: element(by.linkText('profile1 [1]')),
    },
    //when creating a new profile/definition/mapping
    dialogueBoxElements:{
        id: element(by.id('vectusId')),
        description: element(by.css('[name="description"]')),
        definition: element(by.css('[name="definitionId"]')),
        profile: element.all(by.css('[name="profileId"]')).last(),
        protocol: element(by.css('[name="protocol"]')),
        name: element(by.css('[name="name"]')),
        type: element(by.css('[name="instrumentType"]')),

    },

//button functions
    save: function(item) {
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.save_button.click();
    },
    clickSubmit: function(item) {  
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.submit_button.click();
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
        var instrument_buttons = this.instrumentButtons;
        instrument_buttons.add_button.click();
    },


//mapping functions
    openMappings: function(item) {  
        var mapping_elements = this.mappingElements;   
        mapping_elements.mappings.click();  
    },
    openModbusMappings: function(item) {  
        var mapping_elements = this.mappingElements;    
        mapping_elements.modbus_mapping.click();
    },
    openMasteringConfig: function(item) {  
        var mapping_elements = this.mappingElements;   
        mapping_elements.mapping_mastering_config.click();
    },
    resetResetCommand: function(item){
        var mapping_elements = this.mappingElements;
        mapping_elements.reset_command.click().clear();
        this.clickReset();
        this.clickOk();
    },
    clearResetCommand: function(item){
        var mapping_elements = this.mappingElements;
        mapping_elements.reset_command.click().clear();
        this.save();
    },
    changeMappingName: function(item) { 
        browser.sleep(2000); 
        var mapping_elements = this.mappingElements;   
        mapping_elements.mappings.click();
        browser.sleep(1000);
        mapping_elements.modbus_mapping.click();
        browser.sleep(1000);
        mapping_elements.general.click();
    },
    createNewMapping: function(item) {    
        this.clickAdd();
        this.dialogueBoxElements.id.sendKeys(1);
        this.dialogueBoxElements.description.sendKeys('bla');
        browser.sleep(2000);
        this.dialogueBoxElements.definition.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
        this.dialogueBoxElements.profile.click();
        browser.sleep(2000);
        //this.clickSubmit();
    },

//definition functions

    openDefinitions: function(item) {  
        var definition_elements = this.definitionElements;   
        definition_elements.definitions.click();
    },

    changeDefinitionName: function(item) {  
        browser.sleep(2000);
        var definition_elements = this.definitionElements;   
        definition_elements.definitions.click();
        browser.sleep(1000);
        this.clickEdit();
    },

//profile functions
    openProfiles: function(item) {  
        var profile_elements = this.profileElements;   
        profile_elements.profile.click();  
    },

    changeProfileName: function(item) {  
        browser.sleep(2000);
        var profile_elements = this.profileElements;   
        profile_elements.profile.click();
        browser.sleep(1000);
        this.clickEdit();
    },
    createNewProfile: function(item) {  
        this.clickAdd();
        this.dialogueBoxElements.id.sendKeys(1);
        this.dialogueBoxElements.name.sendKeys('profile1');
        this.dialogueBoxElements.type.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        this.dialogueBoxElements.description.sendKeys('bla');
        this.clickSubmit();

    },
};