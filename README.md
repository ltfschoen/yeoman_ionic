yeoman_ionic
============

Hybrid Yeoman-generated Ionic Mobile App.

Feature Progress (Basic)
=============================
    
- [x] **Progress Status expander**
  1. Basic functionality with ng-show and ng-transclude
- [x] **Tab Bar Menu**
- [x] **List Sentences data**
  1. Fetches data from JSON file
  2. Sort by alphanumeric or age
  2. Thumbnails shown
- [x] **Search and Filter Sentences list**
  1. Validates minimum of 2 alphanumeric input letters
- [x] **Detailed Sentence view**
  1. Thumbnails triggering image gallery animation
- [x] **Estimate view**
  1. Calculates recommended dosage based on health condition input
- [x] **Quote view**
  1. Quotation for recommended dosage. Share quotation for additional fee.
- [ ] **Map view*
  1. Google Maps track health condition, dosage, quotation provided. :bangbang:


Testing with Protractor (E2E)
=============================
Run with the following command in terminal (all tests should pass):
```
protractor protractor.conf.js
```

Running the App
===============
Run web server with: 
```
grunt serve
```
Then open this address in your browser (Chrome recommended) http://localhost:9000/

