var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud'); 
var tempPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCDBTemp');

describe('VFK-TC-696', function(){
    /*
    #19828 As ADMINISTRATOR I must be able to update CDB templates in shared repo 
    */
 
     it('should update CDB Temp in shared repo', function(){
        //selecting CDB template
        browser.ignoreSynchronization = true;
        browser.sleep(3000);
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        cloud.login_corporate();
        browser.sleep(2000);
        tempPage.cdbTempSharedRepo();
        browser.sleep(4000); 
        tempPage.createCDBTemplate();
        browser.sleep(2000);
        //tempPage.deleteCDBTemplate();
        /*element.all(by.css('[fms-icon="delete"]')).get(last).click();
        browser.sleep(2000);*/
    });
});