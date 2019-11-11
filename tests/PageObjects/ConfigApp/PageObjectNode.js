'use strict';
module.exports = {  
    nodeElements: {  
        vectus: element(by.id('Vectus_anchor')),
        node: element(by.id('Node_anchor')),
        //root_attr: element.all(by.className('show-hidden-on-hover ng-binding ng-scope')),
        root_attr: element.all(by.className('ng-binding')),
        goToParentRoot: element(by.css('[disabled="!resourceWrapper.$hasParent()"]')),
        goToParent: element(by.css('[fms-icon="up"]')),
        vectusList: element(by.linkText('Vectus list')),
        relation: element.all(by.css('[ng-repeat="aggregation in resourceWrapper.$singleAggregations() |orderBy:\'title\'"]')),
        mgmtProtocols: element(by.linkText('ManagementProtocols')),
        relations_tab: element(by.cssContainingText('.pull-left.panel-title', 'Relations')),
        scmp: element(by.linkText('Scmp')),
        rootDescription: element(by.css('[name="description"]')),
        rootDescriptionValue: element(by.css('[ng-if="prop.schema.type!=\'linked\'"]')),
        addVectusButton: element(by.css('[ng-click="vm.add()"]')),
        searchVectus: element(by.css('[ng-model="searchText"]')),
        deleteVectus: element(by.css('[tip="Delete Vectus"]')),
    },

    communicationElements: {  
        communication: element(by.id('Communication_anchor')),
        communication_engine: element(by.buttonText('CommunicationEngine')),
        //router: browser.element(by.css('[ng-click="followSingleAggregation(aggregation)"]')),
        router: element(by.linkText('Router')),
        arp: element(by.linkText('Arp')),
        static_arp_button: element(by.buttonText('StaticArp')),
        //static_arp_instance: element(by.css('[ng-class="{active: tableConfig.select.map[instance.id]}"]')),
        static_arp_instance: element(by.cssContainingText('.ng-binding.ng-scope', '192.168.10.101')),
    },

    faultManagementElements: {  
        fault_management: element(by.linkText('FaultManagement')),
        notif_subscriber_button: element(by.buttonText('NotificationSubscriber')),
    },

    buttons: {  
        add_button: element(by.css('[tip="Add new resource"]')),
        cancel_button: element(by.buttonText('Cancel')),
        submit_button: element(by.buttonText('Submit')),
        save_button: element(by.buttonText('Save')),
        navigate_to: element.all(by.css('[fms-icon="goto"]')),
        delete_button: element(by.css('[fms-icon="delete"]')),
        edit_button: element(by.css('[fms-icon="edit"]')),
        ok_button: element(by.id('confirmOkBtn')),
    },

    dialogBox: {  
        description: element(by.css('[name="description"]')),
        ipAdd: element(by.css('[name="ipAddress"]')),
        macAdd: element(by.css('[name="macAddress"]')),
        ipInterface: element(by.css('[name="ipInterface"]')),
        port: element(by.css('[name="port"]')),
        nameip: element(by.id('nameInput')),
        descriptionip: element(by.id('descriptionInput')),
        ipAddip: element(by.id('ipInput')),
        group: element(by.id('groupInput')),
    },

    /*clickAddButton: function(){
        var button_ele = this.buttons;
        button_ele.add_button.click();
    },*/

    clickCancelButton: function(){
        var button_ele = this.buttons;
        button_ele.cancel_button.click();
    },

    clickSubmitButton: function(){
        var button_ele = this.buttons;
        button_ele.submit_button.click();
    },

    clickSaveButton: function(){
        var button_ele = this.buttons;
        button_ele.save_button.click();
    },

    clickDeleteButton: function(){
        var button_ele = this.buttons;
        button_ele.delete_button.click();
    },
    clickEditButton: function(){
        var button_ele = this.buttons;
        button_ele.edit_button.click();
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
        //var button_ele = this.buttons;
        browser.sleep(2000);
        element.all(by.className('btn btn-link p-0')).get(3).click();
        //this.clickAddButton();
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
        browser.sleep(4000);
        communication_ele.router.click();
        browser.sleep(2000);
        communication_ele.arp.click();
        browser.sleep(2000);
        communication_ele.static_arp_button.click();
        browser.sleep(2000);
        element.all(by.className('btn btn-link p-0')).get(3).click();
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

    //ASIM browsing
    RootAttributesPresent: function() {
        var node_ele = this.nodeElements;
        var items = ['description','name','type'];
        for(var i=0; i<3; i++){
            expect(node_ele.root_attr.get(i).getText()).toBe(items[i]);
        }  
    },
        
    RootChildAggregations: function() {
        var node_ele = this.nodeElements;
        var items = ['Communication','Connections','Em','Instruments','ManagementProtocols','Node','Process'];
        //var items1= [];
        for(var i=0; i<7; i++){
            //items1.push(node_ele.relation.get(i).getText());
            expect(node_ele.relation.get(i).getText()).toBe(items[i]);
        }  
    },

    RootCheckParentLink: function() {
        var node_ele = this.nodeElements;
        expect(node_ele.goToParentRoot.isPresent()).toBe(true);
    },

    CheckVectusList: function() {
        var node_ele = this.nodeElements;
        expect(node_ele.vectusList.isPresent()).toBe(true);
    },
    NavigateManagementProtocols: function() {
        var node_ele = this.nodeElements;
        node_ele.mgmtProtocols.click();
        browser.sleep(2000);
        expect(node_ele.relations_tab.isPresent()).toBe(true);
        browser.sleep(2000);
    },
    NavigateScmp: function() {
        var node_ele = this.nodeElements;
        node_ele.scmp.click();
        browser.sleep(2000);
        expect(node_ele.relations_tab.isDisplayed()).toBe(false);
        browser.sleep(2000);
        var items = ['scmpVersion','nbrActiveConnections','nbrSupportedConnections','qosSetting','discoveryPort','managementPort'];
        for(var i=0; i<6; i++){
            expect(node_ele.root_attr.get(i).getText()).toBe(items[i]);
        }  
    },
    GoToParent: function() {
        var node_ele = this.nodeElements;
        node_ele.goToParent.click();
        browser.sleep(2000);
    },
    EmptyStringAttribute: function() {
        var node_ele = this.nodeElements;
        this.clickEditButton();
        browser.sleep(2000);
        node_ele.rootDescription.clear();
        this.clickSaveButton();
        browser.sleep(2000);
        //check description field is empty
        expect(node_ele.rootDescriptionValue.getText()).toEqual('');
        //repopulate description
        browser.sleep(2000);
        this.clickEditButton();
        node_ele.rootDescription.sendKeys('PT FMS2.2');
        browser.sleep(2000);
        this.clickSaveButton();
        browser.sleep(2000);
    },
    AddNewVectus: function() {
        var node_ele = this.nodeElements;
        var dialog_box_ele = this.dialogBox;
        node_ele.addVectusButton.click();
        browser.sleep(2000);
        dialog_box_ele.nameip.sendKeys('test add new sem1');
        dialog_box_ele.descriptionip.sendKeys('automation test');
        dialog_box_ele.ipAddip.sendKeys('139.145.75.203');
        this.clickSaveButton();
    },
    DeleteVectus: function() {
        var node_ele = this.nodeElements;
        node_ele.searchVectus.sendKeys('139.145.75.203');
        browser.sleep(5000);
        //this.clickDeleteButton();
        node_ele.deleteVectus.click();
        browser.sleep(2000);
        this.clickOkButton();
    },
    
};