import { ProjectForm } from "@/components/admin/forms";
import { AdminPageHeader } from "@/components/admin/page-header";

export default function NewProjectPage() {
  return (
    <>
      <AdminPageHeader title="New project" />
      <ProjectForm />
    </>
  );
}
