import { App, TFile } from "obsidian";
import moment, { Moment } from "moment";
import Zincchirp from "./main";

export class ZincchirpModel {
  private theday: Moment;

  constructor(
    private app: App,
    private plugin: Zincchirp,
  ) {
    this.theday = moment().startOf("day");
  }

  private async getOrCreateJournalFile(): Promise<TFile> {
    const format = this.plugin.settings.JournalPathFormat;
    const path = this.theday.format(format);
    const existing = this.app.vault.getAbstractFileByPath(path);

    if (existing instanceof TFile) {
      return existing;
    }

    return await this.app.vault.create(path, "");
  }

  private setDay(target: Moment): void {
    this.theday = target.clone().startOf("day");
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
}
