# Glitch / Text Corruption System - Valerio Libera Website

## Concetto Chiave
La particolarità tecnica ed estetica del sito è la corruzione casuale del testo basata sul traffico reale del sito.
Più visite riceve il sito nell'ultima ora rispetto al massimo storico registrato, maggiore è la probabilità che il testo evidenziato si "corrompa" con caratteri casuali Unicode.

## Componenti del Sistema
1. **Servizio di Counter (`assets/js/counter.js`)**:
   - Effettua una richiesta AJAX `GET` e `PUT` a `https://www.valeriolibera.it/services/counter.php`.
   - Ritorna un JSON con:
     - `total`: visite totali storiche.
     - `last_hour`: visite nell'ultima ora.
     - `max_value`: picco massimo di visite orarie storiche.
2. **Glitch Engine (`assets/js/corruption.js`)**:
   - Calcola la probabilità di corruzione come: `corruption = last_hour / max_value / 3`.
   - Limita questo valore tra `0.005` (minimo) e `0.33` (massimo) per evitare la completa illeggibilità del sito.
   - Per ogni elemento con classe `.corrupt-text`, viene impostato un timer (`setInterval`) che ogni 500ms valuta la probabilità. Se la condizione è soddisfatta, sostituisce un carattere a caso della stringa con un carattere Unicode casuale generato con `String.fromCharCode(Math.random() * 65536)`.
3. **Chaos & Order Control**:
   - Nella nuova interfaccia riorganizzata, abbiamo aggiunto un pannello di diagnostica di sistema (nel footer) che espone:
     - L'indice di corruzione attuale.
     - Pulsanti per forzare manualmente il sistema in **Chaos Mode** (100% corruzione) o per ripristinare il comportamento normale (**Restore Order**).
