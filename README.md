# hameezcam.github.io

Personal cybersecurity portfolio of Hameez Cambal, served by GitHub Pages at https://hameezcam.github.io.

## Structure

Plain HTML, CSS and JavaScript, with no build step.

- `index.html`, `about.html`, `experience.html`, `projects.html`, `certifications.html`, `education.html`, `skills.html`, `contact.html`: one file per page. GitHub Pages serves them at extensionless URLs (`/about`, `/projects`, ...).
- `404.html`: sends old or trailing-slash links (`/home`, `/about/`) to the right page.
- `style.css`, `script.js`: shared styles and behaviour. Asset paths are root-relative (`/style.css`), so pages also render correctly at URLs with a trailing slash.
- `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.png`: SEO and link previews.

The contact form posts to [Web3Forms](https://web3forms.com). The access key in `contact.html` is a public key by design.

## Local preview

```bash
python3 serve.py
# open http://localhost:8080
```
