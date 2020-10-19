const { career_page_buttons } = require('./careersPageObject');
var careerPage = require('./careersPageObject');

describe('xeneta_careers', function(){
    /*
    #DRS2.1 Should be possible to see open roles
    */
 
     it('should check open roles', function(){
        browser.ignoreSynchronization = true;
        careerPage.openXenetaCareerPage();
        browser.sleep(3000);
        careerPage.declineCookies();
        browser.sleep(5000);
        careerPage.clickOpenApplication();
        browser.sleep(6000);
        careerPage.clickApplyHere();
        browser.sleep(3000);
 });
        
});