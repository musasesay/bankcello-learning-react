const gnar = 'gnarly'

let __filename
let __dirname

export const info = ({file=__filename,
    dir=__dirname})=>
    <p>{dir}: {file}</p>

switch(gnar){
    default:
        console.log('gnarley')
        break
}
