let dataDivison = ['Software Engineer', 'Product Designer', 'Business Analyst']

dataDivison = dataDivison.map(item => {
    return {
        label: item,
        value: item.toLowerCase()
    }
})

export default dataDivison