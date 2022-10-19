/**
 * @description       : 
 * @author            : Asadbek@i2max
 * @group             : 
 * @last modified on  : 10-18-2022
 * @last modified by  : Asadbek@i2max
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   10-18-2022   Asadbek@i2max   Initial Version
**/
public with sharing class connectorDTO {
   public String connectionName{get; set;}
   public String requestMethod{get; set;}
   public String EndpointUrl{get; set;}
   public List<Http_Callout_Configuration__c> UrlParams{get; set;}
}
