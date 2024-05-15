
let sq;
let size;
let inTurn = 'O';

export function playMove(squares, nextMove = 'O', level = 0) {

    let moves = [];
    sq = squares.slice();
    size = sq.length;

    inTurn = nextMove;

    console.log(inTurn);

    for(var i = 0; i < sq.length; i++) {
        var row = sq[i];
        for(var j = 0; j < row.length; j++) {
            if (sq[i][j] === '-')
                moves.push({value: squareValue(i,j), move: [i,j]});
        }
    }

    moves.sort((a,b) => b.value - a.value);

    if (moves.length === size*size)
        return {x: Math.round(size/2)-1, y:  Math.round(size/2)-1, mark: inTurn }; // AI plays the first move
    
    return {x: moves[level].move[0], y:  moves[level].move[1], mark: inTurn};
}

function squareValue(x, y) {
    let c, str;
    let total = 0;
    let marks = ["X", "O"];

    for (let i = 0; i < marks.length; i++) {
        c = marks[i];
        sq[x][y] = c;
        str = from_to(x, y - 5, 0, +1, 11); //vertical
        total += row_value(str, c);
        str = from_to(x - 5, y, +1, 0, 11); //horizontal
        total += row_value(str, c);
        str = from_to(x - 5, y - 5, +1, +1, 11); //diagonal
        total += row_value(str, c);
        str = from_to(x + 5, y - 5, -1, +1, 11); //diagonal
        total += row_value(str, c);
    }
    sq[x][y] = "-"; // undo move

    return total;
 }

function from_to(x, y, step_x, step_y, len) {
    
    let str = "";

    for (let i = 0; i < len; i++) {
        if ((x >= 0 && x < size) && (y >= 0 && y < size)) {
            str += sq[x][y];
        }
        x += step_x;
        y += step_y;
    }

    return str;
}

function row_value(str, c) {
    let f, i;

    str = str.replace(/_/g, '-');
    
    f = (c === inTurn) ? 1 : 0;
    
    if ((i = str.search(c + c + c + c + c)) !== -1) {
        return 100000 + f * 10000;
    }
    if ((i = str.search(c + c + c + c)) !== -1) {
        if (str[i - 1] === "-" && str[i + 4] === "-") {
            return 10000 + f * 10000;
        }
        if (str[i - 1] === "-" || str[i + 4] === "-") {
            return 900 + f * 500;
        }
        return 0;
    }
    if ((i = str.search(c + c + c + "-" + c + "|" + c + "-" + c + c + c)) !== -1) {
        return 800 + f * 500;
    }
    if ((i = str.search(c + c + c)) !== -1) {
        if (str.slice(i - 2, i) === "--" && str.slice(i + 3, i + 5) === "--") {
            return 1000 + f * 1000;
        }
        if (str.slice(i - 2, i) === "--" || str.slice(i + 3, i + 5) === "--") {
            return 300 + f * 100;
        }
        return 0;
    }
    if ((i = str.search(c + c + '-' + c)) !== -1 || (i = str.search(c + '-' + c + c)) !== -1) {
        if (str.slice(i - 2, i) === "--" && str.slice(i + 4, i + 6) === "--") {
            return 800 + f * 100;
        }
        if (str.slice(i - 2, i) === "--" || str.slice(i + 4, i + 6) === "--") {
            return 500 + f * 100;
        }
        return 0;
    }
    if ((i = str.search('--' + c + c + '--')) !== -1) {
        return 100 + f * 100;
    }
    return 0;
}

/* --- End of AI ------- */

export function checkFive (x, y, squares) {
    let i, str, xs, ys;

    if (x === -1)
        return []; // not played yet

    sq = squares.slice();  

    let c = sq[x][y]; // last played (X or O)

    let winner_row = [];
    
    xs = x - 5;
    if (xs < 0) {
        xs = 0;
    }
    ys = y - 5;
    if (ys < 0) {
        ys = 0;
    }

    str = from_to(x, y - 5, 0, +1, 11); //vertical
    if ((i = str.search(c + c + c + c + c)) !== -1) {
        winner_row = [x, ys + i, x, ys + i + 4];
    }

    str = from_to(x - 5, y, +1, 0, 11); //horizontal
    if ((i = str.search(c + c + c + c + c)) !== -1) {
        winner_row = [xs + i, y, xs + i + 4, y];
    }

    if ((x - 5) <= 0 || (y - 5) <= 0) {
        xs = x > y ? x - y : 0;
        ys = y > x ? y - x : 0;
    }
    str = from_to(x - 5, y - 5, +1, +1, 11); //diagonal
    if ((i = str.search(c + c + c + c + c)) !== -1) {
        winner_row = [xs + i, ys + i, xs + i + 4, ys + i + 4];
    }

    xs = x + 5;
    ys = y - 5 < 0 ? 0 : y - 5;
    if ((x + 5) >= 19 || (y - 5) <= 0) {
        xs = (19 - x) > y ? x + y : 19;
        ys = y > (19 - x) ? y - (19 - x) : 0;
    }
    str = from_to(x + 5, y - 5, -1, +1, 11); //diagonal
    if ((i = str.search(c + c + c + c + c)) !== -1) {      
        winner_row = [xs - i, ys + i, xs - i - 4, ys + i + 4];
        console.log("Bug in this diagonal, but only sometimes!");
        console.log("winner_row:", winner_row);
    }
    
    return winnerLineAllSquares(winner_row);    
    
  }

function winnerLineAllSquares(line) {

    if (line.length !== 4)
        return [];

    let x_step = 0;

    if (line[2] - line[0] > 0)
        x_step = +1;
    
    if (line[2] - line[0] < 0)
        x_step = -1;
    
    let y_step = 0;

    if (line[3] - line[1] > 0)
        y_step = +1;
    
    if (line[3] - line[1] < 0)
        y_step = -1;

    let wLine = [line[0], line[1]];
    
    for (let k = 2; k < 8; k+=2 ) {
        wLine[k]   = wLine[k-2] + x_step;
        wLine[k+1] = wLine[k-1] + y_step;
    }

    wLine[8] = line[2];
    wLine[9] = line[3];

    return wLine;

}

export function checkDraw(squares) {

  let moves = [];
  sq = squares.slice();
  size = sq.length;

  for(var i = 0; i < sq.length; i++) {
      let row = sq[i];
      for(let j = 0; j < row.length; j++) {
          if (sq[i][j] === '-')
              moves.push({value: 0, move: [i,j]});
      }
  }

  if (moves.length === 0)
      return true;
  else
      return false;
  
}
 