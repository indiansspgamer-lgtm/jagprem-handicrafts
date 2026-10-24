import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function createAnimationEngine(root: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => undefined
  }

  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
  const updateScrollTrigger = () => ScrollTrigger.update()
  lenis.on('scroll', updateScrollTrigger)

  let frame = 0
  const tick = (time: number) => {
    lenis.raf(time)
    frame = window.requestAnimationFrame(tick)
  }
  frame = window.requestAnimationFrame(tick)

  const context = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((element) => {
      gsap.fromTo(
        element,
        { y: 28 },
        {
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        },
      )
    })

    const heroCopy = root.querySelector('.hero-copy')
    if (heroCopy?.children.length) {
      gsap.fromTo(
        Array.from(heroCopy.children),
        { y: 24 },
        { y: 0, stagger: 0.12, duration: 0.9, delay: 0.15, ease: 'power3.out' },
      )
    }

    const heroImage = root.querySelector<HTMLElement>('.hero-image')
    const hero = root.querySelector<HTMLElement>('.hero')
    if (heroImage && hero) {
      gsap.to(heroImage, {
        scale: 1.035,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
      })
    }

    const media = gsap.matchMedia(root)
    media.add('(min-width: 768px)', () => {
      const journey = root.querySelector<HTMLElement>('.craft-journey')
      const panels = journey
        ? gsap.utils.toArray<HTMLElement>('.process-panel', journey)
        : []

      if (!journey || panels.length < 2) return
      gsap.set(panels.slice(1), { autoAlpha: 0, xPercent: 5 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: journey,
          pin: true,
          start: 'top top',
          end: () => `+=${window.innerHeight * (panels.length - 1)}`,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      panels.slice(1).forEach((panel, index) => {
        const previous = panels[index]
        const position = index
        timeline.to(previous, { autoAlpha: 0, xPercent: -4, duration: 0.45 }, position)
        timeline.fromTo(
          panel,
          { autoAlpha: 0, xPercent: 5 },
          { autoAlpha: 1, xPercent: 0, duration: 0.55 },
          position + 0.08,
        )
      })
    })
  }, root)

  ScrollTrigger.refresh()

  return () => {
    context.revert()
    lenis.off('scroll', updateScrollTrigger)
    lenis.destroy()
    window.cancelAnimationFrame(frame)
  }
}
