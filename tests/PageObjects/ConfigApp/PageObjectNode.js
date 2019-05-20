'use strict';
module.exports = {  
    nodeElements: {  
        vectus: element(by.id('Vectus_anchor')),
        node: element(by.id('Node_anchor')),
    },

    communicationElements: {  
        communication: element(by.id('Communication_anchor')),
        communication_engine: element(by.buttonText('CommunicationEngine')),
        router: element(by.linkText('Router')),
        arp: element(by.linkText('Arp')),
        static_arp_button: element(by.buttonText('StaticArp')),
        //static_arp_instance: element(by.css('[ng-class="{active: tableConfig.select.map[instance.id]}"]')),
        static_arp_instance: element(by.cssContainingText('.ng-binding.ng-scope', '192.168.10.101')),
    },

    faultManagementElements: {  
        fault_management: element(by.linkText('FaultManagement')),
        notif_subscriber_button: element(by.buttonText('NotificationSubscriber'))
    },

    buttons: {  
        add_button: element(by.css('[fms-icon="add"]')),
        cancel_button: element(by.buttonText('Cancel')),
        submit_button: element(by.buttonText('Submit')),
        navigate_to: element.all(by.css('[fms-icon="goto"]')).last(),
        delete_button: element(by.css('[fms-icon="delete"]')),
        ok_button: element(by.id('confirmOkBtn')),
    },

    dialogBox: {  
        description: element(by.css('[name="description"]')),
        ipAdd: element(by.css('[name="ipAddress"]')),
        macAdd: element(by.css('[name="macAddress"]')),
        ipInterface: element(by.css('[name="ipInterface"]')),
        port: element(by.css('[name="port"]')),
    },

    clickAddButton: function(){
        var button_ele = this.buttons;
        button_ele.add_button.click();
    },

    clickCancelButton: function(){
        var button_ele = this.buttons;
        button_ele.cancel_button.click();
    },

    clickSubmitButton: function(){
        var button_ele = this.buttons;
        button_ele.submit_button.click();
    },

    clickDeleteButton: function(){
        var button_ele = this.buttons;
        button_ele.delete_button.click();
    },


    clickNavigateTo: function(){
        var button_ele = this.buttons;
        button_ele.navigate_to.click();
    },

    clickOkButton: function(){
        var button_ele = this.buttons;
        button_ele.ok_button.click();
    },

    navigateNotificationSubscriber: function() { 
        var node_ele = this.nodeElements;
        node_ele.node.click();
        browser.sleep(2000);
        var fault_mgmt_ele =this.faultManagementElements;
        fault_mgmt_ele.fault_management.click();
        browser.sleep(2000);
        fault_mgmt_ele.notif_subscriber_button.click();
        browser.sleep(2000);
    },  
    
    //Checks if new instance of notification subscription has empty initial values
    checkNewNotifSubsInstance: function() { 
        this.clickAddButton();
        var dialog_box_ele = this.dialogBox;
        browser.sleep(2000);
        //expects fields to be empty
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.textToBePresentInElementValue(dialog_box_ele.ipAdd, ''), 1000);
        browser.wait(EC.textToBePresentInElementValue(dialog_box_ele.port, ''), 1000);
        browser.wait(EC.textToBePresentInElementValue(dialog_box_ele.description, ''), 1000);
        browser.sleep(2000);
        this.clickCancelButton();
    },  

    //Add new StaticArp instance
    AddNewStaticArp: function() {
        var node_ele = this.nodeElements;
        node_ele.vectus.click();
        var communication_ele = this.communicationElements;
        communication_ele.communication.click();
        browser.sleep(2000);
        communication_ele.communication_engine.click();
        browser.sleep(2000);
        this.clickNavigateTo();
        browser.sleep(2000);
        communication_ele.router.click();
        browser.sleep(2000);
        communication_ele.arp.click();
        browser.sleep(2000);
        communication_ele.static_arp_button.click();
        browser.sleep(2000);
        this.clickAddButton();
        var dialog_box_ele = this.dialogBox;
        browser.sleep(2000);
        //expects fields to be empty
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.textToBePresentInElementValue(dialog_box_ele.ipAdd, ''), 1000);
        browser.wait(EC.textToBePresentInElementValue(dialog_box_ele.macAdd, ''), 1000);
        //expects ipInterface to contain initial value
        browser.wait(EC.textToBePresentInElementValue(dialog_box_ele.ipInterface, ''), 1000);
        browser.sleep(2000);
        dialog_box_ele.ipAdd.sendKeys('192.168.10.101');
        browser.sleep(2000);
        dialog_box_ele.macAdd.sendKeys('00:00:5E:00:01:01');
        browser.sleep(2000);
        dialog_box_ele.ipInterface.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
        this.clickSubmitButton();
        browser.sleep(2000);
        //verify instance is listed
        expect(communication_ele.static_arp_instance.isPresent()).toBe(true);
    },  
    TeardownNewStaticArp: function() {
        this.clickDeleteButton();
        browser.sleep(2000);
        this.clickOkButton();
        browser.sleep(2000);
    },
};