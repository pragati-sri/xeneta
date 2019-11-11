var common = require('c:/Verification/practice protractor_21feb/tests/PageObjects/PageObjectsCommonElements');
'use strict';
module.exports = {  
    elements: {  
        Administration: element(by.id('nav-admin-link')),  
        shared_cdbTemp: element.all(by.linkText('CDB Templates')).get(1),
        Projects_tab: element(by.linkText('Projects')),
        add: element(by.css('[fms-icon="add"]')),  
    },  
      
    cdbTempSharedRepo: function() {  
        var ele = this.elements;
        ele.Administration.click();
        browser.sleep(4000);
        //ele.Projects_tab.click();
        ele.shared_cdbTemp.click();
        browser.sleep(6000);
        ele.add.click();
        browser.sleep(2000);
    },  
    createCDBTemplate: function() {  
        common.insertName('ztestCDBTemp');
        browser.sleep(2000);
        common.insertDescription('Revision 1');
        browser.sleep(2000);
        common.insertFile('C:/Verification/practice protractor_21feb/files/cdbTemp2.tgz');
        browser.sleep(2000);
        common.clickSubmit();
        browser.sleep(2000);
    },  
    deleteCDBTemplate: function() {  
        common.clickDelete_last();
    },  

};



