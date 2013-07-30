(function(){
var DIT = '.';
var DAH = '-';

var dits = ['.','·'];
var dahs = ['_','-','=','–'];

var charCodes=new Array(36); 
charCodes['.-']='A';
charCodes['-...']='B';
charCodes['-.-.']='C';
charCodes['-..']='D';
charCodes['.']='E';
charCodes['..-.']='F';
charCodes['--.']='G';
charCodes['....']='H';
charCodes['..']='I';
charCodes['.---']='J';
charCodes['-.-']='K';
charCodes['.-..']='L';
charCodes['--']='M';
charCodes['-.']='N';
charCodes['---']='O';
charCodes['.--.']='P';
charCodes['--.-']='Q';
charCodes['.-.']='R';
charCodes['...']='S';
charCodes['-']='T';
charCodes['..-']='U';
charCodes['...-']='V';
charCodes['.--']='W';
charCodes['-..-']='X';
charCodes['-.--']='Y';
charCodes['--..']='Z';
charCodes['.----']='1';
charCodes['..---']='2';
charCodes['...--']='3';
charCodes['....-']='4';
charCodes['.....']='5';
charCodes['-....']='6';
charCodes['--...']='7';
charCodes['---..']='8';
charCodes['----.']='9';
charCodes['-----']='0';
charCodes['.-.-.-']='.';
charCodes['--..--']=',';
charCodes['..--..']='?';
charCodes['-....-']='-';
charCodes['-...-']='=';
charCodes['---...']=':';
charCodes['-.-.-.']=';';
charCodes['-.--.']='(';
charCodes['-.--.-']=')';
charCodes['-..-.']='/';
charCodes['.-..-.']='\'\'';
charCodes['...-..-']='$';
charCodes['.----.']='\'';
charCodes['.-.-..']='\n';
charCodes['..--.-']='_';
charCodes['.--.-.']='@';
charCodes['---.']='!';
charCodes['-.-.--']='!';
charCodes['.-.-.']='+';
charCodes['.-...']='~';
charCodes['...-.-']='#';
charCodes['. ...']='&';
charCodes['-..-.']='/';

var decrypt = function() {
	var txt = clean(getSelectionText());
	var decrypted = '';
	var i = 0;
	var curSeq = '';
	var phrase = '';
	while (i < txt.length) {
		var curChar = txt[i];
		if (curChar === DIT || curChar === DAH) {
			curSeq += curChar;
		}
		else {
			if (charCodes[curSeq]) phrase += charCodes[curSeq];
			else if (phrase.length&&phrase[phrase.length-1]!==' ') phrase += ' ';
			curSeq = '';
		}
		i++;
	}
	if (charCodes[curSeq]) phrase += charCodes[curSeq];
	alert(phrase);
};

var clean = function(txt) {
	var output = txt;
	var reDits = new RegExp('[\\' + dits.join('\\') + ']','g');
	var reDahs = new RegExp('[\\' + dahs.join('\\') + ']','g');
	var reNada = new RegExp('[^\\' + dits.join('\\') + dahs.join('\\') + ']', 'g');
	
	output = output.replace(/^\s*/,'').replace(/\s*$/,'');
	output = output.replace(reDits, DIT);
	output = output.replace(reDahs, DAH);
	output = output.replace(reNada, ' ');
	
	return output;
};

var getSelectionText = function() {
    var text = '';
    if (typeof window.getSelection != 'undefined') {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement('div');
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            text = container.innerText;
        }
    } else if (typeof document.selection != 'undefined') {
        if (document.selection.type == 'Text') {
            text = document.selection.createRange().text;
        }
    }
	return text;
};
decrypt();
})();