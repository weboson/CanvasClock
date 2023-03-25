

// метод радиального расчета (degrees) - необходимые градусы 
// function getRadians(degrees) {
//     return (Math.PI / 180) * degrees;
//   } 
// не стал пользоватся, чтобы было нагляднее, я эту формулу использую на месте, например в методе createMinuteAndSecondScale()

//! создание 60 шкал
function createMinuteAndSecondScale() {

    ctx.translate(250, 250); // переместили холст (саму ось) по центру круга

      // в уме: окружность радиусом 200
      //! цикл постройки всех 60-ти шкал
      for(let i = 0; i <= 60; i++) { // 60 раз нарисовать шкалу (60 секудн)
        // поворот шкалы по окуржности
        //! порядок важен
        ctx.strokeStyle = 'black' // цвет контура
        // поворот по оси (в радианах)
        ctx.rotate((Math.PI / 180) * 6); // 60 шкал с интервалом по 6 пискселей между ними
        ctx.beginPath();
        ctx.moveTo(160,0); // точка пера
        ctx.lineTo(190,0); // линия до указанной координатной точки
        ctx.stroke(); // заливка 
 
      }



} 
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

    //! метод рисует минутные/секундные (60 шт) шкалы (по краю круга)
    createMinuteAndSecondScale();

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

      


