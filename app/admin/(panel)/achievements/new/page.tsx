import { AchievementForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewAchievementPage() {
  return (
    <>
      <AdminPageHeader title="New achievement" />
      <AchievementForm />
    </>
  );
}
