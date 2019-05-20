var toDoPage = require('../PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('../PageObjects/FieldBuilder/PageObjectSEM');

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