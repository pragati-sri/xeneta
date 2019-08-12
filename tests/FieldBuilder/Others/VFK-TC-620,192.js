var cloud = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectCloud');
var toDoPage = require('c:/Verification/practice protractor_21feb/tests/PageObjects/FieldBuilder/PageObjectHome');

describe('VFK-TC-620 and VFK-TC-192', function(){
   /*
   #17417 Verify that IP addresses in FieldBuilder are in standard format without '0' padding 
   #4714 Verify that it is possible to see the IP address of a SEM6 
   */

    it('should check ip address', function(){
        browser.ignoreSynchronization = true;
        toDoPage.go_cloud_pragatis_project();
        browser.sleep(2000); 
        browser.driver.manage().window().maximize();
        browser.sleep(2000); 
        cloud.login_fbuser();
        var field_user = element.all(by.css('[fms-icon="goto"]')).get(1);
        field_user.click();
        browser.sleep(2000);
        element(by.id('5bd9aff5e22e8203adf73612_anchor')).click();
        browser.sleep(2000);
        element(by.css('[fms-icon="edit"]')).click();
        browser.driver.sleep(20000);
        browser.driver.findElement(by.id('Node_anchor')).click();
        browser.driver.sleep(2000);
        browser.driver.findElement(by.linkText('PrimaryInterface')).click();
        browser.sleep(2000);
        browser.driver.findElement(by.css('[fms-icon="edit"]')).click();
        browser.sleep(2000);

        var ip = browser.driver.findElement(by.css('[name="ipAddress"]'))
        browser.sleep(2000);
        ip.clear();
        browser.sleep(2000);
        ip.sendKeys('192.168.010.001');
        browser.sleep(2000);

        var subnetMask = browser.driver.findElement(by.css('[name="subnetMask"]'))
        browser.sleep(2000);
        subnetMask.clear();
        browser.sleep(2000);
        subnetMask.sendKeys('255.255.255.0');
        browser.sleep(2000);

        var gateway = browser.driver.findElement(by.css('[name="gateway"]'))
        browser.sleep(2000);
        gateway.clear();
        browser.sleep(2000);
        gateway.sendKeys('192.168.10.11');
        browser.sleep(2000);

        browser.driver.findElement(by.css('[data-ng-click="save(editForm)"]')).click();
        browser.sleep(2000);
        browser.driver.findElement(by.css('[ng-click="save()"]')).click();
        browser.sleep(2000);
        browser.driver.findElement(by.id('confirmOkBtn')).click();
        browser.sleep(2000);
        var ip_address = element(by.css('[key="IP address"]')).getText();
        expect(ip_address).toContain('192.168.10.1');
        browser.sleep(2000);
        toDoPage.logout_cloud();
        browser.sleep(2000);
    });
});

