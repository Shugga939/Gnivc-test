import { useState } from "react";
import {validateValue, lastCharIsVowel} from './helpers/helpers'
import {parseIfNotVowel, parseIfVowel} from './helpers/helpers'
import {CASES} from './helpers/constants'

function App() {
  let [inputValue, setInputValue]= useState('')
  let [selectValue, setSelectValue] = useState(1)
  let [result, setResult] = useState('')
  let [errorMassage, setErrorMassage] = useState ({})
  let isValid = true

  function parseWord (event) {
    event.preventDefault()
    const validateResult = validateValue(inputValue) //проверяем валидность входных данных
    setErrorIfInvalid (validateResult) // обновляем состояние ошибки на прилетевший текст
    if (!isValid) return  // дропаем функцию если не прошли валидацию
    
    if (lastCharIsVowel(inputValue)) { // парсим слово в зависимости от буквы, на которую оно оканчивается
      setResult(parseIfVowel(inputValue, +selectValue))  // и выводим результат
    } else {
      setResult(parseIfNotVowel(inputValue, +selectValue))
    }

    function setErrorIfInvalid (val) {
      switch (val) {
        case 'Invalid length' : {
          setErrorMassage({...errorMassage,invalidVAlue:'Слово должно иметь длинну более 1 символа'})
          isValid = false
          break
        }
        case 'There are latin chars' : {
          setErrorMassage({...errorMassage,invalidVAlue:'Слово должно быть на кириллице'})
          isValid = false
          break
        }
        case 'There are numbers' : {
          setErrorMassage({...errorMassage,invalidVAlue:'Слово не должно содержать цифр'})
          isValid = false
          break
        }
        case 'There is more than one word' : {
          setErrorMassage({...errorMassage,invalidVAlue:'Значение должно содержать одно слово'})
          isValid = false
          break
        }
        default : {
          setErrorMassage({...errorMassage,invalidVAlue:''})
          isValid = true
        }
      }
    }
  }

  return (
    <div className='Wrapper'> 
      <form className='Form'>
        <h2>Склоняем существительные</h2>
        <div className="description">Введите слово:</div>
        <input value={inputValue} onChange={(val)=>setInputValue(val.currentTarget.value)}></input>
        {errorMassage.invalidVAlue && <div className='ErrorMessage'> {errorMassage.invalidVAlue} </div>}
        <div className="description">Выберите падеж:</div>
        <select onChange={(val)=>setSelectValue(val.currentTarget.value)}>
          <option value={CASES.Именительный}>Именительный</option>
          <option value={CASES.Родительный}>Родительный</option>
          <option value={CASES.Дательный}>Дательный</option>
          <option value={CASES.Винительный}>Винительный</option>
          <option value={CASES.Творительный}>Творительный</option>
          <option value={CASES.Предложный}>Предложный</option>
        </select>
        <button onClick={parseWord}>Склонить</button>
        <div className='Result'>Результат:
          <span>{ ` ${result}`}</span>
         </div>
      </form>
    </div>
  );
}

export default App;
