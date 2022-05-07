import React from 'react'
import FacebookGreenIcon from '../../../../icons/FacebookGreenIcon';
import GoogleGreenIcon from '../../../../icons/GoogleGreenIcon';
import InstagramGreenIcon from '../../../../icons/InstagramGreenIcon';
import ShareLinkGreenIcon from '../../../../icons/ShareLinkGreenIcon';
import TwitterGreenIcon from '../../../../icons/TwitterGreenIcon';

type ProfileSocialLinksProps = {
  fb: string;
  google: string;
  instagram: string;
  twitter: string;
  shareLink: string;
};

const ProfileSocials = ({ fb, google, instagram, twitter, shareLink }: ProfileSocialLinksProps) => {
  return (
      <div className="flex items-center gap-4 ">
          {/* Facebook  */}
          <a href={fb}>
              <FacebookGreenIcon/>
          </a>
          {/* Google */}
          <a href={google}>
              <GoogleGreenIcon/>
          </a>
          {/* INstagram */}
          <a href={instagram}>
              <InstagramGreenIcon/>
          </a>
          {/* Twiiter */}
          <a href={twitter}>
              <TwitterGreenIcon/>
          </a>
          {/* ShareLink */}
          <a href={shareLink}>
              <ShareLinkGreenIcon/>
          </a>
      </div>
  );
};

export default ProfileSocials