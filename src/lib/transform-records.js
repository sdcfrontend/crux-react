
const transformRecords = (records, currentDevice) => {
  const dataExample = [
    {
      name: 'largest_contentful_paint',
      records: [
        {
          date: '',
          histogram: {}
        }
      ]
    },
    {
      name: 'first_input_delay',
      records: []
    },
    {
      name: 'cumulative_layout_shift',
      records: []
    },
    {
      name: 'first_contentful_paint',
      records: []
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