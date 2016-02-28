(function(){

  init();
  attachEvents();

  $('.filter__radio').on('click', function(e){
      var radio = $(this).prop("checked");
      console.log(radio);
  });

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
    $('.filters__clear').on('click', clearCheckbox);
    $('.view__item').on('click', updateViewCatalog);
    $('.product-foto-small__item').on('click', getNewFotoTovar);
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
        newRating = parseInt($this.text()),
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
      var blockcolumnize = $('.content-bottom__text');

        blockcolumnize.children('p').addClass('dontsplit');
        blockcolumnize.columnize({columns:2});
   }

  /**
   * Сброс чекбоксов
   */
  function clearCheckbox (event) {
    event.preventDefault();

    $(this)
      .closest('.filters__item')
      .find('input:checkbox')
      .prop('checked', false);
  }

  /**
   * Выставление диапазона цен
   */
  function sliderMoney() {
     var $slider = $('#price__slider'),
         $databegin = $('#money-begin'),
         $dataend = $('#money-end'),
         min = parseInt($databegin.attr('data-min')),
         max = parseInt($dataend.attr('data-max'));

    $slider.slider({
      range: true,
      min: min,
      max: max,
      values: [ min, max ],
      slide: function( event, ui ) {
        $databegin.val(ui.values[0]);
        $dataend.val(ui.values[1]);
      }
    });

    $databegin.val($slider.slider( 'values', 0 ));
    $dataend.val($slider.slider( 'values', 1 ));
  }

  /**
   * Изменение вида каталога
   */
  function updateViewCatalog (event) {
    event.preventDefault();
    var $this = $(this),
        view = $this
                .find('.view__link')
                .attr('id');

      $this
        .addClass('active')
        .siblings()
        .removeClass('active');

      $('.products')
        .removeClass()
        .addClass('products ' + view);
  };

  /**
   * Переключатель миниатюр
   */
  function getNewFotoTovar (event) {
    event.preventDefault();
    var $this = $(this),
        activimg = $this.find('.product-foto-small__item-img').attr('src'),
        $setimg = $this.closest('.product-foto').find('.product-foto__large-img');

      $setimg.attr('src', activimg);

      $this
        .addClass('active')
        .siblings()
        .removeClass('active');
  };
})();

/**
 * Фильтрация товара - Аккордеон
 */
(function($){
   $('.filters__link').on('click', function(event){
    event.preventDefault();
    var $this = $(this),
        item = $this.closest('.filters__item'),
        list = $this.closest('.filters__list'),
        items = list.find('.filters__link'),
        content= item.find('.filter'),
        otherContent = list.find('.filter'),
        duration = 300;

    if (!$this.hasClass('active')) {
      // Открытие контента
      content.stop(true, true).slideDown(duration);
      $this.toggleClass('active');

    }else {
      // Закрытие контента
      content.stop(true, true).slideUp(duration);
      $this.toggleClass('active');
    }
  });
})(jQuery);
