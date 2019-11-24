async function sendLevel() {
    let author = document.getElementById('author').value
    let levelText = document.getElementById('levelText').value
    let answer = document.getElementById('answer').value

    let lvlObj = {
        'author': author, 
        'levelText': levelText,
        'answer': answer
    }
    let url = '/api/makeLevel'
    try {
        let endpoint = await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(lvlObj)
        })
        if (endpoint.status !== 200) return
          
          //request was successfull
          endpoint = await endpoint.json()
          popUp(endpoint.endpoint)
    }
    catch (err) {
        console.log(err)
    }
}

function popUp(endpoint) {
    url = "/api/getLevel/" + String(endpoint)
    foo = document.getElementById('endpointPopUp')
    foo.innerText = "Your Level's URL is " + url
    foo.style.visibility = "visible";
}

