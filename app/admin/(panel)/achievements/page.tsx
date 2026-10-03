import { AdminPageHeader } from "@/components/admin/page-header";
import { ResourceList } from "@/components/admin/resource-list";
import { Badge } from "@/components/ui/badge";
import { deleteAchievementAction } from "@/server/actions/content";
import { listAchievements } from "@/server/db/queries/content";

export default async function AdminAchievementsPage() {
  const achievements = await listAchievements();

  return (
    <>
      <AdminPageHeader title="Achievements" description="Awards, certifications and milestones." newHref="/admin/achievements/new" newLabel="New achievement" />
      <ResourceList
        resource="achievements"
        headers={["Title", "Issuer", "Date"]}
        deleteAction={deleteAchievementAction}
        emptyText="No achievements yet."
        rows={achievements.map((achievement) => ({
          id: achievement.id,
          visible: achievement.visible,
          label: achievement.title,
          editHref: `/admin/achievements/${achievement.id}`,
          cells: [
            <span key="title" className="flex items-center gap-2 font-medium">
              {achievement.title}
              {achievement.featured && <Badge variant="outline">Featured</Badge>}
            </span>,
            <span key="issuer" className="text-zinc-500 dark:text-zinc-400">{achievement.issuer}</span>,
            <span key="date" className="tabular-nums text-zinc-500 dark:text-zinc-400">{achievement.achievedOn}</span>,
          ],
        }))}
      />
    </>
  );
}
