import { AdminLayout } from '@/components/layouts/admin';
import { UserUpdateForm } from '@/components/pages/user/update_form';
import { cobalt } from "@/configs/cobalt";
import {
  FixedWrapper,
  PageHeader,
  QueryLoader,
} from "@filante/cobalt/components";

export default function Page() {
  const { isReady, param } = cobalt.useParams();

  const userId = param.bind(null, "id");

  const query = cobalt.useQuery({
    endpoint: "API_V1_USER_SHOW",
    input: {
      params: {
        id: userId(),
      },
    },
    props: {
      enabled: isReady,
    },
  });

  return (
    <>
      <AdminLayout>
        <FixedWrapper>
          {[
            {
              children: (
                <PageHeader
                  title="User"
                  description="Manage users."
                />
              ),
            },
            {
              children: (
                <QueryLoader query={query}>
                  {(user) => <UserUpdateForm user={user} />}
                </QueryLoader>
              ),
            },
          ]}
        </FixedWrapper>
      </AdminLayout>
    </>
  );
}
