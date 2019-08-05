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

    //specs: ['./tests/ConfigApp/Users/VFK-TC-70.js'],
    specs: ['./tests/FieldBuilder/Others/VFK-TC-619.js'],
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
