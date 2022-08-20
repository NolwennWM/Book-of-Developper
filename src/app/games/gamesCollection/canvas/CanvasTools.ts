"use strict";
import { Game } from "../Game";

export type Square = {top: number, left:number, val: string};
export type Grid = {tab: Square[][], width: number, height: number};

export abstract class CanvasTools extends Game{
	protected zone: HTMLElement;
    protected canvas:HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected grid: Grid = {tab: [], width:0, height:0};
    protected colors:{[key: string]: string} = {};
    /**
     * Cette classe à pour rôle de regrouper les outils utiles à mes différents jeux.
     * @param canvas Un élément html de type "canvas"
     */
    constructor(canvas?: HTMLCanvasElement){ 
		super(canvas);
		this.zone = this.createTag("div");
        this.canvas = this.createTag("canvas") as HTMLCanvasElement;
		this.zone.append(this.canvas);
        this.ctx = this.canvas.getContext("2d")!;
        this.initCanvas();
    }
	set gameZone(zone: HTMLElement){
		this.zone = zone;
		this.zone.append(this.canvas);
	}
	
	get gameZone(){
		return this.zone;
	}
    /**
     * Met en forme un canvas de forme carré
     * adapté à la taille de la page.
     */
    protected initCanvas(): void{
		// regarde si la largeur est plus petite que la hauteur (téléphone par exemple)
		let width = window.innerWidth < window.innerHeight? window.innerWidth:window.innerWidth/4;
		// change les attributs de taille du canvas.
		this.canvas.width = width;
		this.canvas.height = width;
		this.message("Waiting game");
    }
    /**
     * Affiche un message dans le canvas.
     * @param message Message que l'on souhaite afficher.
     * @param color La couleur du message.
     * @param align l'alignement du message.
     */
    protected message(message: string, color:string ="black", align:CanvasTextAlign="center"):void{
		// supprime le contenu actuel.
		this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
		// donne une taille et une police au message.
		this.ctx.font = this.ctx.canvas.height/10+"px Arial";
		// Choisi l'alignement et la couleur du message.
		this.ctx.textAlign = align; 
		this.ctx.fillStyle = color;
		// affiche le message entré en paramètre, suivi de sa position x et y et enfin sa taille maximum.
		this.ctx.fillText(message, this.ctx.canvas.width/2, this.ctx.canvas.height/2, this.ctx.canvas.width);
	}
    /**
     * Crée une propriété contenant la liste des cases et leurs tailles.
     * Chaque case contient la position de son coin superieur gauche
     * Ainsi qu'une valeur par défaut "v"
     * @param nCasei nombre de case horizontale.
     * @param nCasej nombre de case verticale.
     */
    protected makeGrid(nCasei: number= 0, nCasej: number = 0):void{
		// Si un des nombres de case n'est pas donné, alors il prend automatiquement la valeur de l'autre.
		nCasei = nCasei === 0? nCasej: nCasei; 
		nCasej = nCasej === 0? nCasei: nCasej; 
		// Création d'un objet contenant un tableau vide et la taille des cases.
		this.grid.tab = [];
        this.grid.width = this.canvas.width/nCasei;
        this.grid.height = this.canvas.height/nCasej;
		// boucle sur le nombre de case
		for(let i = 0; i<nCasei; i++){
			// ajoute un tableau vide pour chaque case horizontal
			this.grid.tab.push([]);
			// boucle sur le nombre de case vertical
			for(let j= 0; j<nCasej; j++){
				// Ajoute dans la case correspondante un tableau de case contenant la position du coin haut gauche de chaque case.
				this.grid.tab[i].push({
					top: this.grid.width*i,
					left: this.grid.height*j,
					val: "v"
				});
			}
		}
	}
    /**
     * Dessine la grille préparé par la fonction makeGrid.
     */
    protected drawGrid():void{
		// boucle pour dessiner les lignes verticales.
		for(let i = 1; i < this.grid.tab.length; i++){
			this.ctx.moveTo(i*this.grid.width,0);
			this.ctx.lineTo(i*this.grid.width, this.ctx.canvas.height);
			this.ctx.stroke();
		}
		// boucle pour dessiner les lignes horizontales.
		for(let j = 1; j < this.grid.tab[0].length; j++){
			this.ctx.moveTo(0,j*this.grid.height);
			this.ctx.lineTo(this.ctx.canvas.width, j*this.grid.height);
			this.ctx.stroke();
		}
	}
    /**
     * Rempli la case selectionné d'une couleur
     * @param x position x de la case
     * @param y position y de la case
     */
    protected fillSquare(x:number, y:number):void{
		// On récupère la case voulu.
		let ca = this.grid.tab[x][y];
		// On commence le chemin
		this.ctx.beginPath();
		// On fait un rectangle sur la case voulu
		this.ctx.rect(ca.top, ca.left, this.grid.width-1,this.grid.height-1);
		// On le rempli avec la couleur voulu.
		if(this.colors.hasOwnProperty(ca.val)){
			this.ctx.fillStyle = this.colors[ca.val];
		}else{
			this.ctx.fillStyle = 'white';
		}
		this.ctx.fill();
	}
}