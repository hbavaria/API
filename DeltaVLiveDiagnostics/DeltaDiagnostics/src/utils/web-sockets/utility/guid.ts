class Guid {
  static newGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

function isGuid(guid: string) {
  //TODO: use the more restrictive guid check
  //let retu = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guid);
  let retu = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    guid
  );
  return retu;
}

function isEmptyGuid(guid: string) {
  //TODO: use the more restrictive guid check
  //let retu = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guid);
  let retu = /^[0]{8}-[0]{4}-[0]{4}-[0]{4}-[0]{12}$/i.test(guid);
  return retu;
}

export { Guid as default, Guid, isGuid, isEmptyGuid };
