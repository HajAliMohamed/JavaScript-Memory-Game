document.querySelector('.control-buttons').addEventListener('click',()=>{
    let yourName = prompt('Enter Your Name')
    let nameValue = document.querySelector('.name span')
    if(yourName=== null || yourName===""){
        nameValue.textContent= 'PlayerUnknown'
    }else{
        nameValue.textContent= `${yourName} Try to match all the blocks`
    }

    document.querySelector('.control-buttons').remove()
})

var tries = document.querySelector('.tries span')
let duration = 1000
let blocksContainer = document.querySelector('.memory-game-blocks')

let blocks = Array.from(blocksContainer.children)

let orderRange = [...Array(blocks.length).keys()]

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}      
shuffle(orderRange)

console.log(orderRange)

blocks.forEach((block,index)=>{
    block.style.order= orderRange[index]

    block.addEventListener('click',function(){
        flip(block)
    })
})

function flip(theBlock){
    theBlock.classList.add('is-flipped')

    let allFlippedBlocks = blocks.filter((block)=>{
        return block.classList.contains('is-flipped')
    })
    if(allFlippedBlocks.length=== 2){
        stopClicking()
        checkMatch(allFlippedBlocks[0],allFlippedBlocks[1])
    }



}

function stopClicking(){
    blocksContainer.classList.add('no-clicking')
    setTimeout(()=>{
        blocksContainer.classList.remove('no-clicking')
        

    },duration)
}


function checkMatch(block1,block2){
    if(block1.getAttribute('data-technology') === block2.getAttribute('data-technology') ){
        block1.classList.remove('is-flipped')
        block2.classList.remove('is-flipped')

        block1.classList.add('has-match')
        block2.classList.add('has-match')
    }else{
        tries.textContent = parseInt(tries.textContent) + 1
        setTimeout(()=>{
            block1.classList.remove('is-flipped')
            block2.classList.remove('is-flipped')
        },duration)
    }
}