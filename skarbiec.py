#!/usr/bin/env python
# -*- coding: utf-8 -*-

dupa = '&lt;div align="left">&lt;h2>Skarbiec : 18132,38 talarów&lt;/h2>&lt;h2>Przepływ majątku - w trybie testowym&lt;/h2>&lt;p>Dzisiaj&lt;/p>Wpływy z podatków: +14,58 talarów&lt;br>Wpływy z handlu: +0,00 talarów&lt;br>Królewska Mennica: +1815,26 talarów&lt;br>Sprzedaż zwierząt : +470,00 talarów&lt;br>Zakupy: -0,00 talarów&lt;br>Wydatki na zatrudnienie górników: -838,75 talarów&lt;br>Wynagrodzenia dla Straży: -0,00 talarów&lt;br>Korupcja i marnotrawstwo : -267,05 talarów&lt;br>Bilans subwencji cywilnych : +0,00 talarów&lt;br>Bilans subwencji wojskowych : +0,00 talarów&lt;br>&lt;p>Wczoraj&lt;/p>Wpływy z podatków: +32,69 talarów&lt;br>Wpływy z handlu: +0,00 talarów&lt;br>Królewska Mennica: +2054,11 talarów&lt;br>Sprzedaż zwierząt : +195,00 talarów&lt;br>Zakupy: -0,00 talarów&lt;br>Wydatki na zatrudnienie górników: -809,00 talarów&lt;br>Wynagrodzenia dla Straży: -0,00 talarów&lt;br>Korupcja i marnotrawstwo : -252,65 talarów&lt;br>Bilans subwencji cywilnych : +0,00 talarów&lt;br>Bilans subwencji wojskowych : +0,00 talarów&lt;br>&lt;p>W tym tygodniu&lt;/p>Wpływy z podatków: +92,62 talarów&lt;br>Wpływy z handlu: +0,00 talarów&lt;br>Królewska Mennica: +5780,17 talarów&lt;br>Sprzedaż zwierząt : +1390,00 talarów&lt;br>Zakupy: -0,00 talarów&lt;br>Wydatki na zatrudnienie górników: -2439,25 talarów&lt;br>Wynagrodzenia dla Straży: -0,00 talarów&lt;br>Korupcja i marnotrawstwo : -778,37 talarów&lt;br>Bilans subwencji cywilnych : +0,00 talarów&lt;br>Bilans subwencji wojskowych : +0,00 talarów&lt;br>&lt;p>W zeszłym tygodniu&lt;/p>Wpływy z podatków: +334,19 talarów&lt;br>Wpływy z handlu: +0,00 talarów&lt;br>Królewska Mennica: +13662,22 talarów&lt;br>Sprzedaż zwierząt : +3430,00 talarów&lt;br>Zakupy: -0,00 talarów&lt;br>Wydatki na zatrudnienie górników: -12544,00 talarów&lt;br>Wynagrodzenia dla Straży: -0,00 talarów&lt;br>Korupcja i marnotrawstwo : -1768,50 talarów&lt;br>Bilans subwencji cywilnych : +0,00 talarów&lt;br>Bilans subwencji wojskowych : +0,00 talarów&lt;br>&lt;h2>Ostatnie zdarzenia&lt;/h2>&lt;p>Podatki&lt;/p>&lt;p>Sprzedaż&lt;/p>&lt;p>Zatrudnianie urzędników&lt;/p>2012-02-29 16:23:02 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Kiyoko\')">Kiyoko&lt;/a> w charakterze urzędnika za 20,00 talarów.&lt;br>2012-02-29 13:43:02 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Eciu\')">Eciu&lt;/a> w charakterze urzędnika za 25,00 talarów.&lt;br>2012-02-28 17:43:01 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Radoslaw\')">Radoslaw&lt;/a> w charakterze urzędnika za 25,00 talarów.&lt;br>2012-02-28 13:23:02 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Mooreck\')">Mooreck&lt;/a> w charakterze urzędnika za 25,00 talarów.&lt;br>2012-02-27 18:43:02 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Gwardzista\')">Gwardzista&lt;/a> w charakterze urzędnika za 25,00 talarów.&lt;br>2012-02-27 14:23:02 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Kopuwa\')">Kopuwa&lt;/a> w charakterze urzędnika za 25,00 talarów.&lt;br>2012-02-26 14:43:02 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Ywis\')">Ywis&lt;/a> w charakterze urzędnika za 25,00 talarów.&lt;br>2012-02-26 10:23:04 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Ophiumm\')">Ophiumm&lt;/a> w charakterze urzędnika za 25,00 talarów.&lt;br>2012-02-25 16:43:03 : Województwo zatrudniło &lt;a class="lien_default lienPerso" href="javascript:popupPerso(\'FichePersonnage.php?login=Mooreck\')">Mooreck&lt;/a> w charakterze urzędnika za 20,00 talarów.&lt;br>&lt;p>Wynajmowanie górników&lt;/p>&lt;p>Wynagrodzenia dla Straży&lt;/p>&lt;p>Zakupy&lt;/p>&lt;/div>'

import sys
import re
import codecs


dupa = dupa.replace('&lt;', '<')
for x in ['<br>', '<p>', '</p>']:
	dupa = dupa.replace(x, '\n')

dupa = re.sub('<a[^>]+>([^<]+)</a>', '\\1', dupa)

#print dupa
#sys.exit(0)


def count_meals(cnt, item):
	m = {}
	m[u'kawałki mięsa'] = 1
	m[u'ryby'] = 1
	m[u'jarzyny'] = 2
	m[u'butelki mleka'] = 2
	m[u'bochenki chleba'] = 3
	m[u'worki prosa'] = 6


	if item in m:
		return float(cnt) / float(m[item])
	return 0


def parse_items_list(raw_input_string):
	URL_PATTERN = 'http\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?'
	ENDINGS_PATTERN = '[\r\n]+'

	data = re.sub(URL_PATTERN, ' ', raw_input_string)
	data = re.sub(ENDINGS_PATTERN, ' ', data)

	data = re.finditer('[\ \t]*([0-9\,]+)[\ \t]*([^0-9]+)', data)

	for p in data:
		yield (float(p.group(1).replace(',', '.')), p.group(2).strip())


sys.stdout = codecs.getwriter('utf-8')(sys.stdout)
sys.stdin = codecs.getreader('utf-8')(sys.stdin)


print '%10s\t%10s\t%s' % (u'szt.', u'posiłków', u'towar')
print '%s\t%s\t%s' % ('=' * 10, '=' * 10, '=' * 10)
for x in parse_items_list(' '.join(sys.stdin.readlines())):
	print '%10.2f\t%10.2f\t%s' % (x[0], count_meals(x[0], x[1]), x[1])
