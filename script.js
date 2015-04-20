jQuery(document).ready(function() {

  //'use strict';

  var $dw_aside    = jQuery('.dw__sidebar'),            // Sidebar
      $dw_content  = jQuery('#dokuwiki__content'),      // Page Content
      $dw_toc      = jQuery('#dw__toc'),                // Table of Content
      $dw_search   = jQuery('#dw__search'),             // Search form
      $screen_mode = jQuery('#screen__mode'),           // Responsive Check
      $tags        = jQuery('.mode_show .tags'),        // Tags Plugin
      $translation = jQuery('div.plugin_translation');  // Translation Plugin
      $discussion  = jQuery('.comment_wrapper');        // Discussion Plugin


  // Replace ALL input[type=submit|reset|button] (with no events) to button[type=submit|reset|button] for CSS styling
  jQuery('input[type=submit], input[type=button], input[type=reset]').each(function () {

    var attrs = {},
        label = '';

    jQuery(this.attributes).each(function(index, attribute) {
      if (attribute.name == 'value') {
        label = attribute.value;
      } else {
        attrs[attribute.name] = attribute.value;
      }
    });

    // FIXME
    if (typeof jQuery(this).data('events') === 'undefined') {
      jQuery(this).replaceWith(function(){
        return jQuery('<button/>', attrs).html(label);
      });
    }

  });


  // Common styles
  $dw_content.find('.page h1').addClass('page-header');
  //$dw_content.find('input[type=submit], button[type=submit]').not('.btn_secedit [type=submit], .editButtons [type=submit]').addClass('btn-primary');
  jQuery('table').parent().addClass('table-responsive');
  jQuery('input[type=submit], input[type=reset], input[type=button], button').addClass('btn btn-default');
  jQuery('input, select').not('[type=hidden], [type=image]').addClass('form-control');
  jQuery('label').addClass('control-label');
  jQuery('form').addClass('form-inline');
  jQuery('img.media, img.mediacenter, img.medialeft, img.mediaright').addClass('img-responsive');
  jQuery('#tool__bar').addClass('btn-group');
  jQuery('#dw__search').addClass('nav navbar-nav navbar-form');
  jQuery('.page table').addClass('table table-striped table-condensed');
  jQuery('.tabs').addClass('nav nav-tabs');
  jQuery('.toolbutton').addClass('btn-xs');
  jQuery('.search_hit').addClass('mark');
  jQuery('.no').addClass('hidden-print');
  jQuery('.button').removeClass('button');

  jQuery('bdi').replaceWith(function() {
    return jQuery(this).contents();
  });


  // Icons for DokuWiki Actions
  var icons = [
    ['.mode_denied',        'h1', 'glyphicon-ban-circle text-danger'],
    ['.mode_show.notFound', 'h1', 'glyphicon-alert text-warning'],
    ['.mode_login',         'h1', 'glyphicon-log-in text-muted'],
    ['.mode_register',      'h1', 'glyphicon-edit text-muted'],
    ['.mode_search',        'h1', 'glyphicon-search text-muted'],
    ['.mode_index',         'h1', 'glyphicon-list text-muted'],
    ['.mode_recent',        'h1', 'glyphicon-list-alt text-muted'],
    ['.mode_media',         'h1', 'glyphicon-download-alt text-muted'],
    ['.mode_admin',         'h1', 'glyphicon-cog text-muted'],
    ['.mode_admin',         'h2', 'glyphicon-plus text-success'],
    ['.mode_profile',       'h1', 'glyphicon-user text-muted'],
    ['.mode_revisions',     'h1', 'glyphicon-time text-muted'],
    ['.mode_backlink',      'h1', 'glyphicon-link text-muted'],
    ['.mode_diff',          'h1', 'glyphicon-list-alt text-muted'],
    ['.mode_preview',       'h1', 'glyphicon-eye-open text-muted'],
    ['.mode_conflict',      'h1', 'glyphicon-alert text-warning'],
    ['.mode_subscribe',     'h1', 'glyphicon-bookmark text-muted'],
    ['.mode_unsubscribe',   'h1', 'glyphicon-bookmark text-muted'],
    ['.mode_draft',         'h1', 'glyphicon-edit text-muted'],
    ['.mode_showtag',       'h1', 'glyphicon-tags text-muted'],
  ];


  function checkSize() {

    if ($screen_mode.find('.visible-xs').is(':visible')) {

      $dw_aside.find('.content').addClass('panel panel-default');
      $dw_aside.find('.toogle').addClass('panel-heading');
      $dw_aside.find('.collapse').addClass('panel-body').removeClass('in');

    } else {

      $dw_aside.find('.content').removeClass('panel panel-default');
      $dw_aside.find('.collapse').removeClass('panel-body').addClass('in');

    }

  }

  checkSize();
  jQuery(window).resize(checkSize);


  // Section Button edit
  jQuery('.btn_secedit .btn')
    .addClass('btn-xs')
    .prepend('<i class="glyphicon glyphicon-pencil"/> ');


  // Back To Top
  jQuery('.back-to-top').click(function() {
    jQuery('html, body').animate({ scrollTop: 0 }, 600);
  });


  // Icons for DokuWiki Actions
  jQuery.each(icons, function(i) {
    var selector = [icons[i][0], '#dokuwiki__content', icons[i][1]].join(' '),
        icon     = ['<i class="glyphicon ', icons[i][2], '"/> '].join('');
    jQuery(jQuery(selector)[0]).prepend(icon);
  });


  // Translation Plugin
  $translation.find('select').addClass('input-sm');
  $translation.find('ul li div').addClass('label label-default');


  // Tags plugin
  if ($tags.length) {

    $tags.each(function() {

      var $tag = jQuery(this);
      $tag.html($tag.html().replace(/,/g, ''));

      var $tagLabel = $tag.find('a').addClass('label label-default')
                                    .prepend('<i class="glyphicon glyphicon-tag"/> ');

      if ($tag.prop('tagName').toLowerCase() == 'div') {
        $tag.hide();
        $tagLabel.prependTo('.pageId').css('marginLeft', '3px');
      }

    });

  }


  // Discussion plugin
  if ($discussion.length) {

    $discussion.find('h2').addClass('page-header');
    $discussion.find('.comment_buttons').addClass('text-right');
    $discussion.find('#discussion__section').prepend('<i class="glyphicon glyphicon-comment"/> ');

    $discussion.find('.hentry').addClass('panel panel-default');
    $discussion.find('.hentry .comment_head').addClass('panel-heading');
    $discussion.find('.hentry .comment_body').addClass('panel-body');
    $discussion.find('.toolbar').addClass('btn-group');

    $discussion.find('.comment_buttons .discussion__edit button')
      .html('').addClass('btn-xs')
      .prepend('<i class="glyphicon glyphicon-pencil"/>');

    $discussion.find('.comment_buttons .discussion__toogle button')
      .html('').addClass('btn-xs')
      .prepend('<i class="glyphicon glyphicon-eye-close"/>');

    $discussion.find('.discussion__reply button')
      .html('').addClass('btn-xs')
      .prepend('<i class="glyphicon glyphicon-share-alt"/>');

    $discussion.find('.comment_buttons .discussion__delete button')
      .html('').addClass('btn-xs')
      .prepend('<i class="glyphicon glyphicon-trash"/>').addClass('btn-danger');

  }


  // Footnote
  jQuery(document).bind('DOMNodeInserted', function(){
    jQuery('#insitu__fn').addClass('panel panel-body panel-default');
  });


  // Table of Contents
  $dw_toc.find('.open strong').addClass('glyphicon glyphicon-chevron-up');
  $dw_toc.css('backgroundColor', jQuery('#dokuwiki__content .panel').css('backgroundColor'));
  $dw_toc.addClass('panel panel-default');
  $dw_toc.find('h3').addClass('panel-heading')
                    .prepend('<i class="glyphicon glyphicon-list" style="padding-right: 5px"/> ');
  $dw_toc.find('h3 + div').addClass('panel-body');

  $dw_toc.find('h3').click(function() {

    if ($dw_toc.find('.closed').length) {
      $dw_toc.find('h3 strong').removeClass('glyphicon-chevron-up')
                               .addClass('glyphicon-chevron-down');
      jQuery($dw_toc.find('h3 strong')[0].nextSibling).wrap('<span class="label hide"/>');
    }

    if ($dw_toc.find('.open').length) {
      $dw_toc.find('h3 strong').addClass('glyphicon-chevron-up')
                               .removeClass('glyphicon-chevron-down');
      $dw_toc.find('h3 .label').replaceWith(function() {
        return jQuery(this).contents();
      });
    }

  });

  $dw_toc.parent().on('affixed.bs.affix', function() {
    if ($dw_toc.find('.open').length) {
      $dw_toc.find('h3').trigger('click');
    }
  });


  // Alerts
  jQuery('div.info')
    .removeClass('info')
    .addClass('alert alert-info')
    .prepend('<i class="glyphicon glyphicon-info-sign"/> ');

  jQuery('div.error')
    .removeClass('error')
    .addClass('alert alert-danger')
    .prepend('<i class="glyphicon glyphicon-remove"/> ');

  jQuery('div.success')
    .removeClass('success')
    .addClass('alert alert-success')
    .prepend('<i class="glyphicon glyphicon-ok"/> ');

  jQuery('div.notify')
    .removeClass('notify')
    .addClass('alert alert-warning')
    .prepend('<i class="glyphicon glyphicon-bell"/> ');


  // Sidebar
  $dw_aside.find('ul').addClass('nav nav-pills nav-stacked');
  $dw_aside.find('.curid').parent().parent().addClass('active');
  $dw_aside.find('ul div, ul span').replaceWith(function() {
    return jQuery(this).contents();
  });


  // Non-existent DokwWiki Page   
  $dw_content.find('.wikilink2').addClass('text-danger');


  // Quick Search
  $dw_search.find('#qsearch__out').addClass('panel panel-default');


  // Search Form
  $dw_search.find('button[type=submit]').html('').append('<i class="glyphicon glyphicon-search"/>');
  $dw_search.find('input[type=text]').attr('placeholder', jQuery('#dw__search button[type=submit]').attr('title'));


  // Home icon in breadcrumbs
  jQuery('.breadcrumb .home a').text('').prepend('<i class="glyphicon glyphicon-home"/>');


  // Interwiki User page icon
  jQuery('.iw_user').prepend('<i class="glyphicon glyphicon-user"/> ');


  // Personal Home-Page icon
  if (NS == 'user' && jQuery('.mode_show').length) {
    jQuery('.mode_show #dokuwiki__content h1').prepend('<i class="glyphicon glyphicon-user"/> ');
  }


});
