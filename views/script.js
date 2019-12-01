let endpoint=""
function setEndpoint () {
  url = String(window.location.href)
  endpoint = url.slice(-4)
  return endpoint
}
// alerts if ans if correct or incorrect
function answerAlert(ansStat) {
  foo = document.getElementById("alert")
  foo.innerText = ansStat + ' answer';
  foo.style.visibility = "visible"
  setTimeout( () => { foo.style.visibility = "hidden" }, 5000)
}

// sends answer to backend
async function sendAns() 
{
  const obj =
  {
      "endpoint": setEndpoint(), 
      "answer": document.getElementById("ansBox").value
  }
  try {
    let ansStat = await fetch('/api/checkAns', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    if (ansStat.status !== 200) return
    
    //request was successfull
    ansStat = await ansStat.json()
    console.log(ansStat)
    answerAlert(ansStat['answerStatus'])
  }
  catch (err) {
    console.log(err)
  }
}

// adding enter key functionality
let ansBox = document.getElementById('ansBox')
ansBox.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    sendAns()
  }
})