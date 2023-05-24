function turn_blue(circle_number) {
    var cell = $("td").eq(circle_number)
    cell.html('<img src="circle-blue.png">');
}

function turn_red(circle_number) {
    var cell = $("td").eq(circle_number)
    cell.html('<img src="circle-red.png">')
}

function position_to_tdnum(row, col) {
    return 7 * row + col;
}


const red = 1;
const blue = 2;

var game_repr = [
    [0, 0, 0, 0, 0, 0], // col 0
    [0, 0, 0, 0, 0, 0], // col 1
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0] // col 6
];

function compute_row(column) {
    var row = 5;
    var exit = false;
    while (!exit) {
	if (game_repr[column][row] != 0) {
	    row -= 1;
	    exit = false;
	} else {
	    exit = true;
	}
	if (row == -1) {
	    exit = true;
	}
    }
    return row;
}


function put_element(column, row, colour) {
    
    if (row != -1) {
	game_repr[column][row] = colour;
	var position = position_to_tdnum(row, column);
	if (colour == red) {
	    turn_red(position);
	} else {
	    turn_blue(position);
	}
    }
}

function change_curent_colour() {
    if (current_colour == red) {
	current_colour = blue;
    } else {
	current_colour = red;
    }
}

function is_winer(column, row, colour) {
    var ocuppy = 1;
    // check column
    var check_row = row - 1;
    while(check_row >= 0 && game_repr[column][check_row] == colour) {
	ocuppy += 1;
	check_row -= 1;
    }
    if (ocuppy < 4) {
	check_row = row + 1;
	while(check_row < 6 && game_repr[column][check_row] == colour) {
	    ocuppy += 1;
	    check_row += 1;
	}
    }
    var check_column = column - 1;
    if (ocuppy < 4) {
	// check row
	ocuppy = 1;
	while(check_column >= 0 && game_repr[check_column][row] == colour) {
	    ocuppy += 1;
	    check_column -= 1;
	}
	if (ocuppy < 4) {
	    check_column = column + 1;
	    while(check_column < 7 && game_repr[check_column][row] == colour) {
		ocuppy += 1;
		check_column += 1;
	    }
	}
    }
    if (ocuppy < 4) {
	// diagonal
	// left
	ocuppy = 1;
	check_column = column + 1;
	check_row = row - 1;
	while (check_column < 7 && check_row >= 0 &&
	       game_repr[check_column][check_row] == colour) {
	    ocuppy += 1;
	    check_column += 1;
	    check_row -= 1;
	}
	if (ocuppy < 4) {
	    check_column = column - 1;
	    check_row = row + 1;
	    while (check_column >= 0 && check_row < 6 &&
		   game_repr[check_column][check_row] == colour) {
		ocuppy += 1;
		check_column -= 1;
		check_row += 1;
	    }
	}
    }
    if (ocuppy < 4) {
	ocuppy = 1;
	check_column = column - 1;
	check_row = row - 1;
	while (check_column >= 0 && check_row >= 0 &&
	       game_repr[check_column][check_row] == colour) {
	    ocuppy += 1;
	    check_column -= 1;
	    check_row -= 1;
	}
	if (ocuppy < 4) {
	    check_column = column + 1;
	    check_row = row + 1;
	    while (check_column < 7 && check_row < 6 &&
		   game_repr[check_column][check_row] == colour) {
		ocuppy += 1;
		check_column += 1;
		check_row += 1;
	    }
	}
    }
    return (ocuppy >= 4)
}

var current_colour = red;
function put_column() {
    var column = -1;
    if ($(this).hasClass("col0")) column = 0;
    if ($(this).hasClass("col1")) column = 1;
    if ($(this).hasClass("col2")) column = 2 ;
    if ($(this).hasClass("col3")) column = 3;
    if ($(this).hasClass("col4")) column = 4;
    if ($(this).hasClass("col5")) column = 5;
    if ($(this).hasClass("col6")) column = 6;
    var row = compute_row(column);
    put_element(column, row, current_colour);
    if (is_winer(column, row, current_colour)) {
	$("td").off("click");
	var win_message =" is win !!!"
	var player ="";
	if (current_colour == red) {
	    player = "Player 1";
	} else {
	    player = "Player 2"
	}
	$(".game-message").html("<strong>" + player + win_message + "</strong>" +
				"<p>Refresh page to begin game</p>")
    } else {
	change_curent_colour();
	if (current_colour == red) {
	    $(".game-message").html("<strong>Player 1 (RED)</strong>");
	} else {
	    $(".game-message").html("<strong>Player 2 (BLUE)</strong>");
	}
    }
}

$("td").each(function() {
    $(this).click(put_column);
}
	);
