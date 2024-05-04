<main>
    <div>
        <br>
        <h1>Tietoja</h1>
        <br>
        <p>   
        Vanhassa kunnon Emacs-editorissa on yhtenä pelinä Gomoku, joka pelaa nopeasti ja samalla kumman hyvin.
        Tietysti sen Lispillä tehtyä lähdekoodia piti vilkaista ja siellä yllättäen selitetään pelialgoritmin
        toimintaa seuraavasti:
        </p>            
        <pre>    
        <code>
    ;; The key point point about the algorithm is that, rather than considering
    ;; the board as just a set of squares, we prefer to see it as a "space" of
    ;; internested 5-tuples of contiguous squares (called qtuples).
    ;;
    ;; The aim of the program is to fill one qtuple with its O's while preventing
    ;; you from filling another one with your X's. To that effect, it computes a
    ;; score for every qtuple, with better qtuples having better scores. Of
    ;; course, the score of a qtuple (taken in isolation) is just determined by
    ;; its contents as a set, i.e. not considering the order of its elements. The
    ;; highest score is given to the "OOOO" qtuples because playing in such a
    ;; qtuple is winning the game. Just after this comes the "XXXX" qtuple because
    ;; not playing in it is just loosing the game, and so on. Note that a
    ;; "polluted" qtuple, i.e. one containing at least one X and at least one O,
    ;; has score zero because there is no more any point in playing in it, from
    ;; both an attacking and a defending point of view.
    ;;
    ;; Given the score of every qtuple, the score of a given free square on the
    ;; board is just the sum of the scores of all the qtuples to which it belongs,
    ;; because playing in that square is playing in all its containing qtuples at
    ;; once. And it is that function which takes into account the internesting of
    ;; the qtuples.
    ;;
    ;; This algorithm is rather simple but anyway it gives a not so dumb level of
    ;; play. It easily extends to "n-dimensional Gomoku", where a win should not
    ;; be obtained with as few as 5 contiguous marks: 6 or 7 (depending on n !)
    ;; should be preferred.


    ;; Here are the scores of the nine "non-polluted" configurations.  Tuning
    ;; these values will change (hopefully improve) the strength of the program
    ;; and may change its style (rather aggressive here).
        </code>
        </pre>
        Tuon idean mukaan myös tämän sivuston ristinollaa pelaava "tekoäly" on tehty.
        Toki oli hauskempi olla lukematta kyseistä lispkoodia ja tehdä kokonaan oma versio samalla idealla.
        
        
     
    </div>
    
    </main>
    
    <style>
    
    h1 {
        text-align: center;
    }
    
    div {
        margin: auto;
        width: 50%;
    }
    
    @media screen and (max-width: 60rem) {
              div {
                width: 80%; 
              }
        }
    
    
    @media screen and (max-width: 30rem) {
        div {
            width: 95%; 
        }
    }
    
    </style>
    
    
    


