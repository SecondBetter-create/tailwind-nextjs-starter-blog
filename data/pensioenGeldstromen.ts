export type Perspectief = 'werknemer' | 'werkgever'

export type NodeSoort =
  'betaler' | 'premie' | 'inning' | 'fonds' | 'uitvoerder' | 'uitkering' | 'pensioen'

export type GeldstroomNode = {
  id: string
  titel: string
  korteTitel?: string
  subtitel: string
  uitleg: string
  soort: NodeSoort
  perspectief: Perspectief[]
  details: string[]
  volgendeIds: string[]
}

export const pensioenGeldstromen: GeldstroomNode[] = [
  {
    id: 'werknemer',
    titel: 'Werknemer',
    subtitel: 'Ontvangt brutoloon waarop bedragen kunnen worden ingehouden.',
    uitleg:
      'Van het brutoloon kunnen onder andere loonheffing en de werknemersbijdrage voor het pensioen worden ingehouden. Niet iedere betaling volgt daarna dezelfde route.',
    soort: 'betaler',
    perspectief: ['werknemer'],
    details: [
      'Ontvangt brutoloon van de werkgever.',
      'Loonheffing kan op het loon worden ingehouden.',
      'Een werknemersdeel van de pensioenpremie kan worden ingehouden.',
      'Premies voor werknemersverzekeringen zijn in beginsel werkgeverspremies.',
    ],
    volgendeIds: ['loonheffing', 'volksverzekeringen', 'pensioenpremie-werknemer'],
  },

  {
    id: 'werkgever',
    titel: 'Werkgever',
    subtitel: 'Houdt bedragen in en betaalt eigen werkgeverslasten.',
    uitleg:
      'De werkgever verwerkt de loonheffingen, betaalt werkgeverspremies en draagt pensioenpremies af aan de pensioenuitvoerder.',
    soort: 'betaler',
    perspectief: ['werkgever'],
    details: [
      'Houdt loonheffing in op het loon.',
      'Betaalt premies voor werknemersverzekeringen.',
      'Betaalt in veel gevallen een werkgeversheffing voor de Zvw.',
      'Draagt pensioenpremies af aan de pensioenuitvoerder.',
    ],
    volgendeIds: ['werknemersverzekeringen', 'zvw-werkgeversheffing', 'pensioenpremie-werkgever'],
  },

  {
    id: 'loonheffing',
    titel: 'Loonheffing',
    subtitel: 'Loonbelasting en premies volksverzekeringen.',
    uitleg:
      'Loonheffing is de verzamelnaam voor loonbelasting en premies voor de volksverzekeringen. De werkgever houdt de loonheffing in en verwerkt deze in de loonaangifte.',
    soort: 'premie',
    perspectief: ['werknemer'],
    details: [
      'Wordt berekend over het loon.',
      'Wordt door de werkgever ingehouden.',
      'Omvat loonbelasting en premies volksverzekeringen.',
      'Wordt via de werkgever aan de Belastingdienst afgedragen.',
    ],
    volgendeIds: ['belastingdienst'],
  },

  {
    id: 'volksverzekeringen',
    titel: 'Premies volksverzekeringen',
    subtitel: 'AOW, Anw en Wlz.',
    uitleg:
      'De volksverzekeringen zijn landelijke sociale verzekeringen. De premies worden samen met de loonbelasting verwerkt in de loonheffing.',
    soort: 'premie',
    perspectief: ['werknemer'],
    details: [
      'AOW: ouderdomsvoorziening.',
      'Anw: voorziening voor nabestaanden.',
      'Wlz: verzekering voor langdurige zorg.',
      'De premieheffing loopt via de Belastingdienst.',
    ],
    volgendeIds: ['aow-premie', 'anw-premie', 'wlz-premie'],
  },

  {
    id: 'aow-premie',
    titel: 'AOW-premie',
    subtitel: 'Financiering van de wettelijke ouderdomsvoorziening.',
    uitleg:
      'De AOW werkt niet met een persoonlijke pensioenpot. Het is een wettelijke basisvoorziening waarbij lopende premie- en belastinginkomsten worden gebruikt om de huidige AOW-uitkeringen te financieren.',
    soort: 'premie',
    perspectief: ['werknemer'],
    details: [
      'Onderdeel van de volksverzekeringen.',
      'Geen individuele pensioen- of beleggingsrekening.',
      'De SVB voert de AOW uit.',
      'De AOW vormt de eerste pensioenpijler.',
    ],
    volgendeIds: ['belastingdienst'],
  },

  {
    id: 'anw-premie',
    titel: 'Anw-premie',
    subtitel: 'Volksverzekering voor nabestaanden.',
    uitleg:
      'De Anw biedt onder voorwaarden een wettelijke nabestaandenvoorziening. De uitvoering ligt bij de Sociale Verzekeringsbank.',
    soort: 'premie',
    perspectief: ['werknemer'],
    details: [
      'Onderdeel van de volksverzekeringen.',
      'Gericht op bepaalde nabestaanden.',
      'Er gelden wettelijke voorwaarden.',
      'De SVB beoordeelt het recht en verzorgt de uitvoering.',
    ],
    volgendeIds: ['belastingdienst'],
  },

  {
    id: 'wlz-premie',
    titel: 'Wlz-premie',
    subtitel: 'Volksverzekering voor langdurige zorg.',
    uitleg:
      'De Wlz is bedoeld voor mensen die blijvend intensieve zorg of permanent toezicht nodig hebben. De premie wordt als onderdeel van de volksverzekeringen geheven.',
    soort: 'premie',
    perspectief: ['werknemer'],
    details: [
      'Onderdeel van de volksverzekeringen.',
      'Gericht op langdurige en intensieve zorg.',
      'De premie loopt via de loonheffing.',
      'De Wlz is geen pensioenvoorziening.',
    ],
    volgendeIds: ['belastingdienst'],
  },

  {
    id: 'werknemersverzekeringen',
    titel: 'Werknemersverzekeringen',
    subtitel: 'Verzekeringen voor werknemers bij werkloosheid, ziekte en arbeidsongeschiktheid.',
    uitleg:
      'Werknemersverzekeringen bieden werknemers onder voorwaarden bescherming bij onder andere werkloosheid, ziekte en arbeidsongeschiktheid.',
    soort: 'premie',
    perspectief: ['werkgever'],
    details: [
      'WW: verzekering bij werkloosheid.',
      'ZW: uitkering bij ziekte in bepaalde situaties.',
      'WIA: verzekering bij langdurige arbeidsongeschiktheid.',
      'De werkgever betaalt hiervoor werkgeverspremies.',
    ],
    volgendeIds: ['ww', 'zw', 'wia'],
  },

  {
    id: 'ww',
    titel: 'WW',
    korteTitel: 'WW',
    subtitel: 'Werkloosheidswet.',
    uitleg:
      'De WW kan onder voorwaarden tijdelijk inkomen bieden wanneer een werknemer geheel of gedeeltelijk werkloos raakt.',
    soort: 'premie',
    perspectief: ['werkgever'],
    details: [
      'Werknemersverzekering.',
      'Gericht op werkloosheid.',
      'De premie wordt door de werkgever betaald.',
      'De uitvoering ligt bij het UWV.',
    ],
    volgendeIds: ['belastingdienst'],
  },

  {
    id: 'zw',
    titel: 'Ziektewet',
    korteTitel: 'ZW',
    subtitel: 'Inkomen bij ziekte in bepaalde situaties.',
    uitleg:
      'De Ziektewet kan onder voorwaarden een uitkering bieden wanneer geen werkgever verantwoordelijk is voor de normale loondoorbetaling tijdens ziekte.',
    soort: 'premie',
    perspectief: ['werkgever'],
    details: [
      'Werknemersverzekering.',
      'Niet hetzelfde als de normale loondoorbetaling bij ziekte.',
      'De uitvoering ligt bij het UWV.',
      'Werkgeverslasten kunnen afhangen van de situatie.',
    ],
    volgendeIds: ['belastingdienst'],
  },

  {
    id: 'wia',
    titel: 'WIA',
    subtitel: 'Wet werk en inkomen naar arbeidsvermogen.',
    uitleg:
      'De WIA kan onder voorwaarden inkomen bieden wanneer iemand na een langdurige periode van ziekte geheel of gedeeltelijk arbeidsongeschikt is.',
    soort: 'premie',
    perspectief: ['werkgever'],
    details: [
      'Werknemersverzekering.',
      'Gericht op langdurige arbeidsongeschiktheid.',
      'Kent verschillende regelingen en beoordelingen.',
      'De uitvoering ligt bij het UWV.',
    ],
    volgendeIds: ['belastingdienst'],
  },

  {
    id: 'zvw-werkgeversheffing',
    titel: 'Werkgeversheffing Zvw',
    subtitel: 'Werkgeversbijdrage voor de Zorgverzekeringswet.',
    uitleg:
      'De werkgever betaalt in veel situaties een werkgeversheffing Zvw. Dit staat los van de nominale zorgpremie die iemand rechtstreeks aan een zorgverzekeraar betaalt.',
    soort: 'premie',
    perspectief: ['werkgever'],
    details: [
      'Wordt in veel loondienstsituaties door de werkgever betaald.',
      'Loopt via de loonaangifte.',
      'Is niet hetzelfde als de maandelijkse zorgverzekeringspremie.',
      'Heeft betrekking op de Zorgverzekeringswet.',
    ],
    volgendeIds: ['belastingdienst'],
  },

  {
    id: 'pensioenpremie-werknemer',
    titel: 'Pensioenpremie werknemer',
    subtitel: 'Werknemersdeel van het werkgeverspensioen.',
    uitleg:
      'Als de pensioenregeling een werknemersbijdrage kent, houdt de werkgever dit bedrag in op het brutoloon. De werkgever draagt de pensioenpremie vervolgens af aan de pensioenuitvoerder.',
    soort: 'pensioen',
    perspectief: ['werknemer'],
    details: [
      'Kan op het brutoloon worden ingehouden.',
      'Hoort bij de tweede pensioenpijler.',
      'Loopt niet via de Belastingdienst naar het pensioenfonds.',
      'De werkgever verzorgt doorgaans de afdracht.',
    ],
    volgendeIds: ['pensioenuitvoerder'],
  },

  {
    id: 'pensioenpremie-werkgever',
    titel: 'Pensioenpremie werkgever',
    subtitel: 'Werkgeversdeel van het werkgeverspensioen.',
    uitleg:
      'De werkgever kan naast het werknemersdeel zelf een deel van de pensioenpremie betalen. De verdeling tussen werknemer en werkgever is afhankelijk van de pensioenregeling.',
    soort: 'pensioen',
    perspectief: ['werkgever'],
    details: [
      'Extra werkgeverslast boven op het brutoloon.',
      'Hoort bij de tweede pensioenpijler.',
      'Wordt afgedragen aan de pensioenuitvoerder.',
      'De precieze verdeling verschilt per pensioenregeling.',
    ],
    volgendeIds: ['pensioenuitvoerder'],
  },

  {
    id: 'belastingdienst',
    titel: 'Belastingdienst',
    subtitel: 'Ontvangt de aangifte en afdracht van loonheffingen.',
    uitleg:
      'De Belastingdienst is in deze infographic het centrale punt voor inning en afdracht. De Belastingdienst is niet automatisch de organisatie die de verzekering uitvoert of de uitkering verstrekt.',
    soort: 'inning',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Ontvangt de loonaangifte van de werkgever.',
      'Ontvangt loonheffing en werkgeversheffingen.',
      'Is niet hetzelfde als een sociaal fonds.',
      'Is niet dezelfde organisatie als de SVB of het UWV.',
    ],
    volgendeIds: ['svb', 'uwv', 'zorgstelsel'],
  },

  {
    id: 'svb',
    titel: 'Sociale Verzekeringsbank',
    korteTitel: 'SVB',
    subtitel: 'Uitvoerder van verschillende volksverzekeringen.',
    uitleg:
      'De SVB voert onder andere de AOW en de Anw uit. De SVB beoordeelt aanspraken en verzorgt de uitbetaling van deze wettelijke voorzieningen.',
    soort: 'uitvoerder',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Voert de AOW uit.',
      'Voert de Anw uit.',
      'Beoordeelt het recht op de betreffende voorziening.',
      'Verzorgt de uitbetaling.',
    ],
    volgendeIds: ['aow-uitkering', 'anw-uitkering'],
  },

  {
    id: 'uwv',
    titel: 'Uitvoeringsinstituut Werknemersverzekeringen',
    korteTitel: 'UWV',
    subtitel: 'Uitvoerder van werknemersverzekeringen.',
    uitleg:
      'Het UWV voert werknemersverzekeringen uit en beoordeelt onder voorwaarden het recht op uitkeringen zoals WW, ZW en WIA.',
    soort: 'uitvoerder',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Voert de WW uit.',
      'Voert de Ziektewet uit.',
      'Voert de WIA uit.',
      'Verzorgt de beoordeling en uitbetaling.',
    ],
    volgendeIds: ['ww-uitkering', 'zw-uitkering', 'wia-uitkering'],
  },

  {
    id: 'zorgstelsel',
    titel: 'Zorgstelsel',
    subtitel: 'Financiering rond de Zorgverzekeringswet en langdurige zorg.',
    uitleg:
      'Zorgpremies en zorgbijdragen volgen een andere route dan pensioenpremies. De nominale zorgpremie wordt rechtstreeks aan een zorgverzekeraar betaald.',
    soort: 'fonds',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Zvw en Wlz zijn verschillende wettelijke regelingen.',
      'De nominale zorgpremie gaat rechtstreeks naar de zorgverzekeraar.',
      'De werkgeversheffing Zvw loopt via de loonaangifte.',
      'Deze betalingen bouwen geen pensioenvermogen op.',
    ],
    volgendeIds: [],
  },

  {
    id: 'pensioenuitvoerder',
    titel: 'Pensioenuitvoerder',
    subtitel: 'Ontvangt en beheert de pensioenpremies.',
    uitleg:
      'De pensioenuitvoerder verwerkt de pensioenpremies volgens de pensioenregeling. Dit kan bijvoorbeeld een pensioenfonds, verzekeraar of premiepensioeninstelling zijn.',
    soort: 'uitvoerder',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Ontvangt de afgedragen pensioenpremies.',
      'Voert de pensioenregeling uit.',
      'Beheert de pensioenadministratie.',
      'Verzorgt later de pensioenuitkering.',
    ],
    volgendeIds: ['tweede-pijler'],
  },

  {
    id: 'tweede-pijler',
    titel: 'Tweede pensioenpijler',
    subtitel: 'Aanvullend pensioen via de werkgever.',
    uitleg:
      'De tweede pijler is het aanvullende pensioen dat via een werkgever en een pensioenregeling wordt opgebouwd.',
    soort: 'fonds',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Komt boven op de AOW.',
      'Opbouw vindt plaats via een pensioenregeling.',
      'Kan ouderdomspensioen bevatten.',
      'Kan ook partner- en wezenpensioen bevatten.',
    ],
    volgendeIds: ['pensioenuitkering'],
  },

  {
    id: 'aow-uitkering',
    titel: 'AOW-uitkering',
    subtitel: 'Basisvoorziening vanaf de geldende AOW-leeftijd.',
    uitleg: 'De AOW is een wettelijke basisvoorziening en vormt de eerste pensioenpijler.',
    soort: 'uitkering',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Wordt uitgevoerd door de SVB.',
      'Behoort tot de eerste pensioenpijler.',
      'Er is geen individuele pensioenpot.',
      'De hoogte hangt af van de toepasselijke wettelijke regels.',
    ],
    volgendeIds: [],
  },

  {
    id: 'anw-uitkering',
    titel: 'Anw-uitkering',
    subtitel: 'Wettelijke voorziening voor bepaalde nabestaanden.',
    uitleg: 'De Anw kan onder wettelijke voorwaarden een uitkering bieden aan nabestaanden.',
    soort: 'uitkering',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Wordt uitgevoerd door de SVB.',
      'Is bedoeld voor bepaalde nabestaanden.',
      'Er gelden wettelijke voorwaarden.',
      'Is niet hetzelfde als nabestaandenpensioen via een pensioenregeling.',
    ],
    volgendeIds: [],
  },

  {
    id: 'ww-uitkering',
    titel: 'WW-uitkering',
    subtitel: 'Tijdelijke uitkering bij werkloosheid.',
    uitleg:
      'De WW kan onder voorwaarden tijdelijk inkomen bieden na geheel of gedeeltelijk verlies van werk.',
    soort: 'uitkering',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Wordt uitgevoerd door het UWV.',
      'Is bedoeld voor werkloosheid.',
      'Duur en hoogte zijn afhankelijk van de wettelijke situatie.',
    ],
    volgendeIds: [],
  },

  {
    id: 'zw-uitkering',
    titel: 'Ziektewetuitkering',
    subtitel: 'Uitkering bij ziekte in bepaalde situaties.',
    uitleg:
      'De Ziektewet kan van toepassing zijn wanneer geen werkgever verantwoordelijk is voor de normale loondoorbetaling tijdens ziekte.',
    soort: 'uitkering',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Wordt uitgevoerd door het UWV.',
      'Geldt alleen in toepasselijke situaties.',
      'Is niet hetzelfde als normale loondoorbetaling tijdens ziekte.',
    ],
    volgendeIds: [],
  },

  {
    id: 'wia-uitkering',
    titel: 'WIA-uitkering',
    subtitel: 'Uitkering bij langdurige arbeidsongeschiktheid.',
    uitleg:
      'De WIA kan onder voorwaarden ondersteuning bieden bij langdurige arbeidsongeschiktheid.',
    soort: 'uitkering',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Wordt uitgevoerd door het UWV.',
      'Er is een beoordeling nodig.',
      'De uitkomst hangt af van de individuele situatie.',
    ],
    volgendeIds: [],
  },

  {
    id: 'pensioenuitkering',
    titel: 'Aanvullende pensioenuitkering',
    subtitel: 'Uitkering uit de tweede pensioenpijler.',
    uitleg:
      'De aanvullende pensioenuitkering komt uit de pensioenregeling die via de werkgever is opgebouwd.',
    soort: 'uitkering',
    perspectief: ['werknemer', 'werkgever'],
    details: [
      'Komt naast de AOW.',
      'Wordt uitgekeerd door de pensioenuitvoerder.',
      'De hoogte hangt af van de pensioenregeling en pensioenopbouw.',
      'Is geen uitkering van de Belastingdienst.',
    ],
    volgendeIds: [],
  },
]
