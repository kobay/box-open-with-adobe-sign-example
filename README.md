## how to set up

- create app in box dev 
- turn "Enable integration" on 
- set CORS properly
- download xx_config.json in the project root folder, rename it to "config.json"
- authorize the app in the admin console
- run `node setup.js`. it will:  
    - create app user
    - upload Sample.docx
    - enable all the app_integrations available
    - print USER_ID, FILE_IF **<- copy and set them in app.js**
- deploy the project somewhere HTTPS is available 
    - e.g ) run it on Heroku. heroku is going to execute `npm run start`
    - run `npm run start` or `node app.js`
    - don't forget CORS config in Box Dev
- download and run OpenWith.sh to white-list the url

## how to test

- open the web page with the browser
- find Adobe Sign button in OpenWith component and click it
- you should see the following
    - API request to Box API is successful
     

    
