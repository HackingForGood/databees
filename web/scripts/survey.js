'use strict';

Survey.Survey.cssType = "bootstrap";

var surveyJSON = {
    title: "Please tell us about yourself.",
    pages: [
        { name: "page0", questions: [
            { type: "comment", name: "name", title: "What is your full name?" }
        ] },
        { name: "page1", questions: [ 
            { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "forSelf", title: "Are you filling out this survey for yourself?" },
            { type: "radiogroup", choices: ["Yes", "No"], isRequired: true, name: "isAdult", title: "Are you 18 years or older?" },
            { type: "radiogroup", choices: [ "Male", "Female" ], isRequired: true, name: "sex", title: "What is your biological sex?", visibleIf: "{isAdult} = 'Yes'" },
        ] },
        { name: "page2", questions: [
            { type: "radiogroup", choices: ["Public", "Private"], hasOther: true, isRequired: false, name: "healthCareProvider", title: "Who is your health care service provider?" },
            { type: "comment", isRequired: true, name: "primaryPhysician", title: "Who is your primary attending physician?"}
        ] },
        { name: "page3",questions: [
            { type: "comment", name: "about", title: "Please tell us about anything else you feel we should know." }
        ] }
    ]
};

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
      model: survey,
      onComplete: sendDataToServer
});

function sendDataToServer(survey) {
    //var resultAsString = JSON.stringify(survey.data);
    var database = firebase.database();

    // Push result to firebase database
    database.ref('messages').push({
        name: 'Data Bee',
        photoUrl: '/images/bee-logo.jpg',
        text: `Thank you for filling out the survey, ${survey.data.name}.`
    });

    database.ref('surveys').push(survey.data);
}

