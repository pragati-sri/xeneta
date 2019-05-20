'use strict';
module.exports = {  
    fingerprint: {  
        fingerprintTab: element(by.linkText('Fingerprints')), 
        rowCount: element.all(by.css('[role="row"]')),
        //nodeName is a sortable coloumn, keeps changing between sorting_asc and sorting_desc, but on every fresh reload by default the class name is sorting_asc.
        nodeName: element(by.cssContainingText('.fingerprint-node-name.sorting_asc', 'Name')), 
        //only counts coloumns contining fingerprints
        colCount: element.all(by.className('vectus-fingerprint-td sorting')),
    },  
      
    clickFingerprintTab: function(item) {  
        var fingerprint = this.fingerprint;   
        fingerprint.fingerprintTab.click();  
    }, 

    countVectusNodes: function(item) {  
        var fingerprint = this.fingerprint;   
        expect(fingerprint.rowCount.count()).toBeGreaterThanOrEqual(11);
        //check node name coloumn is present
        expect(fingerprint.nodeName.isPresent()).toBe(true);
        //check presence of all fingerprint coloumns
        expect(fingerprint.colCount.count()).toBe(8);
        //check sorting functionality
        
    }, 
};