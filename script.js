
// 
let сanvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

function draw() {   
    if (canvas.getContext){

    //!нарисуем (голубую) окружность
    //     ctx.arc(
    //       250, // x - позиция точки
    //       50, // y - позиция точки 
    //       20 // радиус
    //       (3 *Math.PI) / 2, // радиальный  угол - начало дуги (по таблице ось Y наоборот)
    //       true // -> против часовой стрелки --- а по умолчанию (или false) по часовой стрелки
    //        );
    ctx.beginPath(); // создадим путь
    ctx.arc(250, 250, 200, 0, 360); 
    ctx.strokeStyle = 'rgb(89, 189, 255)' // цвет контура
    ctx.lineWidth = '3'// ширина контура
    ctx.stroke(); // заливка контура, иначе не увидеть фигуру

    //! минутные шкалы
    // в уме: окружность радиусом 200
    ctx.translate(250, 250); // переместили холст (саму ось) по центру круга
    ctx.beginPath();
    // поворот шкалы по окуржности
    ctx.rotate(2 *Math.PI); // поворот по оси (в радианах)
    ctx.moveTo(160,0); // точка пера
    ctx.lineTo(190,0); // линия до указанной координатной точки
    ctx.strokeStyle = 'black' // цвет контура
    ctx.stroke(); // заливка 
    


// просит браузер запланировать перерисовку на следующем кадре анимации. 
// В качестве параметра метод получает функцию, которая будет вызвана перед перерисовкой.
//! callback метод сам должен вызвать requestAnimationFrame() иначе анимация остановится.
        window.requestAnimationFrame(clock);
      } 
}  



function clock() {

}

// function clock() {
//     let time = new Date()
//     //ctx.globalCompositeOperation = 'destination-over';
//     //ctx.clearRect(0,0,300,300); // clear canvas
//     ctx.fillStyle = 'blue';
//     // 
//     ctx.fillRect(0, 0, 100, 100); 
    
//     if (i < 500) {

//         ctx.translate(time.getSeconds() / 10 + 1, 0)
//         // - 100 чтобы оставить видимую область прямоугольника
//         ctx.clearRect(time.getSeconds() + 1, 0, time.getSeconds() - 100, 100); 
//         //console.log(time.getSeconds());
//     }
    
    
//     window.requestAnimationFrame(clock);
//    //console.log('1') // будет 60 раз в секунду показывать
//    //console.log(new Date().getSeconds());
// }

      


