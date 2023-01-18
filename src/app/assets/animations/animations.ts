import { animate, query, state, style, transition, trigger } from "@angular/animations";
// Animation pour la page suivante
const nextPage = [
    style({ position: 'relative' }),
    query(':leave', 
    [
        style(
            {
            zIndex: '11',
            transform: 'rotateY(0)',
        })
    ], { optional: true }),
    query(':leave', [
    animate('700ms ease-out', style({ transform: 'rotateY(180deg)' }))
    ], { optional: true }),
];
// Animation pour la page précédente
const previousPage = [
    style({ position: 'relative' }),
    query(':enter', 
    [
        style(
            {
            zIndex: '11',
            transform: 'rotateY(180deg)',
        })
    ], { optional: true }),
    query(':enter', [
    animate('700ms ease-out', style({ transform: 'rotateY(0deg)' }))
    ], { optional: true }),
    query(':leave', [
    animate('100ms ease-out', style({ boxShadow: 'none' }))
    ], { optional: true }),
];
// Attribut une animation à chaque route. TODO: automatiser cela
export const pageAnimation =
    trigger('routeAnimations', 
    [
        transition('HomePage => *', nextPage),
        transition('* => HomePage', previousPage),
        transition('GamePage => NotFoundPage', nextPage),
        transition('* => NotFoundPage', nextPage),
        transition('NotFoundPage => *', previousPage),
        transition('* <=> *', nextPage)
    ]);
// Animation de changement de livre.
export const languageAnimation = 
    trigger("changeBook", [
        state("remove, return", style({
            top:"-150%"
        })),
        state("idle", style({
            top:"0"
        })),
        transition("return => idle", [
            animate("1.5s ease-out")
        ]),
        transition("idle => remove", [
            animate("1.5s ease-in")
        ])
    ]);