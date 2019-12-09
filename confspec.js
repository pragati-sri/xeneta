//to console jasmine-terminal reports
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

//to enable html reporting
//var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

var HtmlReporter = require('protractor-beautiful-reporter');

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

    specs: ['./tests/ConfigApp/Users/VFK-TC-669.js',],
    //specs: ['./tests/FieldBuilder/CDB_fb/VFK-TC-696.js',],
    /*specs: [
            //fieldBuilder
            './tests/FieldBuilder/Cloud_sanity_check/logins.js',
            //'./tests/FieldBuilder/CDB_fb/VFK-TC-214.js',
            './tests/FieldBuilder/Instruments_fb/VFK-TC-219.js',
            './tests/FieldBuilder/IntegratedConfigApp/VFK-TC-246.js',
            './tests/FieldBuilder/Others/VFK-TC-184,185.js',
            './tests/FieldBuilder/Others/VFK-TC-203.js',
            './tests/FieldBuilder/Others/VFK-TC-206.js',
            './tests/FieldBuilder/Others/VFK-TC-211.js',
            './tests/FieldBuilder/Others/VFK-TC-212.js',
            './tests/FieldBuilder/Others/VFK-TC-619.js', 
            './tests/FieldBuilder/Others/VFK-TC-620,192.js',
            //configApp
            //'./tests/ConfigApp/CDBManagement/VFK-TC-49,50.js',
            './tests/ConfigApp/CDBManagement/VFK-TC-56.js',
            './tests/ConfigApp/CDBManagement/VFK-TC-58,60.js',
            './tests/ConfigApp/Instruments/VFK-TC-38.js',
            './tests/ConfigApp/Others/VFK-TC-120.js',
            './tests/ConfigApp/Others/VFK-TC-121.js',
            './tests/ConfigApp/Users/VFK-TC-66.js',
            './tests/ConfigApp/Users/VFK-TC-67.js',
            './tests/ConfigApp/Users/VFK-TC-68.js',
            './tests/ConfigApp/Users/VFK-TC-69.js',
            './tests/ConfigApp/Users/VFK-TC-70.js',
            './tests/ConfigApp/Users/VFK-TC-72,74,77,78.js',
    ],*/
    //allScriptsTimeout: 200000,
    //framework: 'jasmine',

    onPrepare: function(){
        //for reporting
        /*jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './reports_before',
            fixedScreenshotName: true,
            //cleanDestination: false,
            fileNameDateSuffix: true
        })
        );*/
        //for console reports
        jasmine.getEnv().addReporter(new SpecReporter({
            displayFailuresSummary: true,
            displayFailuredSpec: true,
            displaySuiteNumber: true,
            displaySpecDuration: true
        })
        );

        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: './reports',
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            docTitle: 'FMS Automation Report',
            preserveDirectory: false,
            gatherBrowserLogs: false,
            clientDefaults:{
                columnSettings:{
                    displayTime:true,
                    displayBrowser:false,
                    displaySessionId:false,
                    displayOS:false,
                    inlineScreenshots:true,
                    useAjax:true
                }
            }
         }).getJasmine2Reporter());

        //to always maximise browser window
        browser.driver.manage().window().maximize();
    },
    //to synchronise and avoid timeout error
    jasmineNodeOpts:{defaultTimeoutInterval: 500000},
    
};
