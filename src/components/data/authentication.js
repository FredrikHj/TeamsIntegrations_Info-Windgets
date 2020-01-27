import { UserAgentApplication } from "msal";

let loginAuth = () => {
    let programId = '1a29bb77-9d79-4adf-933f-c95c3d0a62e9';
    let klientorganisationId = 'fbb2c627-4588-4c2f-b6a4-0dfb5dc31330';
    // Configuration object constructed
    var msalConfig = {
      auth: {
        clientId: programId,
        authority: `https://login.microsoftonline.com/${klientorganisationId}`,
        redirectURI: "http://localhost:3000/"
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
      }
    };
    console.log(msalConfig);
    
    return msalConfig;
}
export let createNewInstance = () => {
// create UserAgentApplication instance
const msalObj = new UserAgentApplication(loginAuth());  
console.log(msalObj);

return msalObj;
}