type AspectRatioAndDimensions = {
  value: number;
  ratio: string;
  dimensions: string;
};

const ASPECT_RATIO_AND_DIMENSIONS: AspectRatioAndDimensions[] = [
  {
    value: 1 / 1,
    ratio: '1:1',
    dimensions: '1080 ✕ 1080',
  },
  {
    value: 4 / 3,
    ratio: '4:3',
    dimensions: '1024 ✕ 768',
  },
  {
    value: 16 / 9,
    ratio: '16:9',
    dimensions: '1920 ✕ 1080',
  },
  {
    value: 18 / 9,
    ratio: '18:9',
    dimensions: '2160 ✕ 1080',
  },
  {
    value: 21 / 9,
    ratio: '21:9',
    dimensions: '2560 ✕ 1080',
  },
];

const DEFAULT_RECOMMENDATION = ASPECT_RATIO_AND_DIMENSIONS[2];

const recommendationStr = (dimensions, ratio) =>
  `Recommend ${dimensions} or ${ratio} files in .png or .jpg`;

function getAspectRatioAndDimensions(givenRatio): AspectRatioAndDimensions {
  // default to 16:9 as it's the most common display standard
  let res = DEFAULT_RECOMMENDATION;
  let smallestDiff = Infinity;

  // find the closest aspect ratio
  for (const item of Object.values(ASPECT_RATIO_AND_DIMENSIONS)) {
    const diff = Math.abs(givenRatio - item.value);

    if (diff < smallestDiff) {
      smallestDiff = diff;
      res = item;
    }
  }

  return res;
}

export const getDimensionsRecommendation = (): string => {
  const videoEl = document.getElementsByClassName('videoFrame')[0];

  if (videoEl) {
    const videoDimensions = videoEl.getBoundingClientRect();

    const res = getAspectRatioAndDimensions(
      videoDimensions.width / videoDimensions.height
    );

    return recommendationStr(res.dimensions, res.ratio);
  }

  return recommendationStr(
    DEFAULT_RECOMMENDATION.dimensions,
    DEFAULT_RECOMMENDATION.ratio
  );
};
