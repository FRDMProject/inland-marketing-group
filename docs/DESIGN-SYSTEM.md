# Design system

## Identity and colors

Lowercase `inland` wordmark, two forward-leaning bars, small uppercase Digital Group descriptor. No registered-trademark claim. The regional motif is independent ambition and forward movement.

| Token      | Value     | Use                                              |
| ---------- | --------- | ------------------------------------------------ |
| Ink        | `#1b2024` | Hero, footer, process, headings                  |
| Paper      | `#f5f2ea` | Main canvas                                      |
| Paper deep | `#eae5da` | Editorial sections and projects                  |
| Coral      | `#ff795b` | Sculpture, primary actions, dark-surface accents |
| Coral dark | `#b53b25` | Accent on light surfaces                         |
| Muted      | `#646860` | Supporting text on paper                         |

Use ink on coral buttons. Small labels need tested contrast. Preserve visible keyboard focus on light and dark backgrounds.

## Typography and layout

Space Grotesk handles the display type and wordmark; Manrope handles interface/body copy. Georgia italic adds expressive emphasis. Containers max out at 1320px with 56px desktop and 20px mobile side space. Breakpoints: 1150, 899 and 650px. City titles have their own size treatment. Form text is at least 16px on narrow screens.

## Motion grammar

- Coral torus sculpture: physical material, custom lights, orbit ring, slow rotation and pointer response.
- Text: brief in-view word reveals with visible server-rendered content and continuous screen-reader text.
- Background: deterministic thin curved beams.
- Projects: slight rotation, hover lift and desktop sticky stacking on the design-lab route.
- Process: bounded pointer-reactive spring grid.

The hero offers a pause control. Reduced-motion preference disables ambient animation; mobile receives a CSS sculpture rather than WebGL. No cursor replacement, sound, scroll hijacking or intro blocks the offer.

## Original artwork

Forma, Ridgeline and Goodkind are explicitly labeled fictional studies. CSS artwork depicts architecture, landscapes and packaging; none is a live client screenshot or measured result. Replace concepts with authorized projects when available. Regional artwork is a stylized landscape, not a map. Hero coordinates reference Riverside and do not claim an office address.
