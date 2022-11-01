/**
 * @description       : 
 * @author            : Asadbek@i2max
 * @group             : 
 * @last modified on  : 10-19-2022
 * @last modified by  : Asadbek@i2max
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   09-15-2022   Asadbek@i2max   Initial Version
**/
import { LightningElement, track} from 'lwc';
import insertHttpConfig from '@salesforce/apex/InsertController.insertHttpConfig';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Connector extends LightningElement {
    name = '';
    APIEndpoint = '';
    checkboxValue = '';
    isMethodPost = false;
    key = '';
    value = '';
    key2 = '';
    value2 = '';
    isUrlParamClicked = false;
    handleNameChange(event) {
        this.name = event.target.value;
    }
    handleEndpointChange(event) {
        this.APIEndpoint = event.target.value;
    }
    get options() {
        return [
            { label: 'GET', value: 'GET' }, 
            { label: 'POST', value: 'POST' },
            { label: 'PUT', value: 'PUT' },
            { label: 'PATCH', value: 'PATCH' },
            { label: 'DELETE', value: 'DELETE'},
        ];
    }
    handleRequestMethod(event) {
        this.requestMethod = event.detail.value;

        if(this.requestMethod === 'POST') {
            this.isMethodPost = true;
        }
        else {
            this.isMethodPost = false;
        }
    }
    handleToggleSection(event) {
        const openSections = event.detail.openSections;
    }
    handleKeyChange(event) {
        this.key = event.target.value;
    }
    handleValueChange(event) {
        this.value = event.target.value;
    }
    handleKey2Change(event) {
        this.key2 = event.target.value;
    }
    handleValue2Change(event) {
        this.value2 = event.target.value;
    }
    async createConnection() {
        await insertHttpConfig({
            connectionName: this.name,
            endpoint: this.APIEndpoint,
            httpMethod: this.requestMethod,
            urlKey1: this.key,
            urlValue1: this.value,
            urlKey2: this.key2,
            urlValue2: this.value2
        })
     try {
        this.dispatchEvent(
                    new ShowToastEvent({
                        title: "Success",
                        message: "Callout Configuration is saved",
                        variant: "success"
                    })
                );
     }
     catch {
        this.dispatchEvent(
            new ShowToastEvent({
                title: "Error",
                message: "Error while saving configuration settings",
                variant: "error"
            })
        );
     }
     this.name = '';
     this.APIEndpoint = '';
     this.requestMethod = '';
    }
    clearRecord() {
        this.name = '';
        this.APIEndpoint = '';
        this.requestMethod = '';
        this.key = '';
        this.value = '';
        this.key2 = '';
        this.value2 = '';
    }
    get isButtonDisabled() {
        const isEmpty = !(this.name && this.APIEndpoint);
        return isEmpty;
    }
    addUrlParam() {
        this.isUrlParamClicked = true;
    }
}
