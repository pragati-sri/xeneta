'use strict';
module.exports = {  
    demo_page_buttons: {   
        decline_cookies_button: element(by.id('hs-eu-decline-button')), 
        schedule_demo_button: element(by.css('[title="Schedule Online"]')),
        watch_video_button: element(by.css('[title="Watch Now"]')),
        close_button: element(by.css('[class="leadinModal-close"]')),
        server_exception: element(by.linkText('Server exception')),
    },
    
    openXenetaDemoPage: function(){
        browser.get('https://www.xeneta.com/demo');
    },

    declineCookies: function(){
        var button_ele = this.demo_page_buttons;
        button_ele.decline_cookies_button.click();
    },
    //schedule demo online functions
    clickScheduleNow: function(){
        var button_ele = this.demo_page_buttons;
        browser.executeScript("arguments[0].scrollIntoView();", button_ele.schedule_demo_button);
        browser.sleep(3000);
        button_ele.close_button.click()
        browser.sleep(3000);
        button_ele.schedule_demo_button.click();
    },
    checkScheduleNowPage: function(){
        browser.getAllWindowHandles().then(function (handles) {
            var newWindowHandle = handles[1]; // this is the new window
            browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.driver.getCurrentUrl()).toContain('https://www.xeneta.com/scheduledemo?')
            });
        });
    },
    // Watch Video functions
    clickWatchNow: function(){
        var button_ele = this.demo_page_buttons;
        browser.executeScript("arguments[0].scrollIntoView();", button_ele.watch_video_button);
        browser.sleep(3000);
        button_ele.close_button.click()
        browser.sleep(3000);
        button_ele.watch_video_button.click();
    },
    checkWatchNowPage: function(){
        expect(browser.driver.getCurrentUrl()).toContain('https://www.xeneta.com/watchdemosignup')
    },
};