let dataDivison = ['Software Engineer', 'Product Design', 'Business Analyst']

dataDivison = dataDivison.map(item => {
    return {
        label: item,
        value: item.toLowerCase()
    }
})

export default dataDivison