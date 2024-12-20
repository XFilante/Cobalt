import { CenterMessage, SimpleLayout } from "@filante/cobalt/components";
import { Center } from "@mantine/core";

export default function Page() {
  return (
    <>
      <SimpleLayout>
        <Center mih="100vh">
          <CenterMessage title="404" description="Page not found" />
        </Center>
      </SimpleLayout>
    </>
  );
}
