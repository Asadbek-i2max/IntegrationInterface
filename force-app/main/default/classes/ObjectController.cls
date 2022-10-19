/**
 * @description       : 
 * @author            : Asadbek@i2max
 * @group             : 
 * @last modified on  : 10-07-2022
 * @last modified by  : Asadbek@i2max
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   10-03-2022   Asadbek@i2max   Initial Version
**/
public class ObjectController {
    @AuraEnabled(cacheable=true)
    public static map<string, string> getAllObjects(){
        map<string, string> objectList = new map<string, string>();
        for ( Schema.SObjectType o : Schema.getGlobalDescribe().values() )
        {
            Schema.DescribeSObjectResult objResult = o.getDescribe();
            objectList.put(objResult.getName(), objResult.getLabel());
        }
        return objectList;
    } 
    // @AuraEnabled(cacheable=true)
    // public static List<string> getFieldName(String ObjName){
    //     List<String> fieldNameList;
    //     Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
    //     Map<String, Schema.SObjectField> fieldMap = schemaMap.get(ObjName).getDescribe().fields.getMap();
    //     for(String fieldName : fieldMap.keyset() )
    //         {
    //             fieldNameList.add(fieldName);
    //         }
    //     return fieldNameList;
    //     }
        @AuraEnabled
        public static List<string> getFields(String selectedObject){
            List<String> reqFields = new List<String>();
            Map <String,Schema.SObjectType> gd = Schema.getGlobalDescribe();
            Schema.SObjectType sobjType = gd.get(selectedObject);
            Schema.DescribeSObjectResult r = sobjType.getDescribe();
            Map<String, Schema.SObjectField> MapofField = r.fields.getMap();
            
            for(String fieldName : MapofField.keySet()) {
                Schema.SObjectField field = MapofField.get(fieldName);
                Schema.DescribeFieldResult F = field.getDescribe();
                // System.debug('field-->'+field);
                // System.debug('F-->'+F.getType()); //type of field
                reqFields.add(fieldName);
            }
            System.debug(reqFields);
            return reqFields;
        }
}