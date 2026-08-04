import { PresetVariablesEnum } from '@loomhq/shared-utilities';
import { PresetVariablesEnum as GeneratedVariablesEnum } from '@js/globalTypes.generated';

export const PRESET_VARIABLES_TO_GENERATED_VARIABLES = {
  [PresetVariablesEnum.variable]: GeneratedVariablesEnum.Variable,
  [PresetVariablesEnum.name]: GeneratedVariablesEnum.Name,
  [PresetVariablesEnum.companyName]: GeneratedVariablesEnum.CompanyName,
};

export const GENERATED_VARIABLES_TO_PRESET_VARIABLES = {
  [GeneratedVariablesEnum.Variable]: PresetVariablesEnum.variable,
  [GeneratedVariablesEnum.Name]: PresetVariablesEnum.name,
  [GeneratedVariablesEnum.CompanyName]: PresetVariablesEnum.companyName,
};

export const MAX_CHARACTER_LENGTH = 50;
export const MAX_NUMBER_OF_TABLE_ROWS = 100;

export const MAX_SELECTED_WORDS = 3;
export const MAX_SELECTED_TOKENS = 2 * MAX_SELECTED_WORDS; // Double to account for punctuation

export const BACKDROP_Z_INDEX_FOR_FTUX = 100;
