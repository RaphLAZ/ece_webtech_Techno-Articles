# WebTech-ECE-ING4

## Introduction :
* Web technology project for ECE.
* Group : Axel PAPE & Raphael LAZZARI-ARMOUR
* Teachers : M. FARAULT PAUL

* Original instructions git : https://github.com/adaltas/ece-webtech-2023-spring-app 

## Prerequisites

* Node.js

# Getting Started

## Open a terminal 

* Clone our repository :

```
git clone https://github.com/RaphLAZ/ece-webtech-gr02-04/tree/main
```

* Go in the folder :
```
cd ./ece-webtech-gr02-04
```

* Download all related packages :
```
npm install
```
# Lab 2

Getting started with Node.js, Git and create Web server in Node.js

## To try Web server

* Run the app :
```
npm run develop
```

* Visit :
```
http://localhost:3000/ 
```
To see the explanation of how to use the app

* Visit :
```
http://localhost:3000/hello?name=[your name]
```
To see a short intro of yourself

* Visit :
```
http://localhost:3000/hello?name=[random name] 
```
To see a random greeting to the provided name

Any other path , e.g http://localhost:3000/foo, to see a 404 Not Found message.

To exit web server
```
Ctrl + c
```

# Lab3

Learn Express to build web API.

## To try expresse web server & test web Api

* Run the app :
```
npm run develop
```

* Visit : 
```
curl -X GET http://localhost:3000/articles
```
To see all articles in DataBase

* Visit : 
```
curl -X POST http://localhost:3000/articles\
-H 'Content-Type: application/json' \
-d  '{"title": "Bel Ami", "content": "Livre", "date": "17/03/1990", "autor": "Maupassant"}'
```
To add an Article

* Visit : 
```
curl -X POST http://localhost:3000/articles/[ArticleID]
```
To get an Article by ID

get all comments of the article with articleId

















