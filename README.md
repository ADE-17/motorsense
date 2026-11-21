# MotorSense website

A responsive, single-page startup website. Plain HTML, CSS, and JavaScript; no build step, server application, analytics, or external runtime dependencies.

## Review locally

Open `index.html` in a browser, or serve this folder:

```sh
cd /home/adipa/motorsense/website
/usr/bin/python3 -m http.server 8000
```

Then visit http://localhost:8000. If working on a remote machine, forward port 8000 to your computer first. Directly opening the HTML file also works; the copy-email button falls back to selecting the address if clipboard access is unavailable.

## Publish on GitHub Pages

1. Create a GitHub repository and upload the **contents of this website folder** to its root, including `assets/` and `.nojekyll`.
2. In the repository, open **Settings → Pages**.
3. Choose **Deploy from a branch**, select your default branch and **/ (root)**, then save.
4. GitHub will show the published URL after deployment finishes.

All asset paths are relative, so this works at either `username.github.io` or `username.github.io/repository-name/`. No custom domain is required. Repository: https://github.com/ADE-17/motorsense. Pushing source code and enabling GitHub Pages are separate steps.

## Before launch

- Replace the four founder names, areas of expertise, education/background, and portrait placeholders in `index.html`.
- Review the public-facing copy and development-stage wording. Product specifications from the early deck are intentionally not presented as validated capabilities.
- Confirm the supplied address, `contact.motorsense@gmail.com`. Contact links open an email draft; there is no form backend or mailing-list database.
- The generated body illustration and daily movement chart are illustrative concepts, not clinical output. Patch placement is exploratory.

## Edit the site

- `index.html`: content, section structure, founder placeholders, email links, source citations, and SVG illustrations.
- `styles.css`: responsive layout, colors, fonts, and spacing.
- `script.js`: mobile menu, sensing selectors, animation controls, and email copy behavior. Update the address here too if it changes.
- `assets/`: logo and care photograph extracted from the supplied PDF presentation; original rotating patch GIF; still patch frame; generated body sculpture; locally hosted Manrope font and license. See `ASSET_NOTES.md` for the body illustration prompt and provenance.

The grayscale MotorSense logo is from the supplied “MotorSense in brief” PDF deck and is tinted warm brown with CSS. The supplied PPTX contained research notes and reference imagery rather than the logo. The original documents are untouched.

## Evidence

The problem section links directly to the [WHO Parkinson disease fact sheet](https://www.who.int/news-room/fact-sheets/detail/parkinson-disease) for the explicitly dated 2019 prevalence estimate and reported 25-year increase, and the [2022 VALIDATE-PD study](https://pmc.ncbi.nlm.nih.gov/articles/PMC9163037/) for 30-minute diary intervals.

Accessibility includes semantic landmarks, a skip link, visible keyboard focus, keyboard-operable selectors, mobile menu state, a patch animation pause control, and a static image for reduced-motion preferences. Core content and contact links remain available without JavaScript.

## Motion

Section reveals, navigation, and sensing-detail changes use restrained transitions. Reduced-motion preferences disable these effects and show a static patch. The illustration remains interactive with keyboard-accessible buttons.
