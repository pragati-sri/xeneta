'use strict';
module.exports = {  
    toDo: {  
        clickField: element.all(by.css('[fms-icon="goto"]')).get(1),  
        clickFieldName: element(by.cssContainingText('.ng-binding', 'Automation')),
        instruments: element(by.className('dropdown-toggle')),
        definitions: element(by.linkText('Definitions')),
        profiles: element(by.linkText('Profiles')),
    },  
      
    go: function() {  
        browser.get('https://verif1:verifverif1@fms.no.enterdir.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field');  
        //browser.waitForAngular();  
    },  

    go_admin: function() {  
        browser.get('https://pragati:pragati123@fms.no.enterdir.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field');    
    }, 

    go_pt: function() {  
        browser.get('http://pragati:pragati123@fieldbuilder-pt-vm1/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field');  
        //browser.waitForAngular();  
    },

    go_cloud_pragatis_project: function() {  
        browser.get('https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field');  
        //browser.waitForAngular();  
    },

    corporate_creds_cloud(){  
        browser.get('https://test.fieldbuilder.ix3.com');  
        //browser.waitForAngular();  
    },

    logout_cloud(){  
        browser.get('https://test.fieldbuilder.ix3.com/oauth2/sign_out');    
    },
      
    openField: function(item) {  
        var todo = this.toDo;   
        todo.clickField.click();  
    },  

    clickFieldName: function(item) {  
        var todo = this.toDo;   
        todo.clickFieldName.click();  
    },

    clickInstrument: function(item) {  
        var todo = this.toDo;   
        todo.instruments.click();  
    }, 

};



