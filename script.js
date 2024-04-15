const main = document.querySelector('main')
let lastTime = Date.now()
let arrLS = JSON.parse(window.localStorage.getItem('AVG')) ?? []


// Функция создания элементов на странице
async function renderContent(){
    const btnReset = document.createElement('button')
    btnReset.className = 'reset'
    btnReset.textContent = 'Reset'
    const avg = document.createElement('p')
    avg.className = 'avg'
    avg.textContent = 'AVG: 0 sec'
    const gameField = document.createElement('div')
    gameField.className = 'game__field'
    const scoreField = document.createElement('div')
    scoreField.className = 'score__field'
    const btn = document.createElement('button')
    btn.className = 'push'
    gameField.append(btnReset)
    gameField.append(avg)
    gameField.append(btn)
    main.append(gameField)
    main.append(scoreField)

    // Собыите для кнопки
    btn.addEventListener('click', (evt => {
        console.log(evt.target);
        const nowTime = Date.now()
        const maxWidth = gameField.offsetWidth - btn.offsetWidth
        const maxHeight = gameField.offsetHeight - btn.offsetHeight
        const width = getRandomInt(scoreField.offsetWidth, maxWidth)
        const height = getRandomInt(1, maxHeight)
        btn.style.left = `${width}px`
        btn.style.top = `${height}px`
        const result = ((nowTime - lastTime) / 1000).toFixed(3)
        const obj = {'time': result}
        arrLS.push(obj)
        window.localStorage.setItem('avg', JSON.stringify(arrLS))
        const scoreText = document.createElement('p')
        scoreText.className = 'score__text'
        scoreText.textContent = `${result}sec`
        scoreField.append(scoreText)
        avg.textContent = `AVG: ${getAVG()} sec`
        lastTime = nowTime
    }))

    btnReset.addEventListener('click', (evt =>{
        console.log(evt.target);
        btn.style.left = `0px`
        btn.style.top = `0px`
        scoreField.innerHTML = ''
        avg.textContent = 'AVG: 0 sec'
        window.localStorage.clear()
    }))
}

renderContent()

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAVG(){
    console.log(arrLS)
    const sum = arrLS.reduce((sum, current) => sum + Number(current.time), 0)
    return avg = (sum / arrLS.length).toFixed(3)
}