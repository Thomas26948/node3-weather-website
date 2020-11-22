//console.log('Client side javascript file si loaded')

//puzzle.mead.io/puzzle

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'from js'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ""
    const location = search.value

//on a enlevé http://localhost comme dans le app.get(/)
    const url= "/weather?address="+location
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ""

        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    }    
)})


})

