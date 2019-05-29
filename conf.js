//to enable jasmine-terminal reports
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
//to enable html reporting
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
exports.config ={  
    //capabilities for firefox
    /*capabilities: {
        'acceptInsecureCerts': true,
        'browserName': 'firefox',
        'moz:firefoxOptions': {
            'binary': 'C:/Program Files/Mozilla Firefox/firefox.exe',
            'args': ['--verbose']
        }
    },*/
    //to start protractor server directly                   
    directConnect: true,                           
    //capabilities for chrome 
    capabilities: {
        'acceptInsecureCerts': true,
        'chromeOnly': true,
        'directConnect': true,
        'browserName': 'chrome',
        chromeOptions: {
            //to run headless chrome
            args: [/*"--headless",*/"--disable-gpu", "--window-size=1920x1080"]
        }
    },
    seleniumAddress: 'http://localhost,:4444/wd/hub/',
    suites: {
        //for configApp
        Instruments: './tests/ConfigApp/Instruments/*.js',
        Users: './tests/ConfigApp/Users/*.js',
        CDBManagement: './tests/ConfigApp/CDBManagement/*.js',
        Others: './tests/ConfigApp/Others/*.js',
        //for fieldBuilder
        Instruments_fb: './tests/FieldBuilder/Instruments_fb/*.js',
        CDB_fb: './tests/FieldBuilder/CDB_fb/*.js',
        IntegratedConfigApp: './tests/FieldBuilder/IntegratedConfigApp/*.js',
    },
    //specs: ['./tests/FieldBuilder/IntegratedConfigApp/VFK-TC-246.js'],
    //allScriptsTimeout: 200000,
    //framework: 'jasmine',
    onPrepare: function(){
        //for reporting
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './reports',
            fixedScreenshotName: true,
            //cleanDestination: false,
            fileNameDateSuffix: true
        })
        );
        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailuredSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true
        })
        );
        //to always maximise browser window
        browser.driver.manage().window().maximize();
    },
    //to synchronise and avoid timeout error
    jasmineNodeOpts:{defaultTimeoutInterval: 500000} 
    
};
