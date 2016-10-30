# Project 2 
Jonathan Ahrens

WDI General Assembly

![Bus Stop](/public/images/totoro.gif)
## Google Maps API Bus Stop location saving

This is a web app that will allow users to save specific locations and mark them with the public transportation option that they are using.

### Introduction
Some countries do not have a correct render of their public transportation information in Google Maps. Sometimes this is because of Private companies running these services not providing that information, but can also due to the lack of resources to provide it. 

### Interaction Design
User will create a username and password saved into a MongoDB (the best way that it can be done there)
Once user logs in, Map view will render via Google Maps API current location of user via browser's location
The user will user current latitude and longitude, or dropped pin's location to determine a new stop that will be tagged with the name of the route the user takes there.
The user will be able to view his saved places and delete them if he considers that it's no longer a stop.

### Wireframes
![Login wireframe](/public/images/Login.png)
![Map wireframe](/public/images/MapScreen.png)

### Technologies used:
- [x] HTML
- [x] CSS
- [x] JS
- [x] Node.js
- [x] Express
- [x] Path
- [ ] MongoDB
- [x] dotEnv

### References
- [Google Maps API](https://developers.google.com/maps/documentation/javascript/)
- [Personal Class Notes](https://git.generalassemb.ly/teikmeout/ClassNotesGA/blob/master/express/expressNotes.md)
