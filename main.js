let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

let currentIndex=0
let theRightAnswer=0
let timer=10
let countdownInterval;
let s;  //for count span



//get json api
function getQuestions() {

    let myRequest = new XMLHttpRequest();

  let jsonObject="questions.json"
    myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let questionsObject = JSON.parse(this.responseText);
        let countq= questionsObject.length 
        createBullets(countq)
        addQuestionData(questionsObject[currentIndex],countq)
        countdown(timer,countq)
        s=questionsObject.length 

        counspans()

        submitButton.onclick = () => {
          if( currentIndex <countq-1){
          
          let rightAnswer=questionsObject[currentIndex].right_answer

          currentIndex++
          checkAswer(rightAnswer,countq)

          
          quizArea.innerHTML=''
            answersArea.innerHTML=''
           
            

          addQuestionData(questionsObject[currentIndex],countq)
          

          handelbull()
          clearInterval(countdownInterval)
          countdown(timer,countq)
          showResults(countq);
          
          }else{
            bullets.remove()
            submitButton.remove()
            answersArea.remove()
            quizArea.innerHTML=`Right Answer is ${theRightAnswer} 
              wrong ${countq-theRightAnswer} `
              answersArea.innerHTML=''
            goodbay()
            quizArea.className="winn"
          }
          }
        
      }
    }
    myRequest.open("GET", jsonObject, true);
    myRequest.send();
} 


getQuestions()

//new i creat it  run on addqusion and get question
function counspans(){
  countSpan.innerHTML=s--
}

//creat bullets
function createBullets(num){

    // countSpan.innerHTML=num
for( i = 1 ; i <= num ; i++){
let bullets =document.createElement("span")
// bullets.innerHTML=i
if(i==1){
    bullets.className=("on")
    
}
bulletsSpanContainer.appendChild(bullets)
    }
}

//add Question
function addQuestionData(obj,count){
  
  
  counspans()
  if(currentIndex < count){
  let h2=document.createElement("h2")
  
  h2.innerText=obj.title

  quizArea.appendChild(h2)
  for(i=1 ;i<=4 ; i++){
   
    let maindiv =document.createElement("div")
    maindiv.className='answer'
    let radioInput= document.createElement("input")
    radioInput.name='question'
    radioInput.type='radio'
    radioInput.id=`answer_${i}`
    radioInput.dataset.answer=obj[`answer_${i}`]

    let theLabel= document.createElement("label")
    theLabel.htmlFor=(`answer_${i}`)
    theLabel.tagName='a'

    let labelText=document.createTextNode(obj[`answer_${i}`])
    theLabel.appendChild(labelText)
    maindiv.append(radioInput)
    maindiv.append(theLabel)
    answersArea.append(maindiv)

    }
  }
}



 function checkAswer(ranswer,count){


    let choisesAr;
  let answer=document.getElementsByName("question")


  
  
  for(let i=0;i<answer.length;i++){

    if(answer[i].checked){
      choisesAr=answer[i].dataset.answer
     
      
     
    
      
    }
  }
  if(ranswer === choisesAr){
    theRightAnswer++;
    
}

  }


  function handelbull(){
    let bulletSpan=document.querySelectorAll(".bullets .spans span")
    let arraySpan=Array.from(bulletSpan)
    arraySpan.forEach((span,index)=>{
      if(currentIndex === index){
        
         span.className="on"
       
        

      }
    })
  }
  

  function showResults(count) {
    let theResults;
    if (currentIndex === count) {
      quizArea.remove();
      answersArea.remove();
      submitButton.remove();
      bullets.remove();
  
      if (theRightAnswer > count / 2 && theRightAnswer < count) {
        theResults = `<span class="good">Good</span>, ${theRightAnswer} From ${count}`;
      } else if (theRightAnswer === count) {
        theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
      } else {
        theResults = `<span class="bad">Bad</span>, ${theRightAnswer} From ${count}`;
      }
  
      resultsContainer.innerHTML = theResults;
      resultsContainer.style.padding = "10px";
      resultsContainer.style.backgroundColor = "white";
      resultsContainer.style.marginTop = "10px";
    }
  }

function countdown(duration,count){
if(currentIndex<count){
  let minutes,seconds;
  countdownInterval=setInterval(function(){
    minutes=parseInt(duration/60)
    seconds=parseInt(duration%60)

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    countdownElement.innerHTML = `${minutes}:${seconds}`;

    if (--duration < 0) {
      clearInterval(countdownInterval);
      submitButton.click();
    }

  },1000)
  
}
}
  
// function goodbay(){
  //   let h2=document.createElement("h2")
  // h2.className="winn"
  // let quiz= document.createTextNode("very good finish Question")
  // h2.appendChild(quiz)
  
  // quizArea.appendChild(h2)
  // }







