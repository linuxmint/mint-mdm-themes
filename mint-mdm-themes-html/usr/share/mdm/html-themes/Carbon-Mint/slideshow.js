/**
 * Simple image slideshow
 * Based Mint-X MDM theme in slideshow api developing by Philipp Miller
 * 
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 * 
 * @edited Michell Stuttgart
 */
(function($) {
  
  "use strict";
  
  var slideshow = {};
  
  var defaultSettings = {
        fade_seconds:     2,
      },
      settings,
      elems      = [ $("#bg0"), $("#bg1") ],
      topElem    = 0,
      loader     = new Image(),
      sources,
      currentId,
      intervalId;
  
  // pass sources from config file to init
  $(loader).on("load", showCurrent);
  config.require("slideshow.conf", init);
  
  /// functions ///
  
  function init(cfg) {
    settings = $.extend(defaultSettings, cfg);
    sources  = settings.backgrounds;    
    
    // 1 image shortcut
    if (sources.length == 1) {
      setImage(0);
      return;
    }
  
    setImage(0);
  
  }
  
  /**
   * Start loading specified image
   * The image will be displayed by showCurrent()
   * once it has finished loading
   * 
   * @param {int} id
   */
  function setImage(id) {
    currentId  = id;
    loader.src = sources[currentId];
  }
  
  /**
   * Makes an image visible on screen.
   */
  function showCurrent() {
    topElem = +!topElem;
    
    elems[topElem]
      .hide()
      .css({"z-index": 1, "background-image": 'url("' + sources[currentId] + '")'});
    
    elems[+!topElem]
      .css({"z-index": 0});
    
    elems[topElem]
      .fadeIn(settings.fade_seconds * 1000);
    
    if (settings.show_filename)
      elems[topElem].filenameElem.text(sources[currentId]);
       
  }
  
})(jQuery);
