import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from "@angular/animations";
export const fadeAnimation = trigger("routeAnimations", [
  transition("* => *", [
    query(":enter, :leave", style({ position: "fixed", width: "100%" }), {
      optional: true
    }),
    group([
      query(
        ":enter",
        [
          style({ opacity: 0.2 }),
          animate("0.15s ease-in-out", style({ opacity: 1 }))
        ],
        { optional: true }
      ),
      query(
        ":leave",
        [
          style({ opacity: 1 }),
          animate("0.15s ease-in-out", style({ opacity: 0.2 }))
        ],
        { optional: true }
      )
    ])
  ]),
]);
