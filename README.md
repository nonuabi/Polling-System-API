# Polling-System-API

### API :  https://polling-system-api.herokuapp.com/

### Introduction
  > It's an API where anyone can create questions with options and also add votes to it. <br/>
  > Authentication is not needed. <br/>

###  How to setup the project on local system

  1.  Clone this project
  2.  Start by installing npm if you don't have it already.
  3.  Navigate to Project Directory by :
  ~~~
  cd Polling-System-API
  ~~~
  4.  run following commands:
  ~~~
  npm install
  nodemon index.js
  ~~~

### Features
  * Create a Question (You can add as many questions as you want)
    * Required Routes `/questions/create`
    ![](assets/img/addNewQuestion.jpg)
  * Add options to a question
    * Required Routes `/questions/:id/options/create`
    ![](assets/img/addNewOption.jpg)
  * Add a vote to an option of question
    * Required Routes `/options/:id/add_vote`
    ![](assets/img/add_vote.jpg)
  * Delete a question →  A question can’t be deleted if one of it’s options has votes
    * Required Routes `/questions/:id/delete `
    ![](assets/img/deleteQuestion.jpg)
    * DadaBase before delete a question
    ![](assets/img/beforeDeletion.jpg)
    * DadaBase after delete a question
    ![](assets/img/afterDeletion.jpg)
  * Delete an option → An option can’t be deleted if it has even one vote given to it
    * Required Routes `/options/:id/delete`
    ![](assets/img/deleteOption.jpg)
  * View a question with it’s options and all the votes given to it
    * Required Routes `/questions/:id `
    ![](assets/img/fetchQuestion1.jpg)
    ![](assets/img/fetchQuestion2.jpg)

### Directory Structure
  `/config` - MongooDB Atlas Configuration <br/>
  `/controllers`  - questions & option controllers code <br/>
  `/model`  - question & option schemas <br/>
  `/routes` - question & option routes <br/>
  `index.js`  - entry file <br/>
  
