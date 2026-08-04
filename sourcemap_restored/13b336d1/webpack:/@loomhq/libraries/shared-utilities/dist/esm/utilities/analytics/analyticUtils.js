import "../../chunk-BYZ2GIR3.js";
const isUUID = (value) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return typeof value === "string" && uuidRegex.test(value);
};
const convert = (value, format) => {
  if (format === "string") {
    return String(value);
  }
  if (format === "number") {
    return Number(value);
  }
  return value;
};
class AnalyticsEntityId {
  constructor(value, format, attrName, renameToGuidAttr) {
    this.value = value;
    this.format = format;
    this.attrName = attrName;
    this.renameToGuidAttr = renameToGuidAttr;
  }
  /**
   * Formats the entity ID for analytics tracking
   */
  getAttr() {
    if (!this.value || Array.isArray(this.value) && this.value.length === 0) {
      return {
        [this.attrName]: this.value
      };
    }
    if (isUUID(Array.isArray(this.value) ? this.value[0] : this.value)) {
      return {
        [this.renameToGuidAttr ? this.getGuidAttrName() : this.attrName]: this.value
      };
    }
    return {
      [this.attrName]: Array.isArray(this.value) ? this.value.map((v) => convert(v, this.format)) : convert(this.value, this.format)
    };
  }
  getBaseAttrNameForOrganization() {
    if (/^(orgId|org_id)s*$/.test(this.attrName)) {
      return "workspace";
    }
    const match = this.attrName.match(
      /^(.*)(_org_id|organizationId|organization_id|organzation_id|OrgId|OrganizationId)s*$/
    );
    if (match) {
      if (match[1] === "") {
        return "workspace";
      }
      if (match[1].endsWith("_")) {
        return "".concat(match[1], "workspace");
      }
      return "".concat(match[1], "_workspace");
    }
    return null;
  }
  getGuidAttrName() {
    let baseAttrName = this.getBaseAttrNameForOrganization();
    if (!baseAttrName) {
      const match = this.attrName.match(/^(.+)(Id|_id|Ids|_ids)$/);
      baseAttrName = match ? match[1] : this.attrName;
    }
    const isArray = Array.isArray(this.value);
    if (baseAttrName === "id" || baseAttrName === "ids") {
      return isArray ? "guids" : "guid";
    }
    return "".concat(baseAttrName, "_").concat(isArray ? "guids" : "guid");
  }
  /**
   * Static factory methods for common entity types
   */
  static workspace(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static user(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static video(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static videoClip(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static canvasOverlay(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static paymentIntent(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static analyticsExport(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static slackUser(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static slackTeam(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static s3(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static asset(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static site(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static workspaceMember(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static analyticsLinking(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static invitation(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static tag(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static meeting(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static videoSuggestion(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static videoTranscript(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static processingJob(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static folder(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static space(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static externalCustomer(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static stripeSubscription(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static rabbitMessage(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static rabbitMentionModel(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static screenshot(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static share(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static anonymous(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static device(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static loginAttempt(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static atlassianAccount(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static inviteLink(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static inviteeUserId(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static workspaceRequest(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static googleAnalytics(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static csmJourneyId(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static conversation(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static unsubscribe(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static workspaceGroup(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static commentPost(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static invitationIncentive(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static stripeInvoice(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static invoice(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static notification(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static view(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static audioVariable(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static workspaceContact(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static commentReply(value, format, name) {
    return new AnalyticsEntityId(value, format, name, true);
  }
  static session(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static file(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static referralLink(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static mixed(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static slackRecordingSession(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static slack(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
  static integrationSubscription(value, name) {
    return new AnalyticsEntityId(value, "any", name, false);
  }
}
export {
  AnalyticsEntityId
};
//# sourceMappingURL=analyticUtils.js.map
