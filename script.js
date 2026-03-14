function showTab(id){

let tabs=document.getElementsByClassName("tab")

for(let t of tabs){
t.style.display="none"
}

document.getElementById(id).style.display="block"

}

showTab("tutor")

function toggleDark(){
document.body.classList.toggle("dark")
}

async function askAI(){

let q=document.getElementById("question").value
let answer=document.getElementById("answer")

answer.innerHTML="Searching..."

try{

let res=await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+q)

let data=await res.json()

answer.innerHTML=
"<h3>"+data.title+"</h3>"+
"<p>"+data.extract+"</p>"

addXP(5)

}
catch{
answer.innerHTML="No result."
}

}

function solveMath(){

let input=document.getElementById("mathInput").value

try{

let result=eval(input)

document.getElementById("mathAnswer").innerHTML=result

addXP(3)

}
catch{

document.getElementById("mathAnswer").innerHTML="Invalid math"

}

}

function generateQuiz(){

let topic=document.getElementById("quizTopic").value
let area=document.getElementById("quizArea")

let questions=[
"What is "+topic+"?",
"Why is "+topic+" important?",
"Give an example of "+topic,
"Explain a key concept of "+topic
]

area.innerHTML=""

questions.forEach(q=>{
let div=document.createElement("div")
div.innerHTML=q
area.appendChild(div)
})

addXP(10)

}

function makeFlashcards(){

let topic=document.getElementById("flashTopic").value
let area=document.getElementById("flashArea")

area.innerHTML=""

let cards=[
["Definition","Definition of "+topic],
["Example","Example of "+topic],
["Key Idea","Important concept of "+topic]
]

cards.forEach(c=>{

let div=document.createElement("div")
div.className="flashcard"

div.innerHTML="<b>"+c[0]+"</b>"

div.onclick=function(){
div.innerHTML="<b>"+c[0]+"</b><br>"+c[1]
}

area.appendChild(div)

})

addXP(8)

}

function addTask(){

let task=document.getElementById("task").value
let list=document.getElementById("taskList")

let li=document.createElement("li")
li.innerText=task

list.appendChild(li)

addXP(2)

}

function addXP(amount){

let xp=localStorage.getItem("xp") || 0
xp=parseInt(xp)+amount

localStorage.setItem("xp",xp)

updateProgress()

}

function updateProgress(){

let xp=localStorage.getItem("xp") || 0

document.getElementById("progressStats").innerHTML="XP Earned: "+xp

document.getElementById("xpBar").style.width=(xp % 100)+"%"

}

updateProgress()

function copyNotes(){

let text=document.getElementById("answer").innerText

navigator.clipboard.writeText(text)

document.getElementById("noteExport").value+=text+"\n\n"

}

function copyMath(){

let text=document.getElementById("mathAnswer").innerText

navigator.clipboard.writeText(text)

document.getElementById("noteExport").value+=text+"\n\n"

}

function copyAllNotes(){

let text=document.getElementById("noteExport").value

navigator.clipboard.writeText(text)

alert("Copied! Paste into Google Docs.")

}
