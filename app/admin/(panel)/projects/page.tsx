import { AdminPageHeader } from "@/components/admin/page-header";
import { ResourceList } from "@/components/admin/resource-list";
import { Badge } from "@/components/ui/badge";
import { deleteProjectAction } from "@/server/actions/content";
import { listProjects } from "@/server/db/queries/content";

export default async function AdminProjectsPage() {
  const projects = await listProjects();

  return (
    <>
      <AdminPageHeader title="Projects" description="Shown on the Projects page and, when featured, on the home page." newHref="/admin/projects/new" newLabel="New project" />
      <ResourceList
        resource="projects"
        headers={["Title", "Tags"]}
        deleteAction={deleteProjectAction}
        emptyText="No projects yet."
        rows={projects.map((project) => ({
          id: project.id,
          visible: project.visible,
          label: project.title,
          editHref: `/admin/projects/${project.id}`,
          cells: [
            <span key="title" className="flex items-center gap-2 font-medium">
              {project.title}
              {project.featured && <Badge variant="outline">Featured</Badge>}
            </span>,
            <span key="tags" className="text-zinc-500 dark:text-zinc-400">{project.tags.join(", ")}</span>,
          ],
        }))}
      />
    </>
  );
}
