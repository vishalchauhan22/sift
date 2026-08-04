import { ReactElement } from 'react';

import { RUMReportingContext } from './reporting';

type ReportingContextProviderRender<T extends RUMReportingContext> = (
  extraReportingData: T
) => ReactElement;

export type ReportingContextProvider<T extends RUMReportingContext> = ({
  render,
}: {
  render: ReportingContextProviderRender<T>;
}) => ReactElement;

const EMPTY_OBJECT = {};

export const DefaultReportingContext: ReportingContextProvider<
  Record<string, never>
> = ({ render }) => render(EMPTY_OBJECT);
