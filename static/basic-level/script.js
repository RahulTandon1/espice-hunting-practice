// /api/getLevel?endpoint="endpoint=stuff"

let params = new URLSearchParams(document.location.search.substring(1));
let name = params.get("endpoint"); // is the string "Jonathan"
let age = parseInt(params.get("age"), 10); // is the number 18

// initialise the object as empty
var obj = {
  author: "", 
  levelText: "", 
  endpoint: ""
}

var foo = document.getElementById("levelMaker")
foo.innerText = obj.author;

let bar = document.getElementById("levelText")
bar.innerText = obj.levelText;

// alerts if ans if correct or incorrect
function answerAlert(ansStat) {
  foo = document.getElementById("alert")
  foo.innerText = ansStat + ' answer';
  foo.style.visibility = "visible"
  setTimeout( () => { foo.style.visibility = "hidden" }, 3000)
}

// sends answer to backend
async function sendAns() 
{
  const obj =
  {
      "endpoint": "0d87", 
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