import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCard from "@/app/components/ProjectCard";
import type { Project } from "@/data/content";

// Framer Motion uses browser APIs — stub it for tests
vi.mock("framer-motion", () => ({
  motion: {
    article: ({
      children,
      onClick,
      onKeyDown,
      // strip framer-motion-only props to prevent DOM warnings
      whileHover: _wh,
      initial: _i,
      animate: _a,
      transition: _t,
      ...props
    }: React.HTMLAttributes<HTMLElement> & {
      children?: React.ReactNode;
      whileHover?: unknown;
      initial?: unknown;
      animate?: unknown;
      transition?: unknown;
    }) => (
      <article onClick={onClick} onKeyDown={onKeyDown} {...props}>
        {children}
      </article>
    ),
  },
}));

const mockProject: Project = {
  id: "test-1",
  title: "Test Project",
  description: "A test project description.",
  longDescription: "A longer test project description.",
  tags: ["TypeScript", "React"],
  githubUrl: "https://github.com/test",
};

describe("ProjectCard", () => {
  it("renders project title", () => {
    render(<ProjectCard project={mockProject} index={0} onClick={vi.fn()} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("renders project description", () => {
    render(<ProjectCard project={mockProject} index={0} onClick={vi.fn()} />);
    expect(screen.getByText("A test project description.")).toBeInTheDocument();
  });

  it("renders all tags", () => {
    render(<ProjectCard project={mockProject} index={0} onClick={vi.fn()} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<ProjectCard project={mockProject} index={0} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledWith(mockProject);
  });

  it("calls onClick on Enter key", () => {
    const handleClick = vi.fn();
    render(<ProjectCard project={mockProject} index={0} onClick={handleClick} />);
    fireEvent.keyDown(screen.getByRole("button"), { key: "Enter" });
    expect(handleClick).toHaveBeenCalledWith(mockProject);
  });

  it("renders YouTube play button when youtubeId is provided", () => {
    const projectWithVideo: Project = {
      ...mockProject,
      youtubeId: "dQw4w9WgXcQ",
    };
    render(<ProjectCard project={projectWithVideo} index={0} onClick={vi.fn()} />);
    // The thumbnail image should be present
    const img = screen.getByAltText("Test Project video thumbnail");
    expect(img).toBeInTheDocument();
  });

  it("has accessible aria-label", () => {
    render(<ProjectCard project={mockProject} index={0} onClick={vi.fn()} />);
    expect(
      screen.getByLabelText("View details for Test Project")
    ).toBeInTheDocument();
  });
});
