/**
 *  TEST FOR 404
 * 
 *  This script is meant to run in a Google Sheet via Google AppScript.
 *  To run properly, you should have a sheet open with the slugs or paths to test in column A.
 *  Test results will be written to column B beside their path/slug.
 *  
 */
  
  function testFor404 () {
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    // rowCount will get the index of the last row containing content.
    const rowCount = sheet.getLastRow();
    
    // Sometimes the operation will time out because Google limits the execution time.
    // You set i to the row index number where you want to pick back up the operation.
    for (let i=2; i <= rowCount; i++ ) {
      const landPageSlug = getLandingPage(i);
      const landingPageUrl = createTestUrl(landPageSlug);
      const testResponse = testUrl(landingPageUrl);
      // Check execution log to see what 
      Logger.log(`${landingPageUrl}: ${testResponse}`);
      if (! testResponse >= 500) {
        writeResults(i, testResponse);
      } else {
        // Bail on the operation if server returns 500 or 502 errors
        // This likely means there is a firewall issue.
        break;
      }
    }
    /**
     * 
     * @param {int} row - Index of the row to be tested
     * @returns {string} - URL path/slug contained in cell row
     */
  
    function getLandingPage(row) {
      // Get a specific cell value (ie  - row 1, column 1 which the same as A1)
      const cellValue = sheet.getRange(row, 1).getValue();
      return cellValue;
    }
    /**
     * CREATE TEST URL
     * 
     * @param {string} slug - url path to be tested
     * @returns {string} - fully formed url. 
     */
    function createTestUrl(slug) {
      // Base url configuration
      const BASE_URL = "https://education.ufl.edu";
      
      // Clean the slug by removing leading/trailing slashes and spaces
      const cleanSlug = slug.trim().replace(/^\/+|\/+$/g, '');
      
      // Construct the full URL
      const fullUrl = `${BASE_URL}/${cleanSlug}`;
  
      return fullUrl;
    }
    /**
     * TEST URL
     * 
     * Tests whether the url links to an active page
     * 
     * @param {string} url - Url to be tested
     * @returns {int | string: error} http response code from server
     */
  
    function testUrl(url) {
      try {
        // Make the HTTP request
        const response = UrlFetchApp.fetch(url, {
          'muteHttpExceptions': true, // Prevent errors from stopping executions
          'followRedirects': false, // If 301 or 302 do not load the page being redirected to
          'validateHttpsCertificates': false // Ignore ssl certificates since we're not using actual data returned
        });
  
        // Get response details
        const responseCode = response.getResponseCode();
        return responseCode;
  
      } catch (error) {
        Logger.log(
          `URL Testing Error: ${error.toString()}`
        )
        return 'Error'
      }
    }
  
    // Helper function that actually records the results in the spreadsheet
    // You can change the column it writes to by updating the second param of getRange
    function writeResults(row, testResult) {
      sheet.getRange(row, 2).setValue(testResult);
    }
  }