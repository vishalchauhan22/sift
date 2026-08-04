import { ATLASSIAN_PARTNERS, ATLASSIAN_WEBSITE } from '@js/constants/routes';

import { useAtlassianLocaleResponseQuery } from '@js/common/signup/promotional-email-gdpr/graphql/AtlassianLocaleResponse.generated';
import { usePromotionalCheckboxStore } from '@js/common/signup/promotional-email-gdpr/promotional-checkbox-store/usePromotionalCheckboxStore';
import React, { useEffect } from 'react';

import { Spacer, Checkbox, Text, Link, FormField, Arrange } from '@loomhq/lens';

import { isProduction } from '../../../constants/environment';

type PromotionalCheckboxProps = {
  size?: 'body-sm';
  color?: 'body' | 'bodyDimmed';
};

const params = new URLSearchParams(window.location.search);

const usePromotionalCheckbox = (): void => {
  const { loading, data } = useAtlassianLocaleResponseQuery({
    skip: !isProduction,
  });

  const setLocale = usePromotionalCheckboxStore(state => state.setLocale);
  const setLocaleRequiresMarketingOptIn = usePromotionalCheckboxStore(
    state => state.setLocaleRequiresMarketingOptIn
  );

  useEffect(() => {
    if (
      !loading &&
      data?.atlassianLocaleResponse?.__typename === 'GetAtlassianLocalePayload'
    ) {
      setLocale(data.atlassianLocaleResponse.locale);
      setLocaleRequiresMarketingOptIn(
        data.atlassianLocaleResponse.localeRequiresMarketingOptIn
      );
    }
  }, [loading, data, setLocale, setLocaleRequiresMarketingOptIn]);
};

export const PromotionalCheckbox = ({
  size = 'body-sm',
  color = 'body',
}: PromotionalCheckboxProps): JSX.Element | null => {
  usePromotionalCheckbox();

  const showPromotionalCheckboxOverride =
    params.get('showPromotionalCheckbox') === 'true';

  const localeRequiresMarketingOptIn = usePromotionalCheckboxStore(
    state => state.localeRequiresMarketingOptIn
  );

  const isPromotionalEmailBoxChecked = usePromotionalCheckboxStore(
    state => state.isPromotionalEmailBoxChecked
  );
  const setIsChecked = usePromotionalCheckboxStore(state => state.setIsChecked);

  if (localeRequiresMarketingOptIn || showPromotionalCheckboxOverride) {
    return (
      <>
        <FormField direction="row">
          <Arrange alignContent="end" gap="small">
            <Checkbox
              id="promotionalCheckbox"
              isChecked={isPromotionalEmailBoxChecked}
              onChange={event => setIsChecked(event.target.checked)}
            />
            <Text size={size} color={color}>
              Yes! I would like to receive promotional emails including product
              news, events, and more from{' '}
              <Link href={ATLASSIAN_WEBSITE} target="_blank">
                Atlassian
              </Link>{' '}
              and{' '}
              <Link href={ATLASSIAN_PARTNERS} target="_blank">
                Atlassian Partners
              </Link>
              .
            </Text>
          </Arrange>
        </FormField>
        <Spacer bottom="medium" />
      </>
    );
  }

  return null;
};
