const DEMO = true;
const serverAdr = (DEMO) ? ("http://localhost") : ("global address");
export { serverAdr as default, DEMO };