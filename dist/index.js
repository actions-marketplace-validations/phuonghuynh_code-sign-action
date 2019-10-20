module.exports=function(e,t){"use strict";var r={};function __webpack_require__(t){if(r[t]){return r[t].exports}var n=r[t]={i:t,l:false,exports:{}};e[t].call(n.exports,n,n.exports,__webpack_require__);n.l=true;return n.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(526)}return startup()}({87:function(e){e.exports=require("os")},129:function(e){e.exports=require("child_process")},431:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});const n=r(87);function issueCommand(e,t,r){const i=new Command(e,t,r);process.stdout.write(i.toString()+n.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const i="::";class Command{constructor(e,t,r){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=r}toString(){let e=i+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";for(const t in this.properties){if(this.properties.hasOwnProperty(t)){const r=this.properties[t];if(r){e+=`${t}=${escape(`${r||""}`)},`}}}}e+=i;const t=`${this.message||""}`;e+=escapeData(t);return e}}function escapeData(e){return e.replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escape(e){return e.replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/]/g,"%5D").replace(/;/g,"%3B")}},470:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){function adopt(e){return e instanceof r?e:new r(function(t){t(e)})}return new(r||(r=Promise))(function(r,i){function fulfilled(e){try{step(n.next(e))}catch(e){i(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){i(e)}}function step(e){e.done?r(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const i=r(431);const s=r(87);const o=r(622);var u;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(u=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){process.env[e]=t;i.issueCommand("set-env",{name:e},t)}t.exportVariable=exportVariable;function setSecret(e){i.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){i.issueCommand("add-path",{},e);process.env["PATH"]=`${e}${o.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r){throw new Error(`Input required and not supplied: ${e}`)}return r.trim()}t.getInput=getInput;function setOutput(e,t){i.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setFailed(e){process.exitCode=u.Failure;error(e)}t.setFailed=setFailed;function debug(e){i.issueCommand("debug",{},e)}t.debug=debug;function error(e){i.issue("error",e)}t.error=error;function warning(e){i.issue("warning",e)}t.warning=warning;function info(e){process.stdout.write(e+s.EOL)}t.info=info;function startGroup(e){i.issue("group",e)}t.startGroup=startGroup;function endGroup(){i.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return n(this,void 0,void 0,function*(){startGroup(e);let r;try{r=yield t()}finally{endGroup()}return r})}t.group=group;function saveState(e,t){i.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},526:function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)if(Object.hasOwnProperty.call(e,r))t[r]=e[r];t["default"]=e;return t};var i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:true});const s=n(r(470));const o=r(747);const u=i(r(669));const a=r(129);const c=u.default.promisify(a.exec);function sleep(e){if(e>0)console.log(`Waiting for ${e} seconds.`);return new Promise(t=>setTimeout(t,e*1e3))}async function createCertificatePfx(){const e=s.getInput("certificate");const t=Buffer.from(e,"base64");if(t.length==0)throw"certificate value is not set.";console.log(`Writing ${t.length} bytes to certificate.pfx.`);await o.promises.writeFile("./certificate.pfx",t)}async function signFile(e){const t="C:/Program Files (x86)/Windows Kits/10/bin/10.0.17763.0/x86/signtool.exe";const r="http://timestamp.digicert.com";try{const{stdout:n}=await c(`"${t}" sign /f certificate.pfx /tr ${r} /td sha256 /fd sha256 ${e}`);console.log(n);return true}catch(e){console.log(e.stderr);return false}}async function trySignFile(e){console.log(`Signing ${e}.`);for(let t=0;t<10;t++){await sleep(t);if(await signFile(e))return}throw`failed to sign '${e}'`}async function signFiles(){const e=s.getInput("folder");const t=await o.promises.readdir(e);for(let r of t){if(r.endsWith(".dll")){await trySignFile(`${e}/${r}`)}}}async function run(){try{await createCertificatePfx();await signFiles()}catch(e){s.setFailed(`Action failed with error: ${e}`)}}run()},622:function(e){e.exports=require("path")},669:function(e){e.exports=require("util")},747:function(e){e.exports=require("fs")}});