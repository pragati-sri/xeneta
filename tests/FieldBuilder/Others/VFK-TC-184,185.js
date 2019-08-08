describe('VFK-TC-184 & VFK-TC-185', function(){
    /*
    #4431-3 The user must be able to delete a scan group
    #4431-4 Scan groups must be part of XML instrument mapping  
    */
 
     it('should delete a scan group', function(){
        //First creating a scan group 
        browser.ignoreSynchronization = true;
        browser.get('https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field/5bd99cc4e22e8203adf73592/node');
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        element(by.id('username')).sendKeys('fbuser');
        element(by.id('password')).sendKeys('OS1G[\'c9HTg?=@[j)O:[');
        browser.sleep(2000);
        element(by.buttonText('Sign In')).click();
        browser.driver.navigate().refresh();
        browser.sleep(2000);
        element(by.cssContainingText('.dropdown-toggle', 'Instrument')).click();
        browser.sleep(2000);
        element(by.linkText('Mappings')).click();
        browser.sleep(2000);
        element(by.tagName('em')).click();
        browser.sleep(2000);
        element.all(by.tagName('tab-heading')).get(3).click();
        browser.sleep(2000);
        element.all(by.tagName('mapping-scan-group-add-btn')).click();
        browser.sleep(2000);
        element(by.css('[ng-model="group.start"]')).sendKeys('21').sendKeys(protractor.Key.TAB);
        browser.sleep(2000);
        element(by.css('[ng-model="group.quantity"]')).sendKeys('100').sendKeys(protractor.Key.TAB);
        browser.sleep(2000);
        element(by.css('[ng-model="group.scanRate"]')).sendKeys('1100').sendKeys(protractor.Key.TAB);
        browser.sleep(2000);
        element(by.css('[ng-model="group.function"]')).sendKeys(protractor.Key.ENTER).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
        element(by.css('[ng-click="saveMap()"]')).click();
        browser.sleep(4000);

        //Checking scan group in xml mapping
        //element(by.css('[fms-icon="view"]')).click();
        //browser.ignoreSynchronisation = true;
        //var scan = browser.driver.findElement(by.cssContainingText('.html-tag', '<scan-group'));
        //expect(scan).toContain('start');
        //ADD LOGIC
        //browser.ignoreSynchronisation = false;
        //browser.sleep(2000);
        //browser.navigate().back();

        //Deleting the scan group
        //check reset button is working 
        //element.all(by.tagName('tab-heading')).get(3).click();
        element(by.xpath('//*[@id="mappingContentFormId"]/div[1]/div/div[4]/mapping-scan-group/fieldset/mapping-scan-group-modbus/div/table/tbody/tr/td[1]/mapping-scan-group-delete-btn/fms-icon-button/div/button/span')).click();
        browser.sleep(2000);
        element(by.css('[ng-click="resetMap()"]')).click();
        element(by.css('[ng-click="ok()"]')).click();
        var scan_group = element(by.css('[ng-model="group.start"]'));
        expect(scan_group.isPresent()).toBe(true);
        browser.sleep(2000);

        //check save button is working
        element(by.xpath('//*[@id="mappingContentFormId"]/div[1]/div/div[4]/mapping-scan-group/fieldset/mapping-scan-group-modbus/div/table/tbody/tr/td[1]/mapping-scan-group-delete-btn/fms-icon-button/div/button/span')).click();
        element(by.css('[ng-click="saveMap()"]')).click();
        expect(scan_group.isPresent()).toBe(false);
        browser.sleep(2000);

        //check warning when no scan group present
        var warning = element.all(by.css('[fms-icon="warn"]')).get(1);
        expect(warning.isPresent()).toBe(true);
        browser.sleep(2000);
        browser.get('https://test.fieldbuilder.ix3.com/oauth2/sign_out');
        browser.sleep(2000);
    });
});
