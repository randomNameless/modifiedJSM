const fs = require('fs');
const puppeteer = require('puppeteer');

const runScriptOnWebsites = async (filePath) => {
  try {
    const websiteList = fs.readFileSync(filePath, 'utf-8').split('\n').filter(line => line.trim().length > 0);
    const apiCounts = new Map();
    let noEntriesWebsites = [];

    for (const website of websiteList) {
      let browser;
      try {
        browser = await puppeteer.launch({
          headless: false, // Set to true if you want headless mode
          devtools: false  // Set to true if you need devtools open
        });

        const page = await browser.newPage();

        // Visit the website to check if window.entries exists
        await page.goto(website, { timeout: 30000, waitUntil: 'domcontentloaded' });

        // Check if window.entries is already defined on the page
        const hasWindowEntries = await page.evaluate(() => {
          return typeof window.entries !== 'undefined';
        });

        // If window.entries is not defined, inject the tracking script
        if (!hasWindowEntries) {
          console.log(`Injecting window.entries tracking for ${website}`);
          
          await page.evaluateOnNewDocument(() => {
            // Initialize window.entries as an array to store API call logs
            window.entries = [];

            function logApiCall(apiName) {
              let entry = window.entries.find(e => e[0] === apiName);
              if (entry) {
                entry[1] += 1;
              } else {
                window.entries.push([apiName, 1]);
              }
              console.log(`API called: ${apiName}, Count: ${entry ? entry[1] : 1}`);
            }

            // Override document.getElementById
            const originalGetElementById = document.getElementById;
            document.getElementById = function (id) {
              logApiCall('document.getElementById');
              return originalGetElementById.apply(this, arguments);
            };

            // Override document.getElementsByTagName
            const originalGetElementsByTagName = document.getElementsByTagName;
            document.getElementsByTagName = function (tagName) {
              logApiCall('document.getElementsByTagName');
              return originalGetElementsByTagName.apply(this, arguments);
            };

            // Override document.getElementsByClassName
            const originalGetElementsByClassName = document.getElementsByClassName;
            document.getElementsByClassName = function (className) {
              logApiCall('document.getElementsByClassName');
              return originalGetElementsByClassName.apply(this, arguments);
            };

            // Override window.open
            const originalWindowOpen = window.open;
            window.open = function () {
              logApiCall('window.open');
              return originalWindowOpen.apply(this, arguments);
            };

            // Override window.onload
            const originalWindowOnload = window.onload;
            window.onload = function () {
              logApiCall('window.onload');
              if (originalWindowOnload) {
                return originalWindowOnload.apply(this, arguments);
              }
            };

            // Override document.writeln
            const originalDocumentWriteln = document.writeln;
            document.writeln = function (text) {
              logApiCall('document.writeln');
              return originalDocumentWriteln.apply(this, arguments);
            };

            // Override document.open
            const originalDocumentOpen = document.open;
            document.open = function () {
              logApiCall('document.open');
              return originalDocumentOpen.apply(this, arguments);
            };

            // Override window.eval
            const originalWindowEval = window.eval;
            window.eval = function (code) {
              logApiCall('window.eval');
              return originalWindowEval.apply(this, arguments);
            };

            // Override window.setInterval
            const originalSetInterval = window.setInterval;
            window.setInterval = function (func, delay) {
              logApiCall('window.setInterval');
              return originalSetInterval.apply(this, arguments);
            };

            // Override document.addEventListener
            const originalAddEventListener = document.addEventListener;
            document.addEventListener = function (type, listener, options) {
              logApiCall('document.addEventListener');
              return originalAddEventListener.apply(this, arguments);
            };
            
	    
	    // 2. Override document.createElement
const originalCreateElement = document.createElement;
document.createElement = function (tagName) {
    logApiCall('document.createElement');
    return originalCreateElement.apply(this, arguments);
};

// 3. Override document.captureEvents (deprecated, but for demo purposes)
const originalCaptureEvents = document.captureEvents;
document.captureEvents = function (eventType) {
    logApiCall('document.captureEvents');
    return originalCaptureEvents.apply(this, arguments);
};

// 4. Override document.elementFromPoint
const originalElementFromPoint = document.elementFromPoint;
document.elementFromPoint = function (x, y) {
    logApiCall('document.elementFromPoint');
    return originalElementFromPoint.apply(this, arguments);
};

// 5. Override document.getRootNode
const originalGetRootNode = document.getRootNode;
document.getRootNode = function (options) {
    logApiCall('document.getRootNode');
    return originalGetRootNode.apply(this, arguments);
};

// 6. Override document.getSelection
const originalGetSelection = document.getSelection;
document.getSelection = function () {
    logApiCall('document.getSelection');
    return originalGetSelection.apply(this, arguments);
};

// 7. Override document.hasChildNodes
const originalHasChildNodes = document.hasChildNodes;
document.hasChildNodes = function () {
    logApiCall('document.hasChildNodes');
    return originalHasChildNodes.apply(this, arguments);
};

// 8. Override document.hasOwnProperty
const originalHasOwnProperty = document.hasOwnProperty;
document.hasOwnProperty = function (prop) {
    logApiCall('document.hasOwnProperty');
    return originalHasOwnProperty.apply(this, arguments);
};

// 9. Override document.isDefaultNamespace
const originalIsDefaultNamespace = document.isDefaultNamespace;
document.isDefaultNamespace = function (namespaceURI) {
    logApiCall('document.isDefaultNamespace');
    return originalIsDefaultNamespace.apply(this, arguments);
};

// 10. Override document.isEqualNode
const originalIsEqualNode = document.isEqualNode;
document.isEqualNode = function (otherNode) {
    logApiCall('document.isEqualNode');
    return originalIsEqualNode.apply(this, arguments);
};

// 1. Override document.isSameNode
const originalIsSameNode = document.isSameNode;
document.isSameNode = function (otherNode) {
    logApiCall('document.isSameNode');
    return originalIsSameNode.apply(this, arguments);
};

// 2. Override document.isPrototypeOf
const originalIsPrototypeOf = Document.prototype.isPrototypeOf;
Document.prototype.isPrototypeOf = function (object) {
    logApiCall('document.isPrototypeOf');
    return originalIsPrototypeOf.apply(this, arguments);
};

// 3. Override document.lookupNamespaceURI
const originalLookupNamespaceURI = document.lookupNamespaceURI;
document.lookupNamespaceURI = function (prefix) {
    logApiCall('document.lookupNamespaceURI');
    return originalLookupNamespaceURI.apply(this, arguments);
};

// 4. Override document.lookupPrefix
const originalLookupPrefix = document.lookupPrefix;
document.lookupPrefix = function (namespaceURI) {
    logApiCall('document.lookupPrefix');
    return originalLookupPrefix.apply(this, arguments);
};

// 5. Override document.normalize
const originalNormalize = document.normalize;
document.normalize = function () {
    logApiCall('document.normalize');
    return originalNormalize.apply(this, arguments);
};

// 6. Override document.queryCommandEnabled
const originalQueryCommandEnabled = document.queryCommandEnabled;
document.queryCommandEnabled = function (command) {
    logApiCall('document.queryCommandEnabled');
    return originalQueryCommandEnabled.apply(this, arguments);
};

// 7. Override document.queryCommandState
const originalQueryCommandState = document.queryCommandState;
document.queryCommandState = function (command) {
    logApiCall('document.queryCommandState');
    return originalQueryCommandState.apply(this, arguments);
};

// 8. Override document.removeEventListener
const originalRemoveEventListener = document.removeEventListener;
document.removeEventListener = function (type, listener, options) {
    logApiCall('document.removeEventListener');
    return originalRemoveEventListener.apply(this, arguments);
};

// 9. Override document.releaseEvents
const originalReleaseEvents = document.releaseEvents;
document.releaseEvents = function (eventType) {
    logApiCall('document.releaseEvents');
    return originalReleaseEvents.apply(this, arguments);
};

// 10. Override document.toLocaleString
const originalToLocaleString = document.toLocaleString;
document.toLocaleString = function () {
    logApiCall('document.toLocaleString');
    return originalToLocaleString.apply(this, arguments);
};
// 1. Override document.valueOf
const originalDocumentValueOf = document.valueOf;
document.valueOf = function() {
    logApiCall('document.valueOf');
    return originalDocumentValueOf.apply(this, arguments);
};

// 2. Override document.cloneNode
const originalCloneNode = document.cloneNode;
document.cloneNode = function(deep) {
    logApiCall('document.cloneNode');
    return originalCloneNode.apply(this, arguments);
};

// 3. Override document.contains
const originalContains = document.contains;
document.contains = function(node) {
    logApiCall('document.contains');
    return originalContains.apply(this, arguments);
};

// 4. Override String.prototype.search
const originalStringSearch = String.prototype.search;
String.prototype.search = function(regexp) {
    logApiCall('String.prototype.search');
    return originalStringSearch.apply(this, arguments);
};

// 5. Override String.prototype.charAt
const originalCharAt = String.prototype.charAt;
String.prototype.charAt = function(index) {
    logApiCall('String.prototype.charAt');
    return originalCharAt.apply(this, arguments);
};

// 6. Override Math.log
const originalMathLog = Math.log;
Math.log = function(x) {
    logApiCall('Math.log');
    return originalMathLog.apply(this, arguments);
};

// 7. Override Math.random
const originalMathRandom = Math.random;
Math.random = function() {
    logApiCall('Math.random');
    return originalMathRandom.apply(this, arguments);
};

// 8. Override String.prototype.charCodeAt
const originalCharCodeAt = String.prototype.charCodeAt;
String.prototype.charCodeAt = function(index) {
    logApiCall('String.prototype.charCodeAt');
    return originalCharCodeAt.apply(this, arguments);
};

// 9. Override String.fromCharCode
const originalFromCharCode = String.fromCharCode;
String.fromCharCode = function(...codes) {
    logApiCall('String.fromCharCode');
    return originalFromCharCode.apply(this, arguments);
};

// 10. Override String.prototype.concat
const originalConcat = String.prototype.concat;
String.prototype.concat = function(...strings) {
    logApiCall('String.prototype.concat');
    return originalConcat.apply(this, arguments);
};

// 1. Override Array.prototype.indexOf
const originalIndexOf = Array.prototype.indexOf;
Array.prototype.indexOf = function (searchElement, fromIndex) {
    logApiCall('Array.prototype.indexOf');
    return originalIndexOf.apply(this, arguments);
};

// 2. Override String.prototype.substring
const originalSubstring = String.prototype.substring;
String.prototype.substring = function (start, end) {
    logApiCall('String.prototype.substring');
    return originalSubstring.apply(this, arguments);
};

// 3. Override String.prototype.replace
const originalReplace = String.prototype.replace;
String.prototype.replace = function (searchValue, replaceValue) {
    logApiCall('String.prototype.replace');
    return originalReplace.apply(this, arguments);
};

// 4. Override document.write
const originalDocumentWrite = document.write;
document.write = function (content) {
    logApiCall('document.write');
    return originalDocumentWrite.apply(this, arguments);
};

// 5. Override escape
const originalEscape = window.escape;
window.escape = function (str) {
    logApiCall('window.escape');
    return originalEscape.apply(this, arguments);
};

// 6. Override unescape
const originalUnescape = window.unescape;
window.unescape = function (str) {
    logApiCall('window.unescape');
    return originalUnescape.apply(this, arguments);
};

// 7. Override navigator.sendBeacon
const originalSendBeacon = navigator.sendBeacon;
navigator.sendBeacon = function (url, data) {
    logApiCall('navigator.sendBeacon');
    return originalSendBeacon.apply(this, arguments);
};

// 8. Override document.cookie (getter and setter)
Object.defineProperty(document, 'cookie', {
    get() {
        logApiCall('document.cookie (get)');
        return document.__cookie;
    },
    set(value) {
        logApiCall('document.cookie (set)');
        document.__cookie = value;
    }
});

// 9. Override HTMLCanvasElement.prototype.toDataURL
const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function (type, quality) {
    logApiCall('HTMLCanvasElement.prototype.toDataURL');
    return originalToDataURL.apply(this, arguments);
};

// 10. Override window.atob
const originalAtob = window.atob;
window.atob = function (encodedData) {
    logApiCall('window.atob');
    return originalAtob.apply(this, arguments);
};

// 11. Override window.base64ToArrayBuffer (custom function)
const originalBase64ToArrayBuffer = window.base64ToArrayBuffer;
window.base64ToArrayBuffer = function (base64) {
    logApiCall('window.base64ToArrayBuffer');
    if (!originalBase64ToArrayBuffer) {
        // Custom implementation
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
    return originalBase64ToArrayBuffer.apply(this, arguments);
};

// 12. Override window.navigator.msSaveOrOpenBlob
if (window.navigator.msSaveOrOpenBlob) {
    const originalMsSaveOrOpenBlob = window.navigator.msSaveOrOpenBlob;
    window.navigator.msSaveOrOpenBlob = function (blob, defaultName) {
        logApiCall('window.navigator.msSaveOrOpenBlob');
        return originalMsSaveOrOpenBlob.apply(this, arguments);
    };
}

// 13. Override window.URL.createObjectURL
const originalCreateObjectURL = window.URL.createObjectURL;
window.URL.createObjectURL = function (blob) {
    logApiCall('window.URL.createObjectURL');
    return originalCreateObjectURL.apply(this, arguments);
};

// 14. Override window.URL.revokeObjectURL
const originalRevokeObjectURL = window.URL.revokeObjectURL;
window.URL.revokeObjectURL = function (url) {
    logApiCall('window.URL.revokeObjectURL');
    return originalRevokeObjectURL.apply(this, arguments);
};

// 15. Override window.Uint8Array
const originalUint8Array = window.Uint8Array;
window.Uint8Array = function (...args) {
    logApiCall('window.Uint8Array');
    return new originalUint8Array(...args);
};

// 16. Override window.Blob
const originalBlob = window.Blob;
window.Blob = function (parts, options) {
    logApiCall('window.Blob');
    return new originalBlob(parts, options);
};

// 17. Override Image constructor
const originalImage = Image;
window.Image = function (width, height) {
    logApiCall('Image');
    return new originalImage(width, height);
};

// 18. Override Image.prototype.src
const originalImageSrc = Object.getOwnPropertyDescriptor(Image.prototype, 'src');
Object.defineProperty(Image.prototype, 'src', {
    get() {
        return originalImageSrc.get.call(this);
    },
    set(value) {
        logApiCall('Image.prototype.src');
        return originalImageSrc.set.call(this, value);
    }
});





          });
        } else {
          console.log(`window.entries already exists for ${website}, skipping injection.`);
        }

        // Reload the page to apply the injected code if needed
        await page.reload({ waitUntil: 'domcontentloaded' });

        // Use a manual timeout to allow API calls to occur
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Retrieve the logged API calls from window.entries
        const apiLog = await page.evaluate(() => window.entries);

        if (apiLog && apiLog.length > 0) {
          for (let i = 0; i < apiLog.length; i++) {
            const api = apiLog[i][0];
            if (!apiCounts.has(api)) {
              apiCounts.set(api, []);
            }
            apiCounts.get(api).push({
              website,
              count: apiLog[i][1] || 0
            });
          }
        } else {
          console.error(`No API calls tracked on ${website}`);
          noEntriesWebsites.push(website);
        }

        await page.close();
        await browser.close();

        // Create CSV results after processing all websites
        let csvResult = 'Website';
        const apiNames = Array.from(apiCounts.keys());
        apiNames.forEach(api => {
          csvResult += `,${api}`;
        });
        csvResult += '\n';

        for (const website of websiteList) {
          let row = `"${website}"`;
          apiNames.forEach(api => {
            const apiData = apiCounts.get(api);
            const websiteData = apiData.find(data => data.website === website);
            row += `,${websiteData ? websiteData.count : 0}`;
          });
          csvResult += row + '\n';
        }

        fs.writeFileSync('api_tracking_results.csv', csvResult);
        fs.writeFileSync('no_api_calls_websites.csv', noEntriesWebsites.join('\n'));
        console.log(`Websites without API calls: ${noEntriesWebsites.join(', ')}`);

      } catch (error) {
        console.error(`Error visiting ${website}: ${error.message}`);
        noEntriesWebsites.push(website);
      }
    }
  } catch (error) {
    console.error(`Error running script: ${error.message}`);
  }
};

// Run the script on a list of websites from the file 'websites.txt'
runScriptOnWebsites('websites.txt');

