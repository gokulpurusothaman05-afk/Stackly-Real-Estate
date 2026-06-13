(function(){
  function safe(fn){try{fn();}catch(e){console.warn('vendor-init error',e);} }

  document.addEventListener('DOMContentLoaded', function(){
    // AOS
    safe(function(){ if(window.AOS) AOS.init({once:true, duration:800, easing:'ease-in-out'}); });

    // GSAP: gentle reveal for elements with .reveal (non-destructive)
    safe(function(){ if(window.gsap && window.jQuery){
      var $ = window.jQuery;
      $('.reveal').each(function(i,el){ gsap.fromTo(el,{opacity:0,y:18},{opacity:1,y:0,duration:0.7,delay:0.08*i,overwrite:true}); });
    }});

    // imagesLoaded + Isotope for masonry grids
    safe(function(){
      if(window.imagesLoaded && window.Isotope){
        var grid = document.querySelector('.properties-grid');
        if(grid){
          imagesLoaded(grid, function(){
            new Isotope(grid, { itemSelector: '.property-card', percentPosition: true, masonry: { columnWidth: '.property-card' } });
          });
        }
      }
    });

    // Jarallax (parallax backgrounds)
    safe(function(){ if(window.jarallax){ jarallax(document.querySelectorAll('.jarallax'), { speed: 0.5 }); } });

    // Init circletype for any .circle-text
    safe(function(){ if(window.CircleType && window.jQuery){ $('.circle-text').each(function(){ new CircleType(this); }); } });

    // Lettering (heading effects)
    safe(function(){ if(window.jQuery && $.fn.lettering){ $('.section-title').lettering(); } });

    // Magnific Popup: images and galleries
    safe(function(){ if(window.jQuery && $.fn.magnificPopup){
      $('.img-wrap a, .gallery').each(function(){ /* keep light init minimal */ });
    }});

    // flatpickr for date/time inputs
    safe(function(){ if(window.flatpickr){ document.querySelectorAll('.datepicker').forEach(function(el){ flatpickr(el, {enableTime: false, dateFormat: 'Y-m-d'}); }); } });

    // countdown for elements with data-countdown
    safe(function(){ if(window.jQuery && $.fn.countdown){ $('[data-countdown]').each(function(){ var $el=$(this); var until = $el.data('countdown'); $el.countdown(until); }); } });

    // noUiSlider init for .range-slider
    safe(function(){ if(window.noUiSlider){ document.querySelectorAll('.range-slider').forEach(function(el){ if(!el.noUiInit){ noUiSlider.create(el, { start:[20,80], connect:true, range:{ min:0, max:100 }, format: window.wNumb? wNumb({decimals:0}):undefined }); el.noUiInit = true;} }); } });

    // Owl / Slick / tiny-slider minimal safe inits
    safe(function(){ if(window.jQuery && $.fn.owlCarousel){ $('.owl-carousel').owlCarousel({items:1,loop:true,autoplay:true,autoplayTimeout:5000}); }});
    safe(function(){ if(window.jQuery && $.fn.slick){ $('.slick-slider').slick({dots:true,arrows:false}); }});
    safe(function(){ if(window.tns){ var t = document.querySelector('.tiny-slider'); if(t) tns({container: t, items:1, autoplay:true, controls:false}); }});

    // Refresh AOS after images load
    safe(function(){ if(window.AOS && window.imagesLoaded){ imagesLoaded(document.body, function(){ AOS.refresh(); }); } });

  });
})();
