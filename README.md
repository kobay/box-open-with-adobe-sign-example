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
- white-list the url with https://developer.box.com/guides/embed/ui-elements/custom-domains/


## how to test

- open the web page with the browser
- find Adobe Sign button in OpenWith component and click it
- you should see the following
    - API request to Box API (`POST https://api.box.com/2.0/app_integrations/3282/execute`) is successful
    - new window pops up with URL: `https://documentcloud.adobe.com/boxintegration/index.html%3Faction=sendForSignature?auth_code=YdxGpbC....`
    - the new window shows "403 Forbidden"

## (not) working example

https://adobe-sign-open-with.herokuapp.com/

- to use above link, you may have to white-list this url. https://developer.box.com/guides/embed/ui-elements/custom-domains/


    
