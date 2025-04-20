import gsap from "gsap";

export class Tricks {
  private static inProgress = false;

  public static olly(position: gsap.TweenTarget, rotation: gsap.TweenTarget) {
    return this.runTrick(
      () => this.kickTail(position),
      () => this.ollyRotation(rotation),
    );
  }

  public static kickflip(
    position: gsap.TweenTarget,
    rotation: gsap.TweenTarget,
  ) {
    return this.runTrick(
      () => this.kickTail(position),
      () => this.kickflipRotation(rotation),
    );
  }

  public static frontside360(
    position: gsap.TweenTarget,
    rotation: gsap.TweenTarget,
    origin: gsap.TweenTarget,
  ) {
    return this.runTrick(
      () => this.kickTail(position),
      () => this.frontside360Rotation(rotation, origin),
    );
  }

  private static async runTrick(...args: (() => Promise<void>)[]) {
    if (this.inProgress) {
      return;
    }
    this.inProgress = true;
    await Promise.all(args.map(fn => fn()));
    this.inProgress = false;
  }

  private static kickTail(target: gsap.TweenTarget) {
    return this.promisify(
      gsap
        .timeline()
        .to(target, {
          y: 0.8,
          delay: 0.26,
          duration: 0.51,
          ease: "power2.out",
        })
        .to(target, {
          y: 0,
          duration: 0.43,
          ease: "power2.in",
        }),
    );
  }

  private static ollyRotation(target: gsap.TweenTarget) {
    return this.promisify(
      gsap
        .timeline()
        .to(target, {
          x: -0.6,
          duration: 0.26,
          ease: "none",
        })
        .to(target, {
          x: 0.4,
          duration: 0.82,
          ease: "power2.in",
        })
        .to(target, { x: 0, duration: 0.12, ease: "none" }),
    );
  }

  private static kickflipRotation(target: gsap.TweenTarget) {
    return this.promisify(
      gsap
        .timeline()
        .to(target, {
          x: -0.6,
          duration: 0.26,
          ease: "none",
        })
        .to(target, {
          x: 0.4,
          duration: 0.82,
          ease: "power2.in",
        })
        .to(
          target,
          {
            z: `+=${Math.PI * 2}`,
            duration: 0.78,
            ease: "none",
          },
          0.3,
        )
        .to(target, { x: 0, duration: 0.12, ease: "none" }),
    );
  }

  private static frontside360Rotation(
    board: gsap.TweenTarget,
    origin: gsap.TweenTarget,
  ) {
    return this.promisify(
      gsap
        .timeline()
        .to(board, {
          x: -0.6,
          duration: 0.26,
          ease: "none",
        })
        .to(board, {
          x: 0.4,
          duration: 0.82,
          ease: "power2.in",
        })
        .to(
          origin,
          {
            y: `+=${Math.PI * 2}`,
            duration: 0.77,
            ease: "none",
          },
          0.3,
        )
        .to(board, { x: 0, duration: 0.14, ease: "none" }),
    );
  }

  private static promisify(timeline: gsap.core.Timeline) {
    return new Promise<void>(resolve => {
      timeline.then(() => resolve());
    });
  }
}
