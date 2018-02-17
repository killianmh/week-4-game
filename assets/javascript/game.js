// Global Variables

var you;

var defender;

var attckCount = 0;

var charChoiceAudio = new Audio("assets/images/charChoice.mp3");

var enemyChoiceAudio = new Audio("assets/images/enemyChoice.mp3");

var defenderChoiceAudio = new Audio("assets/images/defenderChoice.mp3");

// Character Array

var chars = [

	{	
		name: "Ibuki",
		hP: 0,
		attkPwr: 0,
		cntrAttckPwr: 1
	},

	{	
		name: "Sagat",
		hP: 10,
		attkPwr: 15,
		cntrAttckPwr: 2
	},

	{	
		name: "Ryu",
		hP: 20,
		attkPwr: 25,
		cntrAttckPwr: 3
	},

	{	
		name: "Chun-Li",
		hP: 30,
		attkPwr: 35,
		cntrAttckPwr: 4
	}
];


// Functions




//Objects

// Main Game Object

var game = {

	//Initialize empty array to hold enemy objects
	enemies: [],

	//initialize empty array to hold player's chosen char object
	youChar: [],

	//Initialize empty array to hold defender char object
	defender: [],

	//Create a method to be called upon page load which creates 
	//<img> tags, fills them with the char objects, and appends 
	//them to the top of the screen
	displayImages: function(array,location,newClass){
		var length = array.length;

		if(length === 0){
			$(location).empty();
		}

		//Create an <img> tag for each char object and fill it
		for (var i = 0; i <length; i++) {
			var eachChar = $("<div>");
			eachChar.addClass(newClass);

			var charImage = $("<img>");
			charImage.addClass("charImg");

			$(eachChar).append(charImage);

			var stats = $("<div>");
			stats.addClass("stats");
			$(eachChar).append(stats);

			$(stats).html(array[i].hP);

			eachChar.attr("name",array[i].name);
			charImage.attr("src","assets/images/"+array[i].name+".jpg");

			$(location).append(eachChar);

		};


	},

	updateStats: function(array,parentClass,hP){
		var length = array.length;

		for(i = 0; i<length; i++){
			$(parentClass).html(hP);

		}
	},


	charChoice: function(nameinput){

		$(".char").off("click");

		console.log(nameinput);
		var index;
		for (var i = 0; i < chars.length; i++) {
			if(chars[i].name === nameinput)
				index = i;
		};

		game.youChar.push(chars[index]);
		chars.splice(index,1);
		game.displayImages(game.youChar,"#htmlYouChar","youChar")
		
		you = $(game.youChar[0]).attr("name");

		for (var i = 0; i <chars.length; i++) {
			game.enemies.push(chars[i]);
		}
		
		chars.length = 0;
		console.log(game.enemies);
		game.displayImages(game.enemies,"#htmlEnemies","enemy");
		

		game.displayImages(chars,"#htmlChars","char");
		
		console.log(game.youChar);
		console.log(chars);

		enemyChoiceAudio.currentTime =0;
		enemyChoiceAudio.play();

		enemyChoiceAudio.addEventListener("ended", function(){
			this.play();
		}, false);

		game.displayEnemiesClick();


		



	},

	chooseDefender: function(nameinput){

		$("#htmlResetMsg").empty();
		$("#htmlAttckMsg").empty();
		$("#htmlDefendMsg").empty();


		$(".displayEnemies").off("click");

		console.log(nameinput);
		var index;
		for(var i = 0; i < game.enemies.length; i++){
			if (game.enemies[i].name === nameinput) {
				index = i;
			};
		};
		game.defender.push(game.enemies[index]);
		console.log(game.defender);
		game.enemies.splice(index,1);
		game.displayImages(game.defender,"#htmlDefender","defender");

		defender = $(game.defender[0]).attr("name");

		$("#htmlEnemies").empty();
		game.displayImages(game.enemies,"#htmlEnemies","enemy");

		defenderChoiceAudio.currentTime = 0;
		defenderChoiceAudio.play();

		$("body").css("background-color", "#ffe900");

		game.htmlAttckButton();

	},

	attck: function(attckCount){



		var defenderHp = $(game.defender[0]).attr("hP");
		console.log(defenderHp);
		var AttckPwr = $(game.youChar[0]).attr("attkPwr") * attckCount;
		console.log(AttckPwr);
		$(game.defender[0]).attr("hP",(defenderHp - AttckPwr));
		console.log($(game.defender[0]).attr("hP"));

		game.updateStats(game.defender,".defender>.stats",game.defender[0].hP);

		var youHp = $(game.youChar[0]).attr("hP");
		console.log(youHp);
		var cntrAttckPwr = $(game.defender[0]).attr("cntrAttckPwr");
		console.log(cntrAttckPwr);
		$(game.youChar[0]).attr("hP", (youHp - cntrAttckPwr));
		console.log($(game.youChar[0]).attr("hP"));

		game.updateStats(game.youChar,".youChar>.stats",game.youChar[0].hP);


		$("#htmlAttckMsg").text("You attacked " + $(game.defender[0]).attr("name") + " and caused " + AttckPwr + " damage!");

		$("#htmlDefendMsg").text($(game.defender[0]).attr("name") + " counter attacked and caused " + cntrAttckPwr + " damage!");

		if ($(game.youChar[0]).attr("hP") <= 0) {
			game.lose();
			$("#htmlAttckButton").off("click");
		}

		else if ($(game.defender[0]).attr("hP") <= 0) {
			game.win();
			$("#htmlAttckButton").off("click");
		}
	},

	lose: function(){

		$("body").css("background-color", "#ffa632");
		

		defenderChoiceAudio.pause();

		var resetButton = $("<button>");
		resetButton.addClass("resetButton");
		resetButton.text("Reset");

		$("#htmlResetButton").append(resetButton);

		$("#htmlResetMsg").text("You lost to " + $(game.defender[0]).attr("name") + "! Hit the reset button to try again");

		

		game.htmlResetButton();

		
	},

	win: function(){

		$("body").css("background-color", "#ffa632");

		if (game.enemies.length == 0) {

			defenderChoiceAudio.pause();

			game.defender.length = 0;

			game.displayImages(game.defender,"#htmlDefender");
			var resetButton = $("<button>");
			resetButton.addClass("resetButton");
			resetButton.text("Reset");

			$("#htmlResetButton").append(resetButton);

			$("#htmlResetMsg").text("You won! Congratulations! Hit the reset button to play again");

			game.htmlResetButton();

		}

		else {

			defenderChoiceAudio.pause();
			enemyChoiceAudio.currentTime = 0
			enemyChoiceAudio.play();

			$("#htmlResetMsg").text("You beat " + $(game.defender[0]).attr("name") + "! Pick a new defender");

			game.defender.length = 0;

			game.displayImages(game.defender,"#htmlDefender");

			game.displayEnemiesClick();
		};

	},

	charClick: function(){

		$("<body>").attr("background-image", "");

		charChoiceAudio.currentTime = 0;
		charChoiceAudio.play();

		charChoiceAudio.addEventListener("ended", function(){
			this.play();
		}, false);

		$(".char").on("click", function(){
			charChoiceAudio.pause();
			
		
			console.log($(this).attr("name"));
			game.charChoice($(this).attr("name"));
		});
	},

	displayEnemiesClick: function(){
		$(".displayEnemies").on("click", ".enemy", function(){
		
			enemyChoiceAudio.pause();
			console.log($(this).attr("name"));
			game.chooseDefender($(this).attr("name"));
		});
	},

	htmlAttckButton: function(){
		$("#htmlAttckButton").on("click",function(){
		
			attckCount ++;
			console.log(attckCount);
			game.attck(attckCount);
		


		});
	},

	htmlResetButton: function(){
		$(".resetButton").on("click",function(){

			defenderChoiceAudio.pause();
		

			game.youChar.length = 0;
			game.defender.length = 0;
			game.enemies.length = 0;

			game.displayImages(game.youChar,"#htmlYouChar");
			game.displayImages(game.defender,"#htmlDefender");
			game.displayImages(game.enemies,"#htmlEnemies");

			chars = [

	{	
		name: "Ibuki",
		hP: 0,
		attkPwr: 0,
		cntrAttckPwr: 1
	},

	{	
		name: "Sagat",
		hP: 10,
		attkPwr: 15,
		cntrAttckPwr: 2
	},

	{	
		name: "Ryu",
		hP: 20,
		attkPwr: 25,
		cntrAttckPwr: 3
	},

	{	
		name: "Chun-Li",
		hP: 30,
		attkPwr: 35,
		cntrAttckPwr: 4
	}
];

			game.displayImages(chars,"#htmlChars","char");

			$(".resetButton").off("click");

			$("#htmlResetMsg").empty();
			$("#htmlResetButton").empty();

			$("#htmlAttckMsg").empty();

			$("#htmlDefendMsg").empty();

			attckCount = 0;


			game.charClick();
		});



		
	}


};







//Initial code upon loading:

$(document).ready(function(){

	

	game.displayImages(chars,"#htmlChars","char");

	game.charClick();




});

