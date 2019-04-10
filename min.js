	var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		 var myArr = JSON.parse(this.responseText);
		 createButtons(myArr);
		 createBar(myArr);
		}
	};
	xhttp.open("GET", "http://pb-api.herokuapp.com/bars", true);
	xhttp.send();
	function createButtons(arr) {
		var buttons = arr.buttons;
		var limit = arr.limit;
		var out = "";
		var i;
		var vals = Object.keys(buttons).map(function(key) {
			return out +='<button type="button" class="btn btn-sm btn-outline-secondary btcls" data-value="'+limit+'"  id="'+buttons[key]+'" onclick="barAnimation(this.id);">'+buttons[key]+'</button>';
		});
	    document.getElementById("id01").innerHTML = out;
    }

	function createBar(arr) {
			var bars = arr.bars;
			var out = "";
			var i;                                                                              
			pSelect = document.getElementById('p1');
			var vals = Object.keys(bars).map(function(key) {
				pSelect.options[pSelect.options.length] = new Option('Progress '+(Number(key)+1), bars[key]);
				return out +='<div class="progress brcls"><div class="progress-bar progress-bar-striped progress-bar-animated" id="barID_'+key+'" style="width:'+bars[key]+'%;">'+bars[key]+'</div></div><br>';
			});
			document.getElementById("id02").innerHTML = out;
	}
	
	function barAnimation(buttonValue) {
		var limit = document.getElementById(buttonValue).getAttribute('data-value');
		var selectedProgress = document.getElementById("p1").options[document.getElementById("p1").selectedIndex].text;
		var progress = selectedProgress.match(/\d/g).join("");
		var barValue = document.getElementById("barID_"+(progress-1)).innerHTML.replace(/[^a-zA-Z0-9 ]/g, ""); 
		
		if((Number(barValue) + Number(buttonValue)) >= 0 ) { 
			document.getElementById("barID_"+(progress-1)).style.width =  Number(barValue) + Number(buttonValue)+'%';
			document.getElementById("barID_"+(progress-1)).innerHTML = Number(barValue) + Number(buttonValue)+'%';
			if((Number(barValue) + Number(buttonValue)) > limit) {
				document.getElementById("barID_"+(progress-1)).classList.add("bg-danger");
			} else {
				document.getElementById("barID_"+(progress-1)).classList.remove("bg-danger");
			}
		} else {
			alert('Bar should not be less than 0');
		}
		
	} 