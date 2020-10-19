'use strict';
module.exports = {  
    career_page_buttons: {   
        decline_cookies_button: element(by.id('hs-eu-decline-button')), 
        schedule_demo_button: element(by.css('[title="Schedule Online"]')),
        watch_video_button: element(by.css('[title="Watch Now"]')),
        close_button: element(by.css('[class="leadinModal-close"]')),
        server_exception: element(by.linkText('Server exception')),
        open_application: element(by.cssContainingText('.acdn-heading', 'Open application')),
        apply_here_href: element(by.tagName('a')),
        //vacancies_total: element.all(by.cssContainingText('.section-heading align-center', 'Open roles')).count(),
        
    },
    
    openXenetaCareerPage: function(){
        browser.get('https://www.xeneta.com/careers');
    },

    declineCookies: function(){
        var button_ele = this.career_page_buttons;
        button_ele.decline_cookies_button.click();
    },
    //schedule demo online functions
    clickOpenApplication: function(){
        var button_ele = this.career_page_buttons;
        browser.actions().sendKeys(protractor.Key.END).perform();
        browser.sleep(3000);
        button_ele.close_button.click();
        browser.sleep(3000);
        button_ele.open_application.click();
        browser.sleep(3000);
    },
    clickApplyHere: function(){
        var button_ele = this.career_page_buttons;
        browser.executeScript("arguments[0].scrollIntoView();", button_ele.apply_here_href);
        browser.sleep(3000);
        button_ele.apply_here_href.click();
    },

    checkApplyHereRedirect: function(){
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