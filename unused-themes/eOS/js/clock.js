/*
var shouldBlink = true; // whether or not clock separator should blink
var clockType = 12; // 12 or 24 for 12-hour or 24-hour clock
*/

var blinking = false;
var next_sec = (1000 - (new Date().getMilliseconds()));

//languages
ul=(navigator.language) ? navigator.language : navigator.userLanguage;
langs=['en','es','fr','it','pt','zh','ru'];
lang=0; //default is english

days=[
['Sunday','domingo','dimanche','domenica','domingo','星期日','воскресенье'],
['Monday','lunes','lundi','lunedi','segunda','星期一','понедельник'],
['Tuesday','martes','mardi','martedì','terça','星期二','вторник'],
['Wednesday','miercoles','mercredi','mercoledì','quarta-feira','星期三,','среда'],
['Thursday','jueves','jeudi','giovedi','quinta','星期四','четверг'],
['Friday','viernes','vendredi','venerdì','sexta','星期五','пятница'],
['Saturday','sábado','samedi','sabato','sábado','星期六','суббота']];

months=[
['January','enero','Janvier','gennaio','Janeiro','芍月','Январь'],
['February','febrero','Février','febbraio','Fevereiro','杏月','Февраль'],
['March','marzo','Mars','marzo','Março','桃月','Март'],
['April','abril','Avril','aprile','Abril','梅月','Апрель'],
['May','mayo','Mai','maggio','Maio','榴月','Май'],
['June','junio','Juin','giugno','Junho','荷月','Июнь'],
['July','julio','Juillet','luglio','Julho','蘭月','Июль'],
['August','agosto','Août','agosto','Agosto','桂月','Август'],
['September','septiembre','Septembre','settembre','Setembro','菊月','Сентябрь'],
['October','octubre','Octobre','ottobre','Outubro','良月','Октябрь'],
['November','noviembre','Novembre','novembre','Novembro','冬月','Ноябрь'],
['December','deciembre','Décembre','dicembre','Dezembro','臘月','Декабрь']];

function run_clock()
{
	//set language
    for(i=0;i<=langs.length;i++) {
        if(ul.indexOf(langs[i])>-1) {
            lang=i;
        }
    }

	d = new Date();
	today=d.getDay();
	month=d.getMonth();
    year=d.getFullYear();
	hour = d.getHours();
	minutes = d.getMinutes();
	seconds = d.getSeconds();

	if (clockType != 24)
	{
		switch (true)
		{
			case hour > 12:
				hour -= 12;
				break;

			case hour == 0:
				hour = 12;
				break;
		}
	}

	if (minutes < 10) minutes = '0' + minutes;

	document.getElementById('hours').innerHTML = hour;
	document.getElementById('mins').innerHTML = minutes;
	document.getElementById('date').innerHTML = days[today][lang] + ", " + months[month][lang] + " " + d.getDate();

	next_minute = (60 - seconds);
	setTimeout('run_clock()', next_minute);
}

function blink()
{
	if (shouldBlink == false) return;

	if (blinking) document.getElementById('dots').innerHTML = " ";
	else document.getElementById('dots').innerHTML = ":";

	blinking = !blinking;

	setTimeout('blink()', 1000);
}

window.onload = run_clock(), setTimeout('blink()', next_sec);