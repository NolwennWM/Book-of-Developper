import { Game } from "../Game"
type CardContent = string|Node|Node[];

export default class CardsTool extends Game{
    protected zone: HTMLElement;
    constructor(template?: HTMLElement){
        super(template);
        this.zone = this.createTag("div");
        this.zone.classList.add("justePrix");
    }
	set gameZone(zone: HTMLElement){
		this.zone = zone;
	}
	
	get gameZone(){
		return this.zone;
	}
    protected makeCard(front:CardContent, back:CardContent): HTMLDivElement{
        const cardWrap = this.createTag("div") as HTMLDivElement;
        cardWrap.classList.add("card-wrapper");
        const card = this.createTag("div");
        card.classList.add("card");
        const frontDiv = this.createTag("div");
        frontDiv.classList.add("front");
        const backDiv = this.createTag("div");
        backDiv.classList.add("back");
        card.append(frontDiv, backDiv);
        cardWrap.append(card)

        Array.isArray(front)? frontDiv.append(...front): frontDiv.append(front);
        Array.isArray(back)? frontDiv.append(...back): frontDiv.append(back);

        return cardWrap;
    }
}