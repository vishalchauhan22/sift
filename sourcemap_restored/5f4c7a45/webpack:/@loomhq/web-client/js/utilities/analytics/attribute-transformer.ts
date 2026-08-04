import { AnalyticsEntityId } from '@loomhq/shared-utilities/utilities/analytics/analyticUtils';

/**
 * This function is a utility function that is used to transform the identifiers in user analytics events.
 * This is used for auto increment id migration where we need to send new UUIDs as a separate attribute rather than assigning to the old attribute.
 * For entities we are migrating, e.g. workspace, we need to pass the extra parameter to specify the current data type of the workspace id.
 * This is because we are doing GraphQL migration to return all identifiers as strings but still need to send the identifiers in the event attributes to match the current data type.
 *
 * @example
 * const eventName = 'video_created';
 * const entities = [
 *   AnalyticsEntityId.video(videoId, 'video_id') // we are not migrating videos table, so no extra parameter is needed
 *   AnalyticsEntityId.workspace(workspaceId, 'number', 'workspace_id') // we are migrating workspaces table, so we need to pass the extra parameter to specify the current type of the workspace id.
 *   AnalyticsEntityId.workspace(selectedWorkspaceId, 'string', 'selected_workspace_id') // if selectedWorkspaceId is string type, we specify as string.
 * ];
 *
 * analytics.track(anonymousId, eventName, {
 *   ...analytics.withIdentifiers(
 *     eventName,
 *     ...entities
 *   ),
 *   isAnonymous: false, // some other non-identifier attributes
 * });
 *
 * @param eventName
 * @param entities
 * @returns an object with the identifiers as attributes
 */
export function withIdentifiers(
  _: string | Record<string, unknown>,
  ...entities: AnalyticsEntityId[]
): Record<string, unknown> {
  let idAttributes = {};
  entities.forEach(entity => {
    idAttributes = {
      ...idAttributes,
      ...entity.getAttr(),
    };
  });
  return idAttributes;
}
