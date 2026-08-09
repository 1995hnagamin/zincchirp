import { App, PluginSettingTab, Setting } from "obsidian";
import Zincchirp from "./main";

export interface ZincchirpSettings {
  JournalPathFormat: string;
}

export const DEFAULT_SETTINGS: ZincchirpSettings = {
  JournalPathFormat: "YYYY-MM-DD.md",
};

export class ZincchirpSettingTab extends PluginSettingTab {
  plugin: Zincchirp;

  constructor(app: App, plugin: Zincchirp) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Journal file path format")
      .setDesc("Journal file path format")
      .addText((text) =>
        text
          .setPlaceholder("YYYY-MM-DD.md")
          .setValue(this.plugin.settings.JournalPathFormat)
          .onChange(async (value) => {
            this.plugin.settings.JournalPathFormat = value;
            await this.plugin.saveSettings();
          }),
      );
  }
}
