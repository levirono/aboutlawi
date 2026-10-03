"use server";

import {
  createAchievement,
  createGalleryItem,
  createProject,
  createSkill,
  createSocialLink,
  deleteAchievement,
  deleteGalleryItem,
  deleteProject,
  deleteSkill,
  deleteSocialLink,
  findAchievement,
  findGalleryItem,
  findProject,
  findSkill,
  findSocialLink,
  updateAchievement,
  updateGalleryItem,
  updateProject,
  updateSkill,
  updateSocialLink,
} from "@/server/db/queries/content";
import { createSection, deleteSection, findSection, updateSection } from "@/server/db/queries/site";
import { crudActions } from "@/server/utils/crud";
import {
  achievementCreateSchema,
  achievementUpdateSchema,
  galleryCreateSchema,
  galleryUpdateSchema,
  projectCreateSchema,
  projectUpdateSchema,
  sectionCreateSchema,
  sectionUpdateSchema,
  skillCreateSchema,
  skillUpdateSchema,
  socialLinkCreateSchema,
  socialLinkUpdateSchema,
} from "@/shared/schemas/content";

const projects = crudActions({
  label: "Project",
  resource: "projects",
  createSchema: projectCreateSchema,
  updateSchema: projectUpdateSchema,
  find: findProject,
  create: createProject,
  update: updateProject,
  remove: deleteProject,
});
export const createProjectAction = projects.create;
export const updateProjectAction = projects.update;
export const deleteProjectAction = projects.remove;

const skills = crudActions({
  label: "Skill",
  resource: "skills",
  createSchema: skillCreateSchema,
  updateSchema: skillUpdateSchema,
  find: findSkill,
  create: createSkill,
  update: updateSkill,
  remove: deleteSkill,
});
export const createSkillAction = skills.create;
export const updateSkillAction = skills.update;
export const deleteSkillAction = skills.remove;

const achievements = crudActions({
  label: "Achievement",
  resource: "achievements",
  createSchema: achievementCreateSchema,
  updateSchema: achievementUpdateSchema,
  find: findAchievement,
  create: createAchievement,
  update: updateAchievement,
  remove: deleteAchievement,
});
export const createAchievementAction = achievements.create;
export const updateAchievementAction = achievements.update;
export const deleteAchievementAction = achievements.remove;

const gallery = crudActions({
  label: "Gallery item",
  resource: "galleryItems",
  createSchema: galleryCreateSchema,
  updateSchema: galleryUpdateSchema,
  find: findGalleryItem,
  create: createGalleryItem,
  update: updateGalleryItem,
  remove: deleteGalleryItem,
});
export const createGalleryItemAction = gallery.create;
export const updateGalleryItemAction = gallery.update;
export const deleteGalleryItemAction = gallery.remove;

const socialLinks = crudActions({
  label: "Social link",
  resource: "socialLinks",
  createSchema: socialLinkCreateSchema,
  updateSchema: socialLinkUpdateSchema,
  find: findSocialLink,
  create: createSocialLink,
  update: updateSocialLink,
  remove: deleteSocialLink,
});
export const createSocialLinkAction = socialLinks.create;
export const updateSocialLinkAction = socialLinks.update;
export const deleteSocialLinkAction = socialLinks.remove;

const sections = crudActions({
  label: "Section",
  resource: "pageSections",
  createSchema: sectionCreateSchema,
  updateSchema: sectionUpdateSchema,
  find: findSection,
  create: createSection,
  update: updateSection,
  remove: deleteSection,
});
export const createSectionAction = sections.create;
export const updateSectionAction = sections.update;
export const deleteSectionAction = sections.remove;
