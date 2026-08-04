export const AdminTextInputCopy = {
  email: {
    id: 'emailQuery',
    label: 'Email',
    placeholder: 'name@email.com',
  },
  user: {
    id: 'userQuery',
    label: 'User ID or Email',
    placeholder: '12345 or name@email.com',
  },
  'rewatch-user': {
    id: 'rewatchUserQuery',
    label: 'Designated Admin User ID or Email',
    placeholder: '12345 or name@email.com',
  },
  workspace: {
    id: 'workspaceQuery',
    label: 'Workspace ID',
    placeholder: '6789',
  },
};

export const AdminTextAreaCopy = {
  users: {
    id: 'userQueries',
    label: 'User IDs or emails (separated by commas)',
    placeholder: '123,234,345 or name@email.com,name2@email.com',
  },
  'rewatch-urls': {
    id: 'rewatchUrls',
    label: 'S3 URLs (separated by commas)',
    placeholder:
      'https://rewatch-exports.s3.abcd.com/123,https://rewatch-exports.s3.abcd.com/456,https://rewatch-exports.s3.abcd.com/789',
  },
};

export enum AdminTextInputType {
  User = 'user',
  Workspace = 'workspace',
  Email = 'email',
  RewatchUser = 'rewatch-user',
}

export enum AdminTextAreaType {
  Users = 'users',
  RewatchUrls = 'rewatch-urls',
}
