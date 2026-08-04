import "../chunk-BYZ2GIR3.js";
var ServiceEnum = /* @__PURE__ */ ((ServiceEnum2) => {
  ServiceEnum2["Loom"] = "loom";
  ServiceEnum2["Confluence"] = "confluence";
  ServiceEnum2["Jira"] = "jira";
  ServiceEnum2["BitBucket"] = "bitbucket";
  ServiceEnum2["GoogleDoc"] = "google_doc";
  ServiceEnum2["GoogleSheet"] = "google_sheet";
  ServiceEnum2["GoogleSlides"] = "google_slides";
  ServiceEnum2["Figma"] = "figma";
  ServiceEnum2["GithubPr"] = "github_pr";
  ServiceEnum2["GithubGist"] = "github_gist";
  ServiceEnum2["Word"] = "word";
  ServiceEnum2["Excel"] = "excel";
  ServiceEnum2["Powerpoint"] = "powerpoint";
  ServiceEnum2["Onenote"] = "onenote";
  return ServiceEnum2;
})(ServiceEnum || {});
const SERVICES = [
  {
    name: "google_doc" /* GoogleDoc */,
    humanName: "Google Doc",
    regex: new RegExp("https://docs.google.com/document/\\S+", "ig")
  },
  {
    name: "google_sheet" /* GoogleSheet */,
    humanName: "Google Sheet",
    regex: new RegExp("https://docs.google.com/spreadsheets/\\S+", "ig")
  },
  {
    name: "google_slides" /* GoogleSlides */,
    humanName: "Google Slides",
    regex: new RegExp("https://docs.google.com/presentation/\\S+", "ig")
  },
  {
    name: "jira" /* Jira */,
    humanName: "Jira",
    regex: new RegExp(
      "https://([^.]+)(.jira.atlassian.cloud|.atlassian.net)/browse/\\S+",
      "ig"
    )
  },
  {
    name: "confluence" /* Confluence */,
    humanName: "Confluence",
    regex: new RegExp("https://([^.]+).atlassian.net/wiki/\\S+", "ig")
  },
  {
    name: "loom" /* Loom */,
    humanName: "Loom",
    regex: new RegExp("https://(?:www.)?loom.com/share/\\S+", "ig")
  },
  {
    name: "figma" /* Figma */,
    humanName: "Figma",
    regex: new RegExp("https://(?:www.)?figma.com/\\S+", "ig")
  },
  {
    name: "github_gist" /* GithubGist */,
    humanName: "GitHub Gist",
    regex: new RegExp("https://gist.github.com/\\S+", "ig")
  },
  {
    name: "github_pr" /* GithubPr */,
    humanName: "GitHub PR",
    regex: new RegExp("https://github.com/\\S+/\\S+/pull/\\S+", "ig")
  },
  {
    name: "word" /* Word */,
    humanName: "Word",
    regex: new RegExp("https://1drv.ms/w/\\S+", "ig")
  },
  {
    name: "excel" /* Excel */,
    humanName: "Excel",
    regex: new RegExp("https://1drv.ms/x/\\S+", "ig")
  },
  {
    name: "powerpoint" /* Powerpoint */,
    humanName: "PowerPoint",
    regex: new RegExp("https://1drv.ms/p/\\S+", "ig")
  },
  {
    name: "onenote" /* Onenote */,
    humanName: "OneNote",
    regex: new RegExp("https://1drv.ms/o/\\S+", "ig")
  }
];
export {
  SERVICES,
  ServiceEnum
};
//# sourceMappingURL=services.js.map
