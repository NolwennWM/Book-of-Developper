import { animate, AnimationTransitionMetadata, query, state, style, transition, trigger } from "@angular/animations";
/**
 * Animation pour la page suivante
 */
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
/**
 * Animation pour la page précédente
 */
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
/**
 * Liste des routes possibles.
 */
const pages: string[] = [
    "ThanksPage",
    "SummaryPage",
    "HomePage",
    "ProjectsPage",
    "SkillsPage",
    "AssociationsPage",
    "GamesPage",
    "NotFoundPage"
];
/**
 * Animations attribués à chaque route.
 */
const triggers = pages.reduce((acc: AnimationTransitionMetadata[], cur)=>acc.concat([
    transition(`${cur} => *`, nextPage),
    transition(`* => ${cur}`, previousPage),
]), []);
// console.log(triggers);

/**
 * Animation pour le changement de page.
 */
export const pageAnimation = trigger('routeAnimations', triggers);
/**
 * Animation de changement de livre.
 */
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