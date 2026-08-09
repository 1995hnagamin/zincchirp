import { App, TFile } from "obsidian";
import moment, { Moment } from "moment";
import { ZincchirpSettings } from "./settings";

export class ZincchirpModel {
  private theday: Moment;

  constructor(
    private app: App,
    private settings: ZincchirpSettings,
  ) {
    this.theday = moment().startOf("day");
  }

  private async getOrCreateJournalFile(): Promise<TFile> {
    const path = this.getPath();
    const existing = this.app.vault.getAbstractFileByPath(path);

    if (existing instanceof TFile) {
      return existing;
    }

    return await this.app.vault.create(path, "");
  }

  private getPath(): string {
    const format = this.settings.JournalPathFormat;
    const path = this.theday.format(format);
    return path;
  }

  private setDay(target: Moment): void {
    this.theday = target.clone().startOf("day");
  }

  setDayFromString(dateString: string): void {
    const day = moment(dateString, "YYYY-MM-DD");
    this.setDay(day);
  }

  refresh(): void {
    const now = moment();
    this.setDay(now);
  }

  getDayString(): string {
    return this.theday.format("YYYY-MM-DD");
  }

  async post(text: string): Promise<void> {
    if (text === "") {
      return;
    }
    const now = moment();
    const file = await this.getOrCreateJournalFile();
    const timestamp = this.formatTimestamp(now);
    const formattedText = text.trim().split(/\n/).join("\n  ");
    await this.app.vault.append(file, `\n- ${timestamp} ${formattedText}`);
  }

  private formatTimestamp(now: Moment): string {
    const hours = now.diff(this.theday, "hours");
    const hh = String(hours).padStart(2, "0");
    const mm = now.format("mm");
    return `${hh}:${mm}`;
  }

  async openFile(): Promise<void> {
    const path = this.getPath();
    const file = this.app.vault.getAbstractFileByPath(path);
    if (file instanceof TFile) {
      const leaf = this.app.workspace.getLeaf(true);
      await leaf.openFile(file);
    }
  }
}
