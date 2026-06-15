# Architecture - Valerio Libera Website

## Tech Stack
- **Static Site Generator**: Jekyll (Ruby-based)
- **Styling**: Vanilla CSS (`css/main.css`)
- **Interactive Scripts**: Vanilla JS + jQuery + Particles.js
- **Multilingual Support**: `jekyll-multiple-languages-plugin`

## Repo Layout & Directory Structure
- `_config.yml` - Configurazione globale, lingue abilitate (`it`, `en`), plugin registrati.
- `_i18n/` - File di traduzione YAML (`it.yml`, `en.yml`).
- `_includes/` - Frammenti HTML riutilizzabili (`head.html`, `header.html`, `footer.html`, `works.html`).
- `_layouts/` - Layout di pagina (`default.html`, `home.html`, `fullwidthdefault.html`).
- `_works/` - Collezione Jekyll dei progetti/esperienze lavorative (ogni progetto ha un file markdown).
- `assets/` - Asset statici, font `Supply`, script javascript custom e librerie, immagini dei progetti.
- `css/main.css` - File CSS principale contenente l'intero design system e gli stili HUD.
- `index.html` - Home page del sito con il diagramma interattivo.
- `info.html` - Pagina "Info / About me".
- `work.html` - Pagina del portfolio dei progetti.
- `contact.html` - Pagina per i contatti con form integrato.
- `counter.html` - Pagina delle statistiche con griglia digitale.

## Data Flow
1. Il client richiede una pagina.
2. Jekyll compila le pagine iniettando le traduzioni appropriate a seconda del prefisso locale (es. `/it/info/` o `/info/` per l'inglese).
3. All'avvio, la pagina registra un hit sul backend `counter.php` esterno via AJAX e recupera le statistiche di traffico.
4. L'engine di corruzione (`corruption.js`) altera dinamicamente i testi evidenziati con la classe `.corrupt-text` in base a tali statistiche.
