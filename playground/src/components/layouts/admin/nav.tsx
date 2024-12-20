import {
  IconBrandLetterboxd,
  IconCircles,
  IconFingerprintScan,
  IconHome,
  IconPrison,
  IconUsers,
} from '@tabler/icons-react';
import { BaseAppNav } from '@filante/cobalt/components';
import { ICON_SIZE } from '@filante/cobalt';

export const AppNav = () => {
  return (
    <>
      <BaseAppNav>
        {[
          {
            type: 'button',
            name: 'Home',
            href: '/module/admin',
            icon: <IconHome size={ICON_SIZE.MD} />,
          },
          {
            type: 'button',
            name: 'Users',
            href: '/module/admin/user',
            icon: <IconUsers size={ICON_SIZE.MD} />,
          },
          {
            type: 'button',
            name: 'Invites',
            href: '/module/admin/invite',
            icon: <IconBrandLetterboxd size={ICON_SIZE.MD} />,
          },
          {
            type: 'button',
            name: 'Access Profiles',
            href: '/module/admin/access-profile',
            icon: <IconFingerprintScan size={ICON_SIZE.MD} />,
          },
          {
            type: 'button',
            name: 'Roles',
            href: '/module/admin/role',
            icon: <IconCircles size={ICON_SIZE.MD} />,
          },
          {
            type: 'button',
            name: 'Permissions',
            href: '/module/admin/permission',
            icon: <IconPrison size={ICON_SIZE.MD} />,
          },
        ]}
      </BaseAppNav>
    </>
  );
};
