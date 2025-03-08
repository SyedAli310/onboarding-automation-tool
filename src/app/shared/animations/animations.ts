import { trigger, transition, style, group, animate, state, keyframes } from "@angular/animations"

export const enterLeaveAnimation5 = trigger(
    'enterLeaveAnimation5', [
        transition(':enter', [
            style({ height: '0', opacity: 0, transform: 'translateY(-10%)' }), // Start small and faded
            group([
                animate('250ms ease', style({ height: '*' })), // Animate height first
                animate('300ms 100ms ease', style({ opacity: 1, transform: 'translateY(0)' })) // Animate opacity/transform with a slight delay
            ])
        ]),
        transition(':leave', [
            group([
                animate('200ms ease', style({ opacity: 0, transform: 'translateY(-10%)' })), // Animate opacity/transform first
                animate('250ms 50ms ease', style({ height: '0' })) // Animate height with a delay
            ])
        ])
]);

export const appearAnimation = trigger(
    'appearAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
    ])
]);

export const flyInOut = trigger('flyInOut', [
    state('inactive', style({
        display: 'none',
        opacity: 0,
    })),
    transition('inactive => active', animate('300ms ease-out', keyframes([
        style({
            opacity: 0,
            bottom: '-15px',
            'max-height': 0,
            'max-width': 0,
            'margin-top': 0,
        }),
        style({
            opacity: 0.8,
            bottom: '-3px',
        }),
        style({
            opacity: 1,
            bottom: '0',
            'max-height': '200px',
            'margin-top': '12px',
            'max-width': '400px',
        }),
    ]))),
    state('active', style({
        bottom: '0',
        'max-height': '200px',
        'margin-top': '12px',
        'max-width': '400px',
    })),
    transition('active => removed', animate('300ms ease-out', keyframes([
        style({
            opacity: 0.6,
            bottom: 0,
        }),
        style({
            opacity: 0.1,
            bottom: '-3px',
        }),
        style({
            opacity: 0,
            bottom: '-15px',
        }),
    ]))),
]);