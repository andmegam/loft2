(function(){

  init();
  attachEvents();

  /**
   * Инициализация
   */
  function init() {
    $('select').styler({selectSearch: true});
    sliderMoney();
    setColumnize ();
    setRatingAll();
  }

  /**
   * Обработчики каталога
   */
  function attachEvents() {
    $('.filters__link').on('click', getFiltersAccord);
    $('.filters__clear').on('click', clearCheckbox);
    $('.color__item').on('click', getColor);
    $('.viewcatalog__item').on('click', updateViewCatalog);
    $('.tovar-foto-small__item').on('click', getNewFotoTovar);
    $('.rating__number').bind('DOMSubtreeModified', changeRating);

  }

  /**
   * Установка рейтинга всем товарам
   */
  function setRatingAll() {
    $('.tovar-descr__rating-item').each(function(e) {
      var $this = $(this),
          rating = $this.attr('data-rating');

          setRating($this, rating);
    });
  }

  /**
   * Установка рейтинга одному товару
   */
  function setRating($element, rating) {
    var widthRaiting = 19*rating;
      if (widthRaiting> 95) {
        widthRaiting = 95
      }

      if (widthRaiting < 0) {
        widthRaiting = 0
      }

      $element.find('.fill-rating').css('width', widthRaiting);
  }

  /**
   * Изменение рейтинга
   */
  function changeRating(e) {
    var $this = $(this),
        newRating = Number($this.html()),
        $element = $this
                    .closest('.tovar-descr__rating')
                    .find('.tovar-descr__rating-item');

      if(typeof newRating === 'number') {
        $element.attr('data-rating', newRating);
        setRating($element, newRating);
      }

  }

  /**
   * Разбиение текста на две колонки
   */
   function setColumnize (){
      var blockcolumnize = $('.content_bottom_text');

        blockcolumnize.children('.par').addClass('dontsplit');
        blockcolumnize.columnize({columns:2});
   }
  /**
   * Фильтрация товара - Аккордеон
   */
  function getFiltersAccord (event){
    event.preventDefault();
    var $this = $(this),
        item = $this.closest('.filters__item'),
        list = $this.closest('.filters__list'),
        items = list.find('.filters__link'),
        content= item.find('.filter__inner'),
        otherContent = list.find('.filter__inner'),
        duration = 800;

    if (!$this.hasClass('activ')) {
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
  };

  /**
   * Сброс чекбоксов
   */
  function clearCheckbox (event) {
    event.preventDefault();

    $(this)
      .closest('.filters__item')
      .find('.checkbox')
      .prop('checked', false);
  }

  /**
   * Выставление диапазона цен
   */
  function sliderMoney() {
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
  }

  /**
   * Выбор цвета
   */
  function getColor (event){
    $(this)
      .addClass('activ')
      .siblings()
      .removeClass('activ');
  }

  /**
   * Изменение вида каталога
   */
  function updateViewCatalog (event) {
    event.preventDefault();
    var $this = $(this),
        view = 'products ' +
          $this
          .find('.viewcatalog__link')
          .attr('id');

      $this
        .addClass('activ')
        .siblings()
        .removeClass('activ');

      $('.products')
        .removeClass()
        .addClass(view);
  };

  /**
   * Переключатель миниатюр
   */
  function getNewFotoTovar (event) {
    event.preventDefault();
    var $this = $(this),
        activimg = $this.find('.tovar-foto-small__item-img').attr('src'),
        $setimg = $this.closest('.tovar-foto').find('.tovar-foto__large-img');

      $setimg.attr('src', activimg);

      $this
        .addClass('activ')
        .siblings()
        .removeClass('activ');
  };
})();
