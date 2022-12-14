/**
 * @description       : 
 * @author            : Asadbek@i2max
 * @group             : 
 * @last modified on  : 10-19-2022
 * @last modified by  : Asadbek@i2max
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   10-18-2022   Asadbek@i2max   Initial Version
**/
public class InsertController {
    @AuraEnabled 
    public static void insertHttpConfig(String connectionName, String endpoint, String httpMethod, String urlParameters) {
        List<Http_Callout_Configuration__c> APIConfigurationList = [SELECT Name, Endpoint_Url__c, Request_Method__c, Url_Parameters__c FROM Http_Callout_Configuration__c]; 
        Http_Callout_Configuration__c newApi = new Http_Callout_Configuration__c();
        newApi.name = connectionName;
        newApi.EndPoint_Url__c = endpoint;
        newApi.Request_Method__c = httpMethod;
        newApi.Url_Parameters__c = urlParameters;
        insert newApi;
    }
}