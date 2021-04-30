
const transformRecords = (records, currentDevice) => {
  const dataExample = [
    {
      name: 'largest_contentful_paint',
      days: [
        {
          date: '',
          histogram: {}
        },
        {
          date: '',
          histogram: {}
        }
      ]
    },
    {
      name: 'first_input_delay',
      days: []
    },
    {
      name: 'cumulative_layout_shift',
      days: []
    },
    {
      name: 'first_contentful_paint',
      days: []
    }
  ];

  const bum = records.reduce((metrics, record) => (
    record.devices[currentDevice].reduce((acc, metric) => (
      [
        ...acc,
        {
          name: metric.name,
          records: [
            {
              date: record.dateCreated,
              histogram: metric.histogram,
              percentiles: metric.percentiles    
            }
          ]
        }
      ]
    ), [])
  ), [])

  console.log(bum)
  
}

export default transformRecords;