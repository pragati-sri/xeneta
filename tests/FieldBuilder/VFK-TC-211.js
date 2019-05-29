var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectSEM');

describe('VFK-TC-211', function(){
    /*
    #5026 Verify that it is possible to select a CDB Template for a SEM6 node   
    */
 
     it('should replace CDB', function(){
        //selecting CDB template
        toDoPage.go();
        toDoPage.openField();
        semPage.editCdbTemplate();
        //replacing CDB template and checking updated cdb details
        semPage.replaceCdbTemplate();

    });
});