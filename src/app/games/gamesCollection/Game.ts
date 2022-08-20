"use strict";
export abstract class Game{
    constructor(protected template?: HTMLElement){
    }
    protected abstract zone:HTMLElement;
	abstract get gameZone():HTMLElement;
    abstract set gameZone(zone:HTMLElement);

    protected createTag(tag:string):HTMLElement{
        const newTag = document.createElement(tag);
        if(this.template){            
            Array.from(this.template.attributes).forEach(attr=>{
                newTag.setAttribute(attr.name, attr.value);
            })
        }
        
        return newTag;
    }
}