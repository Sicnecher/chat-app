import { Account, Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66e1a3180005e4d10ce8');

const account = new Account(client)

export {account, client}