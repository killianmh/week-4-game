// Global Variables

var you;

var defender;

var attckCount = 0;

// Character Array

var chars = [

	{	
		name: "swordfish",
		hP: 0,
		attkPwr: 0,
		cntrAttckPwr: 0
	},

	{	
		name: "killerwhale",
		hP: 10,
		attkPwr: 15,
		cntrAttckPwr: 18
	},

	{	
		name: "octopus",
		hP: 20,
		attkPwr: 25,
		cntrAttckPwr: 28
	},

	{	
		name: "shark",
		hP: 30,
		attkPwr: 35,
		cntrAttckPwr: 38
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
			var eachChar = $("<img>");
			eachChar.addClass(newClass);
			eachChar.attr("name",array[i].name);
			eachChar.attr("src","assets/images/"+array[i].name+".jpg");
			$(location).append(eachChar);

		};

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

		game.displayEnemiesClick();


		// $("*").off("click");



	},

	chooseDefender: function(nameinput){

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

		game.htmlAttckButton();

	},

	attck: function(attckCount){



		var defenderHp = $(game.defender[0]).attr("hP");
		console.log(defenderHp);
		var AttckPwr = $(game.youChar[0]).attr("attkPwr") * attckCount;
		console.log(AttckPwr);
		$(game.defender[0]).attr("hP",(defenderHp - AttckPwr));
		console.log($(game.defender[0]).attr("hP"));

		var youHp = $(game.youChar[0]).attr("hP");
		console.log(youHp);
		var cntrAttckPwr = $(game.defender[0]).attr("cntrAttckPwr");
		console.log(cntrAttckPwr);
		$(game.youChar[0]).attr("hP", (youHp - cntrAttckPwr));
		console.log($(game.youChar[0]).attr("hP"));

		$("#htmlAttckMsg").text("You attacked " + $(game.defender[0]).attr("name") + " and caused " + AttckPwr + " damage!");

		$("#htmlDefendMsg").text($(game.defender[0]).attr("name") + " counter attacked and caused " + cntrAttckPwr + " damage!");

		if ($(game.youChar[0]).attr("hP") <= 0) {
			game.lose();
			$("#htmlAttckButton").off("click");
		}

		// if ($(game.defender[0]).attr("hP") <= 0) {
		// 	game.win();
		// }
	},

	lose: function(){
		console.log("poop");
		// game.youChar.length = 0;
		// game.defender.length = 0;
		// game.enemies.length = 0;

		var resetButton = $("<button>");
		resetButton.addClass("resetButton");

		$("#htmlResetButton").append(resetButton);

		game.htmlResetButton();

		
	},

	charClick: function(){
		$(".char").on("click", function(){
		console.log("poop");
		// if (game.youChar.length === 0) {
			console.log($(this).attr("name"));
			game.charChoice($(this).attr("name"));
		// };
		});
	},

	displayEnemiesClick: function(){
		$(".displayEnemies").on("click", ".enemy", function(){
		// console.log("poop");
		// if(game.defender.length === 0){
			console.log($(this).attr("name"));
			game.chooseDefender($(this).attr("name"));
		// };
		});
	},

	htmlAttckButton: function(){
		$("#htmlAttckButton").on("click",function(){
		// if(game.defender.length === 1){
			// console.log("poop");
			attckCount ++;
			console.log(attckCount);
			game.attck(attckCount);
		// };


		});
	},

	htmlResetButton: function(){
		$(".resetButton").on("click",function(){
			// console.log("hahaha");

			game.youChar.length = 0;
			game.defender.length = 0;
			game.enemies.length = 0;

			game.displayImages(game.youChar,"#htmlYouChar");
			game.displayImages(game.defender,"#htmlDefender");
			game.displayImages(game.enemies,"#htmlEnemies");

			chars = [

			{	
				name: "swordfish",
				hP: 0,
				attkPwr: 0,
				cntrAttckPwr: 0
			},

			{	
				name: "killerwhale",
				hP: 10,
				attkPwr: 15,
				cntrAttckPwr: 18
			},

			{	
				name: "octopus",
				hP: 20,
				attkPwr: 25,
				cntrAttckPwr: 28
			},

			{	
				name: "shark",
				hP: 30,
				attkPwr: 35,
				cntrAttckPwr: 38
			}
			];

			game.displayImages(chars,"#htmlChars","char");

			$(".resetButton").off("click");

			$("#htmlResetButton").empty();

			// game.displayImages()


			game.charClick();
		});



		
	}


};







//Event Listeners

$(document).ready(function(){
	game.displayImages(chars,"#htmlChars","char");

	game.charClick();

	// game.displayEnemiesClick();

	// game.htmlAttckButton();

	// $(".char").on("click", function(){
	// 	console.log("poop");
	// 	// if (game.youChar.length === 0) {
	// 		console.log($(this).attr("name"));
	// 		game.charChoice($(this).attr("name"));
	// 	// };
	// });

	// $(".displayEnemies").on("click", ".enemy", function(){
	// 	// console.log("poop");
	// 	// if(game.defender.length === 0){
	// 		console.log($(this).attr("name"));
	// 		game.chooseDefender($(this).attr("name"));
	// 	// };
	// });

	// $("#htmlAttckButton").on("click",function(){
	// 	if(game.defender.length === 1){
	// 		// console.log("poop");
	// 		attckCount ++;
	// 		console.log(attckCount);
	// 		game.attck(attckCount);
	// 	};


	// });



});

