/**
 * @description       : 
 * @author            : Asadbek@i2max
 * @group             : 
 * @last modified on  : 10-18-2022
 * @last modified by  : Asadbek@i2max
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   09-23-2022   Asadbek@i2max   Initial Version
**/
import { LightningElement, wire, track} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRecord from '@salesforce/apex/ApiEndpointParams.getRecord';
import getEndpointUrl from '@salesforce/apex/ApiEndpointParams.getEndpointUrl';
import getRequestMethod from '@salesforce/apex/ApiEndpointParams.getRequestMethod';
import getUrlParams from '@salesforce/apex/ApiEndpointParams.getUrlParams';
import getFields from '@salesforce/apex/ObjectController.getFields';
// import getFieldName from '@salesforce/apex/ObjectController.getFieldName';
// import getAllObjects from '@salesforce/apex/ObjectController.getAllObjects';

import { publish, MessageContext } from 'lightning/messageService';
import JSON_RESPONSE_CHANNEL from '@salesforce/messageChannel/JsonResponse__c';
import FirstName from '@salesforce/schema/Contact.FirstName';
export default class HttpCalloutComponent extends LightningElement {
    @track value = '';
    @track items = [];
    @track returnedFields = [];
    objectValue = '';
    infoUrl = '';
    infoMethod= '';
    infoParams= '';
    @track keyValue = '';
    jsonKeys = [];
    @track returnedJsonKeys = [];
    returnJSONValues = [];
    // @track objectValue = '';
    // @track objectList = [];
    isObjectSelected = false;
    jsonToSelect = false;
    isMapped=false;
    @track error;
    data = [
        {
             JsonKey: 'Key1',
             ObjectField: 'Field1',
             Mapping: 'Map'
        },
        {
            JsonKey: 'Key2',
            ObjectField: 'Field2',
            Mapping: 'Map'
       },
    ];
    @wire(getRecord)
    wiredAPI({data, error}) {
        if(data) {
            for(let i = 0; i < data.length; i++) {
                this.items = [...this.items, { value: data[i].Id, label: data[i].Name }];
            }
            this.error = undefined;
        }
        else if(error) {
            this.error = error;
        }
    }
    // connectedCallback() {
    //     getAllObjects()
    //     .then((result) => {
    //             for(let key in result) {
    //                    this.objectList.push({value:result[key], key: key});
    //                    console.log(this.objectList);
    //             }
    //     })
    //     .catch((error) => {
    //         this.error = error;
    //     });
    // }
    get options() {
        return this.items;
    }
    handleChange(event) {
        const selectedOption = event.detail.value;
        getEndpointUrl({ configId: selectedOption })
        .then((data) => {
            if(data) {
                for(let i = 0; i < data.length; i++) {
                    this.infoUrl = data[i].Endpoint_Url__c;
                }
            }
        })
        .catch((error) => {
            throw new Error('Error', {cause: error});
        })
        getRequestMethod({configId: selectedOption})
        .then((data) => {
            if(data) {
                for(let i = 0; i < data.length; i++) {
                    this.infoMethod = data[i].Request_Method__c;
                }
            }
        })
        .catch((error) => {
            throw new Error('Error', {cause: error});
        })
        getUrlParams({configId: selectedOption})
        .then((data) => {
            if(data) {
                for(let i = 0; i< data.length; i++) {
                    this.infoParams = data[i].Url_Parameters__c;
                }
            }
        })
        .catch((error) => {
            throw new Error('Error', {cause: error});
        })
    }
    handleToggleSection(event) {
        const openSections = event.detail.openSections;
    }
    handleObjectChange(event) {
        this.objectValue = event.target.value;
    }
    async handleObjectSearch() {
           await getFields({ selectedObject : this.objectValue })
           .then((data) => {
               this.returnedFields = [];
               for(let i = 0; i < data.length; i++) {
                    this.returnedFields = [...this.returnedFields, {value: data[i]}];
               }
               this.isObjectSelected = true;
           })
           .catch((error) => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: "Error",
                    message: "Error while retreiving record",
                    variant: "error"
                })
            );
            throw new Error('Error', {cause: error});
           })
           this.objectValue = '';
    }
    // handleObjectChange(event) {
    //     const searchString = event.target.value;
    //     window.clearTimeout(this.delayTimeout);
    //     this.delayTimeout = setTimeout(()=>{
    //         this.objectValue = searchString;
    //     }, delay);
    // }
    @wire(MessageContext)
    messageContext;
    async performCallout() {
        const response = await fetch(
            this.infoUrl+'?'+this.infoParams, {
                method: this.infoMethod,
                haders: {
                    'Accept': 'application/json'
                }
            }
        );
        if(response.ok) {
        try {
        const jsonObject = await response.json();
        console.log(jsonObject);
        const jsonObjectKeys = Object.values(jsonObject)[0];
        console.log(jsonObjectKeys);
        const jsonObjectKeys2 = Object.values(jsonObject);
        const jsonObjectKeys3 = Object.keys(jsonObject)[0];
        const jsonObjectKeys4 = Object.keys(jsonObject);
        if(Array.isArray(jsonObject)) {
            jsonObject.forEach(jsonObjectKey => {
                for(let key in jsonObjectKey) {
                    console.log(`${key}: ${jsonObjectKey[key]}`);
                }
                const keys = Object.keys(jsonObjectKey);
                this.jsonKeys = keys;
            })
            const jsonKeys = this.jsonKeys;
            for(let i = 0; i < jsonKeys.length; i++) {
                this.returnedJsonKeys = [...this.returnedJsonKeys, {value: jsonKeys[i], label: jsonKeys[i]}];
                console.log(this.returnedJsonKeys);
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Sucessfull request',
                    message: 'Data is received',
                    variant: 'success'
                })
            );
            this.infoUrl = '';
            this.infoMethod = '';
            this.infoParams = '';
        }
        else if(Array.isArray(jsonObjectKeys)) {
        jsonObjectKeys.forEach(jsonObjectKey => {
            for(let key in jsonObjectKey) {
                console.log(`${key}: ${jsonObjectKey[key]}`);
            }
               const keys = Object.keys(jsonObjectKey);
               this.jsonKeys = keys;
        })
        const jsonKeys = this.jsonKeys;
        for(let i = 0; i < jsonKeys.length; i++) {
            this.returnedJsonKeys = [...this.returnedJsonKeys, {value: jsonKeys[i], label: jsonKeys[i]}];
        }
        this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Sucessfull request',
                        message: 'Data is received',
                        variant: 'success'
                    })
                );
                this.infoUrl = '';
                this.infoMethod = '';
                this.infoParams = '';
        }
        else if(Array.isArray(jsonObjectKeys2)) {
            jsonObjectKeys2.forEach(jsonObjectKey => {
                const keys2 = Object.keys(jsonObjectKey);
                this.jsonKeys = keys2;
            })
            const jsonKeys = this.jsonKeys;
            for(let i = 0; i < jsonKeys.length; i++) {
                this.returnedJsonKeys = [...this.returnedJsonKeys, {value: jsonKeys[i], label: jsonKeys[i]}];
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Sucessfull request',
                    message: 'Data is received',
                    variant: 'success'
                })
            );
            this.infoUrl = '';
            this.infoMethod = '';
            this.infoParams = '';
        }
        else if(Array.isArray(jsonObjectKeys3)) {
            jsonObjectKeys3.forEach(jsonObjectKey => {
                const keys3 = Object.keys(jsonObjectKey);
                this.jsonKeys = keys3;
            })
            const jsonKeys = this.jsonKeys;
            for(let i = 0; i < jsonKeys.length; i++) {
                this.returnedJsonKeys = [...this.returnedJsonKeys, {value: jsonKeys[i], label: jsonKeys[i]}];
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Sucessfull request',
                    message: 'Data is received',
                    variant: 'success'
                })
            );
            this.infoUrl = '';
            this.infoMethod = '';
            this.infoParams = '';
        }
        else if(Array.isArray(jsonObjectKeys4)) {
            jsonObjectKeys4.forEach(jsonObjectKey => {
                const keys4 = Object.keys(jsonObjectKey);
                this.jsonKeys = keys4;
            })
            const jsonKeys = this.jsonKeys;
            for(let i = 0; i < jsonKeys.length; i++) {
                this.returnedJsonKeys = [...this.returnedJsonKeys, {value: jsonKeys[i], label: jsonKeys[i]}];
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Sucessfull request',
                    message: 'Data is received',
                    variant: 'success'
                })
            );
            this.infoUrl = '';
            this.infoMethod = '';
            this.infoParams = '';
        }
        }
        catch(err) {
        console.log(err);
        this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Error while sending request",
                        message: this.error,
                        variant: "error"
                    })
                );
            this.infoUrl = '';
            this.infoMethod = '';
            this.infoParams = '';
        throw new Error('Error',  {cause: err});
        }
        }
        // .then((response) => {
        //     return response.json();
        // })
        // .then((data) => {
        //     console.log(data);
        //     // returnedArray1.forEach(array => {
        //     //     for(let key in array) {
        //     //         console.log(`${key}: ${array[key]}`);
        //     //     }
        //     // })
        //     this.dispatchEvent(
        //                 new ShowToastEvent({
        //                     title: 'Sucessfull request',
        //                     message: 'Data is received',
        //                     variant: 'success'
        //                 })
        //             );
        // })
            // for(const returnedJSONData of plainObject.recipes) {
            //     this.jsonKeys = Object.keys(returnedJSONData);
            //     publish(this.messageContext, JSON_RESPONSE_CHANNEL, returnedJSONData);
            //     this.returnJSONValues = Object.keys(returnedJSONData);
            //     this.dispatchEvent(
            //         new ShowToastEvent({
            //             title: 'Sucessfull request',
            //             message: 'Data is received',
            //             variant: 'success'
            //         })
            //     );
            //     this.infoUrl = '';
            //     this.infoMethod = '';
            //     this.infoParams = '';
            // }
            // const jsonKeys = this.jsonKeys;
            // for(let i = 0; i < jsonKeys.length; i++) {
            //     this.returnedJsonKeys = [...this.returnedJsonKeys, {value: jsonKeys[i], label: jsonKeys[i]}];
            // }
        // .catch((error) => {
        //     console.log(error);
        //     this.dispatchEvent(
        //         new ShowToastEvent({
        //             title: "Error while sending request",
        //             message: this.error,
        //             variant: "error"
        //         })
        //     );
        // })
        }
        get keyOptions() {
           return this.returnedJsonKeys;
        }
        handleKeyChange(event) {
            const idx = this.returnedJsonKeys.findIndex((element) => element.value === event.detail.value);
            this.returnedJsonKeys[idx] = event.detail.value;
            console.log(this.returnedJsonKeys[idx]);
        }
        handleMapping() {
           this.isMapped = true;
        }
        get isButtonDisabled() {
            const isEmpty = !(this.infoUrl);
            return isEmpty;
        } 
        get isObjectButtonDisabled() {
            const isObjectEmpty = !(this.objectValue);
            return isObjectEmpty;
        }
    }