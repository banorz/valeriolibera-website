# Valerio Libera Personal Website
Sito personale minimalista e tech-style di Valerio Libera, Software Engineer, realizzato con Jekyll.

## Index
- [Architecture](file:///f:/workspace/valeriolibera-website/.agent/architecture.md)
- [Deployment & Local Dev](file:///f:/workspace/valeriolibera-website/.agent/deploy.md)
- [Glitch / Text Corruption System](file:///f:/workspace/valeriolibera-website/.agent/glitch-system.md)

## Quick Facts
- **Branch Strategy**: `master` per produzione/pubblicazione (tramite GitHub Pages), `feature/*` per lo sviluppo.
- **Configurazione**: `_config.yml` contiene le configurazioni del sito Jekyll (inclusi i plugin multilingua `jekyll-multiple-languages-plugin`).
- **Ambiente locale**: Docker Compose con immagine `bretfisher/jekyll-serve` su porta 4000.

## Comandi Frequenti
- Avviare ambiente di sviluppo locale con Docker:
  `docker compose up -d`
- Visualizzare i log del server di sviluppo:
  `docker compose logs -f`
- Arrestare l'ambiente locale:
  `docker compose down`

## Flowchart Troubleshooting
Quando l'utente segnala problemi, controlla in quest'ordine:
1. **Errore di build Jekyll**: Controlla i log di Docker (`docker compose logs`) per identificare plugin mancanti o errori nei file YAML/Markdown.
2. **Text Corruption non funzionante**: Verifica che l'URL di `counterURL` in `assets/js/counter.js` risponda correttamente e che non ci siano errori CORS in console.
3. **Mancata traduzione**: Controlla i file di traduzione sotto `_i18n/en.yml` e `_i18n/it.yml` e assicurati che la chiave usata nel tag `{% t ... %}` esista in entrambi.
