import { trigger, transition, style, group, animate } from "@angular/animations"

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
])

export const appearAnimation = trigger(
    'appearAnimation', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
    ])
])