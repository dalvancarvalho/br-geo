//URLs
export const stateListUrl = [
  {
    description: 'Listagem de Unidades da Federação (estados)',
    url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  },
];

export const countyListUrl = [
  {
    description: 'Listagem de Municípios por Unidade da Federação (estado)',
    url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/placeholder/municipios?orderBy=nome',
  },
];

export const countryMapUrls = [
  {
    description: 'Mapa político brasileiro subdividido em Unidades da Federação (estados)',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=image/svg+xml&qualidade=minima&intrarregiao=UF',
  },
  {
    description: 'Mapa político brasileiro subdividido em Regiões',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=image/svg+xml&qualidade=intermediaria&intrarregiao=regiao',
  },
  {
    description: 'Mapa político brasileiro',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=image/svg+xml&qualidade=intermediaria',
  },
];

export const stateMapUrls = [
  {
    description: 'Mapa político da Unidade da Federação subdividido em Municípios',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/placeholder?formato=image/svg+xml&qualidade=intermediaria&intrarregiao=municipio',
  },
  {
    description: 'Mapa político da Unidade da Federação subdividido em Microrregiões',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/placeholder?formato=image/svg+xml&qualidade=intermediaria&intrarregiao=microrregiao',
  },
  {
    description: 'Mapa político da Unidade da Federação subdividido em Mesorregiões',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/placeholder?formato=image/svg+xml&qualidade=intermediaria&intrarregiao=mesorregiao',
  },
  {
    description: 'Mapa político da Unidade da Federação',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/placeholder?qualidade=maxima',
  },
];

export const altStateMapUrls = [
  {
    description: 'Mapa político da Unidade da Federação subdividido em Municípios',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/placeholder?formato=image/svg+xml&qualidade=minima&intrarregiao=municipio',
  },
  {
    description: 'Mapa político da Unidade da Federação subdividido em Microrregiões',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/placeholder?formato=image/svg+xml&qualidade=minima&intrarregiao=microrregiao',
  },
  {
    description: 'Mapa político da Unidade da Federação subdividido em Mesorregiões',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/placeholder?formato=image/svg+xml&qualidade=minima&intrarregiao=mesorregiao',
  },
  {
    description: 'Mapa político da Unidade da Federação',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/placeholder?qualidade=intermediaria',
  },
];

export const countryInfoUrls = [
  {
    description: 'Densidade demográfica nacional [Todos os censos]',
    url: `https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos/1872|1890|1900|1920|1940|1950|1960|1970|1980|1991|2000|2010/variaveis/614?localidades=N1[all]`,
  },
  //metadados aqui
  //more...
];

export const stateInfoUrls = [
  {
    description: 'Estimativa populacional estadual [Todos os anos]',
    url: 'https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/all/variaveis/9324?localidades=N3[placeholder]',
  },
  {
    description: 'Densidade demográfica estadual [Todos os censos]',
    url: 'https://servicodados.ibge.gov.br/api/v3/agregados/1298/periodos/all/variaveis/614?localidades=N3[placeholder]',
  },
  {
    description: 'Estimativa populacional de todos municípios do estado [ano mais recente]',
    url: 'https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/last/variaveis/9324?localidades=N6[N3[placeholder]]',
  },
];

export const countyInfoUrls = [
  {
    description: 'Estimativa populacional municipal [Todos os anos]',
    url: 'https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/all/variaveis/9324?localidades=N6[placeholder]',
  },
  {
    description: 'Densidade demográfica municipal [Censo 2010]',
    url: 'https://servicodados.ibge.gov.br/api/v3/agregados/1301/periodos/last/variaveis/616?localidades=N6[placeholder]',
  },
  {
    description: 'Metadados referentes ao município',
    url: 'https://servicodados.ibge.gov.br/api/v3/malhas/municipios/placeholder/metadados',
  },
  {
    description: 'Informações adicionais',
    url: 'https://servicodados.ibge.gov.br/api/v1/biblioteca?aspas=3&codmun=placeholder',
  },
];

export const weatherInfo = [
  {
    description: 'Obtenção de informações meteorológicas a partir de coordenadas geográficas',
    url: 'https://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&units=metric&lang=pt_br&appid=3d312584aab95439cf7b13369e0bb27d',
  },
];

export const indexDescription = [
  {
    id: 5903,
    description: 'Matrículas na pré-escola',
    unit: '',
  },
  {
    id: 5908,
    description: 'Matrículas no ensino fundamental',
    unit: '',
  },
  {
    id: 5913,
    description: 'Matrículas no ensino médio',
    unit: '',
  },
  {
    id: 5929,
    description: 'Docentes no ensino fundamental',
    unit: '',
  },
  {
    id: 5934,
    description: 'Docentes no ensino médio',
    unit: '',
  },
  {
    id: 5950,
    description: 'Estabelecimentos de ensino fundamental',
    unit: '',
  },
  {
    id: 5955,
    description: 'Estabelecimentos de ensino médio',
    unit: '',
  },
  {
    id: 25191,
    description: 'População urbana',
    unit: 'habitantes',
  },
  {
    id: 25199,
    description: 'População rural',
    unit: 'habitantes',
  },
  {
    id: 25207,
    description: 'População no último censo',
    unit: 'habitantes',
  },
  {
    id: 28120,
    description: 'Total de veículos',
    unit: '',
  },
  {
    id: 28122,
    description: 'Automóvel',
    unit: '',
  },
  {
    id: 28123,
    description: 'Caminhão',
    unit: '',
  },
  {
    id: 28128,
    description: 'Motocicleta',
    unit: '',
  },
  {
    id: 28130,
    description: 'Ônibus',
    unit: '',
  },
  {
    id: 28141,
    description: 'Receitas orçamentárias realizadas',
    unit: 'R$ (x1000)',
  },
  {
    id: 28242,
    description: 'Estabelecimentos do SUS',
    unit: '',
  },
  {
    id: 29167,
    description: 'Área territorial',
    unit: 'km²',
  },
  {
    id: 29168,
    description: 'Densidade demográfica',
    unit: 'hab/km²',
  },
  {
    id: 29170,
    description: 'Prefeito(a)',
    unit: '',
  },
  {
    id: 29171,
    description: 'População estimada',
    unit: 'habitantes',
  },
  {
    id: 29749,
    description: 'Despesas orçamentárias empenhadas',
    unit: 'R$ (x1000)',
  },
  {
    id: 29763,
    description: 'Pessoal ocupado',
    unit: 'pessoas',
  },
  {
    id: 29765,
    description: 'Salário médio mensal dos trabalhadores formais',
    unit: 'Salários mínimos',
  },
  {
    id: 30255,
    description: 'IDH',
    unit: '',
  },
  {
    id: 30279,
    description: 'Taxa de mortalidade infantil',
    unit: 'óbitos por mil nascidos vivos',
  },
  {
    id: 47001,
    description: 'PIB per capita',
    unit: 'R$',
  },
  {
    id: 48980,
    description: 'Área territorial',
    unit: 'km²',
  },
  {
    id: 48981,
    description: 'Capital',
    unit: '',
  },
  {
    id: 48982,
    description: 'Densidade demográfica',
    unit: 'hab/km²',
  },
  {
    id: 48985,
    description: 'População estimada',
    unit: 'habitantes',
  },
  {
    id: 48986,
    description: 'Rendimento nominal mensal per capita',
    unit: 'R$',
  },
  {
    id: 49645,
    description: 'População projetada',
    unit: 'habitantes',
  },
  {
    id: 60029,
    description: 'Arborização de vias públicas',
    unit: '%',
  },
  {
    id: 60030,
    description: 'Esgotamento sanitário adequado',
    unit: '%',
  },
  {
    id: 60031,
    description: 'Urbanização de vias públicas',
    unit: '%',
  },
  {
    id: 60045,
    description: 'Escolarização de 6 a 14 anos',
    unit: '%',
  },
  {
    id: 60048,
    description: 'Receitas oriundas de fontes externas',
    unit: '%',
  },
  {
    id: 60052,
    description: 'Área territorial',
    unit: 'km²',
  },
  {
    id: 60053,
    description: 'Capital',
    unit: '',
  },
  {
    id: 60055,
    description: 'População no último censo',
    unit: 'habitantes',
  },
  {
    id: 60056,
    description: 'População estimada',
    unit: 'habitantes',
  },
  {
    id: 60280,
    description: 'Número de municípios',
    unit: 'municípios',
  },
  {
    id: 60282,
    description: 'Mortalidade infantil',
    unit: 'óbitos por mil nascidos vivos',
  },
  {
    id: 60284,
    description: 'Taxa de fecundidade',
    unit: 'filhos por mulher',
  },
  {
    id: 60404,
    description: 'Domicílios com iluminação elétrica',
    unit: '%',
  },
  {
    id: 60414,
    description: 'Prática de algum esporte ou atividade física',
    unit: '%',
  },
  {
    id: 62590,
    description: 'Trabalhadores formais a partir dos 16 anos',
    unit: '%',
  },
  {
    id: 62876,
    description: 'Governador(a)',
    unit: '',
  },
  {
    id: 62887,
    description: 'Presidente',
    unit: '',
  },
  {
    id: 62912,
    description: 'Domicílios com lixo coletado diretamente',
    unit: '%',
  },
  {
    id: 62914,
    description: 'Domicílios com rede geral como principal forma de abastecimento de água',
    unit: '%',
  },
  {
    id: 62916,
    description: 'Domicílios com esgotamento sanitário',
    unit: '%',
  },
  {
    id: 63306,
    description: 'Escolarização dos 6 aos 14 anos',
    unit: '%',
  },
  {
    id: 63311,
    description: 'Analfabetismo (15 anos de idade ou mais)',
    unit: '%',
  },
  {
    id: 64508,
    description: 'Domicílios com microcomputador ou tablet',
    unit: '%',
  },
  {
    id: 64510,
    description: 'Domicílios com telefone móvel (celular)',
    unit: '%',
  },
  {
    id: 64511,
    description: 'Domicílios com televisão',
    unit: '%',
  },
  {
    id: 64517,
    description: 'Domicílios com acesso à Internet',
    unit: '%',
  },
  {
    id: 77003,
    description: 'PIB per capita',
    unit: 'R$',
  },
  {
    id: 77861,
    description: 'Bioma',
    unit: '',
  },
  {
    id: 78187,
    description: 'IDEB - anos iniciais do ensino fundamental (rede pública)',
    unit: '',
  },
  {
    id: 78192,
    description: 'IDEB - anos finais do ensino fundamental (rede pública)',
    unit: '',
  },
  {
    id: 87529,
    description: 'Hierarquia urbana',
    unit: '',
  },
  {
    id: 91249,
    description: 'Mesorregião',
    unit: '',
  },
  {
    id: 91251,
    description: 'Microrregião',
    unit: '',
  },
];

//Country attributes
export const countryAttr = {
  id: 0,
  name: 'Brasil',
  abbrev: 'BR',
  capital: {
    id: 53, // ID of UF
    cityId: 5300108, // ID of city
    name: 'Brasília',
    latitude: -15.7812,
    longitude: -47.7969,
  },
};

//Federal Units (states) attributes
export const stateAttr = [
  {
    id: 11,
    name: 'Rondônia',
    abbrev: 'RO',
    region: {
      id: 1,
      name: 'Norte',
      abbrev: 'N',
    },
    capital: {
      id: 1100205,
      name: 'Porto Velho',
      latitude: -9.1536,
      longitude: -64.3068,
    },
    federalDistrict: false,
  },
  {
    id: 12,
    name: 'Acre',
    abbrev: 'AC',
    region: {
      id: 1,
      name: 'Norte',
      abbrev: 'N',
    },
    capital: {
      id: 1200401,
      name: 'Rio Branco',
      latitude: -10.0661,
      longitude: -68.3711,
    },
    federalDistrict: false,
  },
  {
    id: 13,
    name: 'Amazonas',
    abbrev: 'AM',
    region: {
      id: 1,
      name: 'Norte',
      abbrev: 'N',
    },
    capital: {
      id: 1302603,
      name: 'Manaus',
      latitude: -2.6259,
      longitude: -60.2596,
    },
    federalDistrict: false,
  },
  {
    id: 14,
    name: 'Roraima',
    abbrev: 'RR',
    region: {
      id: 1,
      name: 'Norte',
      abbrev: 'N',
    },
    capital: {
      id: 1400100,
      name: 'Boa Vista',
      latitude: 3.1179,
      longitude: -60.718,
    },
    federalDistrict: false,
  },
  {
    id: 15,
    name: 'Pará',
    abbrev: 'PA',
    region: {
      id: 1,
      name: 'Norte',
      abbrev: 'N',
    },
    capital: {
      id: 1501402,
      name: 'Belém',
      latitude: -1.2407,
      longitude: -48.4599,
    },
    federalDistrict: false,
  },
  {
    id: 16,
    name: 'Amapá',
    abbrev: 'AP',
    region: {
      id: 1,
      name: 'Norte',
      abbrev: 'N',
    },
    capital: {
      id: 1600303,
      name: 'Macapá',
      latitude: 0.5628,
      longitude: -50.6918,
    },
    federalDistrict: false,
  },
  {
    id: 17,
    name: 'Tocantins',
    abbrev: 'TO',
    region: {
      id: 1,
      name: 'Norte',
      abbrev: 'N',
    },
    capital: {
      id: 1721000,
      name: 'Palmas',
      latitude: -10.2202,
      longitude: -48.1521,
    },
    federalDistrict: false,
  },
  {
    id: 21,
    name: 'Maranhão',
    abbrev: 'MA',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2111300,
      name: 'São Luís',
      latitude: -2.6339,
      longitude: -44.2807,
    },
    federalDistrict: false,
  },
  {
    id: 22,
    name: 'Piauí',
    abbrev: 'PI',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2211001,
      name: 'Teresina',
      latitude: -5.1027,
      longitude: -42.7406,
    },
    federalDistrict: false,
  },
  {
    id: 23,
    name: 'Ceará',
    abbrev: 'CE',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2304400,
      name: 'Fortaleza',
      latitude: -3.7858,
      longitude: -38.528,
    },
    federalDistrict: false,
  },
  {
    id: 24,
    name: 'Rio Grande do Norte',
    abbrev: 'RN',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2408102,
      name: 'Natal',
      latitude: -5.8032,
      longitude: -35.2288,
    },
    federalDistrict: false,
  },
  {
    id: 25,
    name: 'Paraíba',
    abbrev: 'PB',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2507507,
      name: 'João Pessoa',
      latitude: -7.1655,
      longitude: -34.8695,
    },
    federalDistrict: false,
  },
  {
    id: 26,
    name: 'Pernambuco',
    abbrev: 'PE',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2611606,
      name: 'Recife',
      latitude: -8.0393,
      longitude: -34.9331,
    },
    federalDistrict: false,
  },
  {
    id: 27,
    name: 'Alagoas',
    abbrev: 'AL',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2704302,
      name: 'Maceió',
      latitude: -9.5224,
      longitude: -35.7114,
    },
    federalDistrict: false,
  },
  {
    id: 28,
    name: 'Sergipe',
    abbrev: 'SE',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2800308,
      name: 'Aracaju',
      latitude: -10.9942,
      longitude: -37.0949,
    },
    federalDistrict: false,
  },
  {
    id: 29,
    name: 'Bahia',
    abbrev: 'BA',
    region: {
      id: 2,
      name: 'Nordeste',
      abbrev: 'NE',
    },
    capital: {
      id: 2927408,
      name: 'Salvador',
      latitude: -12.8735,
      longitude: -38.5147,
    },
    federalDistrict: false,
  },
  {
    id: 31,
    name: 'Minas Gerais',
    abbrev: 'MG',
    region: {
      id: 3,
      name: 'Sudeste',
      abbrev: 'SE',
    },
    capital: {
      id: 3106200,
      name: 'Belo Horizonte',
      latitude: -19.9027,
      longitude: -43.96,
    },
    federalDistrict: false,
  },
  {
    id: 32,
    name: 'Espírito Santo',
    abbrev: 'ES',
    region: {
      id: 3,
      name: 'Sudeste',
      abbrev: 'SE',
    },
    capital: {
      id: 3205309,
      name: 'Vitória',
      latitude: -20.2787,
      longitude: -40.2973,
    },
    federalDistrict: false,
  },
  {
    id: 33,
    name: 'Rio de Janeiro',
    abbrev: 'RJ',
    region: {
      id: 3,
      name: 'Sudeste',
      abbrev: 'SE',
    },
    capital: {
      id: 3304557,
      name: 'Rio de Janeiro',
      latitude: -22.9255,
      longitude: -43.458,
    },
    federalDistrict: false,
  },
  {
    id: 35,
    name: 'São Paulo',
    abbrev: 'SP',
    region: {
      id: 3,
      name: 'Sudeste',
      abbrev: 'SE',
    },
    capital: {
      id: 3550308,
      name: 'São Paulo',
      latitude: -23.6501,
      longitude: -46.6481,
    },
    federalDistrict: false,
  },
  {
    id: 41,
    name: 'Paraná',
    abbrev: 'PR',
    region: {
      id: 4,
      name: 'Sul',
      abbrev: 'S',
    },
    capital: {
      id: 4106902,
      name: 'Curitiba',
      latitude: -25.4779,
      longitude: -49.2882,
    },
    federalDistrict: false,
  },
  {
    id: 42,
    name: 'Santa Catarina',
    abbrev: 'SC',
    region: {
      id: 4,
      name: 'Sul',
      abbrev: 'S',
    },
    capital: {
      id: 4205407,
      name: 'Florianópolis',
      latitude: -27.5788,
      longitude: -48.5091,
    },
    federalDistrict: false,
  },
  {
    id: 43,
    name: 'Rio Grande do Sul',
    abbrev: 'RS',
    region: {
      id: 4,
      name: 'Sul',
      abbrev: 'S',
    },
    capital: {
      id: 4314902,
      name: 'Porto Alegre',
      latitude: -30.0953,
      longitude: -51.1644,
    },
    federalDistrict: false,
  },
  {
    id: 50,
    name: 'Mato Grosso do Sul',
    abbrev: 'MS',
    region: {
      id: 5,
      name: 'Centro-Oeste',
      abbrev: 'CO',
    },
    capital: {
      id: 5002704,
      name: 'Campo Grande',
      latitude: -20.9136,
      longitude: -54.2495,
    },
    federalDistrict: false,
  },
  {
    id: 51,
    name: 'Mato Grosso',
    abbrev: 'MT',
    region: {
      id: 5,
      name: 'Centro-Oeste',
      abbrev: 'CO',
    },
    capital: {
      id: 5103403,
      name: 'Cuiabá',
      latitude: -15.6727,
      longitude: -55.7516,
    },
    federalDistrict: false,
  },
  {
    id: 52,
    name: 'Goiás',
    abbrev: 'GO',
    region: {
      id: 5,
      name: 'Centro-Oeste',
      abbrev: 'CO',
    },
    capital: {
      id: 5208707,
      name: 'Goiânia',
      latitude: -16.6436,
      longitude: -49.2738,
    },
    federalDistrict: false,
  },
  {
    id: 53,
    name: 'Distrito Federal',
    abbrev: 'DF',
    region: {
      id: 5,
      name: 'Centro-Oeste',
      abbrev: 'CO',
    },
    capital: {
      id: 5300108,
      name: 'Brasília',
      latitude: -15.7812,
      longitude: -47.7969,
    },
    federalDistrict: true,
  },
];
