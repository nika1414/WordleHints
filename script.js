const inputs = document.getElementById("inputs");
const checkBtn = document.getElementById("checkBtn");
const nextButton = document.getElementById("NextBtn");
/* Creating function display with the fetched data from the API. */
const words = [
  "მარილი",
  "შაქარი",
  "გონება",
  "კეპი",
  "ლიმონი",
  "სკამი",
  "მაგიდა",
  "როიალი",
  "სპილო",
  "წყალი",
  "ტორტი",
  "საწოლი",
  "ჭაღი",
  "ჩარჩო",
  "სურათი",
  "კამერა",
];
const hintta = [
  { name: "მარილი", descr: "მლაშე" },
  { name: "შაქარი", descr: "ტკბილი" },
  { name: "გონება", descr: "აზროვნება" },
  { name: "კეპი", descr: "თავსაფარი" },
  { name: "ლიმონი", descr: "მჟავე" },
  { name: "სკამი", descr: "დასაჯდომი" },
  { name: "მაგიდა", descr: "თეფშების დასალაგებელი" },
  { name: "როიალი", descr: "კლავიშებიანი ინსტრუმენტი" },
  { name: "სპილო", descr: "ხორთუმიანი ცხოველი" },
  { name: "წყალი", descr: "მომწყურდა" },
  { name: "ტორტი", descr: "ყველაზე ტკბილი საჭმელი დაბდღეზე" },
  { name: "საწოლი", descr: "საძინებელი" },
  { name: "ჭაღი", descr: "CU-მ სახელი ამით გაითქვა" },
  { name: "ჩარჩო", descr: "look at this graaph" },
  { name: "სურათი", descr: "სელფი" },
  { name: "კამერა", descr: "cannon EOS 250D" },
];

let word = words[Math.floor(Math.random() * words.length)];
console.log(word);

const hint = document.getElementById("hint");
hintta.map((ht) => {
  if (word == ht.name) {
    hint.innerHTML = "მინიშნება: " + ht.descr;
  }
});

/* looping through the given data from the API and displaying inputs of the length of the word. */

for (let i = 0; i < word.length; i++) {
  const input = document.createElement("input");
  input.maxLength = 1;
  input.type = "text";
  input.className = "inputs";
  input.setAttribute("count", i);
  input.id = "inputType" + i;
  inputs.appendChild(input);
}

// for (let i = 0; i < words.length; i++) {
//   inputs.innerHTML += `
//     <input maxlength="1" type="text" id="inputType"  />
//     `;
// }
// const input = document.getElementById('inputType');
// input.addEventListener('keyup', (e) => {
//   console.log(e.target.id);

//   if (e.target.value.length >= 1) {
//     document.getElementById(e.target.id).focus();
//   }
// });

// function ValidatePassKey(tb) {
//   if (tb.length >= 1) document.getElementById(tb.id + 1).focus();
// }

let wordArr = [];
const pTag = document.getElementById("winOrLose");
let allInputs = document.querySelectorAll(".inputs");

/* making the placeholders of the first and the last inputs equal to the words' first and the last symbols */
// allInputs[0].placeholder = words[0][0];
// allInputs[words.length - 1].placeholder = words[words.length - 1];

const randInput = allInputs[Math.floor(Math.random() * allInputs.length)];
const d = randInput.getAttribute("count");
randInput.placeholder = word.charAt(d);

const randInput2 = allInputs[Math.floor(Math.random() * allInputs.length)];
const p = randInput2.getAttribute("count");
randInput2.placeholder = word.charAt(p);
if (d === p) {
  console.log("same shit");
  const randInput3 = allInputs[Math.floor(Math.random() * allInputs.length)];
  const k = randInput3.getAttribute("count");
  randInput3.placeholder = word.charAt(k);
}

// console.log(word.charAt(d), d, word.charAt(p), p, allInputs);

let cnt = 0;

allInputs.forEach((element) => {
  element.onclick = () => {
    cnt = element.getAttribute("count");
  };
  element.onkeyup = function (event) {
    if (element.value.length == 0) {
      if (cnt <= 0) {
        return;
      } else {
        cnt--;
        document.getElementById(element.id.slice(0, -1) + cnt).focus();
      }
    }

    if (element.value.length >= element.maxLength) {
      cnt++;

      if (cnt == word.length) {
        cnt = -1;
      } else {
        document.getElementById(element.id.slice(0, -1) + cnt).focus();
      }
    }
  };
});

/* after clicking the "CHECK!" button, it will loop through the options and will push the values of inputs to the array 'wordArr' */

checkBtn.addEventListener("click", () => {
  hint.style.display = "none";
  for (let i = 0; i < allInputs.length; i++) {
    const value = allInputs[i].value;
    wordArr.push(value);
  }
  //set the array's length to 0

  /* if the given word from the API is equal to the word taken from the input, it'll display 'YU WON!!!', if NOT it'll display 'WTF MAN.. WRONG.'*/

  console.log(nextButton);
  if (word === wordArr.join("")) {
    pTag.innerHTML = "გამოიცანი!!!";
    wordArr = [];
    nextButton.style.display = "block";
  } else {
    pTag.innerHTML = "თავიდან სცადე";
    wordArr = [];
  }
});
