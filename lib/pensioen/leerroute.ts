export type Les = {
  id: string
  nummer: string
  titel: string
  duur: string
  intro: string
  leerdoelen: string[]
  onderdelen: { kop: string; tekst: string }[]
  onthouden: string
  vragen: {
    id: string
    vraag: string
    opties: string[]
    correct: number
    uitleg: string
  }[]
  verdieping: { href: string; tekst: string }
}

const lessenInVolgorde: Les[] = [
  {
    id: 'geldstromen',
    nummer: '01',
    titel: 'Volg de geldstroom',
    duur: '5 minuten',
    intro:
      'Bij pensioen zijn betalen, innen, beheren en uitvoeren verschillende taken. Als je die uit elkaar houdt, kun je een loonstrook of pensioenoverzicht beter lezen.',
    leerdoelen: [
      'Je kunt betaler, ontvanger en uitvoerder van elkaar onderscheiden.',
      'Je herkent de rol van de SVB en een pensioenuitvoerder.',
      'Je weet dat zorgpremies ook verschillende routes volgen.',
    ],
    onderdelen: [
      {
        kop: 'Wie betaalt?',
        tekst:
          'Bij een werkgeversregeling betalen werknemer en werkgever mogelijk allebei premie. De verdeling staat in de afspraken van de regeling; er is geen universeel percentage.',
      },
      {
        kop: 'Wie int of beheert?',
        tekst:
          'Belasting en sociale premies kunnen via de loonadministratie en de Belastingdienst lopen. Een pensioenuitvoerder beheert de werkgeversregeling. Dat zijn niet dezelfde taken.',
      },
      {
        kop: 'Wie voert uit?',
        tekst:
          'De Sociale Verzekeringsbank (SVB) verzorgt de AOW. Een pensioenfonds, verzekeraar of premiepensioeninstelling kan een werkgeverspensioen uitvoeren. Welke partij betrokken is, hangt af van de regeling.',
      },
      {
        kop: 'Van loonheffing naar publieke voorzieningen',
        tekst:
          'Een deel van het brutoloon wordt als loonheffing ingehouden en afgedragen aan de Belastingdienst. Belastingen en premies komen samen met andere publieke inkomsten in gezamenlijke middelen en begrotingen. Daaruit worden onder meer sociale zekerheid, zorg, onderwijs, gemeenten, defensie, wegen, veiligheid en toeslagen bekostigd. Je loonstrook wijst geen eigen euro aan één dienst toe.',
      },
    ],
    onthouden:
      'De partij die geld int, voert niet altijd de regeling uit. Publieke inkomsten komen samen; je kunt geen euro op jouw loonstrook aan één voorziening koppelen.',
    vragen: [
      {
        id: 'geldstromen-uitvoerder',
        vraag: 'Welke organisatie verzorgt de uitvoering van de AOW?',
        opties: ['De SVB', 'De zorgverzekeraar', 'De werkgever van iedere AOW-ontvanger'],
        correct: 0,
        uitleg:
          'De SVB verzorgt de uitvoering van de AOW. De werkgever betaalt niet ieders AOW-uitkering.',
      },
      {
        id: 'geldstromen-zorgpremie',
        vraag: 'Wat is juist over de zorgpremie?',
        opties: [
          'De nominale premie betaalt een verzekerde rechtstreeks aan de zorgverzekeraar.',
          'De werkgeversheffing en de nominale premie zijn hetzelfde bedrag.',
          'De SVB int de nominale zorgpremie.',
        ],
        correct: 0,
        uitleg:
          'De nominale zorgpremie en de werkgeversheffing voor de Zorgverzekeringswet zijn verschillende geldstromen.',
      },
    ],
    verdieping: { href: '/pensioen', tekst: 'Bekijk de geldstromen en infographic' },
  },
  {
    id: 'pijlers',
    nummer: '05',
    titel: 'Pensioen via werk: van premie naar vermogen',
    duur: '5 minuten',
    intro:
      'Je latere inkomen kan uit meerdere bronnen bestaan. Ze verschillen in opbouw, uitvoerder en de invloed die je er zelf op hebt.',
    leerdoelen: [
      'Je rekent met pensioengevend salaris min franchise.',
      'Je begrijpt wie de premie inlegt en wie het pensioen uitvoert.',
      'Je herkent pensioenuitvoerders en de financiële sector.',
    ],
    onderdelen: [
      {
        kop: 'Eerst de pensioenpijlers uit elkaar houden',
        tekst:
          'Pijler 1 is de wettelijke AOW, pijler 2 is pensioen via een werkgever en pijler 3 is een eigen aanvulling. Ze kunnen naast elkaar bestaan, maar werken niet als drie gelijke persoonlijke spaarpotten.',
      },
      {
        kop: 'Pijler 2: opbouwen via werk',
        tekst:
          'Een werkgever kan verplicht of vrijwillig bij een regeling zijn aangesloten. De regeling en uitvoerder staan op je pensioenoverzicht. Jij en je werkgever betalen mogelijk allebei premie; de afspraken verschillen.',
      },
      {
        kop: 'Van salaris naar premie',
        tekst:
          'Pensioengevend salaris − franchise = pensioengrondslag. De franchise is het deel waarmee de regeling rekening houdt met de AOW. De regeling bepaalt vervolgens hoe premie of pensioenopbouw aan die grondslag wordt gekoppeld.',
      },
      {
        kop: 'Wie voert het uit en waar wordt belegd?',
        tekst:
          'Een bedrijfstakpensioenfonds bedient een bedrijfstak (zoals ABP bij overheid en onderwijs, PFZW in zorg en welzijn, PMT in metaal en techniek, of bpfBOUW in de bouw). Een ondernemings- of algemeen pensioenfonds, verzekeraar of premiepensioeninstelling (PPI) kan ook uitvoeren. Pensioenfondsen vallen in de nationale rekeningen doorgaans onder S.12 financiële instellingen, niet S.13 overheid. Dit statistische label betekent niet dat iedere pensioenregeling hetzelfde is.',
      },
      {
        kop: 'Vermogen en risico',
        tekst:
          'Pensioenpremies worden belegd en vormen pensioenvermogen binnen de regeling. Beleggen kan groei opleveren, maar ook tegenvallen. Kosten, premie, regels en beleggingsresultaten beïnvloeden de uitkomst. Het vermogen is onderdeel van de collectieve regeling; het is niet hetzelfde als vrij opneembaar spaargeld.',
      },
    ],
    onthouden:
      'Pijler 1 is de AOW; pijler 2 is pensioen via werk; pijler 3 is zelf aanvullen. Een werkgeversregeling bouwt vermogen op via de regeling, maar heeft eigen regels.',
    vragen: [
      {
        id: 'pijlers-bronnen',
        vraag: 'Hoe bereken je in een eenvoudige regeling de pensioengrondslag?',
        opties: [
          'Pensioengevend salaris min franchise.',
          'Nettoloon plus zorgtoeslag.',
          'Werkgeverspremie min loonheffing.',
        ],
        correct: 0,
        uitleg:
          'De franchise is het deel van het salaris waarmee de pensioenregeling rekening houdt omdat er ook AOW is. Regelingen hebben wel eigen definities en voorwaarden.',
      },
      {
        id: 'pijlers-aow',
        vraag: 'Welke partij kan een werkgeverspensioen uitvoeren?',
        opties: [
          'Een pensioenfonds, verzekeraar of PPI, afhankelijk van de regeling.',
          'Altijd de SVB.',
          'Alleen de Belastingdienst.',
        ],
        correct: 0,
        uitleg:
          'Werkgeversregelingen hebben een eigen uitvoerder. De SVB voert de AOW uit; de Belastingdienst int belasting.',
      },
    ],
    verdieping: {
      href: '/oefenen#pensioen-opbouw',
      tekst: 'Oefen met salaris, franchise en premie',
    },
  },
  {
    id: 'loonstrook',
    nummer: '02',
    titel: 'Loonheffing is niet hetzelfde als inkomstenbelasting',
    duur: '6 minuten',
    intro:
      'Een loonstrook bevat verschillende bedragen en inhoudingen. Een belastinginhouding, een pensioenpremie en een werkgeversbijdrage betekenen niet hetzelfde.',
    leerdoelen: [
      'Je onderscheidt loonheffing van pensioenpremie.',
      'Je kunt uitleggen waarom de jaarafrekening kan afwijken.',
      'Je weet dat de werkgever loonheffing inhoudt en afdraagt.',
    ],
    onderdelen: [
      {
        kop: 'Loonheffing is geen pensioenpremie',
        tekst:
          'Loonheffing is een voorheffing op inkomstenbelasting en premies volksverzekeringen. Een werknemersbijdrage aan een pensioenregeling is een andere inhouding, met eigen afspraken.',
      },
      {
        kop: 'Loonheffing is meestal een voorschot',
        tekst:
          'Je werkgever houdt loonheffing in en draagt die af aan de Belastingdienst. Het is vaak een voorschot op de uiteindelijke inkomstenbelasting, geen definitieve berekening van al je inkomen over het hele jaar.',
      },
      {
        kop: 'De jaarafrekening kijkt naar het hele jaar',
        tekst:
          'Bij de aangifte kunnen meerdere werkgevers, ander inkomen en aftrekposten meetellen. Daarom kan loonheffing hoger of lager zijn dan wat je uiteindelijk verschuldigd bent. Een voorbeeldstrook is geen persoonlijke berekening.',
      },
    ],
    onthouden:
      'De werkgever houdt loonheffing in als voorschot. Inkomstenbelasting is de definitieve jaarberekening; een pensioenpremie is weer een andere post.',
    vragen: [
      {
        id: 'loonstrook-inhouding',
        vraag: 'Welke uitspraak over loonheffing klopt?',
        opties: [
          'De werkgever houdt het meestal in als voorschot op de jaarafrekening.',
          'Het is altijd exact gelijk aan de definitieve inkomstenbelasting.',
          'Het is de pensioenpremie die in je persoonlijke pot wordt belegd.',
        ],
        correct: 0,
        uitleg:
          'De werkgever draagt loonheffing alvast af; de inkomstenbelasting wordt later over het hele jaar berekend.',
      },
      {
        id: 'loonstrook-zvw',
        vraag: 'Waarom kan je aangifte afwijken van de loonheffing?',
        opties: [
          'De aangifte kijkt naar het hele jaar en je persoonlijke situatie.',
          'De Belastingdienst telt nooit loonheffing mee.',
          'Pensioenfondsen stellen je inkomstenbelasting vast.',
        ],
        correct: 0,
        uitleg: 'Andere inkomsten of aftrekposten kunnen de uiteindelijke berekening veranderen.',
      },
    ],
    verdieping: { href: '/oefenen#loonstrook', tekst: 'Oefen met de interactieve loonstrook' },
  },
  {
    id: 'aanvullen',
    nummer: '06',
    titel: 'Onderzoek of je zelf wilt aanvullen',
    duur: '6 minuten',
    intro:
      'Zelf extra pensioen opbouwen kan passen bij je situatie, maar vraagt om gegevens en een afweging. Een belastingvoordeel is niet hetzelfde als belastingvrij sparen.',
    leerdoelen: [
      'Je weet welke persoonlijke informatie invloed heeft op jaarruimte.',
      'Je maakt onderscheid tussen jaarruimte en reserveringsruimte.',
      'Je begrijpt op hoofdlijnen dat belasting bij inleg en uitkering anders kan uitwerken.',
    ],
    onderdelen: [
      {
        kop: 'Jaarruimte is persoonlijk',
        tekst:
          'Jaarruimte hangt af van persoonlijke inkomens- en pensioengegevens en de fiscale regels van een bepaald jaar. Een algemeen voorbeeld vertelt niet hoeveel ruimte jij hebt.',
      },
      {
        kop: 'Reserveringsruimte',
        tekst:
          'Onder voorwaarden kan ongebruikte jaarruimte uit eerdere jaren meetellen als reserveringsruimte. Er gelden wettelijke grenzen en jaarregels; controleer daarom de actuele voorwaarden.',
      },
      {
        kop: 'Aftrek is geen vrijstelling',
        tekst:
          'Inleg in een daarvoor geschikt product kan binnen de voorwaarden aftrekbaar zijn. De uitkering is later doorgaans belast. Het gaat dus niet automatisch om belasting die helemaal verdwijnt.',
      },
      {
        kop: 'Welke vormen bestaan er?',
        tekst:
          'Een lijfrente kan bij een verzekeraar worden afgesloten of als bancaire lijfrente (banksparen) worden ingericht. Pensioenbeleggen is een manier om binnen een product vermogen voor later op te bouwen. Beschikbaarheid, risico, kosten, uitkering en fiscale behandeling hangen af van het product en de regels.',
      },
      {
        kop: 'Wanneer kan het interessant zijn?',
        tekst:
          'Zelf aanvullen kan het onderzoeken waard zijn als je weinig pensioen via werk verwacht en volgens de regels jaarruimte hebt. Denk eerst aan een passende buffer, betaalbare inleg en het risico van het product. Gebruik de Belastingdienst of een deskundige voor je persoonlijke fiscale berekening.',
      },
    ],
    onthouden:
      'Reken met het juiste belastingjaar en je eigen gegevens. Fiscale aftrek bij inleg betekent niet automatisch een belastingvrije uitkering.',
    vragen: [
      {
        id: 'aanvullen-jaarruimte',
        vraag: 'Welke uitspraak over jaarruimte is juist?',
        opties: [
          'De beschikbare ruimte hangt af van persoonlijke gegevens en de regels voor het betreffende jaar.',
          'Iedereen heeft elk jaar hetzelfde vaste bedrag.',
          'Jaarruimte is hetzelfde als het saldo op je werkgeverspensioen.',
        ],
        correct: 0,
        uitleg:
          'Jaarruimte is persoonlijk en hangt onder meer af van inkomens- en pensioengegevens en de regels van het jaar.',
      },
      {
        id: 'aanvullen-belasting',
        vraag: 'Wat betekent mogelijke aftrek van een pensioenstorting?',
        opties: [
          'De latere uitkering is daardoor altijd belastingvrij.',
          'Aftrek kan onder voorwaarden gelden; de latere uitkering is doorgaans belast.',
          'Elke storting is ongeacht product of ruimte aftrekbaar.',
        ],
        correct: 1,
        uitleg:
          'Eventuele aftrek is aan voorwaarden gebonden en betekent niet dat de latere uitkering automatisch belastingvrij is.',
      },
    ],
    verdieping: { href: '/leren/aanvullen', tekst: 'Lees meer over jaarruimte' },
  },
  {
    id: 'belasting-terug',
    nummer: '04',
    titel: 'Waarom krijg je terug of moet je bijbetalen?',
    duur: '4 minuten',
    intro:
      'Vergelijk wat er gedurende het jaar al is ingehouden met wat je volgens de jaarafrekening werkelijk verschuldigd bent.',
    leerdoelen: [
      'Je kunt een teruggave van een bijbetaling onderscheiden.',
      'Je begrijpt dat meerdere banen of inkomsten de voorheffing kunnen beïnvloeden.',
      'Je weet dat een teruggave geen cadeau is: er is eerder te veel vooruitbetaald.',
    ],
    onderdelen: [
      {
        kop: 'Je hebt te veel vooruitbetaald',
        tekst:
          'Stel dat je uiteindelijke belasting € 8.000 is en er al € 8.500 loonheffing is betaald. Het verschil van € 500 krijg je terug.',
      },
      {
        kop: 'Je hebt te weinig vooruitbetaald',
        tekst:
          'Is de uiteindelijke belasting € 8.000, maar is € 7.500 ingehouden? Dan betaal je € 500 bij. De aangifte vergelijkt bedragen; een uitkomst hangt af van je volledige situatie.',
      },
    ],
    onthouden:
      'Teruggave = meer vooruitbetaald dan verschuldigd. Bijbetalen = minder vooruitbetaald dan verschuldigd.',
    vragen: [
      {
        id: 'belasting-teruggave',
        vraag:
          'Je bent € 8.000 verschuldigd en er is € 8.500 ingehouden. Wat volgt uit deze simpele vergelijking?',
        opties: ['€ 500 terug.', '€ 500 bijbetalen.', 'Geen verschil.'],
        correct: 0,
        uitleg: 'Je had € 500 meer vooruitbetaald dan de uiteindelijke belasting in dit voorbeeld.',
      },
      {
        id: 'belasting-bijbetalen',
        vraag: 'Je bent € 8.000 verschuldigd en er is € 7.500 ingehouden.',
        opties: ['€ 500 bijbetalen.', '€ 500 terug.', 'Je werkgever betaalt de rest automatisch.'],
        correct: 0,
        uitleg: 'Het betaalde voorschot is € 500 lager dan de verschuldigde belasting.',
      },
    ],
    verdieping: {
      href: '/oefenen#simulator-teruggave',
      tekst: 'Probeer de belastingafrekening-simulator',
    },
  },
  {
    id: 'aow',
    nummer: '05',
    titel: 'AOW: verzekerd opbouwen, geen eigen pot',
    duur: '5 minuten',
    intro:
      'De AOW werkt hoofdzakelijk als een omslagstelsel: bijdragen en publieke middelen betalen mee aan AOW-uitkeringen van nu. De AOW is geen persoonlijke beleggingsrekening.',
    leerdoelen: [
      'Je begrijpt het omslagstelsel.',
      'Je herkent de vuistregel van 2% per verzekerd jaar in de opbouwperiode.',
      'Je weet wat wonen, werken en onverzekerde jaren met de opbouw te maken hebben.',
    ],
    onderdelen: [
      {
        kop: 'Geld voor AOW-uitkeringen van nu',
        tekst:
          'AOW-premies worden geheven via de inkomstenbelasting en het AOW-fonds wordt zo nodig ook uit algemene middelen aangevuld. De overheid, waaronder de SVB als uitvoerder, betaalt AOW aan mensen die er recht op hebben. Je eigen bijdrage gaat niet naar een apart potje op jouw naam.',
      },
      {
        kop: 'Opbouw volgt verzekering, niet hoeveel premie je betaalde',
        tekst:
          'Als vuistregel bouw je in de 50 jaar vóór je AOW-leeftijd per verzekerd jaar 2% van een volledige AOW op. 50 verzekerde jaren is 100%. Het gaat om verzekerde jaren: ook zonder inkomen kun je verzekerd zijn en opbouwen. Meer premie betalen geeft niet automatisch een hogere AOW.',
      },
      {
        kop: 'Wonen, werken, emigreren',
        tekst:
          'Wonen of werken in Nederland betekent vaak dat je verzekerd bent, maar persoonlijke omstandigheden en verdragen kunnen verschil maken. Emigreren kan je verzekeringssituatie veranderen; alleen jaren waarin je niet verzekerd bent kunnen je opbouw verlagen. Vrijwillig verzekeren kan onder voorwaarden. Vraag je eigen opbouw op bij de SVB.',
      },
    ],
    onthouden:
      'De AOW bouw je op door verzekerd te zijn, niet door een persoonlijke spaarrekening te vullen. Een niet-verzekerd jaar kan doorgaans 2% opbouw kosten.',
    vragen: [
      {
        id: 'aow-omslag',
        vraag: 'Wat bedoelen we met AOW als omslagstelsel?',
        opties: [
          'De financiering van lopende uitkeringen komt hoofdzakelijk uit huidige bijdragen en algemene middelen.',
          'Iedereen krijgt exact het bedrag van zijn eigen premies terug.',
          'AOW-premies worden uitsluitend in individuele aandelenpotjes belegd.',
        ],
        correct: 0,
        uitleg:
          'AOW is geen individueel beleggingscontract: huidige financiering ondersteunt uitkeringen van nu.',
      },
      {
        id: 'aow-opbouw',
        vraag: 'Wat bepaalt de opbouw van je AOW vooral?',
        opties: [
          'Het aantal jaren waarin je voor de AOW verzekerd was.',
          'Hoe hoog je salaris was in ieder gewerkt jaar.',
          'Hoeveel je zelf hebt belegd.',
        ],
        correct: 0,
        uitleg:
          'De opbouw hangt aan verzekerde jaren; veel premie betalen maakt de uitkering niet vanzelf hoger.',
      },
    ],
    verdieping: {
      href: '/oefenen#simulator-aow',
      tekst: 'Verken verzekerde jaren in de AOW-simulator',
    },
  },
  {
    id: 'sparen',
    nummer: '07',
    titel: 'Sparen, beleggen of pensioen opbouwen?',
    duur: '5 minuten',
    intro:
      'Deze keuzes kunnen naast elkaar bestaan. Ze verschillen onder meer in toegang tot geld, risico, regels en mogelijke belastinggevolgen.',
    leerdoelen: [
      'Je ziet het verschil tussen vrij spaargeld en geld in een pensioenregeling.',
      'Je weet dat beleggen kansen én risico’s geeft.',
      'Je kunt een doel noemen waarbij directe toegang tot spaargeld belangrijk is.',
    ],
    onderdelen: [
      {
        kop: 'Sparen: meestal directer beschikbaar',
        tekst:
          'Spaargeld op een rekening kun je doorgaans zelf opnemen. De rente kan laag zijn ten opzichte van inflatie. Vermogen kan meetellen voor box 3; de fiscale behandeling hangt af van de regels en je situatie.',
      },
      {
        kop: 'Beleggen: waarde schommelt',
        tekst:
          'Beleggingen kunnen op lange termijn groeien, maar koersen kunnen ook dalen. Je kunt geld verliezen en toekomstige opbrengsten zijn niet gegarandeerd. Kosten en spreiding zijn belangrijk.',
      },
      {
        kop: 'Pensioen: eigen regels en bestemming',
        tekst:
          'Werkgeverspensioen volgt de regeling van je werk. Een lijfrente of pensioenbeleggen valt onder product- en belastingregels. Geld kan minder vrij opneembaar zijn, maar er kunnen fiscale mogelijkheden gelden als aan voorwaarden wordt voldaan.',
      },
    ],
    onthouden:
      'Vergelijk niet alleen het verwachte rendement: kijk ook naar risico, kosten, toegang tot je geld, bescherming en fiscale voorwaarden.',
    vragen: [
      {
        id: 'sparen-toegang',
        vraag: 'Wat is een kenmerk van vrij spaargeld?',
        opties: [
          'Je kunt het doorgaans zelf opnemen; het kan wel relevant zijn voor box 3.',
          'Het is altijd gegarandeerd waardevast.',
          'Je kunt het nooit gebruiken vóór je pensioenleeftijd.',
        ],
        correct: 0,
        uitleg:
          'Vrij spaargeld is meestal toegankelijker, maar rente, inflatie en belasting spelen mee.',
      },
      {
        id: 'sparen-risico',
        vraag: 'Wat geldt voor beleggen?',
        opties: [
          'Rendement is onzeker; je kunt ook verlies lijden.',
          'Het rendement is wettelijk gegarandeerd.',
          'Beleggen is hetzelfde als geld op een spaarrekening zetten.',
        ],
        correct: 0,
        uitleg: 'Beleggingen schommelen in waarde en het resultaat staat niet vast.',
      },
    ],
    verdieping: {
      href: '/oefenen#vroeg-beginnen',
      tekst: 'Vergelijk starten op verschillende leeftijden',
    },
  },
  {
    id: 'box3',
    nummer: '08',
    titel: 'Box 3: waarom kijkt de overheid naar vermogen?',
    duur: '5 minuten',
    intro:
      'Eerst het idee: vermogen kan inkomen opleveren of economische ruimte geven. Box 3 is de belastingcategorie voor bepaalde bezittingen en schulden; de regels en berekening kunnen veranderen.',
    leerdoelen: [
      'Je kunt box 1, box 2 en box 3 grofweg uit elkaar houden.',
      'Je herkent bezittingen die mogelijk in box 3 vallen.',
      'Je weet dat pensioenvermogen en vrij vermogen niet zomaar hetzelfde worden behandeld.',
    ],
    onderdelen: [
      {
        kop: 'Drie boxen, drie soorten',
        tekst:
          'Box 1 gaat grofweg over inkomen zoals loon en uitkeringen. Box 2 gaat over inkomen uit een aanmerkelijk belang in een bedrijf. Box 3 gaat over sparen en beleggen en bepaalde andere bezittingen.',
      },
      {
        kop: 'Wat kan meetellen?',
        tekst:
          'Spaargeld, beleggingen, crypto en een tweede woning kunnen onder de box-3-regels vallen. De eigen woning valt meestal in box 1. Er bestaan uitzonderingen, vrijstellingen, schuldenregels en waarderingsregels; controleer altijd de actuele uitleg van de Belastingdienst.',
      },
      {
        kop: 'Waarom telt pensioen niet één-op-één als banktegoed?',
        tekst:
          'Pensioen in een regeling of een kwalificerende lijfrente heeft eigen juridische en fiscale regels en is niet hetzelfde als vrij opneembaar spaargeld. De precieze behandeling hangt af van het soort product.',
      },
    ],
    onthouden:
      'Box 3 gaat over bepaalde vermogensbestanddelen, niet simpelweg over elk bedrag dat je ooit bezit. De actuele regels bepalen de uitkomst.',
    vragen: [
      {
        id: 'box3-soort',
        vraag: 'Welke categorie hoort grofweg bij spaargeld en beleggingen?',
        opties: ['Box 3', 'Box 1', 'Box 2'],
        correct: 0,
        uitleg:
          'Box 3 gaat grofweg over sparen en beleggen; details en uitzonderingen zijn belangrijk.',
      },
      {
        id: 'box3-woning',
        vraag: 'Hoe zit het met een eigen woning?',
        opties: [
          'De eigen woning valt meestal in box 1; een tweede woning kan anders worden behandeld.',
          'Alle woningen vallen altijd in box 3.',
          'Een tweede woning is altijd belastingvrij.',
        ],
        correct: 0,
        uitleg:
          'De eigen woning en een tweede woning hebben verschillende regels; controleer je eigen situatie.',
      },
    ],
    verdieping: {
      href: '/oefenen#simulator-box3',
      tekst: 'Sorteer bezittingen in de box-3-oefening',
    },
  },
  {
    id: 'sociale-zekerheid',
    nummer: '09',
    titel: 'Sociale zekerheid: volg wie betaalt en uitvoert',
    duur: '7 minuten',
    intro:
      'Sociale zekerheid is geen enkele geldpot. Premies, begrotingsgeld en uitvoeringsorganisaties verschillen per regeling. Volg steeds de route en kijk wie uiteindelijk recht heeft op een voorziening.',
    leerdoelen: [
      'Je kunt betaler, inning, fonds, uitvoerder en ontvanger onderscheiden.',
      'Je herkent verschillende taken van SVB, UWV, gemeenten, verzekeraars en CAK.',
      'Je begrijpt dat een geldstroom per regeling verschilt.',
    ],
    onderdelen: [
      {
        kop: 'Voorbeelden van regelingen',
        tekst:
          'AOW en Anw worden uitgevoerd door de SVB. WW, WIA en veel Wajong-taken lopen via UWV. Bijstand wordt door gemeenten uitgevoerd. Kinderbijslag loopt via de SVB. De Wlz heeft eigen premie-, inning- en uitvoeringsrollen; het CAK is betrokken bij bijdragen. Zorgverzekeraars voeren de zorgverzekering uit; werkgeversheffing en nominale zorgpremie zijn verschillende stromen.',
      },
      {
        kop: 'Volg de route, maar plak geen universeel schema op alles',
        tekst:
          'Bij een werknemersverzekering kunnen werkgeverspremies worden geïnd en kan UWV uitvoeren. Bij een volksverzekering kan belastinginning en publieke financiering meespelen. Wie ontvangt, is iemand die volgens de regeling aan de voorwaarden voldoet. Niet elke regeling heeft één eigen fonds of dezelfde financiering.',
      },
      {
        kop: 'Een handig rijtje vragen',
        tekst:
          'Wie draagt bij? Wie int het bedrag? Is er een fonds of komt geld uit de begroting? Wie voert de regeling uit? Wie kan een uitkering of zorg ontvangen? Deze vragen maken beleid en je loonstrook begrijpelijker.',
      },
    ],
    onthouden:
      'AOW, WW, WIA, Wlz, Zvw en bijstand hebben niet dezelfde betaler, inning, fonds of uitvoerder.',
    vragen: [
      {
        id: 'social-ww',
        vraag: 'Welke organisatie voert de WW in hoofdzaak uit?',
        opties: ['UWV', 'SVB', 'Je pensioenfonds'],
        correct: 0,
        uitleg: 'De WW is een werknemersverzekering die door UWV wordt uitgevoerd.',
      },
      {
        id: 'social-bijstand',
        vraag: 'Wie voert de bijstand doorgaans uit?',
        opties: ['De gemeente', 'Een bedrijfstakpensioenfonds', 'De zorgverzekeraar'],
        correct: 0,
        uitleg: 'Gemeenten voeren de bijstand uit volgens de geldende regels.',
      },
    ],
    verdieping: { href: '/pensioen', tekst: 'Bekijk hoe organisaties verschillende rollen hebben' },
  },
  {
    id: 'geldstromen-nederland',
    nummer: '10',
    titel: 'Geldstromen door Nederland',
    duur: '5 minuten',
    intro:
      'Huishoudens, werkgevers, bedrijven en consumenten betalen belastingen en premies. De overheid verdeelt publieke middelen via begrotingen en regelingen; het is geen route van één werknemer naar één specifieke publieke dienst.',
    leerdoelen: [
      'Je herkent waar belastingen en premies vandaan kunnen komen.',
      'Je begrijpt waarom één euro niet op je loonstrook naar één dienst te volgen is.',
      'Je kunt enkele voorbeelden noemen van publieke uitgaven.',
    ],
    onderdelen: [
      {
        kop: 'Geld komt van meer dan werknemers',
        tekst:
          'Overheidsinkomsten komen onder meer uit belastingen en premies van huishoudens en bedrijven. De precieze bron hangt af van de belasting of regeling.',
      },
      {
        kop: 'De begroting verdeelt publieke middelen',
        tekst:
          'Publieke uitgaven gaan onder meer naar zorg, onderwijs, gemeenten, defensie, wegen, veiligheid, sociale zekerheid en toeslagen. Belastinggeld gaat doorgaans naar gezamenlijke middelen; je kunt niet één loonheffingseuro rechtstreeks aan één school of weg koppelen.',
      },
      {
        kop: 'Ook geld buiten de overheid stroomt',
        tekst:
          'Pensioenpremies gaan naar de pensioenuitvoerder van de regeling. Zorgpremies gaan via hun eigen routes. Niet alle inhoudingen op een loonstrook zijn dus algemene belasting.',
      },
    ],
    onthouden:
      'Publieke inkomsten worden samengevoegd en via begrotingen en regelingen besteed; een euro is niet individueel geoormerkt.',
    vragen: [
      {
        id: 'geldstroom-euro',
        vraag: 'Kun je meestal één euro loonheffing rechtstreeks aan één weg of school koppelen?',
        opties: [
          'Nee, publieke inkomsten worden samengevoegd en via begrotingen besteed.',
          'Ja, iedere loonstrook heeft eigen projectnummers.',
          'Ja, loonheffing gaat alleen naar wegen.',
        ],
        correct: 0,
        uitleg:
          'Belastingen financieren gezamenlijk publieke taken; de koppeling is niet individueel per euro.',
      },
      {
        id: 'geldstroom-premie',
        vraag: 'Gaat iedere looninhouding naar de staatskas?',
        opties: [
          'Nee, bijvoorbeeld pensioenpremie heeft een andere bestemming dan loonheffing.',
          'Ja, alle inhoudingen zijn belasting.',
          'Nee, loonheffing gaat rechtstreeks naar een pensioenfonds.',
        ],
        correct: 0,
        uitleg:
          'Een loonstrook kan belastingen, premies en pensioenbijdragen tonen met verschillende doelen.',
      },
    ],
    verdieping: { href: '/pensioen', tekst: 'Bekijk een interactieve kaart met geldstromen' },
  },
  {
    id: 'sectoren',
    nummer: '11',
    titel: 'Wie hoort bij welke CBS-sector?',
    duur: '5 minuten',
    intro:
      'Het CBS deelt instellingen voor statistieken in vijf institutionele sectoren in. Die indeling helpt geldstromen in de economie te beschrijven; het is geen dagelijkse naam voor een organisatie.',
    leerdoelen: [
      'Je herkent de vijf sectorcodes S.11 tot en met S.15.',
      'Je kunt overheidsinstellingen onderscheiden van financiële instellingen.',
      'Je weet dat de institutionele sectorindeling geen uitvoerder of betaler aanwijst.',
    ],
    onderdelen: [
      {
        kop: 'De vijf sectoren',
        tekst:
          'S.11 niet-financiële vennootschappen; S.12 financiële instellingen; S.13 overheid; S.14 huishoudens; S.15 instellingen zonder winstoogmerk ten behoeve van huishoudens.',
      },
      {
        kop: 'Voorbeelden goed plaatsen',
        tekst:
          'Een doorsnee werkgever valt vaak onder S.11; banken, verzekeraars en pensioenfondsen onder S.12; ministeries, gemeenten, UWV en SVB behoren tot de overheidssfeer S.13. Huishoudens zijn S.14 en zelfstandige non-profitorganisaties voor huishoudens kunnen S.15 zijn. Het CBS bepaalt de precieze indeling op basis van institutionele kenmerken.',
      },
      {
        kop: 'Waarom pensioenfondsen S.12 zijn',
        tekst:
          'Pensioenfondsen beheren financiële aanspraken en worden in de nationale rekeningen doorgaans als financiële instellingen (S.12) geclassificeerd. Dat ze een maatschappelijke of wettelijke taak hebben, maakt ze niet automatisch onderdeel van de overheid (S.13).',
      },
    ],
    onthouden:
      'Een pensioenfonds is in de nationale rekeningen doorgaans S.12; een uitvoerder is niet automatisch een overheidsinstelling.',
    vragen: [
      {
        id: 'sector-pensioen',
        vraag: 'Bij welke institutionele sector worden pensioenfondsen doorgaans ingedeeld?',
        opties: ['S.12 financiële instellingen', 'S.13 overheid', 'S.14 huishoudens'],
        correct: 0,
        uitleg:
          'Pensioenfondsen worden in de nationale rekeningen doorgaans tot S.12 gerekend, niet automatisch tot S.13.',
      },
      {
        id: 'sector-huishouden',
        vraag: 'Welke code staat voor huishoudens?',
        opties: ['S.14', 'S.11', 'S.15'],
        correct: 0,
        uitleg:
          'S.14 is de sector huishoudens; S.15 staat voor non-profitinstellingen voor huishoudens.',
      },
    ],
    verdieping: { href: '/oefenen#oefening-sectoren', tekst: 'Oefen met organisaties en sectoren' },
  },
]

const lesVolgorde = [
  'geldstromen',
  'loonstrook',
  'belasting-terug',
  'aow',
  'pijlers',
  'aanvullen',
  'sparen',
  'box3',
  'sociale-zekerheid',
  'geldstromen-nederland',
  'sectoren',
]

export const lessen = lessenInVolgorde
  .map((les) => {
    const nummer = String(lesVolgorde.indexOf(les.id) + 1).padStart(2, '0')
    return { ...les, nummer }
  })
  .sort((a, b) => lesVolgorde.indexOf(a.id) - lesVolgorde.indexOf(b.id))
