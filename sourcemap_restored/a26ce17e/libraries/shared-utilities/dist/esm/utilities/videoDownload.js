import "../chunk-BYZ2GIR3.js";
import { DOWNLOADABLE_BY_ENUM } from "../constants/video";
const videoCannotUpdateDownloadEnabled = (downloadableBy) => {
  return [DOWNLOADABLE_BY_ENUM.NO_ONE, DOWNLOADABLE_BY_ENUM.OWNER].includes(
    downloadableBy
  );
};
export {
  videoCannotUpdateDownloadEnabled
};
//# sourceMappingURL=videoDownload.js.map
