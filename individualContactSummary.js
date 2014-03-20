/**
* Modify Individual Contact Summary by relocating fields.
*/
cj(function ($) {
  'use strict';
  
  /**
  * Create accordion HTML.
  * Accordion documentation: http://wiki.civicrm.org/confluence/display/CRMDOC/Accordions
  *
  * @param {string} id Element id for the whole accordion wrapper
  * @param {string} headerId Element id for the accordion header
  * @param {string} contentId Element id for the accordion content
  * @return {string} Html of accordion
  */
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
  * Is this summary page for Individual Contact?
  *
  * @return {boolean} True if is Individual summary
  */
  function isIndividualContactSummary() {
    return $('.crm-contact_type_label').text().trim() == 'Individual';
  }
  
  /**
  * Wrap Communication preference form to closed accordion.
  */
  function moveCommunicationPreferenceToAccordion() {
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
  
  /**
  * Move Employer and Job title to accordion below Communication preference
  */
  function moveEmplyerAndJobTitleToAccordion() {
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
  
  /**
  * Move Source field below of CiviCRM ID / User ID field
  */
  function moveSourceFieldBelowContactId() {
    var contactIdRow = $('.crm-contact-contact_id').parent().parent();
    var sourceRow = $('.crm-contact_source').parent();
    
    contactIdRow.after(sourceRow);
  }
  
  /**
  * Move Demographics from bottom right to top right
  */
  function moveDemographicsToTop() {
    var demographicsContainer = $('.crm-summary-demographic-block');
    var phoneContainer = $('#phone-block').parent();
    
    phoneContainer.after(demographicsContainer);
  }
  
  /**
  * Move Contact Id block from top right to bottom right
  */
  function moveContactIdBlockToBottom() {
    var leftBottomContainer = $('#comm-pref-accordion').parent().next();
    var contactIdContainer = $('.crm-contact-contact_id').parent().parent().parent().parent();
    
    leftBottomContainer.append(contactIdContainer);
  }
  
  /**
  * Add nickname to header name
  */
  function addNicknameToHeaderName() {
    var nameInfo = CRM.customContactSummary.contactNameInfo;
    
    if(nameInfo.nick_name == 'null' || nameInfo.nick_name.length === 0) {
      return;
    }
    
    var name = nameInfo.first_name + ' "' + nameInfo.nick_name + '" ' + nameInfo.last_name;
    $('.crm-summary-display_name').text(name);
  }
  
  /**
  * Remove nickname form field and it's edit area from form
  */
  function removeNicknameFormFieldBlock() {
    $('.crm-contact-nick_name').parent().parent().parent().parent().parent().remove();;
  }
  
  /**
  * Move Phone/IM block one row down
  */
  function movePhoneContainerOneDown() {
    var addressContainer = $('#address-block-2');
    var phoneContainer = $('#phone-block').parent();
    
    addressContainer.after(phoneContainer);
  }
  
  /**
  * Move address block one row down
  */
  function moveAddressContainerOneDown() {
    var addressContainer = $('#address-block-2');
    var contactIdContainer = $('.crm-contact-contact_id').parent().parent().parent().parent();
    
    contactIdContainer.before(addressContainer);
  }
  
  //Do modifications only id this Summary page is for Individual and not for Organisations or Household
  if(isIndividualContactSummary()) {
    moveCommunicationPreferenceToAccordion();
    moveEmplyerAndJobTitleToAccordion();
    moveSourceFieldBelowContactId();
    moveContactIdBlockToBottom();
    addNicknameToHeaderName();
    removeNicknameFormFieldBlock();
    moveDemographicsToTop();
    movePhoneContainerOneDown();
    moveAddressContainerOneDown();
  }
});