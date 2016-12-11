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
   $('#add-train-btn').on("click", function() {
   		//variables for user input

   		var trainName = $('#train-submit').val().trim();
   		var destination = $('#destination-submit').val().trim();
   		var firstTrain = moment($('#time-submit').val().trim(),"HH:mm").format();
   		var frequency = $('#frequency-submit').val().trim();
   		//variable temporarily stores user data submitted
   		var newTrain = {
   			train: trainName,
   			destination: destination,
   			firstTrainTime:firstTrain,
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
   		var train = response.val().train;
   		var destination = response.val().destination;
   		var first = response.val().firstTrainTime;
      console.log("variable 'first': "+ first);
   		var frequency = response.val().frequency;

   		//current time and time of first train arrival
      var currentTime = moment();

      console.log("first formatted: "+first)
      //hours since first train (first). true tells to give exact answer, not rounded
      var timeDiff = moment(currentTime).diff(first, "minutes", true);
      console.log("firstTrainMinutes: "+timeDiff);
      //calculation of minutes away, rounding up
      var minutesAway = Math.ceil(Math.abs((timeDiff%frequency) - frequency));

   		console.log("minutes Away: " + minutesAway);

      var nextArrival = moment().add(minutesAway,'m').format("HH:mm")
      console.log("Next arrival time: "+nextArrival);

   		//add to table
   		$('#train-table > tbody').prepend('<tr><td>' + train + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>');
   },function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
  //to do:
  var timeExample = moment("86400000").format("YYYY M DD");
  console.log(timeExample);
