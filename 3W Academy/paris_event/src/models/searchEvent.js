class searchEvent{
    listAll(q = null, sortBy = null) {
        
        return fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=6&sort=${sortBy}&q=${encodeURIComponent(q)}`).then(response => response.json())
            .then(openData => {
                var arrayList = [];
                
                openData.records.forEach(elem => {
                    arrayList.push({title: elem.fields.title, image: elem.fields.cover_url || 'static/images/no-pictures.png', date: elem.fields.date_start})
                })
                
                return arrayList;
        });

        
    }
}

export default searchEvent;