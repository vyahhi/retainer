// http://stackoverflow.com/a/12646864/92396
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

links = $('#mw-content-text p a').not($('.reference a'))
words = new Set(links.toArray().map(link => link.text))
words = Array.from(new Set(words)); // keep only unique

if (links.length >= 4) { // if less – we don't have enough options to choose for dropdowns
	links.replaceWith(function() {
		var correct = $(this).text();
		var options = [correct];
		while (options.length < 4) {
			word = words[Math.floor(Math.random() * words.length)];
			if (!options.includes(word)) {
				options.push(word);
			}
		}
		options = shuffleArray(options);
		var select = '<select><option>' + options.join('</option><option>') + '</option></select>';
		var item = $(select)
		item.change(function(){
			val = $(this).val()
			if (val === correct) {
				$(this).css('background-color', 'lightgreen');
			}
			else {
				$(this).css('background-color', 'lightcoral');
			}
		});
		item.prop("selectedIndex", -1);
		return item;
	});
}