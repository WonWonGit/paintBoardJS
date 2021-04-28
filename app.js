const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const EraserBtn = document.getElementById("jsEraser");
const ClearBtn = document.getElementById("jsClear");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    let x = event.offsetX;
    let y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    if(filling === true){
        const bg_color = color;
        ctx.fillStyle = bg_color;
    }else{
        const painting_color = color;
        ctx.strokeStyle = painting_color;
    }
    console.log(ctx.fillStyle, ctx.strokeStyle);
}

function handleRangeChange(event){
    const size  = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
        
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function hadleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.prevetDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function handleEraserClick(){
    ctx.strokeStyle = ctx.fillStyle;
    ctx.strokeWidth = 10;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}
function handdleClearClick(){
    ctx.clearRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", hadleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

if(EraserBtn){
    EraserBtn.addEventListener("click", handleEraserClick);
}
if(ClearBtn){
    ClearBtn.addEventListener("click", handdleClearClick);
}