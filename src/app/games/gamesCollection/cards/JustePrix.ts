import CardsTool from "./CardsTool";

export default class JustePrix extends CardsTool{
    #answer?:HTMLSpanElement;
    #restart?:HTMLButtonElement;
    constructor(template?: HTMLElement){
        super(template);
        this.#start();
    }
    #start(){
        this.#interface();
    }
    #initGame(){}
    #interface(){
        this.#answer = this.createTag("span");
        this.#answer.textContent = "?";
        this.#restart = this.createTag("button") as HTMLButtonElement;
        this.#restart.textContent = "Recommencer";
        const card = this.makeCard([this.#answer, this.#restart],"");
        this.zone.append(card);
    }
    #listen(){}
    #endOfGame(){}
    #check(){}

}