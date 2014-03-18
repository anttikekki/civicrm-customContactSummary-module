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
    CRM_Core_Resources::singleton()->addScriptFile('com.github.anttikekki.customContactSummary', 'individualContactSummary.js');
  }
}