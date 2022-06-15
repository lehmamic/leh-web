import { Facebook, Github, Linkedin, Rss, Twitter } from "mdi-material-ui";

export interface SocialMedia {
  name: string;
  url: string;
  icon: React.ElementType;
}

interface NavItem {
  url: string;
  label: string;
}

export const extractSocialMedia = (
  baseUrl: string,
  socialMedia: { twitter?: string; facebook?: string; linkedIn?: string; github?: string; },
): SocialMedia[] => {
  const result: SocialMedia[] = [];

  if (socialMedia.facebook) {
    result.push({
      name: 'Facebook',
      url: `https://www.facebook.com/${socialMedia.facebook}`,
      icon: Facebook,
    })
  }

  if (socialMedia.twitter) {
    result.push({
      name: 'Twitter',
      url: `https://twitter.com/${socialMedia.twitter.replace('@', '')}`,
      icon: Twitter,
    });
  }

  if (socialMedia.linkedIn) {
    result.push({
      name: 'LinkedIn',
      url: `https://www.linkedin.com/in/${socialMedia.linkedIn}`,
      icon: Linkedin,
    });
  }

  if (socialMedia.github) {
    result.push({
      name: 'GitHub',
      url: `https://github.com/${socialMedia.github}`,
      icon: Github,
    });
  }

  result.push({
    name: 'RSS',
    url: `${baseUrl}blog/rss.xml`,
    icon: Rss,
  });

  return result;
};
