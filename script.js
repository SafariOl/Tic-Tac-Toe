const boxes = document.querySelectorAll('.box')
const results = document.querySelector('.results')
const play = document.querySelector('.play')

let answers = [0, 0, 0, 0, 0, 0, 0, 0, 0]

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        play.style.display = 'block'
        let isFree = false
        if(box.hasChildNodes()){
            return
        }
        answers[index] = 'user'
        if(answers[index] == 'user'){
            const user = document.createElement('div')
            user.classList.add('user')
            box.appendChild(user)
        }
        checkResults(answers)
        if(results.textContent == ''){
            setTimeout(() => {
                if(answers.filter(el => el == 0).length == 0 && results.textContent !== undefined){
                    results.textContent = 'DRAW!'
                    return
                } 
                
                while(!isFree){
                    const place = Math.floor(Math.random() * 9)
                    boxes.forEach((item, idx) => {
                        if(idx == place && !item.hasChildNodes()){
                            answers[place] = 'computer'
                            if(answers[place] == 'computer'){
                                const computer = document.createElement('div')
                                computer.classList.add('computer')
                                item.appendChild(computer)
                            }
                            isFree = true
                        }else{
                            return
                        }
                    })
                }
                
                checkResults(answers)
            }, 300)
        }
    })
})

function checkResults(data){

    if(data[0] === data[3] && data[3] === data[6] && data[6] !== 0){
        won(data[6])
    }else if(data[1] === data[4] && data[4] === data[7] && data[7] !== 0){
        won(data[7])
    }else if(data[2] === data[5] && data[5] === data[8] && data[8] !== 0){
        won(data[8])
    }else if(data[0] === data[1] && data[1] === data[2] && data[2] !== 0){
        won(data[2])
    }else if(data[3] === data[4] && data[4] === data[5] && data[5] !== 0){
        won(data[5])
    }else if(data[6] === data[7] && data[7] === data[8] && data[8] !== 0){
        won(data[8])
    }else if(data[0] === data[4] && data[4] === data[8] && data[8] !== 0){
        won(data[8])
    }else if(data[2] === data[4] && data[4] === data[6] && data[6] !== 0){
        won(data[6])
    }else{
        return 
    }
}

const won = (winner) => {
    results.textContent = winner + '!'
    document.querySelector('.block').style.display = 'block'
}


play.addEventListener('click', () => {
    location.reload()
})

