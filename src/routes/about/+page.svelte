<main>
    <div>
        <br>
        <h1>Tietoja</h1>
        <br>
        <p>   
        Vanhassa kunnon Emacs-editorissa on yhtenä pelinä gomoku, joka on melkein sama peli kuin ristinolla.
        Kyseinen Emacsin gomoku pelaa nopeasti ja samalla kumman hyvin, joten pakkohan sitä oli vilkaista sen Lispillä tehtyä lähdekoodia.
        Lähdekoodissa yllättäen ja pyytämättä selitetään pelialgoritmin
        toimintaa melkoisen kattavasti. Linkki kyseiseen tiedostoon: 
        <a href="https://github.com/typester/emacs/blob/master/lisp/play/gomoku.el">gomoku.el</a>
        </p>            
        <p> 
        Tuon idean mukaan myös tämän sivuston ristinollaa pelaava tekoäly on tehty.          
        Toki oli hauskempi olla lukematta kyseistä lispkoodia ja tehdä kokonaan oma versio samalla idealla.
        On huomattava, että koodi ei perustu esimerkiksi shakissa käytettyyn minimax-algoritmiin, ja oikeastaan sen takia se on niin nopea.
        Tässä lyhyt selostus kyseisen algoritmin toiminnasta:
        <br><br>
        Algoritmi käy läpi jokaisen ruudun kertaalleen, sijoittaa kyseiseen ruutuun X- ja O-merkin
        ja laskee ruudulle arvon kun kyseinen merkki on ruudussa.
        Lukuarvo on summa pysty-, vaaka- ja vinolinjojen pelimerkeistä paremmuuden mukaan.
        Se etsii '--XX--', '--XXX--', '-X-XX-', '--XXXO' tapaisia merkkijonoja, joissa '-' on tyhjä ruutu.
        Ja sama homma siis myös 'O'-merkille. Joka jälkeen ruutu merkitään tyhjäksi, ja siirrytään seuraavaan ruutuun.
        <br><br>
        Kun kaikki ruudut on käyty läpi, algoritmi pelaa merkkinsä suurimman arvon ruutuun.
        <br><br>     
        Lukuarvot ovat siten valittuja, että saadaan haluttu "älykkyys". Esimerkiksi tilanteessa:
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
        Algoritmi laskee ruudun A summaan pysty- ja vaakalinjat, ja tämän summan on oltava suurempi kuin B-ruudun summa.
        Yllä olevassa siis ruutuun A algoritmi sijoittaa X-merkin, jolloin on kahden näin syntyvän 'XXX'-merkkijonon
        lukuarvoa vastaa summa 1000+1000. Tällöin ruutu B:hen sijoitettu O-merkki eli linjan '-OOOOX' arvon on oltava pienempi kuin 2000.
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
        Merkkijonon '-OOOO-' arvon on oltava suurempi kuin A-ruudun, jotta algoritmi pelaa B- tai C-ruutuun. 
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
    
    
    


