/* ============================================================
   LINUX / KALI / PURPLE TEAM — baza wiedzy
   Struktura każdej kategorii:
   {
     id, title, subtitle, icon,
     lesson: [ { cmd, en, pl, desc, example } ],
     quiz1: [ { q, options:[4], correct:idx, exp } ],   // ABCD
     quiz2: [ { q, answers:[akceptowalne stringi], hint, exp } ] // wpisz komendę
   }
   ============================================================ */

const CATEGORIES = [
// ============================================================
{
  id: "fundamenty",
  title: "Fundamenty Linuksa",
  subtitle: "Nawigacja, pliki i praca z tekstem",
  icon: "[$]",
  lesson: [
    { cmd:"pwd", en:"print working directory", pl:"Wypisz bieżący katalog roboczy",
      desc:"Pokazuje pełną ścieżkę katalogu, w którym aktualnie się znajdujesz.",
      example:"pwd\n# /home/kali/projekty" },
    { cmd:"ls -la", en:"list", pl:"Wylistuj zawartość katalogu (wszystkie pliki, format długi)",
      desc:"-l = format długi (uprawnienia, właściciel, rozmiar, data), -a = pokaż też pliki ukryte (zaczynające się od kropki).",
      example:"ls -la /etc\n# drwxr-xr-x  2 root root 4096 sty 12 10:00 ." },
    { cmd:"cd", en:"change directory", pl:"Zmień katalog",
      desc:"Przechodzi do wskazanego katalogu. 'cd ..' przechodzi wyżej, 'cd ~' do katalogu domowego, 'cd -' do poprzedniego.",
      example:"cd /var/log" },
    { cmd:"cat", en:"concatenate", pl:"Wyświetl (połącz) zawartość pliku",
      desc:"Wypisuje całą zawartość pliku na standardowe wyjście. Dobre dla krótkich plików.",
      example:"cat /etc/os-release" },
    { cmd:"head -n 20", en:"head", pl:"Pokaż początek pliku",
      desc:"Domyślnie 10 pierwszych linii pliku, -n pozwala ustawić dowolną liczbę.",
      example:"head -n 20 access.log" },
    { cmd:"tail -f", en:"tail (follow)", pl:"Pokaż koniec pliku i śledź nowe wpisy na żywo",
      desc:"-f 'follow' — świetne do podglądania logów w czasie rzeczywistym, np. podczas testu.",
      example:"tail -f /var/log/auth.log" },
    { cmd:"grep -i", en:"global regular expression print", pl:"Szukaj wzorca w tekście (bez rozróżniania wielkości liter)",
      desc:"Filtruje linie pasujące do wzorca. -i ignoruje wielkość liter, -r przeszukuje rekurencyjnie, -v odwraca dopasowanie.",
      example:"grep -i \"failed password\" auth.log" },
    { cmd:"find . -name", en:"find", pl:"Znajdź pliki po nazwie/typie/dacie w drzewie katalogów",
      desc:"Bardzo elastyczne wyszukiwanie, np. find / -perm -4000 znajduje pliki SUID.",
      example:"find /var/www -name \"*.php\"" },
    { cmd:"man", en:"manual", pl:"Wyświetl podręcznik/dokumentację polecenia",
      desc:"Pierwsze miejsce, gdzie sprawdzasz flagi nieznanego polecenia.",
      example:"man nmap" },
    { cmd:"| (pipe)", en:"pipe", pl:"Potok — przekaż wyjście jednej komendy jako wejście drugiej (tu: policz w access.log linie z „POST”)",
      desc:"Pozwala łączyć proste narzędzia w potężne łańcuchy przetwarzania danych.",
      example:"cat access.log | grep \"POST\" | wc -l" }
  ],
  quiz1: [
    { q:"Która komenda wyświetli 15 ostatnich linii pliku log.txt i będzie na bieżąco pokazywać nowe wpisy?",
      options:["head -n 15 log.txt","tail -n 15 -f log.txt","cat -n 15 log.txt","less log.txt"], correct:1,
      exp:"tail -f śledzi plik na żywo, -n 15 ustawia liczbę linii startowych." },
    { q:"Jak wyświetlić WSZYSTKIE pliki w katalogu, łącznie z ukrytymi, w formacie długim?",
      options:["ls -h","ls -la","ls -R","dir /a"], correct:1, exp:"-l = format długi, -a = pokaż ukryte pliki." },
    { q:"Które polecenie znajdzie wszystkie pliki .conf w katalogu /etc i podkatalogach?",
      options:["grep -r *.conf /etc","find /etc -name \"*.conf\"","ls /etc/*.conf -r","cat /etc --name=conf"], correct:1,
      exp:"find przeszukuje drzewo katalogów wg wzorca nazwy." },
    { q:"Do czego służy operator | (pipe) w powłoce?",
      options:["Uruchamia polecenie w tle","Przekierowuje wyjście jednej komendy jako wejście kolejnej","Kończy proces","Tworzy komentarz w skrypcie"], correct:1,
      exp:"Pipe łączy strumień wyjścia (stdout) jednej komendy ze strumieniem wejścia (stdin) kolejnej." },
    { q:"Które polecenie pokaże bieżący katalog roboczy?",
      options:["whoami","pwd","cd","path"], correct:1, exp:"pwd = print working directory." },
    { q:"Jak wyszukać w pliku linie zawierające \"error\", ignorując wielkość liter?",
      options:["grep -v error plik","grep -i error plik","find -i error plik","cat error plik"], correct:1,
      exp:"grep -i ignoruje wielkość liter podczas wyszukiwania." },
    { q:"Gdzie sprawdzisz pełną dokumentację polecenia nmap w terminalu?",
      options:["nmap --docs","help nmap","man nmap","nmap /?"], correct:2, exp:"man wyświetla podręcznik systemowy danego polecenia." }
  ],
  quiz2: [
    { q:"Wpisz komendę, która wyświetli zawartość katalogu /etc w formacie długim wraz z ukrytymi plikami.",
      answers:["ls -la /etc","ls -al /etc","ls -a -l /etc","ls -l -a /etc"], hint:"Połącz flagi -l oraz -a.",
      exp:"ls -la /etc — -l format długi, -a pliki ukryte." },
    { q:"Wpisz komendę, która wyświetli 30 pierwszych linii pliku access.log.",
      answers:["head -n 30 access.log","head -30 access.log"], hint:"Użyj head z flagą -n.",
      exp:"head -n 30 access.log wypisuje pierwsze 30 linii." },
    { q:"Wpisz komendę, która wyszuka linii zawierających \"root\" w pliku /etc/passwd.",
      answers:["grep root /etc/passwd","grep \"root\" /etc/passwd"], hint:"grep <wzorzec> <plik>",
      exp:"grep root /etc/passwd wypisze pasujące linie." },
    { q:"Wpisz komendę, która rekurencyjnie znajdzie wszystkie pliki z rozszerzeniem .log w katalogu /var.",
      answers:["find /var -name \"*.log\"","find /var -name '*.log'","find /var -name *.log"], hint:"find <katalog> -name <wzorzec>",
      exp:"find domyślnie przeszukuje rekurencyjnie cały podany katalog." },
    { q:"Wpisz komendę, która pokaże bieżącą ścieżkę katalogu roboczego.",
      answers:["pwd"], hint:"Trzy litery, print working directory.",
      exp:"pwd wypisuje bieżącą ścieżkę." }
  ]
},
// ============================================================
 {
  id: "nawigacja",
  title: "Nawigacja w systemie Linux",
  subtitle: "Przemieszczanie się w drzewie katalogów i orientacja w systemie plików",
  icon: "[$]",
  lesson: [
    { cmd:"pwd", en:"print working directory", pl:"Wypisz bieżący katalog roboczy",
      desc:"Wypisuje pełną (bezwzględną) ścieżkę do katalogu, w którym aktualnie się znajdujesz. Kluczowe przy pracy ze skryptami i relatywnymi ścieżkami.",
      example:"pwd\n# /home/kali/projekty" },
    { cmd:"cd <ścieżka>", en:"change directory", pl:"Zmień katalog roboczy",
      desc:"Przenosi użytkownika do wskazanego katalogu. Przyjmuje ścieżki bezwzględne (zaczynające się od root '/') lub względne (względem obecnej pozycji).",
      example:"cd /var/log/nginx" },
    { cmd:"cd ..", en:"change directory to parent", pl:"Przejdź do katalogu nadrzędnego",
      desc:"Dwie kropki reprezentują katalog nadrzędny (rodzica). Umożliwia szybkie cofnięcie się o jeden poziom w górę w strukturze drzewa katalogów.",
      example:"cd ..\n# Przechodzi poziom wyżej" },
    { cmd:"cd ~", en:"change directory to home", pl:"Przejdź do katalogu domowego użytkownika",
      desc:"Tylda (~) to uniwersalny skrót oznaczający katalog domowy zalogowanego użytkownika (np. /home/kali). Samo wpisanie samej komendy 'cd' daje ten sam rezultat.",
      example:"cd ~\n# Przechodzi bezpośrednio do katalogu domowego" },
    { cmd:"cd -", en:"change directory to previous", pl:"Przejdź do poprzedniego katalogu",
      desc:"Przełącza bieżący katalog na ten, w którym znajdowałeś się przed chwilą. Niezwykle użyteczne przy naprzemiennym pracy w dwóch odległych lokacjach.",
      example:"cd -\n# Wracasz do ostatnio odwiedzonej ścieżki" }
  ],
  quiz1: [
    { q:"Które polecenie wyświetli pełną ścieżkę bezwzględną katalogu, w którym obecnie się znajdujesz?",
      options:["ls -la","pwd","cd ~","whoami"], correct:1,
      exp:"pwd oznacza print working directory i zwraca aktualną ścieżkę roboczą." },
    { q:"Jak przejść dokładnie o jeden poziom wyżej w hierarchii katalogów?",
      options:["cd ~","cd /","cd ..","cd -"], correct:2,
      exp:"cd .. wskazuje katalog nadrzędny (rodzica) w strukturze drzewa plików." },
    { q:"Do czego służy polecenie 'cd -'?",
      options:["Do przełączenia do katalogu domowego","Do usunięcia katalogu","Do powrotu do poprzedniego katalogu roboczego","Do przejścia do katalogu głównego (root)"], correct:2,
      exp:"cd - przełącza kontekst powłoki na poprzednią lokalizację, z której wykonano skok." },
    { q:"Co oznacza znak tildy (~) w poleceniu 'cd ~'?",
      options:["Katalog główny systemu (root /)","Katalog domowy bieżącego użytkownika","Katalog tymczasowy (/tmp)","Katalog nadrzędny"], correct:1,
      exp:"Tylda (~) jest skrótem systemowym wskazującym katalog domowy (home directory) aktualnego użytkownika." },
    { q:"Która komenda, wpisana samodzielnie bez argumentów w dowolnym miejscu systemu, również przeniesie Cię do katalogu domowego?",
      options:["pwd","cd","ls","back"], correct:1,
      exp:"Samo polecenie 'cd' bez parametrów domyślnie kieruje użytkownika do jego katalogu domowego." }
  ],
  quiz2: [
    { q:"Wpisz komendę, która wyświetli ścieżkę bieżącego katalogu roboczego.",
      answers:["pwd"], hint:"Trzy litery: print working directory.",
      exp:"pwd zwraca aktualną ścieżkę." },
    { q:"Wpisz komendę, która pozwoli Ci przejść o jeden poziom katalogów wyżej.",
      answers:["cd .."], hint:"Użyj cd oraz dwóch kropek.",
      exp:"cd .. przenosi do katalogu nadrzędnego." },
    { q:"Wpisz komendę, która natychmiast przeniesie Cię do Twojego katalogu domowego przy użyciu symbolu tyldy.",
      answers:["cd ~"], hint:"Użyj cd i symbolu ~.",
      exp:"cd ~ wskazuje katalog domowy." },
    { q:"Wpisz komendę, która przełączy Cię z powrotem do poprzednio odwiedzanego katalogu.",
      answers:["cd -"], hint:"Użyj cd i minusa.",
      exp:"cd - obsługuje pamięć ostatniej lokalizacji." },
    { q:"Wpisz komendę cd, która przeniesie Cię do absolutnej ścieżki /etc/apache2.",
      answers:["cd /etc/apache2"], hint:"cd <ścieżka_bezwzględna>",
      exp:"cd /etc/apache2 zmienia katalog na wskazaną ścieżkę bezwzględną." }
  ]
}
// ============================================================
   {
  "id": "listowanie_zawartosci",
  "title": "Listing i inspekcja zawartości",
  "subtitle": "Zaawansowane flagi polecenia ls, widok drzewa oraz nowoczesne alternatywy (eza, lsd)",
  "icon": "[$]",
  "lesson": [
    {
      "cmd": "ls",
      "en": "list directory contents",
      "pl": "Wylistuj zawartość katalogu",
      "desc": "Podstawowe polecenie wypisujące nazwy plików i katalogów w bieżącej lokalizacji w układzie jednokolumnowym lub tabelarycznym (zależnie od aliasów powłoki).",
      example: "ls\n# dokumenty  skrypty  pobrane"
    },
    {
      "cmd": "ls -l",
      "en": "long listing format",
      "pl": "Wylistuj w formacie długim",
      "desc": "Wyświetla szczegółowe metadane: typ pliku i uprawnienia (np. drwxr-xr-x), liczbę dowiązań twardych, właściciela, grupę, rozmiar w bajtach oraz datę i godzinę ostatniej modyfikacji.",
      "example": "ls -l\n# -rw-r--r-- 1 kali kali 220 sty 12 10:00 .bashrc"
    },
    {
      "cmd": "ls -a",
      "en": "all files (including hidden)",
      "pl": "Pokaż wszystkie pliki (w tym ukryte)",
      "desc": "Wyświetla również pliki i katalogi ukryte, których nazwy zaczynają się od kropki (np. .config, .bash_history), domyślnie pomijane przez system.",
      "example": "ls -a\n# .  ..  .bashrc  dokumenty"
    },
    {
      "cmd": "ls -h",
      "en": "human-readable sizes",
      "pl": "Czytelne rozmiary plików",
      "desc": "Modyfikator rozmiaru (używany zawsze z flagą -l), który konwertuje bajty na czytelne jednostki systemowe (K dla kilobajtów, M dla megabajtów, G dla gigabajtów).",
      "example": "ls -lh\n# -rw-r--r-- 1 kali kali 4.2M zaz 15 12:30 payload.bin"
    },
    {
      "cmd": "ls -lah",
      "en": "long, all, human-readable",
      "pl": "Format długi, pliki ukryte i czytelne rozmiary",
      "desc": "Kombinacja najczęściej stosowana przez administratorów i analityków bezpieczeństwa podczas szybkiej inspekcji katalogu roboczego.",
      "example": "ls -lah /var/log"
    },
    {
      "cmd": "ls -lt",
      "en": "sort by modification time",
      "pl": "Sortuj według czasu modyfikacji",
      "desc": "Sortuje wyniki w formacie długim według czasu ostatniej modyfikacji, umieszczając najnowsze pliki na samej górze. Flaga -r (reverse) odwraca ten porządek.",
      "example": "ls -lt\n# Pokazuje najświeższe logi na górze listy"
    },
    {
      "cmd": "tree",
      "en": "list contents in a tree-like format",
      "pl": "Wyświetl strukturę katalogów w formie drzewa",
      "desc": "Rysuje hierarchiczną, graficzną strukturę podkatalogów i plików. Przydatne przy szybkiej analizie layoutu aplikacji webowych lub struktury projektu.",
      "example": "tree -L 2\n# Ogranicza głębokość rekurencji do 2 poziomów"
    },
    {
      "cmd": "eza -la / lsd -la",
      "en": "modern directory listing tools",
      "pl": "Nowoczesne, kolorowe alternatywy dla ls (Rust)",
      "desc": "Narzędzia nowej generacji (eza - następca exa, lsd) napisanego w Rust. Oferują automatyczne kodowanie kolorami wg typów plików, wsparcie dla wskaźników stanu Git oraz ładniejsze ikony.",
      "example": "eza -lah --git\n# Wylistowanie z uwzględnieniem statusu repozytorium Git"
    }
  ],
  "quiz1": [
    {
      "q": "Która flaga w poleceniu ls odpowiada za wyświetlenie szczegółowych informacji (uprawnienia, właściciel, rozmiar)?",
      "options": ["-a", "-l", "-h", "-r"],
      "correct": 1,
      "exp": "-l oznacza 'long format' (format długi)."
    },
    {
      "q": "Jakie flagi należy połączyć, aby wyświetlić pliki ukryte w formacie długim z czytelnymi dla człowieka rozmiarami (np. KB, MB)?",
      "options": ["ls -la", "ls -lh", "ls -lah", "ls -ar"],
      "correct": 2,
      "exp": "-l (długi), -a (ukryte), -h (czytelne rozmiary) dają łącznie najpopularniejszą kombinację -lah."
    },
    {
      "q": "Do czego służy flaga -h w poleceniu ls -lh?",
      "options": ["Ukrywa pliki systemowe", "Wyświetla rozmiary w czytelnym formacie (Human-readable)", "Sortuje pliki alfabetycznie", "Przeszukuje podkatalogi rekurencyjnie"],
      "correct": 1,
      "exp": "-h zamienia surowe bajty na czytelne jednostki (K, M, G)."
    },
    {
      "q": "Które polecenie wyświetli zawartość katalogu w formie graficznego drzewa?",
      "options": ["ls -tree", "branch", "tree", "dir -graph"],
      "correct": 2,
      "exp": "tree to dedykowane narzędzie do wizualizacji hierarchii katalogów."
    },
    {
      "q": "Jak posortować wyniki polecenia ls według czasu ostatniej modyfikacji (najnowsze pliki na górze)?",
      "options": ["ls -ls", "ls -lt", "ls -sort", "ls -m"],
      "correct": 1,
      "exp": "Flaga -t włącza sortowanie po czasie modyfikacji (time)."
    },
    {
      "q": "W jakim języku programowania napisanio nowoczesne, alternatywne narzędzia do listowania takie jak eza czy lsd?",
      "options": ["Python", "C++", "Rust", "Go"],
      "correct": 2,
      "exp": "Zarówno eza jak i lsd są nowoczesnymi zamiennikami ls napisanymi w języku Rust."
    }
  ],
  "quiz2": [
    {
      "q": "Wpisz standardową, łączoną komendę ls z flagami wyświetlającymi format długi, pliki ukryte oraz czytelne rozmiary.",
      "answers": ["ls -lah", "ls -alh", "ls -l -a -h", "ls -a -l -h"],
      "hint": "Użyj flag -l, -a oraz -h w jednym ciągu.",
      "exp": "ls -lah łączy wszystkie trzy kluczowe modyfikatory."
    },
    {
      "q": "Wpisz polecenie służące do wyświetlenia struktury plików i katalogów w formie graficznego drzewa.",
      "answers": ["tree"],
      "hint": "Jedno angielskie słowo oznaczające drzewo.",
      "exp": "tree rysuje schemat hierarchiczny."
    },
    {
      "q": "Wpisz komendę ls w formacie długim, posortowaną według czasu ostatniej modyfikacji.",
      "answers": ["ls -lt", "ls -l -t"],
      "hint": "Połącz flagę formatu długiego z flagą sortowania czasowego.",
      "exp": "ls -lt wyświetla pliki posortowane chronologicznie."
    },
    {
      "q": "Wpisz nowoczesne polecenie w stylu ls (z pakietu napisanego w Rust), aby wylistować pliki ukryte w formacie długim.",
      "answers": ["eza -la", "lsd -la", "eza -al", "lsd -al"],
      "hint": "Użyj alternatywnego narzędzia 'eza' lub 'lsd' z odpowiednimi flagami.",
      "exp": "eza -la lub lsd -la realizują to zadanie z kolorowaniem."
    }
  ]
}
// ============================================================
{
  "id": "podglad_plikow",
  "title": "Podgląd i inspekcja plików",
  "subtitle": "Metody odczytu zawartości, analiza metadanych i statystyki tekstowe",
  "icon": "[$]",
  "lesson": [
    {
      "cmd": "cat <plik>",
      "en": "concatenate and print files",
      "pl": "Wyświetl całą zawartość pliku",
      "desc": "Wypisuje zawartość pliku bezpośrednio na standardowe wyjście (stdout). Optymalne dla krótkich plików konfiguracyjnych; w przypadku dużych plików powoduje gwałtowne przewinięcie bufora terminala.",
      "example": "cat /etc/passwd"
    },
    {
      "cmd": "less <plik>",
      "en": "opposite of more (paginated viewer)",
      "pl": "Interaktywna przeglądarka stron pliku",
      "desc": "Umożliwia wydajne przeglądanie dużych plików strona po stronie (nawigacja strzałkami, Spacja, wyjście klawiszem 'q'). Nie wczytuje całego pliku do pamięci RAM naraz.",
      "example": "less /var/log/syslog"
    },
    {
      "cmd": "bat <plik>",
      "en": "a cat clone with wings (syntax highlighting)",
      "pl": "Nowoczesny zamiennik cat z podświetlaniem składni",
      "desc": "Narzędzie w języku Rust rozszerzające możliwości cat: oferuje automatyczne kolorowanie kodu (syntax highlighting), numerację linii, podział na strony oraz integrację z systemem Git.",
      "example": "bat /etc/nginx/nginx.conf"
    },
    {
      "cmd": "head -n 20 <plik>",
      "en": "output the first part of files",
      "pl": "Wyświetl początkowe linie pliku",
      "desc": "Domyślnie wypisuje pierwszych 10 linii pliku. Modyfikator -n pozwala precyzyjnie zdefiniować liczbę wierszy odczytywanych od góry.",
      "example": "head -n 20 access.log"
    },
    {
      "cmd": "tail -n 10 -f <plik>",
      "en": "output the last part / follow mode",
      "pl": "Wyświetl końcowe linie oraz tryb śledzenia na żywo",
      "desc": "Wypisuje końcową część pliku (domyślnie 10 linii). Flaga -f (follow) utrzymuje proces otwarty i na bieżąco strumieniuje nowe wpisy dopisywane do pliku (kluczowe przy monitorowaniu logów).",
      "example": "tail -n 10 -f /var/log/auth.log"
    },
    {
      "cmd": "file <plik>",
      "en": "determine file type",
      "pl": "Określ rzeczywisty typ pliku",
      "desc": "Analizuje binarne sygnatury w nagłówku pliku (tzw. magic numbers), określając jego faktyczny format (np. skrypt ASCII, plik wykonywalny ELF, archiwum), niezależnie od rozszerzenia w nazwie.",
      "example": "file payload.bin"
    },
    {
      "cmd": "wc <plik>",
      "en": "word, line, character, and byte count",
      "pl": "Policz linie, słowa i bajty w pliku",
      "desc": "Zwraca podstawowe statystyki tekstowe: liczbę wierszy (-l), słów (-w) oraz bajtów/znaków (-c). Niezwykle użyteczne w kombinacji z potokami (pipe).",
      "example": "wc -l access.log"
    }
  ],
  "quiz1": [
    {
      "q": "Które polecenie służy do interaktywnego przeglądania dużych plików z możliwością przewijania w górę i w dół oraz wyjściem klawiszem 'q'?",
      "options": ["cat", "head", "less", "wc"],
      "correct": 2,
      "exp": "less to wydajna, paginowana przeglądarka plików."
    },
    {
      "q": "Do czego służy flaga -f w poleceniu tail?",
      "options": ["Filtruje linie zawierające błędy", "Śledzi plik na żywo i wyświetla nowe wpisy w czasie rzeczywistym", "Zmusza tail do wyświetlenia całego pliku", "Formatuje wyjście do formatu JSON"],
      "correct": 1,
      "exp": "Flaga -f (follow) utrzymuje proces w stanie czuwania, wypisując pojawiające się w pliku dane."
    },
    {
      "q": "Jakie polecenie pozwala sprawdzić rzeczywisty format pliku na podstawie jego wewnętrznych sygnatur binarnych (magic numbers), ignorując rozszerzenie?",
      "options": ["type", "file", "info", "stat"],
      "correct": 1,
      "exp": "file analizuje nagłówek pliku w celu ustalenia jego typu."
    },
    {
      "q": "Które narzędzie stanowi nowoczesną alternatywę dla cat, oferując automatyczne podświetlanie składni (syntax highlighting) i numerację linii?",
      "options": ["bat", "colorcat", "highlight", "view"],
      "correct": 0,
      "exp": "bat to popularne, napisane w języku Rust narzędzie do podglądu kodu i logów."
    },
    {
      "q": "Która flaga polecenia wc zwraca wyłącznie liczbę linii w pliku?",
      "options": ["-c", "-w", "-l", "-b"],
      "correct": 2,
      "exp": "-l oznacza 'lines' (liczba linii)."
    }
  ],
  "quiz2": [
    {
      "q": "Wpisz komendę, która wyświetli 20 pierwszych linii pliku config.cfg.",
      "answers": ["head -n 20 config.cfg", "head -20 config.cfg"],
      "hint": "Użyj polecenia head z flagą -n 20.",
      "exp": "head -n 20 pozwala określić liczbę wyświetlanych wierszy od początku pliku."
    },
    {
      "q": "Wpisz polecenie do wygodnego, interaktywnego przeglądania pliku /var/log/syslog.",
      "answers": ["less /var/log/syslog"],
      "hint": "Czteroliterowa komenda paginacji.",
      "exp": "less otwiera plik w czytniku tekstowym."
    },
    {
      "q": "Wpisz komendę, która policzy liczbę linii w pliku access.log.",
      "answers": ["wc -l access.log", "wc -l < access.log"],
      "hint": "Użyj polecenia wc z odpowiednią flagą liczącą linie.",
      "exp": "wc -l zwraca liczbę wierszy pliku."
    },
    {
      "q": "Wpisz komendę, która wyświetli końcowe linie pliku auth.log i będzie na bieżąco śledzić dopisywane do niego wpisy.",
      "answers": ["tail -f auth.log", "tail --follow auth.log"],
      "hint": "Połącz tail z flagą -f.",
      "exp": "tail -f uruchamia tryb śledzenia strumienia logów."
    }
  ]
}
// ============================================================
   {
  "id": "tworzenie_plikow_i_katalogow",
  "title": "Tworzenie plików i katalogów",
  "subtitle": "Inicjalizacja pustych struktur, rekurencyjne budowanie drzewa katalogów oraz przekierowanie wyjścia",
  "icon": "[$]",
  "lesson": [
    {
      "cmd": "touch <plik>",
      "en": "change file timestamps / create empty file",
      "pl": "Utwórz pusty plik lub zaktualizuj czas modyfikacji",
      "desc": "Tworzy pusty plik o podanej nazwie, jeśli ten jeszcze nie istnieje. Jeśli plik już istnieje, aktualizuje jego znaczniki czasu (timestamp) ostatniego dostępu i modyfikacji.",
      "example": "touch skrypt.sh\n# Tworzy pusty plik skryptu"
    },
    {
      "cmd": "mkdir <katalog>",
      "en": "make directory",
      "pl": "Utwórz nowy katalog",
      "desc": "Tworzy wskazany katalog w bieżącej lokalizacji. Zwraca błąd, jeśli katalog nadrzędny nie istnieje lub katalog o podanej nazwie już istnieje.",
      "example": "mkdir projekty\n# Tworzy katalog 'projekty'"
    },
    {
      "cmd": "mkdir -p <ścieżka>",
      "en": "make directory recursively (parents)",
      "pl": "Utwórz struktury katalogów rekurencyjnie",
      "desc": "Flaga -p (parents) instruuje system, aby utworzył wszystkie brakujące katalogi pośrednie w podanej ścieżce oraz nie generował błędu, jeśli docelowy katalog już istnieje.",
      "example": "mkdir -p /var/www/html/assets/css\n# Tworzy całe zagnieżdżone drzewo katalogów naraz"
    },
    {
      "cmd": "> <plik>",
      "en": "stdout redirection (create or truncate)",
      "pl": "Przekierowanie wyjścia (utworzenie lub wyczyszczenie pliku)",
      "desc": "Operator przekierowania '>' zapisuje strumień wyjściowy (stdout) do pliku. Użyty samodzielnie z pustym wyjściem, tworzy nowy pusty plik tekstowy lub całkowicie nadpisuje (czyści do 0 bajtów) istniejący plik.",
      "example": "> config.txt\n# Tworzy nowy pusty plik lub zeruje zawartość istniejącego"
    }
  ],
  "quiz1": [
    {
      "q": "Jaka jest podstawowa funkcja polecenia touch oprócz aktualizacji znaczników czasu?",
      "options": ["Usuwanie plików", "Tworzenie pustego pliku", "Kopiowanie zawartości pliku", "Kompresja pliku do archiwum tar"],
      "correct": 1,
      "exp": "touch domyślnie tworzy nowy, pusty plik, jeśli podana nazwa jeszcze nie istnieje w systemie."
    },
    {
      "q": "Jakie polecenie i flaga pozwalają utworzyć całe zagnieżdżone drzewo katalogów naraz (np. a/b/c), nawet jeśli katalogi pośrednie nie istnieją?",
      "options": ["mkdir -r", "mkdir -p", "touch -m", "mkdirs"],
      "correct": 1,
      "exp": "Flaga -p (parents) w poleceniu mkdir odpowiada za rekurencyjne tworzenie brakujących katalogów pośrednich."
    },
    {
      "q": "Co stanie się w przypadku wykonania polecenia '> plik.txt', jeśli plik 'plik.txt' już istnieje i zawiera ważne dane?",
      "options": ["Dane zostaną bezpiecznie dopisane na końcu pliku", "Polecenie zwróci błąd odmowy dostępu", "Plik zostanie całkowicie nadpisany (wyczyszczony do rozmiaru 0 bajtów)", "Zawartość pliku zostanie zaszyfrowana"],
      "correct": 2,
      "exp": "Operator '>' przekierowuje wyjście i całkowicie nadpisuje plik od zera; do dopisywania danych służy operator '>>'."
    },
    {
      "q": "Które polecenie utworzy katalog o nazwie 'bezpieczenstwo' w bieżącej lokalizacji roboczej?",
      "options": ["touch bezpieczenstwo", "mkdir bezpieczenstwo", "create bezpieczenstwo", "dir bezpieczenstwo"],
      "correct": 1,
      "exp": "mkdir (make directory) to standardowe polecenie służące do tworzenia nowych katalogów w systemie Linux."
    }
  ],
  "quiz2": [
    {
      "q": "Wpisz komendę, która utworzy pusty plik o nazwie 'payload.txt'.",
      "answers": ["touch payload.txt"],
      "hint": "Użyj polecenia służącego do zmiany znaczników czasu / tworzenia pustych plików.",
      "exp": "touch payload.txt inicjalizuje pusty plik."
    },
    {
      "q": "Wpisz komendę, która utworzy nowy katalog o nazwie 'skrypty'.",
      "answers": ["mkdir skrypty"],
      "hint": "Użyj polecenia make directory.",
      "exp": "mkdir skrypty tworzy katalog roboczy."
    },
    {
      "q": "Wpisz komendę, która rekurencyjnie utworzy zagnieżdżoną strukturę katalogów 'projekt/src/utils'.",
      "answers": ["mkdir -p projekt/src/utils", "mkdir -p ./projekt/src/utils"],
      "hint": "Użyj mkdir z flagą odpowiedzialną za katalogi nadrzędne (-p).",
      "exp": "mkdir -p buduje całą podaną ścieżkę wraz z brakującymi elementami pośrednimi."
    },
    {
      "q": "Wpisz symbol operatora powłoki, który służy do przekierowania strumienia wyjściowego i utworzenia lub wyczyszczenia pliku.",
      "answers": [">"],
      "hint": "Pojedynczy znak ostrokierunku wskazujący w prawo.",
      "exp": "> odpowiada za przekierowanie strumienia stdout."
    }
  ]
}
// ============================================================
       {
  "id": "kopiowanie_i_przenoszenie",
  "title": "Kopiowanie i przenoszenie plików",
  "subtitle": "Zarządzanie strukturą plików (cp, mv) oraz zasady bezpieczeństwa i nadpisywania (-i, -n)",
  "icon": "[$]",
  "lesson": [
    {
      "cmd": "cp <źródło> <cel>",
      "en": "copy files",
      "pl": "Skopiuj plik",
      "desc": "Tworzy kopię pliku w nowej lokalizacji. Domyślnie nadpisuje istniejący plik docelowy bez ostrzeżenia (chyba że w systemie aktywne są domyślne aliasy bezpieczeństwa).",
      "example": "cp config.txt config.bak"
    },
    {
      "cmd": "cp -r <źródło> <cel>",
      "en": "recursive copy",
      "pl": "Skopiuj katalog rekurencyjnie",
      "desc": "Flaga -r (recursive) jest niezbędna podczas kopiowania całych katalogów wraz z ich zawartością, podkatalogami i uprawnieniami.",
      "example": "cp -r /var/www/html /backup/html"
    },
    {
      "cmd": "mv <źródło> <cel>",
      "en": "move or rename files",
      "pl": "Przenieś lub zmień nazwę pliku/katalogu",
      "desc": "Przenosi zasób w nowe miejsce lub zmienia jego nazwę w obrębie systemu plików. Domyślnie również nadpisuje plik docelowy, jeśli taki istnieje.",
      "example": "mv stary_plik.txt nowy_plik.txt\n# Zmiana nazwy pliku"
    },
    {
      "cmd": "cp -i / mv -i",
      "en": "interactive mode (prompt before overwrite)",
      "pl": "Tryb interaktywny (pytaj przed nadpisaniem)",
      "desc": "Flaga -i (interactive) wymusza wyświetlenie ostrzeżenia i pytania o zgodę (tak/nie) w przypadku próby nadpisania istniejącego pliku docelowego.",
      "example": "cp -i plik.txt /etc/plik.txt"
    },
    {
      "cmd": "cp -n / mv -n",
      "en": "no clobber (do not overwrite)",
      "pl": "Tryb zabezpieczenia przed nadpisaniem",
      "desc": "Flaga -n (no clobber) całkowicie blokuje nadpisywanie istniejących plików – jeśli plik docelowy już istnieje, operacja kopiowania/przenoszenia zostanie pominięta bez błędu.",
      "example": "cp -n raport.pdf /archiwum/"
    },
    {
      "cmd": "Kiedy następuje nadpisanie pliku?",
      "en": "overwrite conditions",
      "pl": "Zasady i warunki nadpisywania plików",
      "desc": "Czyste polecenia cp i mv nadpisują plik docelowy automatycznie, gdy w podanej ścieżce istnieje już plik o dokładnie takiej samej nazwie. W wielu dystrybucjach Linuksa (np. Ubuntu, Debian) pakiety systemowe lub pliki konfiguracyjne powłoki (np. ~/.bashrc) mają domyślnie ustawione aliasy w formie 'alias cp=\"cp -i\"' oraz 'alias mv=\"mv -i\"', co sprawia, że system w standardowej pracy zawsze pyta o potwierdzenie nadpisania.",
      "example": "# Sprawdzenie aliasów w powłoce:\nalias cp"
    }
  ],
  "quiz1": [
    {
      "q": "Która flaga w poleceniu cp jest wymagana, aby skopiować cały katalog wraz z jego zawartością?",
      "options": ["-f", "-r", "-d", "-s"],
      "correct": 1,
      "exp": "-r (recursive) odpowiada za rekurencyjne kopiowanie drzewa katalogów."
    },
    {
      "q": "Co robi flaga -i (interactive) dodana do polecenia cp lub mv?",
      "options": ["Ignoruje błędy uprawnień", "Pyta użytkownika o potwierdzenie przed nadpisaniem istniejącego pliku", "Kopiuje pliki w tle", "Tworzy twarde dowiązanie"],
      "correct": 1,
      "exp": "-i wymusza interaktywne zapytanie przed nadpisaniem pliku docelowego."
    },
    {
      "q": "Jaka jest domyślna reakcja surowego polecenia cp w przypadku, gdy plik docelowy już istnieje w katalogu?",
      "options": ["Zwraca błąd i przerywa działanie", "Pyta użytkownika o zgodę", "Automatycznie i bezszelestnie nadpisuje plik docelowy", "Tworzy kopię z przyrostkiem .bak"],
      "correct": 2,
      "exp": "Standardowo cp i mv nadpisują istniejące pliki docelowe bez ostrzeżenia, o ile nie zabezpieczono tego flagą lub aliasem."
    },
    {
      "q": "Która flaga oznacza tryb 'no clobber' i całkowicie zapobiega nadpisywaniu istniejących plików?",
      "options": ["-n", "-c", "-nc", "-x"],
      "correct": 0,
      "exp": "-n (no clobber) uniemożliwia nadpisanie pliku docelowego."
    }
  ],
  "quiz2": [
    {
      "q": "Wpisz komendę, która skopiuje katalog 'projekty' rekurencyjnie do katalogu '/backup/'.",
      "answers": ["cp -r projekty /backup/", "cp -r projekty /backup"],
      "hint": "Użyj cp z flagą rekurencyjną -r.",
      "exp": "cp -r projekty /backup/ kopiuje całe drzewo katalogów."
    },
    {
      "q": "Wpisz komendę przenoszącą plik 'dane.txt' do katalogu '/tmp/' z jawnie wymuszonym pytaniem przed nadpisaniem.",
      "answers": ["mv -i dane.txt /tmp/", "mv --interactive dane.txt /tmp/"],
      "hint": "Użyj mv z flagą interaktywną -i.",
      "exp": "mv -i włącza tryb interaktywnego potwierdzenia nadpisania."
    },
    {
      "q": "Wpisz flagę oznaczającą 'no clobber' (brak nadpisywania), którą można dopisać do cp lub mv.",
      "answers": ["-n", "--no-clobber"],
      "hint": "Jedna litera odpowiadająca za 'no'.",
      "exp": "-n chroni przed nadpisaniem istniejących zasobów."
    }
  ]
}
// ============================================================
       {
  "id": "usuwanie_plikow_i_katalogow",
  "title": "Usuwanie plików i katalogów",
  "subtitle": "Trwałe kasowanie (rm, rmdir) oraz bezpieczne zarządzanie koszem systemowym (trash-cli, gio trash)",
  "icon": "[$]",
  "lesson": [
    {
      "cmd": "rm <plik>",
      "en": "remove files",
      "pl": "Trwale usuń plik",
      "desc": "Bezpowrotnie kasuje wskazany plik z systemu plików. W surowej powłoce CLI system Linux nie posiada domyślnego kosza – usunięcie pliku za pomocą rm oznacza natychmiastowe zwolnienie bloków dyskowych.",
      "example": "rm tajny_notatnik.txt"
    },
    {
      "cmd": "rm -r <katalog>",
      "en": "recursive remove",
      "pl": "Usuń katalog wraz z zawartością rekurencyjnie",
      "desc": "Flaga -r (recursive) umożliwia skasowanie całego drzewa katalogów wraz ze wszystkimi podkatalogami i plikami. Połączenie z flagą -f (-rf) wymusza operację bez pytań – najniebezpieczniejsza komenda w Linuksie przy błędnym podaniu ścieżki.",
      "example": "rm -r stary_projekt"
    },
    {
      "cmd": "rm -ri <katalog>",
      "en": "recursive interactive remove",
      "pl": "Interaktywne usuwanie rekurencyjne",
      "desc": "Połączenie flagi rekurencyjnej (-r) oraz interaktywnej (-i). Zmusza system do pytania o potwierdzenie (tak/nie) przed usunięciem każdego pojedynczego pliku w strukturze, zapobiegając katastrofalnym pomyłkom.",
      "example": "rm -ri katalog_do_przegladu"
    },
    {
      "cmd": "rmdir <katalog>",
      "en": "remove empty directory",
      "pl": "Usuń pusty katalog",
      "desc": "Usuwa wyłącznie katalogi, które są całkowicie puste. Jeśli w środku znajduje się chociaż jeden plik lub podkatalog, operacja zostanie zablokowana, co stanowi naturalne zabezpieczenie przed utratą danych.",
      "example": "rmdir pusty_katalog"
    },
    {
      "cmd": "gio trash / trash-put",
      "en": "move to system trash (safe deletion)",
      "pl": "Przenieś do kosza systemowego (bezpieczne usuwanie)",
      "desc": "Nowoczesne alternatywy dla surowego rm. Narzędzie gio trash (część biblioteki GLib/GNOME) lub trash-put (z pakietu trash-cli) przenoszą pliki do systemowego kosza zamiast je bezpowrotnie niszczyć.",
      "example": "trash-put dokument.pdf\ngio trash stary_plik.txt"
    },
    {
      "cmd": "trash-list",
      "en": "list trash contents",
      "pl": "Wylistuj zawartość kosza",
      "desc": "Wyświetla listę wszystkich obiektów znajdujących się aktualnie w koszu systemowym wraz z ich unikalnymi identyfikatorami oraz ścieżkami źródłowymi.",
      "example": "trash-list"
    },
    {
      "cmd": "trash-empty / gio trash --empty",
      "en": "empty trash contents",
      "pl": "Opróżnij kosz systemowy",
      "desc": "Trwale usuwa wszystkie pliki i katalogi zgromadzone w koszu, ostatecznie zwalniając zajmowaną przez nie przestrzeń dyskową.",
      "example": "trash-empty\ngio trash --empty"
    }
  ],
  "quiz1": [
    {
      "q": "Czym zasadniczo różni się działanie polecenia rm od narzędzi takich jak trash-put lub gio trash?",
      "options": [
        "rm działa wyłącznie na plikach tekstowych",
        "rm usuwa pliki bezpowrotnie z pominięciem kosza, a narzędzia trash przenoszą je do katalogu kosza",
        "trash-put wymaga uprawnień administratora root",
        "rm automatycznie archiwizuje pliki w formacie tar.gz"
      ],
      "correct": 1,
      "exp": "rm niszczy dane bezpośrednio w systemie plików, podczas gdy trash-put/gio trash zabezpieczają je w koszu."
    },
    {
      "q": "Co zrobi polecenie rmdir w przypadku próby usunięcia katalogu, w którym znajdują się pliki?",
      "options": [
        "Usunie katalog wraz z całą zawartością",
        "Zwróci błąd i odmówi usunięcia, ponieważ katalog nie jest pusty",
        "Przeniesie pliki do katalogu nadrzędnego",
        "Zapyta użytkownika o zgodę na usunięcie plików"
      ],
      "correct": 1,
      "exp": "rmdir projektowano z myślą o usuwaniu wyłącznie pustych katalogów."
    },
    {
      "q": "Do czego służy flaga -i w kombinacji 'rm -ri'?",
      "options": [
        "Ignoruje pliki ukryte",
        "Włącza tryb interaktywny, pytając o potwierdzenie przed usunięciem każdego elementu",
        "Instaluje brakujące pakiety",
        "Informuje system o braku uprawnień"
      ],
      "correct": 1,
      "exp": "Flaga -i (interactive) wymusza potwierdzenie dla każdego pliku w procedurze rekurencyjnej."
    },
    {
      "q": "Które polecenie z pakietu trash-cli pozwala wyświetlić zawartość systemowego kosza?",
      "options": ["trash-show", "trash-list", "ls-trash", "gio trash --list"],
      "correct": 1,
      "exp": "trash-list to standardowe polecenie do inspekcji kosza."
    }
  ],
  "quiz2": [
    {
      "q": "Wpisz polecenie z biblioteki GLib, które bezpiecznie przeniesie plik 'raport.log' do kosza systemowego.",
      "answers": ["gio trash raport.log"],
      "hint": "Użyj gio trash <plik>.",
      "exp": "gio trash realizuje bezpieczne usuwanie."
    },
    {
      "q": "Wpisz polecenie służące do usunięcia wyłącznie pustego katalogu o nazwie 'stare'.",
      "answers": ["rmdir stare", "rmdir ./stare"],
      "hint": "Użyj dedykowanej komendy dla pustych katalogów.",
      "exp": "rmdir usuwa pusty katalog bez ryzyka straty danych."
    },
    {
      "q": "Wpisz polecenie z pakietu trash-cli, które całkowicie opróżni kosz systemowy.",
      "answers": ["trash-empty", "gio trash --empty"],
      "hint": "Użyj trash-empty lub odpowiednika w gio.",
      "exp": "trash-empty czyści zawartość kosza."
    },
    {
      "q": "Wpisz polecenie rm z odpowiednimi flagami do bezwzględnego, rekurencyjnego usunięcia katalogu 'tmp_backup' bez interakcji.",
      "answers": ["rm -rf tmp_backup", "rm -r -f tmp_backup", "rm -fr tmp_backup"],
      "hint": "Połącz flagę rekurencyjną (-r) z wymuszającą (-f).",
      "exp": "rm -rf wykonuje agresywne, rekurencyjne usunięcie."
    }
  ]
}
// ============================================================
{
  id: "pliki-katalogi",
  title: "Pliki i katalogi",
  subtitle: "touch, cp, mv, rm, mkdir, rmdir",
  icon: "[cp]",
  lesson: [
    { cmd:"touch", en:"touch", pl:"Utwórz pusty plik (lub zaktualizuj jego datę modyfikacji)",
      desc:"Jeśli plik nie istnieje — tworzy go pusty. Jeśli istnieje — tylko odświeża znacznik czasu, nie zmieniając zawartości.",
      example:"touch notatki.txt" },
    { cmd:"mkdir", en:"make directory", pl:"Utwórz nowy katalog",
      desc:"-p tworzy od razu całą ścieżkę katalogów (łącznie z brakującymi katalogami nadrzędnymi).",
      example:"mkdir -p projekty/raporty" },
    { cmd:"cp", en:"copy", pl:"Skopiuj plik lub katalog",
      desc:"-r kopiuje rekurencyjnie (wymagane dla katalogów), -v pokazuje, co jest kopiowane (verbose).",
      example:"cp -r raporty/ /tmp/backup/" },
    { cmd:"mv", en:"move", pl:"Przenieś plik/katalog lub zmień jego nazwę",
      desc:"mv działa też jako 'rename' — przenosząc plik do tej samej lokalizacji pod inną nazwą.",
      example:"mv raport_stary.txt raport_2026.txt" },
    { cmd:"rm", en:"remove", pl:"Usuń plik (trwale, bez kosza)",
      desc:"-r usuwa rekurencyjnie katalog z zawartością, -f wymusza usunięcie bez pytania. Uważaj: brak cofnięcia.",
      example:"rm -rf stare_logi/" },
    { cmd:"rmdir", en:"remove directory", pl:"Usuń PUSTY katalog",
      desc:"W przeciwieństwie do 'rm -r' zadziała tylko, gdy katalog jest pusty — bezpieczniejsza opcja, gdy nie chcesz niczego skasować przez pomyłkę.",
      example:"rmdir stary_pusty_katalog" }
  ],
  quiz1: [
    { q:"Które polecenie utworzy pusty plik notatki.txt (lub odświeży jego datę, jeśli już istnieje)?",
      options:["touch notatki.txt","mkdir notatki.txt","cp notatki.txt","rm notatki.txt"], correct:0,
      exp:"touch tworzy pusty plik albo aktualizuje znacznik czasu istniejącego." },
    { q:"Które polecenie utworzy od razu całą ścieżkę katalogów projekty/raporty, nawet jeśli 'projekty' jeszcze nie istnieje?",
      options:["mkdir projekty/raporty","mkdir -p projekty/raporty","touch -p projekty/raporty","cp -p projekty/raporty"], correct:1,
      exp:"-p przy mkdir tworzy brakujące katalogi nadrzędne po drodze." },
    { q:"Które polecenie skopiuje CAŁY katalog raporty/ rekurencyjnie do /tmp/backup/?",
      options:["cp raporty/ /tmp/backup/","cp -r raporty/ /tmp/backup/","mv -r raporty/ /tmp/backup/","touch -r raporty/ /tmp/backup/"], correct:1,
      exp:"-r jest wymagane przy cp, żeby skopiować katalog razem z zawartością." },
    { q:"Jak bezpiecznie usunąć PUSTY katalog, tak by polecenie nie zadziałało, gdyby coś w nim jednak zostało?",
      options:["rm katalog","rm -rf katalog","rmdir katalog","mv katalog /dev/null"], correct:2,
      exp:"rmdir usuwa katalog tylko wtedy, gdy jest faktycznie pusty." },
    { q:"Które polecenie zmieni nazwę pliku raport_stary.txt na raport_2026.txt?",
      options:["cp raport_stary.txt raport_2026.txt","mv raport_stary.txt raport_2026.txt","touch raport_stary.txt raport_2026.txt","rm raport_stary.txt raport_2026.txt"], correct:1,
      exp:"mv służy zarówno do przenoszenia, jak i zmiany nazwy pliku." }
  ],
  quiz2: [
    { q:"Wpisz komendę tworzącą pusty plik o nazwie notatki.txt.",
      answers:["touch notatki.txt"], hint:"touch <nazwa_pliku>", exp:"touch notatki.txt tworzy pusty plik." },
    { q:"Wpisz komendę usuwającą rekurencyjnie i bez pytania katalog stare_logi wraz z zawartością.",
      answers:["rm -rf stare_logi/","rm -rf stare_logi"], hint:"rm -rf <katalog>", exp:"rm -rf stare_logi/ — nieodwracalne, działaj ostrożnie." },
    { q:"Wpisz komendę tworzącą od razu całą ścieżkę katalogów projekty/raporty.",
      answers:["mkdir -p projekty/raporty"], hint:"mkdir -p <ścieżka>", exp:"mkdir -p projekty/raporty tworzy też brakujące katalogi nadrzędne." }
  ]
},
// ============================================================
{
  id: "uprawnienia",
  title: "Uprawnienia i użytkownicy",
  subtitle: "Prawa dostępu, hasła, sudo",
  icon: "[#]",
  lesson: [
    { cmd:"ls -l", en:"long listing format (permission string)", pl:"Wyświetl plik z pełną notacją uprawnień (drwxr-xr-x) — tu: /etc/passwd",
      desc:"10 znaków notacji: [1] typ pliku (d=katalog, -=plik, l=link symboliczny), [2-4] prawa właściciela (rwx), [5-7] prawa grupy, [8-10] prawa innych. Obok widać też liczbę dowiązań (linków), właściciela i grupę.",
      example:"ls -l /etc/passwd\n# -rw-r--r-- 1 root root 2847 sty 12 10:00 /etc/passwd" },
    { cmd:"chmod 644", en:"numeric permission modes", pl:"Ustaw typowy tryb liczbowy pliku (tu: 644 — właściciel rw-, reszta tylko do odczytu)",
      desc:"Najczęstsze tryby: 777 = rwxrwxrwx (pełne prawa dla wszystkich — prawie zawsze zła praktyka bezpieczeństwa), 755 = rwxr-xr-x (typowe dla skryptów/katalogów), 644 = rw-r--r-- (typowe dla zwykłych plików), 750 = rwxr-x--- (właściciel + grupa), 000 = brak jakichkolwiek praw dla kogokolwiek.",
      example:"chmod 644 raport.txt" },
    { cmd:"chmod 750", en:"change mode", pl:"Zmień uprawnienia do pliku/katalogu",
      desc:"Uprawnienia zapisujemy jako 3 cyfry (właściciel/grupa/inni), gdzie 4=odczyt,2=zapis,1=wykonanie. 750 = rwxr-x---.",
      example:"chmod 750 skrypt.sh" },
    { cmd:"chown user:group", en:"change owner", pl:"Zmień właściciela i grupę pliku",
      desc:"Ustawia, kto jest właścicielem pliku i do jakiej grupy należy.",
      example:"chown www-data:www-data /var/www/index.php" },
    { cmd:"sudo", en:"substitute user do / superuser do", pl:"Wykonaj polecenie jako inny użytkownik (domyślnie root)",
      desc:"Kto może używać sudo i do czego, definiuje plik /etc/sudoers (edytowany przez visudo).",
      example:"sudo systemctl restart ssh" },
    { cmd:"su -", en:"substitute user", pl:"Przełącz się na innego użytkownika (pełne środowisko)",
      desc:"'su -' ładuje pełne środowisko docelowego użytkownika, w przeciwieństwie do samego 'su'.",
      example:"su - root" },
    { cmd:"passwd", en:"password", pl:"Zmień hasło użytkownika",
      desc:"Bez argumentu zmienia hasło bieżącego użytkownika; jako root można podać nazwę innego użytkownika.",
      example:"passwd anna" },
    { cmd:"useradd -m", en:"user add", pl:"Utwórz nowego użytkownika (z katalogiem domowym)",
      desc:"-m tworzy katalog domowy, -G dodaje do grup dodatkowych, -s ustawia powłokę logowania.",
      example:"useradd -m -s /bin/bash tester" },
    { cmd:"/etc/passwd", en:"password file (metadata)", pl:"Plik z listą kont systemowych (bez haseł)",
      desc:"Zawiera login, UID, GID, katalog domowy i powłokę — hasła NIE są tu przechowywane od dawna.",
      example:"cat /etc/passwd | cut -d: -f1" },
    { cmd:"/etc/shadow", en:"shadow password file", pl:"Plik z zahaszowanymi hasłami użytkowników",
      desc:"Dostępny tylko dla roota — klasyczny cel eskalacji uprawnień przy błędnej konfiguracji SUID/sudo.",
      example:"sudo cat /etc/shadow" },
    { cmd:"id", en:"identity", pl:"Pokaż UID, GID i grupy bieżącego (lub podanego) użytkownika",
      desc:"Szybki sposób sprawdzenia, jakie masz uprawnienia po eskalacji.",
      example:"id\n# uid=0(root) gid=0(root) groups=0(root)" },
    { cmd:"find / -perm -4000", en:"SUID search", pl:"Znajdź pliki z bitem SUID (potencjalna eskalacja uprawnień)",
      desc:"Klasyczne polecenie enumeracyjne — pliki SUID uruchamiane są z uprawnieniami właściciela pliku (często root).",
      example:"find / -perm -4000 -type f 2>/dev/null" }
  ],
  quiz1: [
    { q:"W wyniku 'ls -l' widzisz '-rwxr-xr--'. Co oznaczają pierwsze 4 znaki ('-rwx')?",
      options:["To katalog z pełnymi prawami dla wszystkich","To zwykły plik z pełnymi prawami (rwx) dla właściciela","To link symboliczny bez żadnych praw","To plik dostępny tylko do odczytu dla wszystkich"], correct:1,
      exp:"Pierwszy znak '-' oznacza zwykły plik (nie katalog), a 'rwx' to pełne prawa właściciela: odczyt, zapis, wykonanie." },
    { q:"Który tryb liczbowy chmod odpowiada uprawnieniom rwxrwxrwx (pełne prawa dla wszystkich — zwykle zła praktyka)?",
      options:["644","750","777","000"], correct:2, exp:"777 = rwx dla właściciela, grupy i wszystkich pozostałych." },
    { q:"Który plik przechowuje zahaszowane hasła użytkowników w systemie Linux?",
      options:["/etc/passwd","/etc/shadow","/etc/group","/etc/sudoers"], correct:1,
      exp:"/etc/shadow zawiera hasze haseł, dostępne tylko dla roota." },
    { q:"Co robi komenda: chmod 750 plik.sh ?",
      options:["Nadaje pełne prawa wszystkim","Nadaje rwx właścicielowi, r-x grupie, brak praw innym","Usuwa plik","Zmienia właściciela pliku"], correct:1,
      exp:"7=rwx (właściciel), 5=r-x (grupa), 0=--- (inni)." },
    { q:"Które polecenie pozwala wykonać komendę z uprawnieniami roota bez pełnego przełączania sesji?",
      options:["su","sudo","chmod","passwd"], correct:1, exp:"sudo uruchamia pojedyncze polecenie z podniesionymi uprawnieniami." },
    { q:"Co pokazuje komenda 'id'?",
      options:["Historię logowań","UID, GID i przynależność do grup","Zawartość /etc/passwd","Wersję jądra systemu"], correct:1,
      exp:"id wypisuje identyfikatory użytkownika i grup, do których należy." },
    { q:"Które polecenie utworzy konto użytkownika 'tester' wraz z katalogiem domowym?",
      options:["adduser tester --no-home","useradd -m tester","passwd -m tester","chmod -u tester"], correct:1,
      exp:"-m przy useradd tworzy katalog domowy dla nowego konta." },
    { q:"Dlaczego pliki z bitem SUID są istotne dla pentestera przy eskalacji uprawnień?",
      options:["Bo są zawsze zaszyfrowane","Bo uruchamiają się z uprawnieniami właściciela pliku, np. roota","Bo blokują dostęp do sieci","Bo automatycznie usuwają logi"], correct:1,
      exp:"Program z SUID działa z uprawnieniami właściciela pliku niezależnie od tego, kto go uruchamia." },
    { q:"Jak bezpiecznie edytować plik /etc/sudoers?",
      options:["nano /etc/sudoers","vi /etc/sudoers","visudo","cat > /etc/sudoers"], correct:2,
      exp:"visudo sprawdza składnię przed zapisem, chroniąc przed zablokowaniem dostępu do sudo." }
  ],
  quiz2: [
    { q:"Wpisz komendę wyświetlającą plik /etc/passwd w formacie długim (z pełną notacją uprawnień).",
      answers:["ls -l /etc/passwd"], hint:"ls -l <plik>", exp:"ls -l /etc/passwd pokazuje m.in. notację typu drwxr-xr-x." },
    { q:"Wpisz komendę nadającą plikowi raport.txt typowy tryb 644 (właściciel: odczyt+zapis, reszta: tylko odczyt).",
      answers:["chmod 644 raport.txt"], hint:"chmod 644 <plik>", exp:"chmod 644 raport.txt — rw-r--r--." },
    { q:"Wpisz komendę nadającą plikowi skrypt.sh uprawnienia rwxr-x--- (750).",
      answers:["chmod 750 skrypt.sh"], hint:"chmod <liczba> <plik>",
      exp:"chmod 750 skrypt.sh ustawia rwx dla właściciela, r-x dla grupy, brak dla innych." },
    { q:"Wpisz komendę zmieniającą właściciela pliku index.php na użytkownika www-data i grupę www-data.",
      answers:["chown www-data:www-data index.php"], hint:"chown user:group plik",
      exp:"chown www-data:www-data index.php ustawia zarówno właściciela jak i grupę." },
    { q:"Wpisz komendę, która wyświetli Twój obecny UID oraz przynależność do grup.",
      answers:["id"], hint:"Krótka, 2-literowa komenda.",
      exp:"id wypisuje UID, GID i grupy bieżącego użytkownika." },
    { q:"Wpisz komendę tworzącą nowego użytkownika 'tester' z katalogiem domowym.",
      answers:["useradd -m tester"], hint:"useradd -m <login>",
      exp:"useradd -m tester tworzy konto wraz z katalogiem domowym." },
    { q:"Wpisz komendę wyszukującą w systemie pliki z bitem SUID (bez błędów w wyniku).",
      answers:["find / -perm -4000 -type f 2>/dev/null","find / -perm -4000 2>/dev/null","find / -perm -4000 -type f"],
      hint:"find / -perm -4000 ...",
      exp:"find / -perm -4000 -type f 2>/dev/null wyszukuje pliki SUID, ukrywając błędy dostępu." }
  ]
},
// ============================================================
{
  id: "narzedzia-pomocnicze",
  title: "Narzędzia pomocnicze",
  subtitle: "sort, wc, nl, locate, whereis, date, clear",
  icon: "[nl]",
  lesson: [
    { cmd:"sort", en:"sort", pl:"Posortuj linie tekstu alfabetycznie lub liczbowo",
      desc:"-n sortuje numerycznie (nie alfabetycznie, więc 2 < 10), -r odwraca kolejność (malejąco).",
      example:"sort -n liczby.txt" },
    { cmd:"wc -l", en:"word count (lines)", pl:"Policz linie, słowa lub znaki w pliku",
      desc:"-l liczy linie, -w słowa, -c bajty/znaki. Bardzo częste w potokach do szybkiego liczenia wyników.",
      example:"cat access.log | wc -l" },
    { cmd:"nl", en:"number lines", pl:"Wyświetl plik z numeracją linii",
      desc:"Przydatne przy odwoływaniu się do konkretnej linii w dużym pliku logów czy konfiguracji.",
      example:"nl /etc/ssh/sshd_config" },
    { cmd:"clear", en:"clear", pl:"Wyczyść ekran terminala",
      desc:"Nie usuwa historii poleceń — tylko czyści widok. Skrót klawiszowy Ctrl+L robi to samo.",
      example:"clear" },
    { cmd:"locate", en:"locate", pl:"Szybko znajdź plik po nazwie, korzystając z wcześniej zbudowanej bazy indeksu",
      desc:"Dużo szybsze niż 'find', bo przeszukuje gotową bazę (aktualizowaną przez 'updatedb'), a nie cały dysk na żywo — baza może być lekko nieaktualna.",
      example:"locate sshd_config" },
    { cmd:"whereis", en:"whereis", pl:"Znajdź binarkę, kod źródłowy i stronę podręcznika (man) danego polecenia",
      desc:"Szybszy i prostszy niż 'locate' do pytania 'gdzie fizycznie jest zainstalowany ten program'.",
      example:"whereis nmap" },
    { cmd:"date", en:"date", pl:"Pokaż (lub ustaw) bieżącą datę i godzinę systemową",
      desc:"Przydatne przy znakowaniu czasowym logów własnych skryptów czy raportów.",
      example:"date" },
    { cmd:"help", en:"help", pl:"Wyświetl pomoc dla wbudowanego polecenia powłoki (bash builtin)",
      desc:"Działa tylko dla poleceń wbudowanych w powłokę (np. cd, help, export) — dla zwykłych programów użyj 'man'.",
      example:"help cd" },
    { cmd:"finger", en:"finger", pl:"Pokaż informacje o użytkowniku systemowym (login, pełna nazwa, powłoka)",
      desc:"Historyczne narzędzie, rzadziej domyślnie instalowane dziś — ale bywa wspominane przy enumeracji użytkowników na starszych/nietypowo skonfigurowanych systemach.",
      example:"finger anna" }
  ],
  quiz1: [
    { q:"Które polecenie policzy liczbę linii w pliku access.log, odczytując go z potoku?",
      options:["cat access.log | wc -l","cat access.log | sort -l","cat access.log | nl -c","cat access.log | wc -w"], correct:0,
      exp:"wc -l liczy linie przekazane na wejście." },
    { q:"Czym różni się 'locate' od 'find' przy szukaniu pliku po nazwie?",
      options:["locate jest wolniejsze, bo przeszukuje dysk na żywo","locate korzysta z gotowej, wcześniej zbudowanej bazy indeksu — jest szybsze, ale może być nieaktualne","locate działa tylko na katalogach domowych","Nie ma żadnej różnicy"], correct:1,
      exp:"locate przeszukuje indeks (bazę) zamiast skanować cały system plików na bieżąco." },
    { q:"Które polecenie pokaże, gdzie fizycznie zainstalowana jest binarka, kod źródłowy i strona man dla nmap?",
      options:["locate nmap","whereis nmap","finger nmap","nl nmap"], correct:1,
      exp:"whereis szuka plików binarnych, źródłowych i stron podręcznika powiązanych z daną nazwą." },
    { q:"Które polecenie wyświetli pomoc dla WBUDOWANEGO polecenia powłoki, np. 'cd'?",
      options:["man cd","help cd","whereis cd","locate cd"], correct:1,
      exp:"'man' działa dla zewnętrznych programów, 'help' dla poleceń wbudowanych w powłokę (bash builtins)." },
    { q:"Które polecenie posortuje plik liczby.txt NUMERYCZNIE (żeby 2 było przed 10)?",
      options:["sort liczby.txt","sort -n liczby.txt","nl liczby.txt","wc -n liczby.txt"], correct:1,
      exp:"Bez -n sort sortuje alfabetycznie (tekstowo), co dałoby 10 przed 2." }
  ],
  quiz2: [
    { q:"Wpisz komendę liczącą linie w pliku access.log przekazanym przez potok z 'cat'.",
      answers:["cat access.log | wc -l"], hint:"cat <plik> | wc -l", exp:"cat access.log | wc -l liczy linie." },
    { q:"Wpisz komendę wyszukującą plik sshd_config za pomocą indeksu locate.",
      answers:["locate sshd_config"], hint:"locate <nazwa>", exp:"locate sshd_config." },
    { q:"Wpisz komendę pokazującą, gdzie zainstalowany jest program nmap (binarka, źródła, man).",
      answers:["whereis nmap"], hint:"whereis <nazwa>", exp:"whereis nmap." },
    { q:"Wpisz komendę sortującą numerycznie plik liczby.txt.",
      answers:["sort -n liczby.txt"], hint:"sort -n <plik>", exp:"sort -n liczby.txt." }
  ]
},
// ============================================================
{
  id: "pakiety",
  title: "Pakiety (APT)",
  subtitle: "apt, apt-get, instalacja i usuwanie",
  icon: "[apt]",
  lesson: [
    { cmd:"sudo apt update", en:"apt update", pl:"Odśwież lokalną listę dostępnych pakietów i ich wersji",
      desc:"Nie instaluje ani nie aktualizuje niczego samo w sobie — tylko pobiera aktualny spis tego, co jest dostępne w repozytoriach. Zawsze pierwszy krok przed install/upgrade.",
      example:"sudo apt update" },
    { cmd:"sudo apt upgrade", en:"apt upgrade", pl:"Zainstaluj najnowsze dostępne wersje już zainstalowanych pakietów",
      desc:"Aktualizuje wszystko, co masz zainstalowane, do najnowszych wersji widocznych po ostatnim 'apt update'.",
      example:"sudo apt upgrade" },
    { cmd:"sudo apt install", en:"apt install", pl:"Zainstaluj nowy pakiet (program) z repozytorium",
      desc:"Nowoczesny, zalecany interfejs do zarządzania pakietami w Debianie/Kali/Ubuntu — czytelniejszy niż apt-get.",
      example:"sudo apt install nmap" },
    { cmd:"sudo apt remove", en:"apt remove", pl:"Odinstaluj pakiet, zachowując jego pliki konfiguracyjne",
      desc:"'apt purge' usunie dodatkowo też pliki konfiguracyjne — remove zostawia je na wypadek ponownej instalacji.",
      example:"sudo apt remove nikto" },
    { cmd:"apt-get install", en:"apt-get install", pl:"Starszy, klasyczny interfejs do instalacji pakietów (poprzednik apt)",
      desc:"Wciąż szeroko spotykany w starszych poradnikach i skryptach — funkcjonalnie bardzo zbliżony do 'apt install'.",
      example:"sudo apt-get install nikto" },
    { cmd:"apt search", en:"apt search", pl:"Wyszukaj pakiet po nazwie lub słowie kluczowym w opisie",
      desc:"Przydatne, gdy nie pamiętasz dokładnej nazwy pakietu — np. szukając narzędzia do fuzzing webowego.",
      example:"apt search fuzzing" }
  ],
  quiz1: [
    { q:"Jaki jest typowy pierwszy krok przed instalacją lub aktualizacją pakietów przez apt?",
      options:["sudo apt remove","sudo apt update","sudo apt search","sudo apt purge"], correct:1,
      exp:"apt update odświeża listę dostępnych pakietów z repozytoriów — bez tego apt może nie widzieć najnowszych wersji." },
    { q:"Która komenda zainstaluje nowy pakiet nmap z repozytorium?",
      options:["sudo apt remove nmap","sudo apt update nmap","sudo apt install nmap","sudo apt search nmap"], correct:2,
      exp:"sudo apt install <pakiet> instaluje nowy program." },
    { q:"Czym różni się 'apt' od 'apt-get'?",
      options:["Nie ma różnicy funkcjonalnej — apt to nowszy, bardziej czytelny interfejs do tych samych zadań","apt-get jest nowszy niż apt","apt działa tylko na Kali, apt-get wszędzie indziej","apt służy tylko do usuwania pakietów"], correct:0,
      exp:"apt to nowocześniejszy, bardziej przyjazny interfejs wprowadzony jako następca apt-get, ale oba zarządzają tymi samymi pakietami." },
    { q:"Która komenda zaktualizuje WSZYSTKIE już zainstalowane pakiety do najnowszych dostępnych wersji?",
      options:["sudo apt install","sudo apt upgrade","sudo apt search","sudo apt remove"], correct:1,
      exp:"apt upgrade aktualizuje zainstalowane pakiety." }
  ],
  quiz2: [
    { q:"Wpisz komendę odświeżającą listę dostępnych pakietów.",
      answers:["sudo apt update"], hint:"sudo apt update", exp:"sudo apt update." },
    { q:"Wpisz komendę instalującą pakiet nmap przez apt.",
      answers:["sudo apt install nmap"], hint:"sudo apt install <pakiet>", exp:"sudo apt install nmap." },
    { q:"Wpisz komendę odinstalowującą pakiet nikto (zachowując pliki konfiguracyjne).",
      answers:["sudo apt remove nikto"], hint:"sudo apt remove <pakiet>", exp:"sudo apt remove nikto." }
  ]
},
// ============================================================
{
  id: "fhs",
  title: "Struktura systemu plików",
  subtitle: "/bin /etc /var /tmp /usr i reszta hierarchii",
  icon: "[fs]",
  lesson: [
    { cmd:"/bin", en:"binaries", pl:"Podstawowe programy systemowe dostępne dla wszystkich użytkowników",
      desc:"Zawiera kluczowe polecenia takie jak ls, cat, cp — potrzebne nawet w trybie awaryjnym.", example:"/bin" },
    { cmd:"/boot", en:"boot files", pl:"Pliki potrzebne do uruchomienia (startu) systemu",
      desc:"Jądro systemu (kernel) i pliki bootloadera (np. GRUB) — krytyczne, rzadko ruszane ręcznie.", example:"/boot" },
    { cmd:"/dev", en:"devices", pl:"Pliki reprezentujące urządzenia sprzętowe",
      desc:"W Linuksie 'wszystko jest plikiem' — dyski, porty, terminale widać tu jako pliki specjalne (np. /dev/sda).", example:"/dev" },
    { cmd:"/etc", en:"et cetera (configuration)", pl:"Pliki konfiguracyjne systemu i zainstalowanych usług",
      desc:"Tu znajdziesz m.in. /etc/passwd, /etc/shadow, /etc/ssh/sshd_config — jeden z najczęściej przeglądanych katalogów przy audycie.", example:"/etc" },
    { cmd:"/home", en:"home directories", pl:"Katalogi domowe zwykłych użytkowników",
      desc:"Każdy użytkownik (poza rootem) ma tu swój podkatalog, np. /home/anna.", example:"/home" },
    { cmd:"/lib", en:"libraries", pl:"Biblioteki współdzielone potrzebne programom z /bin i /sbin",
      desc:"Odpowiednik .dll z Windows — pliki .so, bez których programy systemowe by nie wystartowały.", example:"/lib" },
    { cmd:"/opt", en:"optional software", pl:"Oprogramowanie dodatkowe, instalowane poza standardowym menedżerem pakietów",
      desc:"Często używane przez komercyjne lub ręcznie paczkowane aplikacje, żeby nie mieszać się z plikami systemowymi.", example:"/opt" },
    { cmd:"/proc", en:"process information", pl:"Wirtualny katalog z informacjami o działających procesach i jądrze (na żywo)",
      desc:"Nie istnieje fizycznie na dysku — jądro generuje go w locie. Np. /proc/cpuinfo pokazuje dane o procesorze.", example:"/proc" },
    { cmd:"/root", en:"root's home", pl:"Katalog domowy użytkownika root (superużytkownika)",
      desc:"Nie mylić z '/' (katalogiem głównym całego systemu) — to osobny, prywatny katalog domowy roota.", example:"/root" },
    { cmd:"/sbin", en:"system binaries", pl:"Programy systemowe do administracji, zwykle wymagające roota",
      desc:"Np. narzędzia do zarządzania siecią czy dyskami — codzienny użytkownik rzadko ich potrzebuje.", example:"/sbin" },
    { cmd:"/tmp", en:"temporary files", pl:"Pliki tymczasowe, zwykle czyszczone przy restarcie systemu",
      desc:"Częsty cel przy eskalacji uprawnień — zapisywalny dla wszystkich, co bywa źle wykorzystywane przy błędnej konfiguracji skryptów.", example:"/tmp" },
    { cmd:"/usr", en:"user programs", pl:"Większość zainstalowanych programów, bibliotek i dokumentacji dla użytkowników",
      desc:"Mimo nazwy nie chodzi o katalogi domowe (to /home) — tu trafia np. oprogramowanie instalowane przez apt.", example:"/usr" },
    { cmd:"/var", en:"variable data", pl:"Dane zmieniające się w czasie działania systemu — logi, cache, kolejki",
      desc:"Tu znajdziesz m.in. /var/log z logami systemowymi i aplikacji — pierwszy przystanek przy threat huntingu.", example:"/var" }
  ],
  quiz1: [
    { q:"W którym katalogu znajdziesz pliki konfiguracyjne systemu, np. /etc/passwd i sshd_config?",
      options:["/var","/etc","/usr","/opt"], correct:1, exp:"/etc to katalog konfiguracji systemu i usług." },
    { q:"W którym katalogu szukasz najpierw logów systemowych i aplikacji podczas threat huntingu?",
      options:["/var","/boot","/dev","/lib"], correct:0, exp:"/var przechowuje dane zmienne w czasie, w tym logi (/var/log)." },
    { q:"Który katalog to wirtualny, generowany na żywo przez jądro widok procesów i informacji o systemie?",
      options:["/proc","/root","/sbin","/tmp"], correct:0, exp:"/proc nie istnieje fizycznie na dysku — tworzy go jądro w locie." },
    { q:"Dlaczego /tmp bywa istotny przy eskalacji uprawnień?",
      options:["Bo jest niedostępny dla zwykłych użytkowników","Bo jest zwykle zapisywalny dla wszystkich, co bywa źle wykorzystywane przez błędnie skonfigurowane skrypty","Bo przechowuje hasze haseł","Bo zawiera jądro systemu"], correct:1,
      exp:"Szerokie uprawnienia zapisu w /tmp w połączeniu z błędami w skryptach to klasyczny wektor eskalacji." },
    { q:"Czym różni się /root od /home?",
      options:["/root to katalog domowy superużytkownika (root), a /home zawiera katalogi domowe zwykłych użytkowników","To dokładnie to samo","/home jest tylko dla roota","/root zawiera jądro systemu"], correct:0,
      exp:"/root to prywatny katalog domowy roota, osobny od katalogów zwykłych użytkowników w /home." }
  ],
  quiz2: [
    { q:"Wpisz ścieżkę katalogu, w którym znajdziesz pliki konfiguracyjne systemu i usług (np. sshd_config).",
      answers:["/etc"], hint:"Krótka ścieżka, 4 znaki.", exp:"/etc to katalog konfiguracji." },
    { q:"Wpisz ścieżkę katalogu z logami systemowymi i aplikacji, kluczowego przy threat huntingu.",
      answers:["/var"], hint:"Dane 'zmienne w czasie'.", exp:"/var — m.in. /var/log." },
    { q:"Wpisz ścieżkę katalogu domowego superużytkownika (roota) — innego niż katalogi zwykłych użytkowników.",
      answers:["/root"], hint:"Nie mylić z '/'.", exp:"/root to katalog domowy roota." },
    { q:"Wpisz ścieżkę katalogu na pliki tymczasowe, często zapisywalnego dla wszystkich.",
      answers:["/tmp"], hint:"3 litery.", exp:"/tmp." }
  ]
},
// ============================================================
{
  id: "procesy",
  title: "Procesy i system",
  subtitle: "ps, kill, systemctl, journalctl",
  icon: "[%]",
  lesson: [
    { cmd:"ps aux", en:"process status", pl:"Pokaż wszystkie uruchomione procesy w systemie",
      desc:"a=wszyscy użytkownicy, u=format z użytkownikiem, x=procesy bez terminala. Podstawa enumeracji po eksploitacji.",
      example:"ps aux | grep ssh" },
    { cmd:"top / htop", en:"table of processes", pl:"Interaktywny podgląd procesów i zużycia zasobów na żywo",
      desc:"htop to bardziej czytelna, kolorowa wersja top.",
      example:"htop" },
    { cmd:"kill -9", en:"kill signal 9 (SIGKILL)", pl:"Wymuś natychmiastowe zakończenie procesu o danym PID",
      desc:"-9 to sygnał SIGKILL — proces nie może go zignorować (w przeciwieństwie do SIGTERM/-15).",
      example:"kill -9 1234" },
    { cmd:"systemctl status", en:"system control", pl:"Sprawdź status usługi systemowej (np. ssh, apache)",
      desc:"systemctl start/stop/restart/enable pozwala zarządzać usługami (systemd).",
      example:"systemctl status ssh" },
    { cmd:"journalctl -u", en:"journal control", pl:"Przeglądaj logi systemowe danej usługi (systemd)",
      desc:"-u filtruje wg jednostki (usługi), -f śledzi logi na żywo, --since ogranicza czasowo.",
      example:"journalctl -u ssh -f" },
    { cmd:"jobs / nohup / &", en:"background jobs", pl:"Zarządzaj procesami działającymi w tle (tu: uruchom w tle skrypt skaner.sh, przeżywający wylogowanie)",
      desc:"& uruchamia w tle, nohup pozwala procesowi przeżyć wylogowanie, jobs listuje procesy tła bieżącej sesji.",
      example:"nohup ./skaner.sh &" }
  ],
  quiz1: [
    { q:"Która komenda wyświetli wszystkie procesy w systemie, niezależnie od użytkownika i terminala?",
      options:["ps","ps aux","top -1","jobs -a"], correct:1, exp:"ps aux pokazuje pełną listę procesów wszystkich użytkowników." },
    { q:"Jaki sygnał wysyła 'kill -9 PID'?",
      options:["SIGTERM (można zignorować)","SIGKILL (nie można zignorować)","SIGSTOP","SIGHUP"], correct:1,
      exp:"-9 to SIGKILL, wymuszone natychmiastowe zabicie procesu." },
    { q:"Które polecenie pokaże status usługi ssh zarządzanej przez systemd?",
      options:["service ssh info","systemctl status ssh","ps ssh","journalctl start ssh"], correct:1,
      exp:"systemctl status <usługa> pokazuje aktualny stan usługi systemd." },
    { q:"Jak śledzić logi usługi ssh na żywo za pomocą journalctl?",
      options:["journalctl -u ssh -f","journalctl --tail ssh","journalctl -f --unit=ssh --stop","tail ssh.journal"], correct:0,
      exp:"journalctl -u ssh -f filtruje po jednostce i śledzi nowe wpisy." },
    { q:"Do czego służy nohup przy uruchamianiu procesu w tle?",
      options:["Przyspiesza proces","Pozwala procesowi działać po wylogowaniu z sesji","Usuwa proces po zakończeniu","Szyfruje wyjście procesu"], correct:1,
      exp:"nohup ignoruje sygnał SIGHUP wysyłany przy zamknięciu terminala/sesji." }
  ],
  quiz2: [
    { q:"Wpisz komendę wyświetlającą wszystkie procesy w systemie z użytkownikami (bez ograniczenia do terminala).",
      answers:["ps aux"], hint:"ps + trzy flagi", exp:"ps aux pokazuje pełną listę procesów." },
    { q:"Wpisz komendę, która natychmiast i bezwarunkowo zabije proces o PID 4321.",
      answers:["kill -9 4321"], hint:"kill -9 <PID>", exp:"kill -9 4321 wysyła SIGKILL do procesu 4321." },
    { q:"Wpisz komendę sprawdzającą status usługi apache2 przez systemd.",
      answers:["systemctl status apache2"], hint:"systemctl status <usługa>",
      exp:"systemctl status apache2 pokazuje bieżący stan usługi." },
    { q:"Wpisz komendę śledzącą logi usługi sshd na żywo za pomocą journalctl.",
      answers:["journalctl -u sshd -f"], hint:"journalctl -u <usługa> -f",
      exp:"journalctl -u sshd -f pokazuje nowe wpisy logów w czasie rzeczywistym." }
  ]
},
// ============================================================
{
  id: "siec-podstawy",
  title: "Sieć — podstawy",
  subtitle: "curl, nc, ping, traceroute, ss",
  icon: "[::]",
  lesson: [
    { cmd:"ping -c 4", en:"packet internet groper", pl:"Sprawdź dostępność hosta w sieci",
      desc:"-c ogranicza liczbę wysłanych pakietów ICMP (bez tego ping działałby w nieskończoność).",
      example:"ping -c 4 8.8.8.8" },
    { cmd:"traceroute", en:"trace route", pl:"Pokaż trasę pakietów do hosta docelowego (przeskoki routerów)",
      desc:"Przydatne do mapowania topologii sieci i identyfikacji filtrów po drodze.",
      example:"traceroute example.com" },
    { cmd:"curl -I", en:"client URL", pl:"Wykonaj żądanie HTTP i pobierz tylko nagłówki odpowiedzi",
      desc:"-I wysyła HEAD, -X wybiera metodę, -H dodaje nagłówek, -d wysyła dane POST.",
      example:"curl -I https://example.com" },
    { cmd:"nc -lvnp", en:"netcat (listen, verbose, numeric, port)", pl:"Nasłuchuj na porcie (klasyczne narzędzie sieciowe)",
      desc:"nc to 'scyzoryk szwajcarski' sieciowca — nasłuch, transfer plików, banner grabbing, reverse shell listener.",
      example:"nc -lvnp 4444" },
    { cmd:"ss -tulwn", en:"socket statistics", pl:"Pokaż otwarte porty i nasłuchujące usługi (nowszy odpowiednik netstat)",
      desc:"-t TCP, -u UDP, -l tylko nasłuchujące, -n bez rozwiązywania nazw, -w wide/dodatkowe info.",
      example:"ss -tulwn" },
    { cmd:"wget", en:"web get", pl:"Pobierz plik z sieci przez HTTP/FTP",
      desc:"Dobre do pobierania exploitów, skryptów enumeracyjnych na docelową maszynę.",
      example:"wget http://10.10.10.5/linpeas.sh" },
    { cmd:"ifconfig", en:"interface configuration", pl:"Pokaż (lub skonfiguruj) interfejsy sieciowe — starsze narzędzie",
      desc:"Historyczny odpowiednik nowszego 'ip addr' — wciąż powszechnie spotykany na Kali i w starszych poradnikach, pokazuje adresy IP, maski i stan interfejsów.",
      example:"ifconfig" }
  ],
  quiz1: [
    { q:"Które polecenie sprawdzi dostępność hosta 8.8.8.8, wysyłając dokładnie 4 pakiety?",
      options:["ping 8.8.8.8","ping -c 4 8.8.8.8","traceroute -c 4 8.8.8.8","curl -c 4 8.8.8.8"], correct:1,
      exp:"-c 4 ogranicza ping do 4 pakietów ICMP." },
    { q:"Które polecenie (starsze, ale wciąż spotykane na Kali) pokaże adresy IP i stan interfejsów sieciowych?",
      options:["ifconfig","traceroute","wget","nc"], correct:0,
      exp:"ifconfig to historyczne narzędzie do przeglądu/konfiguracji interfejsów sieciowych." },
    { q:"Które polecenie pobierze WYŁĄCZNIE nagłówki odpowiedzi HTTP ze strony?",
      options:["curl -X GET","curl -I","wget --headers-only","nc -H"], correct:1, exp:"curl -I wysyła żądanie HEAD i zwraca same nagłówki." },
    { q:"Które polecenie uruchomi nasłuch na porcie 4444 (typowy listener do reverse shell)?",
      options:["nc -lvnp 4444","curl -listen 4444","ss -listen 4444","ping -p 4444"], correct:0,
      exp:"nc -lvnp 4444 nasłuchuje na porcie 4444." },
    { q:"Które polecenie pokaże listę nasłuchujących portów TCP i UDP bez rozwiązywania DNS?",
      options:["ss -tulwn","ping -tuln","curl -tuln","traceroute -n"], correct:0,
      exp:"ss -tulwn to nowoczesny odpowiednik netstat -tulpn." },
    { q:"Do czego głównie służy traceroute w kontekście rekonesansu?",
      options:["Do łamania haseł","Do mapowania trasy pakietów i wykrywania hopów/filtrów po drodze","Do skanowania portów","Do edycji plików tekstowych"], correct:1,
      exp:"traceroute pokazuje kolejne routery (hopy) na drodze do celu." }
  ],
  quiz2: [
    { q:"Wpisz komendę (starsze narzędzie) pokazującą adresy IP i stan interfejsów sieciowych.",
      answers:["ifconfig"], hint:"Jedno słowo, bez flag.", exp:"ifconfig." },
    { q:"Wpisz komendę wysyłającą dokładnie 4 pakiety ping do hosta 192.168.1.1.",
      answers:["ping -c 4 192.168.1.1"], hint:"ping -c <liczba> <host>", exp:"ping -c 4 192.168.1.1." },
    { q:"Wpisz komendę pobierającą tylko nagłówki HTTP ze strony https://example.com.",
      answers:["curl -I https://example.com"], hint:"curl -I <url>", exp:"curl -I https://example.com." },
    { q:"Wpisz komendę uruchamiającą nasłuch netcat na porcie 4444 w trybie verbose.",
      answers:["nc -lvnp 4444","nc -lvp 4444","nc -nlvp 4444"], hint:"nc -lvnp <port>", exp:"nc -lvnp 4444 nasłuchuje na porcie 4444." },
    { q:"Wpisz komendę pokazującą wszystkie nasłuchujące gniazda TCP/UDP bez rozwiązywania nazw.",
      answers:["ss -tulwn","ss -tuln","ss -tulnw"], hint:"ss -tul... + n", exp:"ss -tulwn pokazuje nasłuchujące porty." }
  ]
},
// ============================================================
{
  id: "rekonesans",
  title: "Rekonesans sieciowy",
  subtitle: "nmap, netdiscover, arp-scan",
  icon: "[?]",
  lesson: [
    { cmd:"nmap -sV -sC", en:"Network Mapper — service version, scripts", pl:"Skanuj porty z wykrywaniem wersji usług i domyślnymi skryptami NSE",
      desc:"-sV wykrywa wersje oprogramowania, -sC uruchamia domyślne, bezpieczne skrypty NSE (banner, enum).",
      example:"nmap -sV -sC 10.10.10.15" },
    { cmd:"nmap -p-", en:"all ports", pl:"Skanuj pełny zakres 65535 portów",
      desc:"Domyślnie nmap skanuje tylko top 1000 portów — -p- daje pełny obraz, kosztem czasu.",
      example:"nmap -p- -T4 10.10.10.15" },
    { cmd:"nmap -sn", en:"ping scan (no port scan)", pl:"Wykryj, które hosty w sieci są aktywne (bez skanowania portów)",
      desc:"Szybki sposób na zmapowanie żywych hostów w podsieci przed właściwym skanowaniem.",
      example:"nmap -sn 10.10.10.0/24" },
    { cmd:"netdiscover", en:"network discover", pl:"Wykryj aktywne hosty w sieci lokalnej przez ARP",
      desc:"Pasywnie lub aktywnie nasłuchuje/wysyła zapytania ARP, by odkryć hosty w tej samej sieci L2.",
      example:"netdiscover -r 192.168.1.0/24" },
    { cmd:"arp-scan", en:"ARP scan", pl:"Aktywnie skanuj sieć lokalną protokołem ARP",
      desc:"Szybka i wiarygodna metoda wykrywania hostów w sieci lokalnej (działa nawet gdy ICMP jest blokowany).",
      example:"arp-scan --localnet" }
  ],
  quiz1: [
    { q:"Która flaga nmap uruchamia domyślne, bezpieczne skrypty NSE?",
      options:["-sV","-sC","-sn","-p-"], correct:1, exp:"-sC uruchamia zestaw domyślnych skryptów NSE." },
    { q:"Które polecenie przeskanuje WSZYSTKIE 65535 portów celu?",
      options:["nmap -sV 10.10.10.5","nmap -p- 10.10.10.5","nmap -sn 10.10.10.5","nmap -top 10.10.10.5"], correct:1,
      exp:"-p- oznacza pełny zakres portów 1-65535." },
    { q:"Jak wykryć żywe hosty w sieci 10.10.10.0/24 BEZ skanowania portów?",
      options:["nmap -sn 10.10.10.0/24","nmap -sV 10.10.10.0/24","nmap -p- 10.10.10.0/24","nmap -sC 10.10.10.0/24"], correct:0,
      exp:"-sn to tzw. ping scan — sprawdza dostępność hostów bez skanu portów." },
    { q:"Do czego służy arp-scan w rekonesansie sieci lokalnej?",
      options:["Do łamania WPA2","Do wykrywania hostów w tej samej sieci L2 metodą ARP","Do fuzzing webowego","Do analizy logów systemowych"], correct:1,
      exp:"arp-scan wysyła zapytania ARP, wykrywając aktywne urządzenia w sieci lokalnej." },
    { q:"Która flaga nmap wykrywa wersje usług nasłuchujących na otwartych portach?",
      options:["-sV","-sn","-A -F","-O only"], correct:0, exp:"-sV = service version detection." }
  ],
  quiz2: [
    { q:"Wpisz komendę nmap skanującą host 10.10.10.15 z wykryciem wersji usług i domyślnymi skryptami NSE.",
      answers:["nmap -sV -sC 10.10.10.15","nmap -sC -sV 10.10.10.15"], hint:"nmap -sV -sC <cel>",
      exp:"nmap -sV -sC 10.10.10.15 łączy wykrywanie wersji i skrypty NSE." },
    { q:"Wpisz komendę nmap skanującą pełny zakres portów (65535) hosta 10.10.10.15.",
      answers:["nmap -p- 10.10.10.15"], hint:"nmap -p- <cel>", exp:"nmap -p- 10.10.10.15." },
    { q:"Wpisz komendę wykrywającą żywe hosty w sieci 192.168.1.0/24 bez skanowania portów.",
      answers:["nmap -sn 192.168.1.0/24"], hint:"nmap -sn <sieć>", exp:"nmap -sn 192.168.1.0/24." }
  ]
},
// ============================================================
{
  id: "enumeracja-web",
  title: "Enumeracja webowa",
  subtitle: "gobuster, ffuf, whatweb, arjun",
  icon: "[/]",
  lesson: [
    { cmd:"gobuster dir -u -w", en:"go buster (directory mode)", pl:"Szukaj ukrytych katalogów/plików na serwerze WWW",
      desc:"-u wskazuje URL celu, -w słownik (np. z SecLists), -x rozszerzenia plików do sprawdzenia.",
      example:"gobuster dir -u http://10.10.10.5 -w /usr/share/wordlists/dirb/common.txt" },
    { cmd:"ffuf -u -w", en:"fuzz faster u fool", pl:"Szybki fuzzing katalogów, parametrów i subdomen (placeholder FUZZ)",
      desc:"W URL/nagłówku umieszczasz słowo FUZZ, które ffuf podmienia kolejnymi wpisami ze słownika.",
      example:"ffuf -u http://10.10.10.5/FUZZ -w common.txt" },
    { cmd:"dirb", en:"dir buster (classic)", pl:"Klasyczne narzędzie do enumeracji katalogów webowych",
      desc:"Starszy odpowiednik gobustera — prostszy, ale wciąż użyteczny do szybkiego skanu.",
      example:"dirb http://10.10.10.5" },
    { cmd:"whatweb", en:"what web", pl:"Zidentyfikuj technologie napędzające aplikację webową",
      desc:"Wykrywa CMS, serwer HTTP, frameworki, wersje bibliotek JS na podstawie odpowiedzi serwera.",
      example:"whatweb http://10.10.10.5" },
    { cmd:"arjun -u", en:"Arjun (parameter discovery)", pl:"Odkryj ukryte parametry HTTP akceptowane przez endpoint",
      desc:"Przydatne przy testowaniu API — znajduje parametry niewidoczne w dokumentacji/formularzu.",
      example:"arjun -u http://10.10.10.5/api/search" },
    { cmd:"gobuster vhost -u -w", en:"vhost enumeration", pl:"Wykryj wirtualne hosty (subdomeny) skonfigurowane na serwerze",
      desc:"Ważne, gdy aplikacja rozróżnia treść na podstawie nagłówka Host — klasyczny cel dla purple teamu.",
      example:"gobuster vhost -u http://10.10.10.5 -w subdomains.txt" }
  ],
  quiz1: [
    { q:"Które polecenie uruchomi gobuster w trybie wyszukiwania katalogów na http://target z użyciem wordlist.txt?",
      options:["gobuster vhost -u http://target -w wordlist.txt","gobuster dir -u http://target -w wordlist.txt","gobuster dns -u http://target -w wordlist.txt","gobuster fuzz http://target"], correct:1,
      exp:"gobuster dir -u <url> -w <słownik> to tryb enumeracji katalogów." },
    { q:"Co w ffuf oznacza słowo 'FUZZ' w adresie URL?",
      options:["Nazwę pliku wynikowego","Placeholder podmieniany kolejnymi wpisami ze słownika","Typ HTTP method","Flagę verbose"], correct:1,
      exp:"FUZZ to punkt podstawienia — ffuf wstawia tam kolejne słowa ze słownika." },
    { q:"Które narzędzie najszybciej zidentyfikuje CMS i technologie użyte na stronie?",
      options:["whatweb","ping","traceroute","chmod"], correct:0, exp:"whatweb specjalizuje się w fingerprintingu technologii webowych." },
    { q:"Do czego służy narzędzie arjun?",
      options:["Do skanowania portów","Do wykrywania ukrytych parametrów HTTP","Do łamania haseł SSH","Do analizy pakietów"], correct:1,
      exp:"arjun automatycznie odkrywa parametry akceptowane przez endpoint." },
    { q:"Który tryb gobustera służy do wykrywania wirtualnych hostów (subdomen)?",
      options:["gobuster dir","gobuster vhost","gobuster dns-only","gobuster sub"], correct:1, exp:"gobuster vhost testuje różne wartości nagłówka Host." }
  ],
  quiz2: [
    { q:"Wpisz komendę gobuster wyszukującą katalogi na http://10.10.10.5 z użyciem /usr/share/wordlists/dirb/common.txt.",
      answers:["gobuster dir -u http://10.10.10.5 -w /usr/share/wordlists/dirb/common.txt"], hint:"gobuster dir -u <url> -w <słownik>",
      exp:"gobuster dir -u http://10.10.10.5 -w /usr/share/wordlists/dirb/common.txt." },
    { q:"Wpisz komendę whatweb sprawdzającą technologie strony http://10.10.10.5.",
      answers:["whatweb http://10.10.10.5"], hint:"whatweb <url>", exp:"whatweb http://10.10.10.5." },
    { q:"Wpisz komendę ffuf fuzzującą katalogi na http://10.10.10.5/FUZZ z użyciem common.txt.",
      answers:["ffuf -u http://10.10.10.5/FUZZ -w common.txt"], hint:"ffuf -u <url z FUZZ> -w <słownik>",
      exp:"ffuf -u http://10.10.10.5/FUZZ -w common.txt." }
  ]
},
// ============================================================
{
  id: "podatnosci",
  title: "Weryfikacja podatności",
  subtitle: "searchsploit, nikto, sqlmap (podstawy)",
  icon: "[!]",
  lesson: [
    { cmd:"searchsploit", en:"search exploit", pl:"Przeszukaj lokalną kopię bazy Exploit-DB",
      desc:"Działa offline, świetne po zidentyfikowaniu konkretnej wersji oprogramowania przez nmap -sV.",
      example:"searchsploit apache 2.4.49" },
    { cmd:"nikto -h", en:"Nikto (web scanner)", pl:"Skanuj serwer WWW pod kątem znanych podatności i błędnych konfiguracji",
      desc:"Wykrywa przestarzałe oprogramowanie, niebezpieczne pliki domyślne, nagłówki bezpieczeństwa.",
      example:"nikto -h http://10.10.10.5" },
    { cmd:"sqlmap -u", en:"SQL map", pl:"Automatycznie testuj i eksploatuj SQL Injection",
      desc:"-u wskazuje URL z parametrem, --dbs listuje bazy danych, --batch przechodzi przez pytania z ustawieniami domyślnymi.",
      example:"sqlmap -u \"http://10.10.10.5/item?id=1\" --dbs" },
    { cmd:"searchsploit -m", en:"searchsploit mirror", pl:"Skopiuj (mirror) znaleziony exploit lokalnie do dalszej analizy",
      desc:"Pozwala pobrać kod exploita do bieżącego katalogu przed dostosowaniem go do celu.",
      example:"searchsploit -m 50383" }
  ],
  quiz1: [
    { q:"Do czego służy searchsploit?",
      options:["Do skanowania portów","Do przeszukiwania lokalnej bazy Exploit-DB","Do analizy ruchu sieciowego","Do zarządzania użytkownikami"], correct:1,
      exp:"searchsploit przeszukuje offline'ową kopię Exploit-DB po nazwie/wersji oprogramowania." },
    { q:"Które polecenie przeskanuje serwer WWW pod kątem znanych podatności i domyślnych plików?",
      options:["nikto -h http://target","sqlmap -h http://target","gobuster -h http://target","nmap -h http://target"], correct:0,
      exp:"nikto -h <url> to skaner podatności webowych." },
    { q:"Co robi flaga --dbs w sqlmap?",
      options:["Usuwa bazę danych","Listuje dostępne bazy danych po znalezieniu podatności SQLi","Skanuje porty bazy danych","Tworzy backup bazy"], correct:1,
      exp:"--dbs każe sqlmap wypisać dostępne bazy danych po wykryciu SQL Injection." },
    { q:"Jaki jest typowy pierwszy krok przed użyciem searchsploit?",
      options:["Uruchomienie sqlmap","Zidentyfikowanie wersji usługi (np. przez nmap -sV)","Restart systemu","Zmiana hasła roota"], correct:1,
      exp:"Znajomość dokładnej wersji oprogramowania pozwala trafnie wyszukać pasujący exploit." }
  ],
  quiz2: [
    { q:"Wpisz komendę searchsploit wyszukującą exploity dla 'apache 2.4.49'.",
      answers:["searchsploit apache 2.4.49"], hint:"searchsploit <nazwa i wersja>", exp:"searchsploit apache 2.4.49." },
    { q:"Wpisz komendę nikto skanującą http://10.10.10.5.",
      answers:["nikto -h http://10.10.10.5"], hint:"nikto -h <url>", exp:"nikto -h http://10.10.10.5." },
    { q:"Wpisz komendę sqlmap testującą URL http://10.10.10.5/item?id=1 i listującą bazy danych.",
      answers:["sqlmap -u \"http://10.10.10.5/item?id=1\" --dbs","sqlmap -u http://10.10.10.5/item?id=1 --dbs"], hint:"sqlmap -u <url> --dbs",
      exp:"sqlmap -u \"http://10.10.10.5/item?id=1\" --dbs." }
  ]
},
// ============================================================
{
  id: "ruch-sieciowy",
  title: "Analiza ruchu sieciowego",
  subtitle: "tcpdump, tshark, curl/httpie",
  icon: "[<>]",
  lesson: [
    { cmd:"tcpdump -i eth0", en:"TCP dump", pl:"Przechwytuj ruch sieciowy na wskazanym interfejsie",
      desc:"-w zapisuje do pliku .pcap, -n bez rozwiązywania DNS, filtry np. 'port 80' ograniczają przechwytywany ruch.",
      example:"tcpdump -i eth0 -n port 80 -w ruch.pcap" },
    { cmd:"tshark -r", en:"terminal Wireshark (read)", pl:"Analizuj plik przechwyconego ruchu (.pcap) w terminalu",
      desc:"Wiersz poleceń Wiresharka — pozwala filtrować i wyciągać konkretne pola z pakietów.",
      example:"tshark -r ruch.pcap -Y \"http.request\"" },
    { cmd:"tshark -Y", en:"display filter", pl:"Filtruj przechwycony ruch wg wyrażenia (np. protokołu)",
      desc:"Filtry wyświetlania Wiresharka/tsharka — np. http, dns, tcp.port==443.",
      example:"tshark -r ruch.pcap -Y \"dns\"" },
    { cmd:"curl -X POST -H", en:"custom HTTP request", pl:"Ręcznie skonstruuj żądanie HTTP z niestandardowymi nagłówkami",
      desc:"Kluczowe przy testowaniu API, walidacji CORS i mechanizmów autoryzacji.",
      example:"curl -X POST -H \"Content-Type: application/json\" -d '{\"user\":\"a\"}' http://10.10.10.5/api/login" },
    { cmd:"httpie (http)", en:"HTTPie", pl:"Bardziej czytelna alternatywa dla curl przy testowaniu API (tu: zaloguj się POST-em do 10.10.10.5/api/login, user=a, pass=b)",
      desc:"Domyślnie koloruje i formatuje JSON, prostsza składnia dla nagłówków i danych.",
      example:"http POST 10.10.10.5/api/login user=a pass=b" }
  ],
  quiz1: [
    { q:"Które polecenie przechwyci ruch na interfejsie eth0 i zapisze go do pliku ruch.pcap?",
      options:["tcpdump -i eth0 -w ruch.pcap","tshark -w ruch.pcap eth0","curl -i eth0 -o ruch.pcap","nc -i eth0 > ruch.pcap"], correct:0,
      exp:"tcpdump -i <interfejs> -w <plik> przechwytuje i zapisuje ruch." },
    { q:"Które polecenie odczyta plik ruch.pcap i pokaże tylko żądania HTTP?",
      options:["tshark -r ruch.pcap -Y \"http.request\"","tcpdump -r ruch.pcap http","curl -r ruch.pcap","ffuf -r ruch.pcap"], correct:0,
      exp:"tshark -r <plik> -Y <filtr> analizuje zapisany ruch z filtrem wyświetlania." },
    { q:"Jak wysłać żądanie POST z JSON-em za pomocą curl?",
      options:["curl -X POST -H \"Content-Type: application/json\" -d '{...}' url","curl --json url","curl -POST url --data-json","curl -X GET -d json url"], correct:0,
      exp:"curl -X POST z nagłówkiem Content-Type i flagą -d dla danych to standard wysyłania JSON." },
    { q:"Do czego służy filtr -Y w tshark?",
      options:["Do zapisu pliku wynikowego","Do filtrowania wyświetlanych pakietów wg wyrażenia (np. protokołu)","Do wyboru interfejsu sieciowego","Do zmiany trybu promiscuous"], correct:1,
      exp:"-Y to filtr wyświetlania (display filter), analogiczny do paska filtrów w Wiresharku." }
  ],
  quiz2: [
    { q:"Wpisz komendę tcpdump przechwytującą ruch na eth0 tylko dla portu 80, zapisując do pliku ruch.pcap.",
      answers:["tcpdump -i eth0 -n port 80 -w ruch.pcap","tcpdump -i eth0 port 80 -w ruch.pcap"], hint:"tcpdump -i <if> port 80 -w <plik>",
      exp:"tcpdump -i eth0 -n port 80 -w ruch.pcap." },
    { q:"Wpisz komendę tshark odczytującą plik ruch.pcap i pokazującą tylko zapytania DNS.",
      answers:["tshark -r ruch.pcap -Y \"dns\"","tshark -r ruch.pcap -Y dns"], hint:"tshark -r <plik> -Y <filtr>",
      exp:"tshark -r ruch.pcap -Y \"dns\"." }
  ]
},
// ============================================================
{
  id: "eksploatacja",
  title: "Eksploatacja i walidacja",
  subtitle: "sqlmap, hydra, netexec, responder",
  icon: "[*]",
  lesson: [
    { cmd:"sqlmap --batch --risk", en:"SQL map (automated)", pl:"Automatyzuj testy SQLi z domyślnymi odpowiedziami i poziomem ryzyka",
      desc:"--batch pomija pytania interaktywne, --risk/--level kontrolują agresywność testów (uważaj na środowiska produkcyjne!).",
      example:"sqlmap -u \"http://target/item?id=1\" --batch --risk=1" },
    { cmd:"hydra -l -P", en:"Hydra (brute force)", pl:"Testuj poświadczenia logowania metodą słownikową",
      desc:"-l login (pojedynczy), -L plik loginów, -P plik haseł, na końcu podajesz usługę (ssh, http-post-form itd.).",
      example:"hydra -l admin -P rockyou.txt ssh://10.10.10.5" },
    { cmd:"netexec (nxc)", en:"Network Exec (dawniej CrackMapExec)", pl:"Testuj i waliduj poświadczenia w usługach Windows/SMB w wielu hostach naraz (tu: sieć 10.10.10.0/24, SMB, login admin, hasło Password1)",
      desc:"Następca CrackMapExec — pozwala szybko zweryfikować, gdzie działają dane poświadczenia (SMB, WinRM, itd.).",
      example:"nxc smb 10.10.10.0/24 -u admin -p 'Password1'" },
    { cmd:"responder -I", en:"Responder", pl:"Symuluj ataki LLMNR/NBT-NS poisoning, by przechwycić hasze uwierzytelniania",
      desc:"Używane w kontrolowany sposób do sprawdzenia, czy Blue Team wykryje zatruwanie protokołów rozgłoszeniowych.",
      example:"responder -I eth0" }
  ],
  quiz1: [
    { q:"Co robi flaga --batch w sqlmap?",
      options:["Włącza tryb graficzny","Pomija interaktywne pytania, używając domyślnych odpowiedzi","Zwiększa liczbę wątków","Wyłącza logowanie"], correct:1,
      exp:"--batch automatyzuje przebieg testu bez czekania na odpowiedzi użytkownika." },
    { q:"Które polecenie hydra przetestuje logowanie SSH loginem 'admin' i słownikiem rockyou.txt?",
      options:["hydra -l admin -P rockyou.txt ssh://10.10.10.5","hydra ssh -u admin -w rockyou.txt","hydra -P admin -l rockyou.txt 10.10.10.5","nc -l admin -P rockyou.txt ssh"], correct:0,
      exp:"hydra -l <login> -P <słownik haseł> <protokół>://<host>." },
    { q:"Do czego służy netexec (nxc) w purple teamie?",
      options:["Do fuzzing webowego","Do walidacji poświadczeń na wielu hostach w usługach typu SMB/WinRM","Do analizy pakietów pcap","Do przeszukiwania Exploit-DB"], correct:1,
      exp:"netexec pozwala sprawdzić ważność poświadczeń na wielu maszynach jednocześnie." },
    { q:"Do czego służy responder w kontrolowanym teście purple team?",
      options:["Do skanowania portów","Do symulacji LLMNR/NBT-NS poisoning i przechwytywania haszy uwierzytelniania","Do tworzenia kopii zapasowych","Do zarządzania firewallem"], correct:1,
      exp:"responder odpowiada na rozgłoszenia LLMNR/NBT-NS, przechwytując próby uwierzytelnienia." }
  ],
  quiz2: [
    { q:"Wpisz komendę hydra testującą login 'admin' ze słownikiem rockyou.txt na usłudze ssh hosta 10.10.10.5.",
      answers:["hydra -l admin -P rockyou.txt ssh://10.10.10.5"], hint:"hydra -l <login> -P <słownik> ssh://<host>",
      exp:"hydra -l admin -P rockyou.txt ssh://10.10.10.5." },
    { q:"Wpisz komendę uruchamiającą responder na interfejsie eth0.",
      answers:["responder -I eth0"], hint:"responder -I <interfejs>", exp:"responder -I eth0." }
  ]
},
// ============================================================
{
  id: "tunelowanie",
  title: "Tunelowanie i pivoting",
  subtitle: "ssh -L/-R/-D, socat, chisel, ligolo-ng",
  icon: "[=>]",
  lesson: [
    { cmd:"ssh -L", en:"local port forwarding", pl:"Przekieruj lokalny port do usługi za maszyną pośredniczącą",
      desc:"ssh -L <port_lokalny>:<host_docelowy>:<port_docelowy> user@pivot — udostępnia usługę z sieci wewnętrznej lokalnie.",
      example:"ssh -L 8080:10.10.10.20:80 user@pivot-host" },
    { cmd:"ssh -R", en:"remote port forwarding", pl:"Udostępnij lokalną usługę zdalnej maszynie (odwrotny tunel)",
      desc:"Przydatne, gdy maszyna docelowa nie ma bezpośredniego dostępu do Ciebie — Ty łączysz się do niej.",
      example:"ssh -R 4444:localhost:4444 user@pivot-host" },
    { cmd:"ssh -D", en:"dynamic port forwarding (SOCKS proxy)", pl:"Utwórz dynamiczny proxy SOCKS przez tunel SSH",
      desc:"Pozwala przekierować cały ruch narzędzi (np. przez proxychains) przez skompromitowany hosta.",
      example:"ssh -D 1080 user@pivot-host" },
    { cmd:"socat", en:"socket cat", pl:"Przekazuj/przekierowuj dowolny ruch sieciowy między gniazdami",
      desc:"Bardziej elastyczny niż netcat — potrafi łączyć różne typy gniazd (TCP, UDP, pliki).",
      example:"socat TCP-LISTEN:8080,fork TCP:10.10.10.20:80" },
    { cmd:"chisel", en:"Chisel (tunneling tool)", pl:"Twórz szybkie tunele TCP/UDP przez HTTP (przydatne przy restrykcyjnych firewallach)",
      desc:"Działa w modelu klient-serwer, tunelując ruch przez HTTP, co bywa skuteczne przeciw prostym filtrom.",
      example:"chisel server -p 8000 --reverse" },
    { cmd:"ligolo-ng", en:"Ligolo Next Generation", pl:"Nowoczesne narzędzie do pivotingu z wirtualnym interfejsem sieciowym",
      desc:"Tworzy tunel wyglądający jak zwykły interfejs sieciowy, ułatwiając routing do sieci wewnętrznych.",
      example:"proxy -selfcert" }
  ],
  quiz1: [
    { q:"Która opcja ssh tworzy dynamiczny proxy SOCKS przez tunel SSH?",
      options:["ssh -L","ssh -R","ssh -D","ssh -X"], correct:2, exp:"ssh -D uruchamia dynamiczne przekierowanie portów jako proxy SOCKS." },
    { q:"Kiedy używasz ssh -R zamiast ssh -L?",
      options:["Gdy chcesz udostępnić lokalną usługę zdalnej maszynie (tunel odwrotny)","Gdy chcesz przyspieszyć transfer plików","Gdy chcesz zeskanować porty","Gdy chcesz zmienić hasło"], correct:0,
      exp:"-R (remote forwarding) tworzy tunel w odwrotnym kierunku niż -L." },
    { q:"Do czego głównie służy narzędzie chisel?",
      options:["Do łamania haseł","Do tunelowania TCP/UDP przez HTTP, przydatne przy restrykcyjnych firewallach","Do analizy logów","Do zarządzania użytkownikami"], correct:1,
      exp:"chisel tuneluje ruch przez HTTP w modelu klient-serwer." },
    { q:"Które polecenie ssh przekieruje lokalny port 8080 do usługi 10.10.10.20:80 przez maszynę pośredniczącą?",
      options:["ssh -L 8080:10.10.10.20:80 user@pivot","ssh -R 8080:10.10.10.20:80 user@pivot","ssh -D 8080 user@pivot","ssh -p 8080 user@pivot"], correct:0,
      exp:"ssh -L <lokalny>:<cel>:<port> user@pivot to lokalne przekierowanie portu." }
  ],
  quiz2: [
    { q:"Wpisz komendę ssh tworzącą dynamiczny proxy SOCKS na porcie 1080 przez hosta pivot-host (użytkownik user).",
      answers:["ssh -D 1080 user@pivot-host"], hint:"ssh -D <port> user@host", exp:"ssh -D 1080 user@pivot-host." },
    { q:"Wpisz komendę ssh przekierowującą lokalny port 8080 do 10.10.10.20:80 przez user@pivot-host.",
      answers:["ssh -L 8080:10.10.10.20:80 user@pivot-host"], hint:"ssh -L <lokalny>:<cel>:<port> user@host",
      exp:"ssh -L 8080:10.10.10.20:80 user@pivot-host." }
  ]
},
// ============================================================
{
  id: "threat-hunting",
  title: "Threat hunting i logi",
  subtitle: "grep/awk/sed/jq, ps/ss/lsof forensics",
  icon: "[gr]",
  lesson: [
    { cmd:"awk '{print $1}'", en:"Aho, Weinberger, Kernighan (język przetwarzania tekstu)", pl:"Wyciągaj i przetwarzaj kolumny danych tekstowych",
      desc:"Bardzo potężne przy parsowaniu logów w kolumnach, np. adresów IP z logów Apache/Nginx.",
      example:"awk '{print $1}' access.log | sort | uniq -c | sort -nr" },
    { cmd:"sed 's/x/y/g'", en:"stream editor", pl:"Automatycznie edytuj/zamieniaj tekst w strumieniu danych",
      desc:"Klasyczne zastosowanie: masowa zamiana wzorców w logach lub plikach konfiguracyjnych.",
      example:"sed 's/ERROR/BŁĄD/g' log.txt" },
    { cmd:"jq", en:"JSON query", pl:"Parsuj i filtruj dane w formacie JSON w terminalu (tu: z events.json wybierz wpisy ze statusem failed)",
      desc:"Niezbędny przy analizie logów JSON (np. z API, ELK, chmurowych usług).",
      example:"cat events.json | jq '.[] | select(.status==\"failed\")'" },
    { cmd:"sort | uniq -c", en:"sort, unique count", pl:"Policz wystąpienia unikalnych wartości, np. adresów IP w access.log",
      desc:"Klasyczny łańcuch do szybkiej analizy częstości — kto najczęściej odpytuje serwer.",
      example:"cat access.log | awk '{print $1}' | sort | uniq -c | sort -nr | head" },
    { cmd:"lsof -i", en:"list open files (internet)", pl:"Pokaż otwarte połączenia sieciowe i powiązane z nimi procesy",
      desc:"Świetne do wykrycia nietypowego procesu utrzymującego podejrzane połączenie sieciowe.",
      example:"lsof -i :4444" },
    { cmd:"cut -d: -f1", en:"cut", pl:"Wytnij konkretne pole/kolumnę z linii tekstu wg separatora",
      desc:"-d ustawia separator (np. dwukropek w /etc/passwd), -f wybiera numer pola.",
      example:"cut -d: -f1 /etc/passwd" }
  ],
  quiz1: [
    { q:"Które polecenie policzy, ile razy każdy adres IP pojawia się w pierwszej kolumnie access.log, sortując malejąco?",
      options:["awk '{print $1}' access.log | sort | uniq -c | sort -nr","grep IP access.log | count","cat access.log | uniq","sed 's/IP/count/' access.log"], correct:0,
      exp:"To klasyczny łańcuch: wytnij kolumnę → posortuj → policz unikalne → posortuj wg liczby." },
    { q:"Do czego służy narzędzie jq?",
      options:["Do kompresji plików","Do parsowania i filtrowania danych JSON","Do skanowania portów","Do zarządzania procesami"], correct:1,
      exp:"jq to dedykowane narzędzie CLI do pracy z danymi JSON." },
    { q:"Które polecenie pokaże, jaki proces trzyma otwarte połączenie na porcie 4444?",
      options:["ps -4444","lsof -i :4444","grep 4444 /etc/passwd","find -port 4444"], correct:1,
      exp:"lsof -i :<port> pokazuje procesy powiązane z danym portem/połączeniem." },
    { q:"Co robi sed 's/ERROR/BŁĄD/g' log.txt ?",
      options:["Usuwa wszystkie linie z ERROR","Zamienia każde wystąpienie ERROR na BŁĄD w tekście","Liczy wystąpienia ERROR","Sortuje plik log.txt"], correct:1,
      exp:"s/x/y/g to podstawienie globalne (wszystkie wystąpienia w linii)." }
  ],
  quiz2: [
    { q:"Wpisz komendę wycinającą pierwsze pole (oddzielone dwukropkiem) z pliku /etc/passwd.",
      answers:["cut -d: -f1 /etc/passwd"], hint:"cut -d<separator> -f<numer> <plik>", exp:"cut -d: -f1 /etc/passwd." },
    { q:"Wpisz komendę pokazującą proces nasłuchujący/połączony na porcie 4444.",
      answers:["lsof -i :4444"], hint:"lsof -i :<port>", exp:"lsof -i :4444." },
    { q:"Wpisz komendę zliczającą i sortującą malejąco unikalne adresy IP z pierwszej kolumny access.log.",
      answers:["awk '{print $1}' access.log | sort | uniq -c | sort -nr"], hint:"awk → sort → uniq -c → sort -nr",
      exp:"awk '{print $1}' access.log | sort | uniq -c | sort -nr." }
  ]
},
// ============================================================
{
  id: "ssh",
  title: "SSH — bezpieczny dostęp",
  subtitle: "ssh-keygen, scp, sshd_config",
  icon: "[key]",
  lesson: [
    { cmd:"ssh-keygen -t ed25519", en:"SSH key generator", pl:"Wygeneruj parę kluczy SSH (prywatny/publiczny)",
      desc:"ed25519 to nowoczesny, zalecany algorytm — szybszy i bezpieczniejszy niż stare RSA-1024/2048.",
      example:"ssh-keygen -t ed25519 -C \"anna@laptop\"" },
    { cmd:"ssh-copy-id", en:"SSH copy identity", pl:"Wyślij swój klucz publiczny na serwer, by logować się bez hasła",
      desc:"Dopisuje Twój klucz publiczny do ~/.ssh/authorized_keys na serwerze docelowym.",
      example:"ssh-copy-id user@10.10.10.5" },
    { cmd:"scp", en:"secure copy", pl:"Kopiuj pliki między maszynami przez szyfrowany kanał SSH",
      desc:"Składnia jak cp, ale z hostem: scp plik user@host:/ścieżka/docelowa.",
      example:"scp raport.pdf user@10.10.10.5:/tmp/" },
    { cmd:"/etc/ssh/sshd_config", en:"SSH daemon config", pl:"Plik konfiguracyjny serwera SSH",
      desc:"Tu wyłączasz logowanie roota (PermitRootLogin no) i logowanie hasłem (PasswordAuthentication no) — kluczowe hardenowanie.",
      example:"sudo nano /etc/ssh/sshd_config" },
    { cmd:"ssh -i", en:"identity file", pl:"Zaloguj się przez SSH używając wskazanego klucza prywatnego",
      desc:"Przydatne, gdy masz wiele kluczy do różnych serwerów/projektów.",
      example:"ssh -i ~/.ssh/id_ed25519 user@10.10.10.5" },
    { cmd:"sudo systemctl start/stop ssh", en:"start/stop the SSH service", pl:"Uruchom lub zatrzymaj usługę (daemon) SSH na serwerze",
      desc:"Nowoczesny sposób (systemd): 'sudo systemctl start ssh' / 'stop' / 'restart'. Starszy, wciąż spotykany odpowiednik: 'sudo service ssh start/stop'.",
      example:"sudo systemctl start ssh" }
  ],
  quiz1: [
    { q:"Które polecenie wygeneruje nowoczesną parę kluczy SSH typu ed25519?",
      options:["ssh-keygen -t ed25519","ssh-copy-id -t ed25519","scp -t ed25519","ssh -keygen ed25519"], correct:0,
      exp:"ssh-keygen -t ed25519 tworzy nową parę kluczy tego typu." },
    { q:"Które polecenie skopiuje Twój klucz publiczny na serwer, umożliwiając logowanie bez hasła?",
      options:["scp id_rsa.pub user@host:~","ssh-copy-id user@host","ssh -copy-key user@host","ssh-keygen -copy user@host"], correct:1,
      exp:"ssh-copy-id automatycznie dopisuje klucz do authorized_keys na serwerze." },
    { q:"W którym pliku wyłączysz logowanie roota przez SSH?",
      options:["/etc/passwd","/etc/ssh/sshd_config","/etc/shadow","~/.ssh/config"], correct:1,
      exp:"PermitRootLogin no w /etc/ssh/sshd_config blokuje logowanie roota po SSH." },
    { q:"Które polecenie skopiuje plik raport.pdf na zdalny serwer przez SSH?",
      options:["cp raport.pdf user@host:/tmp/","scp raport.pdf user@host:/tmp/","ssh raport.pdf user@host:/tmp/","ftp raport.pdf user@host"], correct:1,
      exp:"scp kopiuje pliki przez szyfrowany kanał SSH, ze składnią podobną do cp." },
    { q:"Które polecenie (nowoczesny, systemd-owy sposób) uruchomi usługę SSH na serwerze?",
      options:["sudo systemctl start ssh","sudo ssh --start","sudo apt start ssh","ssh-keygen --start"], correct:0,
      exp:"sudo systemctl start ssh uruchamia daemon sshd przez systemd." }
  ],
  quiz2: [
    { q:"Wpisz komendę (systemd) uruchamiającą usługę SSH.",
      answers:["sudo systemctl start ssh"], hint:"sudo systemctl start <usługa>", exp:"sudo systemctl start ssh." },
    { q:"Wpisz komendę generującą nową parę kluczy SSH typu ed25519 z komentarzem \"anna@laptop\".",
      answers:["ssh-keygen -t ed25519 -C \"anna@laptop\"","ssh-keygen -t ed25519 -C anna@laptop"], hint:"ssh-keygen -t ed25519 -C <komentarz>",
      exp:"ssh-keygen -t ed25519 -C \"anna@laptop\"." },
    { q:"Wpisz komendę kopiującą plik raport.pdf na serwer 10.10.10.5 do katalogu /tmp/ (użytkownik user).",
      answers:["scp raport.pdf user@10.10.10.5:/tmp/","scp raport.pdf user@10.10.10.5:/tmp"], hint:"scp <plik> user@host:<ścieżka>",
      exp:"scp raport.pdf user@10.10.10.5:/tmp/." }
  ]
},
// ============================================================
{
  id: "bash-automatyzacja",
  title: "Bash i automatyzacja",
  subtitle: "zmienne, pętle, cron",
  icon: "[sh]",
  lesson: [
    { cmd:"#!/bin/bash", en:"shebang", pl:"Pierwsza linia skryptu wskazująca interpreter",
      desc:"Mówi systemowi, którym programem (tu: bashem) uruchomić resztę pliku.",
      example:"#!/bin/bash\necho \"Start skanu\"" },
    { cmd:"for i in ...; do ... done", en:"for loop", pl:"Pętla wykonująca polecenia dla każdego elementu listy",
      desc:"Klasyczna konstrukcja do iterowania np. po liście adresów IP z pliku.",
      example:"for ip in $(cat hosts.txt); do ping -c1 $ip; done" },
    { cmd:"if [ -f plik ]; then ... fi", en:"conditional", pl:"Instrukcja warunkowa sprawdzająca np. istnienie pliku",
      desc:"-f sprawdza plik, -d katalog, -x czy plik jest wykonywalny — częste w skryptach automatyzujących.",
      example:"if [ -f wynik.txt ]; then cat wynik.txt; fi" },
    { cmd:"chmod +x skrypt.sh", en:"executable bit", pl:"Nadaj skryptowi prawo wykonywania",
      desc:"Bez tego uruchomisz skrypt tylko przez 'bash skrypt.sh', a nie bezpośrednio './skrypt.sh'.",
      example:"chmod +x skrypt.sh && ./skrypt.sh" },
    { cmd:"crontab -e", en:"cron table (edit)", pl:"Edytuj harmonogram cyklicznych zadań bieżącego użytkownika",
      desc:"Otwiera edytor harmonogramu. Format wewnątrz: minuta godzina dzień_miesiąca miesiąc dzień_tygodnia polecenie — np. '0 2 * * * /home/anna/skanuj.sh' uruchomi skrypt codziennie o 2:00.",
      example:"crontab -e\n# w edytorze dopisz: 0 2 * * * /home/anna/skanuj.sh" },
    { cmd:"crontab -l", en:"cron table (list)", pl:"Wyświetl aktualnie zaplanowane zadania cron",
      desc:"Szybki sposób weryfikacji, co jest zaplanowane na danym koncie — istotne też przy audycie bezpieczeństwa.",
      example:"crontab -l" }
  ],
  quiz1: [
    { q:"Co oznacza linia #!/bin/bash na początku skryptu?",
      options:["Komentarz bez znaczenia","Wskazuje interpreter, którym system uruchomi skrypt","Kończy skrypt","Importuje bibliotekę bash"], correct:1,
      exp:"To tzw. shebang — wskazuje, jaki program ma wykonać resztę pliku." },
    { q:"Które polecenie nada skryptowi skrypt.sh prawo wykonywania?",
      options:["chmod +x skrypt.sh","chown +x skrypt.sh","bash +x skrypt.sh","sudo skrypt.sh +x"], correct:0,
      exp:"chmod +x dodaje bit wykonywalności (execute)." },
    { q:"Jak zaplanować w cron zadanie uruchamiane codziennie o 2:00 w nocy?",
      options:["0 2 * * * /skrypt.sh","2 0 * * * /skrypt.sh","* 2 0 * * /skrypt.sh","02:00 daily /skrypt.sh"], correct:0,
      exp:"Format crona: minuta godzina dzień miesiąc dzień_tygodnia — '0 2 * * *' to 2:00 codziennie." },
    { q:"Które polecenie wyświetli aktualnie zaplanowane zadania cron bieżącego użytkownika?",
      options:["crontab -l","cron -list","crontab -e --show","cat /etc/cron"], correct:0,
      exp:"crontab -l listuje zaplanowane zadania." }
  ],
  quiz2: [
    { q:"Wpisz komendę nadającą skryptowi skaner.sh prawo wykonywania.",
      answers:["chmod +x skaner.sh"], hint:"chmod +x <plik>", exp:"chmod +x skaner.sh." },
    { q:"Wpisz komendę wyświetlającą aktualną listę zaplanowanych zadań cron.",
      answers:["crontab -l"], hint:"crontab -<flaga>", exp:"crontab -l." }
  ]
},
// ============================================================
{
  id: "firewall",
  title: "Firewall",
  subtitle: "iptables, ufw, nftables",
  icon: "[||]",
  lesson: [
    { cmd:"iptables -L -n -v", en:"IP tables (list)", pl:"Wyświetl aktualne reguły firewalla iptables",
      desc:"-L listuje reguły, -n bez rozwiązywania DNS, -v szczegóły (liczniki pakietów/bajtów).",
      example:"sudo iptables -L -n -v" },
    { cmd:"iptables -A INPUT -p tcp --dport 22 -j ACCEPT", en:"append rule", pl:"Dodaj regułę zezwalającą na ruch TCP na port 22 (SSH)",
      desc:"-A dodaje regułę na koniec łańcucha, -p protokół, --dport port docelowy, -j akcja (ACCEPT/DROP/REJECT).",
      example:"sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT" },
    { cmd:"iptables -A INPUT -j DROP", en:"drop rule", pl:"Domyślnie odrzucaj (cicho) cały pozostały ruch przychodzący",
      desc:"Zwykle umieszcza się na końcu łańcucha jako reguła 'domyślnie odmów' po wcześniejszych ACCEPT.",
      example:"sudo iptables -A INPUT -j DROP" },
    { cmd:"ufw enable / ufw allow", en:"Uncomplicated Firewall", pl:"Prostszy interfejs do zarządzania firewallem (tu: zezwól na port 22/tcp i włącz firewall)",
      desc:"ufw allow 22/tcp jest dużo czytelniejsze niż odpowiadająca mu reguła iptables.",
      example:"sudo ufw allow 22/tcp && sudo ufw enable" },
    { cmd:"nft list ruleset", en:"nftables (list)", pl:"Wyświetl reguły nowszego systemu firewalla nftables",
      desc:"nftables to następca iptables w nowoczesnych dystrybucjach, z bardziej elastyczną składnią.",
      example:"sudo nft list ruleset" }
  ],
  quiz1: [
    { q:"Które polecenie wyświetli aktualne reguły iptables wraz z licznikami, bez rozwiązywania DNS?",
      options:["iptables -L -n -v","iptables show","iptables --rules","ufw status -v"], correct:0,
      exp:"-L listuje, -n pomija DNS, -v pokazuje szczegóły." },
    { q:"Która reguła iptables zezwoli na ruch TCP przychodzący na port 22 (SSH)?",
      options:["iptables -A INPUT -p tcp --dport 22 -j ACCEPT","iptables -A INPUT -p tcp --sport 22 -j DROP","iptables -D INPUT --port 22","iptables allow 22/tcp"], correct:0,
      exp:"-A INPUT -p tcp --dport 22 -j ACCEPT dodaje regułę zezwalającą na port docelowy 22." },
    { q:"Które polecenie to najprostszy sposób zezwolenia na port 22/tcp za pomocą ufw?",
      options:["ufw allow 22/tcp","ufw -A 22/tcp","ufw accept port=22","iptables ufw 22"], correct:0,
      exp:"ufw allow 22/tcp to czytelna składnia UFW." },
    { q:"Jaka jest rola reguły 'iptables -A INPUT -j DROP' umieszczonej na końcu łańcucha?",
      options:["Zezwala na cały ruch","Domyślnie odrzuca cały pozostały ruch przychodzący, który nie pasował do wcześniejszych reguł","Kasuje wszystkie reguły","Włącza NAT"], correct:1,
      exp:"To typowa reguła 'default deny' zamykająca łańcuch INPUT." }
  ],
  quiz2: [
    { q:"Wpisz komendę wyświetlającą aktualne reguły iptables z licznikami, bez rozwiązywania DNS.",
      answers:["iptables -L -n -v"], hint:"iptables -L -n -v", exp:"iptables -L -n -v." },
    { q:"Wpisz komendę ufw zezwalającą na ruch na porcie 22/tcp.",
      answers:["ufw allow 22/tcp","sudo ufw allow 22/tcp"], hint:"ufw allow <port>/tcp", exp:"ufw allow 22/tcp." }
  ]
}
]; // KONIEC CATEGORIES

/* ============================================================
   AUTO-UZUPEŁNIANIE TESTÓW
   Cel: (1) każda kategoria testuje WSZYSTKIE komendy z lekcji,
        nie tylko podzbiór; (2) dodatkowy, trzeci test — bez
        podpowiedzi, trzeba wpisać wszystko samodzielnie.
   Ręcznie napisane pytania (powyżej) zostają jako "rdzeń" —
   dopisujemy tylko brakujące pozycje, żeby uniknąć dziur
   w pokryciu materiału i nadmiarowych duplikatów.
   ============================================================ */

function _firstLine(example) {
  return String(example).split('\n')[0].trim();
}
function _firstToken(cmdLike) {
  const line = _firstLine(cmdLike);
  const m = line.match(/^\S+/);
  return (m ? m[0] : line).toLowerCase();
}
function _shuffleDeterministic(arr, seed) {
  // Prosty, deterministyczny "tasowany" porządek (bez Math.random) —
  // ten sam wynik przy każdym uruchomieniu aplikacji.
  const out = arr.slice();
  let s = seed + 1;
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function _autoMcq(cat, item, idx) {
  const correctCmd = _firstLine(item.example);
  const otherCmds = cat.lesson
    .filter((l, i) => i !== idx)
    .map(l => _firstLine(l.example))
    .filter(c => c && c !== correctCmd);
  const distractors = _shuffleDeterministic(otherCmds, idx).slice(0, 3);
  while (distractors.length < 3) distractors.push(correctCmd + ' --pomocnicza-opcja');
  const options = _shuffleDeterministic([correctCmd, ...distractors], idx + 7);
  const target = _extraArgs(item.cmd, correctCmd);
  return {
    q: target ? `Która komenda pozwala: ${item.pl.toLowerCase()} — cel: ${target}?` : `Która komenda pozwala: ${item.pl.toLowerCase()}?`,
    options,
    correct: options.indexOf(correctCmd),
    exp: item.desc,
    auto: true
  };
}

function _extraArgs(baseCmd, fullCmd) {
  // Zwraca część przykładu, która wykracza poza "rdzeń" komendy z lekcji
  // (np. dla cmd="ls -la" i example="ls -la /etc" zwróci "/etc").
  // Dzięki temu auto-generowane pytanie może jawnie podać cel (katalog/plik/host),
  // zamiast zakładać, że użytkownik go zgadnie z samego opisu.
  const baseTokens = String(baseCmd).trim().split(/\s+/).map(t => t.toLowerCase());
  const fullTokens = String(fullCmd).trim().split(/\s+/);
  let i = 0;
  while (i < baseTokens.length && i < fullTokens.length && fullTokens[i].toLowerCase() === baseTokens[i]) i++;
  if (i === 0) {
    // Nazwa komendy się nawet nie zgadza (np. cmd="/etc/shadow" to plik, nie komenda) —
    // pokaż sam rdzeń jako punkt odniesienia, żeby pytanie nie było niejednoznaczne.
    return baseCmd === fullCmd ? '' : String(baseCmd).trim();
  }
  // Dopasowaliśmy przynajmniej nazwę komendy — ujawniamy resztę jako kontekst celu,
  // nawet jeśli dalsze fragmenty rdzenia to placeholdery inne niż w realnym przykładzie
  // (np. cmd="chown user:group" a przykład ma "www-data:www-data").
  return fullTokens.slice(i).join(' ').trim();
}

function _autoType(item, withHint) {
  const fullCmd = _firstLine(item.example);
  const target = _extraArgs(item.cmd, fullCmd);
  const q = target
    ? `Wpisz komendę, która pozwala: ${item.pl.toLowerCase()} — cel: ${target}`
    : `Wpisz komendę, która pozwala: ${item.pl.toLowerCase()}.`;
  return {
    q,
    answers: [fullCmd],
    hint: withHint ? (item.cmd + ' — ' + item.en) : undefined,
    exp: item.desc,
    auto: true
  };
}

CATEGORIES.forEach((cat) => {
  const q1Covered = new Set(cat.quiz1.map(q => _firstLine(q.options[q.correct]).toLowerCase()));
  const q2Covered = new Set(cat.quiz2.map(q => _firstLine(q.answers[0]).toLowerCase()));

  cat.lesson.forEach((item, idx) => {
    const key = _firstLine(item.example).toLowerCase();
    if (!q1Covered.has(key)) { cat.quiz1.push(_autoMcq(cat, item, idx)); q1Covered.add(key); }
    if (!q2Covered.has(key)) { cat.quiz2.push(_autoType(item, true)); q2Covered.add(key); }
  });

  // Test 3: PEŁNE pokrycie, bez podpowiedzi — trzeba wpisać wszystko samodzielnie.
  cat.quiz3 = cat.lesson.map(item => _autoType(item, false));
});
