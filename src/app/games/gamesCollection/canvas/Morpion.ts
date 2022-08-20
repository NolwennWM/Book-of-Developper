import { CanvasTools, Square } from "./CanvasTools";

export default class Morpion extends CanvasTools{
	#ranges: {[key in string]:HTMLInputElement} = {};
	#validate?: HTMLInputElement;
	#current: {x:number, y:number} = {x:0, y:0};
	#turn: number = 0;
	#victory: number = 3;
	#players: string[] = ["x", "o"];
	#count: number = 0;
	#animDraw: number = 0;
	constructor(canvas?: HTMLCanvasElement){
		super(canvas);
		this.#start();
	}
    #initMorpion(){
        // paramettrage du canvas
        this.initCanvas();
        // listage des cases
        this.makeGrid(+this.#ranges["colonnes"].value, +this.#ranges["lignes"].value);
		// le nombre de tour est à 1.
		this.#turn = 1;
		// sauvegarde les conditions de victoire (3 par défaut.)
		this.#victory = parseInt(this.#ranges["condition"].value);
		this.#count = 0;
		// Efface le contenu actuel pour redessiner la 
		this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
		this.drawGrid();
	}
    #start(){
		// initialise l'interface, les écouteurs et les paramètres.
		this.#interface(); // peut être a retiré
		this.#initMorpion();
		this.#listen();
	}
    #interface(){
		// sélectionne la zone d'affichage des options
		const options: HTMLDivElement = document.createElement('div');
		// un objet contenant tous les attributs qu'on donnera aux boutons jauges.
		const attrs: {[key in string]:string}={type: "range",min: "3", max:"10", value:"3", step:"1" };
		// déclarations des variables pour ranger label, input et bouton
		let lab, inp, btn;
		// les noms qu'on donnera aux label dans un tableau
		const form: string[] = ["lignes", "colonnes", "condition"];
		// je parcours le tableau de nom.
		for(let i of form){
			// je crée un label et lui ajoute un attribut et un contenu texte.
			lab = document.createElement("label");
			lab.setAttribute("for", i);
			lab.textContent = i + " 3";
			// je crée un input, lui donne un display block et un id.
			inp = document.createElement("input");
			inp.style.display = "block";
			inp.setAttribute("id", i);
			this.#ranges[i] = inp;
			// je boucle sur l'objet d'attributs pour tous les donner à mes inputs.
			for(const attr in attrs){
				inp.setAttribute(attr, attrs[attr]);
			}
			// j'ajoute mes labels et input à ma zone d'option.
			options.appendChild(lab);
			options.appendChild(inp);
		}
		// je crée un bouton de validation auquel j'ajoute id, value et type avant de l'ajouter à ma page.
		btn = document.createElement("input");
		btn.setAttribute("id", "option");
		btn.setAttribute("value", "Valider");
		btn.setAttribute("type", "button");
		this.#validate = btn;
		options.appendChild(btn);
		this.zone.append(options);
		
	}
    #listen(){
		// TODO: séparer les evenements dans des fonctions différentes.
		// dans les écouteurs d'évènement, this ne fait plus référence à l'objet mais à la cible de l'évènement, 
		// donc je range mon this dans une autre variable pour l'utiliser.
		let self = this;
		// j'écoute les cliques sur mon canvas.
		this.canvas.addEventListener("click",function(e){
			// si la partie n'est pas fini.
			if(self.#turn !== 0){
				const canv = this.getBoundingClientRect();
				// je prend la position de mon clique et lui retire la position de mon canvas pour connaître la position de la souris
				// dans le canvas. puis je le dévise par la taille des cases pour connaître sur quelle case je clique.
				self.#current.x = Math.floor((e.clientX-canv.left)/self.grid.width);
				self.#current.y = Math.floor((e.clientY-canv.top)/self.grid.height);
				// je lance la fonction de vérification du clique.
				self.#check();
			}
		});
		// si le joueur clique sur le bouton d'option je relance la partie avec de nouvelles options.
		// si le joueur clique sur le bouton d'option je relance la partie avec de nouvelles options.
		this.#validate?.addEventListener("click",function(){
			self.#initMorpion();
		});
		// Je boucle sur mes boutons d'option.
		for(let range in this.#ranges){
			// je leur ajoute un écouteur d'évènement
			this.#ranges[range].addEventListener("input", function(){
				if(!this.previousElementSibling) return;
				// je change le contenu du label pour que le choix s'affiche.
				this.previousElementSibling.textContent = this.previousElementSibling.getAttribute("for")+" "+this.value;
				// si c'est le bouton de condition de victoire
				if(this == self.#ranges["condition"]) {
					// je regarde si la valeur des autres boutons ne sont pas inférieur aux conditions de victoire
					for(let grids of [self.#ranges["colonnes"], self.#ranges["lignes"]]){
						if(parseInt(grids.value) < parseInt(this.value) && grids.previousElementSibling){
							// je modifie les boutons de nombre de ligne pour qu'ils suivent les conditions de victoire.
							grids.value = this.value;
							grids.previousElementSibling.textContent = grids.previousElementSibling.getAttribute("for")+" "+this.value;
						}
					}
				}
			});
		}
	}
    #check(){
		const {x,y} = this.#current;
		// si la case est vide.
		if(this.grid.tab[x][y].val == "v"){
			// je change la valeur de la case.
			this.grid.tab[x][y].val = this.#players[this.#turn % this.#players.length];
			// j'augmente le tour
			this.#turn++;
			// je dessine le symbole.
			this.#animDraw = requestAnimationFrame(this.#drawSym.bind(this,this.grid.tab[x][y]));
			// je vérifie si il y a victoire.
			this.#victoryCheck();
		}
	}
    #drawSym(caseAct: Square){
		// je regarde si c'est une croix
		this.ctx.clearRect(caseAct.top+2,caseAct.left+2, this.grid.width-4, this.grid.height-4);
		this.#count += 0.2;
		if(caseAct.val == "x"){
			// je boucle pour dessiner les deux traits de la croix.
				this.ctx.moveTo(caseAct.top+(0*this.grid.width),caseAct.left);
				this.ctx.lineTo(caseAct.top+((this.#count)*this.grid.width), caseAct.left+(this.#count)*this.grid.height);
				this.ctx.stroke();
				this.ctx.moveTo(caseAct.top+(1*this.grid.width),caseAct.left);
				this.ctx.lineTo(caseAct.top+((1-this.#count)*this.grid.width), caseAct.left+(this.#count)*this.grid.height);
				this.ctx.stroke();
				if(this.#count >= 1){
					this.#count = 0;
					cancelAnimationFrame(this.#animDraw);
				}else{
					this.#animDraw = requestAnimationFrame(this.#drawSym.bind(this,caseAct));
				}
		}
		// Sinon c'est un cercle que je dessine avec ellipse et non arc pour pouvoir le déformer selon la taille de la case.
		else{
			this.ctx.beginPath();
			this.ctx.ellipse(
				caseAct.top+this.grid.width/2, 
				caseAct.left+this.grid.height/2, 
				this.grid.width/2, 
				this.grid.height/2,
				0,0,				
				this.#count*Math.PI);
			this.ctx.stroke();
			if(this.#count >= 2){
				this.#count = 0;
				cancelAnimationFrame(this.#animDraw);
			}else{
				this.#animDraw = requestAnimationFrame(this.#drawSym.bind(this,caseAct));
			}
		}
	}
    #victoryCheck(){
		const {x,y} = this.#current;
		// je vérifie la ligne verticale.
		
		let ini = this.#verti();
		// si il n'y a pas de victoire je vérifie la ligne horizontale.
		ini = ini == this.#victory? ini: this.#horiz();
		// sinon je vérifie la première diagonale.
		ini = ini == this.#victory? ini: this.#diago1();
		// sinon je vérifie la dernière diagonale.
		ini = ini == this.#victory? ini: this.#diago2();
		// si la valeur de ini correspond à la condition de victoire
		if(ini == this.#victory){
			// j'affiche un message avec le signe du vainqueur.
			let self = this;
			setTimeout(function(){
				self.message(`Les "${self.grid.tab[x][y].val}" ont gagné !`, "green")
				self.#turn = 0;
			}, 500);
		}
	}
    #verti(){
		const {x,y} = this.#current;
		let ini = 0;
		// je boucle sur toute a longueur de la verticale.
		for(let i = 0; i < this.grid.tab[0].length; i++){
			ini++;
			// si le signe de la case ne correspond pas à celui du joueur, je reset mon compteur
			if(this.grid.tab[x][i].val !== this.grid.tab[x][y].val){
				ini=0;
			}
			// si la condition de victoire est atteinte, je m'arrête de vérifier.
			if(ini === this.#victory){
				break;
			}
		}
		return ini;
	}
    #horiz(){
		const {x,y} = this.#current;
		let ini = 0;
		for(let i = 0; i < this.grid.tab.length; i++){
			ini++;
			if(this.grid.tab[i][y].val !== this.grid.tab[x][y].val){
				ini=0;
			}
			if(ini === this.#victory){
				break;
			}
		}
		return ini;
	}
	// toujours de même pour la diagonale.
	#diago1(){
		let {x,y} = this.#current;
		let ini = 0;
		// je commence du coin le plus en haut à gauche par rapport à ma case.
		while(x !== 0 && y !== 0){
			x--;
			y--;
		}
		// et je parcours jusqu'en bas à droite
		while(x !== this.grid.tab.length && y !== this.grid.tab[0].length){
			ini++;
			if(this.grid.tab[x][y].val !== this.grid.tab[this.#current.x][this.#current.y].val){
				ini=0;
			}
			x++;
			y++;
			if(ini === this.#victory){
				break;
			}
		}
		
		return ini;
	}
	// et ensuite la dernière diagonale.
	#diago2(){
		let {x,y} = this.#current;
		let ini = 0;
		while(x !== this.grid.tab.length-1 && y !== 0){
			x++;
			y--;
		}
		while(x >= 0 && y !== this.grid.tab[0].length){
			ini++;
			if(this.grid.tab[x][y].val !== this.grid.tab[this.#current.x][this.#current.y].val){
				ini=0;
			}
			x--;
			y++;
			if(ini === this.#victory){
				break;
			}
		}
		return ini;		
	}
}