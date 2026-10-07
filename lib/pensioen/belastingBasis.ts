export type BelastingBasisHoofdstuk = {
  id: string
  titel: string
  vraag: string
  uitleg: string[]
  onthouden: string
  vraagCheck: string
  opties: string[]
  juist: number
  feedback: string
  visual:
    | 'voorzieningen'
    | 'loonstrook'
    | 'loonheffing'
    | 'tijdlijn'
    | 'aangifte'
    | 'bakken'
    | 'box1'
    | 'woning'
    | 'box2'
    | 'box3'
    | 'vergelijking'
    | 'routes'
    | 'profiel'
}

export const belastingBasisHoofdstukken: BelastingBasisHoofdstuk[] = [
  {
    id: 'waarom-belasting',
    titel: 'Waarom betaal ik belasting?',
    vraag: 'Waarom gaat er eigenlijk geld van mijn salaris af?',
    uitleg: [
      'Samen betalen we voorzieningen die we met elkaar gebruiken of nodig kunnen hebben. Denk aan scholen, wegen, politie, zorg en hulp als iemand niet kan werken.',
      'Belastingen komen samen met andere inkomsten in publieke middelen. De overheid maakt begrotingen voor publieke taken. Je kunt dus niet één euro van je loonstrook aanwijzen als “mijn euro voor de politie”.',
    ],
    onthouden: 'Belasting is een gezamenlijke bijdrage aan publieke voorzieningen en taken.',
    vraagCheck: 'Waarom betalen we belasting?',
    opties: [
      'Om samen publieke voorzieningen te betalen.',
      'Iedereen krijgt precies evenveel terug.',
      'Het is een persoonlijke spaarpot.',
    ],
    juist: 0,
    feedback:
      'Belastingen financieren samen met andere inkomsten publieke taken; het is geen persoonlijke spaarpot.',
    visual: 'voorzieningen',
  },
  {
    id: 'eerste-loonstrook',
    titel: 'Mijn eerste loonstrook',
    vraag: 'Wat gebeurt er tussen brutoloon en nettoloon?',
    uitleg: [
      'Brutoloon is het loon vóór inhoudingen. Op je loonstrook zie je onder meer loonheffing en mogelijk je eigen bijdrage aan pensioen.',
      'De bedragen hieronder zijn een eenvoudig voorbeeld: € 3.000 bruto min € 700 loonheffing en € 150 pensioenpremie geeft € 2.150 netto. Jouw loonstrook kan anders zijn.',
      'Klik op een regel om te zien wat het bedrag betekent. De bijdrage voor werknemersverzekeringen en de werkgeversheffing Zvw zijn meestal werkgeverslasten, niet dezelfde inhouding als jouw loonheffing.',
    ],
    onthouden: 'Loonheffing en werknemersbijdrage pensioen zijn twee verschillende inhoudingen.',
    vraagCheck: 'In dit voorbeeld, wat is het nettoloon?',
    opties: ['€ 2.150', '€ 2.300', '€ 3.000'],
    juist: 0,
    feedback: '€ 3.000 − € 700 − € 150 = € 2.150 netto.',
    visual: 'loonstrook',
  },
  {
    id: 'wat-is-loonheffing',
    titel: 'Wat is loonheffing?',
    vraag: 'Het woord klinkt als één belasting. Wat zit er achter?',
    uitleg: [
      'Loonheffing is het bedrag dat je werkgever op je loonstrook inhoudt en afdraagt. Het bestaat bij veel werknemers uit loonbelasting en premies volksverzekeringen, zoals AOW, Anw en Wlz. De precieze inhouding hangt af van je situatie.',
      'Niet alles wat met werk te maken heeft, is loonheffing. Premies voor werknemersverzekeringen en de werkgeversheffing Zvw zijn doorgaans lasten van de werkgever. Een pensioenbijdrage staat ook apart.',
    ],
    onthouden:
      'Loonheffing is een inhouding op je loon; werknemersverzekeringspremies zijn doorgaans werkgeverslasten.',
    vraagCheck: 'Welke omschrijving klopt het best?',
    opties: [
      'Loonheffing is een inhouding met loonbelasting en vaak premies volksverzekeringen.',
      'Alle werkgeverspremies staan als loonheffing op je nettoloon.',
      'Loonheffing is hetzelfde als je pensioenpremie.',
    ],
    juist: 0,
    feedback:
      'Loonheffing omvat loonbelasting en (afhankelijk van je situatie) premies volksverzekeringen; andere werkgeverslasten zijn iets anders.',
    visual: 'loonheffing',
  },
  {
    id: 'inkomstenbelasting',
    titel: 'Wat is inkomstenbelasting?',
    vraag: 'Wat rekent de Belastingdienst na afloop van het jaar uit?',
    uitleg: [
      'Inkomstenbelasting is de belasting die je uiteindelijk over je belastbare inkomen verschuldigd bent. De berekening kijkt naar het hele jaar en naar gegevens die voor jou meetellen.',
      'Je werkgever houdt gedurende het jaar loonheffing in. De loonbelasting daarin is meestal een voorheffing op de inkomstenbelasting. Bij de aangifte wordt vooruitbetaald bedrag vergeleken met de uiteindelijke berekening.',
    ],
    onthouden:
      'Loonheffing wordt alvast ingehouden; inkomstenbelasting is de uiteindelijke berekening over je situatie.',
    vraagCheck: 'Welke zin beschrijft de verhouding goed?',
    opties: [
      'Loonheffing is meestal een voorschot; inkomstenbelasting is de uiteindelijke afrekening.',
      'Inkomstenbelasting wordt alleen door werkgevers betaald.',
      'Loonheffing is altijd exact gelijk aan de eindafrekening.',
    ],
    juist: 0,
    feedback:
      'De inhouding is een voorschot en kan afwijken van wat na de aangifte verschuldigd blijkt.',
    visual: 'tijdlijn',
  },
  {
    id: 'terug-of-bijbetalen',
    titel: 'Waarom krijg ik geld terug of moet ik bijbetalen?',
    vraag: 'Hoe kan ik geld terugkrijgen als ik nooit iets heb overgemaakt?',
    uitleg: [
      'Je werkgever heeft gedurende het jaar loonheffing namens jou afgedragen. Dat vooruitbetaalde bedrag wordt bij de aangifte vergeleken met de uiteindelijke belasting.',
      'Is er te veel vooruitbetaald, dan kan geld terugkomen. Is er te weinig vooruitbetaald, dan kan je moeten bijbetalen. Een teruggave is dus geen cadeau, maar een verschil in de afrekening.',
    ],
    onthouden:
      'Teruggave of bijbetaling is het verschil tussen vooruitbetaalde loonheffing en de eindafrekening.',
    vraagCheck: 'Er is € 8.000 verschuldigd en € 8.500 ingehouden. Wat is het voorbeeldresultaat?',
    opties: ['€ 500 terug', '€ 500 bijbetalen', 'Geen verschil'],
    juist: 0,
    feedback:
      'Er is € 500 meer betaald dan verschuldigd. Met € 7.500 ingehouden zou je in dit voorbeeld € 500 moeten bijbetalen.',
    visual: 'tijdlijn',
  },
  {
    id: 'waarom-aangifte',
    titel: 'Waarom doe ik aangifte?',
    vraag: 'Waarom weet de werkgever niet meteen alles voor de eindafrekening?',
    uitleg: [
      'Je werkgever kent je salaris bij die werkgever en houdt daarmee rekening bij de loonheffing. Maar de werkgever weet niet automatisch alles over je jaar.',
      'Andere inkomsten, de eigen woning, aftrekposten, vermogen en persoonlijke omstandigheden kunnen ook meetellen. In de aangifte controleer en vul je de gegevens aan. Niet iedereen hoeft altijd zelf aangifte te doen; volg de uitnodiging en informatie van de Belastingdienst.',
    ],
    onthouden:
      'De aangifte brengt gegevens van je hele jaar bij elkaar; je loonstrook laat vooral loon bij één werkgever zien.',
    vraagCheck: 'Waarom kan de aangifte afwijken van de inhouding op één loonstrook?',
    opties: [
      'De aangifte kan meer gegevens over het hele jaar meenemen.',
      'De werkgever kent automatisch al je vermogen.',
      'De aangifte verandert je brutoloon.',
    ],
    juist: 0,
    feedback:
      'De aangifte kijkt naar je totale situatie; één werkgever ziet niet vanzelf al je andere gegevens.',
    visual: 'aangifte',
  },
  {
    id: 'drie-boxen',
    titel: 'De drie boxen',
    vraag: 'Waarom verdeelt de belastingaangifte inkomsten en bezit in boxen?',
    uitleg: [
      'Denk aan drie bakken met verschillende soorten inkomen en bezit. Box 1 gaat vooral over werk en de eigen woning, box 2 over een aanmerkelijk belang in een bedrijf, en box 3 over sparen en beleggen.',
      'De regels en berekeningen verschillen per bak. De bakken zijn een hulpmiddel om te begrijpen waar iets thuishoort, niet drie bankrekeningen.',
    ],
    onthouden: 'Box 1: werk en eigen woning. Box 2: aanmerkelijk belang. Box 3: vermogen.',
    vraagCheck: 'In welke box zit spaargeld meestal?',
    opties: ['Box 3', 'Box 1', 'Box 2'],
    juist: 0,
    feedback:
      'Spaargeld valt doorgaans in box 3. Er bestaan uitzonderingen en bijzondere situaties.',
    visual: 'bakken',
  },
  {
    id: 'box1-werk-woning',
    titel: 'Box 1: werk en woning',
    vraag: 'Welke inkomsten herken je meestal in box 1?',
    uitleg: [
      'Box 1 heet “inkomen uit werk en woning”. Voorbeelden zijn salaris, AOW, pensioen, uitkering, winst uit onderneming en freelance-inkomsten.',
      'Ook de eigen woning waarin je hoofdverblijf hebt, valt meestal onder de regels van box 1. Een tweede woning of beleggingspand wordt meestal anders behandeld.',
    ],
    onthouden:
      'Gewoon inkomen uit werk en uitkering valt meestal in box 1; de eigen woning heeft eigen regels.',
    vraagCheck: 'Waar valt salaris meestal onder?',
    opties: ['Box 1', 'Box 2', 'Box 3'],
    juist: 0,
    feedback: 'Salaris is inkomen uit werk en valt doorgaans in box 1.',
    visual: 'box1',
  },
  {
    id: 'eigen-woning',
    titel: 'De eigen woning',
    vraag: 'Waarom staat je eigen huis meestal niet in box 3?',
    uitleg: [
      'De woning waarin je zelf woont en die je hoofdverblijf is, valt meestal in box 1. Daarbij kan een eigenwoningforfait meetellen bij je inkomen.',
      'Betaalde rente op een eigenwoningschuld kan onder voorwaarden aftrekbaar zijn. De uitkomst hangt onder meer af van de lening, de woning en de actuele regels. Een tweede woning waarin je niet zelf woont, valt doorgaans in box 3.',
    ],
    onthouden:
      'Eigen hoofdwoning: meestal box 1. Een tweede woning: meestal box 3. Situatie en voorwaarden tellen.',
    vraagCheck: 'Welke woning valt meestal in box 1?',
    opties: [
      'De eigen hoofdwoning waarin je zelf woont.',
      'Een vakantiewoning die je verhuurt.',
      'Een beleggingspand naast je eigen huis.',
    ],
    juist: 0,
    feedback:
      'De eigen woning als hoofdverblijf valt meestal in box 1; een tweede woning doorgaans in box 3.',
    visual: 'woning',
  },
  {
    id: 'box2-bv',
    titel: 'Box 2: een groter belang in een BV',
    vraag: 'Wanneer kan box 2 voor jou relevant zijn?',
    uitleg: [
      'Box 2 gaat over inkomen uit een aanmerkelijk belang, bijvoorbeeld dividend of verkoopwinst op aandelen in een BV. Een aanmerkelijk belang is doorgaans minstens 5% van de aandelen, of een vergelijkbaar belang.',
      'Voor de meeste mensen zonder zo’n belang is box 2 niet van toepassing. De precieze toets kent meer regels, bijvoorbeeld voor bepaalde rechten en familie- of partnerposities.',
    ],
    onthouden:
      'Box 2 gaat om inkomen uit een aanmerkelijk belang in een vennootschap, niet om gewoon salaris.',
    vraagCheck: 'Wat is in een eenvoudige voorbeeldsituatie een aanwijzing voor box 2?',
    opties: [
      'Je bezit 10% van de aandelen van een BV.',
      'Je hebt een gewone spaarrekening.',
      'Je ontvangt loon van een werkgever.',
    ],
    juist: 0,
    feedback:
      'Een belang van 5% of meer is vaak een aanmerkelijk belang; de volledige regels kunnen complexer zijn.',
    visual: 'box2',
  },
  {
    id: 'box3-vermogen',
    titel: 'Box 3: vermogen',
    vraag: 'Welke bezittingen vallen meestal in box 3?',
    uitleg: [
      'Box 3 gaat over vermogen, zoals spaargeld en beleggingen. Ook crypto en een tweede woning kunnen erbij horen. Niet elk bezit wordt altijd op dezelfde manier behandeld.',
      'Je salaris is inkomen uit werk en hoort meestal bij box 1; het spaargeld dat je hebt opgebouwd kan onder de box-3-regels vallen. Hoeveel belasting verschuldigd is hangt af van de wettelijke regels, schulden, vrijstellingen en je situatie.',
    ],
    onthouden:
      'Box 3 gaat meestal over vermogen, niet over je gewone salaris. De regels kunnen veranderen.',
    vraagCheck: 'Wat valt meestal in box 3?',
    opties: [
      'Spaargeld en beleggingen.',
      'Je gewone salaris.',
      'De eigen woning waarin je hoofdverblijf is.',
    ],
    juist: 0,
    feedback:
      'Spaargeld en beleggingen vallen doorgaans in box 3; salaris en de eigen hoofdwoning meestal in box 1.',
    visual: 'box3',
  },
  {
    id: 'sparen-beleggen',
    titel: 'Sparen en beleggen',
    vraag: 'Wat is het belangrijkste verschil tussen sparen en beleggen?',
    uitleg: [
      'Spaargeld is doorgaans makkelijker beschikbaar en schommelt niet dagelijks mee met de beurs. De rente kan laag zijn en koopkracht kan door inflatie dalen.',
      'Beleggingen kunnen op lange termijn meer opleveren, maar de waarde kan ook dalen. Rendement is onzeker. Een voorbeeldberekening voorspelt niet wat er echt gebeurt en zegt niet wat voor jou geschikt is.',
    ],
    onthouden:
      'Meer mogelijk rendement betekent ook risico op verlies; beleggen kent geen gegarandeerde uitkomst.',
    vraagCheck: 'Welke uitspraak over beleggen is juist?',
    opties: [
      'De waarde kan stijgen én dalen; rendement is onzeker.',
      'Beleggen levert altijd meer op dan sparen.',
      'Beleggingen zijn altijd direct beschikbaar zonder koersrisico.',
    ],
    juist: 0,
    feedback: 'Beleggen brengt risico mee; de uiteindelijke waarde kan hoger of lager uitvallen.',
    visual: 'vergelijking',
  },
  {
    id: 'box3-en-pensioen',
    titel: 'Box 3 en pensioen: vier routes voor je geld',
    vraag: 'Wat kun je doen met geld dat je niet direct uitgeeft?',
    uitleg: [
      'Je kunt geld uitgeven, op een spaarrekening zetten, zelf beleggen of via een pensioenproduct voor later opbouwen. De routes verschillen in beschikbaarheid, risico, belastingregels en pensioenbestemming.',
      'Vrij sparen en beleggen vallen meestal onder box 3. Pensioen via werk hoort bij pijler 2; een kwalificerend lijfrente- of pensioenproduct kan onder voorwaarden bij pijler 3 horen en kent andere fiscale regels. Controleer altijd de voorwaarden.',
    ],
    onthouden:
      'Vrij vermogen en geblokkeerde pensioenopbouw zijn niet dezelfde route; beschikbaarheid en belastingregels verschillen.',
    vraagCheck: 'Wat kan verschillen tussen vrij sparen en pensioenbeleggen?',
    opties: [
      'Beschikbaarheid en fiscale voorwaarden.',
      'Bij pensioenbeleggen is rendement altijd gegarandeerd.',
      'Spaargeld is altijd een pensioenproduct.',
    ],
    juist: 0,
    feedback:
      'Pensioenproducten hebben eigen voorwaarden en zijn vaak minder vrij opneembaar; rendement is niet gegarandeerd.',
    visual: 'routes',
  },
  {
    id: 'salaris-naar-vermogen',
    titel: 'Van salaris naar vermogen',
    vraag: 'Hoe kan hetzelfde nettoloon verschillende toekomstroutes nemen?',
    uitleg: [
      'Na loonheffing houd je nettoloon over. Wat je uitgeeft is niet meer beschikbaar om op te bouwen. Wat je spaart of zelf belegt blijft meestal vrij vermogen en kan onder box 3 vallen.',
      'Premies voor pensioen via werk bouwen op binnen pijler 2. Zelf pensioen opbouwen via een geschikt product kan pijler 3 zijn. Elke route heeft eigen risico’s, regels en toegangsmomenten.',
    ],
    onthouden:
      'Nettoloon kan naar uitgaven, vrij vermogen of pensioenopbouw gaan; dat zijn verschillende keuzes.',
    vraagCheck: 'Welke route bouwt meestal pensioen op via je werkgever?',
    opties: ['Pijler 2.', 'Box 2.', 'De gewone betaalrekening.'],
    juist: 0,
    feedback:
      'Pijler 2 is werkgeverspensioen. Gewoon vrij sparen is niet automatisch pensioenopbouw.',
    visual: 'routes',
  },
  {
    id: 'jouw-belastingroute',
    titel: 'Eindopdracht: jouw belastingroute',
    vraag: 'Welke boxen kunnen in jouw situatie een rol spelen?',
    uitleg: [
      'Gebruik de vragen hieronder om een eerste overzicht te maken. Je ziet welke boxen mogelijk relevant zijn en welke informatie je kunt controleren op je loonstrook en aangifte.',
      'Dit is een leerhulp, geen belastingberekening. Er wordt geen belastingtarief toegepast en jouw gegevens worden niet opgeslagen. De uitkomst is afhankelijk van actuele regels en je volledige situatie.',
    ],
    onthouden:
      'Een eerste overzicht helpt je betere vragen te stellen; het vervangt je aangifte of persoonlijk advies niet.',
    vraagCheck: 'Wat moet je doen met een uitkomst uit deze leerhulp?',
    opties: [
      'Gebruiken als startpunt en persoonlijke gegevens controleren.',
      'Beschouwen als definitieve belastingaanslag.',
      'Aannemen dat uitzonderingen niet bestaan.',
    ],
    juist: 0,
    feedback: 'De simulator is een educatieve wegwijzer, geen fiscale berekening.',
    visual: 'profiel',
  },
]
