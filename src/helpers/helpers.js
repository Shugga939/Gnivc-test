import {CASES} from './constants'

export function validateValue (val) {
  const numbers = /[0-9]/g
  const latinChars = /[a-z]/gi

  if (val.trim().length<2) {
    return 'Invalid length'
  } else if (val.match(numbers)) {
    return 'There are numbers'
  } else if (val.match(latinChars)) {
    return 'There are latin chars'
  } else if (!/^\S+$/.test(val)) {
    return 'There is more than one word'
  } 
}

export function lastCharIsVowel(word) {
  const vowels = /[ая]/gi
  const lastLetter = word[word.length-1]
  if (lastLetter.match(vowels)){
    return true
  } else{
    return false
  } 
}

export function parseIfNotVowel (word, select) {
  const lastChar = word[word.length-1]
  let parsedWord = ''
  switch (select) {
    case CASES.Родительный : {
      lastChar === 'ь'? 
        parsedWord= word.slice(0,word.length-1)+'я'
        :
        parsedWord= word +'а'
      break
    }
    case CASES.Дательный : {
      lastChar === 'ь'? 
        parsedWord= word.slice(0,word.length-1)+'ю'
        :
        parsedWord= word +'у'
      break

    }
    case CASES.Винительный : {
      parsedWord = word
      break

    }
    case CASES.Творительный : {
      lastChar === 'ь'? 
        parsedWord= word.slice(0,word.length-1)+'ем'
        :
        parsedWord= word +'ом'
      break

    }
    case CASES.Предложный : {
      lastChar === 'ь'? 
        parsedWord= word.slice(0,word.length-1)+'е'
        :
        parsedWord= word +'е'
      break
    }
    default : {
      parsedWord = word
    }
  }
  return parsedWord;
}

export function parseIfVowel (word, select) {
  const lastChar = word[word.length-1]
  let parsedWord = ''
  switch (select) {
    case CASES.Родительный : {
        parsedWord= word.slice(0,word.length-1)+'и'
      break
    }
    case CASES.Дательный : {
      parsedWord= word.slice(0,word.length-1)+'е'
      break
    }
    case CASES.Винительный : {
      lastChar === 'а'? 
        parsedWord= word.slice(0,word.length-1)+'у'
        :
        parsedWord= word.slice(0,word.length-1)+'ю'
      break
    }
    case CASES.Творительный : {
      lastChar === 'а'? 
        parsedWord= word.slice(0,word.length-1)+'ой'
        :
        parsedWord= word.slice(0,word.length-1)+'ей'
      break
    }
    case CASES.Предложный : {
      parsedWord= word.slice(0,word.length-1)+'е'
      break
    }
    default : {
      parsedWord = word
    }
  }
  return parsedWord;
}