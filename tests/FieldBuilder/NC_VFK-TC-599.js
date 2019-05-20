var toDoPage = require('../PageObjects/FieldBuilder/PageObjectHome'); 
var instrument = require('../PageObjects/FieldBuilder/PageObjectIstruments');

describe('VFK-TC-599', function(){
    /*
    #2647 Verify if audit log contains a property with the current project DB name.  
    */
 
     it('should check audit log', function(){
        toDoPage.go_admin();
        toDoPage.openField();
        

    });
});