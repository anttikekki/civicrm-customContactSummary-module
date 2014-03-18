cj(function ($) {
  'use strict';
  
  function getAccordionHtml(id, headerId, contentId) {
    var html = '<div id="' + id + '" class="crm-accordion-wrapper crm-accordion_title-accordion collapsed">';
    html += '<div id="' + headerId + '" class="crm-accordion-header">';
    html += '<div class="icon crm-accordion-pointer"></div>';
    html += '</div><!-- /.crm-accordion-header -->';
    html += '<div id="' + contentId + '" class="crm-accordion-body"></div><!-- /.crm-accordion-body -->';
    html += '</div><!-- /.crm-accordion-wrapper -->';
    
    return html;
  }
  
  /**
  * Wrap Communication preference from to closed accordion.
  * Accordion documentation: http://wiki.civicrm.org/confluence/display/CRMDOC/Accordions
  */
  function communicationPreferenceToAccordion() {
    //Reference to Communication preference form content
    var commPrefContainer = $('.crm-summary-comm-pref-block');
    
    //Create accordion wrapper html and add it to DOM before Communication preference form
    var html = getAccordionHtml('comm-pref-accordion', 'comm-pref-accordion-header', 'comm-pref-accordion-body');
    commPrefContainer.before(html);
    
    //Set accordion title from edit link
    var editLinkTitle = commPrefContainer.find('.crm-edit-help').text().trim();
    $('#comm-pref-accordion-header').text(editLinkTitle);
    
    //Move Communication preference form inside accordion
    $('#comm-pref-accordion-body').append(commPrefContainer);
  }
  
  function moveEmplyerAndJobTitle() {
    //Create accordion wrapper html and add it to DOM after Communication preference accordion
    var html = getAccordionHtml('emplyerAndJobTitle-accordion', 'emplyerAndJobTitle-accordion-header', 'emplyerAndJobTitle-accordion-body');
    $('#comm-pref-accordion').after(html);
    
    //Move Employer and Job title rows to accordion
    var employerRow = $('.crm-contact-current_employer').parent();
    var jobTitleRow = $('.crm-contact-job_title').parent();
    $('#emplyerAndJobTitle-accordion-body').append(employerRow).append(jobTitleRow);
    
    //Update accordion title
    var title = employerRow.find('.crm-label').text() + ', ' + jobTitleRow.find('.crm-label').text();
    $('#emplyerAndJobTitle-accordion-header').text(title);
  }
  
  communicationPreferenceToAccordion();
  moveEmplyerAndJobTitle();

});