import { animate, query, style, transition, trigger } from "@angular/animations";

const nextPage = [
    style({ position: 'relative' }),
    query(':leave', 
    [
        style(
            {
            zIndex: '5',
            transform: 'rotateY(0)',
        })
    ]),
    query(':leave', [
    animate('700ms ease-out', style({ transform: 'rotateY(180deg)' }))
    ]),
];
const previousPage = [
    style({ position: 'relative' }),
    query(':enter', 
    [
        style(
            {
            zIndex: '5',
            transform: 'rotateY(180deg)',
        })
    ]),
    query(':enter', [
    animate('700ms ease-out', style({ transform: 'rotateY(0deg)' }))
    ]),
    query(':leave', [
    animate('700ms ease-out', style({ transform: 'rotateY(0deg)' }))
    ]),
];
export const slideInAnimation =
    trigger('routeAnimations', [
        transition('GamePage => NotFoundPage', nextPage),
        transition('NotFoundPage => GamePage', previousPage),
        transition('* <=> *', nextPage)
    ]);
