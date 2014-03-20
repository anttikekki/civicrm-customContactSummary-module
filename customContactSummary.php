<?php

/**
* Custom Contact Summary hooks.
*/

/**
* Implemets CiviCRM 'alterTemplateFile' hook.
*
* @param String $formName Name of current form.
* @param CRM_Core_Form $form Current form.
* @param CRM_Core_Form $context Page or form.
* @param String $tplName The file name of the tpl - alter this to alter the file in use.
*/
function customContactSummary_civicrm_alterTemplateFile($formName, &$form, $context, &$tplName) {
  //echo $formName . " " . $tplName;
  //Contact summary
  if($form instanceof CRM_Contact_Page_View_Summary) {
    CRM_Core_Resources::singleton()->addScriptFile('com.github.anttikekki.customContactSummary', 'contactSummaryModification.js');
    
    //Add name info to JS so that nickname can be inserted to header
    $contactId = $form->getTemplate()->get_template_vars("contactId");
    $contactNameInfo = customContactSummary_getContactNameInfo($contactId);
    CRM_Core_Resources::singleton()->addSetting(array('customContactSummary' => array('contactNameInfo' => $contactNameInfo)));
  }
}

/**
* Queries contact firts name, last name, organization name and nickname.
*
* @param int|string $contactId Contact id that name info is returned
* @return array Name info array with "first_name", "last_name", "organization_name" and "nick_name" fields
*/
function customContactSummary_getContactNameInfo($contactId) {
  $contactId = (int) $contactId;

  $sql = "
    SELECT first_name, last_name, nick_name, organization_name 
    FROM civicrm_contact
    WHERE id = $contactId
  ";
  
  $dao = CRM_Core_DAO::executeQuery($sql);
  
  $result = array();
  if($dao->fetch()) {
    $result["first_name"] = $dao->first_name;
    $result["last_name"] = $dao->last_name;
    $result["nick_name"] = $dao->nick_name;
    $result["organization_name"] = $dao->organization_name;
  }
  
  return $result;
}