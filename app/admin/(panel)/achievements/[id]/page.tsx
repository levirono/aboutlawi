import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { AchievementForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";
import { deleteAchievementAction } from "@/server/actions/content";
import { findAchievement } from "@/server/db/queries/content";
import { parseIdParam } from "@/server/utils/params";

export default async function EditAchievementPage({ params }: PageProps<"/admin/achievements/[id]">) {
  const achievement = await findAchievement(parseIdParam((await params).id));
  if (!achievement) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${achievement.title}`}
        actions={<DeleteButton action={deleteAchievementAction} id={achievement.id} label={achievement.title} redirectTo="/admin/achievements" />}
      />
      <AchievementForm achievement={achievement} />
    </>
  );
}
