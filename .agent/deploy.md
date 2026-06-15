# Deployment & Local Dev - Valerio Libera Website

## Sviluppo Locale con Docker
Il sito è configurato per essere eseguito localmente tramite Docker Compose per evitare conflitti con le versioni locali di Ruby e Jekyll.

### Requisiti
- Docker Desktop attivo sulla macchina host.

### Comandi
- Avvio del server locale:
  ```bash
  docker compose up -d
  ```
- Visualizzazione dei log di compilazione/esecuzione:
  ```bash
  docker compose logs -f
  ```
  *Nota*: se si modifica `_config.yml`, è necessario riavviare il container poiché le configurazioni globali vengono caricate all'avvio:
  ```bash
  docker compose restart jekyll
  ```
- Spegnimento dell'ambiente:
  ```bash
  docker compose down
  ```

### Gotchas di Sviluppo Locale
1. **Caching di Jekyll**: a volte le traduzioni non vengono aggiornate all'istante a causa del caching di Jekyll. In tal caso, si può cancellare manualmente la directory `.jekyll-cache` o riavviare il container.
2. **File CNAME**: il file `CNAME` alla root indica a GitHub Pages il dominio personalizzato `www.valeriolibera.it`. Non deve essere rimosso o alterato.

## Deployment in Produzione
Il deployment in produzione avviene solitamente tramite GitHub Pages che compila automaticamente il ramo `master` (oppure tramite compilazione locale e push del ramo `gh-pages`). Assicurarsi che i permessi di scrittura e configurazione su GitHub rispecchino le opzioni dei plugin attivi.
