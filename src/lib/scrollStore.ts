/**
 * Mutable scroll state read inside the R3F frame loop without re-renders.
 * `page` is a continuous value in [0, sectionCount - 1]; 1.5 means halfway
 * between section 1 and section 2. Sections are located by [data-scene]
 * so the mapping stays correct whatever each section's height is.
 */
export const scrollStore = {
  page: 0,
  sectionCount: 7,
}

export function installScrollTracking(): () => void {
  let tops: number[] = []

  const measure = () => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'))
    if (sections.length > 0) {
      tops = sections.map((el) => el.getBoundingClientRect().top + window.scrollY)
      scrollStore.sectionCount = sections.length
    }
    onScroll()
  }

  const onScroll = () => {
    if (tops.length < 2) return
    // Anchor slightly below the viewport top so a section "arrives" as it fills the screen.
    const y = window.scrollY + window.innerHeight * 0.4
    let page = 0
    if (y <= tops[0]) {
      page = 0
    } else if (y >= tops[tops.length - 1]) {
      page = tops.length - 1
    } else {
      for (let i = 0; i < tops.length - 1; i++) {
        if (y >= tops[i] && y < tops[i + 1]) {
          page = i + (y - tops[i]) / (tops[i + 1] - tops[i])
          break
        }
      }
    }
    scrollStore.page = page
  }

  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', measure)
  const observer = new ResizeObserver(measure)
  observer.observe(document.body)

  return () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', measure)
    observer.disconnect()
  }
}
