let dataSubmissionLine = ['SHU', 'RI']

dataSubmissionLine = dataSubmissionLine.map(item => {
    return {
        label: item,
        value: item.toLowerCase()
    }
})

export default dataSubmissionLine