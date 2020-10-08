import jQuery from 'jquery';
import 'metismenu';

// Left Sidebar
class LeftSideBar {
  constructor() {
    this.body = jQuery('body');
    this.window = jQuery(window);
    this.menuContainer = jQuery('.slimscroll-menu');
  }

  /**
   * Resets the sidebar scroll
   */
  _resetSidebarScroll() {
    // sidebar - scroll container
    /*jQuery('.slimscroll-menu').slimscroll({
      height: 'auto',
      position: 'right',
      size: '5px',
      color: '#9ea5ab',
      wheelStep: 5,
      touchScrollStep: 20,
    });*/
  }

  /**
   * Reset the theme
   */
  _reset() {
    this.body.removeAttr('data-leftbar-theme');
    // this.body.removeAttr('data-leftbar-compact-mode');
    /*jQuery('#side-main-logo').attr('src', './public/images/logo.png');
    jQuery('#side-sm-main-logo').attr('src', './public/images/logo_sm.png');*/
  }

  /**
   * Activates the condensed side bar
   */
  activateCondensedSidebar() {
    this.body.attr('data-leftbar-compact-mode', 'condensed');
  }

  /**
   * Deactivates the condensed side bar
   */
  deactivateCondensedSidebar() {
    this.body.removeAttr('data-leftbar-compact-mode');
  }

  /**
   * Activates the scrollable sidenar
   */
  activateScrollableSidebar() {
    this.body.attr('data-leftbar-compact-mode', 'scrollable');
    var leftMenuContainer = jQuery('#left-side-menu-container');
    leftMenuContainer.slimScroll({ destroy: true });
    leftMenuContainer.removeClass('slimscroll-menu');
    leftMenuContainer.removeAttr('style');
    this._resetSidebarScroll();
  }

  /**
   * Deactivate the scrollable sidebar
   */
  deactivateScrollableSidebar() {
    this.body.removeAttr('data-leftbar-compact-mode');
    jQuery('#left-side-menu-container').addClass('slimscroll-menu');
    jQuery('#side-sm-main-logo').attr('src', './public/images/logo_sm_dark.png');
    this._resetSidebarScroll();
  }

  /**
   * Activates the default theme
   */
  activateDefaultTheme() {
    this._reset();
  }

  /**
   * Activates the light theme
   */
  activateLightTheme() {
    this._reset();
    jQuery('#side-main-logo').attr('src', './public/images/logo-dark.png');
    this.body.attr('data-leftbar-theme', 'light');
  }

  /**
   * Activates the dark theme
   */
  activateDarkTheme() {
    this._reset();
    this.body.attr('data-leftbar-theme', 'dark');
  }

  /**
   * Initilizes the menu
   */
  initMenu() {
    var self = this;

    // resets everything
    this._reset();

    // sidebar - main menu
    jQuery('.side-nav').metisMenu();

    // remove slim scroll if scrollable sidebar
    if (this.body.hasClass('scrollable-layout'))
      jQuery('#left-side-menu-container').removeClass('slimscroll-menu');

    // sidebar - scroll container
    this._resetSidebarScroll();

    // click events
    // Left menu collapse
    jQuery(document).on('click', '.button-menu-mobile', function(e) {
      e.preventDefault();
      self.body.toggleClass('sidebar-enable');

      // if (self.window.width() >= 768) {
      //   self.body.toggleClass('enlarged');
      // } else {
      //   self.body.removeClass('enlarged');
      // }
      // sidebar - scroll container
      self._resetSidebarScroll();
    });

    // activate the menu in left side bar based on url
    jQuery('.side-nav a').each(function() {
      var pageUrl = window.location.href.split(/[?#]/)[0];
      if (this.href === pageUrl) {
        jQuery(this).addClass('active');
        jQuery(this)
          .parent()
          .addClass('mm-active'); // add active to li of the current link
        jQuery(this)
          .parent()
          .parent()
          .addClass('mm-show');
        jQuery(this)
          .parent()
          .parent()
          .prev()
          .addClass('active'); // add active class to an anchor
        jQuery(this)
          .parent()
          .parent()
          .parent()
          .addClass('mm-active');
        jQuery(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('mm-show'); // add active to li of the current link
        jQuery(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('mm-active');
        jQuery(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('mm-show');
        jQuery(this)
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .parent()
          .addClass('mm-active'); // add active to li of the current link
      }
    });

    //initializing Slimscroll
    jQuery.fn.slimScroll &&
    jQuery('.slimscroll').slimScroll({
      height: 'auto',
      position: 'right',
      size: '5px',
      touchScrollStep: 20,
      color: '#9ea5ab',
    });
  }

  /**
   * Initilizes the menu
   */
  init() {
    this.initMenu();
  }
}

export default LeftSideBar;