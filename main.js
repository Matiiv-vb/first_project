import {LoremIpsum} from './LoremIpsum.js';

let startButton = document.querySelector('.startButton');


let input = document.getElementById("in");

let cursor = document.querySelector('.Cursor');

let output = document.getElementById("out");

let fields = document.querySelector('.fields');

let arrayBtn = document.querySelectorAll('.btn');

let divList = document.getElementById('list');
let ul = document.createElement('ul');
let li = document.createElement('li');

let charPerMin = 0;
let wordsPerMin = 0;
let errorPress = 0;

let charSum = 0;
let wordSum = 0;
let pressSum = 0;

let timeStart



let spId = document.getElementById('speed');
let spWordId = document.getElementById('speedWord');
let erId = document.getElementById('error')
 
const enLower = "abcdefghijklmnopqrstuvwxyz:;, '\' .?!£$%^&*()_\' ''+-*{}@~<>&\"[]\/1234567890`=."
const enUpper = enLower.toUpperCase()
const en = enLower + enUpper


startButton.onclick =  activeKeySow;

let arrayList = null;

let getList = localStorage.getItem('timeListRecord');

let setNewArrayLS = () => {
  arrayList = [];
  localStorage.setItem('timeListRecord', JSON.stringify(arrayList));
}

if(getList !== null){

  let parseList = JSON.parse(getList);
  divList.appendChild(ul);

  parseList.forEach(e => {
    let nLi = document.createElement('li');
    nLi.innerHTML = e;
    ul.appendChild(nLi);
  });
  console.log(parseList);
}
else {
  setNewArrayLS()
}

document.querySelector('.resetList').onclick = () => {
  localStorage.removeItem('timeListRecord');
  setNewArrayLS();
  divList.innerHTML = '';
} 



function activeKeySow(e) {

  function generateWord(num) {
    output.textContent = '';
    let lorem = new LoremIpsum(); 
    let generateWord = lorem.allWordCount(num);
    input.textContent = generateWord;
  }

  function firstElemInput() {
    return input.textContent.substring(0, 1);
  } 

  let fieldsPosition = fields.offsetTop +39; 
  let headerOffset = cursor.offsetTop;
  let offsetPosition = headerOffset - fieldsPosition;
  fields.scrollTop = offsetPosition;


  console.log(e);

  if(e.type == "click") {
    let numInput = document.querySelector('.numInput').value;
    generateWord(numInput);
    firstElemInput();
    // document.querySelector('.space').focus()
    document.querySelector('.Backquote').focus()
    charPerMin = 0;
    wordsPerMin = 0;
    errorPress = 0;

    pressSum = 0
    charSum = 0;
    wordSum = 0;

    spId.textContent = 0;
    spWordId.textContent = 0;
  }


  if(en.includes(e.key) || e.type == "click"){
    document.querySelector('.language').textContent = ''
  }
  else {
    document.querySelector('.language').textContent = 'Будь ласка, змініть розкладку клавіатури на English.'
  }

  

  if( e.code == 'ShiftLeft'   ||
      e.code == 'CapsLock'    ||
      e.code == 'Tab'         ||
      e.code == 'Enter'       ||
      e.code == 'ShiftRight'  ||
      e.code == 'ControlLeft' ||
      e.code == 'MetaLeft'    ||
      e.code == 'AltLeft'     ||
      e.code == 'AltRight'    ||
      e.code == 'ControlRight'||
      e.code == 'Backspace'   ||
      e.type == "click"
    ){
      document.querySelector('.language').textContent = ''
      }
    else {
      pressSum++;
    }
  
    
  
    if(e.getModifierState('CapsLock')) {
      console.log('elok');
      document.querySelector('.CapsLock').innerHTML = 'Caps Lock &#160<div class="point"></div>';
    }
    else {
      document.querySelector('.CapsLock').innerHTML = 'Caps Lock &#160';
    }
  


  if(firstElemInput() == e.key) { //
 
    output.textContent += firstElemInput();

    let transformText = input.textContent.substring(1);
  
    input.textContent = transformText

    console.log(charSum++);

   if(e.key === ' ') {
      wordSum++;

    }
   
  }


  let fb = "Key" + firstElemInput().toUpperCase();
    if(firstElemInput() == ' ') {
      fb = 'Space';

    }
    else if(firstElemInput() == ',') {
      fb = 'Comma';
    }
    else if(firstElemInput() == '.') {
      fb = 'Period'; 
    }
    else if(firstElemInput() == '?') {
      fb = 'Slash'; 
    }
    console.log(fb);  

  ////////

  if(output.textContent[output.textContent.length -1] == ' '){
    console.log('iiiiiiii');
    document.getElementById('out').style.marginRight = '-.13em';
    
  }
  else {
    document.getElementById('out').style.marginRight = '-.45em';
  }

  

  if(firstElemInput() == ' ') {
    console.log('EEEEEEEEEEEE');
    document.getElementById('in').style.marginLeft = '-.14em';
  }
  else {
    document.getElementById('in').style.marginLeft = '-.46em';
  }

  if (e.keyCode == 32) e.preventDefault();

  //////////
  
  for(let i = 0; i < arrayBtn.length; i++ ){
    if(arrayBtn[i].value == e.code){
    arrayBtn[i].classList.add('active')
      this.onkeyup = () => {
        arrayBtn[i].classList.remove('active')
      }
    }
  else if(fb == arrayBtn[i].value  ) {
    arrayBtn.forEach(e => {
      e.classList.remove('target')
    });
    arrayBtn[i].classList.add('target');
   
  }
   else{
    arrayBtn[i].classList.remove('active')
   }
  }


  if(charSum == 1) {
    let t = new Date();
    timeStart = t.getTime();
  }

  let currentTime = new Date();
  let dif = timeStart - currentTime.getTime();
  let sec = dif / 1000;
  let minBetween = Math.abs(sec) / 60;

  charPerMin =  charSum / minBetween;
  wordsPerMin = wordSum / minBetween;
  errorPress = pressSum - charSum;

  let simbolInput = input.textContent.length

  if(charSum > 1 && simbolInput > 0 ) {
    spId.textContent = Math.round(charPerMin);
    spWordId.textContent = Math.round(wordsPerMin);
    erId.textContent = errorPress;
  }
  else if(charSum <= 1) {
    erId.textContent = errorPress;
  }


  
  if(charSum > 1 && simbolInput == 0) {

    let timeString = currentTime.toString().slice(0, 25)
    let internalArray = [];

    internalArray.push(`${timeString} - Помилки: ${errorPress} Символів/хв:  ${Math.round(spId.textContent)} Слів/хв: ${Math.round(wordsPerMin)} Кількість символів: ${charSum}  Кількість слів: ${wordSum + 1}`) 
    
    let gl = localStorage.getItem('timeListRecord');
    let pl = JSON.parse(gl);
    pl.unshift(internalArray);
    localStorage.setItem('timeListRecord', JSON.stringify(pl) );
    
    let getl = localStorage.getItem('timeListRecord');
    let parseL = JSON.parse(getl);
    ul.innerHTML = '';
    divList.appendChild(ul);
    parseL.forEach(e => {
      console.log(e);
      let nLi = document.createElement('li');
      nLi.innerHTML = e;
      ul.appendChild(nLi); 
    });
    
    
    divList.scrollIntoView({block: "start", inline: "center", behavior: 'smooth'});
   
    charSum = false;
    console.log('end');
  }


  console.log('=================================');

}

document.onkeydown = activeKeySow;



