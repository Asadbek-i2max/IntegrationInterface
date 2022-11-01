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
    public static void insertHttpConfig(String connectionName, String endpoint, String httpMethod, String urlKey1, String urlValue1, String urlKey2, String urlValue2) {
        List<Http_Callout_Configuration__c> APIConfigurationList = [SELECT Name, Endpoint_Url__c, Request_Method__c, Url_Parameters__c, Additional_Url_Parameters__c FROM Http_Callout_Configuration__c]; 
        if(urlKey1 != '' && urlValue1 != '' && urlKey2 != '' && urlValue2 != '') {
        Http_Callout_Configuration__c newApi = new Http_Callout_Configuration__c();
        newApi.name = connectionName;
        newApi.EndPoint_Url__c = endpoint;
        newApi.Request_Method__c = httpMethod;
        newApi.Url_Parameters__c = urlKey1 + '=' + urlValue1;
        newApi.Additional_Url_Parameters__c = urlKey2 + '=' + urlValue2;
        insert newApi;
        }
        else if(urlKey1 == '' && urlValue1 == '') {
            Http_Callout_Configuration__c newApi = new Http_Callout_Configuration__c();
            newApi.name = connectionName;
            newApi.EndPoint_Url__c = endpoint;
            newApi.Request_Method__c = httpMethod;
            insert newApi;
        }
        else if(urlKey2 == '' && urlValue2 == '') {
            Http_Callout_Configuration__c newApi = new Http_Callout_Configuration__c();
            newApi.name = connectionName;
            newApi.EndPoint_Url__c = endpoint;
            newApi.Request_Method__c = httpMethod;
            newApi.Url_Parameters__c = urlKey1 + '=' + urlValue1;
            insert newApi;
        }
    }
}