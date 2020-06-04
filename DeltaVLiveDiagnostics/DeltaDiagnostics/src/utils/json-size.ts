import sizeof from "object-sizeof";
/**
 * Helper functions for getting size of json objects
 */

/**
 * Returns a formatted byte string depending on the number of bytes
 * E.g. kb/mb/gb etc.
 * @param bytes
 */
export function getFormattedByteString(bytes: number): string {
  const bytesInOneGigabyte: number = 1073741824;
  const bytesInOneMegabyte: number = 1048576;
  const bytesInOneKilobyte: number = 1024;
  if (bytes < bytesInOneKilobyte) {
    return bytes + " Bytes";
  } else if (bytes < bytesInOneMegabyte) {
    return (bytes / bytesInOneKilobyte).toFixed(3) + " KB";
  } else if (bytes < bytesInOneGigabyte) {
    return (bytes / bytesInOneMegabyte).toFixed(3) + " MB";
  } else {
    return (bytes / bytesInOneGigabyte).toFixed(3) + " GB";
  }
}

/**
 * Returns the size of a json object in bytes
 * @param json
 */
export function getJsonSize(json: object): number {
  return sizeof(json);
}
