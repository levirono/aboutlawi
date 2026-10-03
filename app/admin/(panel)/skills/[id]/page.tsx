import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/delete-button";
import { SkillForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";
import { deleteSkillAction } from "@/server/actions/content";
import { findSkill } from "@/server/db/queries/content";
import { parseIdParam } from "@/server/utils/params";

export default async function EditSkillPage({ params }: PageProps<"/admin/skills/[id]">) {
  const skill = await findSkill(parseIdParam((await params).id));
  if (!skill) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit ${skill.name}`}
        actions={<DeleteButton action={deleteSkillAction} id={skill.id} label={skill.name} redirectTo="/admin/skills" />}
      />
      <SkillForm skill={skill} />
    </>
  );
}
