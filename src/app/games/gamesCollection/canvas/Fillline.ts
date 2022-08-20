import { CanvasTools } from "./CanvasTools";

export default class fillLine extends CanvasTools{
    #level: number = 0;
    #started: boolean = true;
    #prevPos: {x:number, y:number}= {x:0, y:0};
    override colors = {
        v: "black",
        c: "blue"
    };
	constructor(canvas?: HTMLCanvasElement){
		super(canvas);
		this.#start();
	}
    #setting(){
        // paramettrage du canvas
        this.initCanvas();
        // listage des cases
        this.makeGrid(5);
        // dessin de la grille
        this.drawGrid();
        // selection du niveau
        this.#level = 0;
        // début de la partie
        this.#started = true;
        // position précédente
        this.#prevPos = {x:0, y:0};
        // dessin du niveau en cours
        this.drawLevel();
    }
    #start(){
        // Affichage de l'interface
        this.#inter();
        // Paramètrage du jeu
        this.#setting();
        // écoute des évènements
        this.#listen();
    }
    #inter(){}
    #listen(){
        // vérification de la position du curseur
        this.canvas.addEventListener("mousemove", this.#positionCheck.bind(this));
        // fin de la partie en cas de sortie
        this.canvas.addEventListener("mouseleave", this.#gameOver.bind(this));
        // recommence la partie
        this.canvas.addEventListener("click", this.#restart.bind(this));
    }
    drawLevel(){
        // Parcours chaque colonne
        this.#levels[this.#level].forEach((col, x)=>{
            // Parcours chaque cases
            col.forEach((ca, y)=>{
                // donne la bonne valeur à chaque case
                this.grid.tab[x][y].val = ca;
                // rempli la case.
                this.fillSquare(x, y);
            });
        });
    }
    #positionCheck(e: MouseEvent){
        // Ne vérifie que si le jeu a commencé.
        if(this.#started){
            // récupère la position exacte du canvas
            let canv = this.canvas.getBoundingClientRect();
            // récupère la position x du curseur en case
            let x = Math.floor((e.clientX-canv.left)/this.grid.width);
            // récupère la position y du curseur en case
            let y = Math.floor((e.clientY-canv.top)/this.grid.height);
            // vérifie si la case précédente est bien adjaçente
            if(this.#prevPosCheck(x, y)){
                // si la case est vide
                if(this.grid.tab[x][y].val == 'p'){
                    // la valeur de la case change
                    this.grid.tab[x][y].val = 'c';
                    // On rempli la case de sa nouvelle couleur
                    this.fillSquare(x, y);
                    // On sauvegarde la position actuelle
                    this.#prevPos = {x: x, y: y};
                    // On vérifie si il y a victoire
                    if(this.#isItWin()){
                        // On envoi le bon évènement à la fonction de fin de partie.
                        this.#gameOver({type:"win"});
                    }
                }
            }else{ 
                /* si la case précédente n'est pas adjaçente 
                ou déjà coloré alors on enclenche la défaite.*/
                this.#gameOver(e);
            }
        }
    }
    #prevPosCheck(x:number,y:number){
        // la case actuelle est-elle adjaçente à la précédente.
        let result = false;
        if(this.#prevPos.x == x-1 && this.#prevPos.y == y){
            result = true; // la case de gauche l'est. 
        }
        else if(this.#prevPos.x == x+1 && this.#prevPos.y == y){
            result = true; // la case de droite l'est.
        }
        else if(this.#prevPos.x == x && this.#prevPos.y == y-1){
            result = true; // la case du haut l'est.
        }
        else if(this.#prevPos.x == x && this.#prevPos.y == y+1){
            result = true; // la case du bas l'est.
        }
        if(result && this.grid.tab[x][y].val == "c"){
            result = false; // si la case adjaçente est déjà remplie.
        }
        if(!("x" in this.#prevPos && "y" in this.#prevPos) || (this.#prevPos.x == x && this.#prevPos.y == y)){
            result = true; // on est toujours sur la même case.
        }
        return result;
    }
    #isItWin(){
        // On indique la victoire.
        let win = true;
        // On parcours les colonnes
        this.grid.tab.forEach(col=>{
            // On parcours les cases.
            col.forEach(ca=>{
                // Si une est encore vide
                if(ca.val == "p"){
                    // alors il n'y a pas de victoire.
                    win = false;
                }
            });
        });
        return win;
    }
    #gameOver(e:MouseEvent|{type:string}){
        // Selon l'évènement retourné on rentre le message voulu.
        if(this.#started){
            switch(e.type){
                case "mouseleave":
                    this.message("Perdu, interdit de sortir", "red", "center");
                    break;
                case "mousemove":
                    this.message("Perdu, tracez votre chemin d'un trait", "red", "center");
                    break;
                case "win":
                    this.message("Victoire !", "green", "center");
                    break;
            }
        }
        this.#started = false;
    }
    #restart(){
        // Si la partie n'est pas commencé
        if(!this.#started){
            // Alors on relance le paramétrage.
            this.#setting();
        }
    }
    // p = vide, v = plein.
    // TODO: externaliser les niveaux.
    #levels= [
        [['p','p','v','p','p'],
        ['v','p','p','p','p'],
        ['p','p','v','p','p'],
        ['p','p','p','p','p'],
        ['p','p','p','p','p']]
        ]
}