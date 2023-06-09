
//! Суть цикла "window.requestAnimationFrame(callback);":
//! 1 -- один "Clock" метод находится в цикле, благодаря методу браузера "window.requestAnimationFrame(callback);"
//! 2 -- Чтобы замкнуть цикл, нужно в callback (Clock) также вызвать "window.requestAnimationFrame(callback);"
//! 2 -- "window.requestAnimationFrame(callback);" будет вызывать Callback (Clock) 60 раз в секунду (т.е. столько, сколько частота монитора)

//!Суть анимации (важно помнить что АНИМАЦИЯ ЭТО ЦИКЛ КАДРОВ)
//! 1 -- Очистить canvas (холст) полностью весь (ctx.clearRect(0,0,500,500)) - от предудущей анимации (позиции стрелок)
//! 2 -- В каждом цикле рисовать циферблат
//! 3 -- В каждом цикле рисовать новую позцию стрелки
//! 4 -- НО чтобы, новая позиция стрелки, высчитывалась с изночально, то есть с 0, а не с предыдущей позции стрелки
//! 5 -- Мы сохраняем НУЛЕВУЮ (изначальную, первую) позцию стрелки - save()
//! 6 -- И после смены позции стрелки, востанавливаем в НУДЕВОЕ ПОЛОЖЕНИЕ - restore()

//! грубо говоря об анимации:
//! 1 -- анимация в цикле
//! 2 -- в каждой итерации мы сначала очищаем canvas (от предыдущей анимации)
//! 3 -- в каждой итерации мы ресуем новую позцию стрелки 
//! 4 -- не зыбывем указать точку отсчета для переворачивания (анимации) стрелки - save() и restore()


let сanvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
function draw() {   
    if (canvas.getContext){ // проверка на поддержку canvas
// просит браузер запланировать перерисовку на следующем кадре анимации. 
// В качестве параметра метод получает функцию, которая будет вызвана перед перерисовкой.
//! callback метод сам должен вызвать requestAnimationFrame() иначе анимация остановится.
         window.requestAnimationFrame(clock);
      } 
}  


//! метод для радиального расчета (degrees) - необходимые градусы 
function getRadians(degrees) {
    return (Math.PI / 180) * degrees;
  } 


function clock() {
//! сохранить ПУСТОЕ состояние 
  ctx.save();
// каждый раз очищать предыдущий рендеринг в цикле (БЕЗ НЕГО РАБОТАЕТ, ТАК КАК УЖЕ СОХРАНИЛИ ПУСТОЙ ХОЛСТ)
  ctx.clearRect(0,0,500,500); // clear canvas
  //! -------------ЦИФЕРБЛАТ-------------------
  //! *********нарисуем (голубую) окружность
    //     ctx.arc(
    //       250, // x - позиция точки
    //       50, // y - позиция точки 
    //       20 // радиус
    //       (3 *Math.PI) / 2, // радиальный  угол - начало дуги (по таблице ось Y наоборот)
    //       true // -> против часовой стрелки --- а по умолчанию (или false) по часовой стрелки
    //        );
    ctx.translate(250, 250); // переместили холст (саму ось) по центру круга    
    ctx.beginPath(); // создадим путь
    ctx.arc(0, 0, 200, 0, 360); 
    ctx.strokeStyle = 'rgb(89, 189, 255)' // цвет контура
    ctx.lineWidth = '3'// ширина контура
    ctx.stroke(); // заливка контура, иначе не увидеть фигуру


  //! ***********создадим 60 шкал
  // в уме: окружность радиусом 200
  //! цикл постройки всех 60-ти шкал
  ctx.rotate((Math.PI / 180) * 284); // -96 чтобы 12 была наверху - выровнять позцию
  for(let i = 0; i <= 60; i++) { // 60 раз нарисовать шкалу (60 секудн)

    
    //! порядок важен
    ctx.strokeStyle = 'black' // цвет контура
    // поворот по оси (в радианах)
    // поворот шкалы по окружности
    ctx.rotate((Math.PI / 180) * 6); // 60 шкал с интервалом по 6 пискселей между ними
  
    // обычные шкалы
    ctx.beginPath();
    ctx.moveTo(160,0); // точка пера
    ctx.lineTo(190,0); // линия до указанной координатной точки
    ctx.stroke(); // заливка 


    // длинные шкалы (каждый 5-й)
    if (i%5 == 0 && i <= 60) {
      ctx.beginPath();
      ctx.moveTo(140,0); // точка пера
      ctx.lineTo(190,0); // линия до указанной координатной точки
      ctx.stroke(); // заливка 
    }
  }
  
  //! Цифры 1 - 12
  for(let d = 1; d <= 12; d++) {
    //ctx.restore()
    ctx.save();
    ctx.translate(200, 0);
    textAlign = "left";
    ctx.font = "48px serif";
    ctx.rotate((Math.PI / 180) * 90);
    ctx.fillText(`${d}`,-10, 0);
    ctx.restore()
    ctx.rotate((Math.PI / 180) * 30); // 60 шкал с интервалом по 6 пискселей между ними
    
    // ctx.restore()
    
    //
    
    // ctx.textBaseline = "middle";
    //ctx.fillText(`${d}`, 200, 0);
    
  }

//! воссстановливать пустой холст (без стрелки и циферблата), но можно и затертый (ctx.clearRect())
ctx.restore()

//! -------------СТРЕЛКА СЕКУНДНАЯ-------------
//! сохранил состояние все что было до него, 
//! и так как в конце (цикла) постянный сброс (restore),
//! соответсвенно сохранятся будет пустой циферблат, 
//! с нудевой позицией холста
//! и очередное перевертываение стрелки (например 60 - ctx.rotate(getRadians(60)))
//! будет отсчет с НУЛЕВОЙ ПОЗИЦЕЙ.
//! 0 + 10, 0 + 20, 0 + 30, 0 + 40 И ТАК ДВИЖЕТСЯ (рисуется) СТРЕЛКА ПО 10

ctx.save() // сохранить пустой холст и позицию оси(rotate())


// переместили холст (саму ось) по центру круга
  ctx.translate(250, 250);  //! ДЛЯ СТРЕЛКИ
  //окружность радиусом 200

//! данные
  let now = new Date();
  // секунды
  let seconds = now.getSeconds();
  // минуты
  let minutes = now.getMinutes();
  // часы 
  let hours = now.getHours();
  hours =     hours>=12 ? hours-12 : hours; // чтобы часовая стрелка выше 12 сбрасывала счет


 // повернем холст вместе со стрелкой   
// - 90 чтобы стрелка была повернута как на часах 0 это  270 градусов  
      ctx.strokeStyle = 'red' // цвет контура стрелки
      ctx.rotate(getRadians((seconds * 6) - 100) ); // 60 шкал с интервалом по 6 пискселей между ними

      ctx.beginPath();
      ctx.lineWidth = '3'// ширина контура
      ctx.moveTo(0,0); // точка пера в центре холста (круга)
      ctx.lineTo(190,0); // линия до указанной координатной точки
      ctx.stroke(); // заливка 
      ctx.closePath()
      
//! восстановить состояние до save() - пустой холст
      ctx.restore();  

//! -------------СТРЕЛКА МИНУТНАЯ-------------
//! снова сохранить то, что восстановили - пустой холст
      ctx.save();


      ctx.strokeStyle = 'black' // цвет контура стрелки
      ctx.beginPath();
      ctx.translate(250, 250);  // центр круга
      ctx.rotate(getRadians((minutes * 6) - 100)); // 60 шкал с интервалом по 6 пискселей между ними
      ctx.lineWidth = '3'// ширина контура
      ctx.moveTo(0,0); // точка пера в центре холста (круга)
      ctx.lineTo(150,0); // линия до указанной координатной точки
      ctx.stroke(); // заливка 

//! снова сбросить до пустого холста
      ctx.restore(); 


//! -------------СТРЕЛКА ЧАСОВАЯ-------------
//! снова сохранить то, что восстановили - пустой холст
ctx.save();


ctx.strokeStyle = 'black' // цвет контура стрелки
ctx.beginPath();
ctx.translate(250, 250);  // центр круга

// долго высчитывал, что секундную, что минутную, что часовую стрелку
//* поэтому часовая стрелка показывает только с точностью в часы, 8: 40 занчит стрелка часовая на ровно 8
// hours - 12 - 1 - так как данные new Date.getHours() в формате 24 часа
ctx.rotate(getRadians(((360 / 12) * (hours - 12 - 1)) - 70), true); 
//ctx.rotate( hours*(Math.PI/6) + (Math.PI/360)*minutes + (Math.PI/21600)*seconds, true); 

ctx.lineWidth = '5'// ширина контура
ctx.moveTo(0,0); // точка пера в центре холста (круга)
ctx.lineTo(100,0); // линия до указанной координатной точки
ctx.lineCap = "round";
ctx.stroke(); // заливка 

//! снова сбросить до пустого холста
ctx.restore(); 






//! ----------ЭЛЕКТРОННЫЕ ЧАСЫ-----------------
// элементы
let elementElectroWatch = document.querySelector('#elTime')
let elementHours = document.querySelector('.ElHours');
let elementMinutes = document.querySelector('.ElMinutes');
let elementSeconds = document.querySelector('.ElSeconds');

// данные
let electroTimeNow = new Date();
let electroHours = electroTimeNow.getHours();
let electroMinutes = electroTimeNow.getMinutes();
let electroSeconds = electroTimeNow.getSeconds();

elementElectroWatch.style.fontSize = '40px'
elementElectroWatch.style.color = 'blue'

elementHours.innerHTML = electroHours;
elementMinutes.innerHTML = `:${electroMinutes}`;
elementSeconds.innerHTML = `:${electroSeconds}`;




//! запустить в цикл
  window.requestAnimationFrame(clock);
}






