import { SocialLinkForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewSocialLinkPage() {
  return (
    <>
      <AdminPageHeader title="New social link" />
      <SocialLinkForm />
    </>
  );
}
