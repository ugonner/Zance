export const getFallbackProfile = (fullName: string) =>
  fullName ? `${fullName.split(' ')[0][0] || ''}${fullName.split(' ')[1]?.[0] || ''}` : 'U'
