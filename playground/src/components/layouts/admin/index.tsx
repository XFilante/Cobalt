
import { BaseAppLayout } from '@filante/cobalt/components';
import { AppNav } from "./nav";

type Props = {
  children: React.ReactNode;
};

export const AdminLayout = (props: Props) => {
  return (
    <>
      <BaseAppLayout nav={<AppNav />}>{props.children}</BaseAppLayout>
    </>
  );
};
