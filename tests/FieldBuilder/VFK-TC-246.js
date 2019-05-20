var toDoPage = require('../PageObjects/FieldBuilder/PageObjectHome'); 
var semPage = require('../PageObjects/FieldBuilder/PageObjectSEM');

describe('VFK-TC-246', function(){
    /*
    #5738 Verify that CDB or SW replace functionality is not possible when configapp is open.  
    */
 
     it('fb elements should be unclickable when configapp is opened', function(){
        toDoPage.go();
        toDoPage.openField();
        semPage.clickSem_A();
        semPage.clickEditCdb();

    });
});