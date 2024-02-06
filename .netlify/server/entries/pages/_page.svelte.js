import { c as create_ssr_component, b as subscribe, e as escape, a as add_attribute, f as set_store_value, d as each, v as validate_component } from "../../chunks/ssr.js";
import { b as board, g as gameBackground, c as gameMarkColor, s as squares, d as game, w as winner, e as winnerLine, v as vw, a as gameLineColor, S as Square } from "../../chunks/Square.js";
let sq;
let size;
let inTurn = "O";
function playMove(squares2, nextMove = "O") {
  let moves = [];
  sq = squares2.slice();
  size = sq.length;
  inTurn = nextMove;
  console.log(inTurn);
  for (var i = 0; i < sq.length; i++) {
    var row = sq[i];
    for (var j = 0; j < row.length; j++) {
      if (sq[i][j] === "-")
        moves.push({ value: squareValue(i, j), move: [i, j] });
    }
  }
  moves.sort((a, b) => b.value - a.value);
  if (moves.length === size * size)
    return { x: Math.round(size / 2) - 1, y: Math.round(size / 2) - 1, mark: inTurn };
  return { x: moves[0].move[0], y: moves[0].move[1], mark: inTurn };
}
function squareValue(x, y) {
  var c, k, len1, ref, str, total;
  total = 0;
  ref = ["X", "O"];
  for (k = 0, len1 = ref.length; k < len1; k++) {
    c = ref[k];
    sq[x][y] = c;
    str = from_to(x, y - 5, 0, 1, 11);
    total += row_value(str, c);
    str = from_to(x - 5, y, 1, 0, 11);
    total += row_value(str, c);
    str = from_to(x - 5, y - 5, 1, 1, 11);
    total += row_value(str, c);
    str = from_to(x + 5, y - 5, -1, 1, 11);
    total += row_value(str, c);
  }
  sq[x][y] = "-";
  return total;
}
function from_to(x, y, step_x, step_y, len) {
  var k, ref, str;
  str = "";
  for (k = 0, ref = len; 0 <= ref ? k < ref : k > ref; 0 <= ref ? ++k : --k) {
    if (x >= 0 && x < size && (y >= 0 && y < size)) {
      str += sq[x][y];
    }
    x += step_x;
    y += step_y;
  }
  return str;
}
function row_value(str, c) {
  var f, i;
  str = str.replace(/_/g, "-");
  f = c === inTurn ? 1 : 0;
  if ((i = str.search(c + c + c + c + c)) !== -1) {
    return 1e5 + f * 1e4;
  }
  if ((i = str.search(c + c + c + c)) !== -1) {
    if (str[i - 1] === "-" && str[i + 4] === "-") {
      return 1e4 + f * 1e4;
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
      return 1e3 + f * 1e3;
    }
    if (str.slice(i - 2, i) === "--" || str.slice(i + 3, i + 5) === "--") {
      return 300 + f * 100;
    }
    return 0;
  }
  if ((i = str.search(c + c + "-" + c)) !== -1 || (i = str.search(c + "-" + c + c)) !== -1) {
    if (str.slice(i - 2, i) === "--" && str.slice(i + 4, i + 6) === "--") {
      return 800 + f * 100;
    }
    if (str.slice(i - 2, i) === "--" || str.slice(i + 4, i + 6) === "--") {
      return 500 + f * 100;
    }
    return 0;
  }
  if ((i = str.search("--" + c + c + "--")) !== -1) {
    return 100 + f * 100;
  }
  return 0;
}
function checkFive(x, y, squares2) {
  var i, str, xs, ys;
  if (x === -1)
    return [];
  sq = squares2.slice();
  let c = sq[x][y];
  let winner_row = [];
  xs = x - 5;
  if (xs < 0) {
    xs = 0;
  }
  ys = y - 5;
  if (ys < 0) {
    ys = 0;
  }
  str = from_to(x, y - 5, 0, 1, 11);
  if ((i = str.search(c + c + c + c + c)) !== -1) {
    winner_row = [x, ys + i, x, ys + i + 4];
  }
  str = from_to(x - 5, y, 1, 0, 11);
  if ((i = str.search(c + c + c + c + c)) !== -1) {
    winner_row = [xs + i, y, xs + i + 4, y];
  }
  if (x - 5 <= 0 || y - 5 <= 0) {
    xs = x > y ? x - y : 0;
    ys = y > x ? y - x : 0;
  }
  str = from_to(x - 5, y - 5, 1, 1, 11);
  if ((i = str.search(c + c + c + c + c)) !== -1) {
    winner_row = [xs + i, ys + i, xs + i + 4, ys + i + 4];
  }
  xs = x + 5;
  ys = y - 5 < 0 ? 0 : y - 5;
  if (x + 5 >= 19 || y - 5 <= 0) {
    xs = 19 - x > y ? x + y : 19;
    ys = y > 19 - x ? y - (19 - x) : 0;
  }
  str = from_to(x + 5, y - 5, -1, 1, 11);
  if ((i = str.search(c + c + c + c + c)) !== -1) {
    winner_row = [xs - i, ys + i, xs - i - 4, ys + i + 4];
  }
  return winnerLineAllSquares(winner_row);
}
function winnerLineAllSquares(line) {
  if (line.length !== 4)
    return [];
  let x_step = 0;
  if (line[2] - line[0] > 0)
    x_step = 1;
  if (line[2] - line[0] < 0)
    x_step = -1;
  let y_step = 0;
  if (line[3] - line[1] > 0)
    y_step = 1;
  if (line[3] - line[1] < 0)
    y_step = -1;
  let wLine = [line[0], line[1]];
  for (let k = 2; k < 8; k += 2) {
    wLine[k] = wLine[k - 2] + x_step;
    wLine[k + 1] = wLine[k - 1] + y_step;
  }
  wLine[8] = line[2];
  wLine[9] = line[3];
  return wLine;
}
function checkDraw(squares2) {
  let moves = [];
  sq = squares2.slice();
  size = sq.length;
  for (var i = 0; i < sq.length; i++) {
    var row = sq[i];
    for (var j = 0; j < row.length; j++) {
      if (sq[i][j] === "-")
        moves.push({ value: 0, move: [i, j] });
    }
  }
  if (moves.length === 0)
    return true;
  else
    return false;
}
const Resizebutton_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: "button.svelte-1vcnqyw{position:absolute;border:none;background:none;margin:0;padding:0;border-radius:0;line-height:0;cursor:nwse-resize}button.svelte-1vcnqyw:active{background:none;cursor:nwse-resize}",
  map: null
};
const Resizebutton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $board, $$unsubscribe_board;
  let $gameBackground, $$unsubscribe_gameBackground;
  let $gameMarkColor, $$unsubscribe_gameMarkColor;
  $$unsubscribe_board = subscribe(board, (value) => $board = value);
  $$unsubscribe_gameBackground = subscribe(gameBackground, (value) => $gameBackground = value);
  $$unsubscribe_gameMarkColor = subscribe(gameMarkColor, (value) => $gameMarkColor = value);
  let { size: size2 = $board.size } = $$props;
  let { top = size2 } = $$props;
  let { left = size2 } = $$props;
  let { resized = size2 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size2 !== void 0)
    $$bindings.size(size2);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  if ($$props.left === void 0 && $$bindings.left && left !== void 0)
    $$bindings.left(left);
  if ($$props.resized === void 0 && $$bindings.resized && resized !== void 0)
    $$bindings.resized(resized);
  $$result.css.add(css$2);
  $$unsubscribe_board();
  $$unsubscribe_gameBackground();
  $$unsubscribe_gameMarkColor();
  return `<button style="${"top:" + escape(top + 8, true) + "px; left:" + escape(left + 8, true) + "px; color:" + escape($gameBackground, true) + "; width:" + escape(12, true) + "px; height:" + escape(12, true) + "px;"}" class="svelte-1vcnqyw"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><line opacity="0.6"${add_attribute("stroke", $gameMarkColor, 0)} stroke-width="12%" x1="10%" y1="90%" x2="90%" y2="10%"></line><line opacity="0.6"${add_attribute("stroke", $gameMarkColor, 0)} stroke-width="12%" x1="40%" y1="90%" x2="90%" y2="40%"></line><line opacity="0.6"${add_attribute("stroke", $gameMarkColor, 0)} stroke-width="12%" x1="70%" y1="90%" x2="90%" y2="70%"></line></svg> </button>`;
});
const Game_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: '.board-row.svelte-10qzapj:after{clear:both;content:"";display:table}svg.svelte-10qzapj{position:absolute;top:0px;left:0px}.wrapper.svelte-10qzapj{position:relative;border-width:19px 20px 20px 19px;margin-left:-10px}@keyframes svelte-10qzapj-dash{to{stroke-dashoffset:1000}}@media screen and (max-width: 50rem){svg.svelte-10qzapj{width:640px;height:640px}}',
  map: null
};
const Game = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $squares, $$unsubscribe_squares;
  let $game, $$unsubscribe_game;
  let $winner, $$unsubscribe_winner;
  let $winnerLine, $$unsubscribe_winnerLine;
  let $board, $$unsubscribe_board;
  let $vw, $$unsubscribe_vw;
  $$unsubscribe_squares = subscribe(squares, (value) => $squares = value);
  $$unsubscribe_game = subscribe(game, (value) => $game = value);
  $$unsubscribe_winner = subscribe(winner, (value) => $winner = value);
  $$unsubscribe_winnerLine = subscribe(winnerLine, (value) => $winnerLine = value);
  $$unsubscribe_board = subscribe(board, (value) => $board = value);
  $$unsubscribe_vw = subscribe(vw, (value) => $vw = value);
  let rows = $squares.length;
  let lastMove = { x: 0, y: 0 };
  let visible = false;
  let line = [0, 0, 0, 0];
  let squareSize = 20;
  let animate = false;
  gameBackground.subscribe((value) => {
  });
  gameLineColor.subscribe((value) => {
  });
  let humanMark = "X";
  function markMove(x, y) {
    console.log("Squares:", $squares);
    if ($winner !== "")
      return;
    if ($squares[x][y] !== "-")
      return;
    set_store_value(squares, $squares[x][y] = humanMark, $squares);
    set_store_value(game, $game.status = "ready", $game);
    lastMove = { x, y };
    set_store_value(winnerLine, $winnerLine = checkFive(x, y, $squares), $winnerLine);
    if ($winnerLine.length > 0) {
      animate = true;
      return;
    }
    console.log("Tasuri? " + checkDraw($squares));
    if (checkDraw($squares)) {
      set_store_value(winner, $winner = "Tasapeli", $winner);
      set_store_value(game, $game.movesFirst = $game.movesFirst === "human" ? "ai" : "human", $game);
      return;
    }
    playAI(humanMark === "O" ? "X" : "O");
  }
  function playAI(inTurn2) {
    console.log("AI plays...");
    if ($winner !== "")
      return;
    let move = playMove($squares.slice(), inTurn2);
    console.log("Move:", move);
    set_store_value(squares, $squares[move.x][move.y] = move.mark, $squares);
    set_store_value(game, $game.status = "started", $game);
    lastMove = { x: move.x, y: move.y };
    set_store_value(winnerLine, $winnerLine = checkFive(move.x, move.y, $squares), $winnerLine);
    console.log("winnerLine: " + $winnerLine);
    if ($winnerLine.length > 0) {
      animate = true;
      return;
    }
    console.log("Tasuri? " + checkDraw($squares));
    if (checkDraw($squares)) {
      set_store_value(winner, $winner = "Tasapeli", $winner);
      set_store_value(game, $game.movesFirst = $game.movesFirst === "human" ? "ai" : "human", $game);
    }
  }
  function newGame(size2 = 15, m) {
    console.log("creating a new game-----");
    humanMark = m;
    set_store_value(squares, $squares = Array(size2).fill().map(() => Array(size2).fill("-")), $squares);
    set_store_value(winnerLine, $winnerLine = [], $winnerLine);
    set_store_value(winner, $winner = "", $winner);
    set_store_value(game, $game.status = "ready", $game);
    console.log("rows:", $squares.length);
    if ($game.movesFirst === "ai") {
      let move = playMove($squares.slice(), humanMark === "O" ? "X" : "O");
      set_store_value(squares, $squares[move.x][move.y] = move.mark, $squares);
      lastMove = { x: move.x, y: move.y };
    }
  }
  function showLastMove() {
    visible = true;
    setTimeout(
      () => {
        visible = false;
      },
      500
    );
  }
  if ($$props.newGame === void 0 && $$bindings.newGame && newGame !== void 0)
    $$bindings.newGame(newGame);
  if ($$props.showLastMove === void 0 && $$bindings.showLastMove && showLastMove !== void 0)
    $$bindings.showLastMove(showLastMove);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    rows = $squares.length;
    squareSize = Math.round($board.size / rows) % 2 === 0 ? Math.round($board.size / rows) : Math.round($board.size / rows);
    {
      console.log(`Changed square: ${squareSize} board.size: ${$board.size}`);
    }
    {
      if ($winnerLine.length > 0) {
        let ss = squareSize;
        line[0] = Math.floor($winnerLine[1] * ss + ss / 2 + 1);
        line[1] = Math.floor($winnerLine[0] * ss + ss / 2 + 1);
        line[2] = Math.floor($winnerLine[9] * ss + ss / 2 + 1);
        line[3] = Math.floor($winnerLine[8] * ss + ss / 2 + 1);
        set_store_value(winner, $winner = $squares[lastMove.x][lastMove.y], $winner);
        console.log("winner:", $winner);
        console.log("ss:", humanMark);
        if ($winner === humanMark)
          set_store_value(game, $game.score.human++, $game);
        else
          set_store_value(game, $game.score.AI++, $game);
        set_store_value(game, $game.status = "over", $game);
        set_store_value(game, $game.movesFirst = $game.movesFirst === "human" ? "ai" : "human", $game);
        console.log("GAME OVER");
      }
    }
    {
      console.log($game);
    }
    $$rendered = `<div class="wrapper square-colors svelte-10qzapj" style="${"width:" + escape(rows * squareSize + 39, true) + "px;"}">${$winnerLine.length > 0 ? `<svg${add_attribute("height", rows * squareSize, 0)}${add_attribute("width", rows * squareSize, 0)} class="svelte-10qzapj"><line${add_attribute("x1", line[0], 0)}${add_attribute("y1", line[1], 0)}${add_attribute("x2", line[2], 0)}${add_attribute("y2", line[3], 0)} opacity="0.6"${add_attribute("stroke-width", squareSize / 3, 0)} stroke-linecap="round">${animate ? `<animate attributeType="XML"${add_attribute("values", "gray;black", 0)} attributeName="stroke" dur="0.5s" repeatCount="3"></animate>` : ``}</line></svg>` : ``} ${each($squares, (row, i) => {
      return `<div class="board-row svelte-10qzapj">${each(row, (square, j) => {
        return `${validate_component(Square, "Square").$$render(
          $$result,
          {
            onClick: () => markMove(i, j),
            text: $squares[i][j] === "-" ? "" : $squares[i][j],
            anim: i == lastMove.x && j == lastMove.y && visible ? true : false,
            size: squareSize
          },
          {},
          {}
        )}`;
      })} </div>`;
    })} ${$vw > 800 ? `${validate_component(Resizebutton, "Resizebutton").$$render(
      $$result,
      {
        top: rows * squareSize,
        left: rows * squareSize,
        resized: $board.size
      },
      {
        resized: ($$value) => {
          $board.size = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}</div> `;
  } while (!$$settled);
  $$unsubscribe_squares();
  $$unsubscribe_game();
  $$unsubscribe_winner();
  $$unsubscribe_winnerLine();
  $$unsubscribe_board();
  $$unsubscribe_vw();
  return $$rendered;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "*{margin:0;padding:0;box-sizing:border-box}body{margin:0;padding:0;box-sizing:border-box;user-select:none}.container.svelte-1slarh6.svelte-1slarh6{display:flex;align-items:center}main.svelte-1slarh6.svelte-1slarh6{text-align:center;padding:0;max-width:none;display:flex;justify-content:center;align-items:normal;flex-wrap:wrap;flex-direction:row}.left.svelte-1slarh6.svelte-1slarh6{padding:20px;box-shadow:rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;margin:0 1em;height:min-content}.middle.svelte-1slarh6.svelte-1slarh6{padding:0px;justify-content:center}.right.svelte-1slarh6.svelte-1slarh6{padding:20px;width:20%;box-shadow:rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;margin:0 1em}fieldset.svelte-1slarh6.svelte-1slarh6{border-radius:0px;padding:1vh;border-color:#000;border-width:2px}legend.svelte-1slarh6.svelte-1slarh6{background-color:#0000}table.scores.svelte-1slarh6.svelte-1slarh6,td.scores.svelte-1slarh6.svelte-1slarh6{border-collapse:collapse}td.scores.svelte-1slarh6.svelte-1slarh6{border:1px solid black;width:100px;text-align:center;background-color:#ffffff77}td.svelte-1slarh6.svelte-1slarh6,tr.svelte-1slarh6.svelte-1slarh6{padding:0}th.svelte-1slarh6.svelte-1slarh6{background-color:#00000000;border-bottom:3px solid #444}@keyframes svelte-1slarh6-pulse{0%{opacity:1.0}50%{opacity:0.2}100%{opacity:0.5}}@media screen and (max-width: 1000px){.middle.svelte-1slarh6.svelte-1slarh6,.right.svelte-1slarh6.svelte-1slarh6{width:100%}main.svelte-1slarh6 .svelte-1slarh6:nth-child(1){order:2}main.svelte-1slarh6 .svelte-1slarh6:nth-child(2){order:1}main.svelte-1slarh6 .svelte-1slarh6:nth-child(3){order:3}}@media screen and (max-width: 480px){.left.svelte-1slarh6.svelte-1slarh6,.middle.svelte-1slarh6.svelte-1slarh6,.right.svelte-1slarh6.svelte-1slarh6{width:100%}main.svelte-1slarh6 .svelte-1slarh6:nth-child(1){order:2}main.svelte-1slarh6 .svelte-1slarh6:nth-child(2){order:1}main.svelte-1slarh6 .svelte-1slarh6:nth-child(3){order:3}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $game, $$unsubscribe_game;
  let $vw, $$unsubscribe_vw;
  let $board, $$unsubscribe_board;
  let $winner, $$unsubscribe_winner;
  $$unsubscribe_game = subscribe(game, (value) => $game = value);
  $$unsubscribe_vw = subscribe(vw, (value) => $vw = value);
  $$unsubscribe_board = subscribe(board, (value) => $board = value);
  $$unsubscribe_winner = subscribe(winner, (value) => $winner = value);
  let gameRef;
  let changeDisabled = true;
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        console.log(`Changed vw: ${$vw}`);
        if ($vw < 800)
          set_store_value(board, $board.size = $vw - 19, $board);
      }
    }
    changeDisabled = $game.status === "started" ? true : false;
    {
      console.log("status:", $game.status);
    }
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-t6e64r_START -->${$$result.title = `<title>Ristinolla</title>`, ""}<meta name="robots" content="noindex nofollow"><html lang="fi"></html><!-- HEAD_svelte-t6e64r_END -->`, ""} <main class="svelte-1slarh6"><div class="left theme-colors svelte-1slarh6"><fieldset class="svelte-1slarh6"><legend class="svelte-1slarh6" data-svelte-h="svelte-1d8r5lj">Pelitilanne</legend> <table class="scores svelte-1slarh6"><tr class="svelte-1slarh6" data-svelte-h="svelte-1wd0y6k"><th class="svelte-1slarh6">Sinä</th> <th class="svelte-1slarh6">Tietokone</th></tr> <tr class="svelte-1slarh6"><td id="xscore" class="scores svelte-1slarh6">${escape($game.score.human)}</td> <td id="oscore" class="scores svelte-1slarh6">${escape($game.score.AI)}</td></tr></table> <br class="svelte-1slarh6"> <p class="svelte-1slarh6">${escape($winner === "" ? "Sinun vuorosi" : "Voittaja: " + $winner)}</p> <p class="container svelte-1slarh6">Pelimerkkisi:
			${`<svg width="1.5rem" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="stroke: black;" class="svelte-1slarh6"><line opacity="1.0" stroke-width="12%" x1="20%" y1="20%" x2="80%" y2="80%" class="svelte-1slarh6"></line><line opacity="1.0" stroke-width="12%" x1="80%" y1="20%" x2="20%" y2="80%" class="svelte-1slarh6"></line></svg>`} <button ${changeDisabled ? "disabled" : ""} class="svelte-1slarh6">Vaihda</button>  </p></fieldset> <button ${($winner !== "" ? false : true) ? "disabled" : ""} class="svelte-1slarh6">Uusi peli</button> <button class="svelte-1slarh6" data-svelte-h="svelte-jrlj43">Viime siirto</button> <br class="svelte-1slarh6"> <button ${changeDisabled ? "disabled" : ""} class="svelte-1slarh6">10×10</button> <button ${changeDisabled ? "disabled" : ""} class="svelte-1slarh6">15×15</button> <button ${changeDisabled ? "disabled" : ""} class="svelte-1slarh6">20×20</button> <button ${changeDisabled ? "disabled" : ""} class="svelte-1slarh6">25×25</button></div> <div class="middle svelte-1slarh6">${validate_component(Game, "Game").$$render(
      $$result,
      { this: gameRef },
      {
        this: ($$value) => {
          gameRef = $$value;
          $$settled = false;
        }
      },
      {}
    )} </div> <div class="right svelte-1slarh6" data-svelte-h="svelte-lsq1ny"></div> </main>`;
  } while (!$$settled);
  $$unsubscribe_game();
  $$unsubscribe_vw();
  $$unsubscribe_board();
  $$unsubscribe_winner();
  return $$rendered;
});
export {
  Page as default
};
