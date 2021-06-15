
/**
 *
 * const cond = {
 *  user: {
 *    username: 'username',
 *    fullName: 'full_name'
 *  }
 * }
 */

export default function equalizedData(data: object, equalityTable: object) {
  // Get data keys, only if not undefined
  const dataKeys = Object.keys(data).filter(key => data[key] !== undefined);

  // Empty obj for converted data
  const equalizedData = {};


  dataKeys.forEach(key => {
    // Get key from equalityTable. 
    // It contains the new key value
    const equalityTableKey = equalityTable[key];
    const isDataObj = typeof data[key] === 'object';

    if (!isDataObj) {
      // Not an object

      // If `equalityTableKey` is not undefined means this key must be converted
      // Else it can remain the same

      if (equalityTableKey) {
        equalizedData[equalityTableKey] = data[key];
      } 
      else {
        // The same key value as before
        // Nothing has changed
        equalizedData[key] = data[key];
      }
    }

    else {

      if (!equalityTableKey) {
        // At this point a equality property is required
        // JSON type data is not supported for Models
        // If needed can be implemented
        // When value inside data[key] is an object
        throw new Error('Equality property is required');
      }

      equalizedData[key]
      const condObjKeys = Object.keys(data[key]);
    }
  });

  return equalizedData;
}