import { AdminPageHeader } from "@/components/admin/page-header";
import { ResourceList } from "@/components/admin/resource-list";
import { Badge } from "@/components/ui/badge";
import { deleteSkillAction } from "@/server/actions/content";
import { listSkills } from "@/server/db/queries/content";

export default async function AdminSkillsPage() {
  const skills = await listSkills();

  return (
    <>
      <AdminPageHeader title="Skills" description="Grouped by category on the Skills page; featured skills appear on the home page." newHref="/admin/skills/new" newLabel="New skill" />
      <ResourceList
        resource="skills"
        headers={["Name", "Category"]}
        deleteAction={deleteSkillAction}
        emptyText="No skills yet."
        rows={skills.map((skill) => ({
          id: skill.id,
          visible: skill.visible,
          label: skill.name,
          editHref: `/admin/skills/${skill.id}`,
          cells: [
            <span key="name" className="flex items-center gap-2 font-medium">
              {skill.name}
              {skill.featured && <Badge variant="outline">Featured</Badge>}
            </span>,
            <span key="category" className="text-zinc-500 dark:text-zinc-400">{skill.category}</span>,
          ],
        }))}
      />
    </>
  );
}
