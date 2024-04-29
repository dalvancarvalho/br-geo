export const legendAttributes = {
  population: {
    title: 'População estimada',
    unit: 'habitantes',
    intervals: [
      {
        start: 0,
        end: 10000,
        name: 'a_up-to-10k',
        description: 'municípios com até 10 mil habitantes',
        label: 'Até 10k',
      },
      {
        start: 10000,
        end: 20000,
        name: 'b_from-10k-to-20k',
        description: 'munícipios entre 10 mil e 20 mil habitantes',
        label: '10k - 20k',
      },
      {
        start: 20000,
        end: 50000,
        name: 'c_from-20k-to-50k',
        description: 'munícipios entre 20 mil e 50 mil habitantes',
        label: '20k - 50k',
      },
      {
        start: 50000,
        end: 100000,
        name: 'd_from-50k-to-100k',
        description: 'munícipios entre 50 mil e 100 mil habitantes',
        label: '50k - 100k',
      },
      {
        start: 100000,
        end: 200000,
        name: 'e_from-100k-to-200k',
        description: 'munícipios entre 100 mil e 200 mil habitantes',
        label: '100k - 200k',
      },
      {
        start: 200000,
        end: 500000,
        name: 'f_from-200k-to-500k',
        description: 'munícipios entre 200 mil e 500 mil habitantes',
        label: '200k - 500k',
      },
      {
        start: 500000,
        end: 1000000,
        name: 'g_from-500k-to-1m',
        description: 'munícipios entre 500 mil e 1 milhão de habitantes',
        label: '500k - 1m',
      },
      {
        start: 1000000,
        end: 100000000,
        name: 'h_greater-than-1m',
        description: 'munícipios com mais de 1 milhão de habitantes',
        label: 'Acima de 1m',
      },
    ],
  },
};
