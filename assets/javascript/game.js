// Global Variables

var you;

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
	displayImages: function(array,location){
		var length = array.length;

		if(length === 0){
			$(location).empty();
		}

		//Create an <img> tag for each char object and fill it
		for (var i = 0; i <length; i++) {
			var eachChar = $("<img>");
			eachChar.addClass("char");
			eachChar.attr("name",array[i].name);
			eachChar.attr("src","assets/images/"+array[i].name+".jpg");
			$(location).append(eachChar);

		};

	},

	charChoice: function(nameinput){
		console.log(nameinput);
		var index;
		for (var i = 0; i < chars.length; i++) {
			if(chars[i].name === nameinput)
				index = i;
		};

		game.youChar.push(chars[index]);
		chars.splice(index,1);
		game.displayImages(game.youChar,".displayYouChar")
		
		you = $(game.youChar[0]).attr("name");

		for (var i = 0; i <chars.length; i++) {
			game.enemies.push(chars[i]);
		}
		
		chars.length = 0;
		console.log(game.enemies);
		game.displayImages(game.enemies,".displayEnemies");
		

		game.displayImages(chars,".displayChars");
		
		
		
		console.log(game.youChar);
		console.log(chars);

	}


};







//Event Listeners

$(document).ready(function(){
	game.displayImages(chars,".displayChars");

	$(".char").on("click", function(){
		if (game.youChar.length === 0) {
			console.log($(this).attr("name"));
			game.charChoice($(this).attr("name"));


		};

		


	});

});

