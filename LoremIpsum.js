export class LoremIpsum  {
	standard = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur soccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	lipsumwords = ["a", "ac", "accumsan", "ad", "adipiscing",
			"aenean", "aliquam", "aliquet", "amet", "ante", "aptent", "arcu",
			"at", "auctor", "augue", "bibendum", "blandit", "class", "commodo",
			"condimentum", "congue", "consectetur", "consequat", "conubia",
			"convallis", "cras", "cubilia", "cum", "curabitur", "curae",
			"cursus", "dapibus", "diam", "dictum", "dictumst", "dignissim",
			"dis", "dolor", "donec", "dui", "duis", "egestas", "eget",
			"eleifend", "elementum", "elit", "enim", "erat", "eros", "est",
			"et", "etiam", "eu", "euismod", "facilisi", "facilisis", "fames",
			"faucibus", "felis", "fermentum", "feugiat", "fringilla", "fusce",
			"gravida", "habitant", "habitasse", "hac", "hendrerit",
			"himenaeos", "iaculis", "id", "imperdiet", "in", "inceptos",
			"integer", "interdum", "ipsum", "justo", "lacinia", "lacus",
			"laoreet", "lectus", "leo", "libero", "ligula", "litora",
			"lobortis", "lorem", "luctus", "maecenas", "magna", "magnis",
			"malesuada", "massa", "mattis", "mauris", "metus", "mi",
			"molestie", "mollis", "montes", "morbi", "mus", "nam", "nascetur",
			"natoque", "nec", "neque", "netus", "nibh", "nisi", "nisl", "non",
			"nostra", "nulla", "nullam", "nunc", "odio", "orci", "ornare",
			"parturient", "pellentesque", "penatibus", "per", "pharetra",
			"phasellus", "placerat", "platea", "porta", "porttitor", "posuere",
			"potenti", "praesent", "pretium", "primis", "proin", "pulvinar",
			"purus", "quam", "quis", "quisque", "rhoncus", "ridiculus",
			"risus", "rutrum", "sagittis", "sapien", "scelerisque", "sed",
			"sem", "semper", "senectus", "sit", "sociis", "sociosqu",
			"sodales", "sollicitudin", "suscipit", "suspendisse", "taciti",
			"tellus", "tempor", "tempus", "tincidunt", "torquent", "tortor",
			"tristique", "turpis", "ullamcorper", "ultrices", "ultricies",
			"urna", "ut", "varius", "vehicula", "vel", "velit", "venenatis",
			"vestibulum", "vitae", "vivamus", "viverra", "volutpat",
			"vulputate"]
	punctuation = [".", "?"]

	sumWord = 0;

  allWords = ""

	trim(s) {
		return s.replace(/^\s+/,"").replace(/\s+$/,"");
	}
	
	randomInt(max) {
		return Math.round(Math.random()*max);
	}
	
	randomWord() {
		return this.lipsumwords[this.randomInt(this.lipsumwords.length - 1)];
	}
	
	randomPunctuation() {
		return this.punctuation[this.randomInt(this.punctuation.length - 1)];
	}

  wordCount(c) {
    this.sumWord += c;
    return this.sumWord;
  }
  
  words(count) {
    this.wordCount(count)
    let s = "";
		while (count-- > 0)
			s += this.randomWord() + " ";

		return this.trim(s); 
	}

	sentenceFragment() {
		return this.words(this.randomInt(10) + 3);
	}

	sentence() {
		let s = this.randomWord();
		s = s.substring(0, 1).toUpperCase() + s.substring(1) + " ";

		if (this.randomInt(1)) {
			let r = this.randomInt(3) + 1;
			for (var i = 0; i < r; i++)
				s += this.sentenceFragment() + ", ";
		}
		
    this.wordCount(1)
		return s + this.sentenceFragment() + this.randomPunctuation();
	}

	sentences(count) {
		let s = "";
		while (count-- > 0)
			s += this.sentence() + "  ";
		return this.trim(s)
    
	}

  allWordCount(num) {
    if(this.sumWord < num) {
     this.allWords += this.sentence(1) + ' ';
     this.allWordCount(num);
      
    }
    if(this.sumWord > num) {

      let wordOut = this.allWords.split(' ', num ).join(' ')
      let wl = wordOut[wordOut.length -1]
      
      if(wl == ','){
        return wordOut.slice(0, -1) + this.randomPunctuation();
      }
      else {
        return wordOut+ this.randomPunctuation();
      }
    }
  }

}