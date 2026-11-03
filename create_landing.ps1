$content = [System.IO.File]::ReadAllText("index.html", [System.Text.Encoding]::UTF8)
$parts = $content -split '<main id="main-content">'
$headAndNav = $parts[0] + '<main id="main-content">'
$parts2 = $parts[1] -split '</main>'
$footerAndScripts = '</main>' + $parts2[1]

$retargeting = @"

    <!-- 1. HERO SECTION (Retargeting) -->
    <section id="hero-section" class="flex flex-col lg:flex-row min-h-screen bg-[#0F172A]" style="position:relative;overflow:hidden;">
        <div class="hero-dot-grid"></div>
        <div class="hero-float-glow"></div>
        <canvas id="hero-canvas" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.6;"></canvas>

        <div id="hero-left" class="w-full lg:w-[52%] flex items-center px-6 sm:px-10 lg:pl-[6vw] lg:pr-8 py-12 lg:py-16 relative z-[2]">
            <div class="reveal active w-full" style="max-width:560px;">
                <div class="inline-block px-4 py-1 mb-4 border border-logoBlue/30 rounded-full bg-logoBlue/10" style="max-width:100%;">
                    <span id="hero-badge-text" class="text-logoBlue font-bold uppercase" style="font-size:10px;letter-spacing:0.06em;white-space:normal;">SFERA Smart Systems</span>
                </div>
                <h1 class="font-[800] leading-[1.22] text-white mb-2" style="font-family:'Poppins',sans-serif; font-size:clamp(1.4rem,4vw,2.7rem);text-wrap:balance;max-width:520px;">
                    La tua casa, evoluta. Invisibile. intelligente.
                </h1>
                <h2 class="font-[400] text-white" style="font-family:'Poppins',sans-serif; font-size:clamp(1.05rem,2.8vw,1.75rem); line-height:0.95; margin-bottom:80px; text-wrap:balance; max-width:520px;">
                    Senza opere murarie e senza sostituire il tuo impianto già esistente
                </h2>
                <p class="leading-[1.8] mb-5 max-w-[400px]" style="font-family:'Inter',sans-serif; font-size:clamp(13px,1.4vw,15px); color:rgba(255,255,255,0.72);">
                    Il passaggio definitivo a un sistema smart professionale. Nessun compromesso su stabilità, estetica e controllo.
                </p>
                <div id="hero-btns" class="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch mb-8">
                    <button onclick="openContatti()" class="btn-arrow cta-animated ripple-btn" style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;background:linear-gradient(135deg,#2EA7FF,#1C7DFF);color:#fff;border:none;border-radius:12px;padding:14px 32px;cursor:pointer;box-shadow:0 6px 24px rgba(0,157,255,0.35);transition:transform 0.22s,box-shadow 0.22s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 10px 36px rgba(0,157,255,0.55)'" onmouseout="this.style.transform='';this.style.boxShadow='0 6px 24px rgba(0,157,255,0.35)'">
                        Richiedi Consulenza Dedicata
                    </button>
                </div>
            </div>
        </div>

        <div id="hero-video-col" class="w-full h-[56vw] max-h-[320px] lg:flex-1 lg:max-h-none lg:h-auto relative overflow-hidden">
            <div class="absolute top-0 left-0 bottom-0 w-2/5 z-[1] pointer-events-none hidden lg:block" style="background:linear-gradient(to right,#0F172A 0%,rgba(15,23,42,0.7) 50%,transparent 100%);"></div>
            <div class="absolute bottom-0 left-0 right-0 h-1/3 z-[1] pointer-events-none lg:hidden" style="background:linear-gradient(to bottom,transparent 0%,#0F172A 100%);"></div>
            <video autoplay muted loop playsinline preload="metadata" aria-hidden="true" class="absolute inset-0 w-full h-full object-cover object-center">
                <source src="https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/IMG_9357.mp4" type="video/mp4">
            </video>
        </div>
    </section>

    <!-- Wave divider hero -> social proof -->
    <div class="wave-divider" aria-hidden="true" style="background:#0F172A;">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="#070C18"/>
        </svg>
    </div>

    <!-- 2. SOCIAL PROOF & AUTENTICITÀ -->
    <section id="social-proof" style="background:#070C18;border-bottom:1px solid rgba(255,255,255,0.05);padding:80px 0;">
        <div style="max-width:960px;margin:0 auto;padding:0 28px;">
            <div class="reveal" style="text-align:center;margin-bottom:56px;">
                <span style="font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#3AAEFF;display:block;margin-bottom:14px;">Sartorialità Locale</span>
                <h2 style="font-family:'Poppins',sans-serif;font-size:clamp(26px,4vw,40px);font-weight:900;color:#fff;line-height:1.2;margin:0 0 14px;">
                    Eccellenza tecnica a Bolzano e in tutto il Trentino-Alto Adige.
                </h2>
                <p style="font-family:'Inter',sans-serif;font-size:15px;color:rgba(255,255,255,0.38);max-width:500px;margin:0 auto;line-height:1.65;">
                    Ingegneria domotica d'avanguardia per le proprietà più esclusive del nostro territorio. Un'integrazione sartoriale e invisibile, dove l'affidabilità locale incontra i più alti standard tecnologici internazionali.
                </p>
            </div>
            <div class="reveal" style="border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);box-shadow:0 32px 100px rgba(0,0,0,0.5);">
                <img src="https://pub-a92582c773094eecb29c572fa1712b3d.r2.dev/Tirol%20casa.webp" alt="Progetto SFERA a Bolzano" style="width:100%;height:auto;object-fit:cover;max-height:400px;">
            </div>
        </div>
    </section>

    <!-- 3. VALORE DIFFERENZIALE (The SFERA Way) -->
    <section id="valore-differenziale" style="background:#0b1220;padding:100px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <div style="max-width:980px;margin:0 auto;padding:0 28px;">
            <div class="reveal" style="text-align:center;margin-bottom:48px;">
                <span style="font-family:'Inter',sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#C6A75E;display:block;margin-bottom:14px;">The SFERA Way</span>
                <h2 style="font-family:'Poppins',sans-serif;font-size:clamp(26px,4vw,38px);font-weight:900;color:#fff;line-height:1.15;margin:0 0 14px;">
                    Perché siamo la scelta definitiva.
                </h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Card 1 -->
                <div class="cs-card reveal" style="background:rgba(255,255,255,0.02);padding:24px;border:1px solid rgba(255,255,255,0.06);border-radius:18px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(58,174,255,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                        <span style="font-size:20px;">🛡️</span>
                    </div>
                    <h3 class="cs-title">Stabilità Assoluta</h3>
                    <p class="cs-meta">Sistemi professionali wired e wireless altamente affidabili. Nessuna dipendenza dal cloud: la tua casa funziona sempre, anche offline.</p>
                </div>
                <!-- Card 2 -->
                <div class="cs-card reveal" style="background:rgba(255,255,255,0.02);padding:24px;border:1px solid rgba(255,255,255,0.06);border-radius:18px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(198,167,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                        <span style="font-size:20px;">✨</span>
                    </div>
                    <h3 class="cs-title">Estetica Invisibile</h3>
                    <p class="cs-meta">La tecnologia non deve rovinare il design. Nascondiamo i sensori e riduciamo l'ingombro visivo. Solo pulsantiere di lusso o controlli invisibili.</p>
                </div>
                <!-- Card 3 -->
                <div class="cs-card reveal" style="background:rgba(255,255,255,0.02);padding:24px;border:1px solid rgba(255,255,255,0.06);border-radius:18px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(58,174,255,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                        <span style="font-size:20px;">🎛️</span>
                    </div>
                    <h3 class="cs-title">Controllo Totale</h3>
                    <p class="cs-meta">Un'unica interfaccia per luci, clima, allarme e automazioni. Nessuna frammentazione. Un'esperienza fluida, potente e su misura per te.</p>
                </div>
                <!-- Card 4 -->
                <div class="cs-card reveal" style="background:rgba(255,255,255,0.02);padding:24px;border:1px solid rgba(255,255,255,0.06);border-radius:18px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(198,167,94,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                        <span style="font-size:20px;">🧩</span>
                    </div>
                    <h3 class="cs-title">Integrazione Nativa</h3>
                    <p class="cs-meta">Dispositivi provenienti da sistemi diversi comunicano in un unico ecosistema affidabile.</p>
                </div>
                <!-- Card 5 -->
                <div class="cs-card reveal" style="background:rgba(255,255,255,0.02);padding:24px;border:1px solid rgba(255,255,255,0.06);border-radius:18px;">
                    <div style="width:40px;height:40px;border-radius:10px;background:rgba(58,174,255,0.1);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">
                        <span style="font-size:20px;">🤝</span>
                    </div>
                    <h3 class="cs-title">Assistenza Inclusa</h3>
                    <p class="cs-meta">Ti supportiamo anche dopo l'installazione. Monitoraggio remoto e assistenza tecnica sempre al tuo fianco.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. SEZIONE FAQ (Friction Killer) -->
    <section id="faq-retargeting" style="background:#070C18;padding:100px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
        <div style="max-width:800px;margin:0 auto;padding:0 28px;">
            <div class="reveal" style="text-align:center;margin-bottom:48px;">
                <h2 style="font-family:'Poppins',sans-serif;font-size:clamp(26px,4vw,36px);font-weight:900;color:#fff;line-height:1.2;margin:0 0 14px;">
                    Sfatiamo i falsi miti!
                </h2>
                <p style="font-family:'Inter',sans-serif;font-size:15px;color:rgba(255,255,255,0.4);">Risposte chiare alle domande più frequenti.</p>
            </div>
            <div class="reveal" style="border-top:1px solid rgba(255,255,255,0.07);">
                <!-- FAQ 1 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Cosa succede se salta internet?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>Il sistema SFERA elabora tutto in locale. Se manca internet, interruttori, clima e scenari continuano a funzionare perfettamente. Internet serve solo per controllare la casa da fuori tramite l'app.</p>
                    </div>
                </div>
                <!-- FAQ 2 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">È compatibile con la mia casa attuale?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>Sì, nel 90% dei casi non servono grandi opere murarie. Utilizziamo micro-moduli che si inseriscono nelle scatole elettriche esistenti, mantenendo intatti i tuoi muri e le tue placchette preferite.</p>
                    </div>
                </div>
                <!-- FAQ 3 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Quanto durano i lavori?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>L'installazione di base richiede da 1 a 3 giorni, lavorando in modo pulito e rispettando i tuoi spazi. Ti consegniamo il sistema "chiavi in mano", già configurato e pronto all'uso.</p>
                    </div>
                </div>
                <!-- FAQ 4 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">E se va via la corrente o salta il Wi-Fi? Rimango chiuso in casa o al buio?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>Questa è la paura più comune, causata dai gadget "fai-da-te". Un impianto domotico professionale progettato da SFERA non dipende dal Wi-Fi di casa, ma ha una sua infrastruttura di comunicazione indipendente e sicura. In caso di blackout, l'impianto possiede sblocchi manuali e sistemi di backup: la tua casa continuerà a funzionare esattamente come una casa tradizionale. Non rimarrai mai bloccato.</p>
                    </div>
                </div>
                <!-- FAQ 5 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Non voglio vivere con il telefono in mano per accendere una luce. È così?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>Assolutamente no. Se devi prendere lo smartphone per spegnere una luce, la tua casa non è intelligente, è solo più complicata di prima. Il nostro obiettivo è farti dimenticare il telefono, il telecomando e, in alcuni casi, anche gli interruttori. Utilizziamo interruttori fisici di altissimo design e sensori invisibili. La casa agisce in autonomia per le azioni ripetitive (clima, sicurezza, luci di passaggio), lasciandoti il piacere del controllo manuale con un semplice tocco a parete quando lo desideri.</p>
                    </div>
                </div>
                <!-- FAQ 6 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Voglio mantenere il controllo. Non voglio elettrodomestici che fanno di testa loro.</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>La vera tecnologia si adatta a te, non viceversa. I sistemi SFERA non includono "frigoriferi parlanti" o dispositivi invadenti. Progettiamo automazioni silenziose che ti tolgono il carico mentale (come abbassare tutte le tapparelle e inserire l'allarme con un solo tasto "Buonanotte"), ma ogni singola azione può essere sempre controllata, fermata o modificata da te in qualsiasi istante. Sei tu il regista.</p>
                    </div>
                </div>
                <!-- FAQ 7 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Amo lo stile classico e antico. La tecnologia rovinerà l'estetica della mia casa?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>Il lusso moderno è invisibile. L'idea che una casa tecnologica debba sembrare una navicella spaziale asettica è un falso mito. I nostri sistemi scompaiono dietro i muri. Che tu abbia un appartamento ultramoderno o un casale d'epoca con travi a vista, l'impianto non si nota. Scegliamo placche e comandi che si integrano perfettamente con il tuo interior design, rispettando l'anima e il calore della tua casa.</p>
                    </div>
                </div>
                <!-- FAQ 8 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Ho già un sistema domotico, devo rifare l'impianto da zero se passo a SFERA?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>No. Valorizziamo ciò che hai già, integrandolo ed evolvendolo. Il sistema SFERA nasce per far dialogare standard e protocolli differenti in modo fluido. Questo non solo preserva i tuoi investimenti attuali senza inutili sprechi, ma ti garantisce una compatibilità totale nel tempo. Potrai ampliare e aggiornare la tua smart home, mantenendo intatte le fondamenta del tuo ecosistema attuale.</p>
                    </div>
                </div>
                <!-- FAQ 9 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Ho paura per la mia privacy. I miei dati vengono registrati o ascoltati nel cloud?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>Assolutamente NO! La privacy è una priorità assoluta. A differenza dei dispositivi commerciali, i sistemi di integrazione di alto livello processano le informazioni localmente. Anche nel caso di telecamere interne, se non ti senti sicuro, le telecamere si chiudono fisicamente per non invadere la tua privacy. Il server "cervello" della tua casa è fisicamente chiuso dentro le tue mura. Quello che succede in casa tua, rimane nei server di casa tua.</p>
                    </div>
                </div>
                <!-- FAQ 10 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Rendere la casa 'smart' significa dover spaccare i muri e affrontare cantieri infiniti?</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>No, possiamo creare tutto l'ecosistema in modo wireless e senza alcuna opera muraria.</p>
                    </div>
                </div>
                <!-- FAQ 11 -->
                <div class="faq-item">
                    <button class="faq-btn" onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'); this.nextElementSibling.classList.toggle('open');" aria-expanded="false">
                        <span class="faq-q">Non è una spesa inutile? In fondo spegnere una luce non mi costa nessuna fatica.</span>
                        <span class="faq-icon">+</span>
                    </button>
                    <div class="faq-body">
                        <p>Hai ragione: se vuoi usare SFERA solo per spegnere una luce, non hai bisogno di un impianto intelligente. Perché il valore è il comfort mentale di non dover controllare 15 finestre prima di uscire. È il risparmio energetico costante di un riscaldamento che non spreca mai calore. È la sicurezza di una casa che simula la tua presenza quando sei in vacanza o previene il danno se c'è una perdita d'acqua (cosa che ti sarebbe altrimenti impossibile rilevare in tempo prima di un allagamento 😉). È un investimento che aumenta il valore del tuo immobile e protegge la tua serenità.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. SEZIONE LEAD CAPTURE / CTA FINALE -->
    <section id="lead-capture" style="background:linear-gradient(180deg, #070C18 0%, #0f172a 100%);padding:100px 0;">
        <div style="max-width:600px;margin:0 auto;padding:0 28px;">
            <div class="reveal" style="background:rgba(255,255,255,0.02);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:48px 40px;text-align:center;box-shadow:0 32px 80px rgba(0,0,0,0.4);">
                <h2 style="font-family:'Poppins',sans-serif;font-size:28px;font-weight:800;color:#fff;margin:0 0 16px;">
                    Pronto a fare il salto di qualità?
                </h2>
                <p style="font-family:'Inter',sans-serif;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.6;margin:0 0 32px;">
                    Prenota ora una consulenza tecnica gratuita e senza impegno. Analizzeremo la tua abitazione e creeremo un progetto su misura per te.
                </p>
                <button onclick="openContatti()" class="btn-arrow cta-animated ripple-btn" style="width:100%;font-family:'Poppins',sans-serif;font-size:16px;font-weight:700;background:linear-gradient(135deg,#2EA7FF,#1C7DFF);color:#fff;border:none;border-radius:12px;padding:16px 32px;cursor:pointer;box-shadow:0 6px 24px rgba(0,157,255,0.35);transition:transform 0.22s,box-shadow 0.22s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 10px 36px rgba(0,157,255,0.55)'" onmouseout="this.style.transform='';this.style.boxShadow='0 6px 24px rgba(0,157,255,0.35)'">
                    Contattaci Ora
                </button>
            </div>
        </div>
    </section>

"@

$finalContent = $headAndNav + $retargeting + $footerAndScripts
[System.IO.File]::WriteAllText("landing_page.html", $finalContent, [System.Text.Encoding]::UTF8)
Write-Output "Successfully created landing_page.html"
