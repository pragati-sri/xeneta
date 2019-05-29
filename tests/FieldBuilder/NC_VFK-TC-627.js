var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var fingerprint = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectFingerprint');

describe('VFK-TC-627', function(){
    /*
    #15900 Verify that it is possible to generate a CDB fingerprint comparision report as a USER.   
    */
 
     it('should check CDB Fingerprint', function(){
        toDoPage.go();
        //browser.sleep(3000);
        toDoPage.clickFieldName();
        //browser.sleep(3000);
        fingerprint.clickFingerprintTab();
        browser.sleep(3000);
        fingerprint.countVectusNodes();
        
    });
});