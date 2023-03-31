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

# Lab4

## Setting up the project 

* First, you'll need to have Node.js and npm (Node Package Manager) installed on your computer. You can download and install them from the official Node.js website.
* Next, create a new directory for your project and open a terminal in that directory.
* Run the command npm init -y to create a new package.json file for your project.
* Install Next.js and React by running the command npm install next react react-dom.

## Running the project 

* Run npm install to install the project dependencies.
* To start the development server, run the command npm run dev in the terminal.
* Open your web browser and go to http://localhost:3000 to view the home page.
* Navigate to the other pages by clicking on the links in the navigation menu.
* Click on an article title in the list of articles to go to its corresponding dynamic article page.