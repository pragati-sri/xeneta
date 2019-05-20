var path = require("path");
var ctime = require("../ConfigApp/currentTimestamp");
'use strict';
module.exports = {  
    CDB_management: {    
        CDB_tab: element(by.linkText('CDB Management')),
        Uncommited_cdb: element(by.cssContainingText('.ng-binding', 'UNCOMMITTED')),
        Commit_cdb: element(by.className('glyphicon glyphicon-floppy-save')),
        Commited_cdb: element(by.cssContainingText('.ng-binding', 'COMMITTED')),
    }, 

    operations: {    
        running_to_default: element(by.buttonText('Copy Running to Project Default')),
        default_to_running: element(by.buttonText('Copy Project Default to Running')),
    },

    running_CDB: {   
        filesize: element.all(by.className('clearfix ng-binding')).first(),
        status_stable: element.all(by.className('clearfix ng-binding')).get(1),
        modified: element.all(by.className('clearfix ng-binding')).get(2),
        fingerprint: element.all(by.className('clearfix ng-binding')).get(3),
    },

    restore_CDB: {    
        restore_radio: element.all(by.css('[type="radio"]')),
        status_empty: element.all(by.tagName('em')),
        filesize: element.all(by.className('clearfix ng-binding')).get(5),
        status_stable: element.all(by.className('clearfix ng-binding')).get(6),
    },

    project_default_CDB: {    
        status_empty: element.all(by.tagName('em')).get(1),
        filesize: element.all(by.className('clearfix ng-binding')).get(5),
        status_stable: element.all(by.className('clearfix ng-binding')).get(6),
        modified: element.all(by.className('clearfix ng-binding')).get(7),
        fingerprint: element.all(by.className('clearfix ng-binding')).get(8),
    },

    standby_CDB: {    
        standby_radio: element.all(by.css('[type="radio"]')).get(1),
        status_empty: element.all(by.tagName('em')).last(),
        filesize: element.all(by.className('clearfix ng-binding')).get(5),
        status_stable: element.all(by.className('clearfix ng-binding')).get(6),
    },

    buttons: {  
        upload_button: element(by.buttonText('Upload')), 
        delete_button: element.all(by.css('[fms-icon="delete"]')).last(),
        ok_button: element(by.id('confirmOkBtn')),
    },

    uploadStandbyCDB: function(){
        var CDB_ele = this.CDB_management;
        var standby_ele = this.standby_CDB;
        var button_ele = this.buttons;
        CDB_ele.CDB_tab.click();
        browser.sleep(2000);
        standby_ele.standby_radio.click();
        browser.sleep(2000);
        //upload cdb file
        var fileToUpload = 'C:/Users/326952/Downloads/cdb.tgz',
        absolutePath = path.resolve(__dirname, fileToUpload);
        element(by.css('input[type="file"]')).sendKeys(absolutePath);
        browser.sleep(2000);
        button_ele.upload_button.click();
        browser.sleep(2000);
        //verify filesize and status of CDB upload
        expect(standby_ele.filesize.getText()).toBeGreaterThan(0);
        browser.sleep(2000);
        expect(standby_ele.status_stable.getText()).toContain('STABLE');
        browser.sleep(2000);
    },

    deleteStandbyCDB: function(){
        var standby_ele = this.standby_CDB;
        var button_ele = this.buttons;
        button_ele.delete_button.click();
        browser.sleep(2000);
        button_ele.ok_button.click();
        browser.sleep(2000);
        //verify standby CDB deletion
        expect(standby_ele.status_empty.getText()).toContain('No content');
        browser.sleep(2000);
    },

    uploadRestoreCDB: function(){
        var CDB_ele = this.CDB_management;
        var restore_ele = this.restore_CDB;
        var button_ele = this.buttons;
        CDB_ele.CDB_tab.click();
        browser.sleep(2000);
        //restore_ele.restore_radio.click();
        //browser.sleep(2000);

        //upload cdb file
        var fileToUpload = 'C:/Users/326952/Downloads/cdb.tgz',
        absolutePath = path.resolve(__dirname, fileToUpload);
        element(by.css('input[type="file"]')).sendKeys(absolutePath);
        browser.sleep(2000);
        button_ele.upload_button.click();
        browser.sleep(2000);
        //verify filesize and status of CDB upload
        expect(restore_ele.filesize.getText()).toBeGreaterThan(0);
        browser.sleep(2000);
        expect(restore_ele.status_stable.getText()).toContain('STABLE');
        browser.sleep(2000);
    },

    deleteRestoreCDB: function(){
        var restore_ele = this.restore_CDB;
        var button_ele = this.buttons;
        button_ele.delete_button.click();
        browser.sleep(2000);
        button_ele.ok_button.click();
        browser.sleep(2000);
        //verify restore CDB deletion
        expect(restore_ele.status_empty.getText()).toContain('No content');
        browser.sleep(2000);
    },

    copyRunningToDefault: function(){
        var CDB_ele = this.CDB_management;
        var running_ele = this.running_CDB;
        var operations_ele = this.operations;
        var default_ele = this.project_default_CDB;
        var button_ele = this.buttons;
        //var cTime = this.calculateCurrrentTimestamp;
        CDB_ele.CDB_tab.click();
        browser.sleep(2000);
        //check status of running cdb
        expect(running_ele.status_stable.getText()).toContain('STABLE');
        browser.sleep(2000);
        //copy running to default
        operations_ele.running_to_default.click();
        browser.sleep(2000);
        button_ele.ok_button.click();
        browser.sleep(4000);
        //verify copy to default
        expect(default_ele.filesize.getText()).toBeGreaterThan(0);
        browser.sleep(2000);
        expect(default_ele.status_stable.getText()).toContain('STABLE');
        browser.sleep(2000);
    },

    copyDeafaultToRunning: function(){
        var CDB_ele = this.CDB_management;
        var operations_ele = this.operations;
        var button_ele = this.buttons;
        CDB_ele.CDB_tab.click();
        browser.sleep(2000);
        //copy default to running
        operations_ele.default_to_running.click();
        browser.sleep(2000);
        button_ele.ok_button.click();
        //handle vectus restart
        browser.sleep(100000);
    },

    verifyRunningCDB: function(){
        var running_ele = this.running_CDB;
        var default_ele = this.project_default_CDB;
        //verify copy to running(size,fingerprint,timestamp)
        expect(running_ele.filesize.getText()).toBe(default_ele.filesize.getText());
        browser.sleep(2000);
        expect(running_ele.status_stable.getText()).toContain('STABLE');
        browser.sleep(2000);
        expect(running_ele.fingerprint.getText()).toBe(default_ele.fingerprint.getText());
        browser.sleep(2000);
        expect(running_ele.modified.getText()).toContain(ctime.currentTimestamp());
    },

    deleteDefaultCDB: function(){
        var default_ele = this.project_default_CDB;
        var button_ele = this.buttons;
        button_ele.delete_button.click();
        browser.sleep(2000);
        button_ele.ok_button.click();
        browser.sleep(2000);
        //verify restore CDB deletion
        expect(default_ele.status_empty.getText()).toContain('No content');
        browser.sleep(2000);
    },

    commitCDB: function(){
        var CDB_ele = this.CDB_management;
        //verify CDB is uncommited
        expect(CDB_ele.Uncommited_cdb.isPresent()).toBe(true);
        browser.sleep(2000);
        CDB_ele.Commit_cdb.click();
        browser.sleep(5000);
        //verify CDB commit
        expect(CDB_ele.Commited_cdb.isPresent()).toBe(true);
        browser.sleep(2000);
    },
};