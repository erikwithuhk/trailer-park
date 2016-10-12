const autoSwap = setInterval( swap, 3500 );

// pause slideshow and reinstantiate on mouseout
$('ul, span').hover(
  function () {
    clearInterval(autoSwap);
},
  function () {
   autoSwap = setInterval( swap, 3500 );
});

const items = [];
let startItem = 1;
let position = 0;
const itemCount = $('.carousel li.items').length;
const leftpos = itemCount;
const resetCount = itemCount;


//swap images function
function swap(action) {
  let direction = action;

  //moving carousel backwards
  if(direction == 'counter-clockwise') {
    let leftitem = $('.left-pos').attr('id') - 1;
    if(leftitem == 0) {
      leftitem = itemCount;
    }

    $('.right-pos').removeClass('right-pos').addClass('back-pos');
    $('.main-pos').removeClass('main-pos').addClass('right-pos');
    $('.left-pos').removeClass('left-pos').addClass('main-pos');
    $('#'+leftitem+'').removeClass('back-pos').addClass('left-pos');

    startItem--;
    if(startItem < 1) {
      startItem = itemCount;
    }
  }

  // moving carousel forward
  if(direction == 'clockwise' || direction == '' || direction == null ) {
    function pos(positionvalue) {
      if(positionvalue != 'leftposition') {
        //increment image list id
        position++;

        //if final result is greater than image count, reset position.
        if((startItem+position) > resetCount) {
          position = 1-startItem;
        }
      }

      //setting the left positioned item
      if(positionvalue == 'leftposition') {
        //left positioned image should always be one left than main positioned image.
        position = startItem - 1;

        //reset last image in list to left position if first image is in main position
        if(position < 1) {
          position = itemCount;
        }
      }

      return position;
    }

   $('#'+ startItem +'').removeClass('main-pos').addClass('left-pos');
   $('#'+ (startItem+pos()) +'').removeClass('right-pos').addClass('main-pos');
   $('#'+ (startItem+pos()) +'').removeClass('back-pos').addClass('right-pos');
   $('#'+ pos('leftposition') +'').removeClass('left-pos').addClass('back-pos');

    startItem++;
    position=0;
    if(startItem > itemCount) {
      startItem = 1;
    }
  }
}

// //next button click function
// $('#next').click(function() {
//   swap('clockwise');
// });

// //prev button click function
// $('#prev').click(function() {
//   swap('counter-clockwise');
// });

// //if any visible items are clicked
// $('li').click(function() {
//   if($(this).attr('class') == 'items left-pos') {
//      swap('counter-clockwise');
//   }
//   else {
//     swap('clockwise');
//   }
// });
