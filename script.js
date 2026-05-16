/* ── Mobile Nav ── */
        /* ── Overlay state sync: hides WA float when any overlay is open ── */
        function _syncOverlayState() {
            var ids = ['contatti-overlay','video-overlay','sol-overlay','exit-overlay','mobile-nav-overlay','quiz-overlay'];
            var any = ids.some(function(id){ var el=document.getElementById(id); return el&&el.classList.contains('open'); });
            document.body.classList.toggle('any-overlay-open', any);
        }

        function toggleMobileNav() {
            const overlay = document.getElementById('mobile-nav-overlay');
            const isOpen = overlay.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            _syncOverlayState();
        }
        function closeMobileNavOverlay(e) {
            if (e.target === document.getElementById('mobile-nav-overlay')) toggleMobileNav();
        }

        /* ── Contatti Modal ── */
        function openVideo() {
            document.getElementById('video-overlay').classList.add('open');
            document.body.style.overflow = 'hidden';
            var v = document.getElementById('hero-video-modal');
            if (v) v.play();
            _syncOverlayState();
        }
        var _origVideoSrc = 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/Guarda%20il%20video.MP4';
        function closeVideo() {
            document.getElementById('video-overlay').classList.remove('open');
            document.body.style.overflow = '';
            var v = document.getElementById('hero-video-modal');
            if (v) { v.pause(); v.currentTime = 0; v.src = _origVideoSrc; }
            _syncOverlayState();
        }

        function openContatti() {
            document.querySelectorAll('.nav-item').forEach(function(i){ i.classList.remove('open'); });
            document.getElementById('contatti-overlay').classList.add('open');
            document.body.style.overflow = 'hidden';
            _syncOverlayState();
        }
        function closeContatti() {
            document.getElementById('contatti-overlay').classList.remove('open');
            document.body.style.overflow = '';
            _syncOverlayState();
        }
        function closeContattiOverlay(e) {
            if (e.target === document.getElementById('contatti-overlay')) closeContatti();
        }

        /* ── Solution Modal — media (language-neutral) ── */
        const solMedia = {
            illuminazione: { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/Illuminazione.webp' },
            clima:         { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>' },
            sicurezza:     { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' },
            scenari:       { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>' },
            vocale:        { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M9 11V7a3 3 0 016 0v4a3 3 0 01-6 0z"/></svg>' },
            remoto:        { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>' },
            energia:       { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
            giardino:      { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>' },
            '3d':          { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/3d.webp' },
            casa:          { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>' },
            'chi-siamo':   { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/photo-principale.webp' },
            missione:           { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/Nostra%20missione.webp' },
            collaborazione:     { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/Colaborazione.webp' },
            preventivo:         { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/Preventivo%20per%20aziende.webp' },
            'smart-home':       { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/soluzioni%20b2b.webp' },
            'lavora-con-noi':   { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/lavora%20con%20noi.webp' },
            'posizioni-aperte': { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>', img: 'https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/Posizioni%20aperte.webp' },
            'diventa-partner':  { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>' },
            'programma-partner':{ icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>' },
            'centro-media':     { icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>' }
        };

        /* ── Solution Modal — localised text ── */
        const solText = {
            it: {
                illuminazione: { headline: 'La luce che ti capisce', sub: 'La casa sa cosa ti serve e crea l\'atmosfera perfetta, senza che tu debba fare nulla — in modo naturale, preciso e al momento giusto.', benefits: ['Si accende quando entri', 'Scenari su misura: sera, cinema, relax', 'Controllo con un solo tocco, ovunque tu sia'] },
                clima:         { headline: 'La temperatura perfetta, sempre', sub: 'Caldo quando serve, fresco quando lo desideri. Il clima si regola da solo — in modo intelligente, senza che tu debba pensarci.', benefits: ['Riscalda la casa prima del tuo arrivo', 'Riduce i consumi quando non sei in casa', 'Impara le tue abitudini e si adatta a te'] },
                sicurezza:     { headline: 'Dormi tranquillo. Ci pensiamo noi.', sub: 'Allarme, telecamere e sensori sempre attivi. Se succede qualcosa, lo sai subito — ovunque tu sia.', benefits: ['Rileva automaticamente movimenti anomali', 'Notifica immediata sul tuo smartphone', 'Telecamere HD accessibili da remoto, 24/7'] },
                scenari:       { headline: 'Un tocco. Tutto cambia.', sub: 'Crei lo scenario perfetto una sola volta. Poi la casa lo attiva automaticamente, ogni volta che serve.', benefits: ['Scenario "Buonanotte": luci spente, porte chiuse, allarme attivo', 'Scenario "Cinema": oscuranti abbassati, luce soffusa, TV accesa', 'Attivazione automatica per orario o presenza'] },
                vocale:        { headline: 'Parla, la casa ti ascolta', sub: 'Nessun telecomando, nessuna app. Dì solo cosa vuoi e la casa risponde all\'istante.', benefits: ['Compatibile con Alexa, Google e Siri', 'Funziona per tutta la famiglia, anche i bambini', 'Controllo di luci, clima, musica e molto altro'] },
                remoto:        { headline: 'La tua casa, ovunque tu sia', sub: 'Sei in ufficio, in vacanza, all\'estero? Non importa. La tua casa è sempre nel palmo della tua mano.', benefits: ['Apri o chiudi la porta a distanza', 'Controlla tutto da un\'unica app intuitiva', 'Ricevi aggiornamenti in tempo reale'] },
                energia:       { headline: 'Consuma meno, vivi meglio', sub: 'La casa ottimizza da sola i consumi. Tu risparmi in bolletta senza rinunciare al comfort.', benefits: ['Monitoraggio dei consumi in tempo reale', 'Riduzione automatica quando non sei in casa', 'Fino al 40% di risparmio sulla bolletta energetica'] },
                giardino:      { headline: 'Accesso sicuro, giardino curato', sub: 'Il cancello si apre da solo quando arrivi. L\'irrigazione parte da sola. Il tuo esterno, sempre perfetto.', benefits: ['Cancello automatico con riconoscimento auto', 'Irrigazione programmata in base al meteo', 'Videocitofono smart con risposta da smartphone'] },
                '3d':          { headline: '<span style="color:#3AAEFF">Controlla</span> la tua casa direttamente dalla pianta <span style="color:#3AAEFF">3D</span>', sub: 'Gestisci luci, clima, tapparelle e scenari direttamente sulla mappa reale della tua casa.', benefits: ['Visualizzazione <span style="color:#3AAEFF">3D interattiva</span> dell\'appartamento', 'Controllo immediato di ogni ambiente', 'Tutto visivo, semplice e intuitivo'], tagline: 'La tua casa. Sotto controllo, con un tocco.', cta: 'Richiedi demo gratuita →' },
                casa:          { headline: 'Tutto connesso, vita senza pensieri', sub: 'Non solo dispositivi smart: un ecosistema completo che pensa a tutto, perché tu possa vivere meglio.', benefits: ['Tutti i sistemi integrati in un\'unica piattaforma', 'Si configura una volta, funziona per sempre', 'Pensato per te: semplice, elegante, invisibile'] },
                'chi-siamo':   { headline: 'SFERA nasce a Bolzano,<br>dove la casa diventa più intelligente,<br>senza diventare più complicata.', sub: 'Creiamo soluzioni che semplificano la vita quotidiana — con comfort, sicurezza e automazioni pensate davvero per chi vive la casa.', benefits: ['Ti aiutiamo a creare una casa più comoda, sicura e rilassante', 'Nessuna complessità inutile, solo ciò che serve davvero', 'Un unico sistema, progettato intorno al tuo modo di vivere'] },
                missione:           { headline: 'Rendere ogni casa straordinaria.', sub: 'Crediamo che la tecnologia debba semplificare la vita, non complicarla. Per questo creiamo soluzioni che si adattano alle persone, e non il contrario.', benefits: ['Tecnologia discreta, che lavora in modo naturale', 'Zero compromessi tra design e funzionalità', 'Un futuro in cui vivere meglio diventa naturale'] },
                collaborazione:     { headline: 'Collaboriamo con professionisti e aziende del territorio', sub: 'SFERA è aperta alla collaborazione con elettricisti, architetti, interior designer e agenti immobiliari. Insieme realizziamo progetti su misura che creano valore per tutti i partner coinvolti e offrono ai clienti soluzioni Smart Home innovative e di alto livello.', benefits: ['Nuove opportunità di business', 'Supporto tecnico dedicato', 'Vantaggi concreti nei progetti condivisi'], cta: 'Scopri come collaborare →' },
                preventivo:         { headline: 'Il tuo preventivo gratuito,<br>senza impegno.', sub: 'Richiedi una consulenza tecnica gratuita e ricevi un preventivo personalizzato per la tua casa o azienda. Nessun costo nascosto, nessun obbligo, solo soluzioni concrete e su misura.', benefits: ['Sopralluogo gratuito direttamente a casa tua o presso la tua azienda', 'Preventivo dettagliato e trasparente in tempi rapidi', 'Consulenza tecnica inclusa, senza alcun impegno'], cta: 'Richiedi il tuo preventivo →' },
                'smart-home':       { headline: 'Soluzioni B2B', sub: 'Soluzioni Smart Home per aziende e professionisti. Collaboriamo con architetti, elettricisti, imprese edili, hotel e partner che desiderano offrire ai propri clienti sistemi di automazione moderni, affidabili e facili da utilizzare.', benefits: ['Supporto tecnico in ogni fase del progetto', 'Sistemi compatibili con i principali standard', 'Un unico controllo per luci, clima, sicurezza ed energia'], cta: 'Scopri le soluzioni B2B →' },
                'lavora-con-noi':   { headline: 'Costruiamo insieme il futuro della Smart Home.', sub: 'SFERA è una giovane startup ambiziosa che sta introducendo un nuovo approccio alla casa intelligente. Cerchiamo giovani professionisti appassionati di elettronica, elettrotecnica e tecnologia, pronti a crescere con noi e a costruire le soluzioni del futuro.', benefits: ['Startup innovativa e in forte crescita', 'Formazione continua e sviluppo professionale', 'Tecnologie che rappresentano il futuro della Smart Home'], cta: 'Inviaci la tua candidatura →' },
                'posizioni-aperte': { headline: 'Lavora con noi', sub: 'SFERA è una giovane realtà innovativa nel settore della smart home. Siamo all\'inizio di un progetto ambizioso e siamo sempre felici di entrare in contatto con persone appassionate di tecnologia e innovazione.', benefits: ['Al momento non abbiamo posizioni aperte', 'Siamo interessati a conoscere professionisti che condividano la nostra visione e desiderino crescere insieme a noi', 'Inviaci la tua candidatura spontanea e ti contatteremo quando si apriranno nuove opportunità'], cta: 'Inviaci la tua candidatura →' },
                'diventa-partner':  { headline: 'Diventa partner SFERA e cresci con noi.', sub: 'Sei un installatore, un\'agenzia immobiliare o uno studio di architettura? Diventa partner SFERA e accedi a condizioni esclusive, formazione certificata e supporto dedicato.', benefits: ['Margini commerciali competitivi e completamente trasparenti', 'Accesso prioritario a nuovi prodotti e soluzioni inedite', 'Supporto marketing e materiali di vendita inclusi'], cta: 'Richiedi la partnership →' },
                'programma-partner':{ headline: 'Il programma partner più completo del settore.', sub: 'SFERA Partner Program ti offre tutto ciò di cui hai bisogno per portare ai tuoi clienti la migliore esperienza smart home disponibile sul mercato, con il supporto di un brand in crescita.', benefits: ['Tre livelli di partnership: Silver, Gold, Platinum', 'Dashboard partner dedicata con gestione completa dei progetti', 'Formazione certificata, aggiornamenti continui e webinar esclusivi'], cta: 'Entra nel programma →' },
                'centro-media':     { headline: 'Tutto il materiale di cui hai bisogno,<br>in un unico posto.', sub: 'Logo, immagini, video, comunicati stampa e materiali di brand in alta qualità. Il Centro Media SFERA è a disposizione di giornalisti, partner e creator per raccontare la casa del futuro.', benefits: ['Brand kit completo scaricabile in alta risoluzione', 'Foto e video pronti per la pubblicazione editoriale', 'Contatto stampa diretto per interviste e collaborazioni'], cta: 'Accedi al Centro Media →' }
            },
            de: {
                illuminazione: { headline: 'Das Licht, das sich dir anpasst', sub: 'Keine Schalter mehr. Das Haus versteht, was du willst, und schafft die perfekte Atmosphäre — jederzeit.', benefits: ['Schaltet sich ein, sobald du einen Raum betrittst', 'Individuelle Szenarien: Kino, Abendessen, Entspannung', 'Volle Kontrolle per Smartphone, überall'] },
                clima:         { headline: 'Die richtige Temperatur, immer', sub: 'Warm wenn nötig, kühl wenn gewünscht. Das Klima regelt sich von selbst, ohne dass du daran denken musst.', benefits: ['Heizt das Zuhause vor deiner Ankunft vor', 'Reduziert den Verbrauch wenn du nicht da bist', 'Lernt deine Gewohnheiten und passt sich an'] },
                sicurezza:     { headline: 'Schlaf ruhig, wir kümmern uns', sub: 'Alarm, Kameras und Sensoren immer aktiv. Du erhältst eine Benachrichtigung auf dem Handy, falls etwas passiert.', benefits: ['Automatische Erkennung ungewöhnlicher Bewegungen', 'Sofortige Benachrichtigung auf deinem Smartphone', 'HD-Kameras mit Remote-Zugriff, 24/7'] },
                scenari:       { headline: 'Ein Tippen, alles verändert sich', sub: 'Du erstellst einmal das perfekte Szenario. Dann kümmert sich das Haus von selbst darum, wann immer du es brauchst.', benefits: ['Szenario „Gute Nacht": Licht aus, Türen zu, Alarm an', 'Szenario „Kino": Jalousien runter, gedimmtes Licht, TV an', 'Aktivieren sich automatisch nach Zeitplan oder Anwesenheit'] },
                vocale:        { headline: 'Sprich, das Haus hört zu', sub: 'Keine Fernbedienung, keine App. Sag einfach, was du willst, und das Haus reagiert sofort.', benefits: ['Kompatibel mit Alexa, Google und Siri', 'Funktioniert für die ganze Familie, auch für Kinder', 'Steuerung von Licht, Klima, Musik und vielem mehr'] },
                remoto:        { headline: 'Dein Zuhause, wo auch immer du bist', sub: 'Bist du im Büro, im Urlaub, im Ausland? Egal. Dein Zuhause liegt immer in deiner Hand.', benefits: ['Öffne oder schließe die Tür aus der Ferne', 'Alles aus einer einzigen intuitiven App steuern', 'Erhalte Echtzeit-Updates'] },
                energia:       { headline: 'Weniger verbrauchen, besser leben', sub: 'Das Haus optimiert den Verbrauch von selbst. Du sparst bei der Rechnung, ohne auf Komfort zu verzichten.', benefits: ['Verbrauchsüberwachung in Echtzeit', 'Automatische Reduzierung wenn du nicht zu Hause bist', 'Bis zu 40% Ersparnis auf der Energierechnung'] },
                giardino:      { headline: 'Sicherer Zugang, gepflegter Garten', sub: 'Das Tor öffnet sich automatisch wenn du ankommst. Die Bewässerung startet von selbst. Dein Außenbereich, immer perfekt.', benefits: ['Automatisches Tor mit Auto-Erkennung', 'Wetterbasierte Bewässerungsprogrammierung', 'Smart-Videosprechanlage mit Smartphone-Antwort'] },
                '3d':          { headline: 'Steuere dein Zuhause direkt auf dem <span style="color:#3AAEFF">3D</span>-Grundriss', sub: 'Verwalte Licht, Klima, Rollläden und Szenarien direkt auf dem echten Grundriss deines Hauses.', benefits: ['<span style="color:#3AAEFF">Interaktive 3D</span>-Visualisierung der Wohnung', 'Sofortige Steuerung jedes Bereichs', 'Alles visuell, einfach und intuitiv'], tagline: 'Dein Zuhause. Unter Kontrolle, mit einem Fingertipp.', cta: 'Demo anfordern →' },
                casa:          { headline: 'Alles verbunden, sorgenloses Leben', sub: 'Nicht nur smarte Geräte: ein vollständiges Ökosystem, das an alles denkt, damit du besser leben kannst.', benefits: ['Alle Systeme in einer einzigen Plattform integriert', 'Einmal einrichten, für immer funktionieren', 'Für dich gemacht: einfach, elegant, unsichtbar'] },
                'chi-siamo':   { headline: 'SFERA entsteht in Bozen,<br>wo das Zuhause intelligenter wird,<br>ohne komplizierter zu werden.', sub: 'Wir schaffen Lösungen, die den Alltag vereinfachen — mit Komfort, Sicherheit und Automatisierungen, die wirklich für die Menschen gedacht sind, die das Haus bewohnen.', benefits: ['Wir helfen dir, ein komfortableres, sichereres und entspannteres Zuhause zu schaffen', 'Keine unnötige Komplexität — nur was wirklich gebraucht wird', 'Ein einziges System, das um deinen Lebensstil herum gestaltet ist'] },
                missione:           { headline: 'Jedes Haus außergewöhnlich machen.', sub: 'Wir glauben, dass Technologie das Leben vereinfachen soll, nicht komplizieren. Deshalb schaffen wir Lösungen, die sich den Menschen anpassen – und nicht umgekehrt.', benefits: ['Diskrete Technologie, die auf natürliche Weise arbeitet', 'Keine Kompromisse zwischen Design und Funktionalität', 'Eine Zukunft, in der besser leben selbstverständlich wird'] },
                collaborazione:     { headline: 'Wir arbeiten mit den besten Unternehmen der Region zusammen.', sub: 'SFERA ist der ideale Technologiepartner für alle, die ihren Kunden erstklassige Smart-Home-Lösungen anbieten möchten. Gemeinsam entwickeln wir ein maßgeschneidertes, solides Angebot.', benefits: ['Individuelle Lösungen für jede Art von Unternehmen', 'Dedizierter technischer Support in jeder Projektphase', 'Exklusive Partnerschaft mit konkreten kommerziellen Vorteilen'], cta: 'Zusammenarbeit entdecken →' },
                preventivo:         { headline: 'Dein kostenloses Angebot,<br>unverbindlich.', sub: 'Fordere eine kostenlose technische Beratung an und erhalte ein personalisiertes Angebot für dein Zuhause oder Unternehmen. Keine versteckten Kosten, keine Verpflichtung — nur echte Lösungen.', benefits: ['Kostenloser Besichtigungstermin bei dir zu Hause', 'Detailliertes und transparentes Angebot innerhalb von 48 Stunden', 'Technische Beratung inklusive, ohne Verpflichtung'], cta: 'Angebot anfordern →' },
                'smart-home':       { headline: 'B2B-Lösungen', sub: 'Smart-Home-Lösungen für Unternehmen und Fachleute. Wir arbeiten mit Architekten, Elektrikern, Bauunternehmen, Hotels und Partnern zusammen, die ihren Kunden moderne, zuverlässige und benutzerfreundliche Automatisierungssysteme anbieten möchten.', benefits: ['Technischer Support in jeder Projektphase', 'Systeme kompatibel mit den wichtigsten Standards', 'Eine einzige Steuerung für Licht, Klima, Sicherheit und Energie'], cta: 'B2B-Lösungen entdecken →' },
                'lavora-con-noi':   { headline: 'Gemeinsam gestalten wir die Zukunft der Smart Home.', sub: 'SFERA ist ein junges, ehrgeiziges Startup, das einen neuen Ansatz für das intelligente Zuhause einführt. Wir suchen junge Fachleute, die für Elektronik, Elektrotechnik und Technologie begeistert sind und bereit sind, mit uns zu wachsen und die Lösungen der Zukunft zu entwickeln.', benefits: ['Innovatives Startup in starkem Wachstum', 'Kontinuierliche Weiterbildung und berufliche Entwicklung', 'Technologien, die die Zukunft der Smart Home repräsentieren'], cta: 'Bewerbung einsenden →' },
                'posizioni-aperte': { headline: 'Werde Teil des SFERA-Teams.', sub: 'Wir wachsen schnell und suchen ständig nach Talenten. Sieh dir die offenen Stellen an oder schick uns eine Initiativbewerbung — es gibt Platz für alle, die bereit sind Großes zu schaffen.', benefits: ['Zertifizierte Installateure und Techniker KNX / Z-Wave / Zigbee', 'Verkaufsberater und Business Developer', 'UX-Designer und Embedded-Softwareentwickler'], cta: 'Stellen ansehen →' },
                'diventa-partner':  { headline: 'Werde SFERA Partner und wachse mit uns.', sub: 'Bist du Installateur, Immobilienagentur oder Architekturbüro? Werde SFERA Partner und erhalte exklusive Konditionen, zertifizierte Schulungen und dedizierten Support.', benefits: ['Wettbewerbsfähige und vollständig transparente Handelsmarge', 'Vorrangiger Zugang zu neuen Produkten und exklusiven Lösungen', 'Marketing-Support und Verkaufsmaterialien inklusive'], cta: 'Partnerschaft anfragen →' },
                'programma-partner':{ headline: 'Das umfassendste Partnerprogramm der Branche.', sub: 'Das SFERA Partner Program bietet dir alles, was du brauchst, um deinen Kunden das beste Smart-Home-Erlebnis auf dem Markt zu bieten — unterstützt von einer wachsenden Marke.', benefits: ['Drei Partnerschaftsebenen: Silver, Gold, Platinum', 'Dediziertes Partner-Dashboard mit vollständiger Projektverwaltung', 'Zertifizierte Schulungen, kontinuierliche Updates und exklusive Webinare'], cta: 'Ins Programm einsteigen →' },
                'centro-media':     { headline: 'Alles was du brauchst,<br>an einem einzigen Ort.', sub: 'Logo, Bilder, Videos, Pressemitteilungen und hochwertige Markenmaterialien. Das SFERA Media Center steht Journalisten, Partnern und Creatorn zur Verfügung, um das Haus der Zukunft zu erzählen.', benefits: ['Vollständiges Brand-Kit in hoher Auflösung zum Download', 'Fotos und Videos bereit zur redaktionellen Veröffentlichung', 'Direkter Pressekontakt für Interviews und Kooperationen'], cta: 'Media Center öffnen →' }
            },
            en: {
                illuminazione: { headline: 'Light that adapts to you', sub: 'No more switches. The house understands what you want and creates the perfect atmosphere, at any moment.', benefits: ['Turns on by itself when you enter a room', 'Custom scenes: cinema, dinner, relax', 'Full control from your phone, wherever you are'] },
                clima:         { headline: 'The right temperature, always', sub: 'Warm when needed, cool when you want it. The climate manages itself, without you having to think about it.', benefits: ['Pre-heats your home before you arrive', 'Reduces consumption when you\'re away', 'Learns your habits and adapts'] },
                sicurezza:     { headline: 'Sleep easy, we take care of it', sub: 'Alarm, cameras and sensors always active. You get a notification on your phone if something happens.', benefits: ['Automatic detection of unusual movements', 'Instant notification on your smartphone', 'HD cameras accessible remotely, 24/7'] },
                scenari:       { headline: 'One tap, everything changes', sub: 'Create the perfect scenario once. Then the house handles it on its own, every time you need it.', benefits: ['"Goodnight" scene: lights off, doors locked, alarm on', '"Cinema" scene: blinds down, soft light, TV on', 'Activate automatically on a schedule or by presence'] },
                vocale:        { headline: 'Speak, the house listens', sub: 'No remote, no app. Just say what you want and the house responds instantly.', benefits: ['Compatible with Alexa, Google and Siri', 'Works for the whole family, even children', 'Control lights, climate, music and much more'] },
                remoto:        { headline: 'Your home, wherever you are', sub: 'At the office, on holiday, abroad? Doesn\'t matter. Your home is always in the palm of your hand.', benefits: ['Open or close the door remotely', 'Control everything from a single intuitive app', 'Receive real-time updates'] },
                energia:       { headline: 'Use less, live better', sub: 'The house optimises consumption on its own. You save on bills without giving up comfort.', benefits: ['Real-time consumption monitoring', 'Automatic reduction when you\'re not home', 'Up to 40% savings on your energy bill'] },
                giardino:      { headline: 'Secure access, tended garden', sub: 'The gate opens automatically when you arrive. The irrigation starts on its own. Your outdoor space, always perfect.', benefits: ['Automatic gate with vehicle recognition', 'Weather-based irrigation scheduling', 'Smart video intercom with smartphone answer'] },
                '3d':          { headline: '<span style="color:#3AAEFF">Control</span> your home directly from the <span style="color:#3AAEFF">3D</span> floor plan', sub: 'Manage lights, climate, shutters and scenes directly on the real map of your home.', benefits: ['<span style="color:#3AAEFF">Interactive 3D</span> visualisation of your apartment', 'Immediate control of every room', 'All visual, simple and intuitive'], tagline: 'Your home. Under control, with a touch.', cta: 'Request free demo →' },
                casa:          { headline: 'Everything connected, worry-free life', sub: 'Not just smart devices: a complete ecosystem that thinks of everything, so you can live better.', benefits: ['All systems integrated in a single platform', 'Set up once, works forever', 'Designed for you: simple, elegant, invisible'] },
                'chi-siamo':   { headline: 'SFERA was born in Bolzano,<br>where homes become smarter,<br>without becoming more complicated.', sub: 'We create solutions that simplify daily life — with comfort, safety and automations truly designed for the people who live in the home.', benefits: ['We help you create a more comfortable, safer and more relaxing home', 'No unnecessary complexity — only what\'s truly needed', 'A single system, designed around the way you live'] },
                missione:           { headline: 'Making every home extraordinary.', sub: 'We believe technology should simplify life, not complicate it. That\'s why we create solutions that adapt to people, not the other way around.', benefits: ['Discreet technology that works naturally', 'Zero compromise between design and functionality', 'A future where living better becomes natural'] },
                collaborazione:     { headline: 'We partner with the best companies in the region.', sub: 'SFERA is the ideal technology partner for those who want to offer high-level smart home solutions to their clients. Let\'s build a solid, scalable, tailored offer together.', benefits: ['Customised solutions for every type of business', 'Dedicated technical support at every project stage', 'Exclusive partnership with concrete commercial benefits'], cta: 'Discover how to collaborate →' },
                preventivo:         { headline: 'Your free quote,<br>no commitment.', sub: 'Request a free technical consultation and receive a personalised quote for your home or business. No hidden costs, no obligation — just real solutions.', benefits: ['Free site visit at your home', 'Detailed and transparent quote within 48 hours', 'Technical consultation included, no strings attached'], cta: 'Request a quote →' },
                'smart-home':       { headline: 'B2B Solutions', sub: 'Smart Home solutions for businesses and professionals. We work with architects, electricians, construction companies, hotels and partners who want to offer their clients modern, reliable and easy-to-use automation systems.', benefits: ['Technical support at every stage of the project', 'Systems compatible with major standards', 'A single control for lights, climate, security and energy'], cta: 'Explore B2B solutions →' },
                'lavora-con-noi':   { headline: 'Building the future of Smart Home, together.', sub: 'SFERA is a young, ambitious startup introducing a new approach to the smart home. We\'re looking for young professionals passionate about electronics, electrical engineering and technology, ready to grow with us and build the solutions of tomorrow.', benefits: ['Innovative startup in strong growth', 'Ongoing training and professional development', 'Technologies that represent the future of Smart Home'], cta: 'Send us your application →' },
                'posizioni-aperte': { headline: 'Join the SFERA team.', sub: 'We\'re growing fast and always looking for talent. Check out our open positions or send us a spontaneous application — there\'s room for those ready to build something great.', benefits: ['Certified KNX / Z-Wave / Zigbee installers and technicians', 'Sales consultants and business developers', 'UX designers and embedded software developers'], cta: 'View open positions →' },
                'diventa-partner':  { headline: 'Become a SFERA partner and grow with us.', sub: 'Are you an installer, real estate agency or architecture firm? Become a SFERA partner and access exclusive terms, certified training and dedicated support.', benefits: ['Competitive and fully transparent commercial margins', 'Priority access to new products and exclusive solutions', 'Marketing support and sales materials included'], cta: 'Request partnership →' },
                'programma-partner':{ headline: 'The most comprehensive partner programme in the industry.', sub: 'The SFERA Partner Program gives you everything you need to offer your clients the best smart home experience on the market — backed by a growing brand.', benefits: ['Three partnership levels: Silver, Gold, Platinum', 'Dedicated partner dashboard with full project management', 'Certified training, continuous updates and exclusive webinars'], cta: 'Join the programme →' },
                'centro-media':     { headline: 'Everything you need,<br>in one place.', sub: 'Logo, images, videos, press releases and high-quality brand materials. The SFERA Media Centre is available to journalists, partners and creators to tell the story of the home of the future.', benefits: ['Complete brand kit downloadable in high resolution', 'Photos and videos ready for editorial publication', 'Direct press contact for interviews and collaborations'], cta: 'Open Media Centre →' }
            }
        };

        let currentSolKey = null;

        function _renderSolContent(key, lang) {
            const t = (solText[lang] || solText.it)[key];
            const m = solMedia[key] || {};
            if (!t) return;
            document.getElementById('sol-icon').innerHTML = m.icon || '';
            document.getElementById('sol-headline').innerHTML = t.headline;
            document.getElementById('sol-sub').innerHTML = t.sub;
            var benefitsHTML = t.benefits.map(function(b){
                return '<div class="sol-benefit"><div class="sol-benefit-dot"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg></div><p>' + b + '</p></div>';
            }).join('');
            if (t.tagline) {
                benefitsHTML += '<p style="font-family:\'Inter\',sans-serif;font-size:13px;color:rgba(255,255,255,0.42);letter-spacing:0.03em;margin-top:14px;text-align:center;">' + t.tagline + '</p>';
            }
            document.getElementById('sol-benefits').innerHTML = benefitsHTML;
            var ctaBtn = document.querySelector('.sol-cta');
            if (ctaBtn) {
                if (t.cta) {
                    ctaBtn.textContent = t.cta;
                } else {
                    var _l = document.documentElement.lang || 'it';
                    ctaBtn.textContent = (translations[_l] || translations.it)['sol-cta'] || 'Prenota sopralluogo gratuito →';
                }
            }
            const imgEl = document.getElementById('sol-img');
            if (m.video) {
                imgEl.innerHTML = '<video autoplay muted loop playsinline style="width:100%;height:auto;display:block;border-radius:14px;"><source src="' + m.video + '" type="video/mp4"></video>';
            } else if (m.img) {
                imgEl.innerHTML = '<img src="' + m.img + '" alt="' + (t.headline ? t.headline.replace(/<[^>]*>/g,'') : key) + '" class="popup-image" loading="lazy" decoding="async">';
            } else {
                imgEl.innerHTML = '<svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="opacity:0.3"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>';
            }
        }

        function openSol(key) {
            if (!solText.it[key]) return;
            currentSolKey = key;
            const lang = document.documentElement.lang || 'it';
            document.querySelectorAll('.nav-item').forEach(function(i){ i.classList.remove('open'); });
            _renderSolContent(key, lang);
            document.getElementById('sol-overlay').classList.add('open');
            document.body.style.overflow = 'hidden';
            _syncOverlayState();
        }
        function closeSolBtn() {
            document.getElementById('sol-overlay').classList.remove('open');
            document.body.style.overflow = '';
            const v = document.querySelector('#sol-img video');
            if (v) { v.pause(); v.currentTime = 0; }
            _syncOverlayState();
        }
        function closeSol(e) {
            if (e.target === document.getElementById('sol-overlay')) closeSolBtn();
        }

        /* ── Dropdown Nav Logic ── */
        function toggleNavItem(id) {
            const items = document.querySelectorAll('.nav-item');
            items.forEach(function(item) {
                if (item.id === id) {
                    item.classList.toggle('open');
                } else {
                    item.classList.remove('open');
                }
            });
        }

        // #8: IntersectionObserver — replaces getBoundingClientRect loop
        const scrollTopBtn = document.getElementById('scrollTop');
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
            document.querySelectorAll('.reveal').forEach(function(el) {
                revealObserver.observe(el);
            });
        } else {
            document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('active'); });
        }

        // Navbar logic
        const nav = document.getElementById('main-nav');
        let lastScrollTop = 0;

        function handleNavbar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            nav.classList.toggle('nav-hidden', scrollTop > lastScrollTop && scrollTop > 200);
            nav.classList.toggle('nav-scrolled', scrollTop > 50);
            // #9/#10: scrollTop button visibility — merged into same rAF, no extra listener
            scrollTopBtn.classList.toggle('visible', scrollTop > 400);
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }

        // Single RAF scroll handler — merges navbar + sticky CTA + progress bar
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleNavbar();
                    if (typeof checkStickyVisible === 'function') checkStickyVisible();
                    if (typeof updateScrollProgress === 'function') updateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        /* ── Language Globe Switcher UI ── */
        const langCodes = { it: 'IT', de: 'DE', en: 'EN' };

        function toggleLangMenu() {
            const wrap = document.getElementById('lang-wrap');
            wrap.classList.toggle('open');
            document.getElementById('lang-dropdown').classList.toggle('open');
        }

        function closeLangMenu() {
            document.getElementById('lang-wrap').classList.remove('open');
            document.getElementById('lang-dropdown').classList.remove('open');
        }

        function selectLang(lang) {
            setLang(lang);
            closeLangMenu();
        }

        // Close on outside click
        document.addEventListener('click', function(e) {
            const wrap = document.getElementById('lang-wrap');
            if (wrap && !wrap.contains(e.target)) closeLangMenu();
            // Close nav dropdowns on outside click
            if (!e.target.closest('.nav-item')) {
                document.querySelectorAll('.nav-item').forEach(function(i){ i.classList.remove('open'); });
            }
        });

        // #3: Escape key — close any open overlay
        document.addEventListener('keydown', function(e) {
            if (e.key !== 'Escape') return;
            if (document.getElementById('video-overlay').classList.contains('open')) { closeVideo(); return; }
            if (document.getElementById('exit-overlay').classList.contains('open')) { closeExit(); return; }
            if (document.getElementById('sol-overlay').classList.contains('open')) { closeSolBtn(); return; }
            if (document.getElementById('quiz-overlay').classList.contains('open')) { closeQuiz(); return; }
            if (document.getElementById('contatti-overlay').classList.contains('open')) { closeContatti(); return; }
            if (document.getElementById('mobile-nav-overlay').classList.contains('open')) { toggleMobileNav(); return; }
            closeLangMenu();
        });

        // #14: Focus trap helper
        function trapFocus(modalEl) {
            const sel = 'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';
            modalEl.addEventListener('keydown', function(e) {
                if (e.key !== 'Tab') return;
                const focusable = Array.from(modalEl.querySelectorAll(sel)).filter(function(el) {
                    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
                });
                if (!focusable.length) return;
                const first = focusable[0], last = focusable[focusable.length - 1];
                if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
                else            { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
            });
        }
        // Attach traps once
        trapFocus(document.getElementById('sol-modal'));
        trapFocus(document.getElementById('contatti-modal'));

        /* ── LANGUAGE SWITCHER ── */
        const translations = {
            it: {
                /* ── Hero ── */
                'hero-badge':    'Tecnologia Invisibile, Comfort Assoluto',
                'hero-h1':       'La tua casa, <span class="text-logoBlue hero-gradient-text">più intelligente che mai.</span>',
                'hero-sub':      'Luci, clima e sicurezza in un unico sistema.<br>Meno app, meno sprechi, più comfort ogni giorno.',
                'hero-check1':   'Controllo dal telefono',
                'hero-check2':   'Risparmio energia fino al 30%',
                'hero-check3':   'Tutto automatico',
                'hero-btn1':     'Prenota un sopralluogo gratuito',
                'hero-btn2':     'Guarda il Video',
                /* ── Nav desktop ── */
                'nav-btn-sistemi':        'Sistemi',
                'nav-btn-sol':            'Soluzioni',
                'nav-btn-about':          'Su di noi',
                'nav-btn-contact':        'Contattaci',
                'nav-btn-cta':            'Sopralluogo gratuito',
                'nav-badge-top':          '⭐ più scelto',
                'nav-s-all':              'Tutti i sistemi',
                'nav-s-all-sub':          'Esplora l\'intera gamma',
                'nav-s-starter':          'Starter Smart',
                'nav-s-starter-sub':      'Controllo base luci e prese',
                'nav-s-comfort':          'Comfort Smart ⭐',
                'nav-s-comfort-sub':      'Luci, clima e automazioni',
                'nav-s-security':         'Security Smart',
                'nav-s-security-sub':     'Allarme, telecamere e controllo remoto',
                'nav-s-energy':           'Energy Smart',
                'nav-s-energy-sub':       'Riduzione consumi e monitoraggio',
                'nav-s-full':             'Full Smart',
                'nav-s-full-sub':         'Casa completamente automatizzata',
                'nav-sol-luce':           'Illuminazione intelligente',
                'nav-sol-luce-sub':       'La luce che si adatta a te',
                'nav-sol-clima':          'Clima e riscaldamento',
                'nav-sol-clima-sub':      'La temperatura giusta, sempre',
                'nav-sol-sicur':          'Sicurezza e allarme',
                'nav-sol-sicur-sub':      'Dormi tranquillo, ci pensiamo noi',
                'nav-sol-scenari':        'Scenari automatici',
                'nav-sol-scenari-sub':    'Un tocco, tutto cambia',
                'nav-sol-vocale':         'Controllo vocale',
                'nav-sol-vocale-sub':     'Parla, la casa ti ascolta',
                'nav-sol-remoto':         'Controllo remoto',
                'nav-sol-remoto-sub':     'La tua casa, ovunque tu sia',
                'nav-sol-energia':        'Risparmio energetico',
                'nav-sol-energia-sub':    'Consuma meno, vivi meglio',
                'nav-sol-giardino':       'Giardino e accessi',
                'nav-sol-giardino-sub':   'Accesso sicuro, giardino curato',
                'nav-sol-3d':             'Controllo 3D',
                'nav-sol-3d-sub':         'Gestisci la tua casa dalla pianta 3D',
                'nav-sol-casa':           'Casa intelligente',
                'nav-sol-casa-sub':       'Tutto connesso, vita senza pensieri',
                'nav-about-chi':          'Chi siamo',
                'nav-about-chi-sub':      'Il team dietro SFERA',
                'nav-about-miss':         'La nostra missione',
                'nav-about-miss-sub':     'Valori e visione aziendale',
                'nav-contact-lbl':        'Contatti',
                'nav-contact-sub':        'Parliamo del tuo progetto',
                /* ── Contatti modal ── */
                'sol-cta':        'Prenota sopralluogo gratuito →',
                'ct-eyebrow':     'Contatti',
                'ct-h2':          'Parliamo del<br>tuo progetto',
                'ct-sub1':        'Ti rispondiamo entro 24 ore.',
                'ct-sub2':        'Consulenza gratuita, senza impegno.',
                'ct-wa-btn':      'Scrivici su WhatsApp',
                'ct-tg-btn':      'Scrivici su Telegram',
                'ct-tg-note':     'Rispondiamo anche su Telegram',
                'ct-phone-btn':   'Chiama ora',
                'ct-email-btn':   'Invia email',
                'ct-wa-label':    'WhatsApp',
                'ct-wa-hint':     'Di solito rispondiamo in pochi minuti',
                'ct-phone-label': 'Telefono',
                'ct-tg-label':    'Telegram',
                'ct-tg-hint':     'Rispondiamo anche su Telegram',
                'ct-email-label': 'Email',
                'ct-team-label':  'Il nostro team',
                'ct-m1-role':     'Co-Founder & Smart Systems Architect',
                'ct-m2-role':     'Co-Founder & Technical Director',
                /* ── Scenari Smart section ── */
                'sc-title':   'scenari di vita migliore che oggi ti stai perdendo',
                'sc-sub':     'Quanti di questi vorresti avere già domani?',
                'sc-cta-link':'Prenota il sopralluogo gratuito',
                'sc-c1-h':  'Protezione Assoluta',
                'sc-c1-p':  'La tua casa è sempre vigile e protegge automaticamente ciò che conta davvero, giorno e notte.',
                'sc-c2-h':  'Partenza Senza Pensieri',
                'sc-c2-p':  'In vacanza o in trasferta, tutto continua a funzionare mentre la casa si prende cura di sé.',
                'sc-c3-h':  'Risveglio Perfetto',
                'sc-c3-p':  'Luce, tende e atmosfera si sincronizzano per accompagnarti in un risveglio dolce e naturale.',
                'sc-c4-h':  'Tempo per Due',
                'sc-c4-p':  'Con un solo gesto, la casa crea un ambiente intimo e raffinato per i momenti speciali.',
                'sc-c5-h':  'Cinema Experience',
                'sc-c5-p':  'Basta una frase per trasformare il soggiorno nel tuo cinema privato, pronto da vivere.',
                'sc-c6-h':  'Modalità Ospiti',
                'sc-c6-p':  'Amici e parenti si sentono subito a proprio agio, senza dover pensare alla tecnologia.',
                'sc-c7-h':  'Momenti in Famiglia',
                'sc-c7-p':  'Comfort, relax e atmosfera perfetta per condividere il tempo più prezioso con chi ami.',
                'sc-c8-h':  'Bentornato',
                'sc-c8-p':  'La casa si prepara ad accoglierti e ti fa trovare subito l\'atmosfera che preferisci.',
                'sc-c9-h':  'Meteo sotto Controllo',
                'sc-c9-p':  'Pioggia, vento e temporali vengono gestiti automaticamente per proteggere la tua casa.',
                'sc-c10-h': 'Accesso Temporaneo',
                'sc-c10-p': 'Concedi accessi limitati a tecnici e collaboratori mantenendo sempre il pieno controllo.',
                /* ── Consult / Why / CTA ── */
                /* ── Come funziona ── */
                'how-eyebrow':  'Il processo',
                'how-h2':       'Come funziona',
                'how-1-title':  'Consulenza gratuita',
                'how-1-desc':   'Analizziamo la tua casa. Zero impegno.',
                'how-2-title':  'Progettazione',
                'how-2-desc':   'Vedi tutto prima di iniziare.',
                'how-3-title':  'Installazione',
                'how-3-desc':   'Facciamo tutto noi.',
                'how-4-title':  'Supporto',
                'how-4-desc':   'Siamo sempre con te, anche dopo.',
                /* ── Problems/Solution ── */
                'prob-1': 'Ti alzi in una casa fredda e devi regolare manualmente termostati e tapparelle.',
                'prob-2': 'Dubbi costanti: «Avrò spento tutto? Le luci? Il ferro da stiro?». Ansia da dimenticanza.',
                'prob-3': 'Rientri nel buio, in un ambiente non climatizzato. Devi gestire ogni comando uno ad uno.',
                'prob-4': 'Un tubo che perde o un intruso vengono scoperti solo al tuo ritorno. Danni massimi.',
                'prob-solution': 'Con SFERA hai un unico sistema che fa tutto per te',
                'prob-cta':  'Scopri come funziona →',
                'prob-cta2': 'Trova il sistema giusto per te →',
                'sol-1': 'La casa si «sveglia» con te: temperatura ideale e scenari di luce naturale già attivi.',
                'sol-2': 'Scenario «Esco»: con un tocco (o in automatico) si spegne ogni spreco e si attiva la protezione.',
                'sol-3': 'Accoglienza personalizzata: luci soffuse, clima perfetto e la tua playlist preferita già attiva.',
                'sol-4': 'Rilevazione immediata: SFERA chiude l\'acqua in autonomia e ti avvisa istantaneamente.',
                'nav-s-comfort-plain': 'Comfort Smart',
                'cta-btn':       'Prenota subito il tuo<br>SOPRALLUOGO GRATUITO',
                'why-eyebrow':   'L\'eccellenza è di casa',
                'why-h2':        'Perché scegliere SFERA Smart Systems?',
                'why1-h4':       'Integrazione Nativa',
                'why1-p':        'Dispositivi provenienti da sistemi diversi comunicano in un unico ecosistema affidabile.',
                'why2-h4':       'Soluzione su misura per te',
                'why2-p':        'Progettiamo tutto in base alla tua casa e alle tue abitudini.',
                'why3-h4':       'Assistenza inclusa',
                'why3-p':        'Ti supportiamo anche dopo l\'installazione.<br>Monitoraggio remoto e assistenza tecnica sempre al tuo fianco.',
                'why4-h4':       'Facile da usare',
                'why4-p':        'Controlli tutto dal telefono, in modo semplice e intuitivo.',
                /* ── Footer ── */
                'footer-tagline': 'Soluzioni smart per una casa più comoda, sicura ed efficiente.',
                'ft-sistemi':     'Sistemi',
                'ft-soluzioni':   'Soluzioni',
                'ft-azienda':     'Azienda',
                'ft-contatti':    'Contatti',
                'ft-a1':          'Chi Siamo',
                'ft-a2':          'La nostra missione',
                'ft-aziende':     'Per le aziende',
                'ft-collaborazione': 'Collaborazione',
                'ft-preventivo':  'Preventivo per aziende',
                'ft-smart-home':  'Soluzioni B2B',
                'ft-carriere':    'Carriere',
                'ft-lavora':      'Lavora con noi',
                'ft-posizioni':   'Posizioni aperte',
                'ft-i-partner':   'Per i partner',
                'ft-diventa':     'Diventa partner',
                'ft-programma':   'Programma partner',
                'ft-centro':      'Centro media',
                'ft-city':        'Bolzano, Italia',
                'footer-copy':    '© 2026 SFERA Smart Systems · Tutti i diritti riservati',
                'footer-slogan':  'Comfort • Intelligenza • Sfera',
                'search-ph':      'Cerca parole o servizi...',
                /* ── Aria / title attributes ── */
                'aria-scroll-top':  'Torna su',
                'aria-lang-btn':    'Seleziona lingua',
                'aria-menu':        'Menu',
                'btn-close':        'Chiudi',
                'title-instagram':  'Seguici su Instagram',
                'title-youtube':    'Guarda i nostri video su YouTube',
                /* ── Sticky CTA ── */
                'sticky-cta-text': 'Hai domande? Prenota una consulenza gratuita',
                'sticky-cta-btn':  'Consulenza gratuita →',
                /* ── Cookie ── */
                'cookie-text':    'Utilizziamo i cookie per migliorare l\'esperienza di navigazione. Continuando accetti la nostra <a href="/privacy-policy.html">Privacy Policy</a>.',
                'cookie-accept':  'Accetta tutti',
                'cookie-decline': 'Solo essenziali',
                /* ── Exit popup ── */
                'exit-h3':  'Prima di andare…',
                'exit-p':   'Hai trovato la soluzione giusta per la tua casa? Un nostro esperto ti risponde in poche ore — gratuitamente.',
                'exit-cta': 'Richiedi consulenza gratuita →',
                /* ── Case Studies ── */
                'cs-eyebrow':'Progetti realizzati', 'cs-h2':'Case studies',
                'cs-tag-full':'Full Smart','cs-tag-comfort':'Comfort Smart','cs-tag-energy':'Energy Smart',
                'cs-1-title':'Villa privata, Bolzano','cs-1-meta':'180 m² · 6 ambienti · Ristrutturazione','cs-1-result':'Luci, clima, sicurezza + controllo 3D integrato',
                'cs-2-title':'Appartamento, Laives','cs-2-meta':'110 m² · 4 locali · Ristrutturazione','cs-2-result':'Comfort Smart · Clima, luci e scenari automatici','cs-2-video-btn':'Guarda il video',
                'cs-3-title':'Attico, Trento','cs-3-meta':'120 m² · 4 ambienti · Ristrutturazione','cs-3-result':'Risparmio energetico −40% + controllo remoto',
                'cs-quiz-cta':'Trova il sistema giusto per te →',
                /* ── FAQ ── */
                'faq-eyebrow':'Domande frequenti','faq-h2':'Hai dubbi? Abbiamo le risposte.',
                'faq-1-q':'Quanto costa un sistema SFERA?','faq-1-a':'I costi variano in base alle dimensioni e al sistema scelto. Offriamo soluzioni entry-level fino a sistemi Full Smart completi. La consulenza è sempre gratuita e senza impegno.',
                'faq-2-q':'Posso installarlo in una casa già costruita?','faq-2-a':'Sì. Il 70% dei nostri progetti riguarda abitazioni esistenti. Utilizziamo tecnologie wireless e soluzioni minimamente invasive — senza demolizioni.',
                'faq-3-q':'Funziona senza internet?','faq-3-a':'Sì. Le funzioni locali — luci, clima, scenari — funzionano sempre anche offline. La connessione è necessaria solo per il controllo da remoto.',
                'faq-4-q':'Quanto tempo richiede l\'installazione?','faq-4-a':'Un appartamento standard richiede 1–3 giorni lavorativi. I progetti più ampi vengono pianificati durante la fase di progettazione 3D.',
                'faq-5-q':'È compatibile con Alexa, Google e Apple HomeKit?','faq-5-a':'Sì. I nostri sistemi si integrano con Alexa, Google Assistant e Apple HomeKit. Un solo ecosistema, controllo ovunque.',
                'faq-6-q':'Cosa succede dopo l\'installazione?','faq-6-a':'Offriamo supporto continuativo, aggiornamenti da remoto e assistenza prioritaria. Restiamo al tuo fianco per sempre.',
                /* ── Quiz ── */
                'quiz-step':'Passo 1 di 3','quiz-step2':'Passo 2 di 3','quiz-step3':'Passo 3 di 3',
                'quiz-1-q':'Quante stanze vuoi automatizzare?','quiz-1-a1':'1–2 stanze','quiz-1-a2':'3–4 stanze','quiz-1-a3':'5 o più stanze',
                'quiz-2-q':'Cosa ti interessa di più?','quiz-2-a1':'Solo luci e prese','quiz-2-a2':'Clima + scenari automatici','quiz-2-a3':'Sicurezza e accessi','quiz-2-a4':'Tutto integrato',
                'quiz-3-q':'Quando pensi di iniziare?','quiz-3-a1':'Subito, sto pianificando','quiz-3-a2':'Entro 3–6 mesi','quiz-3-a3':'Sto ancora valutando',
                'quiz-result-eyebrow':'Il tuo sistema ideale','quiz-result-label':'Consigliamo',
                'quiz-cta-btn':'Prenota consulenza gratuita →','quiz-note':'Nessun impegno. Solo idee chiare.',
                /* ── Nav dots ── */
                'nd-home': 'Home', 'nd-comparison': 'Prima e dopo', 'nd-scenari': 'Scenari',
                'nd-how': 'Come funziona', 'nd-why': 'Perché SFERA', 'nd-progetti': 'Progetti', 'nd-faq': 'FAQ',
                /* ── Carousel arrows ── */
                'sc3d-prev': 'Precedente', 'sc3d-next': 'Successivo',
            },
            de: {
                /* ── Hero ── */
                'hero-badge':    'Unsichtbare Technologie, absoluter Komfort',
                'hero-h1':       'Dein Zuhause, <span class="text-logoBlue hero-gradient-text">intelligenter denn je.</span>',
                'hero-sub':      'Licht, Klima und Sicherheit in einem einzigen System.<br>Weniger Apps, weniger Verschwendung, mehr Komfort.',
                'hero-check1':   'Steuerung vom Telefon',
                'hero-check2':   'Energieeinsparung bis zu 30%',
                'hero-check3':   'Alles automatisch',
                'hero-btn1':     'Kostenlose Beratung buchen',
                'hero-btn2':     'Video ansehen',
                /* ── Nav desktop ── */
                'nav-btn-sistemi':        'Systeme',
                'nav-btn-sol':            'Lösungen',
                'nav-btn-about':          'Über uns',
                'nav-btn-contact':        'Kontakt',
                'nav-btn-cta':            'Kostenlose Begehung',
                'nav-badge-top':          '⭐ beliebteste Wahl',
                'nav-s-all':              'Alle Systeme',
                'nav-s-all-sub':          'Die gesamte Produktpalette',
                'nav-s-starter':          'Starter Smart',
                'nav-s-starter-sub':      'Basis-Steuerung für Licht und Steckdosen',
                'nav-s-comfort':          'Comfort Smart ⭐',
                'nav-s-comfort-sub':      'Licht, Klima und Automationen',
                'nav-s-security':         'Security Smart',
                'nav-s-security-sub':     'Alarm, Kameras und Fernzugriff',
                'nav-s-energy':           'Energy Smart',
                'nav-s-energy-sub':       'Verbrauchsreduzierung und Monitoring',
                'nav-s-full':             'Full Smart',
                'nav-s-full-sub':         'Vollständig automatisiertes Zuhause',
                'nav-sol-luce':           'Intelligente Beleuchtung',
                'nav-sol-luce-sub':       'Licht, das sich dir anpasst',
                'nav-sol-clima':          'Klima und Heizung',
                'nav-sol-clima-sub':      'Die richtige Temperatur, immer',
                'nav-sol-sicur':          'Sicherheit und Alarm',
                'nav-sol-sicur-sub':      'Schlaf ruhig, wir kümmern uns',
                'nav-sol-scenari':        'Automatische Szenarien',
                'nav-sol-scenari-sub':    'Ein Tippen, alles verändert sich',
                'nav-sol-vocale':         'Sprachsteuerung',
                'nav-sol-vocale-sub':     'Sprich, das Haus hört zu',
                'nav-sol-remoto':         'Fernsteuerung',
                'nav-sol-remoto-sub':     'Dein Zuhause, wo auch immer du bist',
                'nav-sol-energia':        'Energiesparen',
                'nav-sol-energia-sub':    'Weniger verbrauchen, besser leben',
                'nav-sol-giardino':       'Garten und Zugänge',
                'nav-sol-giardino-sub':   'Sicherer Zugang, gepflegter Garten',
                'nav-sol-3d':             '3D-Steuerung',
                'nav-sol-3d-sub':         'Steuere dein Zuhause auf dem 3D-Grundriss',
                'nav-sol-casa':           'Smart Home',
                'nav-sol-casa-sub':       'Alles verbunden, sorgenloses Leben',
                'nav-about-chi':          'Wer wir sind',
                'nav-about-chi-sub':      'Das Team hinter SFERA',
                'nav-about-miss':         'Unsere Mission',
                'nav-about-miss-sub':     'Werte und Unternehmensvision',
                'nav-contact-lbl':        'Kontakt',
                'nav-contact-sub':        'Sprechen wir über dein Projekt',
                /* ── Contatti modal ── */
                'sol-cta':        'Kostenlose Begehung buchen →',
                'ct-eyebrow':     'Kontakt',
                'ct-h2':          'Sprechen wir über<br>dein Projekt',
                'ct-sub1':        'Wir antworten innerhalb von 24 Stunden.',
                'ct-sub2':        'Kostenlose Beratung, unverbindlich.',
                'ct-wa-btn':      'WhatsApp schreiben',
                'ct-tg-btn':      'Telegram schreiben',
                'ct-tg-note':     'Wir antworten auch auf Telegram',
                'ct-phone-btn':   'Jetzt anrufen',
                'ct-email-btn':   'E-Mail senden',
                'ct-wa-label':    'WhatsApp',
                'ct-wa-hint':     'Wir antworten normalerweise in wenigen Minuten',
                'ct-phone-label': 'Telefon',
                'ct-tg-label':    'Telegram',
                'ct-tg-hint':     'Wir antworten auch auf Telegram',
                'ct-email-label': 'E-Mail',
                'ct-team-label':  'Unser Team',
                'ct-m1-role':     'Co-Founder & Smart Systems Architect',
                'ct-m2-role':     'Co-Founder & Technical Director',
                /* ── Scenari Smart section ── */
                'sc-title':   'Szenarien für ein besseres Leben, die dir heute fehlen',
                'sc-sub':     'Wie viele davon möchtest du schon morgen haben?',
                'sc-cta-link':'Kostenlose Besichtigung buchen',
                'sc-c1-h':  'Absolute Sicherheit',
                'sc-c1-p':  'Dein Zuhause ist stets wachsam und schützt automatisch das, was wirklich zählt — Tag und Nacht.',
                'sc-c2-h':  'Sorglose Abreise',
                'sc-c2-p':  'Im Urlaub oder auf Reisen läuft alles weiter, während sich das Haus selbst um sich kümmert.',
                'sc-c3-h':  'Perfektes Erwachen',
                'sc-c3-p':  'Licht, Vorhänge und Atmosphäre synchronisieren sich für ein sanftes, natürliches Erwachen.',
                'sc-c4-h':  'Zeit zu zweit',
                'sc-c4-p':  'Mit einer einzigen Geste schafft das Haus eine intime und elegante Atmosphäre für besondere Momente.',
                'sc-c5-h':  'Kinoerlebnis',
                'sc-c5-p':  'Ein einziger Satz verwandelt das Wohnzimmer in dein privates Kino, bereit zum Genießen.',
                'sc-c6-h':  'Gästemodus',
                'sc-c6-p':  'Freunde und Familie fühlen sich sofort wohl, ohne an Technik denken zu müssen.',
                'sc-c7-h':  'Familienmomente',
                'sc-c7-p':  'Komfort, Entspannung und die perfekte Atmosphäre, um wertvolle Zeit mit deinen Liebsten zu teilen.',
                'sc-c8-h':  'Willkommen zurück',
                'sc-c8-p':  'Das Haus bereitet sich darauf vor, dich zu empfangen, und lässt dich sofort die Atmosphäre finden, die du liebst.',
                'sc-c9-h':  'Wetter im Griff',
                'sc-c9-p':  'Regen, Wind und Gewitter werden automatisch verwaltet, um dein Zuhause zu schützen.',
                'sc-c10-h': 'Temporärer Zugang',
                'sc-c10-p': 'Gewähre Technikern und Mitarbeitern begrenzten Zugang und behalte stets die volle Kontrolle.',
                /* ── Consult / Why / CTA ── */
                /* ── Wie es funktioniert ── */
                'how-eyebrow':  'Der Prozess',
                'how-h2':       'Wie es funktioniert',
                'how-1-title':  'Kostenlose Beratung',
                'how-1-desc':   'Wir analysieren dein Zuhause. Kein Aufwand.',
                'how-2-title':  'Planung',
                'how-2-desc':   'Sieh alles vor dem Start.',
                'how-3-title':  'Installation',
                'how-3-desc':   'Wir erledigen alles.',
                'how-4-title':  'Support',
                'how-4-desc':   'Wir sind immer für dich da, auch danach.',
                'prob-1': 'Du wachst in einem kalten Haus auf und musst Thermostate und Rollläden manuell einstellen.',
                'prob-2': 'Ständige Zweifel: «Habe ich alles ausgeschaltet? Das Licht? Das Bügeleisen?». Vergesslichkeit.',
                'prob-3': 'Du kommst im Dunkeln heim, in eine nicht klimatisierte Wohnung. Jedes Gerät muss einzeln bedient werden.',
                'prob-4': 'Ein Rohrbruch oder ein Einbrecher werden erst bei deiner Rückkehr entdeckt. Maximale Schäden.',
                'prob-solution': 'Mit SFERA hast du ein einziges System, das alles für dich erledigt',
                'prob-cta':  'So funktioniert es →',
                'prob-cta2': 'Das richtige System für dich finden →',
                'sol-1': 'Das Haus «erwacht» mit dir: ideale Temperatur und natürliche Lichtszenarien bereits aktiv.',
                'sol-2': 'Szenario «Ich gehe»: mit einem Tippen (oder automatisch) wird jede Verschwendung abgeschaltet und der Schutz aktiviert.',
                'sol-3': 'Persönlicher Empfang: gedimmtes Licht, perfektes Klima und deine Lieblingsplaylist bereits aktiv.',
                'sol-4': 'Sofortige Erkennung: SFERA schließt das Wasser selbstständig ab und benachrichtigt dich sofort.',
                'nav-s-comfort-plain': 'Comfort Smart',
                'cta-btn':       'Jetzt kostenlose<br>BERATUNG BUCHEN',
                'why-eyebrow':   'Exzellenz zu Hause',
                'why-h2':        'Warum SFERA Smart Systems wählen?',
                'why1-h4':       'Native Integration',
                'why1-p':        'Geräte aus verschiedenen Systemen kommunizieren in einem einzigen zuverlässigen Ökosystem.',
                'why2-h4':       'Maßgeschneiderte Lösung',
                'why2-p':        'Wir planen alles nach deinem Zuhause und deinen Gewohnheiten.',
                'why3-h4':       'Inklusive Support',
                'why3-p':        'Wir unterstützen dich auch nach der Installation.<br>Fernüberwachung und technische Assistenz immer an deiner Seite.',
                'why4-h4':       'Einfach zu bedienen',
                'why4-p':        'Alles per Smartphone steuern – einfach und intuitiv.',
                /* ── Footer ── */
                'footer-tagline': 'Smarte Lösungen für ein komfortableres, sichereres und effizienteres Zuhause.',
                'ft-sistemi':     'Systeme',
                'ft-soluzioni':   'Lösungen',
                'ft-azienda':     'Unternehmen',
                'ft-contatti':    'Kontakt',
                'ft-a1':          'Wer wir sind',
                'ft-a2':          'Unsere Mission',
                'ft-aziende':     'Für Unternehmen',
                'ft-collaborazione': 'Zusammenarbeit',
                'ft-preventivo':  'Angebot für Unternehmen',
                'ft-smart-home':  'B2B-Lösungen',
                'ft-carriere':    'Karriere',
                'ft-lavora':      'Jobs bei SFERA',
                'ft-posizioni':   'Offene Stellen',
                'ft-i-partner':   'Für Partner',
                'ft-diventa':     'Partner werden',
                'ft-programma':   'Partnerprogramm',
                'ft-centro':      'Mediacenter',
                'ft-city':        'Bozen, Italien',
                'footer-copy':    '© 2026 SFERA Smart Systems · Alle Rechte vorbehalten',
                'footer-slogan':  'Komfort • Intelligenz • Sfera',
                'search-ph':      'Suche nach Begriffen oder Diensten...',
                /* ── Aria / title attributes ── */
                'aria-scroll-top':  'Nach oben',
                'aria-lang-btn':    'Sprache wählen',
                'aria-menu':        'Menü',
                'btn-close':        'Schließen',
                'title-instagram':  'Folge uns auf Instagram',
                'title-youtube':    'Unsere Videos auf YouTube',
                /* ── Sticky CTA ── */
                'sticky-cta-text': 'Fragen? Kostenlose Beratung vereinbaren',
                'sticky-cta-btn':  'Kostenlose Beratung →',
                /* ── Cookie ── */
                'cookie-text':    'Wir verwenden Cookies, um das Surferlebnis zu verbessern. Mit der weiteren Nutzung akzeptieren Sie unsere <a href="/privacy-policy.html">Datenschutzerklärung</a>.',
                'cookie-accept':  'Alle akzeptieren',
                'cookie-decline': 'Nur notwendige',
                /* ── Exit popup ── */
                'exit-h3':  'Bevor Sie gehen…',
                'exit-p':   'Haben Sie die richtige Lösung für Ihr Zuhause gefunden? Einer unserer Experten antwortet Ihnen in wenigen Stunden — kostenlos.',
                'exit-cta': 'Kostenlose Beratung anfragen →',
                /* ── Case Studies ── */
                'cs-eyebrow':'Realisierte Projekte','cs-h2':'Case studies',
                'cs-tag-full':'Full Smart','cs-tag-comfort':'Comfort Smart','cs-tag-energy':'Energy Smart',
                'cs-1-title':'Privatvilla, Bozen','cs-1-meta':'180 m² · 6 Räume · Renovierung','cs-1-result':'Licht, Klima, Sicherheit + integrierte 3D-Steuerung',
                'cs-2-title':'Wohnung, Laives','cs-2-meta':'110 m² · 4 Zimmer · Renovierung','cs-2-result':'Comfort Smart · Klima, Licht und automatische Szenarien','cs-2-video-btn':'Video ansehen',
                'cs-3-title':'Penthouse, Trient','cs-3-meta':'120 m² · 4 Räume · Renovierung','cs-3-result':'Energieeinsparung −40% + Fernzugriff',
                'cs-quiz-cta':'Das richtige System für dich finden →',
                /* ── FAQ ── */
                'faq-eyebrow':'Häufige Fragen','faq-h2':'Fragen? Wir haben die Antworten.',
                'faq-1-q':'Was kostet ein SFERA-System?','faq-1-a':'Die Kosten variieren je nach Größe und gewähltem System. Wir bieten Lösungen von Starter Smart bis Full Smart. Die Erstberatung ist immer kostenlos und unverbindlich.',
                'faq-2-q':'Kann ich es in einem bestehenden Haus installieren?','faq-2-a':'Ja. 70% unserer Projekte betreffen Bestandsgebäude. Wir verwenden Funktechnologien und minimalinvasive Lösungen — ohne Abrissarbeiten.',
                'faq-3-q':'Funktioniert es ohne Internet?','faq-3-a':'Ja. Lokale Funktionen — Licht, Klima, Szenarien — funktionieren immer, auch offline. Internet ist nur für die Fernsteuerung per App notwendig.',
                'faq-4-q':'Wie lange dauert die Installation?','faq-4-a':'Eine Standardwohnung benötigt 1–3 Arbeitstage. Größere Projekte werden in der 3D-Planungsphase detailliert geplant.',
                'faq-5-q':'Ist es kompatibel mit Alexa, Google und Apple HomeKit?','faq-5-a':'Ja. Unsere Systeme integrieren sich mit Alexa, Google Assistant und Apple HomeKit. Ein Ökosystem, Kontrolle überall.',
                'faq-6-q':'Was passiert nach der Installation?','faq-6-a':'Wir bieten kontinuierlichen Support, Remote-Updates und bevorzugten Service. Wir sind immer für dich da.',
                /* ── Quiz ── */
                'quiz-step':'Schritt 1 von 3','quiz-step2':'Schritt 2 von 3','quiz-step3':'Schritt 3 von 3',
                'quiz-1-q':'Wie viele Räume möchtest du automatisieren?','quiz-1-a1':'1–2 Räume','quiz-1-a2':'3–4 Räume','quiz-1-a3':'5 oder mehr',
                'quiz-2-q':'Was interessiert dich am meisten?','quiz-2-a1':'Nur Licht und Steckdosen','quiz-2-a2':'Klima + automatische Szenarien','quiz-2-a3':'Sicherheit und Zugang','quiz-2-a4':'Alles integriert',
                'quiz-3-q':'Wann planst du zu starten?','quiz-3-a1':'Sofort, ich plane bereits','quiz-3-a2':'In 3–6 Monaten','quiz-3-a3':'Ich überlege noch',
                'quiz-result-eyebrow':'Dein ideales System','quiz-result-label':'Wir empfehlen',
                'quiz-cta-btn':'Kostenlose Beratung buchen →','quiz-note':'Unverbindlich. Nur klare Ideen.',
                /* ── Nav dots ── */
                'nd-home': 'Home', 'nd-comparison': 'Vorher/Nachher', 'nd-scenari': 'Szenarien',
                'nd-how': 'So funktioniert es', 'nd-why': 'Warum SFERA', 'nd-progetti': 'Projekte', 'nd-faq': 'FAQ',
                /* ── Carousel arrows ── */
                'sc3d-prev': 'Vorherige', 'sc3d-next': 'Nächste',
            },
            en: {
                /* ── Hero ── */
                'hero-badge':    'Invisible Technology, Absolute Comfort',
                'hero-h1':       'Your home, <span class="text-logoBlue hero-gradient-text">smarter than ever.</span>',
                'hero-sub':      'Lights, climate and security in one system.<br>Fewer apps, less waste, more comfort every day.',
                'hero-check1':   'Control from your phone',
                'hero-check2':   'Energy saving up to 30%',
                'hero-check3':   'Everything automatic',
                'hero-btn1':     'Book a free site survey',
                'hero-btn2':     'Watch the Video',
                /* ── Nav desktop ── */
                'nav-btn-sistemi':        'Systems',
                'nav-btn-sol':            'Solutions',
                'nav-btn-about':          'About us',
                'nav-btn-contact':        'Contact us',
                'nav-btn-cta':            'Free site survey',
                'nav-badge-top':          '⭐ most popular',
                'nav-s-all':              'All systems',
                'nav-s-all-sub':          'Explore the full range',
                'nav-s-starter':          'Starter Smart',
                'nav-s-starter-sub':      'Basic control for lights and sockets',
                'nav-s-comfort':          'Comfort Smart ⭐',
                'nav-s-comfort-sub':      'Lights, climate and automations',
                'nav-s-security':         'Security Smart',
                'nav-s-security-sub':     'Alarm, cameras and remote access',
                'nav-s-energy':           'Energy Smart',
                'nav-s-energy-sub':       'Consumption reduction and monitoring',
                'nav-s-full':             'Full Smart',
                'nav-s-full-sub':         'Fully automated home',
                'nav-sol-luce':           'Smart lighting',
                'nav-sol-luce-sub':       'Light that adapts to you',
                'nav-sol-clima':          'Climate and heating',
                'nav-sol-clima-sub':      'The right temperature, always',
                'nav-sol-sicur':          'Security and alarm',
                'nav-sol-sicur-sub':      'Sleep easy, we take care of it',
                'nav-sol-scenari':        'Automatic scenarios',
                'nav-sol-scenari-sub':    'One tap, everything changes',
                'nav-sol-vocale':         'Voice control',
                'nav-sol-vocale-sub':     'Speak, the house listens',
                'nav-sol-remoto':         'Remote control',
                'nav-sol-remoto-sub':     'Your home, wherever you are',
                'nav-sol-energia':        'Energy saving',
                'nav-sol-energia-sub':    'Use less, live better',
                'nav-sol-giardino':       'Garden and access',
                'nav-sol-giardino-sub':   'Secure access, tended garden',
                'nav-sol-3d':             '3D Control',
                'nav-sol-3d-sub':         'Manage your home from the 3D floor plan',
                'nav-sol-casa':           'Smart home',
                'nav-sol-casa-sub':       'Everything connected, worry-free life',
                'nav-about-chi':          'Who we are',
                'nav-about-chi-sub':      'The team behind SFERA',
                'nav-about-miss':         'Our mission',
                'nav-about-miss-sub':     'Values and company vision',
                'nav-contact-lbl':        'Contact',
                'nav-contact-sub':        'Let\'s talk about your project',
                /* ── Contatti modal ── */
                'sol-cta':        'Book a free site survey →',
                'ct-eyebrow':     'Contact',
                'ct-h2':          'Let\'s talk about<br>your project',
                'ct-sub1':        'We reply within 24 hours.',
                'ct-sub2':        'Free consultation, no commitment.',
                'ct-wa-btn':      'Message us on WhatsApp',
                'ct-tg-btn':      'Write us on Telegram',
                'ct-tg-note':     'We also reply on Telegram',
                'ct-phone-btn':   'Call now',
                'ct-email-btn':   'Send email',
                'ct-wa-label':    'WhatsApp',
                'ct-wa-hint':     'We usually reply within minutes',
                'ct-phone-label': 'Phone',
                'ct-tg-label':    'Telegram',
                'ct-tg-hint':     'We also reply on Telegram',
                'ct-email-label': 'Email',
                'ct-team-label':  'Our team',
                'ct-m1-role':     'Co-Founder & Smart Systems Architect',
                'ct-m2-role':     'Co-Founder & Technical Director',
                /* ── Scenari Smart section ── */
                'sc-title':   'better-life scenarios you\'re missing out on today',
                'sc-sub':     'How many of these would you want by tomorrow?',
                'sc-cta-link':'Book your free survey',
                'sc-c1-h':  'Total Protection',
                'sc-c1-p':  'Your home is always alert and automatically protects what truly matters, day and night.',
                'sc-c2-h':  'Carefree Departure',
                'sc-c2-p':  'On holiday or away, everything keeps running while your home takes care of itself.',
                'sc-c3-h':  'Perfect Awakening',
                'sc-c3-p':  'Light, blinds and atmosphere synchronise to ease you into a gentle, natural awakening.',
                'sc-c4-h':  'Time for Two',
                'sc-c4-p':  'With a single gesture, your home creates an intimate and refined atmosphere for special moments.',
                'sc-c5-h':  'Cinema Experience',
                'sc-c5-p':  'One phrase is all it takes to turn your living room into a private cinema, ready to enjoy.',
                'sc-c6-h':  'Guest Mode',
                'sc-c6-p':  'Friends and family feel instantly at home, without having to think about technology.',
                'sc-c7-h':  'Family Moments',
                'sc-c7-p':  'Comfort, relaxation and the perfect atmosphere for sharing precious time with those you love.',
                'sc-c8-h':  'Welcome Back',
                'sc-c8-p':  'Your home gets ready to greet you and ensures you find the atmosphere you love from the first moment.',
                'sc-c9-h':  'Weather Control',
                'sc-c9-p':  'Rain, wind and storms are managed automatically to protect your home.',
                'sc-c10-h': 'Temporary Access',
                'sc-c10-p': 'Grant limited access to technicians and staff while always maintaining full control.',
                /* ── Consult / Why / CTA ── */
                /* ── How it works ── */
                'how-eyebrow':  'The process',
                'how-h2':       'How it works',
                'how-1-title':  'Free consultation',
                'how-1-desc':   'We analyse your home. Zero commitment.',
                'how-2-title':  'Design',
                'how-2-desc':   'See everything before we start.',
                'how-3-title':  'Installation',
                'how-3-desc':   'We do everything.',
                'how-4-title':  'Support',
                'how-4-desc':   'We\'re always with you, even after.',
                'prob-1': 'You wake up in a cold house and have to manually adjust thermostats and blinds.',
                'prob-2': 'Constant doubts: «Did I turn everything off? The lights? The iron?». Anxiety from forgetfulness.',
                'prob-3': 'You return home in the dark, to an unclimatised space. Every device must be managed one by one.',
                'prob-4': 'A leaking pipe or intruder is discovered only on your return. Maximum damage.',
                'prob-solution': 'With SFERA you have one system that does everything for you',
                'prob-cta':  'See how it works →',
                'prob-cta2': 'Find the right system for you →',
                'sol-1': 'The home «wakes up» with you: ideal temperature and natural light scenes already active.',
                'sol-2': 'Scene «I\'m leaving»: with one tap (or automatically) every waste is switched off and protection activated.',
                'sol-3': 'Personalised welcome: soft lights, perfect climate and your favourite playlist already playing.',
                'sol-4': 'Immediate detection: SFERA shuts off the water autonomously and alerts you instantly.',
                'nav-s-comfort-plain': 'Comfort Smart',
                'cta-btn':       'Book your free<br>SITE SURVEY NOW',
                'why-eyebrow':   'Excellence at home',
                'why-h2':        'Why choose SFERA Smart Systems?',
                'why1-h4':       'Native Integration',
                'why1-p':        'Devices from different systems communicate within a single, reliable ecosystem.',
                'why2-h4':       'Tailored solution',
                'why2-p':        'We design everything around your home and your habits.',
                'why3-h4':       'Support included',
                'why3-p':        'We support you even after installation.<br>Remote monitoring and technical assistance always by your side.',
                'why4-h4':       'Easy to use',
                'why4-p':        'Control everything from your phone — simple and intuitive.',
                /* ── Footer ── */
                'footer-tagline': 'Smart solutions for a more comfortable, secure and efficient home.',
                'ft-sistemi':     'Systems',
                'ft-soluzioni':   'Solutions',
                'ft-azienda':     'Company',
                'ft-contatti':    'Contact',
                'ft-a1':          'Who we are',
                'ft-a2':          'Our mission',
                'ft-aziende':     'For Businesses',
                'ft-collaborazione': 'Collaboration',
                'ft-preventivo':  'Quote for Businesses',
                'ft-smart-home':  'B2B Solutions',
                'ft-carriere':    'Careers',
                'ft-lavora':      'Work with Us',
                'ft-posizioni':   'Open Positions',
                'ft-i-partner':   'For Partners',
                'ft-diventa':     'Become a Partner',
                'ft-programma':   'Partner Programme',
                'ft-centro':      'Media Centre',
                'ft-city':        'Bolzano, Italy',
                'footer-copy':    '© 2026 SFERA Smart Systems · All rights reserved',
                'footer-slogan':  'Comfort • Intelligence • Sfera',
                'search-ph':      'Search for terms or services...',
                /* ── Aria / title attributes ── */
                'aria-scroll-top':  'Back to top',
                'aria-lang-btn':    'Select language',
                'aria-menu':        'Menu',
                'btn-close':        'Close',
                'title-instagram':  'Follow us on Instagram',
                'title-youtube':    'Watch our videos on YouTube',
                /* ── Sticky CTA ── */
                'sticky-cta-text': 'Questions? Book a free consultation',
                'sticky-cta-btn':  'Free consultation →',
                /* ── Cookie ── */
                'cookie-text':    'We use cookies to improve your browsing experience. By continuing you accept our <a href="/privacy-policy.html">Privacy Policy</a>.',
                'cookie-accept':  'Accept all',
                'cookie-decline': 'Essential only',
                /* ── Exit popup ── */
                'exit-h3':  'Before you go…',
                'exit-p':   'Found the right solution for your home? One of our experts will reply within a few hours — for free.',
                'exit-cta': 'Request free consultation →',
                /* ── Case Studies ── */
                'cs-eyebrow':'Completed projects','cs-h2':'Case studies',
                'cs-tag-full':'Full Smart','cs-tag-comfort':'Comfort Smart','cs-tag-energy':'Energy Smart',
                'cs-1-title':'Private villa, Bolzano','cs-1-meta':'180 m² · 6 rooms · Renovation','cs-1-result':'Lights, climate, security + integrated 3D control',
                'cs-2-title':'Apartment, Laives','cs-2-meta':'110 m² · 4 rooms · Renovation','cs-2-result':'Comfort Smart · Climate, lights and automatic scenes','cs-2-video-btn':'Watch video',
                'cs-3-title':'Penthouse, Trento','cs-3-meta':'120 m² · 4 rooms · Renovation','cs-3-result':'Energy saving −40% + remote control',
                'cs-quiz-cta':'Find the right system for you →',
                /* ── FAQ ── */
                'faq-eyebrow':'Frequently asked questions','faq-h2':'Questions? We have answers.',
                'faq-1-q':'How much does a SFERA system cost?','faq-1-a':'Costs vary depending on the size and system chosen. We offer solutions from entry-level Starter Smart to full Full Smart systems. The initial consultation is always free and no-commitment.',
                'faq-2-q':'Can I install it in an existing house?','faq-2-a':'Yes. 70% of our projects involve existing homes. We use wireless technologies and minimally invasive solutions — no demolition required.',
                'faq-3-q':'Does it work without internet?','faq-3-a':'Yes. Local functions — lights, climate, scenes — always work offline. Internet is only needed for remote control via smartphone.',
                'faq-4-q':'How long does installation take?','faq-4-a':'A standard apartment takes 1–3 working days. Larger projects are planned in detail during the 3D design phase, so you know exactly when it ends.',
                'faq-5-q':'Is it compatible with Alexa, Google and Apple HomeKit?','faq-5-a':'Yes. Our systems integrate with Alexa, Google Assistant and Apple HomeKit. One ecosystem, control from anywhere.',
                'faq-6-q':'What happens after installation?','faq-6-a':'We offer ongoing support, remote updates and priority assistance. We stay by your side forever.',
                /* ── Quiz ── */
                'quiz-step':'Step 1 of 3','quiz-step2':'Step 2 of 3','quiz-step3':'Step 3 of 3',
                'quiz-1-q':'How many rooms do you want to automate?','quiz-1-a1':'1–2 rooms','quiz-1-a2':'3–4 rooms','quiz-1-a3':'5 or more rooms',
                'quiz-2-q':'What interests you most?','quiz-2-a1':'Just lights and plugs','quiz-2-a2':'Climate + automatic scenes','quiz-2-a3':'Security and access','quiz-2-a4':'Everything integrated',
                'quiz-3-q':'When are you thinking of starting?','quiz-3-a1':'Right away, I\'m already planning','quiz-3-a2':'Within 3–6 months','quiz-3-a3':'Still evaluating',
                'quiz-result-eyebrow':'Your ideal system','quiz-result-label':'We recommend',
                'quiz-cta-btn':'Book free consultation →','quiz-note':'No commitment. Just clear ideas.',
                /* ── Nav dots ── */
                'nd-home': 'Home', 'nd-comparison': 'Before & After', 'nd-scenari': 'Scenarios',
                'nd-how': 'How it works', 'nd-why': 'Why SFERA', 'nd-progetti': 'Projects', 'nd-faq': 'FAQ',
                /* ── Carousel arrows ── */
                'sc3d-prev': 'Previous', 'sc3d-next': 'Next',
            }
        };

        function setLang(lang) {
            if (!translations[lang]) return;
            const t = translations[lang];
            document.querySelectorAll('[data-i18n]').forEach(el => {
                if (t[el.dataset.i18n] !== undefined) el.textContent = t[el.dataset.i18n];
            });
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                if (t[el.dataset.i18nHtml] !== undefined) el.innerHTML = t[el.dataset.i18nHtml];
            });
            const input = document.querySelector('input[type="text"]');
            if (input && t['search-ph']) input.placeholder = t['search-ph'];

            // Update globe button current code
            const codeEl = document.getElementById('lang-current-code');
            if (codeEl) codeEl.textContent = langCodes[lang] || lang.toUpperCase();

            // Update active state in globe dropdown
            document.querySelectorAll('.lang-option').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });

            // Update active state in mobile panel
            document.querySelectorAll('.mob-lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });

            document.documentElement.lang = lang;
            localStorage.setItem('sfera-lang', lang);

            // Update aria-label and title attributes
            const _a = (id, key) => { const el = document.getElementById(id); if (el && t[key]) el.setAttribute('aria-label', t[key]); };
            _a('scrollTop',       'aria-scroll-top');
            _a('lang-globe-btn',  'aria-lang-btn');
            _a('mobile-menu-btn', 'aria-menu');
            _a('sol-close-btn',   'btn-close');
            _a('quiz-close',      'btn-close');
            // Update nav dot tooltips
            document.querySelectorAll('[data-i18n-dot]').forEach(function(el) {
                var key = el.getAttribute('data-i18n-dot');
                if (t[key]) el.setAttribute('data-label', t[key]);
            });
            // Update carousel arrow labels
            var prevBtn = document.getElementById('sc3d-prev');
            var nextBtn = document.getElementById('sc3d-next');
            if (prevBtn && t['sc3d-prev']) prevBtn.setAttribute('aria-label', t['sc3d-prev']);
            if (nextBtn && t['sc3d-next']) nextBtn.setAttribute('aria-label', t['sc3d-next']);

            const igLink = document.querySelector('a[aria-label^="Instagram"]');
            if (igLink && t['title-instagram']) igLink.setAttribute('title', t['title-instagram']);
            const ytLink = document.querySelector('a[aria-label^="YouTube"]');
            if (ytLink && t['title-youtube']) ytLink.setAttribute('title', t['title-youtube']);

            // Refresh open solution/about popup text
            if (currentSolKey && document.getElementById('sol-overlay').classList.contains('open')) {
                _renderSolContent(currentSolKey, lang);
            }
        }

        // #12: Auto-update copyright year in all translations
        (function() {
            var yr = new Date().getFullYear();
            ['it','de','en'].forEach(function(l) {
                if (translations[l] && translations[l]['footer-copy']) {
                    translations[l]['footer-copy'] = translations[l]['footer-copy'].replace(/\d{4}/, yr);
                }
            });
        })();

        /* ── Cookie consent ── */
        (function() {
            var consent = localStorage.getItem('sfera-cookie');
            if (!consent) {
                setTimeout(function() {
                    document.getElementById('cookie-banner').classList.add('show');
                }, 1200);
            }
        })();
        function dismissCookie(accepted) {
            localStorage.setItem('sfera-cookie', accepted ? 'all' : 'essential');
            var b = document.getElementById('cookie-banner');
            b.classList.remove('show');
            // if sticky bar is already hidden by cookie (same bottom slot), show it after cookie closes
            if (!localStorage.getItem('sfera-sticky-dismissed')) {
                setTimeout(function(){ checkStickyVisible(); }, 500);
            }
        }

        /* ── Sticky CTA bar ── */
        var stickyClosed = !!localStorage.getItem('sfera-sticky-dismissed');
        function checkStickyVisible() {
            if (stickyClosed) return;
            var cookieVisible = document.getElementById('cookie-banner').classList.contains('show');
            if (cookieVisible) return;
            var scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            var bar = document.getElementById('sticky-cta');
            if (scrolled > 0.45) {
                bar.classList.add('visible');
            } else {
                bar.classList.remove('visible');
            }
            document.body.classList.toggle('wa-above-sticky', !stickyClosed && bar.classList.contains('visible'));
        }
        document.getElementById('sticky-cta-close').addEventListener('click', function() {
            stickyClosed = true;
            localStorage.setItem('sfera-sticky-dismissed', '1');
            document.body.classList.remove('wa-above-sticky');
        });
        /* ── Exit-intent popup ── */
        var exitFired = sessionStorage.getItem('sfera-exit-fired');
        function closeExit() {
            document.getElementById('exit-overlay').classList.remove('open');
            document.body.style.overflow = '';
            _syncOverlayState();
        }
        if (!exitFired) {
            document.addEventListener('mouseleave', function onExitIntent(e) {
                if (e.clientY > 20) return; // only top edge
                sessionStorage.setItem('sfera-exit-fired', '1');
                document.removeEventListener('mouseleave', onExitIntent);
                setTimeout(function() {
                    // don't show if contatti or sol modal already open
                    if (document.getElementById('contatti-overlay').classList.contains('open')) return;
                    if (document.getElementById('sol-overlay').classList.contains('open')) return;
                    document.getElementById('exit-overlay').classList.add('open');
                    document.body.style.overflow = 'hidden';
                    _syncOverlayState();
                }, 300);
            });
        }

        /* ── Scroll progress bar + circular scroll-to-top ── */
        var progressBar = document.getElementById('scroll-progress');
        var progressCircle = document.getElementById('progress-ring-circle');
        var circumference = 2 * Math.PI * 18; // r=18
        function updateScrollProgress() {
            var scrolled = window.scrollY;
            var total = document.body.scrollHeight - window.innerHeight;
            var pct = total > 0 ? scrolled / total : 0;
            progressBar.style.width = (pct * 100) + '%';
            if (progressCircle) {
                progressCircle.style.strokeDashoffset = circumference * (1 - pct);
            }
        }
        /* ── Cursor spotlight ── */
        var cursorGlow = document.getElementById('cursor-glow');
        document.addEventListener('mousemove', function(e) {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top  = e.clientY + 'px';
        });
        document.addEventListener('mouseleave', function() { cursorGlow.style.opacity = '0'; });

        /* ── FAQ accordion ── */
        function toggleFaq(btn) {
            var isOpen = btn.getAttribute('aria-expanded') === 'true';
            // close all
            document.querySelectorAll('.faq-btn[aria-expanded="true"]').forEach(function(b) {
                b.setAttribute('aria-expanded','false');
                b.nextElementSibling.classList.remove('open');
            });
            if (!isOpen) {
                btn.setAttribute('aria-expanded','true');
                btn.nextElementSibling.classList.add('open');
            }
        }

        /* ── Quiz ── */
        var quizAnswers = [null, null, null];
        var quizStep = 0;
        function openQuiz() {
            quizAnswers = [null,null,null]; quizStep = 0;
            document.querySelectorAll('.quiz-step').forEach(function(s){ s.classList.remove('active'); });
            document.querySelectorAll('.quiz-dot').forEach(function(d,i){ d.classList.toggle('done', i===0); });
            document.getElementById('qs0').classList.add('active');
            document.getElementById('quiz-overlay').classList.add('open');
            document.body.style.overflow = 'hidden';
            _syncOverlayState();
        }
        function closeQuiz() {
            document.getElementById('quiz-overlay').classList.remove('open');
            document.body.style.overflow = '';
            _syncOverlayState();
        }
        function quizPick(step, val, btn) {
            quizAnswers[step] = val;
            btn.closest('.quiz-options').querySelectorAll('.quiz-opt').forEach(function(b){ b.classList.remove('selected'); });
            btn.classList.add('selected');
            setTimeout(function() {
                if (step < 2) {
                    document.getElementById('qs'+step).classList.remove('active');
                    document.getElementById('qs'+(step+1)).classList.add('active');
                    document.getElementById('qd'+(step+1)).classList.add('done');
                } else {
                    showQuizResult();
                }
            }, 340);
        }
        function showQuizResult() {
            var rooms = quizAnswers[0]; // 0=1-2, 1=3-4, 2=5+
            var interest = quizAnswers[1]; // 0=lights, 1=climate, 2=security, 3=all
            var lang = localStorage.getItem('sfera-lang') || 'it';
            var pkg, desc;
            if (interest === 2) {
                pkg = 'Security Smart';
                desc = { it:'Allarme, telecamere e controllo accessi integrati.', de:'Alarm, Kameras und integrierte Zugangskontrolle.', en:'Alarm, cameras and integrated access control.' };
            } else if (rooms === 2 || interest === 3) {
                pkg = 'Full Smart';
                desc = { it:'Casa completamente automatizzata: luci, clima, sicurezza e scenari 3D.', de:'Vollautomatisiertes Zuhause: Licht, Klima, Sicherheit und 3D-Szenarien.', en:'Fully automated home: lights, climate, security and 3D scenes.' };
            } else if (rooms === 0 && interest === 0) {
                pkg = 'Starter Smart';
                desc = { it:'Controllo base di luci e prese. Perfetto per iniziare.', de:'Grundsteuerung für Licht und Steckdosen. Perfekt zum Einstieg.', en:'Basic control of lights and plugs. Perfect for getting started.' };
            } else {
                pkg = 'Comfort Smart';
                desc = { it:'Luci, clima e scenari automatici per 3–4 ambienti.', de:'Licht, Klima und automatische Szenarien für 3–4 Räume.', en:'Lights, climate and automatic scenes for 3–4 rooms.' };
            }
            document.getElementById('quiz-pkg').textContent = pkg;
            document.getElementById('quiz-desc').textContent = desc[lang] || desc['it'];
            document.querySelectorAll('.quiz-step').forEach(function(s){ s.classList.remove('active'); });
            document.getElementById('qs-result').classList.add('active');
        }

        /* ── Active section nav indicator ── */
        var sectionMap = { 'section-soluzioni': 'soluzioni' };
        var navObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                var section = entry.target.id.replace('section-','');
                document.querySelectorAll('[data-nav-section="'+section+'"]').forEach(function(btn) {
                    btn.classList.toggle('active-section', entry.isIntersecting);
                });
            });
        }, { threshold: 0.3, rootMargin: '-80px 0px -20% 0px' });
        document.querySelectorAll('[id^="section-"]').forEach(function(el){ navObserver.observe(el); });

        setLang(localStorage.getItem('sfera-lang') || 'it');

        /* ══════════════════════════════════════════════════════
           ENHANCEMENT PACK JS — index_80
        ══════════════════════════════════════════════════════ */

        /* #3: Typewriter effect on hero badge */
        (function() {
            var el = document.getElementById('hero-badge-text');
            if (!el) return;
            var fullText = el.textContent.trim();
            el.textContent = '';
            el.style.borderRight = '2px solid #009DFF';
            var i = 0;
            function type() {
                if (i < fullText.length) {
                    el.textContent += fullText.charAt(i++);
                    setTimeout(type, 46);
                } else {
                    // blink cursor then remove
                    setTimeout(function() { el.style.borderRight = 'none'; }, 1000);
                }
            }
            // start after page load anim
            setTimeout(type, 600);
            // Re-run on lang change — just show full text instantly
            var origSetLang = setLang;
            setLang = function(lang) {
                origSetLang(lang);
                var badge = document.getElementById('hero-badge-text');
                if (badge) { badge.style.borderRight = 'none'; }
            };
        })();

        /* #5: Card 3D tilt on hover */
        (function() {
            var tiltCards = document.querySelectorAll('.sc-card, .cs-card, .pillar');
            tiltCards.forEach(function(card) {
                card.style.transition = 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s';
                card.addEventListener('mousemove', function(e) {
                    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                    var r = card.getBoundingClientRect();
                    var x = (e.clientX - r.left) / r.width  - 0.5;
                    var y = (e.clientY - r.top)  / r.height - 0.5;
                    card.style.transform = 'perspective(600px) rotateY(' + (x * 7) + 'deg) rotateX(' + (-y * 7) + 'deg) translateZ(4px)';
                });
                card.addEventListener('mouseleave', function() {
                    card.style.transform = '';
                });
            });
        })();

        /* #7: "37" odometer / slot-machine animation on scroll */
        (function() {
            var countEl = document.getElementById('sc-count');
            if (!countEl) return;
            var target = parseInt(countEl.getAttribute('data-target'), 10) || 37;
            var animated = false;
            var obs = new IntersectionObserver(function(entries) {
                if (entries[0].isIntersecting && !animated) {
                    animated = true;
                    var start = 0;
                    var duration = 1200;
                    var startTime = null;
                    function animate(ts) {
                        if (!startTime) startTime = ts;
                        var progress = Math.min((ts - startTime) / duration, 1);
                        var ease = 1 - Math.pow(1 - progress, 3);
                        countEl.textContent = Math.round(ease * target);
                        if (progress < 1) requestAnimationFrame(animate);
                        else countEl.textContent = target;
                    }
                    requestAnimationFrame(animate);
                }
            }, { threshold: 0.4 });
            obs.observe(countEl);
        })();

        /* #8: Ripple effect on .ripple-btn */
        document.addEventListener('click', function(e) {
            var btn = e.target.closest('.ripple-btn');
            if (!btn) return;
            var r = btn.getBoundingClientRect();
            var size = Math.max(r.width, r.height);
            var x = e.clientX - r.left - size / 2;
            var y = e.clientY - r.top  - size / 2;
            var ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = 'width:'+size+'px;height:'+size+'px;left:'+x+'px;top:'+y+'px;';
            btn.appendChild(ripple);
            setTimeout(function() { ripple.remove(); }, 600);
        });

        /* #9: Sliding nav underline — follow hovered nav button */
        (function() {
            var track = document.getElementById('nav-underline');
            var menu  = document.getElementById('main-menu');
            if (!track || !menu) return;
            menu.addEventListener('mouseenter', function(e) {
                var btn = e.target.closest('.nav-item-btn');
                if (!btn) return;
                var mr = menu.getBoundingClientRect();
                var br = btn.getBoundingClientRect();
                track.style.left  = (br.left  - mr.left) + 'px';
                track.style.width = br.width + 'px';
            }, true);
            menu.addEventListener('mouseleave', function() {
                track.style.width = '0';
            });
        })();

        /* #15: Click-to-copy phone number */
        function copyPhone(e) {
            var link = document.getElementById('phone-copy');
            if (!link) return;
            var text = link.getAttribute('data-copy') || link.textContent.trim();
            if (navigator.clipboard) {
                e.preventDefault();
                navigator.clipboard.writeText(text).then(function() { showCopyToast(); });
            }
            // else follow the href normally (wa.me)
        }
        function showCopyToast() {
            var toast = document.getElementById('copy-toast');
            if (!toast) return;
            toast.classList.add('show');
            setTimeout(function() { toast.classList.remove('show'); }, 2200);
        }

        /* #19: Animated icons in sol-modal — add CSS class on open */
        (function() {
            var origOpen = openSol;
            openSol = function(key) {
                origOpen(key);
                var wrap = document.getElementById('sol-icon');
                if (wrap) {
                    wrap.style.animation = 'none';
                    wrap.offsetHeight; // reflow
                    wrap.style.animation = '';
                }
                setTimeout(function() {
                    var first = document.querySelector('#sol-modal button, #sol-modal a[href]');
                    if (first) first.focus();
                }, 50);
            };
        })();

        /* ── Navigation dots — scroll-based, init after DOM ready ── */
        document.addEventListener('DOMContentLoaded', function() {
            var sectionIds = ['hero-section','section-comparison','section-scenari','section-how','section-why','section-progetti','section-faq'];
            function updateDots() {
                var dots = document.querySelectorAll('.nav-dot');
                if (!dots.length) return;
                var scrollY = window.scrollY || window.pageYOffset;
                var winH = window.innerHeight;
                var active = 0;
                for (var i = 0; i < sectionIds.length; i++) {
                    var el = document.getElementById(sectionIds[i]);
                    if (!el) continue;
                    if (el.getBoundingClientRect().top <= winH * 0.55) active = i;
                }
                dots.forEach(function(d, i) { d.classList.toggle('active', i === active); });
            }
            window.addEventListener('scroll', updateDots, { passive: true });
            updateDots();
        });

        /* ── Keyboard shortcut C → open contacts ── */
        document.addEventListener('keydown', function(e) {
            if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey && !e.metaKey && !e.altKey) {
                var tag = document.activeElement ? document.activeElement.tagName : '';
                if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
                    openContatti();
                }
            }
        });

    /* ── 3D Scenari Carousel ── */
    (function initSc3d() {
        var N = 10;
        var activeIdx = 0;

        /* [tx, tz, scale, opacity, rotY(deg)] per offset slot */
        var BASE = [
            [0,      0,    1.04, 1.00,   0],   /* active */
            [290,  -150,   0.84, 0.72, -20],   /* right-1 */
            [-290, -150,   0.84, 0.72,  20],   /* left-1 */
            [510,  -340,   0.65, 0.42, -36],   /* right-2 */
            [-510, -340,   0.65, 0.42,  36],   /* left-2 */
            [0,   -520,   0.42, 0.00, 180]    /* back */
        ];

        function bp() {
            var w = window.innerWidth;
            return w < 640 ? 0.55 : w < 1024 ? 0.75 : 1;
        }

        /* map circular offset (-2,-1,0,1,2, else back) → BASE row index */
        function slotOf(offset) {
            if (offset === 0)  return 0;
            if (offset === 1)  return 1;
            if (offset === -1) return 2;
            if (offset === 2)  return 3;
            if (offset === -2) return 4;
            return 5;
        }

        function update() {
            var m = bp();
            var cards = document.querySelectorAll('.sc3d-card');
            var dots  = document.querySelectorAll('.sc3d-dot-btn');
            for (var i = 0; i < cards.length; i++) {
                var raw = i - activeIdx;
                /* wrap to range -N/2 … N/2 */
                while (raw >  N / 2) raw -= N;
                while (raw < -N / 2) raw += N;
                var row = slotOf(raw);
                var d = BASE[row];
                var tx = d[0] * m, tz = d[1] * m, sc = d[2], op = d[3], ry = d[4];
                cards[i].style.transform =
                    'translateX(' + tx + 'px) translateZ(' + tz + 'px) rotateY(' + ry + 'deg) scale(' + sc + ')';
                cards[i].style.opacity   = op;
                cards[i].style.zIndex    = Math.round(op * 10);
                if (row === 0) {
                    cards[i].classList.add('sc3d-active');
                } else {
                    cards[i].classList.remove('sc3d-active');
                }
            }
            for (var j = 0; j < dots.length; j++) {
                if (j === activeIdx) dots[j].classList.add('active');
                else dots[j].classList.remove('active');
            }
        }

        function goTo(idx) {
            activeIdx = ((idx % N) + N) % N;
            update();
        }
        function next() { goTo(activeIdx + 1); }
        function prev() { goTo(activeIdx - 1); }

        function startAuto() { /* auto-rotate disabled */ }
        function stopAuto()  { /* auto-rotate disabled */ }

        function init() {
            var stage  = document.getElementById('sc3d-stage');
            var cards  = document.querySelectorAll('.sc3d-card');
            var dots   = document.querySelectorAll('.sc3d-dot-btn');
            if (!stage || !cards.length) return;

            /* click on non-active card → advance */
            for (var i = 0; i < cards.length; i++) {
                (function(idx) {
                    cards[idx].addEventListener('click', function() {
                        if (idx !== activeIdx) { goTo(idx); startAuto(); }
                    });
                })(i);
            }

            /* dot buttons — read data-sc-to for reliability */
            for (var j = 0; j < dots.length; j++) {
                dots[j].addEventListener('click', function() {
                    var to = parseInt(this.getAttribute('data-sc-to'), 10);
                    if (!isNaN(to)) goTo(to);
                });
            }

            /* arrow buttons */
            var btnPrev = document.getElementById('sc3d-prev');
            var btnNext = document.getElementById('sc3d-next');
            if (btnPrev) btnPrev.addEventListener('click', function() { prev(); startAuto(); });
            if (btnNext) btnNext.addEventListener('click', function() { next(); startAuto(); });

            /* pause on hover */
            stage.addEventListener('mouseenter', stopAuto);
            stage.addEventListener('mouseleave', startAuto);

            /* touch swipe */
            var touchStartX = 0;
            stage.addEventListener('touchstart', function(e) {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            stage.addEventListener('touchend', function(e) {
                var dx = e.changedTouches[0].clientX - touchStartX;
                if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); startAuto(); }
            }, { passive: true });

            /* mouse drag */
            var mouseStartX = 0, isDragging = false;
            stage.addEventListener('mousedown', function(e) {
                mouseStartX = e.clientX; isDragging = true; stopAuto();
            });
            document.addEventListener('mouseup', function(e) {
                if (!isDragging) return;
                isDragging = false;
                var dx = e.clientX - mouseStartX;
                if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
                startAuto();
            });

            /* keyboard (arrow keys when carousel is in view) */
            document.addEventListener('keydown', function(e) {
                var stage2 = document.getElementById('sc3d-stage');
                if (!stage2) return;
                var rect = stage2.getBoundingClientRect();
                var inView = rect.top < window.innerHeight && rect.bottom > 0;
                if (!inView) return;
                if (e.key === 'ArrowRight') { next(); startAuto(); }
                if (e.key === 'ArrowLeft')  { prev(); startAuto(); }
            });

            /* resize: recalculate positions */
            window.addEventListener('resize', update);

            update();
            startAuto();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    })();

