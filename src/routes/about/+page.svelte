<main>
    <div>
        <br>
        <h1>Tietoja</h1>
        <br>
        <p>   
        Vanhassa kunnon Emacs-editorissa on yhtenä pelinä gomoku, joka on melkein sama peli kuin ristinolla.
        Kyseinen Emacsin gomoku pelaa nopeasti ja samalla kumman hyvin, joten pakkohan oli vilkaista sen Lispillä tehtyä lähdekoodia.
        Lähdekoodissa yllättäen ja pyytämättä selitetään pelialgoritmin
        toimintaa melkoisen kattavasti. Linkki kyseiseen tiedostoon: 
        <a href="https://github.com/typester/emacs/blob/master/lisp/play/gomoku.el">gomoku.el</a>
        </p>
        <br>            
        <p> 
        Tuon idean mukaan myös tämän sivuston ristinollaa pelaava tekoäly on tehty.
        Toki oli hauskempi olla lukematta kyseistä lispkoodia ja tehdä kokonaan oma versio samalla idealla.
        Tässä lyhyt selostus kyseisen algoritmin toiminnasta:
        <br><br>
        Algoritmi käy läpi jokaisen ruudun kertaalleen ja laskee jokaiselle ruudulle lukuarvon.
        Lukuarvo on summa pysty-, vaaka- ja vinolinjojen pelimerkeistä paremmuuden mukaan.
        Se etsii '--XX--', '--XXX--', '-X-XX-', '--XXXO' tapaisia merkkijonoja, joissa '-' on tyhjä ruutu.
        Ja sama homma myös 'O'-merkille.

        Lukuarvot ovat siten valittu, että saadaan haluttu "älykkyys". Esimerkiksi tilanteessa:
        </p> 
        <br>
        <pre>    
        <code>       
        			  . . . . . . . O .
        			  . X X a . . . X .
        			  . . . X . . . X .
        			  . . . X . . . X .
        			  . . . . . . . b .
        
        </code>
        </pre>
        <p> 
        Algoritmi laskee ruudun a summaan pysty- ja vaakalinjat, ja tämän summan on oltava suurempi kuin b-ruudun summa.
        Yllä olevassa siis a:ssa on kahden 'XXX'-merkkijonon lukuarvoa vastaava summa eli vaikkapa 1000+1000,
        jolloin b:n eli '--XXXO'-jonon arvon on oltava pienenpi kuin 2000, vaikkapa 1200.
        </p>         
        <br><br>

        <pre>                
            <code>       
                          . . . . . . . a .
                          . X X a . . . X .
                          . . . X . O O X .
                          . . . X . . . X .
                          . . . . . . . b .
            
            </code>
            </pre>
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
    
    
    


