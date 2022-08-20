"use strict";
import { CanvasTools, Square } from "./CanvasTools";

type EventLaby = {name: string, type: string, effect: Function};  
type ItemLaby = {name: string, effect: Function};  
type Player = {
    pos: {x:number, y:number}, 
    view: number, 
    items: ItemLaby[], 
    restItems: number, 
    deepLevel: number,
    health: number
}
export default class Labyrinth extends CanvasTools{
    // Informations du joueur
    #player: Player = {
        pos: {
            x: Math.floor(Math.random() * 30),
            y: Math.floor(Math.random() * 30)
        },
        view: 1,
        items: [],
        restItems: 0,
        deepLevel: 20,
        health: 3
    };
    // Liste des évènements 
    // TODO: externaliser les listes quand elles seront plus grande.
    #eventList: EventLaby[] = [{
        name: "hole",
        type: "t",
        effect: (self: Labyrinth)=>{
            self.#player.health--; 
            self.#startLevel();
        }
    }]
    // Liste des objets disponibles.
    #itemList: ItemLaby[] = [{
        name: "lantern",
        effect: (self: Labyrinth)=>self.#player.view += 2
    }];
    // liste des couleurs des cases.
    override colors = {
        p: "white",
        s: "green",
        end:"red",
        t: "grey",
        i: "grey",
        v: "black"
    }
    constructor(canvas?: HTMLCanvasElement){
        super(canvas)
        this.#start();
    }
    /**
     * Paramètre le jeu.
     */
    #initLabyrinth(): void {
        // paramettrage du canvas
        this.initCanvas();
        // listage des cases
        this.makeGrid(30);
        // dessin de la grille
        this.drawGrid();
        this.#player.restItems = this.#itemList.length;
        this.#startLevel();
    }
    /**
     * Lance le jeu.
     */
    #start(): void {
        // Affichage de l'interface
        this.#interface();
        // Paramètrage du jeu
        this.#initLabyrinth();
        // écoute des évènements
        this.#listen();
    }
    /**
     * Active les écouteurs d'évènement.
     */
    #listen():void {
        document.addEventListener("keydown", this.#input.bind(this));
    }
    /**
     * Affiche l'interface de jeu.
     */
    #interface():void{}
    /**
     * Crée un étage du labyrinthe
     */
    #makeLaby(): void{
        let x: number = this.#player.pos.x, 
            y: number = this.#player.pos.y, 
            // certains étages sont de grande pièces et non des couloirs.
            open: boolean = false,
            // position de la case de fin.
            end:[number, number] = [0,0],
            cmin: number = 0, 
            // toute les cases créé à cet étage.
            history: {px:number, py:number}[] = [], 
            sizeHis: number = 0, 
            // choisi le nombre d'évènement maximum de l'étage.
            eventMax: number = (Math.floor(this.#player.deepLevel/25)+(this.#player.restItems != 0?1:0)), 
            // choisi le nombre d'évènement minimum de l'étage.
            eventMin: number = 1;
        this.grid.tab[x][y].val = 's';
        // choisi si l'étage est ouvert ou non
        if(this.#player.deepLevel%100 == 0){
            open = true;
        }
        // Chaque étage à un nombre de case égale au deepLevel du joueur
        for(let i = 0; i<this.#player.deepLevel; i++){
            sizeHis = history.length;
            // Si ce n'est pas la première case ou un multiple de 25
            if(i !=0 && i%25==0){
                // choisi une case aléatoire dans l'historique au moins 2 cases derrière..
                let rand: number =Math.floor(Math.random()*(sizeHis-2)+2);
                x = history.at(-rand)!.px;
                y = history.at(-rand)!.py;
                // Si le nombre d'évènement maximum est plus grand que le minimum.
                if(eventMax > eventMin){
                    // choisi un nombre aléatoire entre eventMin et eventMax
                    switch(Math.floor(Math.random()*(eventMax-eventMin)+eventMin)){
                        // Si c'est le deepLevel/25 on crée une case item
                        case Math.floor(this.#player.deepLevel/25):
                            this.grid.tab[x][y].val = 'i';
                            this.#player.restItems--;
                            eventMax--;
                            break;
                        // Sinon on crée une case trap
                        default:
                            this.grid.tab[x][y].val = 't';
                            eventMin++;
                            break;
                    }
                }
            }
            // Si on est pas à gauche et que la case de gauche est vide.
            if(x>0 && this.grid.tab[x-1][y].val == 'v'){
                // On a une chance sur 4-cmin de créer une case à gauche
                if(Math.random()*(4-cmin)<1){
                    // si le monde est ouvert ou si la case suivante n'est pas lié à une autre case. 
                    if(open || this.#labycheck(this.grid.tab[x][y], x-1, y)){
                        // On sauvegarde la case précédente
                        history.push({px:x, py:y});
                        // On se déplace sur la gauche.
                        x --;
                        // On change la valeur de la case en "Pièce"
                        this.grid.tab[x][y].val = "p";
                        // cmin devient 0
                        cmin = 0;
                        // on place la fin ici
                        end = [x,y];
                        // on passe à la case suivante.
                        continue;
                    }
                }
            }
            cmin++;
            if(x<29 && this.grid.tab[x+1][y].val == 'v'){
                // puis une chance sur 4-cmin de créer une case à droite
                if(Math.random()*(4-cmin)<1){
                    if(open || this.#labycheck(this.grid.tab[x][y], x+1, y)){
                        history.push({px:x, py:y});
                        this.grid.tab[x+1][y].val = "p";
                        x++;
                        cmin = 0;
                        end = [x,y];
                        continue;
                    }
                }
            }
            cmin++;
            if(y>0 && this.grid.tab[x][y-1].val == 'v'){
                // puis une chance sur 4-cmin de créer une case au dessus
                if(Math.random()*(4-cmin)<1){
                    if(open || this.#labycheck(this.grid.tab[x][y], x, y-1)){
                        history.push({px:x, py:y});
                        this.grid.tab[x][y-1].val = "p";
                        y--;
                        cmin = 0;
                        end = [x,y];
                        continue;
                    }
                }
            }
            cmin++;
            if(y<29 && this.grid.tab[x][y+1].val == 'v'){
                // puis une chance sur 4-cmin de créer une case en dessous
                if(Math.random()*(4-cmin)<1){
                    if(open || this.#labycheck(this.grid.tab[x][y], x, y+1)){
                        history.push({px:x, py:y});
                        this.grid.tab[x][y+1].val = "p";
                        y++;
                        cmin = 0;
                        end = [x,y];
                        continue;
                    }
                }
            }
            // si aucune case n'a été crée, on retente une fois
            if(cmin == 3){
                i--;
                continue;
            }
            // Sinon si on a un historique, on retourne une case en arrière et on supprime la case actuelle
            else if(sizeHis != 0){
                x = history[sizeHis-1].px;
                y = history[sizeHis-1].py;
                history.pop();
                cmin = 0;
                i--;
                continue;
            }
            // Si vraiment ça bloque, on arrête la boucle ici.
            else{
                break;
            }
        }
        // On place définitivement la case de fin de l'étage.
        this.grid.tab[end[0]][end[1]].val = "end";
    }
    /**
     * Vérifie si la case suivante n'est pas lié à des cases déjà rempli.
     * @param ca case actuelle
     * @param x  position de la case suivante
     * @param y  position de la case précédente
     * @returns  boolean indiquant si la case est valide ou non.
     */
    #labycheck(ca:Square, x:number, y:number): boolean{
        // Si on n'est pas sur les bords.
        if(x>0 && x<29 && y>0 &&y<29){
            // vérifie la valeur de la case de gauche si différente de la case actuelle. 
            let check = this.grid.tab[x-1][y];
            if(check != ca && check.val != "v"){
                return false;
            }
            // vérifie la case de droite
            check = this.grid.tab[x+1][y];
            if(check != ca && check.val != "v"){
                return false;
            }
            // vérifie la case du dessus
            check = this.grid.tab[x][y-1];
            if(check != ca && check.val != "v"){
                return false;
            }
            // vérifie la case du dessous
            check = this.grid.tab[x][y+1];
            if(check != ca && check.val != "v"){
                return false;
            }
            return true;
        }
        return false;
    }
    /**
     * Met en place un nouvel étage 
     */
    #startLevel(): void{
        // Rempli la zone de jeu en noir.
        this.ctx.beginPath();
        this.ctx.rect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        // vide toute les cases
        if(this.#player.deepLevel != 20){
            this.grid.tab.forEach(col => col.forEach(ca=>ca.val="v"));
        }
        // Crée un nouvel étage
        this.#makeLaby();
        // affiche la case du joueur
        this.fillSquare(this.#player.pos.x, this.#player.pos.y);
        // affiche les cases alentours.
        this.#movePlayer();
    }
    /**
     * Déplace le joueur
     */
    #movePlayer(): void{
        let x = this.#player.pos.x, 
            y = this.#player.pos.y,
            vu = {l:true,t:true,r:true,b:true};
        this.ctx.beginPath();
        this.ctx.strokeStyle = "brown";
        this.ctx.arc(
            this.grid.tab[x][y].top+this.grid.height/2, 
            this.grid.tab[x][y].left+this.grid.width/2, 
            4, 0, 2*Math.PI
        );
        this.ctx.stroke();
        for(let i=0; i<this.#player.view; i++){
            if(vu.l && x>0+i && this.grid.tab[x-i][y].val != 'v'){
                this.fillSquare(this.#player.pos.x-1-i, this.#player.pos.y);
            }else{
                vu.l=false;
            }
            if(vu.r && x<29-i && this.grid.tab[x+i][y].val != 'v'){
                this.fillSquare(this.#player.pos.x+1+i, this.#player.pos.y);
            }else{
                vu.r=false;
            }
            if(vu.t && y>0+i && this.grid.tab[x][y-i].val != 'v'){
                this.fillSquare(this.#player.pos.x, this.#player.pos.y-1-i);
            }else{
                vu.t=false;
            }
            if(vu.b && y<29-i && this.grid.tab[x][y+i].val != 'v'){
                this.fillSquare(this.#player.pos.x, this.#player.pos.y+1+i);
            }else{
                vu.b=false;
            }
        }
        switch(this.grid.tab[x][y].val){
            case "end":
                this.#player.deepLevel += 20;
                this.#startLevel();
                break;
        }
    }
    /**
     * Vérifie la présence d'un évènement sur la case.
     * @returns boolean true si case vide, false si event
     */
    #checkEvent(): boolean{
        switch(this.grid.tab[this.#player.pos.x][this.#player.pos.y].val){
            case "t":
                let rand = Math.floor(Math.random()*this.#eventList.length);
                this.#eventList[rand].effect(this);
                this.#player.deepLevel += 20;
                return false;
        }
        return true;
    }
    /**
     * Gère la fin du jeu.
     */
    #endgame(): void{
        if(this.#player.health <= 0){
            this.message("You are dead in level "+(this.#player.deepLevel/20), "red", "center");
        }
    }
    /**
     * Gère les actions au clavier du joueur
     * @param e évènement de clavier.
     */
    #input(e:KeyboardEvent):void {
        e.preventDefault;
        switch (e.key) {
            case "ArrowLeft":
                if(this.#player.pos.x>0 && this.grid.tab[this.#player.pos.x-1][this.#player.pos.y].val != "v"){
                    // TODO: réduire cette répétition à une fonction
                    if(this.#checkEvent()){
                        this.fillSquare(this.#player.pos.x, this.#player.pos.y);
                        this.#player.pos.x--;
                        this.#movePlayer();
                    }
                }
                break;
            case "ArrowUp":
                if(this.#player.pos.y>0 && this.grid.tab[this.#player.pos.x][this.#player.pos.y-1].val != "v"){
                    if(this.#checkEvent()){
                        this.fillSquare(this.#player.pos.x, this.#player.pos.y);
                        this.#player.pos.y--;
                        this.#movePlayer();
                    }
                }
                break;
            case "ArrowRight":        
            if(this.#player.pos.x<29 && this.grid.tab[this.#player.pos.x+1][this.#player.pos.y].val != "v"){
                    if(this.#checkEvent()){
                        this.fillSquare(this.#player.pos.x, this.#player.pos.y);
                        this.#player.pos.x++;
                        this.#movePlayer();
                    }
                }
                break;
            case "ArrowDown":
                if(this.#player.pos.y<29 && this.grid.tab[this.#player.pos.x][this.#player.pos.y+1].val != "v"){
                    if(this.#checkEvent()){
                        this.fillSquare(this.#player.pos.x, this.#player.pos.y);
                        this.#player.pos.y++;
                        this.#movePlayer();
                    }
                }
                break;
            case "r":
            case "R":
                switch(this.grid.tab[this.#player.pos.x][this.#player.pos.y].val){
                    case "t":
                        this.grid.tab[this.#player.pos.x][this.#player.pos.y].val = 'p';
                        break;
                    case "i":
                        let rand = Math.floor(Math.random()*(this.#player.restItems+1));
                        this.#player.items.push(this.#itemList[rand]);
                        this.#itemList[rand].effect(this);
                        this.#itemList.splice(rand, 1);
                        this.grid.tab[this.#player.pos.x][this.#player.pos.y].val = "p";
                        break;
                }
                this.fillSquare(this.#player.pos.x, this.#player.pos.y);
                this.#movePlayer();
                break;
        }
        this.#endgame();
    }
}