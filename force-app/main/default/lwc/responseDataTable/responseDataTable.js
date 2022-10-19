/**
 * @description       : 
 * @author            : Asadbek@i2max
 * @group             : 
 * @last modified on  : 10-11-2022
 * @last modified by  : Asadbek@i2max
 * Modifications Log
 * Ver   Date         Author          Modification
 * 1.0   09-26-2022   Asadbek@i2max   Initial Version
**/
import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { subscribe, MessageContext, unsubscribe } from 'lightning/messageService';
import JSON_RESPONSE_CHANNEL from '@salesforce/messageChannel/JsonResponse__c';

const columns = [
    {
        label: 'JSON key1', fieldName: 'JSONKey1'
    },
    {
        label: 'JSON key2', fieldName: 'JSONKey2'
    },
    {
        label: 'JSON key3', fieldName: 'JSONKey3'
    }
]
const data = [
    {
        JSONKey1: 'JSONvalue1',
        JSONKey2: 'JSONvalue2',
        JSONKey3: 'JSONvalue3'
    },
    {
        JSONKey1: 'JSONvalue1',
        JSONKey2: 'JSONvalue2',
        JSONKey3: 'JSONvalue3'
    }, 
    {
        JSONKey1: 'JSONvalue1',
        JSONKey2: 'JSONvalue2',
        JSONKey3: 'JSONvalue3'
    }
]

export default class ResponseDataTable extends LightningElement {
    subscription = null;
    data = data;
    columns = columns;

    @wire(MessageContext)
    messageContext;
    subscribeToMessageChannel() {
        if(this.subscription != null) {
        this.subscription = subscribe(
            this.messageContext,
            JSON_RESPONSE_CHANNEL,
            (message) => this.handleMessage(message)
        );
        }
    }
    handleMessage(message) {
        // this.data = message.data;
    }
    ubsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    disconnectedCallback() {
        this.ubsubscribeToMessageChannel();
    }
    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                 title: 'Error loading contact',
                 message: error,
                 variant: 'error',
            })
        );
    }
}