## Project Description

The project is a web application, it takes a picture of the person in front of the computer camera. The user can then selects a style they perfer to transfer their original captured image into. In return, the user can see the image that they captured of themselves and a style transfered image.

![GitHub Logo](/doc/img/blue_style_transfer_web.png)

The project has three parts, frontend, backend and the model that makes the style transfer possible.

The document is structured by showing the tech stack first, then how to run, develop the application locally and lastly, deployment to production. To start with, we have the tech stack listed below:

## Frontend  
- Vue
- Materialize

## Backend  
- Nodejs

## Style Transfer Model
It generates a new image that mixes the content of a source image with the style of another image. The model is developed by IBM MAX developers and is ready to use. The git repo can be found [here](https://developer.ibm.com/technologies/artificial-intelligence/models/max-fast-neural-style-transfer/).


# Run locally

In order to run the web application locally. You need: 

1. Run and host the transfer style model locally.

There are several ways to do it, the easiest way to do it is to pull the image from dockerhub and run it.

```
$ docker run -it -p 5000:5000 codait/max-fast-neural-style-transfer
```

or you can check other alternatives that are detaily described [here](https://github.com/IBM/MAX-Fast-Neural-Style-Transfer).

Once this is done, the model should be hosted locally at http://0.0.0.0:5000/

2. Go to file ./frontend/src/App.vue and make sure that the row 77 (where the axios baseurl is) has address http://localhost:3000. Then build the vue project so it exports the static files(html, css, javascript).
```
$ cd frontend
```
```
$ npm run build
```
Once the frontend is built, you can see that the ./backend/dist/* files are created/updated.

If you wish to develop the frontend. Please uncomment the cors under ./backend/app.js
```
// const cors = require('cors');
// app.use(cors());
```
and run under ./frontend
```
npm run serve
```
This will start a vue local development server at address http://localhost:8080

3. Start the backend
```
$ npm run dev
```
This will start the app at address http://localhost:3000.

# Deploy to production
The app is deploy and hosted at [IBMCloud](https://www.ibm.com/cloud).

The web application need be deployed in the following order.
1. Deploy the kubernetes model. It is enough to host the model with the free tier. See [here](https://developer.ibm.com/tutorials/deploy-max-models-to-ibm-cloud-with-kubernetes/). In Step 2 of the tutorial, make sure clone this https://github.com/IBM/MAX-Fast-Neural-Style-Transfer instead of MAX-object-detector repository.

2. By following the step 1, you should get the IP address of the style transfer model in this format http://PUBLIC_IP:PORT. Change the IP address in file ./backend/routes/model.js and ./backend/_helper/_helper.js by replace the IP address in row 9 and 7 in the respective file.

3. Name the app and route by your choice in file ./backend/manifest.yml, there is one example manifest.yml file under backend folder and is working. 

4. Once everything is set, make sure that the file ./frontend/src/App.vue row 77 (where the axios baseurl is) has the same route address(and add https://) as the one you set in the ./backend/manifest.yml file. Then build the frontend to static files:
```
cd frontend
```
```
npm run build
```
5. To deploy the application to Cloud Foundry, you need to login into your ibmcloud account via ibmcloud CLI, set the API endpoint to your environment's endpoint and login in to the environemnt(org_name and space_name). Read more [here](https://cloud.ibm.com/docs/cloud-foundry?topic=cloud-foundry-deploy_apps). Once you have those set, the next is to push the node app to cloud foundry.
```
cd backend
```
```
ibmcloud cf push -f manifest.yml
```
Once it is deploy, the message with be something like this
```
App blue-style-transfer was started using this command `node app.js`

Showing health and status for app blue-style-transfer in org blue-style-transfer / space dev as Xing.guan1@ibm.com...
OK

requested state: started
instances: 1/1
usage: 256M x 1 instances
urls: blue-style-transfer.mybluemix.net
last uploaded: Wed Apr 1 17:28:40 UTC 2020
stack: cflinuxfs3
buildpack: nodejs_buildpack
```
