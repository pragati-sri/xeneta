var toDoPage = require('../PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('../PageObjects/FieldBuilder/PageObjectSEM');

describe('VFK-TC-212', function(){
    /*
    #5319 (BUG) Verify that norwegian characters are working on stage/demo 
    */
 
     it('should check norwegian characters', function(){
        //selecting CDB template
        toDoPage.go();
        toDoPage.openField();
        //appends norwegian character to node name, then reverts changes
        semPage.editSemName();
        //apply for node name as well
        

    });
});