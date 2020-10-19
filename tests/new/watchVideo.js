var demoPage = require('./demoPageObject');

describe('xeneta_demo', function(){
    /*
    #DRS2.1 Should be possible to Watch videos 
    */
 
     it('should check watch now', function(){
        browser.ignoreSynchronization = true;
        demoPage.openXenetaDemoPage();
        browser.sleep(4000);
        demoPage.declineCookies();
        browser.sleep(5000);
        demoPage.clickWatchNow();
        browser.sleep(6000);
        demoPage.checkWatchNowPage();
 });
        
});
