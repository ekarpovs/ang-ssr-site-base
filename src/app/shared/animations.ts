import { animate, style, transition, trigger } from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('void => *', [style({ opacity: 0 }), animate('400ms 150ms ease-in-out', style({ opacity: 1 }))])
]);

export const formAnimation = trigger('formAnimation', [
  transition('void => *', [style({ opacity: 0 }), animate('500ms 250ms ease-in-out', style({ opacity: 1 }))])
]);
