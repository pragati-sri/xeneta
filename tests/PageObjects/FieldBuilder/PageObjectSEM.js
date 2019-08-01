'use strict';
module.exports = {  
    fieldElements:{
        SEM_rep_cdb: element(by.linkText('rep_cdb')),
        SEM_A: element(by.id('5bd9aff5e22e8203adf73612_anchor')),
        replace_cdb: element.all(by.css('[fms-icon="replace"]')).get(1),
        select_from_template: element(by.linkText('Select from templates')),
        template_list: element(by.id('cdbSelect')),
        save_cdb: element.all(by.css('[ng-click="cdbCtrl.setCdbFromTemplate()"]')),
        reset_button: element(by.css('[ng-click="resetMap()"]')),
        ok_button: element(by.id('confirmOkBtn')),
        submit_button: element(by.id('submit')),
        node_id: element(by.css('[key="Node id"]')),
        users_list: element.all(by.css('[ng-repeat="user in currentNode.node.vectus.users"]')),
        SEM_edit: element(by.css('[title="Edit properties"]')),
        SEM_name: element(by.id('name')),
        SEM_SaveasTemplate: element(by.css('[fms-icon="copy"]')),
        CDB_Template: element(by.id('nav-cdbTemplate-link')),
        AAA_test_template: element(by.cssContainingText('.ng-binding.ng-scope', 'AAA_test_template')),
        delete_button: element.all(by.css('[fms-icon="delete"]')).get(0),
        SRM_A: element(by.id('5bd9a502e22e8203adf735a0_anchor')),
        new_Sem: element(by.css('[title="A Subsea Electronics module"]')),
        write_name: element(by.id('name')),
        edit_cdb_button: element.all(by.css('[fms-icon="edit"]')),

    },
    editCdbTemplate: function(item) {  
        var field_elements = this.fieldElements;  
        field_elements.SEM_rep_cdb.click();
        browser.sleep(2000);
        field_elements.replace_cdb.click();
        browser.sleep(2000);
        field_elements.select_from_template.click();
        browser.sleep(2000);
        field_elements.template_list.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        browser.sleep(2000);
        field_elements.save_cdb.click();
        browser.sleep(2000);
        field_elements.ok_button.click();
        browser.sleep(2000);
    },
    replaceCdbTemplate: function(item) {  
        var field_elements = this.fieldElements;  
        field_elements.SEM_rep_cdb.click();
        field_elements.replace_cdb.click();
        field_elements.select_from_template.click();
        field_elements.template_list.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        field_elements.save_cdb.click();
        field_elements.ok_button.click();
        //check cdb details after replacing cdb
        expect(field_elements.node_id.getText()).toContain('XT_1_SCM_SEM_A');
        expect(field_elements.users_list.count()).toBe(4);
    },
    editSemName: function(item) {  
        var field_elements = this.fieldElements;  
        browser.actions().click(field_elements.SEM_A, protractor.Button.RIGHT).perform();
        field_elements.SEM_edit.click();
        field_elements.SEM_name.sendKeys('ø');
        field_elements.submit_button.click();
        //check name is changed correctly
        browser.refresh();
        expect(field_elements.SEM_A.getText()).toContain('ø');
        //change name back to SEM_A
        browser.actions().click(field_elements.SEM_A, protractor.Button.RIGHT).perform();
        field_elements.SEM_edit.click();
        field_elements.SEM_name.clear().sendKeys('SEM_A');
        field_elements.submit_button.click();  
    },
    setCdbasTemplate: function(item) {  
        var field_elements = this.fieldElements;  
        field_elements.SEM_A.click();
        field_elements.SEM_SaveasTemplate.click();
        browser.sleep(2000);
        field_elements.SEM_name.sendKeys('AAA_test_template');
        field_elements.submit_button.click();
        browser.sleep(2000);  
        field_elements.CDB_Template.click();
        browser.sleep(2000); 
        //check template is created
        expect(field_elements.AAA_test_template.isPresent()).toBe(true);
        browser.sleep(2000);
        //delete created template
        field_elements.delete_button.click();
        browser.sleep(2000); 
        field_elements.ok_button.click();
        browser.sleep(2000); 
    },
    warningTeardown: function(item) {  
        var field_elements = this.fieldElements;  
        field_elements.SEM_rep_cdb.click();
        field_elements.replace_cdb.click();
        field_elements.select_from_template.click();
        field_elements.template_list.click().sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ARROW_DOWN).sendKeys(protractor.Key.ENTER);
        field_elements.save_cdb.click();
        field_elements.ok_button.click();
    },
    clickSem_A: function(item) {  
        var field_elements = this.fieldElements;
        field_elements.SEM_A.click(); 

    },
    clickEditCdb: function(item) {  
        var field_elements = this.fieldElements;
        field_elements.edit_cdb_button.click();
    },
};