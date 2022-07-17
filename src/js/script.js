/**
 * @file
 * Custom javascript for use in your theme.
 */

(function ($) {
  $("a[href^=tel]").each(function () {
    const num = $(this).attr("href").match(/\d+/g);
    $(this).attr("href", `tel:${num.join("")}`);
  });
})(jQuery);
