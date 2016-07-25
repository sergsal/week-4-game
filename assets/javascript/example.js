$(document).ready(function() {
	var monsters = new Array(4);
	monsters[0] = new Monster ('Godzilla', 'godzilla.jpg', 220, 25, 10);
	monsters[1] = new Monster ('Mothra', 'mothra.jpg', 210, 30, 15);
	monsters[2] = new Monster ('King Kong', 'kingkong.jpg', 230, 20, 25);
	monsters[3] = new Monster ('Mechagodzilla', 'mechagodzilla.png', 240, 18, 30);

	var player = -1;
	var opponent = -1;
	var graveYard = new Array;  // Array of defeated opponents
	var numWins = 0;

	function Monster(name, image, health, attack, counter) {
		this.name = name;
		this.image = image;
		this.health = health;
		this.attack = attack;
		this.counter = counter;
		this.status = 'available';
	};

	$('#attack').click(function () {
		if (player > -1 && opponent > -1) {
			battle();
		}
	});

	function showMonsterPool() {
		$('#charSelect').empty();
		for (ctr = 0; ctr < monsters.length; ctr++) {
			// checking whether a monster has been selected or eliminated
			if (monsters[ctr].status == 'available') {
				var $newMonster = $('<div>')
					.addClass('col-sm-3 text-center monbox')
					.attr('monster-id', ctr)
					.html('<span class="name">'+ monsters[ctr].name + '</span><img class ="picture" src="assets/images/'+ monsters[ctr].image +'"><span class="hp">'+ monsters[ctr].health + '</span>');
				$('#charSelect').append($newMonster);				
			}
		}
		$('.monbox').click(function() {
			selectMonster(this.getAttribute('monster-id'));
		});
	};

	function showFighter(index) {
		var $newMonster = $('<div>')
			.addClass('col-sm-3 text-center monbox')
			.html('<span class="name">'+ monsters[index].name + ' ' + monsters[index].health + '</span><img class ="picture" src="assets/images/'+ monsters[index].image +'"><span class="hp">'+ 'Attack ' + monsters[index].attack +'</span>');
		$('#chosenChar').html($newMonster);
		
	};
	function showOpponent(index) {
		var $newOpponent = $('<div>')
			.addClass('col-sm-3 text-center monbox')
			.html('<span class="name">'+ monsters[index].name + ' ' + monsters[index].health + '</span><img class ="picture" src="assets/images/'+ monsters[index].image +'"><span class="hp">'+' Counter ' +  + monsters[index].counter +'</span>');
		$('#defender').html($newOpponent);

	};
	function battle() {
		monsters[opponent].health = monsters[opponent].health	- monsters[player].attack;
		monsters[player].health = monsters[player].health	- monsters[opponent].counter;		
		if (monsters[opponent].health < 1) {
			// Round over, player wins
			monsters[opponent].health = 0;
			monsters[opponent].status = 'lost';
			nextRound();
		} else if (monsters[player].health < 1) {
			// Round over, opponent wins
			monsters[player].health = 0;
			gameOver();
		}
		monsters[player].attack = monsters[player].attack + 10;
		refreshDisplay();
	};

	function nextRound() {
		graveYard.push(opponent);
		numWins++;
		console.log(numWins);
		if (numWins > 2) {
			playerWins();
			monsters[player].health = 0;
		}
		opponent = -1;
		$('#defender').empty();		
		refreshDisplay();
		$('#lost').empty();
		showGraveYard();		
	};
	function gameOver() {
		$('#gameStatus').html("<h2>You have been defeated!<h2>");
	};
	function playerWins() {
		$('#gameStatus').html('<h2>You have slain your enemies!<span class="name">'+ monsters[player].name + '</span><img class="picture" src="assets/images/'+ monsters[player].image +'"><span class="hp"> </span></h2>');
	};
	function refreshDisplay () {
		showMonsterPool();
		if (player != -1) {
			showFighter(player);
			if (graveYard.length > 1) {
				$('#fightStatus').html("Ultimate Battle!");			
			} else if (graveYard.length > 0) {
				$('#fightStatus').html("Select your next victim!");			
			} else {
				$('#fightStatus').html("Select your victim!");			
			}
		};
		if (opponent != -1) {
			showOpponent(opponent);
			if (graveYard.length < 2) {
				// only shown for first two fights
				$('#fightStatus').html("Ready, Set, Fight!");	
			};
		};
	};
	function showGraveYard() {
		for (ctr = 0; ctr < monsters.length; ctr++) {
			$('#lost').empty;
				if (monsters[ctr].status == 'lost') {
					var $defeatedMonster = $('<div>')
						.addClass('monbox col-sm-3 text-center')
						.html('<span class="name">'+ monsters[ctr].name + '</span><img class="picture" src="assets/images/'+ monsters[ctr].image +'"><span> </span>'+ '<span class="hp">Enemy Defeated</span>');
					$('#lost').append($defeatedMonster);	
				};
		};
	};
	function selectMonster(index) {
		if (player === -1 && opponent === -1 ) {
			// nothing has been chosen
			player = index;
			monsters[player].status = 'player';
		} else if (opponent === -1) {
			// player already chosen, so second click selects opponent
			opponent = index;
			monsters[opponent].status = 'opponent';			
		};
		refreshDisplay();
	};

	showMonsterPool();

})