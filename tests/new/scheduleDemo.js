var demoPage = require('./demoPageObject');

describe('xeneta_demo', function(){
    /*
    #DRS2.1 Should be possible to Schedule a demo 
    */
 
     it('should check schedule now', function(){
        browser.ignoreSynchronization = true;
        demoPage.openXenetaDemoPage();
        browser.sleep(4000);
        demoPage.declineCookies();
        browser.sleep(5000);
        demoPage.clickScheduleNow();
        browser.sleep(6000);
        demoPage.checkScheduleNowPage();
        browser.sleep(3000);
 });
        
});
