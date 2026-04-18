import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectCard from "@/app/components/ProjectCard";
import type { Project } from "@/data/content";

// ResizeObserver is not available in jsdom
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

vi.mock("framer-motion", () => ({
  motion: {
    article: ({
      children,
      onClick,
      onKeyDown,
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
    div: ({
      children,
      style,
      drag: _drag,
      dragMomentum: _dm,
      dragElastic: _de,
      dragConstraints: _dc,
      onDragStart: _ods,
      onDrag: _od,
      onDragEnd: _ode,
      initial: _i,
      animate: _a,
      transition: _t,
      whileHover: _wh,
      ...props
    }: React.HTMLAttributes<HTMLElement> & {
      children?: React.ReactNode;
      style?: React.CSSProperties;
      drag?: unknown;
      dragMomentum?: unknown;
      dragElastic?: unknown;
      dragConstraints?: unknown;
      onDragStart?: unknown;
      onDrag?: unknown;
      onDragEnd?: unknown;
      initial?: unknown;
      animate?: unknown;
      transition?: unknown;
      whileHover?: unknown;
    }) => (
      <div style={style} {...props}>
        {children}
      </div>
    ),
  },
  useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
  animate: vi.fn(),
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
    fireEvent.click(screen.getByRole("button", { name: /View details for Test Project/i }));
    expect(handleClick).toHaveBeenCalledWith(mockProject);
  });

  it("calls onClick on Enter key", () => {
    const handleClick = vi.fn();
    render(<ProjectCard project={mockProject} index={0} onClick={handleClick} />);
    fireEvent.keyDown(screen.getByRole("button", { name: /View details for Test Project/i }), { key: "Enter" });
    expect(handleClick).toHaveBeenCalledWith(mockProject);
  });

  it("has accessible aria-label", () => {
    render(<ProjectCard project={mockProject} index={0} onClick={vi.fn()} />);
    expect(
      screen.getByLabelText("View details for Test Project")
    ).toBeInTheDocument();
  });

  it("renders no media area when project has no media", () => {
    render(<ProjectCard project={mockProject} index={0} onClick={vi.fn()} />);
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  it("renders carousel when project has media array", () => {
    const projectWithMedia: Project = {
      ...mockProject,
      media: [
        { type: "image", src: "/img1.png", alt: "Image one" },
        { type: "image", src: "/img2.png", alt: "Image two" },
      ],
    };
    render(<ProjectCard project={projectWithMedia} index={0} onClick={vi.fn()} />);
    expect(screen.getByRole("region", { name: /media carousel/i })).toBeInTheDocument();
  });

  it("renders carousel with single image", () => {
    const projectWithImage: Project = {
      ...mockProject,
      media: [{ type: "image", src: "/img1.png", alt: "Solo image" }],
    };
    render(<ProjectCard project={projectWithImage} index={0} onClick={vi.fn()} />);
    expect(screen.getByAltText("Solo image")).toBeInTheDocument();
  });

  it("renders YouTube iframe for the initial (visited) video slide", () => {
    const projectWithVideo: Project = {
      ...mockProject,
      media: [{ type: "youtube", id: "dQw4w9WgXcQ" }],
    };
    render(<ProjectCard project={projectWithVideo} index={0} onClick={vi.fn()} />);
    // Slide 0 is pre-visited, so the iframe loads immediately
    expect(screen.getByTitle("Test Project video")).toBeInTheDocument();
  });

  it("renders YouTube thumbnail for non-initial unvisited video slide", () => {
    const projectWithMedia: Project = {
      ...mockProject,
      media: [
        { type: "image", src: "/img1.png", alt: "First slide" },
        { type: "youtube", id: "dQw4w9WgXcQ" },
      ],
    };
    render(<ProjectCard project={projectWithMedia} index={0} onClick={vi.fn()} />);
    // Slide 1 (YouTube) is not yet visited — shows thumbnail placeholder
    expect(screen.getByAltText("Test Project video thumbnail")).toBeInTheDocument();
  });

  it("shows pagination dots for multi-media projects", () => {
    const projectWithMedia: Project = {
      ...mockProject,
      media: [
        { type: "image", src: "/img1.png", alt: "First" },
        { type: "image", src: "/img2.png", alt: "Second" },
      ],
    };
    render(<ProjectCard project={projectWithMedia} index={0} onClick={vi.fn()} />);
    expect(screen.getByLabelText("Go to slide 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide 2")).toBeInTheDocument();
  });

  it("does not show pagination dots for single-media project", () => {
    const projectWithImage: Project = {
      ...mockProject,
      media: [{ type: "image", src: "/img1.png", alt: "Only" }],
    };
    render(<ProjectCard project={projectWithImage} index={0} onClick={vi.fn()} />);
    expect(screen.queryByLabelText("Go to slide 1")).not.toBeInTheDocument();
  });

  it("falls back to legacy imageUrl field", () => {
    const projectLegacy: Project = {
      ...mockProject,
      imageUrl: "/legacy.png",
    };
    render(<ProjectCard project={projectLegacy} index={0} onClick={vi.fn()} />);
    expect(screen.getByRole("region", { name: /media carousel/i })).toBeInTheDocument();
  });

  it("falls back to legacy youtubeId field", () => {
    const projectLegacy: Project = {
      ...mockProject,
      youtubeId: "dQw4w9WgXcQ",
    };
    render(<ProjectCard project={projectLegacy} index={0} onClick={vi.fn()} />);
    expect(screen.getByRole("region", { name: /media carousel/i })).toBeInTheDocument();
  });

  it("renders nothing when media array is empty", () => {
    const projectEmpty: Project = {
      ...mockProject,
      media: [],
    };
    render(<ProjectCard project={projectEmpty} index={0} onClick={vi.fn()} />);
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });
});
