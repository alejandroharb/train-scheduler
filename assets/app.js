  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBE-Kf69assUIOy3g79pUV91aNRNLSIkCY",
    authDomain: "test-project-1-dd166.firebaseapp.com",
    databaseURL: "https://test-project-1-dd166.firebaseio.com",
    storageBucket: "test-project-1-dd166.appspot.com",
    messagingSenderId: "213958702766"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

   //click listener for Submitting a Train Schedule
   $('#add-train-btn').on('click',function(){
   		//variables for user input
   		var trainName = $('#train-submit').val().trim();
   		var destination = $('#destination-submit').val().trim();
   		var time = $('#time-submit').val().trim();
   		var frequency = $('#frequency-submit').val().trim();
   		//variable temporarily stores user data submitted
   		var newTrain = {
   			train: trainName,
   			destination: destination,
   			firstTrainTime:time,
   			frequency:frequency
   		};

   		//Upload train data
   		database.ref().push(newTrain);

   		//logs to console
   		console.log(newTrain.train);
   		console.log(newTrain.destination);
   		console.log(newTrain.firstTrainTime);
   		console.log(newTrain.frequency);

   		//clear all input text boxes after submit
   		$('#train-submit').val("");
   		$('#destination-submit').val("");
   		$('#time-submit').val("");
   		$('#frequency-submit').val("");

   		//prevents new page load
   		return false;
   });

   database.ref().on("child_added", function(response){
   		console.log(response.val());

   		//store into variables
   		var train = response.val().trainName;
   		var destination = response.val().destination;
   		var time = response.val().time;
   		var frequency = response.val().frequency;
   })