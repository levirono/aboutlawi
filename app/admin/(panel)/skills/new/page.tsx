import { SkillForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewSkillPage() {
  return (
    <>
      <AdminPageHeader title="New skill" />
      <SkillForm />
    </>
  );
}
