  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_6zI9lDw0zIfjCdJbqVEeH_FwjrJvGDc",
    authDomain: "train-schedule-app-b4846.firebaseapp.com",
    databaseURL: "https://train-schedule-app-b4846.firebaseio.com",
    storageBucket: "train-schedule-app-b4846.appspot.com",
    messagingSenderId: "1035310142031"
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

   		//nice format to train Start Time
   		var trainStartNice = moment().unix(train).format("MMM DD YY");
   		console.log("nicely formatted train start time: " + trainStartNice);

   		//calculate Next Arrival time
   		var nextArrival = moment().diff(train, "Hour");
   		console.log("Next arrival time: " + nextArrival);

   })