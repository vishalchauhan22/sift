export type GenericOptions = {
  maxAllowedLength?: number;
  inPlayer?: boolean;
  useNewEmbedPlayer?: boolean;
  withPills?: boolean;
};

export enum ComponentType {
  Text = 'text',
  Mention = 'mention',
  LineBreak = 'lineBreak',
  Link = 'link',
  LoomLink = 'loomLink',
  Ellipse = 'ellipse',
}

type MentionSemanticPart = {
  type: ComponentType.Mention;
  mention: string;
  displayText: string;
  trimmable?: false;
};

export type LinkSemanticPart = {
  type: ComponentType.Link;
  url: string;
  displayText: string;
  trimmable: true;
  trimmedDisplayText?: string;
};

export type TextSemanticPart = {
  type: ComponentType.Text;
  displayText: string;
  trimmable: true;
  trimmedDisplayText?: string;
};

type LoomLinkSemanticPart = {
  type: ComponentType.LoomLink;
  videoId: string;
  trimmable?: false;
};

type LineBreakSemanticPart = {
  type: ComponentType.LineBreak;
  trimmable?: false;
};

type EllipseSemanticPart = {
  type: ComponentType.Ellipse;
  trimmable?: false;
};

export type SemanticPart =
  | MentionSemanticPart
  | LinkSemanticPart
  | TextSemanticPart
  | LoomLinkSemanticPart
  | LineBreakSemanticPart
  | EllipseSemanticPart;

export type HandlerFnType = (
  semanticPart: Array<SemanticPart | string>,
  options: GenericOptions
) => Array<SemanticPart | string>;
export type ComponentFnType = (
  semanticPart: Array<SemanticPart>,
  options: GenericOptions
) => Array<JSX.Element>;
