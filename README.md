# TuxLab 🐧

Interaktywna aplikacja do nauki komend Linux, Kali i Purple Team, w całości po polsku.
Działa lokalnie w przeglądarce, bez żadnego backendu — cały postęp zapisywany jest
w `localStorage` Twojej przeglądarki.

## Jak uruchomić lokalnie (do testów)

Aplikacja musi być serwowana przez HTTP (nie `file://`), żeby Service Worker (offline)
oraz Content-Security-Policy działały poprawnie. Najprościej:

```bash
cd root-app       # katalog z tym README
python3 -m http.server 8080
```

Potem wejdź w przeglądarce na `http://localhost:8080`.

Node.js (alternatywnie):
```bash
npx serve .
```

## Jak zainstalować jako prawdziwe PWA (na telefonie/laptopie)

Instalacja PWA (ikona na pulpicie, tryb offline, pełny ekran) wymaga hostingu po **HTTPS**
(`localhost` też działa do testów, ale nie na telefonie w sieci domowej).
Najszybsze darmowe opcje:

- **GitHub Pages** — wrzuć zawartość tego folderu do repozytorium i włącz Pages w ustawieniach.
- **Netlify / Vercel** — przeciągnij i upuść cały folder na netlify.com/drop.
- **Cloudflare Pages** — podobnie, deploy przez przeciągnięcie folderu.

Po wejściu na wdrożony adres przeglądarka (Chrome/Edge/Android) pokaże na górze ekranu
baner „Zainstaluj TuxLab jako aplikację” z przyciskiem instalacji. Na iOS Safari (który
nie wspiera automatycznego banera) aplikacja pokaże własną podpowiedź: „Udostępnij →
Dodaj do ekranu początkowego”.

## Design

Estetyka celowo unika typowego „neon hacker template" (cyan/fiolet wszędzie, emoji jako
ikony). Zamiast tego:

- **Ograniczona paleta** — zielony (git-diff/systemd) jako kolor funkcjonalny (postęp,
  sukces, linki), czerwony dla błędów, **fiolet zarezerwowany wyłącznie dla testów
  końcowych i sekwencji startowej** — rzadkość koloru = jego ranga.
- **Ścieżka kategorii zamiast listy kart** — kategorie ułożone jako węzły na przemian
  lewo/prawo wzdłuż pionowej osi (`.chain-wrap`), z pierścieniem postępu przy każdym
  węźle. Kolejność kategorii odzwierciedla realną sekwencję pracy pentestera
  (rekonesans → enumeracja → eksploatacja → pivoting → hardening).
- **Mono-glify zamiast emoji** — ikony kategorii to bracketowe symbole (`[#]`, `[?]`,
  `[||]`), spójne z estetyką terminala.
- **Log systemowy zamiast dekoracji** — ekran wyniku testu, feedback w quizach i moment
  sukcesu (`successFlash`) używają formatu `[OK]`/`[FAIL]` w stylu `systemd`/`git diff`,
  zamiast emoji czy konfetti.
- **Sekwencja startowa** — przy pierwszym wejściu (`localStorage: tuxlab_boot_seen`)
  pokazuje się krótki, pomijalny log rozruchowy. Respektuje `prefers-reduced-motion`
  (wtedy pomijany całkowicie) i nie blokuje treści dla czytników ekranu
  (`aria-hidden`, focus nigdy nie jest w nim uwięziony).
- **Nazwy plików kategorii** — każda kategoria ma fikcyjne rozszerzenie pliku
  (`firewall.rules`, `ssh.key`, `threat-hunting.log`) jako dodatkowy akcent tematyczny.

## Zawartość (18 kategorii)

Oprócz pierwotnych 14 kategorii (fundamenty, uprawnienia, procesy, sieć, rekonesans,
enumeracja webowa, podatności, ruch sieciowy, eksploatacja, tunelowanie, threat hunting,
SSH, bash/automatyzacja, firewall) doszły:

- **Pliki i katalogi** — touch, mkdir, cp, mv, rm, rmdir
- **Narzędzia pomocnicze** — sort, wc, nl, clear, locate, whereis, date, help, finger
- **Pakiety (APT)** — apt update/upgrade/install/remove, apt-get, apt search
- **Struktura systemu plików** — /bin /boot /dev /etc /home /lib /opt /proc /root /sbin /tmp /usr /var

Do „Uprawnień” doszła notacja `drwxr-xr-x` (typ pliku, właściciel/grupa/inni, liczba
dowiązań) i typowe tryby liczbowe (777, 755, 644, 750, 000). Do „Sieci — podstawy” doszedł
`ifconfig`, a do „SSH” — uruchamianie/zatrzymywanie usługi (`systemctl start/stop ssh`).

## Struktura kategorii i testów

Każda kategoria ma: lekcję (opis PL + znaczenie EN + przykład), a następnie trzy testy,
z których każdy obejmuje **wszystkie** komendy z lekcji:

1. **Test ABCD** — wybierz poprawną komendę z 4 opcji.
2. **Wpisz komendę (z podpowiedzią)** — samodzielne wpisanie, z podpowiedzią widoczną od razu.
3. **Wpisz wszystko (bez podpowiedzi)** — samodzielne wpisanie z pamięci, bez podpowiedzi.

W testach 2 i 3: błędna odpowiedź pokazuje poprawne rozwiązanie i wymaga jej wpisania,
zanim można przejść dalej — ale do wyniku % liczy się tylko pierwsza próba (jak w teście ABCD).

Po zaliczeniu testu (≥70%) pojawia się przycisk „Przejdź dalej”, prowadzący automatycznie
do kolejnego testu w danej kategorii, a po ukończeniu wszystkich trzech — do lekcji
kolejnej kategorii.

Testy końcowe (2 testy mieszające pytania ze wszystkich kategorii) odblokowują się
dopiero po ukończeniu WSZYSTKICH 18 kategorii (lekcja + wszystkie 3 testy w każdej).

## Struktura projektu

```
index.html       — punkt wejścia, meta CSP, ładowanie skryptów
manifest.json     — manifest PWA (nazwa, ikony, kolory)
sw.js             — Service Worker (cache offline, tylko zasoby własne)
css/style.css     — cały styl wizualny (motyw terminal dark, WCAG AA)
js/data.js        — treść merytoryczna: 18 kategorii, lekcje, pytania
js/app.js         — logika aplikacji (routing, quizy, zapis postępu)
icons/            — ikony PWA 192x192 i 512x512
```

## Bezpieczeństwo (co zostało zastosowane)

- Zero zależności zewnętrznych, zero wywołań sieciowych — aplikacja nie łączy się
  z żadnym serwerem ani API, więc nie ma powierzchni ataku typu „przechwycone dane”.
- Ścisła polityka `Content-Security-Policy`: `script-src` ograniczony wyłącznie do `'self'`
  (zero inline skryptów, zero `eval`) — to jest właściwa ochrona przed XSS. `style-src`
  dopuszcza `'unsafe-inline'`, bo interfejs oblicza dynamicznie procenty (pierścień
  postępu kategorii, pasek postępu) — atrybuty `style` nie mogą wykonać kodu JS, więc to
  bezpieczny, standardowy kompromis. Zablokowane `object-src`, `frame-ancestors` itd.
- Wszystkie dane pochodzące od użytkownika (odpowiedzi w quizach) są wstawiane do DOM
  przez `textContent`/escapowanie HTML — nigdy przez `innerHTML` z surowym tekstem,
  co eliminuje ryzyko DOM-based XSS.
- Service Worker cache'uje wyłącznie zasoby z tej samej domeny (`same-origin`),
  nie proxuje żadnych zewnętrznych żądań.
- Brak `eval()` na danych pochodzących od użytkownika, brak dynamicznego ładowania kodu.

## Jak zresetować postęp

W aplikacji, na dole ekranu głównego: przycisk „Wyzeruj postęp (localStorage)”.
Ręcznie: w konsoli przeglądarki `localStorage.removeItem('tuxlab_progress_v2')`.

## Jak działa auto-generowanie pytań

Żeby każdy test obejmował WSZYSTKIE komendy z lekcji (nie tylko ręcznie napisany
podzbiór), `js/data.js` automatycznie dopełnia testy o brakujące pozycje na podstawie
pola `example` każdej komendy. Pytanie zawsze jawnie podaje "cel" (np. konkretną ścieżkę
czy host), jeśli wykracza on poza to, co opisuje pole `pl` — inaczej pytanie byłoby
nie do rozwiązania (np. "wylistuj katalog" bez podania, który katalog). Jeśli dodajesz
nową komendę z przykładem zawierającym konkretny argument (plik, host, port), upewnij
się, że pole `pl` albo sam auto-generator jasno komunikuje ten argument — w przeciwnym
razie dopisz pytanie ręcznie w `quiz1`/`quiz2` z pełnym kontekstem w treści.

## Rozszerzanie treści

Wszystkie pytania i lekcje są w jednym pliku `js/data.js`, w prostej strukturze
JS (bez builda, bez frameworka) — możesz dopisywać kolejne kategorie/pytania
kopiując istniejący wzorzec obiektu.
