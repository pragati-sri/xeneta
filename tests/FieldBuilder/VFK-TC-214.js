var toDoPage = require('../PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('../PageObjects/FieldBuilder/PageObjectSEM');

describe('VFK-TC-214', function(){
    /*
    #2642 Verify that it is possible to save a node configuration as template 
    */
 
     it('should save CDB as template', function(){
        //selecting CDB template
        toDoPage.go();
        toDoPage.openField();
        //setCdbasTemplate saves template,checks new template, deletes template
        semPage.setCdbasTemplate(); 

    });
});