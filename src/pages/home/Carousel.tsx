import "solid-slider/slider.css"
import { createSlider } from "solid-slider"
import { Box, VStack, Image } from "@hope-ui/solid"
import { Accessor, createEffect, createSignal, Show } from "solid-js"
import { makeTimer } from "@solid-primitives/timer"
import { getSetting } from "~/store"
import { For } from "solid-js"
import { Container } from "./Container"
import "./style.css"

interface CarouselItem {
  link: string
  image: string
}
export const Carousel = () => {
  const carousels: CarouselItem[] = JSON.parse(getSetting("carousel"))
  let dispose: () => any, start: () => any
  const autoplay = (
    interval: number = 1000,
    options: {
      pause?: Accessor<boolean>
      pauseOnDrag?: boolean
      animation?: {
        duration?: number
        easing?: (t: number) => number
      }
    }
  ) => {
    return (slider: any) => {
      start = () => {
        dispose = makeTimer(
          () =>
            slider.track.details &&
            slider.moveToIdx(
              slider.track.details.position + 1,
              true,
              options.animation
            ),
          interval,
          setInterval
        )
      }
      // Pause the slider on drag
      if (options.pauseOnDrag !== false) {
        slider.on("dragStarted", () => dispose?.())
      }
      createEffect(() => {
        !options.pause || options.pause() === false ? start() : dispose?.()
        var evt = document.createEvent("UIEvents")
        evt.initUIEvent("resize", true, false, window, 0)
        window.dispatchEvent(evt)
      })
    }
  }
  const [slider, { current, next, prev, moveTo }] = createSlider(
    { loop: true },
    autoplay(4500, { pauseOnDrag: false })
  )
  const [isHovered, setIsHovered] = createSignal<boolean>(false)
  const disposeAndPlay = (fn: () => void) => {
    fn()
    // dispose()
    // setTimeout(() => {
    //   fn(), start()
    // }, 4500)
  }
  slider
  return (
    <Container>
      <VStack class="body" mt="$1" px="$4" py="$2" w="$full" gap="$4">
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          w="min(100%, 800px)"
          // marginBottom="$4"
        >
          <VStack rounded="$lg" class="vstack">
            <div ref={slider}>
              <For each={carousels}>
                {(carousel) => (
                  <a href={carousel.link} target="_blank">
                    <Image src={carousel.image} rounded="$lg" />
                  </a>
                )}
              </For>
            </div>
            <Show when={isHovered()}>
              <a
                class="button button-left"
                onClick={() => disposeAndPlay(prev)}
              >
                <i class="arrow arrow-left"></i>
              </a>
              <a
                class="button button-right"
                onClick={() => disposeAndPlay(next)}
              >
                <i class="arrow arrow-right"></i>
              </a>
            </Show>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
