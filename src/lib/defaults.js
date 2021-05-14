export const formFactorsDefaults = {
  formFactors: ['PHONE', 'DESKTOP'],
  selectedFormFactor: 'PHONE',
}

export const metricsDefaults = {
  metrics: ['largest_contentful_paint', 'first_input_delay', 'cumulative_layout_shift', 'first_contentful_paint'],
  selectedMetrics: ['largest_contentful_paint', 'first_input_delay', 'cumulative_layout_shift'],
}

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    padding: 0
  },
}