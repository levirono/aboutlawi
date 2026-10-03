import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { ProjectForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";
import { deleteProjectAction } from "@/server/actions/content";
import { findProject } from "@/server/db/queries/content";
import { parseIdParam } from "@/server/utils/params";

export default async function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  const project = await findProject(parseIdParam((await params).id));
  if (!project) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${project.title}`}
        actions={<DeleteButton action={deleteProjectAction} id={project.id} label={project.title} redirectTo="/admin/projects" />}
      />
      <ProjectForm project={project} />
    </>
  );
}
