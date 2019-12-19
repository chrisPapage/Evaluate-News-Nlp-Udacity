import { urlencoded } from "body-parser";

function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForUrl(formText)
    console.log(formText)

    postData('save', {
        formText: name
    });
    updateUi('http://localhost:8080/api')
    Client.checkForName(name)
    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    })
}

const postData = async (url = '', data= {})=> {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    try {
        console.log(response);
    }catch(error) {
        console.log('error', error)
    }
}

const updateUi = async () => {
    const request = await fetch('http://localhost:8080/api')
    try {
        const allData = await request.json();
        console.log(allData)
        document.getElementById('results').innerHTML = '<br>Polarity: ' + allData.polarity + '<br>'
        document.getElementById('results').innerHTML += '<br>Subjectivity: ' + allData.polarity_confidence + '<br>'
        document.getElementById('results').innerHTML += '<br>Text: ' + allData.text + '<br>'
    }catch(error){
        console.log('error', error);
    }
}

export { handleSubmit }
