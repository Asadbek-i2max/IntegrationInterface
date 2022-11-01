/**
 * @description       : 
 * @author            : Asadbek@i2max
 * @group             : 
 * @last modified on  : 10-19-2022
 * @last modified by  : Asadbek@i2max
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   09-23-2022   Asadbek@i2max   Initial Version
**/
public class ApiEndpointParams { 
    @AuraEnabled(cacheable=true)
    public static List<Http_Callout_Configuration__c> getRecord() {
        return [
            SELECT Id, Name, Endpoint_Url__c, Request_Method__c, Url_Parameters__c
            FROM Http_Callout_Configuration__c
            WITH SECURITY_ENFORCED
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Http_Callout_Configuration__c> getEndpointUrl(String configId) {
        return [
            SELECT ID, Endpoint_Url__c FROM Http_Callout_Configuration__c
            WHERE ID =:configId
            WITH SECURITY_ENFORCED
            ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Http_Callout_Configuration__c> getRequestMethod(String configId) {
        return [
            SELECT ID, Request_Method__c FROM Http_Callout_Configuration__c
            WHERE ID =:configId
            WITH SECURITY_ENFORCED
            ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Http_Callout_Configuration__c> getUrlParams(String configId) {
        return [
            SELECT ID, Url_Parameters__c FROM Http_Callout_Configuration__c
            WHERE ID =: configId
            WITH SECURITY_ENFORCED
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Http_Callout_Configuration__c> getExtraParams(String configId) {
        return [
            SELECT ID, 	Additional_Url_Parameters__c FROM Http_Callout_Configuration__c
            WHERE ID =: configId
            WITH SECURITY_ENFORCED
        ];
    }
}