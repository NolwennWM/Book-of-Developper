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
    ], { optional: true }),
    query(':leave', [
    animate('700ms ease-out', style({ transform: 'rotateY(180deg)' }))
    ], { optional: true }),
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
    ], { optional: true }),
    query(':enter', [
    animate('700ms ease-out', style({ transform: 'rotateY(0deg)' }))
    ], { optional: true }),
    query(':leave', [
    animate('700ms ease-out', style({ transform: 'rotateY(0deg)' }))
    ], { optional: true }),
];
export const pageAnimation =
    trigger('routeAnimations', [
        transition('HomePage => *', nextPage),
        transition('* => HomePage', previousPage),
        transition('GamePage => NotFoundPage', nextPage),
        transition('* => NotFoundPage', nextPage),
        transition('NotFoundPage => *', previousPage),
        transition('* <=> *', nextPage)
    ]);
