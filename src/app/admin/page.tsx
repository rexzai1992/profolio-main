"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { usePortfolioContent } from "@/components/providers/portfolio-content-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { Container } from "@/components/ui/container";
import {
  defaultPortfolioContent,
  isPortfolioContentLike,
  normalizePortfolioContent,
  type HeroBackgroundMedia,
  type PortfolioContent,
  type ProjectMediaItem,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type Notice = {
  type: "success" | "error" | "info";
  message: string;
};

type MediaType = "image" | "video";

const MAX_INLINE_UPLOAD_MB = 18;

function inferMediaTypeFromFile(file: File): MediaType {
  return file.type.startsWith("video/") ? "video" : "image";
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

function normalizeProjectMedia(project: PortfolioContent["featuredProjects"]["items"][number]) {
  if (Array.isArray(project.media) && project.media.length > 0) {
    return project.media;
  }

  return (project.images ?? [])
    .map((image) => image.trim())
    .filter(Boolean)
    .map((url) => ({ type: "image" as const, url }));
}

type ApplyContentOptions = {
  notice?: string;
  refreshPreview?: boolean;
};

export default function AdminPage() {
  const { content, setContent, resetContent } = usePortfolioContent();
  const { theme } = useTheme();
  const [draft, setDraft] = useState("");
  const [previewKey, setPreviewKey] = useState(0);
  const [heroMediaTypeDraft, setHeroMediaTypeDraft] = useState<MediaType>("video");
  const [notice, setNotice] = useState<Notice>({
    type: "info",
    message:
      "Edits in this admin panel are stored in your current browser using localStorage.",
  });

  useEffect(() => {
    setDraft(JSON.stringify(content, null, 2));
  }, [content]);

  useEffect(() => {
    if (content.hero.backgroundMedia?.type) {
      setHeroMediaTypeDraft(content.hero.backgroundMedia.type);
    }
  }, [content.hero.backgroundMedia]);

  const applyContentChange = (
    updater: (current: PortfolioContent) => PortfolioContent,
    options: ApplyContentOptions = {},
  ) => {
    const next = normalizePortfolioContent(updater(content));
    setContent(next);
    setDraft(JSON.stringify(next, null, 2));

    if (options.notice) {
      setNotice({ type: "success", message: options.notice });
    }

    if (options.refreshPreview !== false) {
      setPreviewKey((currentKey) => currentKey + 1);
    }
  };

  const handleSave = () => { 
    try {
      const parsed: unknown = JSON.parse(draft);
      if (!isPortfolioContentLike(parsed)) {
        setNotice({
          type: "error",
          message:
            "Invalid structure. Keep all top-level keys (site, hero, services, featuredProjects, contact, etc).",
        });
        return;
      }

      const normalized = normalizePortfolioContent(parsed as PortfolioContent);
      setContent(normalized);
      setDraft(JSON.stringify(normalized, null, 2));
      setPreviewKey((currentKey) => currentKey + 1);
      setNotice({
        type: "success",
        message: "Content saved and preview refreshed.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "JSON parse failed. Check commas, quotes, and brackets.",
      });
    }
  };

  const handleReset = () => {
    resetContent();
    setPreviewKey((currentKey) => currentKey + 1);
    setNotice({
      type: "success",
      message: "Reset complete. Default content restored.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([draft], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "portfolio-content.json";
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const handleLoadDefaultTemplate = () => {
    setDraft(JSON.stringify(defaultPortfolioContent, null, 2));
    setNotice({
      type: "info",
      message: "Loaded default template into editor. Save to apply it.",
    });
  };

  const setHeroBackgroundMedia = (backgroundMedia: HeroBackgroundMedia | null, noticeMessage: string) => {
    applyContentChange(
      (current) => ({
        ...current,
        hero: {
          ...current.hero,
          backgroundMedia,
        },
      }),
      { notice: noticeMessage },
    );
  };

  const handleHeroMediaTypeChange = (nextType: MediaType) => {
    setHeroMediaTypeDraft(nextType);

    if (content.hero.backgroundMedia?.url) {
      setHeroBackgroundMedia(
        {
          type: nextType,
          url: content.hero.backgroundMedia.url,
        },
        "Hero background media type updated.",
      );
    }
  };

  const handleHeroMediaUrlBlur = (rawValue: string) => {
    const trimmedUrl = rawValue.trim();

    if (!trimmedUrl) {
      setHeroBackgroundMedia(null, "Hero background media removed.");
      return;
    }

    setHeroBackgroundMedia(
      {
        type: content.hero.backgroundMedia?.type ?? heroMediaTypeDraft,
        url: trimmedUrl,
      },
      "Hero background media updated.",
    );
  };

  const handleHeroMediaFileUpload = async (file?: File) => {
    if (!file) {
      return;
    }

    if (file.size > MAX_INLINE_UPLOAD_MB * 1024 * 1024) {
      setNotice({
        type: "error",
        message: `File is too large. Keep uploads under ${MAX_INLINE_UPLOAD_MB}MB for browser storage.`,
      });
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      const mediaType = inferMediaTypeFromFile(file);

      setHeroMediaTypeDraft(mediaType);
      setHeroBackgroundMedia(
        {
          type: mediaType,
          url: dataUrl,
        },
        "Hero media uploaded and preview refreshed.",
      );
    } catch {
      setNotice({
        type: "error",
        message: "Failed to upload hero media file.",
      });
    }
  };

  const updateProjectMedia = (
    projectIndex: number,
    updater: (currentMedia: ProjectMediaItem[]) => ProjectMediaItem[],
    noticeMessage?: string,
  ) => {
    applyContentChange(
      (current) => {
        const nextItems = current.featuredProjects.items.map((project, index) => {
          if (index !== projectIndex) {
            return project;
          }

          const currentMedia = normalizeProjectMedia(project);
          const nextMedia: ProjectMediaItem[] = updater(currentMedia)
            .map((item): ProjectMediaItem => ({
              type: item.type === "video" ? "video" : "image",
              url: item.url.trim(),
            }))
            .filter((item) => item.url.length > 0)
            .slice(0, 10);

          return {
            ...project,
            media: nextMedia,
          };
        });

        return {
          ...current,
          featuredProjects: {
            ...current.featuredProjects,
            items: nextItems,
          },
        };
      },
      { notice: noticeMessage },
    );
  };
  const handleProjectMediaUpload = async (
    projectIndex: number,
    mediaIndex: number | null,
    file?: File,
  ) => {
    if (!file) {
      return;
    }

    if (file.size > MAX_INLINE_UPLOAD_MB * 1024 * 1024) {
      setNotice({
        type: "error",
        message: `File is too large. Keep uploads under ${MAX_INLINE_UPLOAD_MB}MB for browser storage.`,
      });
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      const type = inferMediaTypeFromFile(file);

      updateProjectMedia(
        projectIndex,
        (currentMedia) => {
          const nextMedia = [...currentMedia];
          const nextItem = { type, url: dataUrl };

          if (mediaIndex === null) {
            nextMedia.push(nextItem);
          } else if (nextMedia[mediaIndex]) {
            nextMedia[mediaIndex] = nextItem;
          } else {
            nextMedia.push(nextItem);
          }

          return nextMedia;
        },
        "Project media uploaded and preview refreshed.",
      );
    } catch {
      setNotice({
        type: "error",
        message: "Failed to upload project media file.",
      });
    }
  };

  const projectMediaMap = useMemo(
    () => content.featuredProjects.items.map((project) => normalizeProjectMedia(project)),
    [content.featuredProjects.items],
  );

  const heroBackgroundMedia = content.hero.backgroundMedia;
  const activeHeroMediaType = heroBackgroundMedia?.type ?? heroMediaTypeDraft;
  const isDark = theme === "dark";

  return (
    <main id="content" className="pb-20 pt-16 md:pt-20">
      <Container>
        <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
          <section className="space-y-6">
            <div
              className={cn(
                "rounded-2xl border p-6 md:p-8",
                isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-300/80 bg-white/90",
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cobalt">
                Admin Content Studio
              </p>
              <h1
                className={cn(
                  "mt-3 text-3xl font-semibold sm:text-4xl",
                  isDark ? "text-white" : "text-slate-900",
                )}
              >
                Edit Content, Media, and Preview
              </h1>
              <p
                className={cn(
                  "mt-4 max-w-3xl text-sm leading-relaxed",
                  isDark ? "text-steel/90" : "text-slate-600",
                )}
              >
                Use media controls below for hero and project assets. For full copy and
                structure edits, update the JSON editor and save.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-full bg-[#f1f4ff] px-4 py-2 text-sm font-semibold text-[#0b1022] transition duration-300 hover:bg-white"
                >
                  Save JSON Changes
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                    isDark
                      ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                      : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                  )}
                >
                  Reset to Default
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                    isDark
                      ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                      : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                  )}
                >
                  Download JSON
                </button>
                <button
                  type="button"
                  onClick={handleLoadDefaultTemplate}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                    isDark
                      ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                      : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                  )}
                >
                  Load Default Template
                </button>
                <Link
                  href="/"
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition duration-300",
                    isDark
                      ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                      : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                  )}
                >
                  Open Homepage
                </Link>
              </div>

              <div
                className={
                  "mt-4 rounded-xl border px-4 py-3 text-sm " +
                  (notice.type === "success"
                    ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                    : notice.type === "error"
                      ? "border-red-400/40 bg-red-400/10 text-red-100"
                      : isDark
                        ? "border-cobalt/40 bg-cobalt/10 text-steel"
                        : "border-blue-300 bg-blue-100 text-blue-800")
                }
              >
                {notice.message}
              </div>
            </div>

            <div
              className={cn(
                "rounded-2xl border p-6 md:p-8",
                isDark ? "border-white/10 bg-ink/70" : "border-slate-300/80 bg-white/90",
              )}
            >
              <h2 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                Hero Background Media
              </h2>
              <p className={cn("mt-2 text-sm", isDark ? "text-steel/85" : "text-slate-600")}>
                Upload or link a video/GIF/image for hero background. If empty, the 3D background
                animation is used.
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-xl border",
                    isDark ? "border-white/10 bg-[#0b111b]" : "border-slate-300 bg-slate-100",
                  )}
                >
                  <div className="aspect-[16/9]">
                    {heroBackgroundMedia?.url ? (
                      heroBackgroundMedia.type === "video" ? (
                        <video
                          className="h-full w-full object-cover"
                          src={heroBackgroundMedia.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <div
                          className="h-full w-full bg-cover bg-center"
                          style={{ backgroundImage: `url(\"${heroBackgroundMedia.url}\")` }}
                          role="img"
                          aria-label="Hero media preview"
                        />
                      )
                    ) : (
                      <div className={cn(
                        "flex h-full items-center justify-center text-xs font-medium",
                        isDark ? "text-steel/90" : "text-slate-600",
                      )}>
                        No hero media selected
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className={cn("block text-xs font-semibold uppercase tracking-wide", isDark ? "text-steel/85" : "text-slate-600")}>
                    Media type
                  </label>
                  <select
                    value={activeHeroMediaType}
                    onChange={(event) => handleHeroMediaTypeChange(event.target.value as MediaType)}
                    className={cn(
                      "w-full rounded-xl border px-3 py-2 text-sm",
                      isDark
                        ? "border-white/15 bg-[#0d1526] text-white"
                        : "border-slate-300 bg-white text-slate-900",
                    )}
                  >
                    <option value="video">Video</option>
                    <option value="image">Image / GIF</option>
                  </select>

                  <label className={cn("block text-xs font-semibold uppercase tracking-wide", isDark ? "text-steel/85" : "text-slate-600")}>
                    Media URL (on blur it updates live preview)
                  </label>
                  <input
                    key={`hero-media-url-${heroBackgroundMedia?.url ?? "none"}`}
                    defaultValue={heroBackgroundMedia?.url ?? ""}
                    onBlur={(event) => handleHeroMediaUrlBlur(event.target.value)}
                    placeholder="https://... or /media/hero.mp4"
                    className={cn(
                      "w-full rounded-xl border px-3 py-2 text-sm",
                      isDark
                        ? "border-white/15 bg-[#0d1526] text-white placeholder:text-steel/55"
                        : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400",
                    )}
                  />

                  <div className="flex flex-wrap gap-2">
                    <label
                      className={cn(
                        "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                        isDark
                          ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                          : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                      )}
                    >
                      Upload File
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(event) => {
                          void handleHeroMediaFileUpload(event.target.files?.[0]);
                          event.currentTarget.value = "";
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setHeroBackgroundMedia(null, "Hero background media removed.")}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                        isDark
                          ? "border-white/20 bg-white/[0.05] text-white hover:border-red-400/70"
                          : "border-slate-300 bg-white text-slate-800 hover:border-red-300",
                      )}
                    >
                      Remove Media
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={cn(
                "rounded-2xl border p-6 md:p-8",
                isDark ? "border-white/10 bg-ink/70" : "border-slate-300/80 bg-white/90",
              )}
            >
              <h2 className={cn("text-xl font-semibold", isDark ? "text-white" : "text-slate-900")}>
                Featured Project Media
              </h2>
              <p className={cn("mt-2 text-sm", isDark ? "text-steel/85" : "text-slate-600")}>
                Add, upload, edit, and delete image/video items for each project card carousel.
              </p>

              <div className="mt-5 space-y-5">
                {content.featuredProjects.items.map((project, projectIndex) => {
                  const projectMedia = projectMediaMap[projectIndex] ?? [];

                  return (
                    <div
                      key={project.name}
                      className={cn(
                        "rounded-xl border p-4",
                        isDark ? "border-white/10 bg-black/10" : "border-slate-300 bg-slate-50",
                      )}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-slate-900")}>
                          {project.name}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateProjectMedia(
                                projectIndex,
                                (currentMedia) => [...currentMedia, { type: "image", url: "" }],
                                "Added a project media slot.",
                              )
                            }
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                              isDark
                                ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                                : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                            )}
                          >
                            Add Media Slot
                          </button>
                          <label
                            className={cn(
                              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                              isDark
                                ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                                : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                            )}
                          >
                            Upload New File
                            <input
                              type="file"
                              accept="image/*,video/*"
                              className="hidden"
                              onChange={(event) => {
                                void handleProjectMediaUpload(projectIndex, null, event.target.files?.[0]);
                                event.currentTarget.value = "";
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {projectMedia.length === 0 ? (
                        <p className={cn("mt-3 text-xs", isDark ? "text-steel/80" : "text-slate-500")}>
                          No media yet. Add a slot or upload a file.
                        </p>
                      ) : (
                        <div className="mt-3 space-y-3">
                          {projectMedia.map((mediaItem, mediaIndex) => (
                            <div
                              key={`${project.name}-${mediaIndex}-${mediaItem.url}`}
                              className={cn(
                                "rounded-lg border p-3",
                                isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-300 bg-white",
                              )}
                            >
                              <div className="grid gap-2 md:grid-cols-[120px_minmax(0,1fr)_auto_auto]">
                                <select
                                  value={mediaItem.type}
                                  onChange={(event) =>
                                    updateProjectMedia(
                                      projectIndex,
                                      (currentMedia) =>
                                        currentMedia.map((item, index) =>
                                          index === mediaIndex
                                            ? { ...item, type: event.target.value as MediaType }
                                            : item,
                                        ),
                                      "Project media type updated.",
                                    )
                                  }
                                  className={cn(
                                    "rounded-lg border px-2 py-1.5 text-xs",
                                    isDark
                                      ? "border-white/15 bg-[#0d1526] text-white"
                                      : "border-slate-300 bg-white text-slate-900",
                                  )}
                                >
                                  <option value="image">Image / GIF</option>
                                  <option value="video">Video</option>
                                </select>

                                <input
                                  key={`${project.name}-${mediaIndex}-url-${mediaItem.url}`}
                                  defaultValue={mediaItem.url}
                                  onBlur={(event) =>
                                    updateProjectMedia(
                                      projectIndex,
                                      (currentMedia) =>
                                        currentMedia.map((item, index) =>
                                          index === mediaIndex
                                            ? { ...item, url: event.target.value.trim() }
                                            : item,
                                        ),
                                      "Project media URL updated.",
                                    )
                                  }
                                  placeholder="https://... or /projects/asset.jpg"
                                  className={cn(
                                    "rounded-lg border px-3 py-1.5 text-xs",
                                    isDark
                                      ? "border-white/15 bg-[#0d1526] text-white placeholder:text-steel/55"
                                      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400",
                                  )}
                                />

                                <label
                                  className={cn(
                                    "cursor-pointer rounded-lg border px-3 py-1.5 text-center text-xs font-semibold transition",
                                    isDark
                                      ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                                      : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                                  )}
                                >
                                  Upload
                                  <input
                                    type="file"
                                    accept="image/*,video/*"
                                    className="hidden"
                                    onChange={(event) => {
                                      void handleProjectMediaUpload(
                                        projectIndex,
                                        mediaIndex,
                                        event.target.files?.[0],
                                      );
                                      event.currentTarget.value = "";
                                    }}
                                  />
                                </label>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateProjectMedia(
                                      projectIndex,
                                      (currentMedia) =>
                                        currentMedia.filter((_, index) => index !== mediaIndex),
                                      "Project media item deleted.",
                                    )
                                  }
                                  className={cn(
                                    "rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
                                    isDark
                                      ? "border-white/20 bg-white/[0.05] text-white hover:border-red-400/70"
                                      : "border-slate-300 bg-white text-slate-800 hover:border-red-300",
                                  )}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={cn(
                "rounded-2xl border p-6 md:p-8",
                isDark ? "border-white/10 bg-ink/70" : "border-slate-300/80 bg-white/90",
              )}
            >
              <label
                htmlFor="content-json"
                className={cn("block text-sm font-semibold", isDark ? "text-white" : "text-slate-900")}
              >
                Full portfolio content JSON (all fields editable)
              </label>
              <textarea
                id="content-json"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                spellCheck={false}
                className={cn(
                  "mt-3 h-[70vh] min-h-[520px] w-full rounded-2xl border p-4 font-mono text-xs leading-relaxed",
                  isDark
                    ? "border-white/15 bg-ink/80 text-white placeholder:text-steel/60"
                    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400",
                )}
              />
            </div>
          </section>
          <aside className="xl:sticky xl:top-20 xl:h-fit">
            <div
              className={cn(
                "rounded-2xl border p-4",
                isDark ? "border-white/10 bg-[#090d15]" : "border-slate-300/80 bg-white/95",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-slate-900")}>
                  Live Site Preview
                </p>
                <button
                  type="button"
                  onClick={() => setPreviewKey((currentKey) => currentKey + 1)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold transition",
                    isDark
                      ? "border-white/20 bg-white/[0.05] text-white hover:border-cobalt/60"
                      : "border-slate-300 bg-white text-slate-800 hover:border-blue-300",
                  )}
                >
                  Reload Preview
                </button>
              </div>
              <p className={cn("mt-2 text-xs", isDark ? "text-steel/80" : "text-slate-600")}>
                Preview reflects current stored content. Media uploads refresh this panel automatically.
              </p>

              <div className={cn("mt-3 overflow-hidden rounded-xl border", isDark ? "border-white/10" : "border-slate-300")}>
                <iframe
                  key={previewKey}
                  src="/"
                  title="Homepage live preview"
                  className="h-[82vh] min-h-[700px] w-full bg-white"
                />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
