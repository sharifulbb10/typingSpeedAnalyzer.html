//to select a random text those kept hidden in the html file
//for id selection of 'p' tags randomly 
function randomIdGenerate() {
	return ["#text", Math.floor(Math.random()*15)].join("");
}

//to confirm the user's input
function initiated() {
	i='defined';
}

//to make the user directly start writing without cursor placement
document.addEventListener('keydown', (event) => {
	document.querySelector(".input-box").focus();
});

//to initiate the user's input
function getText() {
	getInput();
	matchInput();
}

//to assing the random text into the page
window.onload = () => {
	document.querySelector(".input-box").value= "";
	let randomId=randomIdGenerate();
	let randomText=document.querySelector(randomId).textContent;
	document.querySelector(".text-box").innerHTML=randomText;
	givenTxt=document.querySelector(".text-box").innerHTML;
}

//to prevent pesting a copied text
document.querySelector(".input-box").addEventListener("paste", (event)=>event.preventDefault());

//to obtain the typed text
function getInput() {
	return document.querySelector(".input-box").value;
}

//to see if a word typed correctly or not
function matchInput() {
	inputTxt=getInput();
	newArr=[];
	newAttTxt=[];
	horizontalLine();  //interactive horizontal bar
	if (inputTxt.length && (typeof i)=='undefined') {
		countTime("start");
		initiated();
		document.querySelector("#temp").style.display="none"; //whenever typing starts, removes the message
	}
	if (inputTxt.length>=givenTxt.length) {
		countTime("end");  //triggers when typing accomplishes
	}

	//to change the color of the text
	for (let i=0;i<inputTxt.length;i++) {
		if (givenTxt[i]==inputTxt[i]) {
			newArr.push("<span style=\"background-color: lightgreen;\">", givenTxt[i], "</span>");
		} else {
			newArr.push("<span style=\"background-color: #fea3a3;\">", givenTxt[i], "</span>");
		}
		newAttTxt.push(givenTxt[i]);

		//to prevent the user type excessive text
		if (inputTxt.length>=givenTxt.length) {
			document.querySelector(".input-box").setAttribute("onkeyup", "ended()");
		}
	}
	
	//to convert the all typed words into text
	let matchedTxt=newArr.join('');
	let checkedTxt=newAttTxt.join('');
	document.querySelector('.matched').innerHTML=matchedTxt;
	document.querySelector(".text-box").textContent=givenTxt.replace(checkedTxt, '');
	if (givenTxt.length==inputTxt.length) {
		accuracyMeasure(givenTxt, inputTxt); //to measure accuracy rate
	}
}


//prevents the users to type excessive text
function ended() {
	console.log("end of typing!");
	if (inputTxt.length>=givenTxt.length) {
		document.querySelector(".input-box").setAttribute("readonly", true);
	}
}

//to track the time and measuring WPM and accurary
function countTime(status) {
	let date1=new Date();
	if (status==="start") {
		time1=date1.getTime();
		i=1;
	}
	if (status==="end") {
		date2=new Date();
		time2=date2.getTime();
		timeTaken=time2-time1;
		correctWords=0;
		for (let i=0; i<givenTxt.split(" ").length;i++) {
			if (givenTxt.split(" ")[i]===inputTxt.split(" ")[i]) correctWords++;
		}
		wpm = roundedValue(correctWords / (timeTaken / 60000));
		console.log(`Words per minute is counted to be ${wpm}`);
		console.log(`Total words typed are ${inputTxt.split(' ').length}`);
		console.log(`corrected words ${correctWords}`);
		console.log(`milliseconds taken in ${timeTaken/1000}`);

		setTimeout(showResult, 1500);
	}
}

//to measure accuracy
function accuracyMeasure(referenceTxt, typedTxt) {
	referenceTxtArr=referenceTxt.split(" ");
	typedTxtArr=typedTxt.split(" ");
	errorCount=0;
	for (i=0; i<referenceTxtArr.length; i++) {
		if (referenceTxtArr[i]!=typedTxtArr[i]) {
			errorCount++;
		}
	}
	return roundedValue(((referenceTxtArr.length-errorCount)/referenceTxtArr.length * 100))
}

//for a round figure of any float number
function roundedValue(floatNum) {
	result = floatNum*100;
	return Math.round(result)/100;
}

//horizontal progress bar
function horizontalLine() {
	let firstWidth=0, secondWidth=100;
	firstWidth>=100? firstWidth=100:firstWidth=inputTxt.length/givenTxt.length*100;
	secondWidth=100-firstWidth;
	document.querySelector(".fisrtLine").style.width=`${firstWidth}%`;
	document.querySelector(".secondLine").style.width=`${secondWidth}%`;
}

//to display the result
function showResult() {
	document.querySelector('#temp').innerHTML=`Congratulations!<br>Your typing speed is ${wpm} Words per Minute with an accuracy of ${accuracyMeasure(givenTxt, inputTxt)}%`;
	document.querySelector('#temp').style.display="block";
}