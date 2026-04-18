import { describe, it, expect } from "vitest";
import content from "@/data/content";

describe("content data", () => {
  it("has required top-level fields", () => {
    expect(content.name).toBeTruthy();
    expect(content.role).toBeTruthy();
    expect(content.tagline).toBeTruthy();
    expect(content.bio).toBeTruthy();
    expect(content.github).toBeTruthy();
    expect(content.email).toBeTruthy();
  });

  it("has at least one project", () => {
    expect(content.projects.length).toBeGreaterThan(0);
  });

  it("every project has required fields", () => {
    for (const project of content.projects) {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.longDescription).toBeTruthy();
      expect(project.githubUrl).toBeTruthy();
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  it("every project has a unique id", () => {
    const ids = content.projects.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("youtube IDs are safe if present", () => {
    const safePattern = /^[a-zA-Z0-9_-]{11}$/;
    for (const project of content.projects) {
      if (project.youtubeId) {
        expect(project.youtubeId).toMatch(safePattern);
      }
      for (const item of project.media ?? []) {
        if (item.type === "youtube") {
          expect(item.id).toMatch(safePattern);
        }
        if (item.type === "image") {
          expect(item.src).toBeTruthy();
        }
      }
    }
  });

  it("has at least one interest", () => {
    expect(content.interests.length).toBeGreaterThan(0);
  });

  it("every interest has id, label, and icon", () => {
    for (const interest of content.interests) {
      expect(interest.id).toBeTruthy();
      expect(interest.label).toBeTruthy();
      expect(interest.icon).toBeTruthy();
    }
  });

  it("has at least one education entry", () => {
    expect(content.education.length).toBeGreaterThan(0);
  });

  it("every education entry has required fields", () => {
    for (const edu of content.education) {
      expect(edu.id).toBeTruthy();
      expect(edu.degree).toBeTruthy();
      expect(edu.institution).toBeTruthy();
      expect(edu.period).toBeTruthy();
      expect(Array.isArray(edu.courses)).toBe(true);
    }
  });
});
