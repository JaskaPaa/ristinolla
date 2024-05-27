<main>
    <div>
        <br>
        <h1>Tietoja</h1>
        <br>
        <p>   
        Vanhassa kunnon Emacs-editorissa on yhtenä pelinä gomoku, joka on lähes sama peli kuin ristinolla.
        Kyseinen Emacsin gomoku pelasi nopeasti ja samalla kumman hyvin, joten pakkohan silloin oli vilkaista sen Lispillä tehtyä lähdekoodia.
        Lähdekoodissa yllättäen ja pyytämättä selitetään pelialgoritmin toimintaa melkoisen kattavasti. Linkki kyseiseen tiedostoon: 
        <a href="https://github.com/typester/emacs/blob/master/lisp/play/gomoku.el">gomoku.el</a>
        </p>
        <br>           
        <p> 
        Saman idean mukaan myös tämän sivuston ristinollaa pelaava tekoäly on tehty.          
        Tietysti oli hauskempi olla lukematta kyseistä koodia ja tehdä kokonaan oma versio samalla idealla.
        On vielä mainittava, että koodi ei perustu milläänlailla yleiseen esimerkiksi shakissa käytettyyn minimax-algoritmiin, oikeastaan sen takia se on niin nopea.
        <br><br>
        Tässä selostus kyseisen algoritmin toiminnasta:
        <br><br>
        Algoritmi käy läpi jokaisen ruudun kertaalleen, sijoittaa kyseiseen ruutuun X- ja O-merkin
        ja laskee ruudulle arvon kyseisen pelitilanteen mukaan.
        Lukuarvo on summa pysty-, vaaka- ja vinolinjojen pelimerkeistä niiden paremmuuden mukaan.
        Se etsii '--XX--', '--XXX--', '-X-XX-', '--XXXO' tapaisia merkkijonoja, joissa '-' on tyhjä ruutu.
        Ja sama etsintä tietysti myös vastaaville merkkijonoille 'O'-merkillä. Tämän jälkeen ruutu merkitään tyhjäksi ja siirrytään seuraavaan ruutuun.
        <br><br>
        Kun kaikki ruudut on käyty läpi, algoritmi pelaa merkkinsä suurimman arvon ruutuun.
        <br><br>     
        Lukuarvot ovat harkitusti valittuja, jotta saadaan haluttu "älykkyys". Esimerkiksi tilanteessa:
        </p> 
        <pre>    
        <code>        
                        . . . . . . . . . 
                        . . . . . . . X .
                        . X X A . . . O .
                        . . . X . . . O .
                        . . . X . . . O .
                        . . . . . . . B .
                        . . . . . . . . .        
        </code>
        </pre>
        <p> 
        Algoritmi laskee ruudun A summaan pysty- ja vaakalinjat, tämän summan on oltava suurempi kuin B-ruudun summa:
        Kun algoritmin sijoittaa X-merkin ruutuun A, niin kahden näin syntyvän 'XXX'-merkkijonon
        lukuarvoa vastaava summa on koodissa 1000 + 1000. Tällöin ruutu B:hen sijoitettu O-merkki eli linjan '-OOOOX' arvon on oltava pienempi kuin 2000.
        </p>         
        <br>
        Mutta tilanteessa:
        <pre>                
            <code>        
                        . . . . . . . . .  
                        . . . . . . . B .
                        . X X A . . . O .
                        . . . X . . . O .
                        . . . X . . . O .
                        . . . . . . . C .
                        . . . . . . . . .            
            </code>
        </pre>
        Merkkijonon '-OOOO-' arvon on oltava suurempi kuin A-ruudun arvo eli 2000, jotta algoritmi pelaa parhaan siirron B- tai C-ruutuun. 
        <br><br>
        <br><br>       
        <br><br>
        <br><br>
     
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
    
    
    


