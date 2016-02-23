(function(){

  $('select').styler({selectSearch: true});

  $('.content_bottom_text').columnize({
       columns:2
  });

  // Ползунки с ценами
  $('#slider-range').slider({
    range: true,
    min: 0,
    max: 25000,
    values: [ 100, 13000 ],
    slide: function( event, ui ) {
      $("#money-begin").val(ui.values[0]);
      $("#money-end").val(ui.values[1]);
    }
  });

  $("#money-begin").val($('#slider-range').slider( "values", 0 ));
  $("#money-end").val($('#slider-range').slider( "values", 1 ));

  // Сброс чекбоксов
  $('.filters__clear').on('click', function(e){
      e.preventDefault();

      $(this)
        .closest('.filters__item')
        .find('.checkbox')
        .prop('checked', false);
  });

  // Выбор цвета
  $('.color__item').on('click', function(e){
      $(this)
        .addClass('activ')
        .siblings()
        .removeClass('activ');
  });
  //Аккордеон
  $('.filters__link').on('click', function(e){
      e.preventDefault();
      var $this = $(this),
          item = $this.closest('.filters__item'),
          list = $this.closest('.filters__list'),
          items = list.find('.filters__link'),
          content= item.find('.filter__inner'),
          otherContent = list.find('.filter__inner'),
          duration = 800;

      if (!$this.hasClass('activ')) {

        items.removeClass('activ');
        // Закрытие контента
        otherContent.stop(true).slideUp( function(){
          $this.removeClass('activ'), duration
        })

        // Открытие контента
        content.stop(true).slideDown( function(){
          $this.addClass('activ'), duration
        })
      }else {
        // Закрытие контента
        content.stop(true).slideUp( function(){
          $this.removeClass('activ'), duration
        })
      }
  });

})();
