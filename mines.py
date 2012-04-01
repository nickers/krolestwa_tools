#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import re
import codecs

pat = u"Kopalnia\s*([0-9]+)\s*:\s*([^\-]+)\s*\-\sLokacja\s([0-9]+) - Status :\s*([^<]+)\s*<br> " +\
u"Produkcja :\s*([\.0-9]+)([^<]+)/robotnika\s*<br>" +\
u"Robotnicy\s*:\s*([0-9]+)/([0-9]+)" +\
u'<div align="center"><form[^>]*>' +\
u'<input type="submit" name="entretien" value="[^"]+" onclick="[^"]+"><br>' +\
u'\(([0-9]+) uncji kamienia i ([0-9]+) uncji żelaza\)<br>' +\
u'<input type="submit" name="amelioration" value="[^"]+"><br>' +\
u'\(([0-9]+) uncji kamienia i ([0-9]+) uncji żelaza\)' +\
u'</form></div>'


class MineInfo(object):
    def __init__(self):
        self.number = None
        self.type = None
        self.location = None
        self.condition = None
        self.production = None
        self.workers = None
        self.workers_max = None
        self.maintenance_stone = None
        self.maintenance_iron = None
        self.upgrade_stone = None
        self.upgrade_iron = None

    def __str__(self):
        print self.type
        return u"%d/%s/%d" % (self.number, self.location, self.location)


def parse_mines_info(raw_input_string):
    global pat
    data = re.finditer(pat, raw_input_string)
    for p in data:
        o = MineInfo()
        g = p.groups()
        o.number = int(g[0])
        o.type = unicode(g[1])
        o.location = int(g[2])
        o.condition = unicode(g[3])
        o.production = float(g[4])
        o.workers = int(g[6])
        o.workers_max = int(g[7])
        o.maintenance_stone = int(g[8])
        o.maintenance_iron = int(g[9])
        o.upgrade_stone = int(g[10])
        o.upgrade_iron = int(g[11])
        yield g


sys.stdout = codecs.getwriter('utf-8')(sys.stdout)
sys.stdin = codecs.getreader('utf-8')(sys.stdin)


for x in parse_mines_info(' '.join(sys.stdin.readlines())):
        for y in x:
#		if len(y) > 20:
#			print "%30s\t" % y,
                if len(y) > 5:
                        print "%25s\t" % y,
                else:
                        print "%6s\t" % y,
        print ''
