var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    }
    else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    }
    else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};


//</editor-fold>

app.controller('ScreenshotReportController', function ($scope, $http) {
    var that = this;
    var clientDefaults = {
    "columnSettings": {
        "displayTime": true,
        "displayBrowser": false,
        "displaySessionId": false,
        "displayOS": false,
        "inlineScreenshots": false
    }
};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    this.warningTime = 1400;
    this.dangerTime = 1900;

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
        if (initialColumnSettings.warningTime) {
            this.warningTime = initialColumnSettings.warningTime;
        }
        if (initialColumnSettings.dangerTime){
            this.dangerTime = initialColumnSettings.dangerTime;
        }
    }

    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };

    var results = [
    {
        "description": "should login|VFK-TC-cloudLogin",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611281784,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/favicon.ico - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611283956,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://msfs.akersolutions.com/adfs/ls/wia?client-request-id=76f07dec-757f-468f-8022-ad23bb6ecc05&wa=wsignin1.0&wtrealm=urn%3afederation%3aMicrosoftOnline&wctx=LoginOptions%3D3%26estsredirect%3d2%26estsrequest%3drQIIAZWQP2sUQRyGb9y7M0bBECwsj3iNhtmdmZ3dmVkQtEiaiDFWMZUzu7_xJtncHvuP80C0tNNasLEU0lhJ_AISLFJK7KxELFIdluY-gs3bvE_xPu8dj_o0GUolIyDMYhVJgbnIFFYhAA6FJpGOCaeCl6vLK39enLcvmzebr9aObn0Zf-t9RHRU15MqCYIaqtq3DvLMNC7PoPTdNPTT4jAodFOPWJDqPDc6PfiM0ClCvxA6u3R9-_6iWkRRuhm889ZAWs6jzApphVUUjAGjDWWUKW5DxpLgkzdksRFc2RjLVDDMOYTYmAywhjADIgxnJD7xrhYTGLtsUILOvnvopzeclPqZrp1fla7VVa1bfU8fQFkVeVO7Ylwt5p520e_uNeIlS0v9FXSzM-j87aIPvQv5-e15-_THxtZx-3X-_mi3c9ILNvYfxQ1_8Biem2xrR043nZ7O5N7DXZXO9tdHT8z2zro9LOwFdFcm9G0fnffR68ud4yv__9vZ8g1GqMJEYsoGlCWEJiza-wc1&cbcxt=&username=pragati.srivastava%40akersolutions.com&mkt=&lc= - The connection used to load resources from https://msfs.akersolutions.com used TLS 1.0 or TLS 1.1, which are deprecated and will be disabled in the future. Once disabled, users will be prevented from loading these resources. The server should enable TLS 1.2 or later. See https://www.chromestatus.com/feature/5654791610957824 for more information.",
                "timestamp": 1565611291584,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://msfs.akersolutions.com/favicon.ico - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1565611291584,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/favicon.ico - Failed to load resource: the server responded with a status of 404 ()",
                "timestamp": 1565611291586,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611297793,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611300457,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611311394,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611314012,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611324623,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00380018-00a6-0090-00ef-002d00e90077.png",
        "timestamp": 1565611281457,
        "duration": 46327
    },
    {
        "description": "should save CDB as template|VFK-TC-214",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611331392,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611362151,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00dd00d6-00f1-00c2-00b2-001900480024.png",
        "timestamp": 1565611328322,
        "duration": 33877
    },
    {
        "description": "should manage instrument profiles|VFK-TC-219",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611362872,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611423311,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00de0076-00e0-008a-00c9-0014002500e2.png",
        "timestamp": 1565611362795,
        "duration": 62561
    },
    {
        "description": "fb elements should be unclickable when configapp is opened|VFK-TC-246",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611425913,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611446899,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00890036-00cc-0053-006e-00f7005f0015.png",
        "timestamp": 1565611425854,
        "duration": 23089
    },
    {
        "description": "should delete a scan group|VFK-TC-184 & VFK-TC-185",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field/5bd99cc4e22e8203adf73592/node - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611449565,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field/5bd99cc4e22e8203adf73592/node - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611454209,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611490347,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00400089-00af-00f6-0085-00a000900054.png",
        "timestamp": 1565611449490,
        "duration": 42879
    },
    {
        "description": "should display warning|VFK-TC-203",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611492761,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611495069,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611528684,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00660044-0016-00c8-003f-00b0003500e6.png",
        "timestamp": 1565611492710,
        "duration": 38008
    },
    {
        "description": "should define reset-command on modbus|VFK-TC-206",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": [
            "Expected '97' to equal '097'.",
            "Expected '97' to equal '097'."
        ],
        "trace": [
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Verification\\practice protractor_21feb\\tests\\FieldBuilder\\Others\\VFK-TC-206.js:39:53)\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7",
            "Error: Failed expectation\n    at UserContext.<anonymous> (C:\\Verification\\practice protractor_21feb\\tests\\FieldBuilder\\Others\\VFK-TC-206.js:43:53)\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611531389,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611534034,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611570057,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00510062-0083-0056-0055-003c006b000b.png",
        "timestamp": 1565611531292,
        "duration": 40802
    },
    {
        "description": "should replace CDB|VFK-TC-211",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611572724,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611575366,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611614574,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00cb00f7-0053-00e5-0001-00f3001d0062.png",
        "timestamp": 1565611572659,
        "duration": 43929
    },
    {
        "description": "should check norwegian characters|VFK-TC-212",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611617145,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611650259,
                "type": ""
            }
        ],
        "screenShotFile": "images\\005300d9-0048-001a-0033-00de00580091.png",
        "timestamp": 1565611617076,
        "duration": 35228
    },
    {
        "description": "should edit instrument names|VFK-TC-619",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611652983,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611655778,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611720590,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00810079-0033-00f4-009d-000f003500f7.png",
        "timestamp": 1565611652890,
        "duration": 69752
    },
    {
        "description": "should check ip address|VFK-TC-620 and VFK-TC-192",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/static#/project/5b8668bfe22e8203b383237f/field - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611723418,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/configapp-backend-fieldbuilder/api/node/PrimaryInterface/1?format=hal - Failed to load resource: the server responded with a status of 500 ()",
                "timestamp": 1565611790459,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/fields/5bd99cc4e22e8203adf73592/nodes/5bd9aff5e22e8203adf73612/vectus/cdb/edit/save?format=hal - Failed to load resource: the server responded with a status of 500 ()",
                "timestamp": 1565611794605,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://test.fieldbuilder.ix3.com/fieldbuilder/ - Failed to load resource: the server responded with a status of 403 ()",
                "timestamp": 1565611796788,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00f4006e-0064-0089-00f6-005500380030.png",
        "timestamp": 1565611723337,
        "duration": 75491
    },
    {
        "description": "should copy running to Project default|VFK-TC-49,50",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565611799727,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565611960253,
                "type": ""
            }
        ],
        "screenShotFile": "images\\000200b6-0039-0006-00dc-003300720017.png",
        "timestamp": 1565611799390,
        "duration": 163130
    },
    {
        "description": "should clear Restore CDB|VFK-TC-56",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565611997577,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00a000ba-00d8-00b2-00a1-00a000f60020.png",
        "timestamp": 1565611963116,
        "duration": 36675
    },
    {
        "description": "should clear Standby CDB|VFK-TC-58,60",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612036767,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00490069-00eb-0075-00eb-007a006d001d.png",
        "timestamp": 1565612000377,
        "duration": 38610
    },
    {
        "description": "should upload instrument profile|VFK-TC-38",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612080571,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/api/instrument/profile - Failed to load resource: the server responded with a status of 500 ()",
                "timestamp": 1565612107584,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612112124,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00920046-005f-005d-0082-00c1003d007d.png",
        "timestamp": 1565612039565,
        "duration": 74775
    },
    {
        "description": "add instance|VFK-TC-120",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "images\\0079008d-0081-0074-001c-00d40079005f.png",
        "timestamp": 1565612114938,
        "duration": 30345
    },
    {
        "description": "add instance|VFK-TC-121",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": [
            "Failed: No element found using locator: by.buttonText(\"CommunicationEngine\")"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: by.buttonText(\"CommunicationEngine\")\n    at elementArrayFinder.getWebElements.then (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.AddNewStaticArp (c:\\Verification\\practice protractor_21feb\\tests\\PageObjects\\ConfigApp\\PageObjectNode.js:103:48)\n    at UserContext.<anonymous> (C:\\Verification\\practice protractor_21feb\\tests\\ConfigApp\\Others\\VFK-TC-121.js:14:18)\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\nFrom: Task: Run it(\"add instance\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Verification\\practice protractor_21feb\\tests\\ConfigApp\\Others\\VFK-TC-121.js:11:6)\n    at addSpecsToSuite (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\326952\\AppData\\Roaming\\npm\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Verification\\practice protractor_21feb\\tests\\ConfigApp\\Others\\VFK-TC-121.js:4:1)\n    at Module._compile (internal/modules/cjs/loader.js:688:30)\n    at Object.Module._extensions..js (internal/modules/cjs/loader.js:699:10)\n    at Module.load (internal/modules/cjs/loader.js:598:32)\n    at tryModuleLoad (internal/modules/cjs/loader.js:537:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "images\\00cc002d-00ef-00c5-00b1-00b9000f00ca.png",
        "timestamp": 1565612145893,
        "duration": 16146
    },
    {
        "description": "verify authentication error|VFK-TC-66",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/connect?format=hal - Failed to load resource: the server responded with a status of 401 ()",
                "timestamp": 1565612173401,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 475:245 \"ConnectionService.connect failed for user:pragati,address:139.145.75.225\"",
                "timestamp": 1565612173402,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612177779,
                "type": ""
            }
        ],
        "screenShotFile": "images\\003f00c5-0048-0035-0094-0010006b0093.png",
        "timestamp": 1565612162567,
        "duration": 17435
    },
    {
        "description": "admin role creation as admin|VFK-TC-67",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612208246,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00c5003d-00f6-0022-0036-001e006300ed.png",
        "timestamp": 1565612180581,
        "duration": 29876
    },
    {
        "description": "admin role creation as operator|VFK-TC-68",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/api/node/SecurityManagement/1/LocalUser?format=hal - Failed to load resource: the server responded with a status of 500 ()",
                "timestamp": 1565612248658,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 475:245 Object",
                "timestamp": 1565612248658,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612268778,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00ac00e8-0005-009e-005e-00e9005400c3.png",
        "timestamp": 1565612211063,
        "duration": 59931
    },
    {
        "description": "admin role creation as engineer|VFK-TC-69",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/api/node/SecurityManagement/1/LocalUser?format=hal - Failed to load resource: the server responded with a status of 500 ()",
                "timestamp": 1565612317339,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 475:245 Object",
                "timestamp": 1565612317339,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612342804,
                "type": ""
            }
        ],
        "screenShotFile": "images\\009a0008-00fa-00ba-00ff-000d00440052.png",
        "timestamp": 1565612271598,
        "duration": 73350
    },
    {
        "description": "should create MONITOR|VFK-TC-70",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/api/node/SecurityManagement/1/LocalUser?format=hal - Failed to load resource: the server responded with a status of 500 ()",
                "timestamp": 1565612395907,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 475:245 Object",
                "timestamp": 1565612395907,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612423830,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00b7003f-007e-0045-00ec-005600460067.png",
        "timestamp": 1565612345395,
        "duration": 80667
    },
    {
        "description": "should change the role of a user as ADMIN|VFK-TC-72,74,77,78",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 19784,
        "browser": {
            "name": "chrome",
            "version": "75.0.3770.142"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/connect?format=hal - Failed to load resource: the server responded with a status of 401 ()",
                "timestamp": 1565612477455,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 475:245 \"ConnectionService.connect failed for user:AAMONITO,address:139.145.75.225\"",
                "timestamp": 1565612477456,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://pragati:Pragati1410*@fbu-lab1.no.enterdir.com/vectus-configapp-1-4/assets/standalone/ng-app-b1dd9d830343dd1ae245c156dde9f04e.js 1169 document.registerElement is deprecated and will be removed in M73, around March 2019. Please use window.customElements.define instead. See https://www.chromestatus.com/features/4642138092470272 for more details.",
                "timestamp": 1565612519384,
                "type": ""
            }
        ],
        "screenShotFile": "images\\00aa00ab-006f-0003-00d2-006100b80091.png",
        "timestamp": 1565612426679,
        "duration": 95204
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    }
                    else {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.sortSpecs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.sortSpecs();
    }


});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

