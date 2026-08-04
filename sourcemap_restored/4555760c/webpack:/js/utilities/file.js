/* eslint-disable @loomhq/loom/no-js-extension */
import { parse } from 'csv-parse/browser/esm';

import { CSV as CSV_MIME } from '@loomhq/shared-utilities/constants/mimes';

export const readCsvFile = file => {
  return new Promise((resolve, reject) => {
    if (file.type !== CSV_MIME) {
      reject('Only .csv uploads supported');
    }

    const reader = new FileReader();

    reader.onload = () => {
      parse(reader.result, (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    };

    reader.readAsBinaryString(file);
  });
};
