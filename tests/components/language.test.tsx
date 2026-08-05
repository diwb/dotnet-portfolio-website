import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { LanguageProvider, LocalizedText } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";
import { withBasePath } from "@/lib/paths";

function LanguageProbe() {
  return (
    <LanguageProvider>
      <LanguageToggle />
      <p>
        <LocalizedText pt="Olá" en="Hello" />
      </p>
    </LanguageProvider>
  );
}

describe("language support", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "";
  });

  it("renders Portuguese by default", () => {
    render(<LanguageProbe />);
    expect(screen.getByText("Olá")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PT" })).toHaveAttribute("aria-pressed", "true");
  });

  it("switches to English and persists the preference", () => {
    render(<LanguageProbe />);
    fireEvent.click(screen.getByRole("button", { name: "EN" }));
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("portfolio-language")).toBe("en");
  });

  it("loads a saved English preference", async () => {
    window.localStorage.setItem("portfolio-language", "en");
    render(<LanguageProbe />);
    expect(await screen.findByText("Hello")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
  });

  it("uses Portuguese when localized text is rendered outside the provider", () => {
    render(<LocalizedText pt="Português" en="English" />);
    expect(screen.getByText("Português")).toBeInTheDocument();
  });
});

describe("paths", () => {
  it("prefixes root-relative paths with the configured base path", () => {
    expect(withBasePath("/favicon.svg")).toBe(
      `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`
    );
  });

  it("does not change external paths", () => {
    expect(withBasePath("https://example.com/resume.pdf")).toBe("https://example.com/resume.pdf");
  });
});
